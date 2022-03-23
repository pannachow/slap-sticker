import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

const useStyles = createUseStyles((theme) => ({
  Header: {
    "& h1": {
      cursor: "pointer",
      fontSize: "4rem",
    },
  },
  Links: {
    marginBottom: "10px",
  },
  Navigation: {
    "& ul": {
      display: "flex",
      listStyleType: "none",
    },
    "& li": {
      margin: "10px",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles(props);

  return (
    <header className={classes.Header}>
      <nav className={classes.Navigation}>
        <ul>
          <li className={classes.Links}>
            <Link to="/">home</Link>
          </li>
          <li className={classes.Links}>
            <Link to="/readme">readme</Link>
          </li>
        </ul>
      </nav>
      <h1>SlapSticker</h1>
      <p>
        Have you ever said something so dumb, you just wanted to slap yourself?
        Well now you can!
      </p>
    </header>
  );
}
