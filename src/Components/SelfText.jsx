/* eslint-disable react/prop-types */
import { useContext } from "react";
import userIcon from "../assets/UserIcon.svg";
import downloadIcon from "../assets/downloadIcon.svg";
import { UserContext } from "../Context/UserProvider";

const SelfText = ({ e }) => {
  const { loggedUser } = useContext(UserContext);
  const imageExtensions = ["png", "jpg", "jpeg", "svg", "gif", "avif", "webp"];
  const checkImage = e?.image?.split(".")[1];

  return (
    <div>
      <p className="flex justify-center items-center">{e.time}</p>
      <div className="flex gap-10 items-end flex-row-reverse">
        <figure className="w-14 h-14 flex gap-10">
          <img
            className="w-full h-full rounded-full"
            src={`${import.meta.env.VITE_BASE_URL}/photo/${loggedUser?.photo}`}
            alt=""
          />
        </figure>
        <div className="flex h-fit w-fit  flex-col justify-between">
          {e.text && (
            <p className="w-fit text-left h-fit break-words text-white text-xl px-3 py-2 bg-[#036825] rounded-xl">
              {e.text}
            </p>
          )}

          {checkImage && imageExtensions.includes(checkImage) && (
            <img
              className="h-52 w-auto"
              src={`${import.meta.env.VITE_BASE_URL}/photo/${e?.image}`}
              alt=""
            />
          )}

          {checkImage && !imageExtensions.includes(checkImage) && (
            <div>
              <div className="flex flex-col justify-between items-center">
                <p>{e?.image}</p>
                <figure className="my-2 w-10 h-10 rounded-full justify-center items-center flex">
                  <a
                    href={`${import.meta.env.VITE_BASE_URL}/photo/${e?.image}`}
                  >
                    <img className="w-full h-full" src={downloadIcon} alt="" />
                  </a>
                </figure>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelfText;
