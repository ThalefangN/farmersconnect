import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import GetStarted from "@/pages/GetStarted";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import ResetPassword from "@/pages/ResetPassword";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Forums from "@/pages/Forums";
import Resources from "@/pages/Resources";
import Marketplace from "@/pages/Marketplace";
import Learning from "@/pages/Learning";
import Community from "@/pages/Community";
import AnimalTracking from "@/pages/AnimalTracking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forums" element={<Forums />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/community" element={<Community />} />
        <Route path="/animal-tracking" element={<AnimalTracking />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;