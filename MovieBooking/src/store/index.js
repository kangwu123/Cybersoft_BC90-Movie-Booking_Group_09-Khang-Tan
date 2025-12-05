import { configureStore } from "@reduxjs/toolkit";
import movieCarouselReducer from "./../pages/HomeTemplate/Home/slice";
import movieListReducer from "./../pages/HomeTemplate/MovieList/slice";
import movieDetailReducer from "./../pages/HomeTemplate/MovieDetail/slice";
import ticketBookingReducer from "./../pages/HomeTemplate/TicketBooking/slice";
import userManageReducer from "./../pages/AdminTemplate/Users/slice";
// import seatsReducer from "./../pages/HomeTemplate/TicketBooking/seatSlice";

const Store = configureStore({
  reducer: {
    movieCarouselReducer,
    movieListReducer,
    movieDetailReducer,
    ticketBooking: ticketBookingReducer,
    userManageReducer,
    // seatsReducer,
  },
});

export default Store;
