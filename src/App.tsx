import { Route, Routes } from "react-router-dom";
import { appRoutes } from "./appRoutes";
import Header from "./components/header/Header";
import { useAppSelector } from "./hooks/hooks";
import ForgotLoginPassword from "./pages/ForgotLoginPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UpdateLoginPassword from "./pages/UpdateLoginPassword";
import { selectIsLoggedIn } from "./redux/loginSlice";
import Accounts from "./pages/Accounts";

function App() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <div className="App">
      {isLoggedIn && <Header />}
      <Routes>
        <Route path={appRoutes.home} element={<Home />} />
        <Route path={appRoutes.accounts} element={<Accounts />} />
        <Route path={appRoutes.login} element={<Login />} />
        <Route path={appRoutes.forgotLoginPassword} element={<ForgotLoginPassword />} />
        <Route path={appRoutes.updateLoginPassword} element={<UpdateLoginPassword />} />
      </Routes>
    </div>
  );
}

export default App;
