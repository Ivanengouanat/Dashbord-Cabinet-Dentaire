import { useState, useEffect } from "react";

const useIncrease = (DataArray, max) => {
  const [lastIncrease, setLastIncrease] = useState(0); // Augmentation en pourcentage
  console.log("valeur du max", max);

  useEffect(() => {
    // Calcul de l'augmentation en pourcentage

    const currentLength = DataArray.length; // Taille actuelle
    const increasePercentage = (currentLength / max) * 100;

    // Si previousLength est 0, définissez simplement à 100%
    setLastIncrease(currentLength > 0 ? increasePercentage.toFixed(2) : 0);
  }, [DataArray]);

  return lastIncrease;
};

export default useIncrease;
