import { format as dateFormat } from "date-fns";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

type Game = {
  id: string;
  winner_name: string | null;
  created_at: string;
};

export const useExport = (games: Game[]) => {
  const exportData = (exportFormat: 'csv' | 'xls' | 'pdf') => {
    const data = games.map(game => ({
      Vencedor: game.winner_name,
      Data: dateFormat(new Date(game.created_at), "dd/MM/yy"),
      Hora: dateFormat(new Date(game.created_at), "HH:mm"),
    }));

    if (exportFormat === 'csv' || exportFormat === 'xls') {
      const headers = ['Vencedor', 'Data', 'Hora'];
      const separator = exportFormat === 'csv' ? ',' : '\t';
      const fileExtension = exportFormat === 'csv' ? 'csv' : 'xls';
      
      const csvContent = [
        headers.join(separator),
        ...data.map(row => Object.values(row).join(separator))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ranking.${fileExtension}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (exportFormat === 'pdf') {
      const doc = new jsPDF();
      
      // Adiciona título
      doc.setFontSize(16);
      doc.text('Ranking de Vencedores', 14, 15);
      
      // Configura a tabela
      autoTable(doc, {
        head: [['Vencedor', 'Data', 'Hora']],
        body: data.map(row => [
          row.Vencedor || '-',
          row.Data,
          row.Hora
        ]),
        startY: 25,
        headStyles: {
          fillColor: [241, 196, 15], // Cor amarela para combinar com o ícone do troféu
          textColor: [0, 0, 0],
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 10,
          cellPadding: 3,
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        }
      });

      // Salva o PDF
      doc.save('ranking.pdf');
    }
  };

  return { exportData };
};