
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { MessagesProvider } from "./contexts/MessagesContext";
import Routes from "./Routes";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <MessagesProvider>
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
              <Routes />
            </main>
          </div>
        </MessagesProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
