import { Route } from "react-router-dom";
// Home Template
import HomeTemplate from "../pages/HomeTemplate";
import Home from "../pages/HomeTemplate/Home";
import MovieList from "../pages/HomeTemplate/MovieDetail";
import MovieDetail from "../pages/HomeTemplate/MovieDetail";
import TicketBooking from "../pages/HomeTemplate/TicketBooking";
// Admin Template
import AdminTemplate from "../pages/AdminTemplate";
import Dashboard from "../pages/AdminTemplate/Dashboard";
import Users from "../pages/AdminTemplate/Users";
import Movies from "../pages/AdminTemplate/Movies";

import PageNotFound from "../pages/PageNotFound";

const routes = [
  {
    path: "/",
    element: <HomeTemplate />,
    nested: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "movie-list",
        element: <MovieList />,
        nested: [
          {
            path: ":maPhim",
            element: <MovieDetail />
          }
        ]
      },
      {
        path: "buy-ticket",
        element: <TicketBooking />
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminTemplate />,
    nested: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "users",
        element: <Users />
      },
      {
        path: "movies",
        element: <Movies />
      },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />
  },
];

const renderRoute = (route) => {
  return route.nested?.map((child) => (
    <Route
      key={child.path}
      path={child.path}
      element={child.element}
    >
      {child.nested && renderRoute(child)}
    </Route>
  ));
};

const renderRoutes = () => {
  return routes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={route.element}
    >
      {route.nested && renderRoute(route)}
    </Route>
  ));
};

export { renderRoutes };


export default routes;