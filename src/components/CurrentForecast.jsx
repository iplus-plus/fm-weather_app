import React from "react";

const CurrentForecast = () => {
    return (
        <>
            <MainInfo />
            <ExtraInfo />
        </>
    );
};

const MainInfo = () => {
    return (
        <div
            style={{
                backgroundImage: 'url("../../public/images/bg-today-small.svg")'
            }}
            className="h-[350px] mt-8 bg-no-repeat bg-cover rounded-xl flex justify-center items-center flex-col"
        >
            <h1 className="text-4xl font-black capitalize text-[var(--neutral-0)]">
                berlin, german
            </h1>
            <p className="text-[var(--neutral-300)] capitalize font-semibold mt-2">
                tuesday, 15 june 1999
            </p>
            <div className="flex gap-4 mt-8">
                <img
                    className="size-28"
                    src="../../public/images/icon-sunny.webp"
                />
                <p className="text-8xl text-white font-bold italic">20°</p>
            </div>
        </div>
    );
};

const ExtraInfo = () => {
    const data = [
        { name: "feels like", value: 18, units: "°" },
        { name: "humidity", value: 46, units: "%" },
        { name: "wind", value: 14, units: "km/h" },
        { name: "precipation", value: 0, units: "mm" }
    ];
    return (
        <div className="grid grid-cols-2 gap-4 mt-8">
            {data.map(d => (
                <div
                    className="p-4 rounded-lg bg-[var(--neutral-800)]  text-white border-2 border-[var(--neutral-600)]"
                    key={d.name}
                >
                    <p className="capitalize font-light">{d.name}</p>
                    <p className="text-3xl mt-4 font-light">
                        {d.value} {d.units}
                    </p>
                </div>
            ))}
        </div>
    );
};
export default CurrentForecast;
