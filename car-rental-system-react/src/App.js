import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './layout/Layout';
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import MyRentals from "./pages/MyRentals";
import Rentals from "./pages/Rentals";
import CarList from "./pages/CarList";
import GlobalSnackbar from "./components/GlobalSnackbar";

function App() {
  return (
      <>
        <GlobalSnackbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="car/add" element={<AddCar />} />
              <Route path="car/edit/:id" element={<EditCar />} />
              <Route path="my-rentals" element={<MyRentals />} />
              <Route path="rentals" element={<Rentals />} />
              <Route path="car/list" element={<CarList />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;