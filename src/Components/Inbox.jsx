import { useContext, useEffect, useState } from "react";
// import plusIcon from "../assets/plusIcon.svg";
import User from "./User";
import ChatBox from "./ChatBox";
import userIcon from "../assets/UserIcon.svg";
import { UserContext } from "../Context/UserProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getData from "../utils/req";
import req from "../utils/req";
import { useDispatch } from "react-redux";
import { remove } from "../Redux/reducers/chatReducer";
import logo from "../assets/logo.svg";
import loadingAnimation from "../assets/loading.json";
import Lottie from "lottie-react";

function Inbox() {
  const { loggedUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [useractive, setuserActive] = useState(null);
  const [allUser, setAllUser] = useState(users);
  const navigate = useNavigate();

  useEffect(() => {
    const abrtSignal = new AbortController();
    req({
      uri: "users",
      signal: abrtSignal.signal,
    })
      .then(({ data }) => {
        const filteredUsers = data.filter((d) => d.id !== loggedUser?.id);
        setUsers(filteredUsers);
        // setuserActive(filteredUsers[0]);
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
    return () => abrtSignal.abort();
  }, [loggedUser]);

  const deletehandler = (item) => {
    const user = allUser.filter((e) => e.id !== item.id);
    setAllUser(user);
    // setuserActive(user[0]);
  };

  const handleLoghOut = () => {
    // axios
    //   .post(`${import.meta.env.VITE_BASE_URL}/logout`, {
    //     withCredentials: true,
    //   })
    req({
      uri: "logout",
      method: "POST",
    })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleActiveUser = (e) => {
    setuserActive(e);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Lottie animationData={loadingAnimation}></Lottie>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex justify-between items-center ">
      <div className="bg-[#202020] bg-[url('https://i.postimg.cc/ncqzcgmv/istockphoto-1183632265-612x612-1.png')] w-1/4 h-screen overflow-auto  ">
        {/* userside */}
        {/* <div className="flex gap-2">
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
        </div> */}
        <div className="bg-[#141414]   p-4 mb-5 flex justify-between ">
          <div className="flex gap-2">
            <figure className="w-14 h-14">
              <img src={logo} alt="w-full h-full rounded-full" />
            </figure>
            <p className="uppercase text-2xl font-semibold text-[#99FFAF]">
              chatBooth
            </p>
          </div>
          <div className="flex">
            <figure className="h-14 w-14">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/photo/${
                  loggedUser?.photo
                }`}
                alt=""
                className="h-full w-full rounded-full"
              />
            </figure>
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
