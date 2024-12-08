import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Register() {
  //within toast
  const [errorMsg, setErrorMsg] = useState(null);
  //to go to home
  const navigate = useNavigate();
  const schema = yup.object({
    name: yup
      .string()
      .required()
      .min(3, "name must be at least 3 characters")
      .max(15, "name must be at most 15 characters"),
    email: yup
      .string()
      .required("email is required")
      .email("email is not valid"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^[A-Z][0-9a-zA-Z]{5,15}$/,
        "password should start with uppercase letter followed by a combinations of letters and numberfrom 5 to 25 char"
      ),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: sendData,
  });
  async function sendData(values) {
    let id;
    try {
      const option = {
        url: "http://gradproj.runasp.net/api/student/signup",
        method: "POST",
        data: values,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const r = await axios.request(option);
      console.log(r);
      // id = toast.loading("waiting...");
      // const { data } = await axios.request(option);
      // console.log(data);
      // toast.dismiss(id);
      // toast.success("user created successfully");

      // setTimeout(() => {
      //   if (data.message === "success") {
      //     navigate("/app");
      //   }
      // }, 3000);
    } catch (error) {
      console.log("e:");
      console.log(error);

      // toast.dismiss(id);
      // toast.error(error.response.data.message);
      // setErrorMsg(error.response.data.message);
    }
  }

  return (
    <>
      <section>
        <h2 className="text-primary text-xl pb-4">
          <i className=" fa-regular fa-circle-user me-3"></i>
          <span>Register now</span>
        </h2>
        <form className=" flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              className=" form-control w-full"
              placeholder="username"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className=" text-red-600 font-semibold mt-2">
                *{formik.errors.name}
              </div>
            ) : (
              ""
            )}
          </div>
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
            {errorMsg ? (
              <div className=" text-red-600 font-semibold mt-2">
                *{errorMsg}
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
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className=" text-red-600 font-semibold mt-2">
                *{formik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>

          <button type="submit" className=" btn-primary ">
            Sign up
          </button>
        </form>
      </section>
    </>
  );
}
