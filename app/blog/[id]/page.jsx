import React from "react";
import axios from "axios";
const fetchBlogs = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.STRAPI_BASE_URL}/api/blogs/${id}?populate=thumbnail,author`
    );

    console.log("data", response.data);
    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export default async function page({ params }) {
  const blogId = params.id;
  const blog = await fetchBlogs(blogId);
  console.log(blog);
  return (
    <div className=" container m-10 ">
      <h1 className="text-3xl">tltle: {blog.attributes.title}</h1>
      <img src={ `${process.env.STRAPI_BASE_URL}${blog.attributes.thumbnail.data.attributes.formats.thumbnail.url}` } />
      <div>{blog.attributes.description}</div>

    </div>
  );
}
