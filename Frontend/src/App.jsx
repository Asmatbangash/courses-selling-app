import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import {Outlet} from 'react-router-dom'
  import { ToastContainer } from 'react-toastify';


function App() {
  return (
     <>
     <ToastContainer position="top-center"
  autoClose= {2000}
  hideProgressBar= {false}
  closeOnClick= {true}
  pauseOnHover= {true}
  draggable= {true}
  theme= "light"/>
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
