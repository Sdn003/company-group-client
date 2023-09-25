import React, { Fragment, useEffect, useRef, useState } from "react";
import "./Form.css";
import Modal from "../Modal/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import env from "react-dotenv";
import { toast } from "react-toastify";

function EditForm({ btnType, headerType }) {
  const navigate = useNavigate();

  const [selectCompanyName, setSelectedCompanyName] = useState([]);
  const [modal, setModal] = useState(false);
  const [render, setRender] = useState({ value: 10 });
  const [dataSharing, setDataSharing] = useState();
  const [bType, setBType] = useState("");
  const defaultValueManufacturer = useRef();
  const defaultValueRetailer = useRef();
  const defaultValueCheckBox = useRef();
  const [companyData, setCompanyData] = useState();
  const location = useLocation();
  let { companyGroupName, companyGroupId, businessType, isDataSharing, selectedCompanyName} = location.state.cell;
  const params = useParams();
  const [loader, setLoader] = useState(false);
  const [manufact, setManufact] = useState();
  const [retail, setRetail] = useState();
  const [ds, setDs] = useState();

    useEffect(() => {
       if (businessType === "Retailer") {
        //  defaultValueRetailer.current.checked = true;
         setBType("Retailer");
         setRetail(true)
       } else if (businessType === "Manufacturer") {
        //  defaultValueManufacturer.current.checked = true;
         setBType("Manufacturer");
         setManufact(true)
       }
       else if(businessType === "NA"){
         setBType("NA");
       }

       if (isDataSharing === "Yes") {
        //  defaultValueCheckBox.current.checked = true;
         setDataSharing("Yes");
         setDs(true);
       } else if (isDataSharing === "No") {
        //  defaultValueCheckBox.current.checked = false;
         setDataSharing("No");
         setDs(false)
       }
        if (selectedCompanyName.length > 0) {
          setSelectedCompanyName(selectedCompanyName);
        }
        getCompanyData();
    }, []);


  //Getting the Company data and passing it to Modal
  const getCompanyData = async () => {
    try {
      setLoader(true);
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


  //Setting Initial values for the form
  const initialValues = {
    companyGroupName: companyGroupName,
    companyGroupId: companyGroupId,
  };

  const validationSchema = Yup.object({
    companyGroupName: Yup.string().required("Required"),
    companyGroupId: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      setLoader(true);
      let updatedGroup = {
        companyGroupName: values.companyGroupName,
        companyGroupId: values.companyGroupId,
        businessType: bType,
        isDataSharing: dataSharing,
        selectedCompanyName: selectCompanyName,
        companyCount: selectCompanyName.length,
      };

      await axios
        .put(env.API_URL + "EditCompanyGroup/" + params.id, updatedGroup)
        .then((res) => {

          if(res.data.cgEditSuccess === true){
            toast.success(res.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
            setLoader(false);
            navigate("/");
          }
          else if(res.data.cgEditSuccess === false){
            toast.error(res.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
            setLoader(false);
          }
          else{
            toast.error(res.data.error, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
            setLoader(false);
          }
          
        })
        .catch((err) => {
          toast.error('Error Occurred', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
            setLoader(false);
        });
    } catch (error) {
      setLoader(true);
       toast.error("Error Occurred", {
         position: toast.POSITION.TOP_CENTER,
         autoClose: 3000,
       });
       setLoader(false);
      setLoader(false);
    }
  };


  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const deleteOneCompany = (i) => {
    let tbdCompany = selectCompanyName[i];
    selectCompanyName.filter((val, i) => {
      if (val.id === tbdCompany.id) {
        selectCompanyName.splice(i, 1);
      }
    });
    setSelectedCompanyName(selectCompanyName);
    setRender((prev) => {
      return { ...prev };
    });
    console.log(selectCompanyName);
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
                    <div
                      style={{ color: "crimson", fontSize: "12px" }}
                      className="validatorText"
                    >
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
                    <div
                      style={{ color: "crimson", fontSize: "12px" }}
                      className="validatorText"
                    >
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
                    {selectCompanyName &&
                      selectCompanyName.map((val, i) => {
                        return (
                          <Fragment key={i}>
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
                          </Fragment>
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
                      setBType("NA");
                    }}
                  >
                    Manufacturer :{" "}
                  </label>
                  <input
                    type="radio"
                    className="formField__radio"
                    name="businessType"
                    value="Manufacturer"
                    checked={manufact}
                    onChange={(e) => {
                      setBType(e.target.value);
                      setManufact((prev) => !prev);
                    }}
                    ref={defaultValueManufacturer}
                  />
                  <label
                    className="label"
                    onClick={() => {
                      defaultValueRetailer.current.checked = false;
                      setBType("NA");
                    }}
                  >
                    Retailer :
                  </label>
                  <input
                    type="radio"
                    className="formField__radio"
                    name="businessType"
                    value="Retailer"
                    checked={retail}
                    onChange={(e) => {
                      // console.log(e.target.value)
                      setBType(e.target.value);
                      setRetail((prev) => !prev);
                    }}
                    ref={defaultValueRetailer}
                  />
                </div>

                {/* Data Sharing Group  */}
                <div className="radioBtnGroup">
                  <label className="label">Data Sharing : </label>
                  <input
                    type="checkbox"
                    id="formField__checkbox"
                    className="formField__radio"
                    name="isDataSharing"
                    ref={defaultValueCheckBox}
                    checked={ds}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDataSharing("Yes");
                        setDs(true);
                      } else if (e.target.checked === false) {
                        setDataSharing("No");
                        setDs(false);
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

export default EditForm;
