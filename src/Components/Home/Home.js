import React, { useEffect, useState } from 'react'
import TableHome from '../TableHome/TableHome'
import axios from 'axios';
import env from 'react-dotenv';

function Home() {
  const [tableData, setTableData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState();
  const [cgId, setCgId] = useState("");
  const [cgName, setCgName] = useState("");
  const [businessType, setBusinessType] = useState()

  const getTableData = async () => {
    try {
      setLoader(true);
      await axios.get(env.API_URL + "AllCompanyGroup").then(
        (res) => {
          setCgId("");
          setCgName("");
          setBusinessType("")
          setTableData(res.data.companyGroup);
          setLoader(false);
        },
        (error) => {
          setError(error);
          setLoader(false);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);

  //Search Handling
  async function searchHandler(e, cgId, cgName, businessType) {
    e.preventDefault();
    try {
      if (cgId && cgName && businessType) {
        setLoader(true);
        await axios
          .get(
            env.API_URL +
              "AllCompanyGroup/?companyGroupId=" +
              cgId +
              "&companyGroupName=" +
              cgName +
              "&businessType=" +
              businessType
          )
          .then(
            (res) => {
              setTableData(res.data.companyGroup);
              setLoader(false);
              setCgId("");
              setCgName("");
            },
            (error) => {
              setError(error);
              setLoader(false);
            }
          );
      } else if (cgName && cgId) {
        setLoader(true);
        await axios
          .get(
            env.API_URL +
              "AllCompanyGroup/?companyGroupName=" +
              cgName +
              "&companyGroupId=" +
              cgId
          )
          .then(
            (res) => {
              setTableData(res.data.companyGroup);
              setLoader(false);
              setCgId("");
              setCgName("");
            },
            (error) => {
              setError(error);
              setLoader(false);
            }
          );
      } else if (cgName && businessType) {
        setLoader(true);
        await axios
          .get(
            env.API_URL +
              "AllCompanyGroup/?companyGroupName=" +
              cgName +
              "&businessType=" +
              businessType
          )
          .then(
            (res) => {
              setTableData(res.data.companyGroup);
              setLoader(false);
              setCgId("");
              setCgName("");
            },
            (error) => {
              setError(error);
              setLoader(false);
            }
          );
      } else if (businessType && cgId) {
        setLoader(true);
        await axios
          .get(
            env.API_URL +
              "AllCompanyGroup/?businessType=" +
              businessType +
              "&companyGroupId=" +
              cgId
          )
          .then(
            (res) => {
              setTableData(res.data.companyGroup);
              setLoader(false);
              setCgId("");
              setCgName("");
            },
            (error) => {
              setError(error);
              setLoader(false);
            }
          );
      } else if (cgId) {
        setLoader(true);
        await axios
          .get(env.API_URL + "AllCompanyGroup/?companyGroupId=" + cgId)
          .then(
            (res) => {
              setTableData(res.data.companyGroup);
              setLoader(false);
              setCgId("");
              setCgName("");
            },
            (error) => {
              setError(error);
              setLoader(false);
            }
          );
      } else if (cgName) {
        setLoader(true);
        await axios
          .get(env.API_URL + "AllCompanyGroup/?companyGroupName=" + cgName)
          .then(
            (res) => {
              setTableData(res.data.companyGroup);
              setLoader(false);
              setCgId("");
              setCgName("");
            },
            (error) => {
              setError(error);
              setLoader(false);
            }
          );
      } else if (businessType) {
        setLoader(true);
        await axios
          .get(env.API_URL + "AllCompanyGroup/?businessType=" + businessType)
          .then(
            (res) => {
              setTableData(res.data.companyGroup);
              setLoader(false);
              setCgId("");
              setCgName("");
            },
            (error) => {
              setError(error);
              setLoader(false);
            }
          );
      }
    } catch (error) {
      console.log(error);
    }
  }


 

  if (error) {
    return (
      <>
        <div>Error Occurred</div>
      </>
    );
  } else if (loader) {
    return (
      <>
        <div className="loaderDiv">
          <span className="loader"></span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <TableHome
          tableData={tableData}
          reload={getTableData}
          onSearch={(e) => {
            searchHandler(e, cgId, cgName, businessType);
          }}
          compGrpId={setCgId}
          compCgName={setCgName}
          onReset={getTableData}
          cgBusinessType={setBusinessType}
        />
      </>
    );
  }
}

export default Home