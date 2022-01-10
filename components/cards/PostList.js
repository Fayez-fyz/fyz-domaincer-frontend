import React, { useContext, useState } from "react";
import { Avatar, Modal } from "antd";
import renderHTML from "react-render-html";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import Link from "next/link";

const PostList = ({ posts, handleDelete }) => {
  const [state] = useContext(UserContext);

  const router = useRouter();

  return (
    <div>
      <div className="row row-cols-1 my-2">
        {posts &&
          posts.map((post) => (
            <div key={post._id} className="col mb-3">
              <div className="card h-100 border rounded-3  shadow-lg">
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
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex">
                      {state &&
                        state.user &&
                        state.user._id === post.postedBy._id && (
                          <div
                            className="ml-auto"
                            style={{ marginLeft: "auto" }}
                          >
                            <EditOutlined
                              onClick={() =>
                                router.push(`/admin/post/${post._id}`)
                              }
                              className="text-primary mx-2 pt-2 h5 "
                            />
                            <DeleteOutlined
                              onClick={() => handleDelete(post)}
                              className="text-primary mx-2 pt-2 h5"
                            />
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* <div className="card-header ">
                  / <Avatar size={40} src={imageSource(post.postedBy)} /> 
                  <span className="py-2 mx-1">{post.postedBy.name}</span>
                  <span className="py-2 mx-1 text-muted">
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div> */}
                {/* <img
                  src={post.image && post.image.url}
                  width="400"
                  height="250"
                  className="card-img-top"
                  alt={post.postedBy.name}
                />

                <div className="card-body text-center text-white ">
                  <h5 className="card-title text-white">{post.title}</h5>
                  <Link href={`/post/${post._id}`}>
                    <a className="btn btn-outline-primary">View</a>
                  </Link>
                </div>
                <div className="card-footer">
                  <div className="d-flex">
                    {state &&
                      state.user &&
                      state.user._id === post.postedBy._id && (
                        <div className="ml-auto" style={{ marginLeft: "auto" }}>
                          <EditOutlined
                            onClick={() =>
                              router.push(`/admin/post/${post._id}`)
                            }
                            className="text-primary mx-2 pt-2 h5 "
                          />
                          <DeleteOutlined
                            onClick={() => handleDelete(post)}
                            className="text-primary mx-2 pt-2 h5"
                          />
                        </div>
                      )}
                  </div>
                </div>*/}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostList;
