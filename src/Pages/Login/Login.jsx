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
  //to go to login
  const navigate = useNavigate();
  const { token, setToken } = useContext(userCont);
  const schema = yup.object({
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
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin ",
        method: "POST",
        data: values,
      };

      id = toast.loading("waiting...");
      const { data } = await axios.request(option);
      console.log(data);
      toast.dismiss(id);
      toast.success("user logedin successfully");

      setTimeout(() => {
        if (data.message === "success") {
          //^el token kan b null
          //^ dlw2ty hyt change el state bta3tha ehy mogoda fe eh context الي كله يقدر يشوفها
          //^ lma el user y logi sucessfuly
          //^we el value bta3t el token.... bta3 el "user" de ahna mehtagenha fe kol el app
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/app");
        }
      }, 1000);
    } catch (error) {
      toast.dismiss(id);
      toast.error(error.response.data.message);
      setErrorMsg(error.response.data.message);
    }
  }

  return (
    <>
      <section>
        <h2 className="text-primary text-xl pb-4">
          <i className=" fa-regular fa-circle-user me-3"></i>
          <span>Login</span>
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
            {errorMsg ? (
              <div className=" text-red-600 font-semibold mt-2">
                *{errorMsg}
              </div>
            ) : (
              ""
            )}
          </div>
          <div>
            <Link to="/auth/forgotpassword">
              <p>Forget Password ?</p>
            </Link>
          </div>
          <button type="submit" className=" btn-primary ">
            log in
          </button>
        </form>
      </section>
    </>
  );
}
