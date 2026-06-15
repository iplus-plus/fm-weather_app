import { useState } from "react";
import { setIcon } from "../utils/data.js";
import iconDropdown from "../assets/images/icon-dropdown.svg";

const DAYS = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
];

const getCurrentDayName = () =>
    new Date().toLocaleDateString("en-GB", { weekday: "long" }).toLowerCase();

const groupByDay = (temperature_2m, time, weather_code) => {
    const days = [];
    for (let i = 0; i < (temperature_2m?.length || 0); i += 24) {
        days.push({
            times: time?.slice(i, i + 24),
            temperatures: temperature_2m?.slice(i, i + 24),
            icons: weather_code?.slice(i, i + 24)
        });
    }
    return days;
};

const formatHour = dateString =>
    new Date(dateString).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

const HourlyForecast = ({ hourlyData, units }) => {
    const { temperature_2m, time, weather_code } = hourlyData || {};
    const [selectedDay, setSelectedDay] = useState(getCurrentDayName());
    const [isOpen, setIsOpen] = useState(false);

    const groupedDays = groupByDay(temperature_2m, time, weather_code);

    const currentData = groupedDays.find(group => {
        const groupDayName = group.times?.[0]
            ? new Date(group.times[0])
                  .toLocaleDateString("en-GB", { weekday: "long" })
                  .toLowerCase()
            : null;
        return groupDayName === selectedDay;
    });

    return (
        <div className="mt-8 p-4 rounded-2xl text-white bg-[var(--neutral-800)]">
            <header className="flex items-center justify-between capitalize">
                <h2 className="font-semibold text-xl">hourly forecast</h2>

                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    className="relative capitalize flex bg-[var(--neutral-600)] rounded items-center gap-4 py-2 text-base font-medium px-4"
                >
                    {selectedDay}
                    <img className="size-3" src={iconDropdown} alt="" />

                    <ul
                        className={`absolute right-0 top-0 mt-14 flex w-[180px] flex-col gap-2 rounded-lg border-2 border-[var(--neutral-600)] bg-[var(--neutral-800)] p-2 text-left transition-all duration-300 ${
                            isOpen
                                ? "opacity-100 pointer-events-auto translate-y-0"
                                : "opacity-0 pointer-events-none -translate-y-2"
                        }`}
                    >
                        {DAYS.map(d => (
                            <li
                                key={d}
                                onClick={() => setSelectedDay(d)}
                                className={`px-4 py-3 rounded transition-colors hover:bg-[var(--neutral-600)] ${
                                    selectedDay === d
                                        ? "bg-[var(--neutral-600)]"
                                        : ""
                                }`}
                            >
                                {d}
                            </li>
                        ))}
                    </ul>
                </button>
            </header>

            <ul className="flex h-[400px] md:h-[650px] flex-col gap-4 overflow-y-auto mt-4">
                {currentData?.times?.map((d, i) => (
                    <li
                        key={d}
                        className="flex items-center justify-between rounded-lg border border-[var(--neutral-600)] bg-[var(--neutral-700)] py-2 px-4"
                    >
                        <div className="flex items-center gap-6">
                            <img
                                className="size-12"
                                src={setIcon[currentData.icons[i]]}
                                alt=""
                            />
                            <p className="text-xl font-medium">
                                {formatHour(d)}
                            </p>
                        </div>
                        <p className="font-medium">
                            {Math.round(currentData.temperatures[i])}{" "}
                            {units?.temperature_2m}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HourlyForecast;
