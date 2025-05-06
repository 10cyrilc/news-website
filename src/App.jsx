import {Divider} from "@mui/material";
import Home from "./pages/Home";
import TopBar from "./components/Topbar";

function App() {
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);

    return (
        <>
            <TopBar/>
            <Divider/>
            <Home/>
        </>
    );
}

export default App;
