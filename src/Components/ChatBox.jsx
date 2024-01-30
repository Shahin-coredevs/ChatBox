import { useEffect, useRef, useState } from "react";
import userIcon from "../assets/UserIcon.svg";
import AttachmentIcon from "../assets/attachmentIcon.svg";
import PhotoIcon from "../assets/photoIcon.svg";
import sendIcon from "../assets/sendIcon.svg";
import downloadIcon from "../assets/downloadIcon.svg";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

const ChatBox = () => {
  const scrollRef = useRef();

  const [allMessage, setAllMessage] = useState([
    { text: "Hello world", time: "10:20PM", user: "other" },
  ]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    socket.on("connectToRoom", (data) => {
      setAllMessage((prev) => [...prev, data]);
      return () => socket.off("connectToRoom");
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [allMessage]);

  const sendMessage = (e) => {
    e.preventDefault();
    setUserId(socket.id);
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
        <div className="p-4 bg-slate-100 rounded-xl ">
          <div className="flex gap-5 h-full">
            <figure className="w-14 h-14 rounded-full">
              <img src={userIcon} alt="" />
            </figure>
            <div>
              <h1 className="text-xl font-medium">Shahin khan</h1>
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-calc[h-screen-[160px]] overflow-y-auto flex flex-col    p-5"
        ref={scrollRef}
      >
        {/* show message  */}
        {allMessage.map((e, index) => {
          return (
            <div key={index} className=" p-4 h-full  rounded-xl mb-5 ">
              {e.user === userId ? (
                <div>
                  <p className="flex justify-center items-center">{e.time}</p>
                  <div className="flex gap-10 items-end flex-row-reverse">
                    <figure className="w-14 h-14 rounded-full flex gap-10">
                      <img className="w-full h-full" src={userIcon} alt="" />
                    </figure>
                    <div className="flex h-fit w-fit px-3 py-2 bg-slate-100 rounded-xl flex-col  justify-between">
                      {e.text && (
                        <p className="w-fit text-left h-fit break-words">
                          {e.text}
                        </p>
                      )}
                      {e.image && <img className="h-52 w-auto" src={e.image} />}
                      {e.attach && (
                        <div>
                          <div className="flex flex-col justify-between">
                            <p>{e.name}</p>
                              <figure className="my-2 w-10 h-10 rounded-full justify-center items-center flex">
                            <a href={e.attach}>
                                <img
                                  className="w-full h-full"
                                  src={downloadIcon}
                                  alt=""
                                />
                            </a>
                              </figure>
                            <p>{e.size} MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="flex justify-center items-center">{e.time}</p>
                  <div className="flex gap-10 items-end">
                    <figure className="w-14 h-14 rounded-full flex gap-10">
                      <img className="w-full h-full" src={userIcon} alt="" />
                    </figure>
                    <div className="flex h-fit w-fit px-3 py-2 bg-slate-100 rounded-xl flex-col  justify-between">
                      {e.text && (
                        <p className="w-fit text-left h-fit break-words">
                          {e.text}
                        </p>
                      )}
                      {e.image && <img className="h-52 w-auto" src={e.image} />}
                      {e.attach && (
                        <div>
                          <div className="flex flex-col justify-between">
                            <p>{e.name}</p>
                              <figure className="my-2 w-10 h-10 rounded-full justify-center items-center flex">
                            <a href={e.attach}>
                                <img
                                  className="w-full h-full"
                                  src={downloadIcon}
                                  alt=""
                                />
                            </a>
                              </figure>
                            <p>{e.size} MB</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="w-full flex items-end">
        <form className="w-full" onSubmit={sendMessage}>
          <div className="w-full mb-5 flex gap-5 justify-center items-center pr-5">
            {/* input field  */}

            <div className="w-full flex gap-5 justify-center items-center bg-white px-3 py-1 rounded-xl">
              {/* Attachment  */}
              <label htmlFor="attachment">
                {" "}
                <figure className="w-16 h-10 cursor-pointer">
                  {" "}
                  <img className="w-full h-full" src={AttachmentIcon} alt="" />
                </figure>{" "}
              </label>
              <input
                onChange={(e) => {
                  const now = new Date();
                  const time = now.getHours() + ":" + now.getMinutes();
                  const file = e.target.files[0];
                  const name = e.target.files[0].name;
                  const filesize = e.target.files[0].size;
                  const size  = (filesize / (1024*1024)).toFixed(2);

                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const imageSrc = e.target.result;
                    socket.emit("message", {
                      attach: imageSrc,
                      name: name,
                      size,
                      time,
                      user: userId,
                    });
                  };
                  reader.readAsDataURL(file);
                }}
                type="file"
                id="attachment"
                className="hidden"
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
                {" "}
                <figure className="w-16 h-10 cursor-pointer">
                  {" "}
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
                      user: userId,
                    });
                    console.log(userId);
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
              {" "}
              <figure className="w-16 h-10 cursor-pointer">
                {" "}
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
