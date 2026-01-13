import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {Outlet} from 'react-router-dom'

function App() {
  return (
     <>
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
