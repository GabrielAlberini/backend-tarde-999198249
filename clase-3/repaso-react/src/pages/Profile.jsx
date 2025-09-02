import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Profile() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>Perfil</h2>
      {user.logged ? (
        <p>Usuario: {user.name}</p>
      ) : (
        <p>No estás logueado</p>
      )}
    </div>
  );
}

export default Profile;
