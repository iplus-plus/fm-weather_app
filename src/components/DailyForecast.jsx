import React from "react";

const DailyForecast = () => {
    const data = [
        { name: "tue", day: 14, night: 12 },
        { name: "wed", day: 14, night: 12 },
        { name: "thu", day: 14, night: 12 },
        { name: "fri", day: 14, night: 12 },
        { name: "sat", day: 14, night: 12 },
        { name: "sun", day: 14, night: 12 },
        { name: "mon", day: 14, night: 12 }
    ];
    return (
        <div className="mt-12 text-white">
            <h2 className="mb-4 text-2xl font-semibold capitalize">
                daily forecast
            </h2>
            <div className="grid grid-cols-3 gap-4 ">
                {data.map(d => (
                    <div
                        className="bg-[var(--neutral-800)] p-4 rounded-xl border-2 border-[var(--neutral-600)]"
                        key={d.name}
                    >
                        <h3 className="capitalize font-medium text-center">
                            {d.name}
                        </h3>
                        <img
                            className="size-12 mx-auto my-2"
                            src="../../public/images/icon-overcast.webp"
                        />
                        <div className="flex items-center justify-between text-sm">
                            <span>{d.day}°</span>
                            <span>{d.night}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyForecast;
