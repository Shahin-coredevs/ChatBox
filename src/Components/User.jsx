/* eslint-disable react/prop-types */

import userIcon from "../assets/UserIcon.svg";
const User = ({ data, userHandler, active }) => {
  return (
    <>
      {data?.map((e, index) => (
        <div
          key={index}
          onClick={() => userHandler(e)}
          className={`p-4  rounded-xl  m-4  ${
            active?.id === e.id ? "bg-[#141414]" : "bg-[#202020]"
          }`}
        >
          <div className="flex gap-5">
            <figure className="w-14 h-14">
              <img
                className="w-full h-full rounded-full"
                src={`${import.meta.env.VITE_BASE_URL}/photo/${e?.photo}`}
                alt=""
              />
            </figure>
            <div>
              <h1 className="text-xl font-medium text-[#99FFAF]">{e?.name}</h1>
              {e?.message && (
                <p className="text-sm font-light">
                  {e?.message[e?.message.length - 1].text}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default User;
