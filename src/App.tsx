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
import Forums from "./pages/Forums";
import Resources from "./pages/Resources";
import Marketplace from "./pages/Marketplace";
import Learning from "./pages/Learning";
import Community from "./pages/Community";
import Services from "./pages/Services";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import LivestockFarming from "./pages/forums/LivestockFarming";
import CropCultivation from "./pages/forums/CropCultivation";
import MarketTrends from "./pages/forums/MarketTrends";
import Equipment from "./pages/resources/Equipment";
import Seeds from "./pages/resources/Seeds";
import Land from "./pages/resources/Land";
import Products from "./pages/marketplace/Products";
import MarketEquipment from "./pages/marketplace/Equipment";
import Supplies from "./pages/marketplace/Supplies";
import Guides from "./pages/learning/Guides";
import Videos from "./pages/learning/Videos";
import Certificates from "./pages/learning/Certificates";
import Groups from "./pages/community/Groups";
import Events from "./pages/community/Events";
import Mentorship from "./pages/community/Mentorship";

const PROTECTED_ROUTES = [
  '/signin',
  '/signup',
  '/verify',
  '/forums',
  '/resources',
  '/marketplace',
  '/learning',
  '/community',
  '/services',
  '/profile',
  '/notifications'
];

const AppContent = () => {
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!isOnline && PROTECTED_ROUTES.includes(location.pathname)) {
      navigate('/home');
      toast({
        title: "You're offline",
        description: "Some features may be limited while offline.",
        variant: "destructive",
      });
    }
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
        <Route path="/forums" element={<Forums />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/community" element={<Community />} />
        <Route path="/services" element={<Services />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        
        {/* Forum Routes */}
        <Route path="/forums/livestock" element={<LivestockFarming />} />
        <Route path="/forums/crops" element={<CropCultivation />} />
        <Route path="/forums/market" element={<MarketTrends />} />
        
        {/* Resource Routes */}
        <Route path="/resources/equipment" element={<Equipment />} />
        <Route path="/resources/seeds" element={<Seeds />} />
        <Route path="/resources/land" element={<Land />} />
        
        {/* Marketplace Routes */}
        <Route path="/marketplace/products" element={<Products />} />
        <Route path="/marketplace/equipment" element={<MarketEquipment />} />
        <Route path="/marketplace/supplies" element={<Supplies />} />
        
        {/* Learning Routes */}
        <Route path="/learning/guides" element={<Guides />} />
        <Route path="/learning/videos" element={<Videos />} />
        <Route path="/learning/certificates" element={<Certificates />} />
        
        {/* Community Routes */}
        <Route path="/community/groups" element={<Groups />} />
        <Route path="/community/events" element={<Events />} />
        <Route path="/community/mentorship" element={<Mentorship />} />
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
