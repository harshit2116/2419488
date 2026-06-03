import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

function NotificationsPage() {
  const notifications = [
    "Sample Notification 1",
    "Sample Notification 2",
  ];

  return (
    <>
      <AppBar position="static" sx={{backgroundColor: "#7c3aed"}}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Campus Notifications
          </Typography>

          <Button color="inherit" component={Link} to="/priority">
            Priority Inbox
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          All Notifications
        </Typography>

        <ul style={{ paddingLeft: 16 }}>
          {notifications.map((n, i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              {n}
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

export default NotificationsPage;