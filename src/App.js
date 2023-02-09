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
import CreateSong from "./pages/CreateSong";
function App() {
  return (
    <Box minHeight="100vh" sx={{ display: "flex" }}>
      <AuthContextProvider>
        <Navbar />
        <Box mt={6} p={2}>
          <Routes>
            <Route path="/worship" element={<Home />} />
            <Route path="/worship/signin" element={<Signin />} />
            <Route path="/worship/signup" element={<Signup />} />
            <Route path="/worship/dashboard" element={<Dashboard />} />
            <Route path="/worship/songs" element={<Songs />} />
            <Route path="/worship/favorites" element={<Favorites />} />
            <Route path="/worship/playlists" element={<Playlists />} />
            <Route path="/worship/contacts" element={<Contacts />} />
            <Route path="/worship/create" element={<CreateSong />} />
            <Route
              path="/worship/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="worship/" replace />} />
          </Routes>
        </Box>
      </AuthContextProvider>
    </Box>
  );
}

export default App;
