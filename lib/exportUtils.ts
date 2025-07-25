import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportToPDF(data: any[], headers: { label: string; key: string }[], filename: string) {
  const doc = new jsPDF();
  const tableData = data.map(row => headers.map(h => row[h.key]));
  const tableHead = [headers.map(h => h.label)];
  autoTable(doc, {
    head: tableHead,
    body: tableData,
  });
  doc.save(`${filename}.pdf`);
}