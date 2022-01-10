import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ParallaxBG from "../../components/cards/ParallaxBG";
import { UserContext } from "../../context";

const candidate = () => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (state && state.token) {
      newsFeed();
    }
  }, [state && state.token]);

  const newsFeed = async () => {
    try {
      const { data } = await axios.get(`/user-posts`);
      // console.log("user posts", data);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };
//   if (state && state.user.role == 'Recuirter') router.push("/admin/dashboard")
//   if (state && state.user.role == 'Candidate') router.push("/user/dashboard");
 
  return (
    <>
      <ParallaxBG url="https://api.time.com/wp-content/uploads/2021/02/laptop-home-office.jpg"> Applied Candidates </ParallaxBG>
  <div className="container-fluid">
  <div className="row">
        {posts &&
          posts.map((post) => (
            <>
              <div key={post._id} className="card my-3 text-center shadow-lg border-dark">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text fw-bold">APPLIED CANDIDATES : {post.emails.length}</p>
                  <div className="row row-cols-1 row-cols-md-3 g-4">
                    {post.names.map((c) =>
                      post.emails.map((e) =>
                        post.mobiles.map((m) => 
                          post.resumes.map((r) => 
                            post.sops.map((s) => 
                              <div key={c.name} key={e.email} key={m.mobile} key={r.resume} key={s.sop}  className="col">
                                <div
                                  className="card text-white bg-dark mb-3"
                                  // style={{ maxWidth: "18rem" }}
                                >
                                  <div className="card-body">
                                    <h5 className="card-title text-white">
                                      {c.name}
                                    </h5>
                                    <p className="card-text text-white">Email : {e.email}</p>
                                    <p className="card-text text-white">Mobile : {m.mobile}</p>
                                    <p className="card-text text-white">Resume : <a href={r.resume}>{r.resume}</a>  </p>
                                    <p className="card-text text-white">SOP : {s.sop}</p>

                                  </div>
                                </div>
                              </div>
                            )
                          )
                        )
                      )
                    )}
                  </div>
                </div>
              </div>
            </>
          ))}
        {/* <pre>{JSON.stringify(lt, null, 4)}</pre> */}
      </div>
  </div>
    </>
  );
};

export default candidate;
