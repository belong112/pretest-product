import { useState } from "react";
import { checkOveLapAndNotInclude, thousandSeparator } from "../tools/tools";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ageList = [];
for (let i = 0; i <= 20; i++) {
  ageList.push({ value: i, label: i.toString() });
}

const PriceSetterBox = styled(Box)({
  borderBottom: "1px solid gray",
  width: "900px",
  margin: "20px",
  padding: "10px",
});

const PriceSettingTitle = styled("p")({
  fontSize: "18px",
  color: "#444",
});

const ErrorMessage = styled("div")({
  backgroundColor: "peachpuff",
  color: "orangered",
  padding: "5px 10px",
  borderRadius: "5px",
  textAlign: "left",
  fontWeight: "bold",
});

const SingleInput = styled("div")({
  width: "48%",
  padding: "10px 0px",
});

const GreyBox = styled("div")({
  color: "#666",
  backgroundColor: "#eee",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "3px",
  fontSize: "12px",
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

export default function PriceSetter() {
  const [startAge, setStartAge] = useState(0);
  const [endAge, setEndAge] = useState(20);
  const [fee, setFee] = useState("");
  const isAgeError = true;
  const isFeeError = fee === "";

  const handleFeeChange = (e) => {
    setFee(thousandSeparator(e.target.value));
  };

  const handleStartAgeChange = (e) => {
    setStartAge(e.target.value);
  };

  const handleEndAgeChange = (e) => {
    setEndAge(e.target.value);
  };

  return (
    <PriceSetterBox>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <PriceSettingTitle>價格設定 - id</PriceSettingTitle>
        <Button variant="text" color="error" sx={{ fontSize: "18px" }}>
          移除
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <SingleInput>
          <InputType>年齡</InputType>
          <Box sx={{ display: "flex" }}>
            <AgeInput
              defaultValue={startAge}
              value={startAge}
              onChange={handleStartAgeChange}
            >
              {ageList.map((item) => (
                <option value={item.value}>{item.label}</option>
              ))}
            </AgeInput>
            <GreyBox>~</GreyBox>
            <AgeInput
              defaultValue={endAge}
              value={endAge}
              onChange={handleEndAgeChange}
            >
              {ageList.map((item) => (
                <option value={item.value}>{item.label}</option>
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
              placeholder="  請輸入費用"
              type="text"
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
