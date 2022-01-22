import "./App.css";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import { useStateValue } from "./StateProvider";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/dashboard/Profile/Profile";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function App() {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  return (
    <BrowserRouter>
      <Router>
        <div className="app">
          <Switch>
            <>
              <Route path="/" exact component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/setupProfile" component={Profile} />
            </>
          </Switch>
        </div>
      </Router>
    </BrowserRouter>
  );
}

export default App;
