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
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchNotifications } from "../services/notificationService";
import { getTopNotifications } from "../utils/priorityEngine";

function PriorityInboxPage() {
  const [notifications, setNotifications] =
    useState<any[]>([]);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data =
          await fetchNotifications();

        const top10 =
          getTopNotifications(
            data.notifications,
            10
          );

        setNotifications(top10);
      } catch (error) {
        console.error(error);
      }
    }

    loadNotifications();
  }, []);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#6d28d9",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            Priority Inbox
          </Typography>

          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            All Notifications
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
        >
          Top 10 Priority Notifications
        </Typography>

        <Stack spacing={2}>
          {notifications.map(
            (notification) => (
              <Card
                key={notification.ID}
              >
                <CardContent>
                  <Typography variant="h6">
                    {notification.Type}
                  </Typography>

                  <Typography>
                    {notification.Message}
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
      </Container>
    </>
  );
}

export default PriorityInboxPage;