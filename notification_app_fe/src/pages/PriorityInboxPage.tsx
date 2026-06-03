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

function PriorityInboxPage() {
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
          Priority Inbox
        </Typography>

        <Stack spacing={2}>
          <Card>
            <CardContent>
              Top Priority Notification
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </>
  );
}

export default PriorityInboxPage;