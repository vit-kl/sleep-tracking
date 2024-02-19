import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RoutePaths } from "./Pages/constants/routing";
import Main from "./Pages/Main/Main";
import Create from "./Pages/Create/Create";
import PersonInfo from "./Pages/PersonInfo/PersonInfo";
import Layout from "./common/Layout/Layout";

const router = createBrowserRouter([
  {
    path: RoutePaths.Main,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: RoutePaths.Create,
        element: <Create />,
      },
      {
        path: `${RoutePaths.Person}/:id`,
        element: <PersonInfo />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
