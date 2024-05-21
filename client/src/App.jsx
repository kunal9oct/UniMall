import { Routes, Route } from "react-router-dom";

import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import "./globals.css";
import Home from "./_root/pages/Home";
import YourMachines from "./_root/pages/YourMachines";
import EditProfile from "./_root/pages/EditProfile";
import AddMachine from "./_root/pages/AddMachine";
import AddUser from "./_root/pages/AddUser";
import DetailedOverview from "./_root/pages/DetailedOverview";

const App = () => {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/yourMachines" element={<YourMachines />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/detailedOverview/:city" element={<DetailedOverview />} />
          <Route path="/addMachine" element={<AddMachine />} />
          <Route path="/addUser" element={<AddUser />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
