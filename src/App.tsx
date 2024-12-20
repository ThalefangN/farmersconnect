import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useToast } from "@/hooks/use-toast";
import OfflineAlert from "@/components/OfflineAlert";
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
import BGCSECourses from "./pages/BGCSECourses";
import JCECourses from "./pages/JCECourses";
import PSLECourses from "./pages/PSLECourses";
import AddCourse from "./pages/AddCourse";
import CurrentExams from "./pages/CurrentExams";
import UpcomingExams from "./pages/UpcomingExams";
import PastExams from "./pages/PastExams";

// Routes that require authentication or internet connection
const PROTECTED_ROUTES = [
  '/signin',
  '/signup',
  '/verify',
  '/add-course',
  '/report-issue',
  '/digital-id',
  '/profile',
  '/notifications',
  '/services',
  '/permits',
  '/vehicle-registration',
  '/road-tax',
];

// Routes accessible offline
const OFFLINE_ACCESSIBLE_ROUTES = [
  '/bgcse-courses',
  '/jce-courses',
  '/psle-courses',
];

const AppContent = () => {
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isOnline && !OFFLINE_ACCESSIBLE_ROUTES.includes(location.pathname)) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    const handlePopState = (e: PopStateEvent) => {
      if (!isOnline && !OFFLINE_ACCESSIBLE_ROUTES.includes(location.pathname)) {
        e.preventDefault();
        toast({
          title: "Navigation Restricted",
          description: "You're offline. Only online courses are accessible.",
          variant: "destructive",
        });
        window.history.pushState(null, '', window.location.pathname);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    // Prevent back navigation when offline
    if (!isOnline && !OFFLINE_ACCESSIBLE_ROUTES.includes(location.pathname)) {
      window.history.pushState(null, '', window.location.pathname);
    }

    // Check if current route is protected and user is offline
    if (!isOnline && PROTECTED_ROUTES.includes(location.pathname)) {
      navigate('/bgcse-courses');
      toast({
        title: "Access Restricted",
        description: "Only online courses are accessible while offline.",
        variant: "destructive",
      });
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOnline, location.pathname, navigate, toast]);

  return (
    <>
      <OfflineAlert show={!isOnline} />
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
            <Route path="/bgcse-courses" element={<BGCSECourses />} />
            <Route path="/jce-courses" element={<JCECourses />} />
            <Route path="/psle-courses" element={<PSLECourses />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/current-exams" element={<CurrentExams />} />
            <Route path="/upcoming-exams" element={<UpcomingExams />} />
            <Route path="/past-exams" element={<PastExams />} />
      </Routes>
    </>
  );
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;