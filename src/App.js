import { Box } from "@mui/system";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Account from "./components/Account";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dasboard";
import Songs from "./pages/Songs";
import Favorites from "./pages/Favorites";
import Playlists from "./pages/Playlists";
import Contacts from "./pages/Contacts";
function App() {
  return (
    <Box
      minHeight="100vh"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AuthContextProvider>
        <Box mb={10}>
          <Navbar />
        </Box>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthContextProvider>
    </Box>
  );
}

export default App;
