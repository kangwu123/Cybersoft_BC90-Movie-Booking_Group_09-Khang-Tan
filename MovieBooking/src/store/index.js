import { configureStore } from "@reduxjs/toolkit";
import movieHomeReducer from "./../pages/HomeTemplate/Home/slice";
import movieListReducer from "./../pages/HomeTemplate/MovieList/slice";
import movieDetailReducer from "./../pages/HomeTemplate/MovieDetail/slice";
import ticketBookingReducer from "./../pages/HomeTemplate/TicketBooking/slice";
import userManageReducer from "./../pages/AdminTemplate/Users/slice";
import cinemaReducer from "./../pages/HomeTemplate/Cinemas/slice"

const Store = configureStore({
  reducer: {
    movieHomeReducer,
    movieListReducer,
    movieDetailReducer,
    ticketBooking: ticketBookingReducer,
    userManageReducer,
    cinema: cinemaReducer,

  },
});

export default Store;
