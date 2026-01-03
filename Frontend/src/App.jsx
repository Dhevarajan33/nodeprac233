import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <div className="main">
          <Dashboard />
        </div>
      </div>
    </>
  );
}

export default App;
