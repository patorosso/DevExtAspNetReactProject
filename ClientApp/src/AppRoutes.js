import Home from "./pages/Home";
import Students from "./pages/Students";
import Careers from "./pages/Careers";
import Subjects from "./pages/Subjects";

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
  {
    path: "/subjects",
    element: <Subjects />,
  },
];

export default AppRoutes;
