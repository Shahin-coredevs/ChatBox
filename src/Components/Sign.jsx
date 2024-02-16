import { useForm } from "react-hook-form";
import signphoto from "../assets/signupAnimation.svg";
import { Link, useNavigate } from "react-router-dom";
import req from "../utils/req";
import { useContext } from "react";
import { UserContext } from "../Context/UserProvider";
const Sign = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = e.target;
    const name = formData.name.value;
    const email = formData.email.value;
    const password = formData.password.value;
    const fd = new FormData();
    const photo = e.target.photo.files[0];
    const user = { name, password, email };
    const payload = {
      photo,
      data: JSON.stringify(user),
    };
    Object.keys(payload).forEach((key) => fd.append(key, payload[key]));

    req({
      uri: "users",
      method: "POST",
      data: fd,
    })
      .then((res) => {
        alert("user created");
        navigate("/");
        formData.reset();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="max-w-7xl mx-auto bg-purple-400 h-[800px] mt-16 rounded-3xl">
      <div className="flex w-full justify-center items-center h-full">
        <div className="w-1/3 h-full">
          <figure className="flex justify-center items-center relative">
            <img className="absolute top-48 left-24" src={signphoto} alt="" />
          </figure>
        </div>
        <div className="w-2/3 h-full  bg-white md:pl-32 flex ">
          <div className="w-full">
            <h3 className="text-center text-7xl font-bold mb-8">
              Create Account
            </h3>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col justify-center items-center py-20 px-20 mb-5"
            >
              <div className="w-full flex flex-col gap-3 mb-5">
                <label className="label">
                  <span className="label-text text-xl font-semibold">Name</span>
                </label>
                <input
                  type="Text"
                  name="name"
                  {...register("name")}
                  placeholder="Name..."
                  className="input border-2 border-slate-800 focus:outline-purple-500 w-full px-3 py-2 rounded-xl"
                  required
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-600">Name is required</p>
                )}
              </div>
              <div className="w-full flex flex-col gap-3 mb-5">
                <label className="label">
                  <span className="label-text text-xl font-semibold">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email")}
                  placeholder="abc@email.com"
                  className="input border-2 border-slate-800 focus:outline-purple-500 w-full px-3 py-2 rounded-xl"
                  required
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-600">Email is required</p>
                )}
              </div>
              <div className="w-full flex flex-col gap-3">
                <label className="label">
                  <span className="label-text text-xl font-semibold">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 2,
                    maxLength: 20,
                  })}
                  placeholder="password"
                  className="input border-2 border-slate-800 focus:outline-purple-500 w-full px-3 py-2 rounded-xl"
                  required
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 2 characters</p>
                )}
              </div>
              <div className="w-full flex flex-col gap-3">
                <label className="label mt-5">
                  <span className="label-text text-xl font-semibold">
                    Photo
                  </span>
                </label>
                <input
                  type="file"
                  name="photo"
                  {...register("photo", {
                    required: true,
                  })}
                  placeholder="password"
                  className="input  w-fit px-3 py-2 rounded-xl"
                  required
                />
                {errors.photo?.type === "required" && (
                  <p className="text-red-600">photo is required</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-purple-500 w-full px-4 py-2 my-5 rounded-xl cursor-pointer text-white text-2xl font-semibold"
              >
                Sign Up
              </button>
              <div>
                <h6>
                  Already have an account?{" "}
                  <Link to="/" className="text-purple-500 text-xl">
                    {" "}
                    Log In
                  </Link>
                </h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
