
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { MessagesProvider } from "./contexts/MessagesContext";
import Routes from "./Routes";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import "./App.css";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <LanguageProvider>
        <MessagesProvider>
          <div className="min-h-screen flex bg-gray-50">
            <Sidebar isCollapsed={isSidebarCollapsed} onCollapsedChange={setIsSidebarCollapsed} />
            <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
              <div className="container mx-auto p-8 max-w-7xl">
                <Routes />
              </div>
            </main>
          </div>
        </MessagesProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
