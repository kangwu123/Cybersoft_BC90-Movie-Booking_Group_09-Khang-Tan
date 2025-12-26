import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Promotion = () => {
    const promotions = [
        {
            img: '/img/Promotion/Birthday.png',
            title: 'Sinh nhật thành viên BHD Star - Ưu đãi gấp đôi điểm tích lũy',
            description: 'Bạn có từng đi xem phim đều đặn nhưng thấy điểm tích lũy trong tài khoản vẫn "lẹt đẹt"? Hay nhìn những món quà hấp dẫn mà mãi vẫn chưa đủ điểm đổi? Tin vui đây rồi - Member Day BHD Star đã chính thức quay trở lại, và lần này, quyền lợi dành cho thành viên được nâng cấp gấp đôi!',
        },
        {
            img: '/img/Promotion/SUAT-CHIEU-DEM.jpg',
            title: 'SUẤT CHIẾU ĐÊM - ƯU ĐÃI CHỈ 60K TẠI BHD STAR',
            description: 'Bạn là "cú đêm" chính hiệu, luôn cảm thấy tỉnh táo và tràn đầy năng lượng vào ban đêm? Vậy thì suất chiếu đêm tại BHD Star chính là lựa chọn hoàn hảo dành cho bạn! Với giá vé chỉ từ 60.000đ, bạn có thể thỏa sức tận hưởng những bộ phim bom tấn trong không gian rạp mát lạnh và thoải mái.',
        },
        {
            img: '/img/Promotion/HAPPY-MONDAY-1-2.jpg',
            title: 'HAPPY MONDAY - ƯU ĐÃI XEM PHIM CHỈ TỪ 48K TẠI BHD STAR',
            description: 'Bắt đầu tuần mới thật vui - xem phim giá cực hời! Thứ Hai buồn tẻ ư? Không đâu nhé, hãy để BHD Star Cineplex giúp bạn "reset năng lượng" đầu tuần với chương trình HAPPY MONDAY - vé xem phim chỉ từ 48.000đ. Một chút điện ảnh, một chút bắp rang ngô và không khí rạp mát lạnh sẽ khiến Monday trở nên đáng mong chờ hơn bao giờ hết!',
        },
        {
            img: '/img/Promotion/2025_Sweet_winter.png',
            title: '2025_Sweet_winter - ƯU ĐÃI QUÀ TẶNG NGẬP TRÀN',
            description: 'Mùa đông này, BHD Star Cineplex mang đến cho bạn chương trình ưu đãi "2025_Sweet_winter" với những phần quà hấp dẫn và cơ hội tích lũy điểm thưởng gấp đôi khi mua vé xem phim và combo bắp nước. Hãy cùng BHD Star tận hưởng mùa đông ngọt ngào với những trải nghiệm điện ảnh tuyệt vời và quà tặng siêu hấp dẫn!',
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="bg-gray-900 py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center text-amber-600 mb-8">ƯU ĐÃI ĐẶC BIỆT</h2>
                <Slider {...settings}>
                    {promotions.map((promo, index) => (
                        <div key={index} className="px-4">
                            <div className="bg-gray-800 rounded-lg overflow-hidden">
                                <img src={promo.img} alt={promo.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-amber-600 mb-2">{promo.title}</h3>
                                    <p className="text-gray-400">{promo.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Promotion;