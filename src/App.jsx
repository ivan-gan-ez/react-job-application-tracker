import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Toaster } from "sonner";

import { createTheme } from "@mui/material/styles";
import { Typography, ThemeProvider } from "@mui/material";

import HomePage from "./pages/HomePage";
import ActionPage from "./pages/ActionPage";
import AddNewPage from "./pages/AddNewPage";
import EditPage from "./pages/EditPage";

import ResponsiveAppBar from "./components/AppBar";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#b25ef2",
        contrastText: "#fff",
      },
      secondary: {
        main: "#332a60",
        contrastText: "#fff",
      },
      yellow: {
        main: "#F7BD00",
        contrastText: "#fff",
      },
      azure: {
        main: "#007FFF",
        contrastText: "#fff",
      },
      green: {
        main: "#0EAF29",
        contrastText: "#fff",
      },
      grey: {
        main: "#bdbdbd",
        contrastText: "#000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddNewPage />} />
          <Route path="/actions" element={<ActionPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
