import { SignIn } from "./components/SignIn";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Chat from "./components/Chat";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
