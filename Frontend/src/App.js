
import { useEffect } from "react";
import SignupCard from "./components/Pages/signUp";
import LoginCard from "./components/Pages/login";
import ChatPage from "./components/Pages/ChatPage";
import './App.css';
import { BrowserRouter as Router, Routes, Link, Route, useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userDetails"))

    if (data) {
      navigate("/chats")
    }
  }, [])
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<SignupCard />} />
        <Route path="/login" element={<LoginCard />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>

    </div>
  );
}

export default App;
