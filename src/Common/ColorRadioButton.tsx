import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function ColorRadioButton(props: {
  setColor: (e: string) => void;
}) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label text-xl">
        <p className="text-xl text-purple-900">Theme:</p>
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          value="purple"
          onClick={() => props.setColor("purple")}
          control={<Radio />}
          label="Purple"
        />
        <FormControlLabel
          value="red"
          onClick={() => props.setColor("red")}
          control={<Radio />}
          label="Red"
        />
        <FormControlLabel
          value="blue"
          onClick={() => props.setColor("blue")}
          control={<Radio />}
          label="Blue"
        />
      </RadioGroup>
    </FormControl>
  );
}
