import Logout from "./components/Logout";
import { SignIn } from "./components/SignIn";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <div className="App">
      {user ? (
        <>
          <h1>Signed in</h1>
          <Logout />
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default App;
