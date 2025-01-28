import { DownloadOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";

const HomeDashboard = () => {
  const handleDownloadPDF = async () => {
    const doc = new jsPDF();

    // Titre du PDF
    doc.setFontSize(16);
    doc.text("Statistic Dashboard", 10, 10);

    // Données de Row1 (cartes)
    const row1Data = [
      ["Sales obtained", "431,225", "+21%"],
      ["New Clients", "12", "+5%"],
      ["Project Completed", "12,361", "+43%"],
      ["Employees Number", "12,361", "+14%"],
    ];

    // Ajouter les données de Row1 au PDF
    doc.autoTable({
      startY: 20,
      head: [["Metric", "Value", "Percentage"]],
      body: row1Data,
    });

    // Données de Row2 (revenus)
    const row2Data = [["Revenue Generated", "$59,342.32"]];

    // Ajouter les données de Row2 au PDF
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 10,
      head: [["Metric", "Value"]],
      body: row2Data,
    });

    // Capturer le graphique en tant qu'image
    const graphElement = document.getElementById("line-graph"); // Assurez-vous que votre graphique a cet ID
    if (graphElement) {
      const canvas = await html2canvas(graphElement);
      const imgData = canvas.toDataURL("image/png");

      // Ajouter l'image du graphique au PDF
      const imgWidth = 180; // Largeur de l'image dans le PDF
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Conserver le ratio d'aspect
      doc.addImage(imgData, "PNG", 10, doc.autoTable.previous.finalY + 10, imgWidth, imgHeight);
    }

    // Télécharger le PDF
    doc.save("Statistic_Dashboard.pdf");
  };

  return (
    <div>
      <Box sx={{ textAlign: "right" }} className="py-10">
        <Button
          variant="contained"
          style={{ backgroundColor: "#4C585B" }}
          onClick={handleDownloadPDF}
        >
          <DownloadOutlined />
          Download Reports
        </Button>
      </Box>
      <Row1 />
      <Row2 />
    </div>
  );
};

export default HomeDashboard;