import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GetStarted from "./pages/GetStarted";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import OTPVerification from "./pages/OTPVerification";
import Home from "./pages/Home";
import DrivingServices from "./pages/DrivingServices";
import Permits from "./pages/Permits";
import VehicleRegistration from "./pages/VehicleRegistration";
import RoadTax from "./pages/RoadTax";
import ReportIssue from "./pages/ReportIssue";
import DigitalID from "./pages/DigitalID";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Services from "./pages/Services";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/get-started" replace />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/verify" element={<OTPVerification />} />
          <Route path="/home" element={<Home />} />
          <Route path="/driving-services" element={<DrivingServices />} />
          <Route path="/permits" element={<Permits />} />
          <Route path="/vehicle-registration" element={<VehicleRegistration />} />
          <Route path="/road-tax" element={<RoadTax />} />
          <Route path="/report-issue" element={<ReportIssue />} />
          <Route path="/digital-id" element={<DigitalID />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;