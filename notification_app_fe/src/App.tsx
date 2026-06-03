import { useEffect } from "react";
import { log } from "./utils/logger";

function App() {
  useEffect(() => {
    log(
      "frontend",
      "info",
      "page",
      "application started"
    )
      .then(console.log)
      .catch(console.error);
  }, []);

  return <h1>Campus Notifications</h1>;
}

export default App;