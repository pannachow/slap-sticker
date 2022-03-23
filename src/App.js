import { createUseStyles } from "react-jss";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import Readme from "./pages/Readme";
import Home from "./pages/Home";

const useStyles = createUseStyles((theme) => ({
  "@global *": {
    boxSizing: "border-box",
  },
  "@global body": {
    background: theme.palette.background,
    color: theme.palette.text,
    fontFamily: "Poppins, sans-serif",
    fontSize: "18px",
  },
  "@global a": {
    color: "inherit",
    textDecoration: "none",
  },
  App: {
    padding: "20px",
    background: theme.palette.primary,
    maxWidth: "800px",
    minHeight: "100vh",
    margin: "auto",
    boxShadow: `10px 0px 5px 5px ${theme.palette.primary}, -10px 0px 5px 5px ${theme.palette.primary}`,
  },
}));

function App(props) {
  // css classes from JSS hook
  const classes = useStyles(props);

  return (
    <div className={classes.App}>
      <Header />
      <hr />
      <Switch>
        {/* Main app route */}
        <Route path="/" exact>
          <Home />
        </Route>
        {/* Readme route */}
        <Route path="/readme">
          <Readme />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
