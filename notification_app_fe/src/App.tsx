import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotificationsPage from "./pages/NotificationsPage";
import PriorityInboxPage from "./pages/PriorityInboxPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<NotificationsPage />}
        />

        <Route
          path="/priority"
          element={<PriorityInboxPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;