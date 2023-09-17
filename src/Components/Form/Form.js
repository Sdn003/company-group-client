import React, {  useState } from "react";
import "./Form.css";
import Modal from "../Modal/Modal";

function Form({ type, btnType }) {
  //   const navigate = useNavigate();

  const [selectedCompanyName, setSelectedCompanyName] = useState([]);
  const [modal, setModal] = useState(false);
  const [render, setRender] = useState({ value: 10 });

  const data = [
    {
      id: "11",
      companyName: "CRED",
      country: "India",
      isChecked: false,
    },
    {
      id: "22",
      companyName: "CRED2",
      country: "India",
      isChecked: false,
    },
    {
      id: "33",
      companyName: "CRED3",
      country: "India",
      isChecked: false,
    },
    {
      id: "44",
      companyName: "CRED4",
      country: "India",
      isChecked: false,
    },
    {
      id: "11",
      companyName: "CRED",
      country: "India",
      isChecked: false,
    },
    {
      id: "22",
      companyName: "CRED2",
      country: "India",
      isChecked: false,
    },
    {
      id: "33",
      companyName: "CRED3",
      country: "India",
      isChecked: false,
    },
    {
      id: "44",
      companyName: "CRED4",
      country: "India",
      isChecked: false,
    },
    {
      id: "11",
      companyName: "CRED",
      country: "India",
      isChecked: false,
    },
    {
      id: "22",
      companyName: "CRED2",
      country: "India",
      isChecked: false,
    },
    {
      id: "33",
      companyName: "CRED3",
      country: "India",
      isChecked: false,
    },
    {
      id: "44",
      companyName: "CRED4",
      country: "India",
      isChecked: false,
    },
    {
      id: "11",
      companyName: "CRED",
      country: "India",
      isChecked: false,
    },
    {
      id: "22",
      companyName: "CRED2",
      country: "India",
      isChecked: false,
    },
    {
      id: "33",
      companyName: "CRED3",
      country: "India",
      isChecked: false,
    },
    {
      id: "44",
      companyName: "CRED4",
      country: "India",
      isChecked: false,
    },
    {
      id: "11",
      companyName: "CRED",
      country: "India",
      isChecked: false,
    },
    {
      id: "22",
      companyName: "CRED2",
      country: "India",
      isChecked: false,
    },
    {
      id: "33",
      companyName: "CRED3",
      country: "India",
      isChecked: false,
    },
    {
      id: "44",
      companyName: "CRED4",
      country: "India",
      isChecked: false,
    },
    {
      id: "11",
      companyName: "CRED",
      country: "India",
      isChecked: false,
    },
    {
      id: "22",
      companyName: "CRED2",
      country: "India",
      isChecked: false,
    },
    {
      id: "33",
      companyName: "CRED3",
      country: "India",
      isChecked: false,
    },
    {
      id: "44",
      companyName: "CRED4",
      country: "India",
      isChecked: false,
    },
  ];

  console.log(selectedCompanyName)
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
      <div id="formWrapper" className="formWrapper__class">
        {/* header Container  */}
        <div className="headerContainer">
          <div
            className="backBtnContainer"
            // onClick={() => navigate("/" + { navigateTo })}
          >
            <i className="bi bi-arrow-left" />
          </div>
          <div className="headerContent">{type} Group of Companies</div>
        </div>

        {/* Form Container  */}
        <div id="formContainer" className="formContainer__class">
          <form className="formField">
            {/* Company Group Name  */}
            <div className="label">Company Group Name*</div>
            <p>
              <input type="text" className="formField__input" />
            </p>
            {/* Company Group ID  */}
            <div className="label">Company Group ID*</div>
            <p>
              <input type="number" className="formField__input" />
            </p>

            {/* Company Name  */}
            <div className="labelCompanyName">
              Company Name*
              <div className="formBtnContainer">
                <div className="formBtn" onClick={() => setModal(true)}>
                  <i className="bi bi-plus" /> Add
                </div>
                <div className="formBtn">
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
                        <div key={i} className="companyNameContainer">
                          <div className="companyNameContent">
                            {val.original.companyName}
                          </div>
                          <div className="formBtn">
                            <i
                              className="bi bi-trash-fill"
                              title="Delete"
                              onClick={() => deleteOneCompany(i)}
                            />
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>

            {/* Manufacturer or Retailer */}
            <div className="radioBtnGroup">
              <label className="label">Manufacturer* : </label>
              <input type="radio" className="formField__radio" />
              <label className="label">Retailer* :</label>
              <input type="radio" className="formField__radio" />
            </div>

            {/* Data Sharing Group  */}
            {/* Manufacturer or Retailer */}
            <div className="radioBtnGroup">
              <label className="label">Data Sharing : </label>
              <input type="checkbox" className="formField__radio" />
            </div>
          </form>
        </div>

        {/* footerContainer  */}
        <div className="footerContainer">
          <button className="formSubmitBtn">{btnType}</button>
          <button className="formSubmitBtn">{btnType} and Close</button>
        </div>

        {modal && (
          <Modal
            tableData={data}
            close={setModal}
            submitHandler={setSelectedCompanyName}
          />
        )}
      </div>
    </>
  );
}

export default Form;
