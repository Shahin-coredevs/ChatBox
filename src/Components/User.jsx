/* eslint-disable react/prop-types */

import userIcon from "../assets/UserIcon.svg";
const User = ({ data, userHandler }) => {
  return (
    <>
      {data?.map((e, index) => (
        <div
          key={index}
          onClick={() => userHandler(e)}
          className="p-4 bg-slate-100 rounded-xl mb-5"
        >
          <div className="flex gap-5">
            <figure className="w-14 h-14 rounded-full">
              <img src={userIcon} alt="" />
            </figure>
            <div>
              <h1 className="text-xl font-medium">{e?.name}</h1>
              {e?.message && <p className="text-sm font-light">{e?.message[e?.message.length-1].text}</p>}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default User;
