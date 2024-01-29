import userIcon from "../assets/UserIcon.svg"
const User = () => {
    return (
        <div className="p-4 bg-slate-100 rounded-xl ">
            <div className="flex gap-5">
                <figure className="w-14 h-14 rounded-full"><img src={userIcon} alt="" /></figure>
                <div>
                    <h1 className="text-xl font-medium">Shahin khan</h1>
                    <p className="text-sm font-light">Message</p>
                </div>
            </div>

            
        </div>
    );
};

export default User;