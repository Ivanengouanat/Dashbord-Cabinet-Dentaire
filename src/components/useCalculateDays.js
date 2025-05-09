import { useEffect } from "react";

const useCalculateDays = (debut, fin, setFieldValue) => {
  useEffect(() => {
    if (debut && fin) {
      const debutDate = new Date(debut);
      const finDate = new Date(fin);
      const timeDiff = Math.abs(finDate - debutDate);
      const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // Ajoute +1 pour inclure le jour de début
      setFieldValue("nbrjour", diffDays);
    }
  }, [debut, fin, setFieldValue]);
};

export default useCalculateDays;
