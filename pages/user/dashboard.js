import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import renderHTML from "react-render-html";
import UserRoute from "../../components/routes/UserRoute";
import { Modal } from "antd";
import ApplyForm from "../../components/forms/ApplyForm";
import moment from "moment";
import ParallaxBG from "../../components/cards/ParallaxBG";

const Admin = () => {
  const [state, setState] = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  //apply form
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [resume, setResume] = useState("");
  const [sop, setSop] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      newsFeed();
    }
  }, [state && state.token]);

  const newsFeed = async () => {
    try {
      const { data } = await axios.get(`/posts`);
      // console.log("user posts", data);
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormModel = async (post) => {
    setCurrentPost(post);
    setVisible(true);
  };
  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/apply", {
        postId: currentPost._id,
        name,
        email,
        mobile,
        resume,
        sop,
      });
      // console.log("apply", data);
      setName("");
      setEmail("");
      setMobile("");
      setResume("");
      setSop("");
      setVisible(false);
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };

  // if (state && state.user.role == 'Recuirter') router.push("/admin/dashboard")
  // if (state && state.user.role == 'Candidate') router.push("/user/dashboard");

  return (
    <UserRoute>
      <ParallaxBG url="https://api.time.com/wp-content/uploads/2021/02/laptop-home-office.jpg">
        {" "}
        JOB OPENINGS{" "}
      </ParallaxBG>

      <div className="container">
      <div className="input-group my-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control"
                placeholder="Search by Jobs ..."
                aria-label="Recipient's name"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">
                  Search
                </button>
              </div>
            </div>
        <div className="row py-4">
          <div className="col-md-12">
            {posts &&
              posts.filter((post)=>post.title.toLowerCase().includes(search.toLowerCase())).map((post, i) => (
                <div className="card mb-3" key={post._id}>
                  <div className="row g-0">
                    <div className="card-header ">
                      {/* <Avatar size={40} src={imageSource(post.postedBy)} /> */}
                      <span className="py-2 mx-1">{post.postedBy.name}</span>
                      <span className="py-2 mx-1 text-muted">
                        {moment(post.createdAt).fromNow()}
                      </span>
                    </div>

                    <div className="col-md-4">
                      <img
                        src={post.image && post.image.url}
                        width="400"
                        height="250"
                        className="card-img-top"
                        alt={post.postedBy.name}
                      />
                    </div>

                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{renderHTML(post.content)}</p>

                        {post.emails.map((e) =>
                          e.postedBy === state.user._id ? (
                            <div>
                              <button
                                onClick={() => handleFormModel(post)}
                                className=" btn btn-primary"
                                disabled
                              >
                                APPLIED
                              </button>
                            </div>
                          ) : (
                            post.title && (
                              <div>
                                <button
                                  onClick={() => handleFormModel(post)}
                                  className=" btn btn-primary"
                                  disabled
                                >
                                  APPLY
                                </button>
                              </div>
                            )
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <Modal
              title="Apply Form "
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <ApplyForm
                name={name}
                email={email}
                mobile={mobile}
                resume={resume}
                sop={sop}
                setName={setName}
                setEmail={setEmail}
                setMobile={setMobile}
                setResume={setResume}
                setSop={setSop}
                handleApply={handleApply}
              />
            </Modal>
          </div>
        </div>
        <pre>{JSON.stringify(posts, null, 3)}</pre>
      </div>
    </UserRoute>
  );
};

export default Admin;
