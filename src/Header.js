import { createUseStyles } from "react-jss";
import { Link, useLocation } from "react-router-dom";
import slap from "./assets/slap.png";

const useStyles = createUseStyles((theme) => ({
  Header: {
    "& h1": {
      cursor: "pointer",
      fontSize: "4rem",
    },
  },
  Logo: {
    display: "flex",
    alignItems: "center",
    "& img": {
      width: "64px",
      height: "64px",
    },
  },
  Link: {
    "& a": {
      color: theme.palette.textSecondary,
    },
    "& a:hover": {
      color: theme.palette.text,
    },
  },
  LinkActive: {
    "& a": {
      color: theme.palette.text,
    },
  },
  Navigation: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    "& ul": {
      display: "flex",
      listStyleType: "none",
    },
    "& li": {
      margin: "10px",
    },
    "& a": {
      fontWeight: "bold",
    },
  },
}));

const routes = [
  { name: "HOME", to: "/" },
  { name: "README", to: "/readme" },
];

export default function Header(props) {
  const classes = useStyles(props);
  const location = useLocation();

  return (
    <header className={classes.Header}>
      <nav className={classes.Navigation}>
        <Link className={classes.Logo} to="/">
          <img alt="logo" src={slap} />
          <h2>SlapSticker</h2>
        </Link>
        <ul>
          {routes.map((route) => (
            <li
              key={route.to}
              className={`${classes.Link} ${
                location.pathname === route.to ? classes.LinkActive : ""
              }`}
            >
              <Link to={route.to}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <p>
        Have you ever said something so dumb, you just wanted to slap yourself?
        Well now you can!
      </p>
    </header>
  );
}
