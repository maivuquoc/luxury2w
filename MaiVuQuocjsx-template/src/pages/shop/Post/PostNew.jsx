import { Link } from "react-router-dom";
import apiPost from "../../../api/apiPosts";
import PostItem from "./PostItem";
import React, { useEffect, useState } from "react";

const PostNew = () => {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      apiPost.newPost().then((res) => {
        const postData = res.map(post => ({
            id: post.id,
            topic_id: post.topic_id,
            title: post.title,
            slug: post.slug,
            thumbnail: post.thumbnail,
            description: post.description,
            type: post.type,
            content: post.content,
            created_at: post.created_at,
            created_by: post.created_by,
            updated_at: post.updated_at,
            updated_by: post.updated_by,
        }));
        setPosts(postData);
      });
    }, []);
  
    return (
      <div className="col-md-6">
        <h4 className="text-center mb-3">Bài viết mới nhất</h4>
        {posts.map((post, index) => (
          <div key={index} className="mb-3">
            <PostItem post={post} />
          </div>
        ))}
        <div className="text-center mt-3 mb-4">
          <Link to="/post">
            <button className="btn btn-outline-dark">Xem tất cả</button>
          </Link>
        </div>
      </div>
    );
  };
  
  export default PostNew;
  
