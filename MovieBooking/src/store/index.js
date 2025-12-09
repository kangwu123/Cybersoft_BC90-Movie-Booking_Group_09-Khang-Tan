import { configureStore } from "@reduxjs/toolkit";
import movieHomeReducer from "./../pages/HomeTemplate/Home/slice";
import movieListReducer from "./../pages/HomeTemplate/MovieList/slice";
import movieDetailReducer from "./../pages/HomeTemplate/MovieDetail/slice";
import ticketBookingReducer from "./../pages/HomeTemplate/TicketBooking/slice";
import cinemaReducer from "./../pages/HomeTemplate/Cinemas/slice"
import userReducer from "./userSlice";
// Authentication Login & Register
import authLoginReducer from "./../pages/AdminTemplate/Auth/slice";
import userManageReducer from "./../pages/AdminTemplate/Users/slice";
import adminMovieReducer from "./../pages/AdminTemplate/Movies/slice";
import settingsReducer from "./../pages/AdminTemplate/Settings/slice";
import timeShowReducer from "./../pages/AdminTemplate/TimeShow/slice";

const Store = configureStore({
  reducer: {
    user: userReducer,
    movieHomeReducer,
    movieListReducer,
    movieDetailReducer,
    ticketBooking: ticketBookingReducer,
    userManageReducer,
    adminMovie: adminMovieReducer,
    settings: settingsReducer,
    timeshow: timeShowReducer,
    cinema: cinemaReducer,
    authLoginReducer,
  },
});

export default Store;
