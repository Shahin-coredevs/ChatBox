/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import userIcon from "../assets/UserIcon.svg";
import AttachmentIcon from "../assets/attachmentIcon.svg";
import PhotoIcon from "../assets/photoIcon.svg";
import sendIcon from "../assets/sendIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import { io } from "socket.io-client";
import SelfText from "./SelfText";
import OtherText from "./OtherText";
import { UserContext } from "../Context/UserProvider";
import axios from "axios";
import req from "../utils/req";
const socket = io("http://localhost:3000", { withCredentials: true });

const ChatBox = ({ user, deletedUser }) => {
  const scrollRef = useRef();
  const [allMessage, setAllMessage] = useState([]);
  const { loggedUser } = useContext(UserContext);
  const roomId = loggedUser?.id + user?.id;
  useEffect(() => {
    req({
      uri: `message/${roomId}`,
    }).then((res) => {
      setAllMessage(res.data);
      socket.emit("join", { connect: true, room: loggedUser?.id + user?.id });
    });
    return () => {
      socket.emit("join", { connect: false, room: loggedUser?.id + user?.id });
    };
  }, [user?.id]);

  useEffect(() => {
    socket.on("message", (data) => {
      setAllMessage((prev) => [...prev, data]);
    });
    return () => {
      socket.off("message");
    };
  }, []);
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [allMessage]);

  const sendMessage = (e) => {
    e.preventDefault();

    const now = new Date();
    const time = now.getHours() + ":" + now.getMinutes();
    const text = e.target.textfield.value;
    const photo = e.target.photo.files[0];
    const attach = e.target.attach.files[0];
    if (!text && !photo && !attach) return;
    const formdata = new FormData();
    if (photo || attach) {
      formdata.append("photo", photo || attach);
    }

    const sender = loggedUser.id;
    const receiver = user.id;
    const data = {
      text,
      time,
      sender,
      receiver,
      roomId,
    };
    formdata.append("data", JSON.stringify(data));

    req({
      method: "post",
      uri: "message",
      data: formdata,
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    e.target.textfield.value = "";
  };

  return (
    <div className="flex w-full flex-col justify-between h-screen">
      <div>
        {/* user info  */}
        <div className="p-4 bg-slate-100 rounded-xl flex justify-between">
          <div className="flex gap-5 h-full">
            <figure className="w-14 h-14 rounded-full">
              <img src={userIcon} alt="" />
            </figure>
            <div>
              <h1 className="text-xl font-medium">{user?.name || ""}</h1>
            </div>
          </div>

          <button
            onClick={() => deletedUser(user)}
            className="w-14 h-14 rounded-full"
          >
            <img src={deleteIcon} alt="" />
          </button>
        </div>
      </div>
      <div
        className="h-calc[h-screen-[160px]] overflow-y-auto flex flex-col p-5"
        ref={scrollRef}
      >
        {/* show message  */}
        {allMessage?.map((e, index) => {
          return (
            <div key={index} className=" p-4 h-full  rounded-xl mb-5 ">
              {e.sender === loggedUser.id ? (
                <SelfText e={e} />
              ) : (
                <OtherText e={e} />
              )}
            </div>
          );
        })}
      </div>
      {/* input field  */}
      <div className="w-full flex items-end">
        <form className="w-full" onSubmit={sendMessage}>
          <div className="w-full mb-5 flex gap-5 justify-center items-center pr-5">
            <div className="w-full flex gap-5 justify-center items-center bg-white px-3 py-1 rounded-xl">
              {/* Attachment  */}
              <label htmlFor="attachment">
                <figure className="w-16 h-10 cursor-pointer">
                  <img className="w-full h-full" src={AttachmentIcon} alt="" />
                </figure>
              </label>
              <input
                name="attach"
                type="file"
                id="attachment"
                className="hidden"
                accept="*/*"
              />
              {/* Text field  */}
              <input
                className="w-full  text-xl  h-12 rounded-xl p-5 focus:outline-none"
                type="text"
                name="textfield"
                placeholder="text here ...."
              />
              {/* Photo  */}
              <label htmlFor="photo">
                <figure className="w-16 h-10 cursor-pointer">
                  <img className="w-full h-full" src={PhotoIcon} alt="" />
                </figure>
              </label>
              <input
                name="photo"
                type="file"
                className="hidden"
                accept="image/*"
                id="photo"
              />
            </div>
            <button type="submit">
              <figure className="w-16 h-10 cursor-pointer">
                <img className="w-full h-full" src={sendIcon} alt="" />
              </figure>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
