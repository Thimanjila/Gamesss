import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import React, { useState } from "react";
import Backdrop from "../../assests/games.png";


import ShortestPath from "../Shortest_Path/game2";

import CustomAppBar from "./AppBar";
import DrawerList from "./DrawerList";
const Home = () => {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const selectComp = (component) => {
    setComponent(component);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar title="Game Zone" toggleDrawer={toggleDrawer(!open)} />
      <Box>
      {component ? (
  component === "/shortest_path" ? (
    <ShortestPath />
  ) : (
    <div>Invalid Component</div>
  )
) : (
  // Default content when no component is selected

          <div>
            <img
              src={Backdrop}
              alt="Game"
              style={{ width: "100%", height: "100%" }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(255,255,255,0.8)",
                width: "100%",
                height: "30%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <h1>Step Up & Play</h1>
                <h3>Welcome to the Game Zone</h3>
                <br />
               
              </Box>
            </Box>
          </div>
        )}
      </Box>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <DrawerList onClose={toggleDrawer(false)} selectComp={selectComp} />
      </Drawer>
    </Box>
  );
};

export default Home;
