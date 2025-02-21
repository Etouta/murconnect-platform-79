
import { Routes as RouterRoutes, Route } from "react-router-dom";
import Messages from "./pages/Messages";
import Projects from "./pages/Projects";
import Documents from "./pages/Documents";
import Timeline from "./pages/Timeline";
import Settings from "./pages/Settings";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import EditProfile from "./pages/EditProfile";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
