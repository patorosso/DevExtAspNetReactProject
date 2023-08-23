import Home from "./pages/Home";
import Students from "./pages/Students";
import Careers from "./pages/Careers";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/students",
    element: <Students />,
  },
  {
    path: "/careers",
    element: <Careers />,
  },
];

export default AppRoutes;
