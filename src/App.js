import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect,
  useParams,
  useHistory,
  useLocation
} from "react-router-dom";

export default function App() {

  const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };

  const PrivateRoute = ({ component: Component, authed, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/Login', state: { from: props.location } }} />} />
    )
  }

  return (
    <Router>
      <div>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Category">Category</Link>
          </li>
          <li>
            <Link to="/Products">Products</Link>
          </li>
          <li>
            <Link to="/Admin">Admin area</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/Category">
            <Category />
          </Route>
          <Route path="/Products">
            <Products />
          </Route>
          <PrivateRoute path="/Admin">
            <ProtectedPage />
          </PrivateRoute>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Category() {
  return (
    <ul>
      <li>Shoes</li>
      <li>Boots</li>
      <li>Footwear</li>
    </ul>


  );
}



function Products() {
  let match = useRouteMatch();

  return (
    <div>
      <h3>Select your product</h3>


      <ul>
        <li>
          <Link to={`${match.url}/1`}>
            <div className="div">
              <p>NIKE Liteforce Blue Sneakers</p>


            </div>

          </Link>
        </li>

        <li>
          <Link to={`${match.url}/2`}>U.S. POLO ASSN. Slippers</Link>
        </li>

        <li>
          <Link to={`${match.url}/3`}>ADIDAS Adispree Running Shoes</Link>
        </li>

        <li>
          <Link to={`${match.url}/4`}>Lee Cooper Mid Sneakers</Link>
        </li>

      </ul>

      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>

      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();

  if (topicId == 1) {
    return (
      <div>
        <p>NIKE Liteforce Blue Sneakers</p>
        <p>lorem 1 </p>
        <hr />
        <p>Available</p>
      </div>
    );
  }
  if (topicId == 2) {
    return (
      <div>
        <p>U.S. POLO ASSN. Slippers</p>
        <p>lorem 2 </p>
        <hr />
        <p>Available</p>
      </div>
    );
  }
  if (topicId == 3) {
    return (
      <div>
        <p>ADIDAS Adispree Running Shoes</p>
        <p>lorem 3 </p>
        <hr />
        <p>Available</p>
      </div>
    );
  }
  if (topicId == 4) {
    return (
      <div>
        <p>Lee Cooper Mid Sneakers</p>
        <p>lorem 4 </p>
        <hr />
        <p>Available</p>
      </div>
    );
  }
}


const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
      <p>You are not logged in.</p>
    );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}


function ProtectedPage() {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/Login" } };
  let login = () => {
    fakeAuth.authenticate(() => {

      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>

    </div>
  );

}

function Login() {
  return (
    <div>
      You are logged in !
    </div>
  )
}




