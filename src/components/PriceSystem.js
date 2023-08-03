import { useState } from "react";
import { nanoid } from "nanoid";
import { checkOveLapAndNotInclude } from "../tools/tools";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PriceSetting from "./PriceSetting";

const AddPriceButton = styled(Button)({
  fontSize: "18px",
  color: "lightseagreen",
  padding: "30px 30px",
  alignSelf: "flex-start",
});

const Container = styled("div")({
  width: "1000px",
  padding: "20px",
  border: "1px dashed grey",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export default function PriceSystem() {
  const [priceData, setPriceData] = useState([
    {
      id: `setting-${nanoid()}`,
      ageInterval: [0, 0],
      fee: "",
    },
  ]);
  const selectedAge = priceData.reduce(
    (r, data) => r.push(data.ageInterval[0], data.ageInterval[1]) && r,
    []
  );
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

  function deleteSetting(id) {
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
        <PriceSetting
          key={data.id}
          id={data.id}
          i={i}
          ageInterval={data.ageInterval}
          fee={data.fee}
          overlapAge={oveLapAndNotInclude.overlap}
          selectedAge={selectedAge}
          deleteSetting={deleteSetting}
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
