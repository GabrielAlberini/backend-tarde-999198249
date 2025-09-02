import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { user, logout } = useContext(UserContext);

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <span>
        {user.logged ? (
          <>
            👤 {user.name}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          "Invitado"
        )}
      </span>
    </nav>
  );
}

export default Navbar;
