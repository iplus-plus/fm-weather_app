import React from "react";
import Navbar from "./components/Navbar.jsx";
import Searchbar from "./components/Searchbar.jsx";
import CurrentForecast from "./components/CurrentForecast.jsx";
import DailyForecast from "./components/DailyForecast.jsx";
import HourlyForecast from "./components/HourlyForecast.jsx";

const App = () => {
    return (
        <div className="p-4">
            <Navbar />
            <main>
                <p
                    style={{ fontFamily: "var(--bricolage)" }}
                    className="my-[80px] leading-tight mx-auto text-6xl max-w-[10ch] text-center font-bold text-[var(--neutral-0)] first-letter:uppercase"
                >
                    how's the sky looking today?
                </p>
                <Searchbar />
                <CurrentForecast />
                <DailyForecast />
                <HourlyForecast />
            </main>
        </div>
    );
};

export default App;
