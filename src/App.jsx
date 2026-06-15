import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "./components/Navbar.jsx";
import Searchbar from "./components/Searchbar.jsx";
import CurrentForecast from "./components/CurrentForecast.jsx";
import DailyForecast from "./components/DailyForecast.jsx";
import HourlyForecast from "./components/HourlyForecast.jsx";

const DEFAULT_PLACE = {
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
};

const DEFAULT_SETTING = {
    temperature: "celsius",
    windspeed: "kmh",
    precipitation: "mm"
};

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

const App = () => {
    const [search, setSearch] = useState("");
    const [debounce, setDebounce] = useState(search);
    const [place, setPlace] = useState(DEFAULT_PLACE);
    const [settings, setSettings] = useState(DEFAULT_SETTING);
    const [isSearch, setIsSearch] = useState(false);

    const geoData = useQuery({
        queryKey: ["geo", debounce],
        queryFn: () =>
            fetch(
                `${GEOCODING_URL}?name=${debounce}&count=10&language=en&format=json`
            ).then(res => res.json()),
        enabled: debounce.length > 1
    });

    const forecastData = useQuery({
        queryKey: ["forecast", place],
        queryFn: () =>
            fetch(
                `${FORECAST_URL}?latitude=${place.latitude}&longitude=${place.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m&precipitation_unit=${settings.precipitation}&wind_speed_unit=${settings.windspeed}&temperature_unit=${settings.temperature}`
            ).then(res => res.json()),
        enabled: place != null
    });

    return (
        <div className="p-4 md:px-8 max-w-screen-xl w-full mx-auto">
            <Navbar settings={settings} setSettings={setSettings} />
            <main>
                <p
                    style={{ fontFamily: "var(--bricolage)" }}
                    className="mx-auto my-[80px] max-w-[10ch] md:max-w-full text-center text-6xl font-bold leading-tight text-[var(--neutral-0)] first-letter:uppercase"
                >
                    how's the sky looking today?
                </p>
                <Searchbar
                    setIsSearch={setIsSearch}
                    geoData={geoData}
                    search={search}
                    setSearch={setSearch}
                    setPlace={setPlace}
                    setDebounce={setDebounce}
                />
                {isSearch ? (
                    <div className="py-8">
                        {search && (
                            <p className="text-white capitalize font-medium text-lg">
                                results for {search}
                            </p>
                        )}
                        <div>
                            {geoData?.data?.results?.map(d => (
                                <div
                                    key={d.id}
                                    onClick={() => {
                                        setPlace(d);
                                        setIsSearch(false);
                                    }}
                                    className="flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-[--neutral-300]"
                                >
                                    <img
                                        className="size-10"
                                        src={`https://hatscripts.github.io/circle-flags/flags/${d?.country_code?.toLowerCase()}.svg`}
                                        alt=""
                                    />
                                    <div>
                                        <p className="text-base font-semibold capitalize text-white">
                                            {d.name}
                                        </p>
                                        <small className="text-xs text-[var(--neutral-200)]">
                                            {d.admin1 ? `${d.admin1}, ` : ""}
                                            {d.country ?? "-"}
                                        </small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-[calc(70%-32px)_30%] gap-8">
                        <div>
                            <CurrentForecast
                                forecastData={forecastData}
                                geoData={place}
                            />
                            <DailyForecast
                                dailyData={forecastData?.data?.daily}
                            />
                        </div>
                        <HourlyForecast
                            units={forecastData?.data?.hourly_units}
                            hourlyData={forecastData?.data?.hourly}
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
