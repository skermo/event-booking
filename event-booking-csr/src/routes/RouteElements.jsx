import { useRoutes } from "react-router-dom";
import Page from "../components/layout/Page/Page.jsx";
import AboutUs from "../pages/AboutUs/AboutUs.jsx";
import * as routes from "./routes.js";

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
  ]);

  return <>{element}</>;
};

export default RouteElements;
