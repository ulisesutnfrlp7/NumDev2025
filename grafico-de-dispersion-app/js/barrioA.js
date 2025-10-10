// js/barrioA.js
(async function(){
    const canvas = document.getElementById('chartBarrioA');
    const ctx = canvas.getContext('2d');
  
    const colors = {
      fit_lineal: 'rgba(255,0,0,0.8)',
      fit_exponencial: 'rgba(0,150,0,0.8)',
      fit_potencial: 'rgba(0,0,200,0.8)',
      fit_cuadratico: 'rgba(255,140,0,0.8)',
      barrio: { bg:'rgba(255,99,132,0.85)', border:'rgba(255,99,132,1)' }
    };
  
    let chart = null;
    async function render(){
      const clusters = await DataLoader.loadXLSX('datos.xlsx');
      const data = clusters.A || [];
  
      const ajustes = Calculos.calcularAjustes(data);
  
      const datasets = [];
      // fits
      if(ajustes.lineal) datasets.push({ label:'Lineal', type:'line', data:ajustes.lineal.points, borderColor:colors.fit_lineal, borderWidth:2, pointRadius:0, fill:false });
      if(ajustes.exponencial) datasets.push({ label:'Exponencial', type:'line', data:ajustes.exponencial.points, borderColor:colors.fit_exponencial, borderWidth:2, pointRadius:0, fill:false });
      if(ajustes.potencial) datasets.push({ label:'Potencial', type:'line', data:ajustes.potencial.points, borderColor:colors.fit_potencial, borderWidth:2, pointRadius:0, fill:false });
      if(ajustes.cuadratico) datasets.push({ label:'Cuadrático', type:'line', data:ajustes.cuadratico.points, borderColor:colors.fit_cuadratico, borderWidth:2, pointRadius:0, fill:false });
  
      // puntos barrio A
      datasets.push({ label:'Barrio A', data: data, backgroundColor: colors.barrio.bg, borderColor: colors.barrio.border, pointStyle:'cross', radius:7, borderWidth:2 });
  
      const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Barrio A — Precio vs m²',
            color: '#f0f0f0', // título blanco
            font: { size: 18, weight: 'bold' }
          },
          legend: {
            position: 'top',
            labels: {
              color: '#f0f0f0',
              font: { size: 13 }
            }
          },
          tooltip: {
            bodyColor: '#fff',
            titleColor: '#fff',
            backgroundColor: '#333',
            borderColor: '#00c896',
            borderWidth: 1,
            callbacks: {
              label: function(ctx) {
                if (ctx.dataset.type === 'line') {
                  return `${ctx.dataset.label}: ${ctx.parsed.x} → ${ctx.parsed.y}`;
                }
                return `${ctx.dataset.label}: ${ctx.raw.x.toFixed(1)} m² → ${ctx.raw.y.toFixed(2)} kUSD`;
              }
            }
          },
          zoom: {
            pan: { enabled: true, mode: 'xy' },
            zoom: { wheel: { enabled: true }, mode: 'xy' }
          }
        },
        scales: {
          x: {
            min: 0,
            max: 150,
            title: {
              display: true,
              text: 'm²',
              color: '#f0f0f0',
              font: { size: 14 }
            },
            ticks: {
              color: '#f0f0f0'
            },
            grid: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          y: {
            min: 0,
            max: 400,
            title: {
              display: true,
              text: 'Precio (kUSD)',
              color: '#f0f0f0',
              font: { size: 14 }
            },
            ticks: {
              color: '#f0f0f0'
            },
            grid: {
              color: 'rgba(255,255,255,0.1)'
            }
          }
        }
      };
  
      if(chart) chart.destroy();
      chart = ChartFactory.createScatter(ctx, datasets, options);
  
      // rellenar resumenFits
      const resumen = document.getElementById('resumenFits');
      function crearFitCard(nombre, formula, r2, imgSrc) {
        const card = document.createElement('div');
        card.className = 'fit-card';
      
        const titulo = document.createElement('h4');
        titulo.textContent = nombre;
        card.appendChild(titulo);
      
        const formulaEl = document.createElement('div');
        formulaEl.className = 'formula';
        formulaEl.textContent = formula;
        card.appendChild(formulaEl);
      
        const r2El = document.createElement('div');
        r2El.className = 'r2';
        r2El.textContent = `R² = ${r2.toFixed(6)}`;
        card.appendChild(r2El);

        card.addEventListener('click', () => {
          const modal = document.getElementById('imgModal');
          const modalImg = document.getElementById('modalImg');
          modalImg.src = imgSrc;
          modal.style.display = 'flex';
        });

        return card;
      }
      document.querySelector('.modal-close').addEventListener('click', () => {
        document.getElementById('imgModal').style.display = 'none';
      });
      window.addEventListener('click', (e) => {
        const modal = document.getElementById('imgModal');
        if (e.target === modal) modal.style.display = 'flex';
      });
      
      resumen.innerHTML = '';
      if (ajustes.lineal) resumen.appendChild(crearFitCard('LINEAL', ajustes.lineal.fit.formula, ajustes.lineal.r2, 'img/lineal.png'));
      if (ajustes.cuadratico) resumen.appendChild(crearFitCard('CUADRÁTICO', ajustes.cuadratico.fit.formula, ajustes.cuadratico.r2, 'img/cuadratico.png'));
      if (ajustes.exponencial) resumen.appendChild(crearFitCard('EXPONENCIAL', ajustes.exponencial.fit.formula, ajustes.exponencial.r2, 'img/exponencial.png'));
      if (ajustes.potencial) resumen.appendChild(crearFitCard('POTENCIAL', ajustes.potencial.fit.formula, ajustes.potencial.r2, 'img/potencial.png'));

      // mostrar pasos
      document.getElementById('calculoLineal').textContent = Calculos.textoPasosLineal(data);
      document.getElementById('calculoCuadratico').textContent = Calculos.textoPasosCuadratico(data);
      document.getElementById('calculoExponencial').textContent = Calculos.textoPasosExponencial(data);
      document.getElementById('calculoPotencial').textContent = Calculos.textoPasosPotencial(data);
    }
  
    document.getElementById('refresh').addEventListener('click', render);
    document.getElementById('zoomIn').addEventListener('click', ()=> chart.zoom(1.2));
    document.getElementById('zoomOut').addEventListener('click', ()=> chart.zoom(0.8));
    document.getElementById('resetZoom').addEventListener('click', ()=> chart.resetZoom());
  
    // render al cargar
    await render();
  })();