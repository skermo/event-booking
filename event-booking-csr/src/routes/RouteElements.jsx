import { useRoutes } from "react-router-dom";
import Page from "../components/layout/Page/Page.jsx";
import AboutUs from "../pages/AboutUs/AboutUs.jsx";
import * as routes from "./routes.js";
import Home from "../pages/Home/Home.jsx";
import EventDetails from "../pages/EventDetails/EventDetails.jsx";
import Search from "../pages/Search/Search.jsx";

const RouteElements = () => {
  const element = useRoutes([
    {
      path: routes.ABOUT_US,
      element: (
        <Page>
          <AboutUs />
        </Page>
      ),
    },
    {
      path: routes.HOME,
      element: (
        <Page>
          <Home />
        </Page>
      ),
    },
    {
      path: routes.EVENT_DETAILS,
      element: (
        <Page>
          <EventDetails />
        </Page>
      ),
    },
    {
      path: routes.SEARCH,
      element: (
        <Page>
          <Search />
        </Page>
      ),
    },
  ]);

  return <>{element}</>;
};

export default RouteElements;
