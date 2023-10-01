import React from "react";
import { Table } from "@mantine/core";
const DataTable = ({ data }) => {
  const rows = data?.data?.map((element, i) => (
    <tr key={element.id}>
      <td>{element.id}</td>
      <td>{element.staff}</td>
      <td>{element.voucher_number}</td>
      <td>{element.tax}</td>
      <td>{element.total} </td>
      <td>{element.item_quantity}</td>
      <td>{element.net_total} kyats</td>
      <td>{element.time?.split(" ")[0]}</td>
      <td>{element.time?.split(" ")[1]}</td>
    </tr>
  ));
  const head = {};
  return (
    <Table withBorder highlightOnHover>
      <thead>
        <tr>
          <th>No</th>
          <th>Sale Person</th>
          <th>Voucher</th>
          <th>Tax</th>
          <th>Cash</th>
          <th>Count</th>

          <th>Total</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default DataTable;
