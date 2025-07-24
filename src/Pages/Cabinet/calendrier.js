import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Headers from "../../components/Headers";
import { useState, useEffect } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { tokens } from "../../theme";
import Sidebars from "../../scenes/Sidebar";
import { toast } from "react-toastify";

const Calandrier = ({ ListDate, setListDate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [Events, setEvents] = useState([]);
  const isCollapsed = Sidebars;

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleDateClick = (selected) => {
    const title = prompt("Entre le Nom de l'evenement");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allday,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Etes vous sure de vouloir supprimer cette evenement'${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  // Responsive breakpoints
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  // Calendar display settings based on screen size
  const defaultView = isMobile
    ? "dayGridMonth"
    : isTablet
    ? "timeGridWeek"
    : "dayGridMonth";

  const headerToolbar = {
    left: isMobile ? "prev,next" : "prev,next today",
    center: "title", // toujours visible
    right: isMobile
      ? "listDay" // ou ce que tu veux
      : "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
  };
  console.log("headerToolbar:", headerToolbar);

  const calendarHeight = isMobile ? "auto" : "70vh";

  return (
    <Box m="0px 20px">
      <Box>
        <Headers title="AGENDA" subtitle="Liste des rendez vous" />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        {/* calendrier sidebar*/}
        {!isMobile && (
          <Box
            flex="1 1 20%"
            backgroundColor={colors.primary[400]}
            borderRadius="4px"
          >
            <Typography variant="h5">Evenements</Typography>
            <List>
              {Events.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>{formatDate(event.start)}</Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* calendrier */}
        <Box flex="1 1 100%" ml="5px">
          <Fullcalendar
            height={calendarHeight}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={headerToolbar}
            initialView={defaultView}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={!isMobile}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setEvents(events)}
            initialEvents={[
              { id: "1234", title: "Visite Technique", date: "2025-09-04" },
              { id: "4321", title: "Rendez personnel", date: "2025-09-24" },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calandrier;
