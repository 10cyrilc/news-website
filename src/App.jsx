import { Box, Divider } from "@mui/material";
import TopBar from "./components/Topbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="app">
            <main className="content">
                <TopBar />
                <Home />
                <Footer />
            </main>
        </div>
    );
}

export default App;
