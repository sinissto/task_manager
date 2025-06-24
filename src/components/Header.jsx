import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={"header"}>
      <div className={"left"}>
        <Link to={"/"} className={"headerLink"}>
          <h1 className={"appTitle"}>Task Manager</h1>
        </Link>
      </div>
      <div className={"right"}>
        <Link to={"/newTask"} className={"headerLink"}>
          <p className={"appTask"}>Add Task</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
