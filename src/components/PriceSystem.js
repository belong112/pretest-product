import { useState } from "react";
import { checkOveLapAndNotInclude } from "../tools/tools";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PriceSetter from "./PriceSetter";

const AddPriceButton = styled(Button)({
  fontSize: "18px",
  alignSelf: "flex-start",
  color: "lightseagreen",
  padding: "30px 30px",

  "&:disable": {
    backgroundColor: "#cccccc",
    color: "#666666",
  },
});

const Container = styled("div")({
  padding: "20px",
  maxWidth: "1000px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  border: "1px dashed grey",
});

export default function PriceSystem() {
  const [priceData, setPriceData] = useState([1, 2]);
  const test = [[0, 11], [5, 8], [17, 20], [7], [4, 20]];
  const data = checkOveLapAndNotInclude(test);
  const isBtnDisable = data.notInclude.length === 0;

  function handleClick() {
    setPriceData([...priceData, priceData.length + 1]);
  }

  return (
    <Container>
      {priceData.map((x) => (
        <PriceSetter />
      ))}
      <AddPriceButton disable={isBtnDisable} onClick={handleClick}>
        + 新增價格設定
      </AddPriceButton>
    </Container>
  );
}
