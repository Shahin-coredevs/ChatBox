import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserProvider";
import axios from "axios";
import req from "../utils/req";
export default function LogIn() {
  const { setLoggedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
  } = useForm();

  const handleSubmit = async (e) => {
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
    <div className="w-1/2 mt-20 mx-auto h-full bg-slate-300 shadow-xl rounded-xl">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center items-center py-20 px-20 mb-5"
      >
        <div className="w-full lg:w-1/3 flex flex-col gap-3 mb-5">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            {...register("email")}
            placeholder="abc@email.com"
            className="input input-bordered w-full px-3 py-2 rounded-xl"
            required
          />
          {errors.email?.type === "required" && (
            <p className="text-red-600">Email is required</p>
          )}
        </div>
        <div className="w-full lg:w-1/3 flex flex-col gap-3">
          <label className="label">
            <span className="label-text">Password</span>
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
            className="input input-bordered w-full px-3 py-2 rounded-xl"
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
          className="bg-blue-400 px-4 py-2 my-5 rounded-xl cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}
