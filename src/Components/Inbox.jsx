import { useContext, useEffect, useState } from "react";
// import plusIcon from "../assets/plusIcon.svg";
import User from "./User";
import ChatBox from "./ChatBox";
import userIcon from "../assets/UserIcon.svg";
import { UserContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Inbox() {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get( `${import.meta.env.VITE_BASE_URL}/users`, {withCredentials:true})
    .then((data) => setUsers(data.data.filter((e) => e.id !== user?.id)));
    // fetch("http://localhost:3000/users")
    //   .then((res) => res.json())
    //   .then((data) => setUsers(data.filter((e) => e.id !== user?.id)));
    setLoading(false);
  }, [user]);

  // useEffect(() => {
  //   setUser(localStorage.getItem("loggedUser"));
  // }, [setUser]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const [useractive, setuserActive] = useState(users[0]);
  const [allUser, setAllUser] = useState(users);

  //   const inputRef = useRef();
  // useEffect(() => {}, [useractive]);
  //   console.log(useractive);

  const deletehandler = (item) => {
    const user = allUser.filter((e) => e.id !== item.id);
    setAllUser(user);
    setuserActive(user[0]);
  };

  const handleLoghOut = () => {
    localStorage.clear();
    navigate("/");
  };

  //   const createUser = () => {
  //     const name = inputRef.current.value;
  //     const id = allUser.length + 1;
  //     const user = { id, name };
  //     setAllUser((prev) => [...prev, user]);
  //     console.log(user);
  //     inputRef.current.value = "";
  //   };

  if (loading)
    return <div className="bg-red-500 h-screen w-screen">Loading...</div>;

  return (
    <div className="w-screen h-screen flex justify-between items-center ">
      <div className="bg-red-400 w-1/4 h-screen overflow-auto p-4">
        {/* userside */}
        <div className="flex gap-2">
          {/* <input
            ref={inputRef}
            className="w-full  text-xl  h-12 rounded-xl p-5 outline-slate-800 mb-5"
            type="text"
            placeholder="search here ...."
          />
          <button onClick={createUser} className="w-10 h-10">
            <img className="w-full" src={plusIcon} alt="" />
          </button> */}
          <div className="p-4 bg-slate-100 rounded-xl mb-5">
            <div className="flex gap-5">
              <figure className="w-14 h-14 rounded-full">
                <img src={userIcon} alt="" />
              </figure>
              <div>
                <p className="">{user?.name}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLoghOut}
            className="bg-blue-400 px-4 py-2 my-8 rounded-xl cursor-pointer"
          >
            Log Out
          </button>
        </div>
        <User data={users} userHandler={setuserActive} />
      </div>
      {/* Inbox */}
      <div className="w-3/4">
        <ChatBox data={users} user={useractive} deletedUser={deletehandler} />
      </div>
    </div>
  );
}

export default Inbox;
