import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; 
import Header from './layout/Header';
import Home from './pages/Home/Home';
import Footer from './layout/Footer';
import Signup from './pages/Connexion/SignUp';
import SignIn from './pages/Connexion/SignIn';
import Dashboard from './pages/Home/Dashboard';
import Worker from './pages/Worker/worker';
import Profile from './pages/Profile/Profile';
import ConatctProfile from './pages/Profile/ContactProfile';
import Agenda from './pages/Agenda/Agenda';
import Notifications from './pages/Notifications/notification';
import useCurrentUser from './hooks/useAuth';
import Users from './pages/Admin/UsersList';


function App() {
  const user = useCurrentUser();


  return (
    <Router> {/* Wrap everything in Router */}
      <div className="flex flex-col min-h-screen">
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/profile" element={<Profile user={user}/>} />
          <Route path="/workers" element={<Worker />} />
          <Route path="/agenda" element={<Agenda user={user}/>} />
          <Route path="/contact" element={<ConatctProfile user={user} />} />
          <Route path="/notifications" element={<Notifications user={user}/>} />
          <Route path="/users" element={<Users user={user}/>} />

        </Routes>
        <div className="flex-grow">
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
