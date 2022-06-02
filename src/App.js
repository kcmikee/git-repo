import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Homepage from "./pages/Landing";
import RepositoryDetail from "./pages/RepoDetail";
import SearchPage from "./pages/Search";
import ErrorPage from "./pages/Error";

function App() {
  const Theme = {
    colors: { primary: "#faf4e4", secondary: "#19487b", tertiary: "#d1e7e1" },
    fontSizes: { title: "clamp(1.25rem, 5vw, 4rem)", body: "1rem" },
    // mediaQuerySmall: "320px",
    // mediaQueryMedium: "600px",
    // mediaQueryLarge: "800px",
  };
  return (
    <Router>
      <ThemeProvider theme={Theme}>
        <Routes>
          <Route exact path="/error" element={<ErrorPage />} />
          <Route path="/repository/*" element={<RepositoryDetail />} />
          <Route path="/search/:q" element={<SearchPage />} />
          <Route exact path="/" element={<Homepage />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
