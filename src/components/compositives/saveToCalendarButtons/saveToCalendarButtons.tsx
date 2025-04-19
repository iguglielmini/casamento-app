import { Box } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { ButtonCustom } from "../../basics";
import { downloadICS } from "../../../utils";

export default function SaveToCalendarButtons() {
  const handleDownloadICS = () => {
    downloadICS({
      title: "Casamento Ítalo e Daniely",
      description: "Vamos celebrar juntos! 💍",
      location: "Vinttage Casa de Eventos",
      start: "20251128T220000Z",
      end: "20251129T000000Z",
      filename: "casamento-italo-daniely.ics",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <ButtonCustom
        onClick={handleDownloadICS}
        variantType="primary"
        typeStyle="circle"
        sizeType="lg"
      >
        <EventNoteIcon sx={{ mr: 1 }} />
        Salvar na Agenda (ICS)
      </ButtonCustom>

      <ButtonCustom
        variantType="primary"
        typeStyle="circle"
        sizeType="lg"
        component="a"
        href="https://www.google.com/calendar/render?action=TEMPLATE&text=Casamento+Ítalo+e+Daniely&dates=20251128T220000Z/20251129T000000Z&details=Vamos+celebrar+juntos!+💍&location=Vinttage+Casa+de+Eventos&sf=true&output=xml"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CalendarMonthIcon sx={{ mr: 1 }} />
        Salvar na Agenda Google
      </ButtonCustom>
    </Box>
  );
}
