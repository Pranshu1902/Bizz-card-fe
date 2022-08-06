import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function SocialMediaDropDown(props: {
  setLinkName: (e: string) => void;
  setLinkIcon: (e: string) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [value, setValue] = React.useState("Type");

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<i className="flex items-center fa-solid fa-angle-down"></i>}
      >
        {value}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            setValue("Twitter");
            props.setLinkIcon("fa-twitter fa-brands");
            props.setLinkName("Twitter");
          }}
          disableRipple
        >
          <i className="fa-brands fa-twitter"></i>&nbsp;Twitter
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setValue("Facebook");
            props.setLinkIcon("fa-facebook fa-brands");
            props.setLinkName("Facebook");
          }}
          disableRipple
        >
          <i className="fa-brands fa-facebook"></i>&nbsp;Facebook
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setValue("Instagram");
            props.setLinkIcon("fa-instagram fa-brands");
            props.setLinkName("Instagram");
          }}
          disableRipple
        >
          <i className="fa-brands fa-instagram"></i>&nbsp;Instagram
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setValue("Github");
            props.setLinkIcon("fa-github fa-brands");
            props.setLinkName("Github");
          }}
          disableRipple
        >
          <i className="fa-brands fa-github"></i>&nbsp;Github
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setValue("Website");
            props.setLinkIcon("fa-globe fa");
            props.setLinkName("Website");
          }}
          disableRipple
        >
          <i className="fa fa-globe"></i>&nbsp;Website
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
