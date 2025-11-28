import { memo } from 'react'

const Cinema = ({ propEachCinema, onSelectEachCinema }) => {
    const renderTimeShow = (tenRap) => {
        return onSelectEachCinema(tenRap);
    }
    const renderEachCinema = () => {
        return propEachCinema.danhSachRap.map((eachCinema) => {
            return (
                <tr key={eachCinema.maRap} className="border-t border-white">
                    <td className="px-10 py-4 bg-gray-900 text-white font-semibold border-r border-white">
                        {eachCinema.tenRap}
                    </td>
                    <td colSpan={8} className="px-4 py-4 bg-gray-900">
                        <div className="flex flex-wrap items-center gap-4">
                            {renderTimeShow(eachCinema.tenRap)}
                        </div>
                    </td>
                </tr>
            )
        })
    }
    return (
        <div key={propEachCinema.maCumRap} className="mt-6">
            <table className="w-full shadow-xl bg-black table-fixed">
                <thead>
                    <tr className="text-white">
                        <th className="bg-indigo-900 text-white p-4 border-r border-amber-400 align-top text-left">
                            <h3 className="text-xl font-bold mb-0 leading-snug">
                                {propEachCinema.tenCumRap}
                            </h3>
                            <p className="text-sm text-amber-300 font-medium mt-1">
                                {propEachCinema.diaChi}
                            </p>
                        </th>

                        <th className='w-30 border-l border-white bg-black hover:bg-red-500 transition-all duration-300 py-4 cursor-pointer'>
                            MONDAY
                        </th>
                        <th className='w-30 border-l border-white bg-black hover:bg-red-500 transition-all duration-300 py-4 cursor-pointer'>
                            TUESDAY
                        </th>
                        <th className='w-30 border-l border-white bg-black hover:bg-red-500 transition-all duration-300 py-4 cursor-pointer'>
                            WEDNESDAY
                        </th>
                        <th className='w-30 border-l border-white bg-black hover:bg-red-500 transition-all duration-300 py-4 cursor-pointer'>
                            THURSDAY
                        </th>
                        <th className='w-30 border-l border-white bg-black hover:bg-red-500 transition-all duration-300 py-4 cursor-pointer'>
                            FRIDAY
                        </th>
                        <th className='w-30 border-l border-white bg-black hover:bg-red-500 transition-all duration-300 py-4 cursor-pointer'>
                            SATURDAY
                        </th>
                        <th className='w-30 border-l border-white bg-black hover:bg-red-500 transition-all duration-300 py-4 cursor-pointer'>
                            SUNDAY
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {renderEachCinema()}
                </tbody>
            </table>
        </div>
    )
}

export default memo(Cinema)