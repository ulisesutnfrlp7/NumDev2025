// js/barrioB.js
(async function(){
    const canvas = document.getElementById('chartBarrioB');
    const ctx = canvas.getContext('2d');
  
    const colors = {
      fit_lineal: 'rgba(255,0,0,0.8)',
      fit_exponencial: 'rgba(0,150,0,0.8)',
      fit_potencial: 'rgba(0,0,200,0.8)',
      fit_cuadratico: 'rgba(255,140,0,0.8)',
      barrio: { bg:'rgba(54,162,235,0.85)', border:'rgba(54,162,235,1)' }
    };
  
    let chart = null;
    async function render(){
      const clusters = await DataLoader.loadXLSX('datos.xlsx');
      const data = clusters.B || [];
  
      const ajustes = Calculos.calcularAjustes(data);
  
      const datasets = [];
      if(ajustes.lineal) datasets.push({ label:'Lineal', type:'line', data:ajustes.lineal.points, borderColor:colors.fit_lineal, borderWidth:2, pointRadius:0, fill:false });
      if(ajustes.exponencial) datasets.push({ label:'Exponencial', type:'line', data:ajustes.exponencial.points, borderColor:colors.fit_exponencial, borderWidth:2, pointRadius:0, fill:false });
      if(ajustes.potencial) datasets.push({ label:'Potencial', type:'line', data:ajustes.potencial.points, borderColor:colors.fit_potencial, borderWidth:2, pointRadius:0, fill:false });
      if(ajustes.cuadratico) datasets.push({ label:'Cuadrático', type:'line', data:ajustes.cuadratico.points, borderColor:colors.fit_cuadratico, borderWidth:2, pointRadius:0, fill:false });
  
      datasets.push({ label:'Barrio B', data: data, backgroundColor: colors.barrio.bg, borderColor: colors.barrio.border, pointStyle:'cross', radius:7, borderWidth:2 });
  
      const options = {
        responsive:true,
        plugins:{
          title:{display:true,text:'Barrio B — Precio vs m²'},
          legend:{position:'top'},
          zoom:{pan:{enabled:true,mode:'xy'},zoom:{wheel:{enabled:true},mode:'xy'}}
        },
        scales:{ x:{min:0,max:150,title:{display:true,text:'m²'}}, y:{min:0,max:400,title:{display:true,text:'Precio (kUSD)'}} }
      };
  
      if(chart) chart.destroy();
      chart = ChartFactory.createScatter(ctx, datasets, options);
  
      const resumen = document.getElementById('resumenFits');
      resumen.innerHTML = '';
      if(ajustes.lineal) resumen.appendChild(Object.assign(document.createElement('div'), { innerHTML: `<strong>Lineal:</strong> ${ajustes.lineal.fit.formula} — R² = ${ajustes.lineal.r2.toFixed(6)}` }));
      if(ajustes.cuadratico) resumen.appendChild(Object.assign(document.createElement('div'), { innerHTML: `<strong>Cuadrático:</strong> ${ajustes.cuadratico.fit.formula} — R² = ${ajustes.cuadratico.r2.toFixed(6)}` }));
      if(ajustes.exponencial) resumen.appendChild(Object.assign(document.createElement('div'), { innerHTML: `<strong>Exponencial:</strong> ${ajustes.exponencial.fit.formula} — R² = ${ajustes.exponencial.r2.toFixed(6)}` }));
      if(ajustes.potencial) resumen.appendChild(Object.assign(document.createElement('div'), { innerHTML: `<strong>Potencial:</strong> ${ajustes.potencial.fit.formula} — R² = ${ajustes.potencial.r2.toFixed(6)}` }));
  
      const calcDiv = document.getElementById('calculosB');
      calcDiv.textContent = '';
      calcDiv.textContent += 'AJUSTE LINEAL:\n' + Calculos.textoPasosLineal(data) + '\n\n';
      calcDiv.textContent += 'AJUSTE CUADRÁTICO:\n' + Calculos.textoPasosCuadratico(data) + '\n\n';
      calcDiv.textContent += 'AJUSTE EXPONENCIAL:\n' + Calculos.textoPasosExponencial(data) + '\n\n';
      calcDiv.textContent += 'AJUSTE POTENCIAL:\n' + Calculos.textoPasosPotencial(data) + '\n\n';
    }
  
    document.getElementById('refresh').addEventListener('click', render);
    document.getElementById('zoomIn').addEventListener('click', ()=> chart.zoom(1.2));
    document.getElementById('zoomOut').addEventListener('click', ()=> chart.zoom(0.8));
    document.getElementById('resetZoom').addEventListener('click', ()=> chart.resetZoom());
  
    await render();
  })();