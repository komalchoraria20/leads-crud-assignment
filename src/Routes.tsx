import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import Layout from "./components/layout";

const HomePage = React.lazy(() => import("./pages/home"));
const ClientsPage = React.lazy(() => import("./pages/clients"));

function NoMatch() {
  const location = useLocation();

  return (
    <div>
      <h3>Error 404</h3>
      <p>
        No match for <code>{location.pathname}</code>
      </p>
    </div>
  );
}

export default function Routes() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<code>Loading...</code>}>
          <Switch>
            <Redirect
              exact
              from="/"
              to="/clients"
            />
            <Route
              path="/home"
              component={HomePage}
            />
            <Route
              path="/clients"
              component={ClientsPage}
            />
            <Route
              path="*"
              component={NoMatch}
            />
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
}
