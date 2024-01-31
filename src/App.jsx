import { useEffect, useRef, useState } from "react";
import ChatBox from "./Components/ChatBox";
import User from "./Components/User";
import { users } from "../data";
import plusIcon from "../src/assets/plusIcon.svg";

function App() {
  const [useractive, setuserActive] = useState(users[0]);
  const [allUser, setAllUser] = useState(users);
  const inputRef = useRef();
  useEffect(() => {}, [useractive]);
  console.log(useractive);

  const deletehandler = (item) => {
    const user = allUser.filter((e) => e.id !== item.id);
    setAllUser(user);
    setuserActive(user[0]);
  };

  const createUser = () => {
    const name = inputRef.current.value;
    const id = allUser.length + 1;
    const user = { id, name };
    setAllUser((prev) => [...prev, user]);
    console.log(user);
    inputRef.current.value = "";
  };

  return (
    <div className="w-screen h-screen flex justify-between items-center ">
      <div className="bg-red-400 w-1/4 h-screen overflow-auto p-4">
        {/* userside */}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            className="w-full  text-xl  h-12 rounded-xl p-5 outline-slate-800 mb-5"
            type="text"
            placeholder="search here ...."
          />
          <button onClick={createUser} className="w-10 h-10">
            <img className="w-full" src={plusIcon} alt="" />
          </button>
        </div>
        <User data={allUser} userHandler={setuserActive} />
      </div>
      {/* Inbox */}
      <div className="w-3/4">
        <ChatBox data={allUser} user={useractive} deletedUser={deletehandler} />
      </div>
    </div>
  );
}

export default App;
