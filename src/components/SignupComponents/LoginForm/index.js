import React, { useState } from 'react';
import InputComponent from '../../Common/Input';
import Button from "../../Common/Button";
import { auth, db, storage } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        console.log("handling login")
        setLoading(true);
        if( email && password){
          try {
            const userCredential = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            const user = userCredential.user;
            console.log("user", user);
            
            //Get user's details
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();

            // Save data in the redux, call the redux action 
            dispatch(
            setUser({
                name: userData.name,
                email: user.email,
                uid: user.uid,
            })
            );
            toast.success("Login successful!")
            setLoading(false);
            navigate("/profile");
          } catch (e) {
            console.log("error", e.message);
            toast.error(e.message)
            setLoading(false);
          }
        } else {
          if (email == '') {
            toast.error("Please enter the email");
            setLoading(false);
          } else if (password == '') {
            toast.error("Please enter the password");
            setLoading(false);
          }
        }
      }
  return (
    <>
         <InputComponent 
            state={email} 
            setState={setEmail} 
            placeholder="Email" 
            required={true}
            type="email"/>
         <InputComponent 
            state={password} 
            setState={setPassword} 
            placeholder="Password" 
            required={true}
            type="password"/>
            <Button 
              text={loading ? "Loading.." : "Login"}
              disabled={loading}
              onClick={handleLogin} />   
    </>
  )
}

export default LoginForm