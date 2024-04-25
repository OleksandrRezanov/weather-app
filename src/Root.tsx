import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { WeatherDetailsPage } from "./pages/WeatherDetailsPage";
import App from "./App";
import { useSelector } from "react-redux";
import { selectUsers } from "./store/slices/usersSlice";

export const Root = () => {
  const user = useSelector(selectUsers);

  return (
    <>
      {user.currentUser ? (
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/weatherApp" />} />
            <Route path="/weatherApp" element={<Outlet />}>
              <Route index element={<App />} />
              <Route path="details" element={<WeatherDetailsPage />} />
            </Route>
          </Routes>
        </Router>
      ) : (
        <LoginPage />
      )}
    </>
  );
};
