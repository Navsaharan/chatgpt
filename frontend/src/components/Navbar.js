import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.body.className = darkMode ? "light-theme" : "dark-theme";
    };

    return (
        <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
            <a className="navbar-brand" href="/">AI Trading</a>
            <button className="btn btn-sm btn-secondary ms-auto" onClick={toggleTheme}>
                {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
        </nav>
    );
}

export default Navbar;
