/* eslint-disable react/prop-types */
import userIcon from "../assets/UserIcon.svg";
import downloadIcon from "../assets/downloadIcon.svg";

const OtherText = ({ e }) => {
  return (
    <div>
      <p className="flex justify-center items-center">{e.time}</p>
      <div className="flex gap-10 items-end">
        <figure className="w-14 h-14 rounded-full flex gap-10">
          <img className="w-full h-full" src={userIcon} alt="" />
        </figure>
        <div className="flex h-fit w-fit px-3 py-2 bg-slate-100 rounded-xl flex-col  justify-between">
          {e.text && (
            <p className="w-fit text-left h-fit break-words">{e.text}</p>
          )}
          {e.image && <img className="h-52 w-auto" src={e.image} />}
          {e.attach && (
            <div>
              <div className="flex flex-col justify-between">
                <p>{e.name}</p>
                <figure className="my-2 w-10 h-10 rounded-full justify-center items-center flex">
                  <a href={e.attach}>
                    <img className="w-full h-full" src={downloadIcon} alt="" />
                  </a>
                </figure>
                <p>{e.size} MB</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherText;
