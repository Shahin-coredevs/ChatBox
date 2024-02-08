import { useContext, useEffect, useState } from "react";
// import plusIcon from "../assets/plusIcon.svg";
import User from "./User";
import ChatBox from "./ChatBox";
import userIcon from "../assets/UserIcon.svg";
import { UserContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Inbox() {
  const { loggedUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useractive, setuserActive] = useState(null);
  const [allUser, setAllUser] = useState(users);
  const navigate = useNavigate();

  useEffect(() => {
    const abrtSignal = new AbortController();
    axios.get( `${import.meta.env.VITE_BASE_URL}/users`, {withCredentials:true, signal:abrtSignal.signal})
    .then(({data}) => {
      setUsers(data.filter((d) => d.id !== loggedUser?.id));
       setuserActive(data.filter((d) => d.id !== loggedUser?.id)[0]);
    })
    .catch((err)=>console.log(err))
    .finally(()=>setLoading(false));

    return ()=> abrtSignal.abort;
    
  }, [loggedUser]);


 
  const deletehandler = (item) => {
    const user = allUser.filter((e) => e.id !== item.id);
    setAllUser(user);
    setuserActive(user[0]);
  };

  const handleLoghOut = () => {
    localStorage.clear();
    axios.post(`${import.meta.env.VITE_BASE_URL}/logout`, {},{withCredentials:true})
    .then(res =>{  navigate('/')})
    .catch(err=> console.log(err));
  };

  const handleActiveUser =  (e) => {
    setuserActive(e)
    
  }

  if (loading)
    return <div className="bg-red-500 h-screen w-screen">Loading...</div>;

  return (
    <div className="w-screen h-screen flex justify-between items-center ">
      <div className="bg-red-400 w-1/4 h-screen overflow-auto p-4">
        {/* userside */}
        <div className="flex gap-2">
          <div className="p-4 bg-slate-100 rounded-xl mb-5">
            <div className="flex gap-5">
              <figure className="w-14 h-14 rounded-full">
                <img src={userIcon} alt="" />
              </figure>
              <div>
                <p className="">{loggedUser?.name}</p>
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
        <User data={users} active={useractive} userHandler={handleActiveUser} />
      </div>
      {/* Inbox */}
      <div className="w-3/4">
        <ChatBox data={users} user={useractive} deletedUser={deletehandler} />
      </div>
    </div>
  );
}

export default Inbox;
