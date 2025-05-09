import { ResponsiveLine } from "@nivo/line"; // ResponsiveLine : Un composant de la bibliothèque Nivo pour créer des graphiques en ligne réactifs.

import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const LineChart = ({
  isCustomLineColors = false,
  isDashboard = false,
  ListProduits,
  ListMateriels,
}) => {
  // ({ isCustomLineColors = false, isDashboard = false }) : Utilise la destructuration pour extraire les propriétés isCustomLineColors et isDashboard des props, avec des valeurs par défaut de false.
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const transformDataForLineChart = (ListMateriels) => {
    // Tableau des mois pour référence

    if (!ListMateriels || ListMateriels.length === 0) {
      console.warn("Le tableau ListMateriels est vide.");
      return []; // Retourne une structure vide pour éviter les erreurs
    }

    const months = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];

    // Transformation des données
    return ListMateriels.map((materiel) => ({
      id: materiel.noms, // Nom du matériel
      data: months.map((mois, index) => {
        // Extraire le mois à partir de la date de l'objet ListMateriels
        const materielMois = new Date(materiel.date)
          .toLocaleString("fr-FR", {
            month: "long",
          })
          .toLowerCase();

        // Si le mois correspond, retourne la quantité
        return {
          x: mois, // Mois sur l'axe X
          y: materielMois === mois ? materiel.quantite : 0, // Quantité associée ou 0
        };
      }),
    }));
  };

  const data = transformDataForLineChart(ListMateriels);

  if (!data || data.length === 0) {
    return (
      <div
        style={{
          position: "relative",
          top: isDashboard ? 40 : 10,
          left: isDashboard ? 40 : 10,
        }}
      >
        Aucune donnée disponible pour le graphique.
      </div>
    );
  }

  return (
    <ResponsiveLine
      data={data}
      theme={{
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
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
