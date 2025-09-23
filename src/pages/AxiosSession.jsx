import axios from "axios";
import { useEffect, useState } from "react";
import RenderToDoList from "../components/RenderToDoList";

function AxiosSession() {
  // useState for stroing the data from API
  const [data, setData] = useState([]);

  // Axios code will go here
  useEffect(() => {
    // Axios GET requests will be made here
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        console.log("GET Response:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  // Axios POST request example
  const createPost = () => {
    const payload = {
      title: "foo",
      body: "bar",
      userId: 1,
      id: 1,
    };

    axios
      .post("https://jsonplaceholder.typicode.com/posts", payload)
      .then((response) => {
        console.log("POST Response:", response.data);
        // Optionally update state to include the new post
        setData((prevData) => [response.data, ...prevData]);
      })
      .catch((error) => {
        console.log("Error creating post:", error);
      });
  };

  // Axios PUT request example (not used in UI)
  const updatePost = (id) => {
    const updatedPost = {
      id: id,
      title: "updated title",
      body: "updated body",
      userId: 1,
    };

    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedPost)
      .then((response) => {
        console.log("PUT Response:", response.data);
        // Optionally update state to reflect the updated post
        setData((prevData) =>
          prevData.map((post) => (post.id === id ? response.data : post))
        );
      })
      .catch((error) => {
        console.log("Error updating post:", error);
      });
  };

  // Axios DELETE request example (not used in UI)
  const deletePost = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        console.log("DELETE Response:", response.data);
        // Optionally update state to remove the deleted post
        setData((prevData) => prevData.filter((post) => post.id !== id));
      })
      .catch((error) => {
        console.log("Error deleting post:", error);
      });
  };

  return (
    <>
      <div className="m-10 p-10 border-2 rounded-2xl">
        <RenderToDoList data={data.slice(0, 5)} />
      </div>

      <div className="flex justify-center align-center mb-5">
        <button
          className="bg-blue-100 mr-2 border-2 rounded-2xl p-4 hover:cursor-pointer hover:bg-blue-50 text-black"
          onClick={createPost}
        >
          Create Post
        </button>
        <button
          className="bg-blue-100 mr-2 border-2 rounded-2xl p-4 hover:cursor-pointer hover:bg-blue-50 text-black"
          onClick={() => updatePost(2)}
        >
          Update Post with ID 2
        </button>
        <button
          className="bg-blue-100 mr-2 border-2 rounded-2xl p-4 hover:cursor-pointer hover:bg-blue-50 text-black"
          onClick={() => deletePost(1)}
        >
          Delete Post with ID 1
        </button>
      </div>
    </>
  );
}

export default AxiosSession;
