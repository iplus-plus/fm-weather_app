import { setIcon } from "../utils/data.js";

const DailyForecast = ({ dailyData }) => {
    const { temperature_2m_max, temperature_2m_min, time, weather_code } =
        dailyData || {};
    const data = [1, 2, 3, 4, 5, 6, 7].map((item, i) => ({
        id: item,
        max: temperature_2m_max?.[i],
        min: temperature_2m_min?.[i],
        time: time?.[i],
        icon: weather_code?.[i]
    }));

    return (
        <div className="mt-12 text-white">
            <h2 className="mb-4 text-2xl font-semibold capitalize">
                daily forecast
            </h2>
            <div className="grid grid-cols-3 gap-4 ">
                {data.map(d => (
                    <div
                        className="bg-[var(--neutral-800)] p-4 rounded-xl border-2 border-[var(--neutral-600)]"
                        key={d?.id}
                    >
                        <h3 className="capitalize font-medium text-center">
                            {d?.time}
                        </h3>
                        <img
                            className="size-12 mx-auto my-2"
                            src={`../../public/images/${
                                setIcon[d?.icon] || setIcon[0]
                            }`}
                            alt="weather icon"
                        />
                        <div className="flex items-center justify-between text-sm">
                            <span>{Math.round(d?.max)}°</span>
                            <span>{Math.round(d?.min)}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyForecast;
