import React, { useState } from "react";
import InputComponent from "../../Common/Input";
import Button from "../../Common/Button";
import { auth, db, storage } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fileURL, setFileURL] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    console.log("handling signup");
    setLoading(true);
    if (
      password == confirmPassword &&
      password.length >= 6 &&
      fullName &&
      email
    ) {
      // Creating user's account
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("user", user);
        //Saving user's details

        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
        });

        // Save data in the redux, call the redux action

        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
        );

        toast.success("User has been created!");
        setLoading(false);
        navigate("/profile");
      } catch (e) {
        console.log("error", e.message);
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      if (password != confirmPassword) {
        toast.error("Password doesn't match!");
      } else if (password.length < 6) {
        toast.error("Password must contain more than or equal to 6 charater!");
      } else if (fullName == "") {
        toast.error("Please enter the name");
      } else if (email == "") {
        toast.error("Please enter the email");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <InputComponent
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        required={true}
        type="text"
      />
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Email"
        required={true}
        type="email"
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder="Password"
        required={true}
        type="password"
      />
      <InputComponent
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        required={true}
        type="password"
      />
      <Button
        text={loading ? "Loading.." : "Signup"}
        disabled={loading}
        onClick={handleSignup}
      />
    </>
  );
}
export default SignupForm;
