import React, { useState, useMemo, useEffect } from "react";
import { Headline, StyledTable, ComponentSideWidgetMenu } from "../util/RestaurantStyledComponents";
import { Button, Input } from "semantic-ui-react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { FormattedMessage } from "react-intl";
import Axios from "axios";
import RestaurantModal from "./RestaurantModal";
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

const UpdateRestaurants = () => {
  const [dataToRender, setDataToRender] = useState([]);
  const [selectedRowData, setRowData] = useState({});
  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState();

  const { addToast } = useToasts();

  const data = useMemo(() => [...dataToRender], [dataToRender]);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getAllRestaurants = async () => {
      const result = await Axios.get(
        `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/restaurants/getAllRestaurants`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataToRender(result.data);
    };
    getAllRestaurants();
  }, []);

  const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
    const [value, setValue] = useState(globalFilter);

    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
      setLoading(false);
    }, 500);

    const [loading, setLoading] = useState(false);

    return (
      <Input
        loading={loading}
        placeholder="Search..."
        style={{ marginLeft: "2vw", width: "12vw" }}
        value={value}
        onChange={(e) => {
          setLoading(true);
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    );
  };

  const deleteRestaurant = (row) => {
    Axios.post(
      `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/restaurants/deleteRestaurant`,
      { ...row.original },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(() => {
        Axios.get(
          `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/restaurant/getAllRestaurants`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((res) => {
            setDataToRender(res.data);
            setDeleting(false);
            addToast("Restaurant deleted successfully!", {
              appearance: "success",
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const columns = useMemo(
    () => [
      {
        Header: (
          <FormattedMessage id="wault.table.reason" defaultMessage="Name" />
        ),
        accessor: "name",
      },
      {
        Header: (
          <FormattedMessage id="wault.table.time" defaultMessage="Address" />
        ),
        accessor: "address",
      },
      {
        Header: (
          <FormattedMessage id="wault.actions" defaultMessage="Actions" />
        ),
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <Button.Group>
              <Button
                basic
                color="blue"
                size="mini"
                onClick={() => {
                  setShow(true);
                  setRowData(row.original);
                }}
              >
                <FormattedMessage
                  id="wault.actions.deposit"
                  defaultMessage="Update"
                />
              </Button>
              <Button
                basic
                color="red"
                size="mini"
                loading={deleting}
                onClick={() => {
                  setDeleting(true);
                  setTimeout(() => {
                    deleteRestaurant(row);
                  }, 3000);
                }}
              >
                <FormattedMessage
                  id="wault.actions.withdraw"
                  defaultMessage="Delete"
                />
              </Button>
            </Button.Group>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter
  );

  const renderStyledTable = () => {
    return (
      <StyledTable>
        <table
          {...getTableProps()}
          style={{
            width: "55vw",
            height: "15vh",
            borderCollapse: "collapse",
            marginLeft: "2vw",
            marginTop: "4vh",
            fontSize: "15px",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </StyledTable>
    );
  };

  return (
    <ComponentSideWidgetMenu>
      <Headline>Update existing restaurants</Headline>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      {renderStyledTable()}
      {show && (
        <RestaurantModal
          show={show}
          setShow={setShow}
          submitting={deleting}
          isSubmitting={setDeleting}
          selectedRow={selectedRowData}
          setDataToRender={setDataToRender}
        />
      )}
    </ComponentSideWidgetMenu>
  );
};

export default UpdateRestaurants;
