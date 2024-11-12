import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import EventDetails from "./pages/EventDetails";

import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/events/:eventId",
    element: <EventDetails />,
  },
  // {
  //   path: "/techConference",
  //   element: <TechConference />,
  // },
  // {
  //   path: "/designWorkshop",
  //   element: <DesignWorkshop />,
  // },
  // {
  //   path: "/marketingSeminar",
  //   element: <MarketingSeminar />,
  // },
  // {
  //   path: "/productPromotion",
  //   element: <ProductPromotion />,
  // },
  // {
  //   path: "/softwareLaunch",
  //   element: <SoftwareLaunch />,
  // },
  // {
  //   path: "/productPhotogrpahy",
  //   element: <ProductPhotogrpahy />,
  // },
]);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
