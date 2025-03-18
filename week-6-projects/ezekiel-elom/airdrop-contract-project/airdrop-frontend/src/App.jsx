import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Airdrop from "./components/AirdropClaim";

const router = createBrowserRouter([{ path: "/", element: <Airdrop /> }]);

function App() {
  return (
        <RouterProvider router={router} />
  );
}

export default App;
