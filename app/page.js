import React from "react";
import axios from "axios";
import Link from 'next/link'
const fetchBlogs = async () => {
  try {
    const response = await axios.get(
      `${process.env.STRAPI_BASE_URL}/api/blogs`
    );

    console.log("data", response.data);
    return response.data.data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export default async function page() {
  const blogs = await fetchBlogs();

  return (
    <div className=" container m-10 ">
    
     <div className="grid grid-cols-4 gap-2">
        {blogs.map((blog, index) => (
          <div key={index} className=" bg-slate-300 p-4 rounded-md">
         
            <div className="text-3xl  mb-4">{blog.attributes.title}</div>
            <div>{blog.attributes.description}</div>
            <Link href={`/blog/${blog.id}`}>see more...</Link>
          </div>
        ))}
     </div>
    </div>
  );
}
