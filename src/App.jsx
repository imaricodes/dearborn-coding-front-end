import Home from "./pages/Home";
import About from "./pages/About";
// import Activity from "./pages/Activity";
import Activity from "./pages/Activity";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";

import ApplicationContextProvider from "@/context/ApplicationContext";
import { SocketProvider } from "@/context/SocketInstanceContext";
import StageProvider from "@/context/StageContext";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="activity" element={<Activity />} />
    </Route>
  )
);

function App() {
  return (
    <ApplicationContextProvider>
      <SocketProvider>
        <StageProvider>
          <RouterProvider router={router} />
        </StageProvider>
      </SocketProvider>
    </ApplicationContextProvider>
  );
}

export default App;
