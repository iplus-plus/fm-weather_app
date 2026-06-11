import { useState } from "react";

const HourlyForecast = () => {
    const [day, setDay] = useState("tuesday");
    const data = [
        { hour: 6, temp: 20 },
        { hour: 7, temp: 20 },
        { hour: 8, temp: 20 },
        { hour: 9, temp: 20 },
        { hour: 10, temp: 20 },
        { hour: 11, temp: 20 },
        { hour: 12, temp: 20 },
        { hour: 13, temp: 20 }
    ];
    return (
        <div className="mt-8 p-4 rounded-2xl text-white bg-[var(--neutral-800)]">
            <header className="flex items-center justify-between capitalize">
                <h2 className="font-semibold text-xl">hourly forecast</h2>
                <button className=" capitalize flex bg-[var(--neutral-600)] rounded items-center gap-4 py-2 text-base font-medium px-4">
                    {day}
                    <img
                        className="size-3"
                        src="../../public/images/icon-dropdown.svg"
                    />
                </button>
            </header>
            <ul className="flex flex-col gap-4 mt-4">
                {data.map(d => (
                    <li
                        className="bg-[var(--neutral-700)] rounded-lg flex items-center py-2 px-4 justify-between border border-[var(--neutral-600)]"
                        key={d.hour}
                    >
                        <div className="flex items-center gap-6">
                            <img
                                className="size-12"
                                src="../../public/images/icon-partly-cloudy.webp"
                            />
                            <p className="text-xl font-medium">{d.hour}</p>
                        </div>
                        <p className="font-medium">{d.temp}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HourlyForecast;
