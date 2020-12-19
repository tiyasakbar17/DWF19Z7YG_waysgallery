import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import Store from "./redux/store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserRouter from "./components/routerLogin/UserRouter";
import Landing from "./pages/Landing";
import SetAuthToken from "./redux/actions/setAuthToken";
import { loadData } from "./redux/actions/Auth";
import Header from "./components/Header";
import Home from "./pages/Home";
import DetailPost from "./pages/DetailPost";
import EditProfile from "./pages/EditProfile";
import AddPost from "./pages/AddPost";
import Hired from "./pages/Hired";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import AddProject from "./pages/AddProject";
import Project from "./pages/Project";

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
          <UserRouter exact path="/home" component={Home} />
          <UserRouter exact path="/addPost/" component={AddPost} />
          <UserRouter exact path="/post/:id" component={DetailPost} />
          <UserRouter exact path="/profile/:id" component={Profile} />
          <UserRouter exact path="/editProfile/" component={EditProfile} />
          <UserRouter exact path="/hired/:id" component={Hired} />
          <UserRouter exact path="/order" component={Order} />
          <UserRouter exact path="/addProject/:id" component={AddProject} />
          <UserRouter exact path="/project/:id" component={Project} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
