import { useEffect } from "react";
import { fetchNotifications } from "./services/notificationService";
import { getTopNotifications } from "./utils/priorityEngine";

function App() {
  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await fetchNotifications();

        console.log("ALL NOTIFICATIONS");
        console.log(data.notifications);

        const top10 = getTopNotifications(
          data.notifications,
          10
        );

        console.log("TOP 10 NOTIFICATIONS");
        console.log(top10);
      } catch (error) {
        console.error(
          "Failed to fetch notifications:",
          error
        );
      }
    }

    loadNotifications();
  }, []);

  return (
    <div>
      <h1>Campus Notifications</h1>
    </div>
  );
}

export default App;