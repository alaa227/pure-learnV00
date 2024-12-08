import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { userCont } from "../../context/User.context";

export default function Login() {
  //within toast
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  const { token, setToken } = useContext(userCont);
  const schema = yup.object({
    email: yup
      .string()
      .required("email is required")
      .email("email is not valid"),

    newpassword: yup
      .string()
      .required("password is required")
      .matches(
        /^[A-Z][0-9a-zA-Z]{5,15}$/,
        "password should start with uppercase letter followed by a combinations of letters and numberfrom 5 to 25 char"
      ),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      newpassword: "",
    },
    validationSchema: schema,
    onSubmit: sendData,
  });
  async function sendData(values) {
    let id;
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      const option = {
        url: "http://gradproj.runasp.net/api/student/update",
        method: "POST",
        data: formData,
      };

      // id = toast.loading("waiting...");
      const re = await axios.request(option);
      console.log("ok");

      console.log(re);
      // toast.dismiss(id);
      // toast.success("user logedin successfully");

      // setTimeout(() => {
      //   if(token){
      //       localStorage.setItem("token", data.token);
      //   setToken(data.token);
      //   navigate("/");

      //   }
      // }, 1000);
    } catch (error) {
      console.log(error);

      // toast.dismiss(id);
      // toast.error(error.response.data.message);
      // setErrorMsg(error.response.data.message);
    }
  }

  return (
    <>
      <section className="mx-44 my-10">
        <h2 className="text-primary text-xl pb-4">
          <i className=" fa-regular fa-circle-user me-3"></i>
          <span>Reset Password </span>
        </h2>
        <form className=" flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="email"
              className=" form-control w-full"
              placeholder="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className=" text-red-600 font-semibold mt-2">
                *{formik.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>

          <div>
            <input
              type="password"
              className=" form-control w-full"
              placeholder="password"
              name="newpassword"
              value={formik.values.newpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.newpassword && formik.touched.newpassword ? (
              <div className=" text-red-600 font-semibold mt-2">
                *{formik.errors.newpassword}
              </div>
            ) : (
              ""
            )}
            {errorMsg ? (
              <div className=" text-red-600 font-semibold mt-2">
                *{errorMsg}
              </div>
            ) : (
              ""
            )}
          </div>

          <button type="submit" className=" btn-primary ">
            log in
          </button>
        </form>
      </section>
    </>
  );
}
