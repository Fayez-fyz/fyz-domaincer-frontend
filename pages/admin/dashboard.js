import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import PostForm from "../../components/forms/PostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, Modal, Pagination } from "antd";
import Link from "next/link";
import PostList from "../../components/cards/PostList";
import ParallaxBG from "../../components/cards/ParallaxBG";
import { PlusSquareOutlined } from "@ant-design/icons";
import AdminRoute from "../../components/routes/AdminRoute";

const dashboard = () => {
  const [state, setState] = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ok, setok] = useState(false);
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);

  const router = useRouter();

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

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log('Post =>',content)
    try {
      const { data } = await axios.post("/create-post", {
        title,
        content,
        image,
      });
      // console.log("created post", data);
      setok(false);
      if (data.error) {
        toast.error(data.error);
      } else {
        newsFeed();
        toast.success("Post created");
        setTitle("");
        setContent("");
        setImage({});
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    // console.log([...formData])
    setUploading(true);

    try {
      const { data } = await axios.post("/upload-image", formData);
      // console.log("uploader image =>", data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure to delete this post?");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      console.log("check data", data);
      toast.error("Post Deleted");
      newsFeed();
    } catch (error) {
      console.log(error);
    }
  };

  //   if (state && state.user.role == 'Recuirter') router.push("/admin/dashboard")
  //   if (state && state.user.role == 'Candidate') router.push("/user/dashboard");

  return (
    <AdminRoute>
      <ParallaxBG url="https://api.time.com/wp-content/uploads/2021/02/laptop-home-office.jpg">
        {" "}
        MY OPENINGS{" "}
      </ParallaxBG>
      <div className="container">
        <div className="row py-3">
          <div className="col-md-12">
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-outline-primary"
                onClick={() => setok(true)}
              >
                <PlusSquareOutlined className=" fs-3" />
                <span className="fs-6"> Create Post</span>
              </button>
            </div>
            <PostForm
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              ok={ok}
              setok={setok}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />

            {/* <pre>{JSON.stringify(posts,null,4)}</pre> */}

            <PostList posts={posts} handleDelete={handleDelete} />
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default dashboard;
//
