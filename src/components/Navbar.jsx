import React from "react";

const Navbar = () => {
    return (
        <header>
            <div className="flex justify-between items-center">
                <img src="../../public/images/logo.svg" />
                <button className="flex capitalize items-center gap-2 rounded text-white py-2 px-3 bg-[var(--neutral-800)]">
                    <img src="../../public/images/icon-units.svg" />
                    units
                    <img src="../../public/images/icon-dropdown.svg" />
                </button>
            </div>
        </header>
    );
};

export default Navbar;
