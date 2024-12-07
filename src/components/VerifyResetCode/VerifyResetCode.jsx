import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { userCont } from "../../context/User.context";

export default function ForgetPass() {
  //within toast
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  
  const { token, setToken } = useContext(userCont);
  const schema = yup.object({
    resetCode: yup.string().required("enter the code"),
  });
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: schema,
    onSubmit: sendData,
  });
  async function sendData(values) {
    let id;
    try {
      const option = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };

      id = toast.loading("waiting...");
      const { data } = await axios.request(option);
      console.log(data);
      toast.dismiss(id);
      toast.success(data.message);

      setTimeout(() => {
        if (data.status === "Success") {
          navigate("/auth/resetPassword");
        }
      }, 3000);
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
          <span>verifyResetCode</span>
        </h2>
        <form className=" flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div>
            <input
              type="text"
              className=" form-control w-full"
              placeholder="resetCode"
              name="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className=" text-red-600 font-semibold mt-2">
                *{formik.errors.resetCode}
              </div>
            ) : (
              ""
            )}
          </div>
          <button type="submit" className=" btn-primary ">
            verify Code
          </button>
        </form>
      </section>
    </>
  );
}
