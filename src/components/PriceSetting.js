import { useState } from "react";
import { checkIfOverlap, thousandSeparator } from "../tools/tools";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ageList = [];
for (let i = 0; i <= 20; i++) {
  ageList.push(i);
}

const PriceSetterBox = styled(Box)({
  width: "900px",
  margin: "20px",
  padding: "10px",
  borderBottom: "1px solid gray",
});

const PriceSettingTitle = styled("p")({
  fontSize: "18px",
  color: "#444",
});

const ErrorMessage = styled("div")({
  fontWeight: "bold",
  backgroundColor: "peachpuff",
  color: "orangered",
  padding: "5px 10px",
  borderRadius: "5px",
  textAlign: "left",
});

const SingleInput = styled("div")({
  width: "48%",
  padding: "10px 0px",
});

const GreyBox = styled("div")({
  fontSize: "12px",
  color: "#666",
  backgroundColor: "#eee",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "3px",
});

const Feehint = styled(Typography)({
  color: "grey",
  textAlign: "right",
});

const InputType = styled(Typography)({
  color: "grey",
  textAlign: "left",
});

const AgeInput = styled("select")({
  width: "50%",
  border: "1px solid #ccc",
  borderRadius: "3px",
});

const FeeInput = styled("input")({
  width: "100%",
  border: "1px solid #ccc",
  borderRadius: "3px",
});

export default function PriceSetting(props) {
  const [startAge, setStartAge] = useState(props.ageInterval[0]);
  const [endAge, setEndAge] = useState(props.ageInterval[1]);
  const [fee, setFee] = useState(props.fee);
  const isAgeError = checkIfOverlap(props.ageInterval, props.overlapAge);
  const isFeeError = fee === "";

  const handleFeeChange = (e) => {
    setFee(thousandSeparator(e.target.value));
    props.changeFee(props.id, e.target.value);
  };

  const handleStartAgeChange = (e) => {
    const newage = parseInt(e.target.value);
    setStartAge(newage);
    props.changeAgeInterval(props.id, [parseInt(newage), endAge]);
  };

  const handleEndAgeChange = (e) => {
    const newage = parseInt(e.target.value);
    setEndAge(newage);
    props.changeAgeInterval(props.id, [startAge, parseInt(newage)]);
  };

  return (
    <PriceSetterBox>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <PriceSettingTitle>價格設定 - {props.i + 1}</PriceSettingTitle>
        <Button
          variant="text"
          color="error"
          sx={{ fontSize: "18px" }}
          onClick={() => props.deleteSetting(props.id)}
        >
          移除
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <SingleInput>
          <InputType>年齡</InputType>
          <Box sx={{ display: "flex" }}>
            <AgeInput value={startAge} onChange={handleStartAgeChange}>
              {ageList.map((age) => (
                <option disabled={props.selectedAge.includes(age)} value={age}>
                  {age}
                </option>
              ))}
            </AgeInput>
            <GreyBox>~</GreyBox>
            <AgeInput value={endAge} onChange={handleEndAgeChange}>
              {ageList.map((age) => (
                <option disabled={props.selectedAge.includes(age)} value={age}>
                  {age}
                </option>
              ))}
            </AgeInput>
          </Box>
          {isAgeError && <ErrorMessage>年齡區間不可重疊</ErrorMessage>}
        </SingleInput>
        <SingleInput>
          <InputType>入住費用（每人每晚）</InputType>
          <Box sx={{ display: "flex" }}>
            <GreyBox>TWD</GreyBox>
            <FeeInput
              placeholder="請輸入費用"
              type="text"
              value={fee}
              onChange={handleFeeChange}
            />
          </Box>
          {isFeeError && <ErrorMessage>不可以為空白</ErrorMessage>}
          <Feehint>輸入 0 表示免費</Feehint>
        </SingleInput>
      </Box>
    </PriceSetterBox>
  );
}
