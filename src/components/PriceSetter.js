import { useState } from "react";
import { checkOveLapAndNotInclude, thousandSeparator } from "../tools/tools";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ageList = [];
for (let i = 0; i <= 20; i++) {
  ageList.push({ value: i, label: i.toString() });
}

const PriceSetterBox = styled(Box)({
  borderBottom: "1px solid gray",
  width: "900px",
  margin: "20px",
  padding: "18px",
});

const PriceSettingTitle = styled("p")({
  fontSize: "20px",
});

export default function PriceSetter() {
  const [age, setAge] = useState([0, 0]);
  const [fee, setFee] = useState(0);
  const isError = false;

  const handleFeeChange = (e) => {
    setFee(thousandSeparator(e.target.value));
  };

  const handleAgeChange = (e) => {};

  return (
    <PriceSetterBox>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <PriceSettingTitle>價格設定 - 1</PriceSettingTitle>
        <Button variant="text" color="error" sx={{ fontSize: "20px" }}>
          移除
        </Button>
      </Box>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-error-label">年齡</InputLabel>
          <Select
            id="demo-simple-select-error"
            value={age}
            label="Age"
            onChange={handleAgeChange}
          >
            {ageList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {isError && <FormHelperText>年齡區間有重複</FormHelperText>}
        </FormControl>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue={10}
        >
          {ageList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="fee-input"
          label="Outlined"
          variant="outlined"
          value={fee}
          onChange={handleFeeChange}
        />
      </div>
      <Box>輸入 0 表示免費</Box>
    </PriceSetterBox>
  );
}
