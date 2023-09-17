import Delete from "./Delete";

export const COLUMNS = [
    {
        Header : 'ID',
        accessor : 'id'
    },
    {
        Header : "Company Name",
        accessor : 'companyName'
    },
    {
        Header:"Country",
        accessor : 'country'
    }
]

export const TABLE_HOME_COLUMNS = [
  {
    Header: "Company Group Info",
    columns: [
      {
        Header: "ID",
        accessor: "id",
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
        disableFilters : true,
        Cell: ({ cell }) => {
          return (
            <>
              <button className="tableHome__action__btn">
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
        disableFilters : true,
        Cell: ({ cell }) => {
          return (
            <>
              <button className="tableHome__action__btn">
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