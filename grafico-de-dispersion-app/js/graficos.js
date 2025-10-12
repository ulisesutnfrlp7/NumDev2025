// js/graficos.js
// Provee DataLoader y utilidades para crear charts (global)

window.DataLoader = (function(){
    async function loadXLSX(path){
      const res = await fetch(path);
      const arrayBuffer = await res.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
  
      const clusters = { A: [], B: [], C: [] };
      jsonData.forEach(d => {
        if(!d) return;
        const barrio = (''+ (d.neighborhood||d.Neighborhood||d.NEIGHBORHOOD || '')).toString().trim();
        const m2 = parseFloat(d.area_m2 || d.area || d.area_m || d.Area || d['area_m2']);
        const precio = parseFloat(d.price_kUSD || d.price || d.price_k || d.Price || d['price_kUSD']);
        if (['A','B','C'].includes(barrio) && !Number.isNaN(m2) && !Number.isNaN(precio)){
          clusters[barrio].push({ x: m2, y: precio });
        }
      });
      return clusters;
    }
  
    return { loadXLSX };
  })();
  
  window.ChartFactory = (function(){
    function createScatter(ctx, datasets, options){
      return new Chart(ctx, {
        type:'scatter',
        data: { datasets: datasets },
        options: options
      });
    }
  
    return { createScatter };
  })();