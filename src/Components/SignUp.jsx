import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const fromData= e.target    
    const name = fromData.name.value
    const email = fromData.email.value
    const password = fromData.password.value
    const user = {name,password,email}
    console.log(user);
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      navigate('/')
      fromData.name.value = ''
      fromData.email.value = ''
      fromData.password.value=''

  };
  return (
    <div className="w-1/2 mt-20 mx-auto h-full bg-slate-300 shadow-xl rounded-xl">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center items-center py-20 px-20 mb-5"
      >
        <div className="w-full lg:w-1/3 flex flex-col gap-3 mb-5">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="Text"
            name="name"
            {...register("name")}
            placeholder="Name..."
            className="input input-bordered w-full px-3 py-2 rounded-xl"
            required
          />
          {errors.name?.type === "required" && (
            <p className="text-red-600">Name is required</p>
          )}
        </div>
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
          {errors.name?.type === "required" && (
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
