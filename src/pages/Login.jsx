import { Label, TextInput, Button } from "flowbite-react";
import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLoginMutation } from "../services/authApi";
import { addUser } from "../services/authSlice";
import illu from "../assets/images/illu.png";

const Login = () => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("thepassword");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const loginHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const user = { email, password };
    try {
      const { data } = await login(user);
      if (data) {
        dispatch(
          addUser({ user: data?.accessToken, token: data?.plainTextToken })
        );
        navigate("/");
      } else {
        console.error("Login failed:", data?.error);
      }
    } catch (error) {
      console.error("An error occured:", error);
    }
  };

  return (
    <div className="flex justify-center background items-center h-screen">
      <div className="bg-back/80 px-7 shadow-2xl shadow-primary/20 border rounded-2xl  py-16 border-primary">
        <div className=" w-[900px]  flex justify-around    items-center">
          <img src={illu} className="h-[300px]" alt="" />
          <div className=" bg-secondary/70 p-5 w-[400px] rounded-lg">
            <div className="text-5xl mb-2 text-primary font-bold font-mono mx-auto flex justify-center">
              {" "}
              LOGIN FORM
            </div>
            <form
              onSubmit={loginHandler}
              className="  flex max-w-md flex-col gap-4 py-5 px-4"
            >
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="email"
                    value="Your email"
                    className=" text-[#BB86FC] text-lg"
                  />
                </div>
                <TextInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-input"
                  id="email"
                  placeholder="example@gmail.com"
                  required
                  type="email"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="password"
                    className="text-[#BB86FC] text-lg"
                    value="Your password"
                  />
                </div>
                <TextInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password1"
                  required
                  type="password"
                />
              </div>
              {isLoading ? (
                <Button
                  type="submit"
                  className="bg-black text-white disabled: submit-btn mt-5"
                >
                  Loading
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-[#BB86FC] hover:text-primary hover:border font-mono  hover:border-primary hover:bg-transparent duration-150 text-secondary font-semibold mt-3"
                >
                  <span className="text-[17px]">LOGIN</span>
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
