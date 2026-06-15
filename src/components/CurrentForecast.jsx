import { setIcon } from "../utils/data.js";

const MainInfo = ({ geoData, forecastData }) => {
    const { current, current_units } = forecastData?.data || {};

    return (
        <div
            className={`mt-8 mainBg md:px-14 flex h-[350px] flex-col md:flex-row items-center justify-center md:justify-between bg-center rounded-xl bg-cover bg-no-repeat p-4`}
        >
            <div>
                <h1 className="text-center text-2xl font-black capitalize text-[var(--neutral-0)]">
                    {geoData?.name}, {geoData?.country}
                </h1>
                <p className="mt-2 capitalize font-semibold text-[var(--neutral-300)]">
                    {new Date().toLocaleDateString("en-GB", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    })}
                </p>
            </div>
            <div className="mt-8 md:mt-0 flex items-center gap-4">
                <img
                    className="size-28"
                    src={setIcon[current?.weather_code] || setIcon[0]}
                    alt="weather icon"
                />
                <p className="text-7xl font-bold italic text-white">
                    {Math.round(current?.temperature_2m) || 0}
                    {current_units?.temperature_2m}
                </p>
            </div>
        </div>
    );
};

const ExtraInfo = ({ forecastData }) => {
    const { current, current_units } = forecastData?.data || {};

    const items = [
        {
            name: "feels like",
            value: current?.apparent_temperature,
            units: current_units?.apparent_temperature
        },
        {
            name: "humidity",
            value: current?.relative_humidity_2m,
            units: current_units?.relative_humidity_2m
        },
        {
            name: "wind",
            value: current?.wind_speed_10m,
            units: current_units?.wind_speed_10m
        },
        {
            name: "precipitation",
            value: current?.precipitation,
            units: current_units?.precipitation
        }
    ];

    return (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {items.map(item => (
                <div
                    key={item.name}
                    className="rounded-lg border-2 border-[var(--neutral-600)] bg-[var(--neutral-800)] p-4 text-white"
                >
                    <p className="font-light capitalize">{item.name}</p>
                    <p className="mt-4 text-3xl font-light">
                        {item.value}{" "}
                        <span className="text-2xl opacity-20">
                            {item.units}
                        </span>
                    </p>
                </div>
            ))}
        </div>
    );
};

const CurrentForecast = ({ geoData, forecastData }) => (
    <>
        <MainInfo geoData={geoData} forecastData={forecastData} />
        <ExtraInfo forecastData={forecastData} />
    </>
);

export default CurrentForecast;
