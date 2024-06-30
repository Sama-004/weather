import Chatbot from "./components/ChatBot";
import Loginform from "./components/LoginForm";
import Navbar from "./components/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <Chatbot />
      <Loginform />
    </>
  );
}
