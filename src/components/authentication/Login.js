import React, { useState } from "react";
import "./Login.scss";
import logo from "../../assets/pen.svg";
import { Google } from "@mui/icons-material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
function Login() {
  const [state, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const history = useHistory();
  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        dispatch({
          type: actionTypes.SET_USER,
          user: userCredential.user,
        });
        history.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
        alert(errorMessage);
        alert(errorMessage);
      });
  };

  // const signInGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       dispatch({
  //         type: actionTypes.SET_USER,
  //         user: result.user,
  //       });
  //       console.log(result);
  //       history.push("/dashboard");
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  // };
  return (
    <div className="login__container">
      <div className="login">
        <div className="login__form__container">
          <div>
            <form className="login__form">
              <div>
                <h3>Login</h3>
              </div>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" onClick={login}>
                Sign In
              </button>
              <Link to="/signup">
                <button>New User? Sign UP</button>
              </Link>
            </form>
          </div>
        </div>
        <div className="logo__auth">
          <img src={logo} alt="logo" />
        </div>

        {/* <div className="google__auth">
            <Google style={{ color: "blue" }} />
            <button onClick={signInGoogle}>Signup with Google Account</button>
          </div> */}
      </div>
    </div>
  );
}

export default Login;
