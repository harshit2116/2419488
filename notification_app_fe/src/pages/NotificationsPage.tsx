import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchNotifications } from "../services/notificationService";

function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<any[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadNotifications() {
  try {
    const data = await fetchNotifications();

    console.log("API RESPONSE:");
    console.log(data);

    setNotifications(data.notifications);
  } catch (error) {
    console.error("FETCH ERROR:", error);
  } finally {
    setLoading(false);
  }
}

    loadNotifications();
  }, []);

  console.log("Notifications State:");
    console.log(notifications);
  return (
    <>
      <AppBar position="static" sx={{backgroundColor: "#7c3aed"}}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            Campus Notifications
          </Typography>

          <Button
            color="inherit"
            component={Link}
            to="/priority"
          >
            Priority Inbox
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
        >
          All Notifications
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <Stack spacing={2}>
            {notifications.map(
              (notification) => (
                <Card
                  key={notification.ID}
                >
                  <CardContent>
                    <Typography variant="h6">
                      {
                        notification.Type
                      }
                    </Typography>

                    <Typography>
                      {
                        notification.Message
                      }
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {
                        notification.Timestamp
                      }
                    </Typography>
                  </CardContent>
                </Card>
              )
            )}
          </Stack>
        )}
      </Container>
    </>
  );
}

export default NotificationsPage;