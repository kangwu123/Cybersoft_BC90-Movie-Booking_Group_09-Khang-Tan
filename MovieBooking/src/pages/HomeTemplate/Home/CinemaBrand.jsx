import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

const CinemaBrandWrapper = styled.div`
  background-color: #212121;
  padding: 0;
  margin-top: 40px;

  .slick-dots {
    bottom: -30px;
  }

  .slick-dots li button:before {
    color: white;
    opacity: 0.5;
  }

  .slick-dots li.slick-active button:before {
    color: red;
    opacity: 1;
  }

  .slick-prev, .slick-next {
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    z-index: 1;
  }

  .slick-prev:before, .slick-next:before {
    font-size: 20px;
    color: white;
    opacity: 0.8;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  position: relative;
  color: #FFC107;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    height: 4px;
    background-color: #f39c12;
    margin: 0 15px;
  }
`;

const LogoImage = styled.img`
    height: 100px;
    width: auto;
    margin: 0 auto;
    object-fit: contain;
    transition: filter 0.3s ease;

    &:hover {
    filter: grayscale(0%);
    }
`;

const CinemaBrand = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    };

    const logos = [
        { id: 1, src: '/img/Cinemas/bhd.png', alt: 'BHD' },
        { id: 2, src: '/img/Cinemas/cgv.png', alt: 'CGV' },
        { id: 3, src: '/img/Cinemas/cinestar.png', alt: 'CineStar' },
        { id: 4, src: '/img/Cinemas/galaxy.png', alt: 'Galaxy Cinema' },
        { id: 5, src: '/img/Cinemas/lotte.png', alt: 'Lotte Cinema' },
        { id: 6, src: '/img/Cinemas/megags.png', alt: 'MegaGS' },
        { id: 7, src: '/img/Cinemas/bhd.png', alt: 'BHD' },
        { id: 8, src: '/img/Cinemas/cgv.png', alt: 'CGV' },
        { id: 9, src: '/img/Cinemas/cinestar.png', alt: 'CineStar' },
        { id: 10, src: '/img/Cinemas/galaxy.png', alt: 'Galaxy Cinema' },
        { id: 11, src: '/img/Cinemas/lotte.png', alt: 'Lotte Cinema' },
        { id: 12, src: '/img/Cinemas/megags.png', alt: 'MegaGS' },
    ];

    return (
        <CinemaBrandWrapper>
            <SectionTitle>Cinema Brands</SectionTitle>
            <div className="container mx-auto">
                <Slider {...settings}>
                    {logos.map(logo => (
                        <div key={logo.id}>
                            <LogoImage src={logo.src} alt={logo.alt} />
                        </div>
                    ))}
                </Slider>
            </div>
        </CinemaBrandWrapper>
    );
};

export default CinemaBrand;