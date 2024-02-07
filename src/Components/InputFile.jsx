import axios from "axios";
import PhotoIcon from "../assets/photoIcon.svg";

const InputFile = () => {
  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    const photo = e.target.photo.files[0];
    const formdata = new FormData();
    formdata.append("photo", photo);
    axios({
      method: "post",
      url: `${import.meta.env.VITE_BASE_URL}/photo`,
      data: formdata
    }).then((res) => console.log(res.data)); 
  };
  return (
    <div>
      <form onSubmit={handlePhotoSubmit}>
        <label htmlFor="photo">
          <figure className="w-16 h-10 cursor-pointer">
            <img className="w-full h-full" src={PhotoIcon} alt="" />
          </figure>
        </label>
        <input
          type="file"
          id="photo"
          name="photo"
          className="hidden"
          accept="*/*"
        />
        <button type="submit"> Submit</button>
      </form>
    </div>
  );
};

export default InputFile;
