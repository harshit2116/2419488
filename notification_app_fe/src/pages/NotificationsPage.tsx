import { Link } from "react-router-dom";

function NotificationsPage() {
  return (
    <div>
      <h1>All Notifications</h1>

      <Link to="/priority">
        Priority Inbox
      </Link>
    </div>
  );
}

export default NotificationsPage;