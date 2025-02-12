import axios from "axios";
import { useRef } from "react";

const GetCookies = () => {
  const emailRef = useRef("");

  const handlefunction = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    // await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/fetchCookies`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Cookies: true,
    //   },
    //   body: { email: email },
    // })
    //   .then(() => {
    //     //console.log("done");
    //   })
    //   .catch((err) => {
    //     ////console.log(err);
    //   });

    await axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/fetchCookies`,
        { email: email },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        ////console.log("response \n", response);
      })
      .catch((error) => console.log(error)); //console.log(error));

    //     // navigate("/");
  };

  return (
    <form
      onSubmit={handlefunction}
      className="m-5"
      style={{ maxWidth: "300px" }}
    >
      <label for="exampleInputEmail1" class="form-label">
        Email address
      </label>
      <input
        type="email"
        class="form-control mb-3"
        id="exampleInputEmail1"
        ref={emailRef}
      />
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default GetCookies;
