import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUserPrefsStore } from "./stores/useUserPrefsStore";
import { useAuthStore } from "./stores/useAuthStore";
import { useProfile } from "./hooks/useProfile";
import { supabase } from "./lib/supabase";
import { trackPageView } from "./lib/analytics";
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
import SignInScreen from "./screens/SignInScreen";
import AuthCallbackScreen from "./screens/AuthCallbackScreen";
import ScrollToTop from "./components/ScrollToTop";
import ProfileScreen from "./screens/ProfileScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import InstantAnswersScreen from "./screens/InstantAnswersScreen";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 60 * 24 } },
});

function AppRoutes() {
  const hasCompletedOnboarding = useUserPrefsStore((s) => s.hasCompletedOnboarding);
  const { setUser, setSession } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  useProfile();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={hasCompletedOnboarding ? <HomeScreen /> : <Navigate to="/onboarding" replace />}
        />
        <Route path="/onboarding" element={<OnboardingScreen />} />
        <Route path="/select-village" element={<OnboardingScreen />} />
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
        <Route path="/sign-in" element={<SignInScreen />} />
        <Route path="/auth/callback" element={<AuthCallbackScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
        <Route path="/instant-answers" element={<InstantAnswersScreen />} />
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