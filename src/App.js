import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserRouter from "./components/routerLogin/UserRouter";
import SetAuthToken from "./redux/actions/setAuthToken";
import { loadData } from "./redux/actions/Auth";
import Header from "./components/Header";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import DetailPost from "./pages/Posts/DetailPost";
import AddPost from "./pages/Posts/AddPost";
import Hired from "./pages/Hired/Hired";
import AddProject from "./pages/Hired/Projects/AddProject";
import Project from "./pages/Hired/Projects/Project";
import EditProfile from "./pages/User/EditProfile";
import Profile from "./pages/User/Profile";
import Order from "./pages/Order/Order";

function App() {
  if (localStorage.getItem("token")) {
    SetAuthToken(localStorage.getItem("token"));
  }
  React.useEffect(() => {
    Store.dispatch(loadData());
  }, []);

  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} /> {/* Done */}
          <UserRouter exact path="/home" component={Home} /> {/* Done */}
          <UserRouter exact path="/addPost/" component={AddPost} /> {/* Done */}
          <UserRouter exact path="/post/:id" component={DetailPost} />{" "}
          {/* Done */}
          <UserRouter exact path="/profile/:id" component={Profile} />{" "}
          {/* Done */}
          <UserRouter exact path="/editProfile/" component={EditProfile} />{" "}
          {/* Done */}
          <UserRouter exact path="/hired/:id" component={Hired} /> {/* Done */}
          <UserRouter exact path="/order" component={Order} />
          <UserRouter exact path="/addProject/:id" component={AddProject} />
          <UserRouter exact path="/project/:id" component={Project} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
