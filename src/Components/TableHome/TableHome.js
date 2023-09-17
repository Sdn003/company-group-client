import React, { useEffect, useMemo, useState } from 'react'
import ModalSearch from '../ModalSearch/ModalSearch'
import './TableHome.css'
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import GlobalFilter from '../GlobalFilter';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import env from 'react-dotenv';
import { toast } from 'react-toastify';

function TableHome({
  tableData,
  reload,
  onSearch,
  compGrpId,
  compCgName,
  cgBusinessType,
  onReset,
}) {
  const [companyName, setCompanyName] = useState();
  const [country, setCountry] = useState();
  const pageSizeCount = [2, 5, 10, 25, 50, 75, 100];
  const TABLE_HOME_COLUMNS = [
    {
      Header: "Company Group Info",
      columns: [
        {
          Header: "ID",
          accessor: "companyGroupId",
        },
        {
          Header: "Company GroupName",
          accessor: "companyGroupName",
        },
        {
          Header: "Business Type",
          accessor: "businessType",
        },
        {
          Header: "Data Sharing",
          accessor: "isDataSharing",
        },
        {
          Header: "No. of Companies",
          accessor: "companyCount",
        },
      ],
    },

    {
      Header: "Action",
      columns: [
        {
          Header: "Edit",
          accessor: "edit",
          disableSortBy: true,
          disableFilters: true,
          Cell: ({ cell }) => {
            let companyGroupId = cell.row.original._id;
            return (
              <>
                <button
                  className="tableHome__action__btn"
                  onClick={() => {
                    navigate("/Edit/" + companyGroupId, {
                      state: {
                        cell: cell.row.original,
                      },
                    });
                  }}
                >
                  <i
                    className="bi bi-pencil-fill"
                    title="Delete"
                    id="tableHome__action__btn"
                  />
                </button>
              </>
            );
          },
        },
        {
          Header: "Delete",
          accessor: "delete",
          disableSortBy: true,
          disableFilters: true,
          Cell: ({ cell }) => {
            let companyGroupId = cell.row.original.companyGroupId;
            return (
              <>
                <button
                  className="tableHome__action__btn"
                  onClick={() => deleteCompanyGroup(companyGroupId)}
                >
                  <i
                    className="bi bi-trash-fill"
                    title="Delete"
                    id="tableHome__action__btn"
                  />
                </button>
              </>
            );
          },
        },
      ],
    },
  ];
  const columns = useMemo(() => TABLE_HOME_COLUMNS, []);
  const data = useMemo(() => tableData, []);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    state,
    setGlobalFilter,
    rows,
    prepareRow,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  //Deleting a Company Group
  async function deleteCompanyGroup(id) {
    try {
      setLoader(true)
      await axios.delete(env.API_URL + "DeleteCompanyGroup/" + id).then(
        (res) => {
          if(res.data.cgDeleteSuccess === true){
            toast.success(res.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
            setLoader(false);
            reload();
          }
          else if(res.data.cgDeleteSuccess === false){
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
          
        },
        (error) => {
          toast.error(error + "- Error Occurred", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          setLoader(false);
          setLoader(false);
        }
      );
    } catch (error) {
      setLoader(true);
       toast.error(error + "- Error Occurred", {
         position: toast.POSITION.TOP_CENTER,
         autoClose: 3000,
       });
      setLoader(false);
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
          <div className="homeWrapper">
            <div className="headerContainer" id="headerContainer">
              {/* <div
          className="backBtnContainer"
          // onClick={() => navigate("/" + { navigateTo })}
        >
          <i className="bi bi-arrow-left" />
        </div> */}
              <div className="headerContent">Company Groups</div>
              <div id="createBtn" className="createBtn">
                <button type="submit" onClick={() => navigate("/Create")}>
                  Create
                </button>
              </div>
            </div>

            <ModalSearch
              id={compGrpId}
              text={compCgName}
              selectOption={cgBusinessType}
              optionArr={["NA", "Manufacturer", "Retailer"]}
              search={onSearch}
              reset={onReset}
              className="mod"
            />

            {rows.length > 0 ? (
              <>
                {/* Table Pagination */}{" "}
                <div id="pagination" className="pagination">
                  {/* Page Number  */}
                  <span>
                    Page No.&nbsp;
                    {pageIndex + 1} of {pageOptions.length}
                  </span>{" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {/* Previous and Next Page Buttons  */}
                  <button
                    onClick={() => previousPage()}
                    title="Previous Page"
                    disabled={!canPreviousPage}
                    className="pagination__btn"
                  >
                    <b>
                      <i
                        className="bi bi-chevron-left"
                        style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                      />
                    </b>
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    title="Next Page"
                    className="pagination__btn"
                  >
                    <b>
                      <i
                        className="bi bi-chevron-right"
                        style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                      />
                    </b>
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {/* Items Per Page  */}
                  <span>
                    Items Per Page :&nbsp;&nbsp;
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                      }}
                    >
                      {pageSizeCount.map((pageSize, i) => {
                        return (
                          <option key={pageSize} value={pageSize}>
                            {pageSize}
                          </option>
                        );
                      })}
                    </select>
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </div>
              </>
            ) : null}

            {/* Content - Table  */}
            <div id="tableHome" className="tableHome">
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup, i) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                      {headerGroup.headers.map((column, i) => (
                        <th
                          id="tableHome__th"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          key={i}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <>
                                  <i className="bi bi-arrow-down" />
                                </>
                              ) : (
                                <i className="bi bi-arrow-up" />
                              )
                            ) : (
                              ""
                            )}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                {/* Table Body  */}
                <tbody {...getTableBodyProps()}>
                  {rows.length > 0 ? (
                    <>
                      {page.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()} key={i}>
                            {row.cells.map((cell) => (
                              <td id="tableHome__td" {...cell.getCellProps()}>
                                {cell.render("Cell")}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <p className="noRecordsFound">
                        <span style={{ margin: "0px", padding: "0px" }}>
                          No Record(s) Found
                        </span>
                      </p>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TableHome