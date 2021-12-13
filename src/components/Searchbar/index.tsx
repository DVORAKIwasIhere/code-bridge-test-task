import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEventHandler } from "react";
import InputAdornment from "@mui/material/InputAdornment";

interface SearchBarProps {
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
  }

export const SearchBar = ({value, onChange}: SearchBarProps) => {
  return (
    
    <TextField
      size="small"
      margin="normal"
      label="Search"
      value={value}
      style={{width:'40%', marginBottom: 48}}
      sx={{ borderRadius: 1, boxShadow: 3}}
      onChange = {onChange}
      InputProps={{
        startAdornment: (
        <InputAdornment position="start">
          <SearchIcon/>
        </InputAdornment>
        ),
      }}
    />
  );
};