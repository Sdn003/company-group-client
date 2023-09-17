import React, { useEffect, useMemo, useState } from "react";
import "./Modal.css";
import { COLUMNS } from "../columns";
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import GlobalFilter from "../GlobalFilter";
import { Checkbox } from "../Checkbox";

function Modal({ tableData, close, submitHandler }) {

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => tableData, []);
  const pageSizeCount = [2, 5, 10, 25, 50, 75, 100];
  const [selectedCount, setSelectedCount] = useState();
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setSelectedCount(selectedFlatRows.length);
      
  },[])

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
    gotoPage,
    pageCount,
    state,
    setGlobalFilter,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );
    

    const { globalFilter, pageIndex, pageSize } = state;

  
      return (
        <>
          <div id="modalWrapper" className="modalWrapper">
            <div id="modalContainer" className="modalContainer">
              {/* Modal Header - cross Icon  */}
              <div id="modalHeader" className="modalHeader">
                <h3>Select to Add Companies</h3>
                <GlobalFilter
                  filter={globalFilter}
                  setFilter={setGlobalFilter}
                />

                <span className="crossIcon" onClick={() => close(false)}>
                  &times;
                </span>
              </div>

              {/* Modal Pagination */}
              {rows.length > 0 ? (
                <>
                  {" "}
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
                    {/* Go to Particular Page  */}
                    {/* <span>
              <input
                style={{wi}}
                type="number"
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
              />
            </span> */}
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
                    {/* First Page & Last Page  */}
                    {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
               First Page
            </button> */}
                    {/* <button
              onClick={() => {
                gotoPage(pageCount - 1);
              }}
              disabled={!canNextPage}
            >
                Last Page
            </button> */}
                  </div>
                </>
              ) : (
                <></>
              )}

              {/* Modal Content -Table  */}
              <div id="modalTable" className="modalTable">
                <table {...getTableProps()}>
                  <thead>
                    {headerGroups.map((headerGroup, i) => (
                      <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                        {headerGroup.headers.map((column, i) => (
                          <th
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
                  <tbody {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                      <>
                        {page.map((row, i) => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()} key={i}>
                              {row.cells.map((cell) => (
                                <td {...cell.getCellProps()}>
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

              {/* Modal Footer - Add Selection Button  */}
              {rows.length > 0 ? (
                <>
                  <div id="addSelectionBtn" className="addSelectionBtn">
                    <button
                      onClick={() => {
                        if (selectedFlatRows) {
                          let newSelectedFlatRow = selectedFlatRows.map(
                            (val) => val.original
                          );
                          setSelectedRows(newSelectedFlatRow);
                          console.log(newSelectedFlatRow);
                          submitHandler(newSelectedFlatRow);
                          close(false);
                        }
                        
                      }}
                    >
                      Add Selection
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      );
}

export default Modal;
