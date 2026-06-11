import React from "react";

const Searchbar = () => {
    return (
        <form>
            <div className="flex bg-white/30 rounded-xl py-4 px-6 items-center gap-4">
                <img src="../../public/images/icon-search.svg" />
                <input
                    className="bg-transparent font-medium text-2xl flex-1 outline-none text-white"
                    type="text"
                    placeholder="Search for a place..."
                />
            </div>
            <button className="bg-[var(--blue-500)] mt-4 w-full rounded-xl py-4 text-white font-semibold text-2xl capitalize">
                search
            </button>
        </form>
    );
};

export default Searchbar;
