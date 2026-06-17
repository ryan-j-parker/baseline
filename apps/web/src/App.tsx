import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUserPrefsStore } from "./stores/useUserPrefsStore";
import VillageSelectScreen from "./screens/VillageSelectScreen.tsx";
import HomeScreen from "./screens/HomeScreen.tsx";
import TrashScreen from "./screens/TrashScreen.tsx";
import EmergencyScreen from "./screens/EmergencyScreen.tsx";
import UtilitiesScreen from "./screens/UtilitiesScreen.tsx";
import MedicalScreen from "./screens/MedicalScreen.tsx";
import SearchScreen from "./screens/SearchScreen.tsx";
import CarAndDrivingScreen from "./screens/CarAndDrivingScreen.tsx";
import SchoolsScreen from "./screens/SchoolsScreen.tsx";
import GroceriesScreen from "./screens/GroceriesScreen.tsx";
import MapsScreen from "./screens/MapsScreen.tsx";
import SettingsScreen from "./screens/SettingsScreen.tsx";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 60 * 24 } },
});

export default function App() {
  const villageId = useUserPrefsStore((s) => s.villageId);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
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
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/car-and-driving" element={<CarAndDrivingScreen />} />
          <Route path="/schools" element={<SchoolsScreen />} />
          <Route path="/groceries" element={<GroceriesScreen />} />
          <Route path="/maps" element={<MapsScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}