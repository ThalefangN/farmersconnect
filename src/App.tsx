import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useToast } from "@/hooks/use-toast";
import { LanguageProvider } from "@/contexts/LanguageContext";
import OfflineAlert from "@/components/OfflineAlert";
import { motion, AnimatePresence } from "framer-motion";

// Page Imports
import GetStarted from "@/pages/GetStarted";
import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";
import OTPVerification from "@/pages/OTPVerification";
import Home from "@/pages/Home";
import Forums from "@/pages/Forums";
import Resources from "@/pages/Resources";
import Marketplace from "@/pages/Marketplace";
import Learning from "@/pages/Learning";
import Community from "@/pages/Community";
import Services from "@/pages/Services";
import Profile from "@/pages/Profile";
import Notifications from "@/pages/Notifications";

// Forum Routes
import LivestockFarming from "@/pages/forums/LivestockFarming";
import CropCultivation from "@/pages/forums/CropCultivation";
import MarketTrends from "@/pages/forums/MarketTrends";

// Resource Routes
import Equipment from "@/pages/resources/Equipment";
import Seeds from "@/pages/resources/Seeds";
import Land from "@/pages/resources/Land";

// Marketplace Routes
import Products from "@/pages/marketplace/Products";
import MarketEquipment from "@/pages/marketplace/Equipment";
import Supplies from "@/pages/marketplace/Supplies";

// Learning Routes
import Guides from "@/pages/learning/Guides";
import Videos from "@/pages/learning/Videos";
import Certificates from "@/pages/learning/Certificates";
import AIAssistant from "@/pages/learning/AIAssistant";

// Community Routes
import Groups from "@/pages/community/Groups";
import Events from "@/pages/community/Events";
import Mentorship from "@/pages/community/Mentorship";

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

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

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
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
          transition={{ duration: 0.3 }}
          className="page-transition min-h-screen"
        >
          <Routes location={location}>
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
            <Route path="/learning/ai-assistant" element={<AIAssistant />} />
            
            {/* Community Routes */}
            <Route path="/community/groups" element={<Groups />} />
            <Route path="/community/events" element={<Events />} />
            <Route path="/community/mentorship" element={<Mentorship />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        retry: 1,
      },
    },
  }));

  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="bg-background min-h-screen transition-colors duration-300">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
};

export default App;