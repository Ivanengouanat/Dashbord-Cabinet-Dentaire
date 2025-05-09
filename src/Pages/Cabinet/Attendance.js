import { Box, useTheme } from "@mui/material";
import Headers from "../../components/Headers";
import { useState } from "react";
import { tokens } from "../../theme";
import * as React from "react"; // librairie de base de React.
import { useTable } from "react-table"; // useTable : Un hook fourni par react-table pour créer et gérer des tableaux.

const Attendance = ({ columns, data }) => {
  const [selectedCells, setSelectedCells] = useState({}); // selectedCells : Un état local qui stocke les cellules sélectionnées. Chaque cellule est représentée par une clé unique (rowIndex-columnId).

  const handleCellClick = (rowIndex, columnId) => {
    setSelectedCells((prevSelectedCells) => {
      // appelle la fonction setSelectedCells pour mettre à jour l'état selectedCells. Elle utilise la version précédente de l'état (prevSelectedCells) pour calculer le nouvel état.
      const cellKey = `${rowIndex}-${columnId}`; // crée une clé unique pour identifier la cellule cliquée. La clé est une chaîne de caractères composée de l'index de la ligne (rowIndex) et de l'ID de la colonne (columnId), séparés par un tiret.
      return {
        ...prevSelectedCells, // Cette ligne commence à créer le nouvel objet d'état. Elle utilise l'opérateur de décomposition (...) pour copier toutes les paires clé-valeur de l'état précédent (prevSelectedCells) dans le nouvel objet.
        [cellKey]: !prevSelectedCells[cellKey], // Cette ligne ajoute une nouvelle paire clé-valeur à l'objet d'état. La clé est cellKey, et la valeur est l'inverse de la valeur précédente pour cette clé dans prevSelectedCells. Si la cellule était sélectionnée (valeur true), elle sera désélectionnée (false), et vice versa.
      };
    });
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Headers title="Atendance" subtitle="list Attendance" />

      <Box m="20px">
        <table {...getTableProps()}>
          {" "}
          {/* La balise <table> crée un tableau HTML. getTableProps() est une fonction fournie par useTable de react-table, qui injecte les props nécessaires pour configurer le tableau. */}
          <thead>
            {" "}
            {/* La balise <thead> contient les en-têtes du tableau. headerGroups est une collection d'en-têtes de react-table. map itère sur chaque groupe d'en-têtes pour créer une ligne (<tr>), avec les props nécessaires (getHeaderGroupProps()).*/}
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(
                  (
                    column // headers dans headerGroup contient chaque colonne d'en-tête. map itère sur chaque colonne pour créer une cellule d'en-tête (<th>), avec les props nécessaires (getHeaderProps()). column.render("Header") affiche le contenu de l'en-tête de la colonne.
                  ) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  )
                )}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {" "}
            {/* La balise <tbody> contient les lignes de données du tableau. rows est une collection de lignes de react-table. map itère sur chaque ligne pour créer une ligne de tableau (<tr>), avec les props nécessaires (getRowProps()). prepareRow(row) est une fonction de react-table qui prépare la ligne pour le rendu. */}
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    // cells dans row contient chaque cellule de données. map itère sur chaque cellule pour créer une cellule de tableau (<td>), avec les props nécessaires (getCellProps()). cellKey est une clé unique pour la cellule basée sur rowIndex et cell.column.id. isSelected détermine si la cellule est sélectionnée. Le style de la cellule change en fonction de isSelected. onClick appelle handleCellClick pour cocher ou décocher la cellule lorsque l'on clique dessus. Si isSelected est vrai, un "✓" est affiché dans la cellule.
                    const cellKey = `${rowIndex}-${cell.column.id}`;
                    const isSelected = !!selectedCells[cellKey];

                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          cursor: "pointer",
                          backgroundColor: isSelected
                            ? colors.primary[400]
                            : "transparent",
                        }}
                        onClick={() =>
                          handleCellClick(rowIndex, cell.column.id)
                        }
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
      </Box>
    </Box>
  );
};

export default Attendance;
