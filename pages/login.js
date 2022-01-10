import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import AuthForm from "../components/forms/AuthForm.js";
import { useRouter } from "next/router";
import { UserContext } from "../context";
import { Card } from "antd";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  const [state, setState] = useContext(UserContext);
  const router = useRouter();

  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name,email,password,secret)
    setloading(true);
    try {
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
        setloading(false);
      } else {
        // console.log(data)
        //update context
        setState({
          user: data.user,
          token: data.token,
        });
        //save in local storage
        window.localStorage.setItem("auth", JSON.stringify(data));
      }
    } catch (error) {
      toast.error(error);
      setloading(false);
    }
  };

  if (state && state.user && state.user.role == "Candidate") {
    router.push("/user/dashboard");
  } else if (state && state.user && state.user.role == "Recruiter") {
    router.push("/admin/dashboard");
  }

  return (
    <div className="container-fluid">
      <div className="row py-5">
        <div className="col-lg-4 offset-lg-4">
          <Card
            hoverable
            className="bg-dark text-white reglog h-100 border  rounded-3 border-primary "
          >
            <div className="col text-center">
              <h1 className="fw-bold text-white">
                <b>LOGIN</b>
              </h1>
            </div>
            <AuthForm
              handleSubmit={handleSubmit}
              email={email}
              setemail={setemail}
              password={password}
              setpassword={setpassword}
              loading={loading}
              page="login"
            />
            <div className="row">
              <div className="col">
                <p className="text-center">
                  Not yet registered?{" "}
                  <Link href="/register">
                    <a>Register</a>
                  </Link>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="text-center ">
                  <Link href="/forgot-password">
                    <a className="text-danger">Forgot password</a>
                  </Link>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      {/* <pre>{JSON.stringify(state.user.role,null,5)}</pre> */}
    </div>
  );
};

export default Login;
