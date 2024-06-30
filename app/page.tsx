import Chatbot from "./components/ChatBot";
import Loginform from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

export default function Page() {
  return (
    <>
      <Navbar />
      <Chatbot />
      <Dashboard/>
      {/* <Loginform /> */}
    </>
  );
}
