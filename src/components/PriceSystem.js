import { checkOveLapAndNotInclude } from "../tools/tools";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PriceSetter from "./PriceSetter";

const AddPriceButton = styled(Button)({
  fontSize: "20px",
  alignSelf: "flex-start",
  color: "#07da85",
  padding: "30px 30px",

  "&:disable": {
    backgroundColor: "#cccccc",
    color: "#666666",
  },
});

const Container = styled("div")({
  margin: "50px",
  padding: "20px",
  maxWidth: "1000px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  border: "1px dashed grey",
});

function handleClick() {
  console.log("you click the btn!");
}

export default function PriceSystem() {
  const test = [[6, 11], [5, 8], [17, 20], [7], [14, 17]];
  const data = checkOveLapAndNotInclude(test);
  console.log(data);
  return (
    <Container>
      <PriceSetter />
      <PriceSetter />
      {data.notInclude.length !== 0 && (
        <AddPriceButton onClick={handleClick}>+ 新增價格設定</AddPriceButton>
      )}
    </Container>
  );
}
