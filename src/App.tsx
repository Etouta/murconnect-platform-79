
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Sidebar from "./components/Sidebar";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Messages from "./pages/Messages";
import Documents from "./pages/Documents";
import Timeline from "./pages/Timeline";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex bg-muted">
    <Sidebar />
    <main className="flex-1 ml-64 p-8 animate-fade-in">{children}</main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <AppLayout>
                  <Index />
                </AppLayout>
              }
            />
            <Route
              path="/projects"
              element={
                <AppLayout>
                  <Projects />
                </AppLayout>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <AppLayout>
                  <ProjectDetail />
                </AppLayout>
              }
            />
            <Route
              path="/messages"
              element={
                <AppLayout>
                  <Messages />
                </AppLayout>
              }
            />
            <Route
              path="/documents"
              element={
                <AppLayout>
                  <Documents />
                </AppLayout>
              }
            />
            <Route
              path="/timeline"
              element={
                <AppLayout>
                  <Timeline />
                </AppLayout>
              }
            />
            <Route
              path="/settings"
              element={
                <AppLayout>
                  <Settings />
                </AppLayout>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
