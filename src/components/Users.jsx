import { Link, useLoaderData } from "react-router-dom";
import "./user.css";
import { useState } from "react";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleRemove = (_id) => {
    console.log("Delete:", _id);
    fetch(`http://localhost:5000/users/${_id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("Delete Successfully");
          const remaining = users.filter((user) => user._id !== _id);
          setUsers(remaining);
          console.log(remaining);
        }
      });
  };

  return (
    <div>
      <h1>Hello Users</h1>
      <h3>User Length: {users.length}</h3>
      <div className="container">
        {users.map((user) => (
          <div className="divStyle" key={user._id}>
            <h4>{user.name}</h4>
            <p>{user.email}</p>
            <Link to={`/update/${user._id}`}>
              <button className="update">UPDATE</button>
            </Link>
            <button onClick={() => handleRemove(user._id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
