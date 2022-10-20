import Router from "./shared/Router";
import GlobalStyle from "./components/globalstyle/GlobalStyle";
import Header from "./components/header/Header";
import "./App.css";

function App() {
  return <>
            <GlobalStyle/>
            <Header />
            <Router />
            
          </>
}

export default App;
