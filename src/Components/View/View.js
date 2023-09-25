import React, { useEffect, useState } from 'react';
import './View.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import businessImage from './business_animation.jpg'
import env from 'react-dotenv';

function View() {

    const params = useParams();
    const [loader, setLoader] = useState(false);
    const [company, setCompany] = useState([]);
    
    const [cgData, setCgData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, [])

    async function getData(){
        try {
            setLoader(true);
             await axios
               .get(env.API_URL + "CompanyGroup/" + params.id)
               .then((res) => {
                 setCgData(res.data.companyGroup);
                 setCompany(res.data.companyGroup.selectedCompanyName);
                 console.log(res.data.companyGroup.selectedCompanyName);
                 setLoader(false);
               })
               .catch((err) => {
                console.log(err);
                setLoader(false);
            });
        } catch (error) {
            console.log(error);

        }
      
    }
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
          <section id="view">
            <div className="headerContainer">
              <div className="backBtnContainer" onClick={() => navigate("/")}>
                <i className="bi bi-arrow-left" />
              </div>
              <div className="headerContent">
                Company Group Details
              </div>
            </div>
            <div className="view_container">
              <div className="view_wrapper">
                <div className="view__text_content">
                  <h2>Company Group Name:</h2>
                  <p>{cgData.companyGroupName}</p>
                  <h2>Companies:</h2>
                  {company &&
                    company.map((company) => {
                      return (
                        <>
                          <p>
                            {company.companyName} - {company.country}
                          </p>
                        </>
                      );
                    })}
                  <h2>Business Type:</h2>
                  <p>{cgData.businessType}</p>
                  <h2>Data Sharing:</h2>
                  <p>{cgData.isDataSharing}</p>
                </div>
                <div className="view__image_content">
                  <img src={businessImage} alt="cg_image" />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
   
}

export default View