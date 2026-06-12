import { setIcon } from "../utils/data.js";

const CurrentForecast = ({ geoData, forecastData }) => {
    return (
        <>
            <MainInfo geoData={geoData} forecastData={forecastData} />
            <ExtraInfo geoData={geoData} forecastData={forecastData} />
        </>
    );
};

const MainInfo = ({ geoData, forecastData }) => {
    return (
        <div
            style={{
                backgroundImage: 'url("../../public/images/bg-today-small.svg")'
            }}
            className="h-[350px] mt-8 bg-no-repeat bg-cover rounded-xl flex justify-center items-center flex-col p-4"
        >
            <h1 className="text-2xl font-black capitalize text-[var(--neutral-0)] text-center">
                {geoData?.name}, {geoData?.country}
            </h1>
            <p className="text-[var(--neutral-300)] capitalize font-semibold mt-2">
                {new Date().toLocaleDateString("en-Gb", {
                    weekday: "long",
                    day: "numeric",
                    year: "numeric",
                    month: "long",
                    timeZone: geoData?.timezone
                })}
            </p>
            <div className="flex gap-4 mt-8 items-center">
                <img
                    className="size-28"
                    src={`../../public/images/${
                        setIcon[forecastData?.data?.current?.weather_code] ||
                        setIcon[0]
                    }`}
                    alt="weather icon"
                />
                <p className="text-7xl text-white font-bold italic">
                    {Math.round(forecastData?.data?.current?.temperature_2m) ||
                        0}
                    {forecastData?.data?.current_units?.temperature_2m}
                </p>
            </div>
        </div>
    );
};

const ExtraInfo = ({ geoData, forecastData }) => {
    const { data: fd } = forecastData;
    const data = [
        {
            name: "feels like",
            value: fd?.current?.apparent_temperature,
            units: fd?.current_units?.apparent_temperature
        },
        {
            name: "humidity",
            value: fd?.current?.relative_humidity_2m,
            units: fd?.current_units?.relative_humidity_2m
        },
        {
            name: "wind",
            value: fd?.current?.wind_speed_10m,
            units: fd?.current_units?.wind_speed_10m
        },
        {
            name: "precipitation",
            value: fd?.current?.precipitation,
            units: fd?.current_units?.precipitation
        }
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
                        {d.value}{" "}
                        <span className="text-2xl opacity-20">{d.units}</span>
                    </p>
                </div>
            ))}
        </div>
    );
};
export default CurrentForecast;
