import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VoterCreationPage from "./pages/VoterCreationPage";
import { AnimatePresence } from "framer-motion";
import AnimatedBackground from "./pages/AnimatedBG";


const App = () => {
  return (
    <AnimatedBackground>
      <AuthProvider>
        <Router>
          <AnimatePresence mode="await">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/create" element={<VoterCreationPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </AnimatePresence>
        </Router>
      </AuthProvider>
    </AnimatedBackground>
  );
};

export default App;
