import { useState } from "react";
import logo from "../assets/images/logo.svg";
import iconCheckmark from "../assets/images/icon-checkmark.svg";
import iconUnits from "../assets/images/icon-units.svg";
import iconDopdown from "../assets/images/icon-dropdown.svg";

const TEMPERATURE_UNITS = [
    { id: "celsius", name: "celsius", unit: "°C" },
    { id: "fahrenheit", name: "fahrenheit", unit: "°F" }
];

const WIND_SPEED_UNITS = [
    { id: "kmh", name: "km/h", unit: "km/h" },
    { id: "mph", name: "mph", unit: "mph" }
];

const PRECIPITATION_UNITS = [
    { id: "mm", name: "millimeters", unit: "mm" },
    { id: "inch", name: "inches", unit: "in" }
];

const UnitOption = ({
    setSettings,
    settings,
    id,
    name,
    unit,
    title,
    normalCase = false
}) => (
    <li
        onClick={() => setSettings(prev => ({ ...prev, [title]: id }))}
        className={`flex transition-colors py-2 px-4 hover:bg-[var(--neutral-600)] text-sm items-center rounded-lg justify-between ${settings === id ? "bg-[var(--neutral-600)]" : ""} ${normalCase ? "normal-case" : ""}`}
    >
        <span>
            {" "}
            {name} {unit && `(${unit})`}
        </span>
        {settings === id ? <img className="size-3" src={iconCheckmark} /> : ""}
    </li>
);

const UnitGroup = ({
    setSettings,
    settings,
    title,
    items,
    withBorder = true
}) => (
    <div
        className={`${withBorder ? "border-b border-b-[var(--neutral-600)]" : ""} py-2`}
    >
        <p className="px-4 text-sm text-[var(--neutral-300)] font-semibold my-1">
            {title}
        </p>
        <ul>
            {items.map(item => (
                <UnitOption
                    title={title.split(" ").join("").toLowerCase()}
                    setSettings={setSettings}
                    settings={settings}
                    id={item.id}
                    key={item.name}
                    name={item.name}
                    unit={item.unit !== item.name ? item.unit : null}
                    normalCase={
                        item.name === "km/h" || item.name === "mph"
                            ? true
                            : false
                    }
                />
            ))}
        </ul>
    </div>
);

const Navbar = ({ setSettings, settings }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <div className="flex justify-between items-center">
                <img src={logo} alt="Logo" />

                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    className="relative flex capitalize items-center gap-2 rounded-lg text-white py-2 px-3 bg-[var(--neutral-800)]"
                >
                    <img src={iconUnits} alt="icon units" />
                    units
                    <img src={iconDopdown} alt="dropdown icon" />
                    <div
                        className={`z-10 absolute right-0 top-0 mt-14 w-[220px] rounded-lg border border-[var(--neutral-600)] bg-[var(--neutral-800)] px-2 text-left transition-all duration-300 ${
                            isOpen
                                ? "opacity-100 pointer-events-auto translate-y-0"
                                : "opacity-0 pointer-events-none -translate-y-4"
                        }`}
                    >
                        <UnitGroup
                            settings={settings.temperature}
                            setSettings={setSettings}
                            title="Temperature"
                            items={TEMPERATURE_UNITS}
                        />
                        <UnitGroup
                            title="Wind Speed"
                            settings={settings.windspeed}
                            setSettings={setSettings}
                            items={WIND_SPEED_UNITS}
                        />
                        <UnitGroup
                            settings={settings.precipitation}
                            setSettings={setSettings}
                            title="Precipitation"
                            items={PRECIPITATION_UNITS}
                            withBorder={false}
                        />
                    </div>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
