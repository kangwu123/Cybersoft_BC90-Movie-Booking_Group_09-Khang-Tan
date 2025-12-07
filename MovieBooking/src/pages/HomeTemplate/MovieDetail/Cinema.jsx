import { memo, useState } from 'react'
import TimeShow from './TimeShow';

const Cinema = ({ propEachCinema }) => {
    const renderTimeShow = (ngayChieuGioChieu, maLichChieu, thoiLuong) => {
        return (
            <TimeShow propTimeShow={ngayChieuGioChieu} propShowCode={maLichChieu} propDuration={thoiLuong} />
        )
    }

const renderAuditorium = () => {
        const grouped = (propEachCinema?.lichChieuPhim || []).reduce((acc, item) => {
            (acc[item.tenRap] = acc[item.tenRap] || []).push(item);
            return acc;
        }, {});

        return Object.entries(grouped).map(([tenRap, list]) => (
            <tr key={tenRap} className="border-t border-white">
                <td className="px-10 py-4 bg-[#1C1C1C] text-white font-semibold border-r border-white">
                    {tenRap}
                </td>

                <td colSpan={7} className="px-6 py-6 bg-[#1C1C1C]">
                    <div className="flex flex-wrap gap-3">
                        {list.map((item) =>
                            renderTimeShow(
                                item.ngayChieuGioChieu,
                                item.maLichChieu,
                                item.thoiLuong
                            )
                        )}
                    </div>
                </td>
            </tr>
        ));
    };

const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const [activeDay, setActiveDay] = useState(() => {
        const randomIndex = Math.floor(Math.random() * daysOfWeek.length);
        return daysOfWeek[randomIndex];
    });
    
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

                        <th
                            onClick={() => setActiveDay('MONDAY')}
                            className={`w-30 border-l border-white py-4 cursor-pointer transition-all duration-300 text-center 
                    ${activeDay === 'MONDAY' ? 'bg-red-500 text-white' : 'bg-black text-white hover:bg-red-500'}`}
                        >
                            MONDAY
                        </th>

                        <th
                            onClick={() => setActiveDay('TUESDAY')}
                            className={`w-30 border-l border-white py-4 cursor-pointer transition-all duration-300 text-center 
                    ${activeDay === 'TUESDAY' ? 'bg-red-500 text-white' : 'bg-black text-white hover:bg-red-500'}`}
                        >
                            TUESDAY
                        </th>

                        <th
                            onClick={() => setActiveDay('WEDNESDAY')}
                            className={`w-30 border-l border-white py-4 cursor-pointer transition-all duration-300 text-center 
                    ${activeDay === 'WEDNESDAY' ? 'bg-red-500 text-white' : 'bg-black text-white hover:bg-red-500'}`}
                        >
                            WEDNESDAY
                        </th>

                        <th
                            onClick={() => setActiveDay('THURSDAY')}
                            className={`w-30 border-l border-white py-4 cursor-pointer transition-all duration-300 text-center 
                    ${activeDay === 'THURSDAY' ? 'bg-red-500 text-white' : 'bg-black text-white hover:bg-red-500'}`}
                        >
                            THURSDAY
                        </th>

                        <th
                            onClick={() => setActiveDay('FRIDAY')}
                            className={`w-30 border-l border-white py-4 cursor-pointer transition-all duration-300 text-center 
                    ${activeDay === 'FRIDAY' ? 'bg-red-500 text-white' : 'bg-black text-white hover:bg-red-500'}`}
                        >
                            FRIDAY
                        </th>

                        <th
                            onClick={() => setActiveDay('SATURDAY')}
                            className={`w-30 border-l border-white py-4 cursor-pointer transition-all duration-300 text-center 
                    ${activeDay === 'SATURDAY' ? 'bg-red-500 text-white' : 'bg-black text-white hover:bg-red-500'}`}
                        >
                            SATURDAY
                        </th>

                        <th
                            onClick={() => setActiveDay('SUNDAY')}
                            className={`w-30 border-l border-white py-4 cursor-pointer transition-all duration-300 text-center 
                    ${activeDay === 'SUNDAY' ? 'bg-red-500 text-white' : 'bg-black text-white hover:bg-red-500'}`}
                        >
                            SUNDAY
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {renderAuditorium()}
                </tbody>
            </table>
        </div>
    )
}

export default memo(Cinema)