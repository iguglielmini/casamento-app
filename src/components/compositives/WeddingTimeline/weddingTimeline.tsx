import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { ImageCustom, Section } from "../../basics";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CelebrationIcon from "@mui/icons-material/Celebration";
import FloresRetas from "../../../assets/flores-retas.png";

const events = [
  {
    time: "18:30",
    description: "Recepção dos convidados",
    icon: <GroupAddIcon />,
  },
  { time: "19:00", description: "Cerimônia Religiosa", icon: <FavoriteIcon /> },
  { time: "20:00", description: "Jantar Programado", icon: <RestaurantIcon /> },
  { time: "21:00", description: "Celebração", icon: <CelebrationIcon /> },
];

export default function WeddingTimeline() {
  return (
    <Section variant="rose">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <ImageCustom
          src={FloresRetas}
          alt="Flores"
          backgroundSize="contain"
          height="150px"
          width="320px"
          boxShadow={0}
        />
        <Typography variant="h1" gutterBottom textAlign="center">
          Cerimônia
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Timeline position="alternate" sx={{ mt: 6 }}>
          {events.map((event, index) => (
            <TimelineItem key={index}>
              <TimelineOppositeContent>
                <Typography variant="h5" sx={{fontSize: {xs: '1rem', md: '2rem'}}} color="text.secondary">
                  {event.time}
                </Typography>
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineDot color="secondary">{event.icon}</TimelineDot>
                {index !== events.length - 1 && <TimelineConnector />}
              </TimelineSeparator>

              <TimelineContent>
                <Box height={150}>
                  <Typography variant="h4" sx={{fontSize: {xs: '1rem', md: '3rem'}}}>{event.description}</Typography>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Box>
    </Section>
  );
}
