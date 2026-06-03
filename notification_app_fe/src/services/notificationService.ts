import axios from "axios";

const API_URL =
  "http://4.224.186.213/evaluation-service/notifications";

const TOKEN =
  import.meta.env.VITE_ACCESS_TOKEN;

export async function fetchNotifications() {
  const response = await axios.get(
    API_URL,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );

  return response.data;
}