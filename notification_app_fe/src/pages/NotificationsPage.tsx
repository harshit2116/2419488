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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchNotifications } from "../services/notificationService";

function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<any[]>([]);

  const [readNotifications, setReadNotifications] =
    useState<string[]>([]);

  const [filter, setFilter] =
    useState("All");

  const [page, setPage] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const itemsPerPage = 5;

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data =
          await fetchNotifications();

        setNotifications(
          data.notifications
        );
      } catch (error) {
        console.error(
          "FETCH ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, []);

  useEffect(() => {
    const saved =
      localStorage.getItem("readNotifications");

    if (saved) {
      setReadNotifications(
        JSON.parse(saved)
      );
    }
  }, []);

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter(
          (notification) =>
            notification.Type ===
            filter
        );

  const totalPages = Math.ceil(
    filteredNotifications.length /
      itemsPerPage
  );

  const paginatedNotifications =
    filteredNotifications.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );

  function markAsRead(id: string) {
    if (
      readNotifications.includes(id)
    )
      return;

    const updated = [
      ...readNotifications,
      id,
    ];

    setReadNotifications(updated);

    localStorage.setItem(
      "readNotifications",
      JSON.stringify(updated)
    );
  }

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor:
            "#7c3aed",
        }}
      >
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

        <FormControl
          fullWidth
          sx={{ mb: 3 }}
        >
          <InputLabel>
            Notification Type
          </InputLabel>

          <Select
            value={filter}
            label="Notification Type"
            onChange={(e) => {
              setFilter(
                e.target.value
              );
              setPage(1);
            }}
          >
            <MenuItem value="All">
              All
            </MenuItem>

            <MenuItem value="Placement">
              Placement
            </MenuItem>

            <MenuItem value="Result">
              Result
            </MenuItem>

            <MenuItem value="Event">
              Event
            </MenuItem>
          </Select>
        </FormControl>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Stack spacing={2}>
              {paginatedNotifications.map(
                (notification) => (
                  <Card
                    key={
                      notification.ID
                    }
                    onClick={() =>
                      markAsRead(
                        notification.ID
                      )
                    }
                    sx={{
                      cursor: "pointer",
                      backgroundColor:
                        readNotifications.includes(
                          notification.ID
                        )
                          ? "#f3f4f6"
                          : "#ffffff",
                    }}
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
                        sx={{
                          mt: 1,
                          fontWeight: 600,
                          color:
                            readNotifications.includes(
                              notification.ID
                            )
                              ? "#6b7280"
                              : "#16a34a",
                        }}
                      >
                        {readNotifications.includes(
                          notification.ID
                        )
                          ? "Read"
                          : "Unread"}
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

            <Pagination
              count={totalPages}
              page={page}
              onChange={(
                _,
                value
              ) =>
                setPage(value)
              }
              sx={{
                mt: 4,
                display: "flex",
                justifyContent:
                  "center",
              }}
            />
          </>
        )}
      </Container>
    </>
  );
}

export default NotificationsPage;