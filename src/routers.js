import { Route, HashRouter, Switch } from "react-router-dom";
import Nav from "./components/nav";
import Home from "./components/home";
import Detail from "./components/detail";

const Routers = ({ mostPopular, loading }) => {
  return (
    <HashRouter>
      <div className="main-container">
        <Nav />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Home mostPopular={mostPopular} loading={loading} />}
          />
          <Route exact path="/:id" component={Detail} />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default Routers;
