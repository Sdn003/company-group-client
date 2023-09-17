import React, { useEffect, useRef, useState } from "react";
import "./Form.css";
import Modal from "../Modal/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import env from "react-dotenv";
import { toast } from "react-toastify";

function CreateForm({ btnType, headerType }) {
  const navigate = useNavigate();

  const [selectedCompanyName, setSelectedCompanyName] = useState([]);
  const [modal, setModal] = useState(false);
  const [render, setRender] = useState({ value: 10 });
  const [dataSharing, setDataSharing] = useState("No");
  const [businessType, setBusinessType] = useState("NA");
  const defaultValueManufacturer = useRef();
  const defaultValueRetailer = useRef();
  const defaultValueCheckBox = useRef();
  const [companyData, setCompanyData] = useState();
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    getCompanyData();
  }, []);

  //Getting the Company data and passing it to Modal
  const getCompanyData = async () => {
    try {
      setLoader(true)
      await axios
        .get(env.API_URL + "AllCompany")
        .then((res) => {
          setCompanyData(res.data.companyData);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err, "err");
          setLoader(false);
        });
    } catch (error) {
      setLoader(true);
      console.log(error, "errors");
      setLoader(false);
    }
  };

  const initialValues = {
    companyGroupName: "",
    companyGroupId: "",
  };

  const validationSchema = Yup.object({
    companyGroupName: Yup.string().required("Required"),
    companyGroupId: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      setLoader(true);

      let newGroup = {
        companyGroupName: values.companyGroupName,
        companyGroupId: values.companyGroupId,
        businessType: businessType,
        isDataSharing: dataSharing,
        selectedCompanyName: selectedCompanyName,
        companyCount: selectedCompanyName.length,
      };

      await axios
        .post(env.API_URL + "AddCompanyGroup", newGroup)
        .then((res) => {
          if (res.data.cgCreateSuccess === true) {
            toast.success(res.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
            setLoader(false);
            navigate("/");
          } else if (res.data.cgNameExist === true) {
            toast.error(res.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
            setLoader(false);
          } else if (res.data.cgIdExist === true) {
            toast.error(res.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
            setLoader(false);
          }
          else{
            toast.error(res.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
            setLoader(false);
          }
            
        }
          )
        .catch((err) => {
           toast.error('Error Occurred', {
             position: toast.POSITION.TOP_CENTER,
             autoClose: 3000,
           });
          //  console.log(err)
           setLoader(false);
          
        });
    } catch (error) {
      setLoader(true)
      console.log(error);
      setLoader(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const deleteOneCompany = (i) => {
    let tbdCompany = selectedCompanyName[i];
    selectedCompanyName.filter((val, i) => {
      if (val.id === tbdCompany.id) {
        selectedCompanyName.splice(i, 1);
      }
    });
    setSelectedCompanyName(selectedCompanyName);
    setRender((prev) => {
      return { ...prev };
    });
    console.log(selectedCompanyName);
  };

  return (
    <>
      {loader ? (
        <>
          <div className="loaderDiv">
            <span className="loader"></span>
          </div>
        </>
      ) : (
        <>
          <div id="formWrapper" className="formWrapper__class">
            {/* header Container  */}
            <div className="headerContainer">
              <div className="backBtnContainer" onClick={() => navigate("/")}>
                <i className="bi bi-arrow-left" />
              </div>
              <div className="headerContent">
                {headerType} Group of Companies
              </div>
            </div>

            {/* Form Container  */}
            <div id="formContainer" className="formContainer__class">
              <form className="formField">
                {/* Company Group Name  */}
                <div className="label">Company Group Name*</div>
                <div>
                  <input
                    type="text"
                    name="companyGroupName"
                    className="formField__input"
                    {...formik.getFieldProps("companyGroupName")}
                  />
                  {formik.touched.companyGroupName &&
                  formik.errors.companyGroupName ? (
                    <div style={{ color: "crimson" }} className="validatorText">
                      {formik.errors.companyGroupName}
                    </div>
                  ) : null}
                </div>
                {/* Company Group ID  */}
                <div className="label">Company Group ID*</div>
                <p>
                  <input
                    type="number"
                    className="formField__input"
                    name="companyGroupId"
                    {...formik.getFieldProps("companyGroupId")}
                  />
                  {formik.touched.companyGroupId &&
                  formik.errors.companyGroupId ? (
                    <div style={{ color: "crimson" }} className="validatorText">
                      {formik.errors.companyGroupId}
                    </div>
                  ) : null}
                </p>

                {/* Company Name  */}
                <div className="labelCompanyName">
                  Company Name
                  <div className="formBtnContainer">
                    <div className="formBtn" onClick={() => setModal(true)}>
                      <i className="bi bi-plus" /> Add
                    </div>
                    <div className="formBtn" id="formBtn__trash">
                      <i
                        className="bi bi-trash-fill"
                        title="Delete"
                        onClick={() => setSelectedCompanyName([])}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    type="text"
                    className="formField__input"
                    id="formField__input__companyName"
                  >
                    {selectedCompanyName &&
                      selectedCompanyName.map((val, i) => {
                        return (
                          <>
                            <li
                              key={i}
                              className="companyNameContainer"
                              style={{ listStyleType: "none" }}
                            >
                              <div className="companyNameContent" key={i}>
                                {val.companyName}
                              </div>

                              <div className="formBtn" id="formBtn__trash">
                                <i
                                  className="bi bi-trash-fill"
                                  title="Delete"
                                  onClick={() => deleteOneCompany(i)}
                                />
                              </div>
                            </li>
                          </>
                        );
                      })}
                  </div>
                </div>

                {/* Manufacturer or Retailer */}
                <div className="radioBtnGroup">
                  <label
                    className="label"
                    onClick={() => {
                      defaultValueManufacturer.current.checked = false;
                      setBusinessType("NA");
                    }}
                  >
                    Manufacturer :{" "}
                  </label>
                  <input
                    type="radio"
                    className="formField__radio"
                    name="businessType"
                    value="Manufacturer"
                    onChange={(e) => setBusinessType(e.target.value)}
                    ref={defaultValueManufacturer}
                  />
                  <label
                    className="label"
                    onClick={() => {
                      defaultValueRetailer.current.checked = false;
                      setBusinessType("NA");
                    }}
                  >
                    Retailer :
                  </label>
                  <input
                    type="radio"
                    className="formField__radio"
                    name="businessType"
                    value="Retailer"
                    onChange={(e) => {
                      // console.log(e.target.value)
                      setBusinessType(e.target.value);
                    }}
                    ref={defaultValueRetailer}
                  />
                </div>

                {/* Data Sharing Group  */}
                <div className="radioBtnGroup">
                  <label className="label">Data Sharing : </label>
                  <input
                    type="checkbox"
                    className="formField__radio"
                    name="isDataSharing"
                    ref={defaultValueCheckBox}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDataSharing("Yes");
                      } else {
                        setDataSharing("No");
                      }
                    }}
                  />
                </div>
              </form>
            </div>

            {/* footerContainer  */}
            <div className="footerContainer">
              <button
                className="formSubmitBtn"
                type="submit"
                onClick={() => formik.handleSubmit()}
              >
                {btnType}
              </button>
              {/* <button
            className="formSubmitBtn"
            type="submit"
            onClick={() => formik.handleSubmit()}
          >
            {btnType} and Close
          </button> */}
            </div>

            {modal && (
              <Modal
                tableData={companyData}
                close={setModal}
                submitHandler={setSelectedCompanyName}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default CreateForm;
