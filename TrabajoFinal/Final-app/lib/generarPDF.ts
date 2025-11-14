import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generarReportePDF({
  pais,
  tipo,
  costoDescarga,
  ingresoDescarga,
  metaGanancia,
  tiempoEstimado,
  detalleResultados,
  logoBase64,
}) {
  const doc = new jsPDF();

  // ===========================
  // ENCABEZADO CON FONDO AZUL
  // ===========================
  doc.setFillColor(32, 75, 145); // azul elegante
  doc.rect(0, 0, 210, 35, "F");

  // Logo (si existe)
  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", 160, 5, 40, 25);
  }

  // Título en blanco
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Reporte de Análisis Financiero", 14, 15);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("MobileMetrics Analytics", 14, 25);

  // Línea sutil abajo del título
  doc.setDrawColor(255, 255, 255);
  doc.line(14, 28, 90, 28);

  // Reset color para el resto del PDF
  doc.setTextColor(0, 0, 0);

  // ===========================
  // INFORMACIÓN BÁSICA
  // ===========================
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Fecha de generación:", 14, 45);
  doc.setFont("helvetica", "normal");
  doc.text(`${new Date().toLocaleDateString()}`, 60, 45);

  doc.setFont("helvetica", "bold");
  doc.text("País:", 14, 52);
  doc.setFont("helvetica", "normal");
  doc.text(`${pais}`, 60, 52);

  doc.setFont("helvetica", "bold");
  doc.text("Tipo de aplicación:", 14, 59);
  doc.setFont("helvetica", "normal");
  doc.text(`${tipo}`, 60, 59);

  // ===========================
  // TABLA DE PARÁMETROS
  // ===========================
  autoTable(doc, {
    startY: 75,
    theme: "grid",
    head: [["Parámetro", "Valor"]],
    body: [
      ["Costo por descarga", `$${costoDescarga}`],
      ["Ingreso por descarga", `$${ingresoDescarga}`],
      ["Meta de ganancia neta", `$${metaGanancia}`],
    ],
    styles: {
      font: "helvetica",
      fontSize: 11,
      halign: "left",
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [32, 75, 145], // azul
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [240, 245, 255], // celeste muy suave
    },
  });

  // ===========================
  // TABLA DE RESULTADOS
  // ===========================
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 12,
    theme: "grid",
    head: [["Resultado", "Valor"]],
    body: [
      ["Tiempo estimado para alcanzar la meta", `${tiempoEstimado} días`],
      ...detalleResultados,
    ],
    styles: {
      font: "helvetica",
      fontSize: 11,
      halign: "left",
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [0, 125, 190], // azul más vibrante
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [225, 245, 255], // celeste hielo
    },
  });

  // ===========================
  // NOTA FINAL / FOOTER
  // ===========================
  const finalY = doc.lastAutoTable.finalY + 20;

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(
    "Reporte generado automáticamente con MobileMetrics Analytics.",
    14,
    finalY
  );

  doc.setFontSize(8);
  doc.text("© 2025 MobileMetrics - Todos los derechos reservados", 14, finalY + 6);

  // ===========================
  // GUARDAR PDF
  // ===========================
  doc.save(`reporte_financiero_${pais}.pdf`);
}