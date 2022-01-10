import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";
const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
      {state && state.token && state.user  ? (
        <Link
          href={`/${state.user.role == 'Candidate' ? 'user':'admin' }/dashboard`}
          className={`nav-link ${current === "/" && "active"}`}
        >
          <a className="navbar-brand" href="#">
            DOMAINCER
          </a>
        </Link>
      ) : (
        <Link href="/" className={`nav-link ${current === "/" && "active"}`}>
          <a className="navbar-brand" href="#">
            DOMAINCER
          </a>
        </Link>
      )}

      <div className="navbar-nav">
        {state !== null ? (
          <>
            <div className="nav-item dropdown">
              <button
                className="btn dropdown-toggle text-light"
                type="button"
                id="navbarDarkDropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {state && state.user && state.user.name}
              </button>
              <ul
                className="dropdown-menu col-1 position-absolute dropdown-menu-dark dropdown-menu-end"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
             {state.user.role === 'Recuirter' && (
                  <li>
                  <Link href="/admin/dashboard">
                    <a
                      className={`nav-link dropdown-item  ${
                        current === "/user/dashboard" && "active"
                      }`}
                      href="#"
                    >
                      Dashboard
                    </a>
                  </Link>
                </li>
             )}
             {state.user.role === 'Candidate' && (
                  <li>
                  <Link href="/user/dashboard">
                    <a
                      className={`nav-link dropdown-item  ${
                        current === "/user/dashboard" && "active"
                      }`}
                      href="#"
                    >
                      Dashboard
                    </a>
                  </Link>
                </li>
             )}
             {state.user.role === 'Candidate' && (
                  <li>
                  <Link href="/user/profile/update">
                    <a
                      className={`nav-link dropdown-item  ${
                        current === "/user/profile/update" && "active"
                      }`}
                      href="#"
                    >
                      Profile
                    </a>
                  </Link>
                </li>
             )}
                {state.user.role === 'Recuirter' &&(
                     <li>
                     <Link href="/admin/candidate">
                         <a
                           className={`nav-link dropdown-item  ${
                             current === "/admin" && "active"
                           }`}
                           href="#"
                         >
                          Applied Candidates
                         </a>
                       </Link>
                     </li> 
                  )}
                <li>
                  <a onClick={logout} className="btn btn-danger w-100" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <form className="d-flex">
              <Link href="/login">
                <a
                  className={`nav-link px-2 mx-2  ${
                    current === "/login" && "active px-2"
                  }`}
                  href="#"
                >
                  Login{" "}
                </a>
              </Link>

              <Link href="/register">
                <a
                  className={`nav-link  px-2 ${
                    current === "/register" && "active px-2"
                  }`}
                  href="#"
                >
                  Register
                </a>
              </Link>
            </form>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
