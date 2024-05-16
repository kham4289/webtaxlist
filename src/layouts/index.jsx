import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Outlet } from "react-router-dom";
import { color, route } from "../constants";
import { Menu, MenuItem } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ValueContext } from "../context/value.context";

export default function TopBar() {
  const { Value, setValue } = React.useContext(ValueContext);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const btn = {
    fontSize: "16px",
    color: "black",
    "&:hover": {
      backgroundColor: "#fff",
    },
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          elevation={2}
          position="sticky"
          sx={{ backgroundColor: color.BASE, padding: "5px" }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <img src="/tplus-logo.png" alt="img" style={{ height: "3rem" }} />
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  marginLeft: "5%",
                  columnGap: "20px",
                }}
              >
                <Button
                  color="inherit"
                  sx={{
                    ...btn,
                  }}
                  onClick={() => navigate(`${route.HOME}`)}
                >
                  ໜ້າຫຼັກ
                </Button>
                <Button
                  color="inherit"
                  sx={{ ...btn }}
                  onClick={() => {
                    navigate(`${route.FORM_TAXLIST}`);
                  }}
                >
                  <Stack direction={"row"} alignItems="center">
                    ສ້າງລາຍການ
                  </Stack>
                </Button>

                <Button
                  color="inherit"
                  sx={{
                    ...btn,
                  }}
                  onClick={(e) => {
                    handleClick(e);
                    // navigate(`${route.ALL_TAX_LIST}`)
                  }}
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  ເລືອກລາຍການສະແດງ
                  <ExpandMoreIcon fontSize="small" />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={(e) => {
                      handleClose();
                      //  navigate({
                      //   pathname: `${route.ALL_TAX_LIST}`,
                      //   search: `?page=1&size=20`
                      //  })
                      setValue(Value);
                      navigate(`${route.ALL_TAX_LIST}/allTax?page=${Value}`);
                    }}
                  >
                    ລາຍການທັງໝົດ
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleClose();
                      setValue(Value);
                      navigate(`${route.NOT_TAX_LIST}?page=${Value}`);
                    }}
                  >
                    ລາຍການລໍຖ້າສົ່ງ
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleClose();
                      setValue(Value);
                      navigate(`${route.SENT_TAX_LIST}?page=${Value}`);
                    }}
                  >
                    ລາຍການທີ່ສົ່ງແລ້ວ
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleClose();
                      setValue(Value);
                      navigate(`${route.CANCEL_LIST}?page=${Value}`);
                    }}
                  >
                    ລາຍການທີ່ຍົກເລີກ
                  </MenuItem>
                </Menu>
                <Button
                  color="inherit"
                  sx={{ ...btn }}
                  onClick={() => {
                    navigate(`${route.GET_CBS}`);
                  }}
                >
                  ບີນ Postpaid
                </Button>
              </Box>

              {/* <Button color="inherit">Login</Button> */}
            </Toolbar>
          </Container>
        </AppBar>
        <div className="container">
          <Outlet />
        </div>
      </Box>
    </>
  );
}
