import { useState, useEffect } from "react";

const Searchbar = ({
    setPlace,
    setDebounce,
    setSearch,
    geoData,
    setIsSearch,
    search
}) => {
    const [isTyping, setIsTyping] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

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
        if (!search) return;
        setIsSearch(true);
        setIsFocused(false);
        setIsTyping(false);
    };

    const isLoading = geoData?.isFetching || isTyping;
    const results = geoData?.data?.results;
    const showDropdown = isFocused && search.length > 1;

    return (
        <form
            className="relative md:w-[70%] md:mx-auto md:gap-4 md:flex md:items-stretch md:mb-8"
            onSubmit={handleSubmit}
        >
            <div
                className={`flex gap-4 flex-1 rounded-xl border-2 bg-[var(--neutral-800)] px-6 py-4 transition-colors duration-200 ${
                    isFocused
                        ? "border-[var(--neutral-0)]"
                        : "border-[var(--neutral-600)]"
                }`}
            >
                <img
                    loading="lazy"
                    src="../../public/images/icon-search.svg"
                    alt=""
                />
                <input
                    className="w-full flex-1 bg-transparent text-2xl font-medium text-white outline-none"
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    placeholder="Search for a place..."
                />
            </div>

            <div
                className={`absolute z-10 left-0 right-0 mt-3 md:mt-[80px] flex md:w-[81%] w-full flex-col gap-2 rounded-xl bg-[var(--neutral-600)] p-2 transition-all duration-300 ${
                    showDropdown
                        ? "opacity-100 pointer-events-auto translate-y-0"
                        : "opacity-0 pointer-events-none translate-y-2"
                }`}
            >
                {isLoading ? (
                    <p className="py-2 text-center font-medium text-white">
                        Loading...
                    </p>
                ) : !results?.length ? (
                    <p className="py-2 text-center font-medium capitalize text-white">
                        no data {search} found...
                    </p>
                ) : (
                    results.slice(0, 5).map(d => (
                        <div
                            key={d.id}
                            onClick={() => {
                                setPlace(d);
                                setIsSearch(false);
                            }}
                            className="flex w-full items-center gap-4 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-[--neutral-300]"
                        >
                            <img
                                className="size-10"
                                src={`https://hatscripts.github.io/circle-flags/flags/${d?.country_code?.toLowerCase()}.svg`}
                                alt=""
                            />
                            <div>
                                <p className="text-base font-semibold capitalize text-white">
                                    {d.name}
                                </p>
                                <small className="text-xs text-[var(--neutral-200)]">
                                    {d.admin1 ? `${d.admin1}, ` : ""}
                                    {d.country ?? "-"}
                                </small>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button className="mt-4 md:mt-0 w-full md:w-auto rounded-xl bg-[var(--blue-500)] py-4 text-2xl px-8 font-semibold capitalize text-white transition-colors duration-300 hover:bg-[var(--blue-700)]">
                search
            </button>
        </form>
    );
};

export default Searchbar;
