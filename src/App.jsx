import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Theme,Button } from "@chakra-ui/react";
import Home from "./pages/home/Home";
import Header from "./components/Header";
import "./App.css";
import { useColorMode } from "@/components/ui/color-mode";
import { useTranslation } from "react-i18next";

function App() {
  const [themeMode, setThemeMode] = useState("dark");
  const { toggleColorMode } = useColorMode();

  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    toggleColorMode();
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="container">
      <Router>
        <Theme appearance={themeMode}>
          <Header toggleTheme={toggleTheme} />
          <Box padding={4}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          {/* <Button onClick={toggleLanguage}>
              {i18n.language === "fr" ? "EN" : "FR"}
            </Button> */}
          </Box>
        </Theme>
      </Router>
    </div>
  );
}

export default App;
