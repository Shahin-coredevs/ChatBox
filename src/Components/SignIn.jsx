import Lottie from "lottie-react";
import loginAni from "../assets/loginAni.json";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserProvider";
import { useContext } from "react";
import req from "../utils/req";

const SignIn = () => {
  const { setLoggedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
  } = useForm();

  const handleLogIn = async (e) => {
    e.preventDefault();
    const formData = e.target;
    const email = formData.email.value;
    const password = formData.password.value;
    const data = { email, password };
    req({
      uri: "login",
      method: "POST",
      data,
    })
      .then((res) => {
        if (res.status === 200) {
          setLoggedUser(res.data);
          navigate("/inbox");
          formData.reset();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="max-w-7xl mx-auto bg-purple-400 h-[800px] mt-16 rounded-3xl">
      <div className="flex w-full justify-center items-center h-full">
        <div className="w-1/3 h-full flex justify-center items-center">
          <div className="">
            <Lottie animationData={loginAni}></Lottie>
          </div>
        </div>
        <div className="w-2/3 h-full  bg-white md:pl-32 flex ">
          <div className="w-full">
            <h3 className="text-center text-7xl font-bold mb-8">Log in</h3>
            <form
              onSubmit={handleLogIn}
              className="w-full flex flex-col justify-center items-center py-20 px-20 mb-5"
            >
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
              <button
                type="submit"
                className="bg-purple-500 w-full px-4 py-2 my-5 rounded-xl cursor-pointer text-white text-2xl font-semibold"
              >
                Sign in
              </button>
              <div>
                <h6>
                  Don't have an account?
                  <Link to="/signup" className="text-purple-500 text-xl">
                    {" "}
                    Sign Up
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

export default SignIn;
