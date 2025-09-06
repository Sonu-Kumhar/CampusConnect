import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Events from "./pages/Events";
import Dashboard from "./pages/DashboardPage";
import MyClubs from "./pages/MyClubsPage";
import Footer from "./components/Footer";
import { Navigation } from "./components/Navigation";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
       <Navigation />
        <Routes>
          {/* Routes with navbar */}
            <Route path="/" element={<Index />} />
            <Route path="/events" element={<Events />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-clubs" element={<MyClubs />} />

          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
