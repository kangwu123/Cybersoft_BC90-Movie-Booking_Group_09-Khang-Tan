import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieList } from './../MovieList/slice';
import { fetchMovieHome } from './slice';

import MovieSlider from './MovieSlider';
import Trailer from '../MovieList/Trailer';

const Home = () => {
  const [activeTab, setActiveTab] = useState('now');
  const [openTrailerModal, setOpenTrailerModal] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const carouselSlide = {
    dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 6000,
    fade: true,
    cssEase: "linear",
    waitForAnimate: false
  };

  const moviesSlide = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    waitForAnimate: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const dispatch = useDispatch();

  const stateList = useSelector((state) => state.movieListReducer);

  const dataChainCinema = useSelector((state) => {
    return state.movieHomeReducer.dataHome?.dataChainCinema;
  });

  useEffect(() => {
    dispatch(fetchMovieList());
    dispatch(fetchMovieHome());
  }, [dispatch]);

  const { data, loading } = stateList;

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
        <div className="animate-pulse space-y-3">
          <div className="w-full aspect-3/4 bg-gray-200 rounded-lg" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="animate-pulse space-y-3">
          <div className="w-full aspect-3/4 bg-gray-200 rounded-lg" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-3 bg-gray-200 rounded w-1/3" />
        </div>
        <div className="animate-pulse space-y-3">
          <div className="w-full aspect-3/4 bg-gray-200 rounded-lg" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-3/4" />
        </div>
        <div className="animate-pulse space-y-3">
          <div className="w-full aspect-3/4 bg-gray-200 rounded-lg" />
          <div className="h-4 bg-gray-200 rounded w-4/5" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>
        <div className="animate-pulse space-y-3">
          <div className="w-full aspect-3/4 bg-gray-200 rounded-lg" />
          <div className="h-4 bg-gray-200 rounded w-3/5" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  const getInformationFromTrailer = (trailerLink) => {
    setTrailerUrl(trailerLink);
    setOpenTrailerModal(true);
  };

  const renderNowMovieList = () => {
    return data?.map((movie) => {
      if (movie.hot && movie.dangChieu) {
        return <MovieSlider key={movie.maPhim} propMovie={movie} onOpenTrailer={getInformationFromTrailer} />;
      }
    });
  };

  const renderUpComingMovieList = () => {
    return data?.map((movie) => {
      if (!movie.dangChieu) {
        return <MovieSlider key={movie.maPhim} propMovie={movie} />;
      }
    });
  };

  const renderPlanCinema = () => {
    return dataChainCinema?.map((cinema) => {
      return (
        <option key={cinema.maHeThongRap} value={cinema.biDanh}>
          {cinema.tenHeThongRap}
        </option>
      );
    });
  };

  const renderPlanMovie = () => {
    return data?.map((movie) => {
      if (movie.dangChieu) {
        return (
          <option key={movie.maPhim} value="option1">
            {movie.tenPhim}{" "}
          </option>
        );
      }
    });
  };

  return (
    <>
      {/* CAROUSEL */}
      <div className="slider-container relative pb-10">
        <Slider {...carouselSlide}>
          {/* Intro */}
          <div className="item relative group">
            <img
              src="./img/Banners/atsayxe.jpg"
              className="w-full object-cover"
            />
          </div>

          {/* Movie 1 */}
          <div className="item relative group">
            <img
              src="./img/Banners/CuoiVkChoCha.jpg"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            <NavLink
              to="*"
              className="
    absolute right-[43%] bottom-20
    flex items-center justify-center gap-3
    bg-linear-to-r from-blue-500 to-purple-600
    text-white px-6 py-3 h-10
    rounded-full font-semibold shadow-lg
    opacity-0 translate-y-8 
    group-hover:opacity-100 group-hover:translate-y-0
    transition-all duration-500 ease-out
  "
            >
              <span className="flex items-center h-full">Get Tickets</span>

              <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white">
                <i className="fi fi-rr-angle-double-small-right text-white text-base flex items-center justify-center leading-none"></i>
              </span>
            </NavLink>
          </div>

          {/* Movie 2 */}
          <div className="item relative group">
            <img
              src="./img/Banners/truytimLDH.jpg"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            <NavLink
              to="*"
              className="
    absolute right-[43%] bottom-20
    flex items-center justify-center gap-3
    bg-linear-to-r from-blue-500 to-purple-600
    text-white px-6 py-3 h-10
    rounded-full font-semibold shadow-lg
    opacity-0 translate-y-8 
    group-hover:opacity-100 group-hover:translate-y-0
    transition-all duration-500 ease-out
  "
            >
              <span className="flex items-center h-full">Get Tickets</span>

              <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white">
                <i className="fi fi-rr-angle-double-small-right text-white text-base flex items-center justify-center leading-none"></i>
              </span>
            </NavLink>
          </div>

          {/* Movie 3 */}
          <div className="item relative group">
            <img
              src="./img/Banners/Tafiti NaoLoanSaMac.jpg"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            <NavLink
              to="*"
              className="
    absolute right-[43%] bottom-20
    flex items-center justify-center gap-3
    bg-linear-to-r from-blue-500 to-purple-600
    text-white px-6 py-3 h-10
    rounded-full font-semibold shadow-lg
    opacity-0 translate-y-8 
    group-hover:opacity-100 group-hover:translate-y-0
    transition-all duration-500 ease-out
  "
            >
              <span className="flex items-center h-full">Get Tickets</span>

              <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white">
                <i className="fi fi-rr-angle-double-small-right text-white text-base flex items-center justify-center leading-none"></i>
              </span>
            </NavLink>
          </div>

          {/* Movie 4 */}
          <div className="item relative group">
            <img
              src="./img/Banners/wicked-Season2.jpg"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            <NavLink
              to="*"
              className="
    absolute right-[43%] bottom-20
    flex items-center justify-center gap-3
    bg-linear-to-r from-blue-500 to-purple-600
    text-white px-6 py-3 h-10
    rounded-full font-semibold shadow-lg
    opacity-0 translate-y-8 
    group-hover:opacity-100 group-hover:translate-y-0
    transition-all duration-500 ease-out
  "
            >
              <span className="flex items-center h-full">Get Tickets</span>

              <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white">
                <i className="fi fi-rr-angle-double-small-right text-white text-base flex items-center justify-center leading-none"></i>
              </span>
            </NavLink>
          </div>

          {/* Movie 5 */}
          <div className="item relative group">
            <img
              src="./img/Banners/banner3.jpg"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            <NavLink
              to="*"
              className="
    absolute right-[43%] bottom-20
    flex items-center justify-center gap-3
    bg-linear-to-r from-blue-500 to-purple-600
    text-white px-6 py-3 h-10
    rounded-full font-semibold shadow-lg
    opacity-0 translate-y-8 
    group-hover:opacity-100 group-hover:translate-y-0
    transition-all duration-500 ease-out
  "
            >
              <span className="flex items-center h-full">Get Tickets</span>

              <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white">
                <i className="fi fi-rr-angle-double-small-right text-white text-base flex items-center justify-center leading-none"></i>
              </span>
            </NavLink>
          </div>

          {/* Movie 6 */}
          <div className="item relative group">
            <img
              src="./img/Banners/banner2.jpg"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            <NavLink
              to="*"
              className="
    absolute right-[43%] bottom-20
    flex items-center justify-center gap-3
    bg-linear-to-r from-blue-500 to-purple-600
    text-white px-6 py-3 h-10
    rounded-full font-semibold shadow-lg
    opacity-0 translate-y-8 
    group-hover:opacity-100 group-hover:translate-y-0
    transition-all duration-500 ease-out
  "
            >
              <span className="flex items-center h-full">Get Tickets</span>

              <span className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white">
                <i className="fi fi-rr-angle-double-small-right text-white text-base flex items-center justify-center leading-none"></i>
              </span>
            </NavLink>
          </div>
        </Slider>
      </div>
      {/* MODAL TRAILER */}
      {openTrailerModal && (
        <Trailer
          propTrailer={trailerUrl}
          onClose={() => setOpenTrailerModal(false)}
        />
      )}
      {/* DEAL BANNER */}
      <div className="transition-all duration-300 pb-15">
        <div className="container mx-auto">
          <NavLink to="/now-showing">
            <img
              src="/img/Banners/carousel5.jpg"
              className="w-full object-cover rounded-xl"
              alt="deal"
            />
          </NavLink>
        </div>
      </div>

      {/* QUICK BOOK TICKETS */}
      <div className="bg-black text-white flex justify-center items-center py-10 sm:py-14 md:py-20">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-7 md:mb-8 text-left">
            Ready to Grab Your Tickets?
          </h2>

          <div className="flex flex-col md:flex-row justify-start items-end gap-3 sm:gap-4 md:gap-6">
            {/* Select Movie */}
            <div className="flex flex-col w-full md:w-64">
              <label className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-300 mb-1 sm:mb-2 text-left">
                Select Movie
              </label>
              <select className="w-full p-2 sm:p-2.5 md:p-3 border border-gray-700 rounded-lg sm:rounded-xl shadow-md bg-[#1C1C1C] text-white text-xs sm:text-sm md:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 cursor-pointer appearance-none transition-all duration-300 hover:shadow-lg">
                <option value="">-- Select Movie --</option>
                {renderPlanMovie()}
              </select>
            </div>

            {/* Select Cinema */}
            <div className="flex flex-col w-full md:w-64">
              <label className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-300 mb-1 sm:mb-2 text-left">
                Select Cinema
              </label>
              <select className="w-full p-2 sm:p-2.5 md:p-3 border border-gray-700 rounded-lg sm:rounded-xl shadow-md bg-[#1C1C1C] text-white text-xs sm:text-sm md:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 cursor-pointer appearance-none transition-all duration-300 hover:shadow-lg">
                <option value="">-- Select Cinema --</option>
                {renderPlanCinema()}
              </select>
            </div>

            {/* Select Date */}
            <div className="flex flex-col w-full md:w-64">
              <label className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-300 mb-1 sm:mb-2 text-left">
                Select Date
              </label>
              <select className="w-full p-2 sm:p-2.5 md:p-3 border border-gray-700 rounded-lg sm:rounded-xl shadow-md bg-[#1C1C1C] text-white text-xs sm:text-sm md:text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 cursor-pointer appearance-none transition-all duration-300 hover:shadow-lg">
                <option value="">-- Select Date --</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>

            {/* Book Button */}
            <button className="w-full md:w-48 py-2 sm:py-2.5 md:py-3 px-4 sm:px-5 md:px-6 lg:px-6 bg-amber-500 hover:bg-orange-500 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base md:text-lg lg:text-xl text-black shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer">
              Book
            </button>
          </div>
        </div>
      </div>

      {/* MOVIES TABS */}
      <div className="pb-15">
        <div className="container relative">
          <div className="absolute top-0 left-0">
            <div className="relative inline px-1 py-10 rounded-l-lg text-shadow-amber-500 font-bold text-xl text-amber-300 bg-green-800">
              Featured Movies
              <span
                className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderTop: '52px solid transparent',
                  borderBottom: '52px solid transparent',
                  borderLeft: '52px solid #06402B',
                }}
              ></span>
            </div>
          </div>

          <div className="flex justify-center text-lg font-bold mt-4">
            <button
              className={`${activeTab === 'now'
                ? 'text-red-500 border-b-2 border-red-600 text-3xl font-extrabold mb-6 pb-2'
                : 'text-gray-800 text-3xl font-extrabold mb-6 pb-2'
                } hover:text-red-600 transition-colors duration-200 cursor-pointer`}
              onClick={() => setActiveTab('now')}
            >
              NOW SHOWING
            </button>
            <button
              className={`${activeTab === 'upcoming'
                ? 'text-red-500 border-b-2 border-red-600 text-3xl font-extrabold mb-6 pb-2 ml-5'
                : 'text-gray-800 text-3xl font-extrabold mb-6 pb-2 ml-5'
                } hover:text-red-600 transition-colors duration-200 cursor-pointer`}
              onClick={() => setActiveTab('upcoming')}
            >
              UPCOMING
            </button>
          </div>
        </div>

        {activeTab === "now" && (
          <div className="py-4 sm:py-6 md:py-8">
            <div className="container">
              <div className="flex items-center mb-6">
                <div className="flex flex-col justify-center flex-1 gap-1">
                  <div className="border-t-2 border-amber-500 h-0.5"></div>
                  <div className="border-t-2 border-amber-500 h-0.5"></div>
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-3xl font-extrabold text-amber-500 px-4">
                  TOP MOVIES
                </h2>
                <div className="flex flex-col justify-center flex-1 gap-1">
                  <div className="border-t-2 border-amber-500 h-0.5"></div>
                  <div className="border-t-2 border-amber-500 h-0.5"></div>
                </div>
              </div>

              <div className="slider-container relative">
                <Slider className="movies-carousel" {...moviesSlide}>
                  <div
                    className="group bg-[#1C1C1C] rounded-2xl overflow-hidden shadow-lg 
                  hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 
                  transition-all duration-300 cursor-pointer p-2 lg:p-3 xl:p-4"
                  >
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src="/img/MoviePoster/Predator Badlands.jpg"
                        alt="Predator Badlands"
                        className="w-full h-60 sm:h-65 md:h-70 lg:h-75 xl:h-80 object-cover"
                      />

                      <span
                        className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-amber-500 text-white text-[10px] sm:text-xs md:text-sm font-bold px-2 py-1 rounded-lg shadow 
                      opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                      >
                        C16
                      </span>

                      <div
                        className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-black/70 text-white text-[10px] sm:text-xs md:text-sm px-1 sm:px-2 py-1 rounded-lg flex items-center gap-1 
                      opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                      >
                        <i className="fa-solid fa-star text-amber-400 text-xs sm:text-sm md:text-base"></i>
                        <span className="text-[10px] sm:text-xs md:text-sm">
                          9
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-amber-500 text-white text-xs sm:text-sm md:text-base font-bold px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg shadow-sm cursor-pointer transition-all duration-300 hover:bg-orange-500">
                          TRAILER
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 sm:pt-3 md:pt-4 flex flex-col justify-between h-[90px] sm:h-[110px] md:h-[130px] lg:h-[150px]">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white leading-tight line-clamp-2">
                        Predator: Badlands (2025)
                      </h3>

                      <span className="text-gray-300 text-sm sm:text-md md:text-base mt-1 mb-1">
                        127 min
                      </span>

                      <button
                        className="flex items-center justify-center gap-2 w-full py-2 rounded-2xl font-semibold text-white bg-red-500 
                      hover:bg-rose-600 shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-base"
                      >
                        <i className="fi fi-rs-ticket-alt text-xs sm:text-sm md:text-base lg:text-base leading-none"></i>
                        <span>Get Tickets</span>
                      </button>
                    </div>
                  </div>

                  <div
                    className="group bg-[#1C1C1C] rounded-2xl overflow-hidden shadow-lg 
                  hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 
                  transition-all duration-300 cursor-pointer p-2 lg:p-3 xl:p-4"
                  >
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src="/img/MoviePoster/Wicked For Good S2.jpg"
                        alt="Wicked For Good"
                        className="w-full h-60 sm:h-65 md:h-70 lg:h-75 xl:h-80 object-cover"
                      />

                      <span
                        className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-amber-500 text-white text-[10px] sm:text-xs md:text-sm font-bold px-2 py-1 rounded-lg shadow 
                      opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                      >
                        C16
                      </span>

                      <div
                        className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-black/70 text-white text-[10px] sm:text-xs md:text-sm px-1 sm:px-2 py-1 rounded-lg flex items-center gap-1 
                      opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                      >
                        <i className="fa-solid fa-star text-amber-400 text-xs sm:text-sm md:text-base"></i>
                        <span className="text-[10px] sm:text-xs md:text-sm">
                          7
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-amber-500 text-white text-xs sm:text-sm md:text-base font-bold px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg shadow-sm cursor-pointer transition-all duration-300 hover:bg-orange-500">
                          TRAILER
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 sm:pt-3 md:pt-4 flex flex-col justify-between h-[90px] sm:h-[110px] md:h-[130px] lg:h-[150px]">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white leading-tight line-clamp-2">
                        Wicked For Good
                      </h3>

                      <span className="text-gray-300 text-sm sm:text-md md:text-base mt-1 mb-1">
                        128 min
                      </span>

                      <button
                        className="flex items-center justify-center gap-2 w-full py-2 rounded-2xl font-semibold text-white bg-red-500 
                      hover:bg-rose-600 shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-base"
                      >
                        <i className="fi fi-rs-ticket-alt text-xs sm:text-sm md:text-base lg:text-base leading-none"></i>
                        <span>Get Tickets</span>
                      </button>
                    </div>
                  </div>

                  <div
                    className="group bg-[#1C1C1C] rounded-2xl overflow-hidden shadow-lg 
                  hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 
                  transition-all duration-300 cursor-pointer p-2 lg:p-3 xl:p-4"
                  >
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src="/img/MoviePoster/Disney's Zootopia 2.jpg"
                        alt="Disney's Zootopia 2"
                        className="w-full h-60 sm:h-65 md:h-70 lg:h-75 xl:h-80 object-cover"
                      />

                      <span
                        className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-amber-500 text-white text-[10px] sm:text-xs md:text-sm font-bold px-2 py-1 rounded-lg shadow 
                      opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                      >
                        C16
                      </span>

                      <div
                        className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-black/70 text-white text-[10px] sm:text-xs md:text-sm px-1 sm:px-2 py-1 rounded-lg flex items-center gap-1 
                      opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                      >
                        <i className="fa-solid fa-star text-amber-400 text-xs sm:text-sm md:text-base"></i>
                        <span className="text-[10px] sm:text-xs md:text-sm">
                          8
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-amber-500 text-white text-xs sm:text-sm md:text-base font-bold px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg shadow-sm cursor-pointer transition-all duration-300 hover:bg-orange-500">
                          TRAILER
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 sm:pt-3 md:pt-4 flex flex-col justify-between h-[90px] sm:h-[110px] md:h-[130px] lg:h-[150px]">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white leading-tight line-clamp-2">
                        Disney's Zootopia 2
                      </h3>

                      <span className="text-gray-300 text-sm sm:text-md md:text-base mt-1 mb-1">
                        125 min
                      </span>

                      <button
                        className="flex items-center justify-center gap-2 w-full py-2 rounded-2xl font-semibold text-white bg-red-500 
                      hover:bg-rose-600 shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-base"
                      >
                        <i className="fi fi-rs-ticket-alt text-xs sm:text-sm md:text-base lg:text-base leading-none"></i>
                        <span>Get Tickets</span>
                      </button>
                    </div>
                  </div>

                  <div
                    className="group bg-[#1C1C1C] rounded-2xl overflow-hidden shadow-lg 
                  hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 
                  transition-all duration-300 cursor-pointer p-2 lg:p-3 xl:p-4"
                  >
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src="/img/MoviePoster/Now You See Me Now You Don't.jpg"
                        alt="Now You See Me Now You Don't"
                        className="w-full h-60 sm:h-65 md:h-70 lg:h-75 xl:h-80 object-cover"
                      />

                      <span
                        className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-amber-500 text-white text-[10px] sm:text-xs md:text-sm font-bold px-2 py-1 rounded-lg shadow 
                      opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                      >
                        C16
                      </span>

                      <div
                        className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-black/70 text-white text-[10px] sm:text-xs md:text-sm px-1 sm:px-2 py-1 rounded-lg flex items-center gap-1 
                      opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                      >
                        <i className="fa-solid fa-star text-amber-400 text-xs sm:text-sm md:text-base"></i>
                        <span className="text-[10px] sm:text-xs md:text-sm">
                          9
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-amber-500 text-white text-xs sm:text-sm md:text-base font-bold px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg shadow-sm cursor-pointer transition-all duration-300 hover:bg-orange-500">
                          TRAILER
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 sm:pt-3 md:pt-4 flex flex-col justify-between h-[90px] sm:h-[110px] md:h-[130px] lg:h-[150px]">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white leading-tight line-clamp-2">
                        Now You See Me Now You Don't
                      </h3>

                      <span className="text-gray-300 text-sm sm:text-md md:text-base mt-1 mb-1">
                        124 min
                      </span>

                      <button
                        className="flex items-center justify-center gap-2 w-full py-2 rounded-2xl font-semibold text-white bg-red-500 
                      hover:bg-rose-600 shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-base"
                      >
                        <i className="fi fi-rs-ticket-alt text-xs sm:text-sm md:text-base lg:text-base leading-none"></i>
                        <span>Get Tickets</span>
                      </button>
                    </div>
                  </div>

                  {renderNowMovieList()}
                </Slider>
              </div>

              <div className="flex justify-center items-center mt-6">
                <NavLink
                  to="/movie-list"
                  className="relative inline-block text-red-500 font-semibold bg-white hover:bg-red-500 border hover:text-white border-red-500 hover:border-red-500 
    rounded-md sm:rounded-lg md:rounded-xl 
    px-3 sm:px-4 md:px-6 xl:px-8 
    py-1.5 sm:py-2 md:py-3 
    text-xs sm:text-sm md:text-base lg:text-lg 
    shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  SHOW MORE
                </NavLink>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'upcoming' && (
          <div className="py-8 bg-black">
            <div className='container'>
              <div className="flex items-center mb-6">
                <div className="flex flex-col justify-center flex-1 gap-1">
                  <div className="border-t-2 border-amber-500 h-0.5"></div>
                  <div className="border-t-2 border-amber-500 h-0.5"></div>
                </div>
                <h2 className="text-3xl font-extrabold text-amber-500 px-4">COMING SOON</h2>
                <div className="flex flex-col justify-center flex-1 gap-1">
                  <div className="border-t-2 border-amber-500 h-0.5"></div>
                  <div className="border-t-2 border-amber-500 h-0.5"></div>
                </div>
              </div>

              <div className="slider-container relative">
                <Slider className="movies-carousel" {...moviesSlide}>
                  {renderUpComingMovieList()}
                </Slider>
              </div>

              <div className="flex justify-center items-center mt-6">
                <NavLink
                  to="/movie-list"
                  className="relative inline-block text-amber-500 font-semibold bg-black hover:bg-amber-500 border hover:text-black border-amber-500 hover:border-amber-500 rounded-lg px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  SHOW MORE
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>



      {/* Modal Trailer */}
      {openTrailerModal && (
        <Trailer
          propTrailer={trailerUrl}
          onClose={() => setOpenTrailerModal(false)}
        />
      )}
    </>
  )
}

export default Home