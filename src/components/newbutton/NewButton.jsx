import { Button } from "@material-ui/core";
import { createTheme } from "@mui/material/styles";

function NewButton({
  size,
  color,
  type = "button",
  value = "i Am a button",
  variant,
  onClick = () => {},
}) {
  return (
    <>
      <Button
        size={size}
        color={color}
        type={type}
        variant={variant}
        onClick={onClick}
      >
        {value}
      </Button>
    </>
  );
}

export default NewButton;
