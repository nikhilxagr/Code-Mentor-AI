import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

/*
  App is the root component.
  Everything in the UI starts from here.
*/
function App() {
  return (
    /*
      BrowserRouter enables routing in the entire app.
      Without this, routes WILL NOT work.
    */
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
