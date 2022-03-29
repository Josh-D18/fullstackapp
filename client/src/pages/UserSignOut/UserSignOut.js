import { Link } from "react-router-dom";
import { UserContext } from "../../components/Context/index";
import { useContext } from "react";
export default function UserSignOut() {
  const { actions } = useContext(UserContext);
  return (
    <>
      <div className="wrap center">
        <p
          style={{
            marginTop: "0.1rem",
            marginBottom: "1rem",
            fontWeight: "bold",
          }}
        >
          Do you want to Sign Out!
        </p>
        <button onClick={() => actions.signOut()} className="button margin">
          Yes
        </button>
        <Link to="/" className="button margin">
          No
        </Link>
      </div>
    </>
  );
}
