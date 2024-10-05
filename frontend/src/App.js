import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'; 
import Header from './layout/Header';
import Home from './pages/Home/Home';
import Footer from './layout/Footer';
import Signup from './pages/Connexion/SignUp';
import SignIn from './pages/Connexion/SignIn';

function App() {
  return (
    <Router> {/* Wrap everything in Router */}
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <div className="flex-grow">
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
