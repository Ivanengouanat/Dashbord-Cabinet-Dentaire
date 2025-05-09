import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";

const Piechar = ({
  ListPatient = [],
  ListPersonnels = [],
  ListAccount = [],
  ListDate = [],
  isDashbord = false,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State pour les données
  const [data, setData] = useState([]); // État des données

  useEffect(() => {
    // Mise à jour des données lorsque les listes changent
    setData([
      {
        id: "Patients",
        label: "Patients",
        value: ListPatient.length,
        color: "hsl(210, 70%, 50%)", // Couleur personnalisée
      },
      {
        id: "Personnels",
        label: "Personnels",
        value: ListPersonnels.length,
        color: "hsl(120, 70%, 50%)",
      },
      {
        id: "Rendez-vous",
        label: "Rendez-vous",
        value: ListDate.length,
        color: "hsl(60, 70%, 50%)",
      },
      {
        id: "Comptes",
        label: "Comptes",
        value: ListAccount.length,
        color: "hsl(330, 70%, 50%)",
      },
    ]);
  }, [ListPatient, ListPersonnels, ListAccount, ListDate]); // Déclenche chaque fois que l'un des tableaux changeconsole.log("Data mise à jour :", data);

  console.log("valeur Dashbord", isDashbord);
  return (
    <ResponsivePie
      data={data}
      theme={{
        /* theme : Personnalise l'apparence du graphique.
                  Axe, légendes, et ticks sont stylisés avec les couleurs du thème. */
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      margin={
        isDashbord
          ? { top: 40, right: 80, bottom: 80, left: 80 }
          : { top: 20, bottom: 20, left: -60 }
      }
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.greenAccent[400]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: colors.greenAccent[400],
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "ruby",
          },
          id: "dots",
        },
        {
          match: {
            id: "c",
          },
          id: "dots",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: isDashbord ? "bottom" : "right",
          direction: isDashbord ? "row" : "column",
          justify: false,
          translateX: isDashbord ? 0 : 1,
          translateY: isDashbord ? 1 : 0,
          itemsSpacing: isDashbord ? 2 : 10,
          itemWidth: isDashbord ? 50 : 100,
          itemHeight: isDashbord ? 12 : 18,
          itemTextColor: colors.grey[100],
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: isDashbord === false ? 10 : 15,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default Piechar;
