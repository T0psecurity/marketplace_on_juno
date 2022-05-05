import { Router, Redirect, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Header from "./Containers/Header";
import Home from "./Containers/Home";
import Footer from "./Containers/Footer";
import Resources from "./Containers/Resources";
import MyPage from "./Containers/MyPage";
import logo from "./logo.svg";
import "./App.css";
const history = createBrowserHistory();
function App() {
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/resources">
          <Resources />
        </Route>
        <Route path="/explore">
          <MyPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
