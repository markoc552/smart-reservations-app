import React, { useState, useMemo, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Popup } from "semantic-ui-react";
import "react-datepicker/dist/react-datepicker.css";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import { FormattedMessage } from "react-intl";
import Axios from "axios";
import { useSelector } from "react-redux";
import "../../index.css";
import { StyledTable } from "../util/RestaurantStyledComponents";

const BookingsTable = (props) => {
  const [dataToRender, setDataToRender] = useState([]);

  const data = useMemo(() => [...dataToRender], [dataToRender]);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    Axios.get(
      `${window.ENVIRONMENT.BACKEND_SERVICE}/v1/restaurants/getBookings`,
      {
        params: {
          restaurantName: props.restaurant.name,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((result) => {
        setDataToRender(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: (
          <FormattedMessage id="wault.table.time" defaultMessage="Lastname" />
        ),
        accessor: "lastname",
      },
      {
        Header: (
          <FormattedMessage id="wault.table.reason" defaultMessage="Date" />
        ),
        accessor: "date",
      },
      {
        Header: (
          <FormattedMessage id="wault.table.time" defaultMessage="Time" />
        ),
        accessor: "time",
      },
      {
        Header: (
          <FormattedMessage id="wault.table.time" defaultMessage="People" />
        ),
        accessor: "people",
      },
      {
        Header: (
          <FormattedMessage id="wault.actions" defaultMessage="Actions" />
        ),
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <Popup
              content={row.original.request}
              on="click"
              pinned
              position="right center"
              trigger={
                <Button basic color="blue" size="mini">
                  <FormattedMessage
                    id="wault.actions.deposit"
                    defaultMessage="Details"
                  />
                </Button>
              }
            />
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
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
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr style={{ margin: "0.5vh 0" }} {...row.getRowProps()}>
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
    <Modal show={props.show} onHide={() => props.setShow(false)} size="xl">
      <Modal.Header closeButton>
        <Modal.Title style={{ fontFamily: "'Arvo', serif" }}>
          Bookings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontFamily: "'Arvo', serif" }}>
        {renderStyledTable()}
      </Modal.Body>
    </Modal>
  );
};

export default BookingsTable;
