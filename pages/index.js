import Link from "next/link"
import { useRouter } from "next/router";
import React, { useContext } from "react"
import { UserContext } from "../context";

export default function Home() {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
//   if (state && state.token && state.user.role == 'Recruiter') {
//     router.push("/admin/dashboard")
//   }else if (state && state.token && state.user.role == 'Candidate') 
//   {
//     router.push("/user/dashboard")
// }
if (state && state.user && state.user.role == "Candidate") {
  router.push("/user/dashboard");
} else if (state && state.user && state.user.role == "Recruiter") {
  router.push("/admin/dashboard");
}
  
  return (
    <div>
    <div className="container-fluid text-sm-center p-5 mb-5 bg-dark text-light">
      {" "}
      {/* bg-light is background color & p-5 is padding */}
      <h1 className="display-1 text-white">
        <b>DOMAINCER</b>
      </h1>
      <p className="lead fs-3">
        Welcome to our job app
      </p>
    </div>
    <br/>
    <div className="d-flex justify-content-center py-5">
      <Link href="/login">
        <a className="btn btn-outline-success btn-lg mx-3">Login</a>
      </Link>
      <Link href="/register">
        <a className="btn btn-outline-primary btn-lg mx-3">Register</a>
      </Link>
    </div>
  </div>
    
  )
}
