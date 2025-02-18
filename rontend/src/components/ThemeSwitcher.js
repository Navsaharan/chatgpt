import React, { useState, useEffect } from "react";

function ThemeSwitcher() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.body.className = darkMode ? "dark-theme" : "light-theme";
    }, [darkMode]);

    return (
        <div className="container mt-4">
            <h3>Customize Theme</h3>
            <button className="btn btn-dark me-2" onClick={() => setDarkMode(true)}>Dark Mode</button>
            <button className="btn btn-light" onClick={() => setDarkMode(false)}>Light Mode</button>
        </div>
    );
}

export default ThemeSwitcher;
