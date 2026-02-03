import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserContextProvider from "./context/UserContext";

function App() {
  return (
    <>
    <UserContextProvider>
       <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="light"
      />
      <Outlet />
    </UserContextProvider>
     
    </>
  );
}

export default App;
