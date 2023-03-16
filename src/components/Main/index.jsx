import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.modules.css";


const Main = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from the server
    axios
      .get("/Main", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    // Send updated user data to the server
    axios
      .put("/Main", user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    setIsEditing(false);
  };

  const handleLogout = () => {
	localStorage.removeItem("token");
	window.location.reload();
  };
  

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Profile Page</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.profile_container}>
        {isEditing ? (
          <form className={styles.profile_form} onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </label>
            <label>
              Age:
              <input
                type="number"
                value={user.age}
                onChange={(e) => setUser({ ...user, age: e.target.value })}
              />
            </label>
            <label>
              Gender:
              <select
                value={user.gender}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                value={user.dob}
                onChange={(e) => setUser({ ...user, dob: e.target.value })}
              />
            </label>
            <label>
              Mobile:
              <input
                type="text"
                value={user.mobile}
                onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              />
            </label>
            <button type="submit">Save</button>
          </form>
        ) : (
          <div className={styles.profile_data}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Date of Birth: {user.dob}</p>
            <p>Mobile: {user.mobile}</p>
            <button className={styles.white_btn} onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;


