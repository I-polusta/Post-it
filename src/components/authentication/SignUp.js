import React, { useState } from "react";
import "./Login.scss";
import logo from "../../assets/pen.svg";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
function SignUp() {
  const [state, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const history = useHistory();
  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: userCredential.user,
        });
        const user = userCredential.user;
        console.log(user);
        history.push("/setupProfile");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        alert(errorCode);
      });
  };

  return (
    <div className="login__container">
      <div className="login">
        <div className="login__form__container">
          <div>
            <form className="login__form">
              <div>
                <h3>Create Account</h3>
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
              <button type="submit" onClick={register}>
                Create Account
              </button>
              <Link to="/">
                <button type="submit">Already a User? Log In</button>
              </Link>
            </form>
          </div>
        </div>
        <div className="logo__auth">
          <img src={logo} alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
