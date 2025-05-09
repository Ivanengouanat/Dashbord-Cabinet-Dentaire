import React, { useState } from "react";
import { useTable } from "react-table";

const Table = ({ columns, data }) => {
  const [selectedCells, setSelectedCells] = useState({});

  const handleCellClick = (rowIndex, columnId) => {
    setSelectedCells((prevSelectedCells) => {
      const cellKey = `${rowIndex}-${columnId}`;
      return {
        ...prevSelectedCells,
        [cellKey]: !prevSelectedCells[cellKey],
      };
    });
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                const cellKey = `${rowIndex}-${cell.column.id}`;
                const isSelected = !!selectedCells[cellKey];

                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      cursor: "pointer",
                      backgroundColor: isSelected ? "#DFF0D8" : "transparent", // Couleur verte pour les cellules cochées
                    }}
                    onClick={() => handleCellClick(rowIndex, cell.column.id)}
                  >
                    {isSelected ? "✓" : ""}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const columns = React.useMemo(
  () => [
    {
      Header: "Employee",
      accessor: "employee",
    },
    {
      Header: "Day 1",
      accessor: "day1",
    },
    // Ajouter plus de colonnes pour chaque jour
  ],
  []
);

const data = React.useMemo(
  () => [
    {
      employee: "Albina Simonis",
      day1: "",
      // Ajouter des données pour chaque jour
    },
    // Ajouter plus d'employés
  ],
  []
);

function App() {
  return (
    <div>
      <h1>Employee Performance Table</h1>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
