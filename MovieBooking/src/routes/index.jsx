import { Route } from "react-router-dom";
import React, { lazy } from "react";
import PrivateRoute from "./PrivateRoute";


const routes = [
  {
    path: "/",
    element: React.createElement(lazy(() => import("../pages/HomeTemplate"))),
    nested: [
      {
        path: "",
        element: React.createElement(lazy(() => import("../pages/HomeTemplate/Home"))),
      },
      {
        path: "movie-list",
        element: React.createElement(lazy(() => import("../pages/HomeTemplate/MovieList"))),
      },
      {
        path: "cinemas",
        element: React.createElement(lazy(() => import("../pages/HomeTemplate/Cinemas"))),
      },
      {
        path: "movie-detail/:maPhim",
        element: React.createElement(lazy(() => import("../pages/HomeTemplate/MovieDetail"))),
      },
      {
        path: "buy-ticket",
        element: React.createElement(
          PrivateRoute,
          {
            element: React.createElement(
              lazy(() => import("../pages/HomeTemplate/TicketBooking"))
            )
          }
        ),
      },
      {
        path: "login",
        element: React.createElement(lazy(() => import("../pages/HomeTemplate/Auth/Login"))),
      },
      {
        path: "checkout",
        element: React.createElement(
          PrivateRoute,
          {
            element: React.createElement(
              lazy(() => import("../pages/HomeTemplate/TicketBooking/Checkout"))
            )
          }
        ),
      },
      {
        path: "payment-success",
        element: React.createElement(
          PrivateRoute,
          {
            element: React.createElement(
              lazy(() => import("../pages/HomeTemplate/TicketBooking/PaymentSuccess"))
            )
          }
        ),
      },
      {
        path: "promotion",
        element: React.createElement(lazy(() => import("../pages/HomeTemplate/Promotion"))),
      },
      {
        path: "contact",
        element: React.createElement(lazy(() => import("../pages/HomeTemplate/Contact"))),
      },
    ],
  },

  {
    path: "/admin",
    element: React.createElement(lazy(() => import("../pages/AdminTemplate"))),
    nested: [
      {
        path: "",
        element: React.createElement(lazy(() => import("../pages/AdminTemplate/Dashboard"))),
      },
      {
        path: "users",
        element: React.createElement(lazy(() => import("../pages/AdminTemplate/Users"))),
      },
      {
        path: "movies",
        element: React.createElement(lazy(() => import("../pages/AdminTemplate/Movies"))),
      },
      {
        path: "movies/schedule/:maPhim",
        element: React.createElement(lazy(() => import("../pages/AdminTemplate/Movies/ScheduleForm"))),
      },
      {
        path: "settings",
        element: React.createElement(lazy(() => import("../pages/AdminTemplate/Settings"))),
        nested: [
          {
            path: "system",
            element: React.createElement(lazy(() => import("../pages/AdminTemplate/Settings/System"))),
          },
          {
            path: "notifications",
            element: React.createElement(lazy(() => import("../pages/AdminTemplate/Settings/Notification"))),
          },
          {
            path: "logo",
            element: React.createElement(lazy(() => import("../pages/AdminTemplate/Settings/Logo"))),
          },
          {
            path: "location",
            element: React.createElement(lazy(() => import("../pages/AdminTemplate/Settings/Location"))),
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: React.createElement(lazy(() => import("../pages/PageNotFound"))),
  },
  {
    path: "auth",
    element: React.createElement(lazy(() => import("../pages/AdminTemplate/Auth"))),
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