import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
function App() {
  return (
     <>
      <Navbar />
      <main className="p-6">
        <Home /> 
      </main>
      <Footer />
    </>
  );
}

export default App;
