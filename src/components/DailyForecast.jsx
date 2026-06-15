import { setIcon } from "../utils/data.js";

const DAYS_TO_SHOW = 7;

const DailyForecast = ({ dailyData }) => {
    const { temperature_2m_max, temperature_2m_min, time, weather_code } = dailyData || {};

    const data = Array.from({ length: DAYS_TO_SHOW }, (_, i) => ({
        id: i,
        max: temperature_2m_max?.[i],
        min: temperature_2m_min?.[i],
        time: time?.[i],
        icon: weather_code?.[i]
    }));

    return (
        <div className="mt-12 text-white">
            <h2 className="mb-4 text-2xl font-semibold capitalize">daily forecast</h2>
            <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
                {data.map(d => (
                    <div
                        key={d.id}
                        className="rounded-xl border-2 border-[var(--neutral-600)] bg-[var(--neutral-800)] p-4"
                    >
                        <h3 className="text-center font-medium capitalize">
                            {new Date(d.time).toLocaleDateString("en-GB", { weekday: "short" })}
                        </h3>
                        <img
                            className="mx-auto my-2 size-12"
                            src={`../../public/images/${setIcon[d.icon] || setIcon[0]}`}
                            alt="weather icon"
                        />
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-red-800">{Math.round(d.max)}°</span>
                            <span className="text-cyan-800">{Math.round(d.min)}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyForecast;