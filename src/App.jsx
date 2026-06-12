import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "./components/Navbar.jsx";
import Searchbar from "./components/Searchbar.jsx";
import CurrentForecast from "./components/CurrentForecast.jsx";
import DailyForecast from "./components/DailyForecast.jsx";
import HourlyForecast from "./components/HourlyForecast.jsx";

const App = () => {
    const [search, setSearch] = useState("");
    const [place, setPlace] = useState({
        id: 2950159,
        name: "Berlin",
        latitude: 52.52437,
        longitude: 13.41053,
        elevation: 74.0,
        feature_code: "PPLC",
        country_code: "DE",
        admin1_id: 2950157,
        admin2_id: 0,
        admin3_id: 6547383,
        admin4_id: 6547539,
        timezone: "Europe/Berlin",
        population: 3426354,
        postcodes: ["10967", "13347"],
        country_id: 2921044,
        country: "Deutschland",
        admin1: "Berlin",
        admin2: "",
        admin3: "Berlin, Stadt",
        admin4: "Berlin"
    });
    const [debounce, setDebounce] = useState(search);
    const geoData = useQuery({
        queryKey: ["geo", debounce],
        queryFn: async () =>
            await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${debounce}&count=5&language=en&format=json`
            ).then(data => data.json()),
        enabled: debounce.length > 1
    });
    const forecastData = useQuery({
        queryKey: ["forecast", place],
        queryFn: async () =>
            await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m`
            ).then(data => data.json()),
        enabled: place != null
    });
    useEffect(() => {
        console.log(forecastData.data);
    }, [forecastData.data]);

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
                <Searchbar
                    geoData={geoData}
                    search={search}
                    setSearch={setSearch}
                    setPlace={setPlace}
                    setDebounce={setDebounce}
                />
                <CurrentForecast forecastData={forecastData} geoData={place} />
                <DailyForecast dailyData={forecastData?.data?.daily} />
                <HourlyForecast />
            </main>
        </div>
    );
};

export default App;
