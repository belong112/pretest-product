import { useState } from "react";
import { nanoid } from "nanoid";
import { checkOveLapAndNotInclude, checkIfOverlap } from "../tools/tools";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PriceSetter from "./PriceSetter";

const AddPriceButton = styled(Button)({
  fontSize: "18px",
  alignSelf: "flex-start",
  color: "lightseagreen",
  padding: "30px 30px",
});

const Container = styled("div")({
  padding: "20px",
  width: "1000px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  border: "1px dashed grey",
});

export default function PriceSystem() {
  const [priceData, setPriceData] = useState([
    {
      id: `setting-${nanoid()}`,
      ageInterval: [0, 0],
      fee: "",
    },
  ]);
  const ageIntervalList = priceData.map((data) => data.ageInterval);
  const oveLapAndNotInclude = checkOveLapAndNotInclude(ageIntervalList);
  const isAddBtnDisable = oveLapAndNotInclude.notInclude.length === 0;

  function handleClick() {
    setPriceData([
      ...priceData,
      {
        id: `setting-${nanoid()}`,
        ageInterval: [0, 0],
        fee: "",
      },
    ]);
  }

  function deleteSetter(id) {
    const remainingData = priceData.filter((data) => id !== data.id);
    setPriceData(remainingData);
  }

  function changeFee(id, newFee) {
    const newData = priceData.map((data) =>
      id === data.id
        ? {
            ...data,
            fee: newFee,
          }
        : data
    );
    setPriceData(newData);
  }

  function changeAgeInterval(id, newAgeInterval) {
    const newData = priceData.map((data) =>
      id === data.id
        ? {
            ...data,
            ageInterval: newAgeInterval,
          }
        : data
    );
    setPriceData(newData);
  }

  return (
    <Container>
      {priceData.map((data, i) => (
        <PriceSetter
          key={data.id}
          i={i}
          id={data.id}
          ageInterval={data.ageInterval}
          fee={data.fee}
          isAgeError={data.isAgeError}
          overlapAge={oveLapAndNotInclude.overlap}
          deleteSetter={deleteSetter}
          changeFee={changeFee}
          changeAgeInterval={changeAgeInterval}
        />
      ))}
      <AddPriceButton disabled={isAddBtnDisable} onClick={handleClick}>
        + 新增價格設定
      </AddPriceButton>
    </Container>
  );
}
