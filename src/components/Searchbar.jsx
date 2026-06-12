import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

const Searchbar = ({ setPlace, setDebounce, setSearch, geoData, search }) => {
    const [isTyping, setIsTyping] = useState(false);
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        setIsTyping(true);
        const timer = setTimeout(() => {
            setDebounce(search);
            setIsTyping(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const handleSubmit = e => {
        e.preventDefault();
        if (!search || !geoData?.data) return;
        setPlace(geoData?.data?.results[0]);
        setIsSearch(false);
        setIsTyping(false);
    };

    const handleClick = data => {
        setPlace(data);
    };

    return (
        <form className="relative" onSubmit={handleSubmit}>
            <div
                className={`flex bg-[var(--neutral-600)] rounded-xl transition-colors duration-200 py-4 px-6 gap-4 border-2 ${isSearch ? "border-[var(--neutral-0)]" : "border-[var(--neutral-600)]"}`}
            >
                <img src="../../public/images/icon-search.svg" />
                <input
                    className="bg-transparent font-medium text-2xl flex-1 outline-none text-white w-full"
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={() => setIsSearch(true)}
                    onBlur={() =>
                        setTimeout(() => {
                            setIsSearch(false);
                        }, 200)
                    }
                    placeholder="Search for a place..."
                />
            </div>
            <div
                className={`w-full transition-all absolute left-0 duration-300 right-0 bg-[var(--neutral-600)] p-2 flex flex-col gap-2 rounded-xl mt-3 ${geoData?.isFetching || isTyping ? "justify-center" : "justify-start"} ${isSearch && search.length > 1 ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-2"}`}
            >
                {geoData?.isFetching || isTyping ? (
                    <p className="text-center text-white font-medium py-2">
                        Loading...
                    </p>
                ) : !geoData?.data?.results ? (
                    <p className="text-center text-white capitalize font-medium py-2 capitalize">
                        no data {search} found...
                    </p>
                ) : (
                    geoData?.data?.results?.map(d => (
                        <div
                            onClick={() => handleClick(d)}
                            key={d.id}
                            className="px-4 py-2 transition-colors duration-300 rounded-md hover:bg-[--neutral-300] flex items-center w-full gap-4"
                        >
                            <img
                                className="size-10"
                                src={`https://hatscripts.github.io/circle-flags/flags/${d?.country_code?.toLowerCase()}.svg`}
                            />
                            <div>
                                <p className="text-white text-base font-semibold capitalize">
                                    {d.name}
                                </p>
                                <small className="text-xs text-[var(--neutral-200)]">
                                    {d.admin1}, {d.country ?? "-"}
                                </small>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <button className="bg-[var(--blue-500)] mt-4 w-full rounded-xl py-4 text-white font-semibold text-2xl capitalize transition-colors duration-300 hover:bg-[var(--blue-700)]">
                search
            </button>
        </form>
    );
};

export default Searchbar;
