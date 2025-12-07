import React from 'react'

const ListCinema = ({ propChainCinema, onSelectedCinema, isActive }) => {
    const renderLogo = () => {
        if (propChainCinema.logo) {
            return (
                <img
                    src={propChainCinema.logo}
                    alt={propChainCinema.tenHeThongRap}
                    className={`w-10 h-10 rounded-full ring-2 ${isActive ? "ring-white bg-white" : "ring-gray-400 bg-white"}`}
                />
            )
        }

        // Fallback: show initials when no logo available
        const initials = (propChainCinema.tenHeThongRap || "").split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
        return (
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${isActive ? 'bg-white text-black' : 'bg-gray-200 text-gray-800'}`}>
                {initials || 'NA'}
            </div>
        )
    }

    return (
        <button
            onClick={onSelectedCinema}
            className={`
                flex flex-col items-center justify-center 
                p-3 min-w-20
                rounded-xl border transition-all duration-300 
                shadow-sm
                ${isActive
                    ? "bg-linear-to-br from-orange-500 to-red-500 text-white border-orange-600 shadow-xl scale-105"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-orange-100 hover:border-orange-400 hover:shadow-md cursor-pointer"
                }
            `}
        >
            {renderLogo()}

            <p className={`mt-2 text-xs font-semibold tracking-wide`}>
                {propChainCinema.tenHeThongRap}
            </p>
        </button>
    );
};

export default ListCinema
