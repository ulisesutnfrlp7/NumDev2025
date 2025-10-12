// js/calculos.js
// Implementa linealFit, cuadraticoFit, exponencialFit, potencialFit, calcularR2, calcularR2Ajustado, generateFitPoints
window.Calculos = (function(){

    // Obtención de las fórmulas de las funciones
    function linealFit(data){
      if (!data || data.length < 2) return null;
      const n = data.length;
      const sumX = data.reduce((s,p)=>s+p.x,0);
      const sumY = data.reduce((s,p)=>s+p.y,0);
      const sumXY = data.reduce((s,p)=>s+p.x*p.y,0);
      const sumX2 = data.reduce((s,p)=>s+p.x*p.x,0);
      const denom = (n*sumX2 - sumX*sumX);
      if(denom===0) return null;
      const m = (n*sumXY - sumX*sumY)/denom;
      const b = (sumY - m*sumX)/n;
      return { m, b, formula: `y = ${m.toFixed(4)} x + ${b.toFixed(4)}` };
    }
  
    function cuadraticoFit(data){
      if (!data || data.length < 3) return null;
      const n = data.length;
      const sumX = data.reduce((s,p)=>s+p.x,0);
      const sumX2 = data.reduce((s,p)=>s+p.x*p.x,0);
      const sumX3 = data.reduce((s,p)=>s+p.x*p.x*p.x,0);
      const sumX4 = data.reduce((s,p)=>s+p.x*p.x*p.x*p.x,0);
      const sumY = data.reduce((s,p)=>s+p.y,0);
      const sumXY = data.reduce((s,p)=>s+p.x*p.y,0);
      const sumX2Y = data.reduce((s,p)=>s+p.x*p.x*p.y,0);
  
      const A = [[n, sumX, sumX2],[sumX, sumX2, sumX3],[sumX2, sumX3, sumX4]];
      const b = [sumY, sumXY, sumX2Y];
      try {
        const coeff = numeric.solve(A, b); // [c0, c1, c2] corresponds to c, b, a
        const c = coeff[0], bb = coeff[1], a = coeff[2];
        return { a, b: bb, c, formula: `y = ${a.toFixed(6)} x² + ${bb.toFixed(6)} x + ${c.toFixed(6)}` };
      } catch(e){
        return null;
      }
    }
  
    function exponencialFit(data){
      if(!data || data.length < 2) return null;
      const filtered = data.filter(p => p.y > 0);
      if(filtered.length < 2) return null;
      const n = filtered.length;
      const sumX = filtered.reduce((s,p)=>s+p.x,0);
      const sumLnY = filtered.reduce((s,p)=>s+Math.log(p.y),0);
      const sumXLnY = filtered.reduce((s,p)=>s+p.x*Math.log(p.y),0);
      const sumX2 = filtered.reduce((s,p)=>s+p.x*p.x,0);
      const denom = (n*sumX2 - sumX*sumX);
      if(denom===0) return null;
      const b = (n*sumXLnY - sumX*sumLnY)/denom;
      const a = Math.exp((sumLnY - b*sumX)/n);
      return { a, b, formula: `y = ${a.toFixed(6)} e^{${b.toFixed(6)} x}` };
    }
  
    function potencialFit(data){
      if(!data || data.length < 2) return null;
      const filtered = data.filter(p => p.x>0 && p.y>0);
      if(filtered.length < 2) return null;
      const n = filtered.length;
      const sumLnX = filtered.reduce((s,p)=>s+Math.log(p.x),0);
      const sumLnY = filtered.reduce((s,p)=>s+Math.log(p.y),0);
      const sumLnXLnY = filtered.reduce((s,p)=>s+Math.log(p.x)*Math.log(p.y),0);
      const sumLnX2 = filtered.reduce((s,p)=>s+Math.log(p.x)*Math.log(p.x),0);
      const denom = (n*sumLnX2 - sumLnX*sumLnX);
      if(denom===0) return null;
      const b = (n*sumLnXLnY - sumLnX*sumLnY)/denom;
      const a = Math.exp((sumLnY - b*sumLnX)/n);
      return { a, b, formula: `y = ${a.toFixed(6)} x^{${b.toFixed(6)}}` };
    }
  
    // Cálculo de R2 y R2 AJUSTE de forma agnóstica al modelo. Depende únicamente
    // de la función predictor que se pasa como argumento
    function calcularR2(data, predictor){
      if(!data || data.length===0) return NaN;
      const meanY = data.reduce((s,p)=>s+p.y,0)/data.length;
      const ssRes = data.reduce((s,p)=> s + Math.pow(p.y - predictor(p.x),2), 0);
      const ssTot = data.reduce((s,p)=> s + Math.pow(p.y - meanY,2), 0);
      return ssTot === 0 ? 1 : 1 - (ssRes/ssTot);
    }

    function calcularR2Ajustado(r2, n, p){
      // p = número total de parámetros del modelo (incluye intercepto)
      if (!isFinite(r2) || n <= p) return NaN; // no puede calcularse si n <= p
      // usando 1 - [SSE/(n-p)] / [SST/(n-1)]
      // algebraicamente: 1 - (1 - r2) * (n - 1) / (n - p)
      return 1 - (1 - r2) * ((n - 1) / (n - p));
    }
  
    function generateFitPoints(fit, type, xMin=0, xMax=150){
      const pts = [];
      if(!fit) return pts;
      for(let x=xMin; x<=xMax; x+=2){
        let y = NaN;
        if(type==='lineal') y = fit.m * x + fit.b;
        if(type==='cuadratico') y = fit.a * x * x + fit.b * x + fit.c;
        if(type==='exponencial') y = fit.a * Math.exp(fit.b * x);
        if(type==='potencial') y = fit.a * Math.pow(x, fit.b);
        if(!Number.isFinite(y)) continue;
        if(y< -1e6 || y>1e6) continue;
        pts.push({ x, y });
      }
      return pts;
    }
  
    function calcularAjustes(data){
      const result = {};
      const n = data.length;
      const L = linealFit(data);
      const Q = cuadraticoFit(data); // se guardan las fórmulas en esas variables
      const E = exponencialFit(data);
      const P = potencialFit(data);
  
      // se pasan como parámetro las funciones para poder calcular R2 y R2 AJUSTE
      if(L){
        const r2 = calcularR2(data, x => L.m*x + L.b);
        const r2adj = calcularR2Ajustado(r2, n, 2); // lineal: p = 2 (b0, b1)
        result.lineal = { fit: L, points: generateFitPoints(L,'lineal'), r2, r2adj };
      }
      if(Q){
        const r2 = calcularR2(data, x => Q.a*x*x + Q.b*x + Q.c);
        const r2adj = calcularR2Ajustado(r2, n, 3); // cuadrático: p = 3 (b0,b1,b2)
        result.cuadratico = { fit: Q, points: generateFitPoints(Q,'cuadratico'), r2, r2adj };
      }
      if(E){
        const r2 = calcularR2(data, x => E.a * Math.exp(E.b * x));
        const r2adj = calcularR2Ajustado(r2, n, 2); // exponencial: p = 2 (a,b)
        result.exponencial = { fit: E, points: generateFitPoints(E,'exponencial'), r2, r2adj };
      }
      if(P){
        const r2 = calcularR2(data, x => P.a * Math.pow(x, P.b));
        const r2adj = calcularR2Ajustado(r2, n, 2); // potencial: p = 2 (a,b)
        result.potencial = { fit: P, points: generateFitPoints(P,'potencial'), r2, r2adj };
      }
      return result;
    }
  
    // genera texto con pasos numéricos para mostrar en pantalla (lineal)
    function textoPasosLineal(data){
      if(!data || data.length<2) return 'No hay suficientes puntos para ajuste lineal.';
      const n = data.length;
      const sumX = data.reduce((s,p)=>s+p.x,0);
      const sumY = data.reduce((s,p)=>s+p.y,0);
      const sumXY = data.reduce((s,p)=>s+p.x*p.y,0);
      const sumX2 = data.reduce((s,p)=>s+p.x*p.x,0);
      const m = (n*sumXY - sumX*sumY)/(n*sumX2 - sumX*sumX);
      const b = (sumY - m*sumX)/n;
      return [
        `n = ${n}`,
        `Σx = ${sumX.toFixed(6)}`,
        `Σy = ${sumY.toFixed(6)}`,
        `Σxy = ${sumXY.toFixed(6)}`,
        `Σx² = ${sumX2.toFixed(6)}`,
        `m = (n·Σxy - Σx·Σy) / (n·Σx² - (Σx)²) = ${m.toFixed(6)}`,
        `b = (Σy - m·Σx) / n = ${b.toFixed(6)}`,
        `FÓRMULA: y = ${m.toFixed(6)} x + ${b.toFixed(6)}`
      ].join('\n');
    }
  
    function textoPasosCuadratico(data){
      if(!data || data.length<3) return 'No hay suficientes puntos para ajuste cuadrático.';
      const n = data.length;
      const sumX = data.reduce((s,p)=>s+p.x,0);
      const sumX2 = data.reduce((s,p)=>s+p.x*p.x,0);
      const sumX3 = data.reduce((s,p)=>s+p.x*p.x*p.x,0);
      const sumX4 = data.reduce((s,p)=>s+p.x*p.x*p.x*p.x,0);
      const sumY = data.reduce((s,p)=>s+p.y,0);
      const sumXY = data.reduce((s,p)=>s+p.x*p.y,0);
      const sumX2Y = data.reduce((s,p)=>s+p.x*p.x*p.y,0);
      const A = [[n,sumX,sumX2],[sumX,sumX2,sumX3],[sumX2,sumX3,sumX4]];
      const bV = [sumY,sumXY,sumX2Y];
      let text = [
        `n = ${n}`,
        `Σx = ${sumX.toFixed(6)}`,
        `Σx² = ${sumX2.toFixed(6)}`,
        `Σx³ = ${sumX3.toFixed(6)}`,
        `Σx⁴ = ${sumX4.toFixed(6)}`,
        `Σy = ${sumY.toFixed(6)}`,
        `Σxy = ${sumXY.toFixed(6)}`,
        `Σx²y = ${sumX2Y.toFixed(6)}`,
        `SISTEMA NORMAL (A·coeff = b):`,
        `A = [ [${A[0][0].toFixed(6)}, ${A[0][1].toFixed(6)}, ${A[0][2].toFixed(6)}],`,
        `      [${A[1][0].toFixed(6)}, ${A[1][1].toFixed(6)}, ${A[1][2].toFixed(6)}],`,
        `      [${A[2][0].toFixed(6)}, ${A[2][1].toFixed(6)}, ${A[2][2].toFixed(6)}] ]`,
        `b = [ ${bV[0].toFixed(6)}, ${bV[1].toFixed(6)}, ${bV[2].toFixed(6)} ]`
      ].join('\n');
      try {
        const coeff = numeric.solve(A,bV);
        text += `\nSOLUCIÓN (c, b, a) = [ ${coeff[0].toFixed(6)}, ${coeff[1].toFixed(6)}, ${coeff[2].toFixed(6)} ]`;
        text += `\nFÓRMULA: y = ${coeff[2].toFixed(6)} x² + ${coeff[1].toFixed(6)} x + ${coeff[0].toFixed(6)}`;
      } catch(e){
        text += `\nNo se pudo resolver el sistema: ${e && e.message ? e.message : e}`;
      }
      return text;
    }
  
    function textoPasosExponencial(data){
      if(!data || data.length<2) return 'No hay suficientes puntos para ajuste exponencial.';
      const filtered = data.filter(p=>p.y>0);
      if(filtered.length<2) return 'No hay suficientes puntos con y>0 para ajuste exponencial.';
      const n = filtered.length;
      const sumX = filtered.reduce((s,p)=>s+p.x,0);
      const sumLnY = filtered.reduce((s,p)=>s+Math.log(p.y),0);
      const sumXLnY = filtered.reduce((s,p)=>s+p.x*Math.log(p.y),0);
      const sumX2 = filtered.reduce((s,p)=>s+p.x*p.x,0);
      const b = (n*sumXLnY - sumX*sumLnY)/(n*sumX2 - sumX*sumX);
      const a = Math.exp((sumLnY - b*sumX)/n);
      return [
        `n = ${n}`,
        `Σx = ${sumX.toFixed(6)}`,
        `Σln(y) = ${sumLnY.toFixed(6)}`,
        `Σx·ln(y) = ${sumXLnY.toFixed(6)}`,
        `Σx² = ${sumX2.toFixed(6)}`,
        `b = (n·Σx·ln(y) - Σx·Σln(y)) / (n·Σx² - (Σx)²) = ${b.toFixed(6)}`,
        `a = exp( (Σln(y) - b·Σx) / n ) = ${a.toFixed(6)}`,
        `FÓRMULA: y = ${a.toFixed(6)} e^{${b.toFixed(6)} x}`
      ].join('\n');
    }
  
    function textoPasosPotencial(data){
      if(!data || data.length<2) return 'No hay suficientes puntos para ajuste potencial.';
      const filtered = data.filter(p=>p.x>0 && p.y>0);
      if(filtered.length<2) return 'No hay suficientes puntos con x>0,y>0 para ajuste potencial.';
      const n = filtered.length;
      const sumLnX = filtered.reduce((s,p)=>s+Math.log(p.x),0);
      const sumLnY = filtered.reduce((s,p)=>s+Math.log(p.y),0);
      const sumLnXLnY = filtered.reduce((s,p)=>s+Math.log(p.x)*Math.log(p.y),0);
      const sumLnX2 = filtered.reduce((s,p)=>s+Math.log(p.x)*Math.log(p.x),0);
      const b = (n*sumLnXLnY - sumLnX*sumLnY)/(n*sumLnX2 - sumLnX*sumLnX);
      const a = Math.exp((sumLnY - b*sumLnX)/n);
      return [
        `n = ${n}`,
        `Σln(x) = ${sumLnX.toFixed(6)}`,
        `Σln(y) = ${sumLnY.toFixed(6)}`,
        `Σln(x)·ln(y) = ${sumLnXLnY.toFixed(6)}`,
        `Σ(ln(x))² = ${sumLnX2.toFixed(6)}`,
        `b = (n·Σln(x)ln(y) - Σln(x)Σln(y)) / (n·Σ(ln(x))² - (Σln(x))²) = ${b.toFixed(6)}`,
        `a = exp( (Σln(y) - b·Σln(x)) / n ) = ${a.toFixed(6)}`,
        `FÓRMULA: y = ${a.toFixed(6)} x^{${b.toFixed(6)}}`
      ].join('\n');
    }
  
    return {
      linealFit, cuadraticoFit, exponencialFit, potencialFit,
      calcularR2, calcularR2Ajustado, generateFitPoints, calcularAjustes,
      textoPasosLineal, textoPasosCuadratico, textoPasosExponencial, textoPasosPotencial
    };
  })();