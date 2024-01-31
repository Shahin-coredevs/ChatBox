/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import userIcon from "../assets/UserIcon.svg";
import AttachmentIcon from "../assets/attachmentIcon.svg";
import PhotoIcon from "../assets/photoIcon.svg";
import sendIcon from "../assets/sendIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import { io } from "socket.io-client";
import SelfText from "./SelfText";
import OtherText from "./OtherText";
const socket = io("http://localhost:3000");

const ChatBox = ({user,deletedUser}) => {
  const scrollRef = useRef();
  const [allMessage, setAllMessage] = useState([]);
  

  useEffect(() => {
    setAllMessage(user?.message);
    socket.on("connectToRoom", (data) => {
      setAllMessage((prev) => [...prev, data]);
      return () => socket.off("connectToRoom");
    });
  }, [user]);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [allMessage]);

  const sendMessage = (e) => {
    e.preventDefault();
    const now = new Date();
    const time = now.getHours() + ":" + now.getMinutes();
    const text = e.target.textfield.value;
    const data = {
      text,
      time,
      user: socket.id,
    };
    socket.emit("message", data);
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
          
          <button onClick={()=>deletedUser(user)} className="w-14 h-14 rounded-full">
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
              {e.user === socket.id || e.user === "self" ? <SelfText e={e} /> : <OtherText e={e} />}
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
                onChange={(e) => {
                  const now = new Date();
                  const time = now.getHours() + ":" + now.getMinutes();
                  const file = e.target.files[0];
                  const name = e.target.files[0].name;
                  const filesize = e.target.files[0].size;
                  const size = (filesize / (1024 * 1024)).toFixed(2);
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const imageSrc = e.target.result;
                    socket.emit("message", {
                      attach: imageSrc,
                      name: name,
                      size,
                      time,
                      user: socket.id,
                    });
                  };
                  reader.readAsDataURL(file);
                }}
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
                onChange={(e) => {
                  const now = new Date();
                  const time = now.getHours() + ":" + now.getMinutes();
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const imageSrc = e.target.result;
                    socket.emit("message", {
                      image: imageSrc,
                      time,
                      user: socket.id,
                    });
                  };
                  reader.readAsDataURL(file);
                }}
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
