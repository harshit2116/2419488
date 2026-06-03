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
import { getTopNotifications } from "../utils/priorityEngine";

function PriorityInboxPage() {
  const [notifications, setNotifications] =
    useState<any[]>([]);

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

        const top10 =
          getTopNotifications(
            data.notifications,
            10
          );

        setNotifications(top10);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
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

export default PriorityInboxPage;