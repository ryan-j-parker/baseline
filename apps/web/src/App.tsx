import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUserPrefsStore } from "./stores/useUserPrefsStore";
import { trackPageView } from "./lib/analytics";
import VillageSelectScreen from "./screens/VillageSelectScreen";
import HomeScreen from "./screens/HomeScreen";
import TrashScreen from "./screens/TrashScreen";
import EmergencyScreen from "./screens/EmergencyScreen";
import UtilitiesScreen from "./screens/UtilitiesScreen";
import MedicalScreen from "./screens/MedicalScreen";
import CarAndDrivingScreen from "./screens/CarAndDrivingScreen";
import SchoolsScreen from "./screens/SchoolsScreen";
import GroceriesScreen from "./screens/GroceriesScreen";
import MapsScreen from "./screens/MapsScreen";
import SearchScreen from "./screens/SearchScreen";
import SettingsScreen from "./screens/SettingsScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 60 * 24 } },
});

// Separate component so we can use useLocation inside BrowserRouter
function AppRoutes() {
  const villageId = useUserPrefsStore((s) => s.villageId);
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route
        path="/"
        element={villageId ? <HomeScreen /> : <Navigate to="/select-village" replace />}
      />
      <Route path="/select-village" element={<VillageSelectScreen />} />
      <Route path="/trash" element={<TrashScreen />} />
      <Route path="/emergency" element={<EmergencyScreen />} />
      <Route path="/utilities" element={<UtilitiesScreen />} />
      <Route path="/medical" element={<MedicalScreen />} />
      <Route path="/car-and-driving" element={<CarAndDrivingScreen />} />
      <Route path="/schools" element={<SchoolsScreen />} />
      <Route path="/groceries" element={<GroceriesScreen />} />
      <Route path="/maps" element={<MapsScreen />} />
      <Route path="/search" element={<SearchScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}