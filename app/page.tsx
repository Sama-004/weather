import Chatbot from "./components/ChatBot";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />
      <Chatbot />
      <Dashboard />
    </>
  );
}
