import { AddCircleOutline, AddOutlined } from "@mui/icons-material";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Container,
  Grid,
  Button,
  styled,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  MenuList,
  ClickAwayListener,
  Grow,
  Popper,
  Fab,
  SpeedDialAction,
  SpeedDial,
} from "@mui/material";
import React, { useState } from "react";
import RichTextEditor from "../components/RichTextEditor";
import Tempo from "../components/Tempo";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SongTextField from "../components/SongTextField";

let nextId = 0;
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
}));
const CreateSong = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // Dynamic append new form of song input (intro, verse, chorus ... )
  const [name, setName] = useState("");
  const [songElementList, setSongElementList] = React.useState([]);

  // Dynamic menu for selecting + New song chapter.
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const handleRemove = (value) => {
    setSongElementList((oldValues) => {
      return oldValues.filter((songElementList) => songElementList !== value);
    });
  };
  return (
    <Box>
      <Typography variant="h2">Form</Typography>

      <form>
        <Grid container spacing={2} columnSpacing={10}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }} elevation={4}>
              <Grid container columnSpacing={3} rowSpacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Song title"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Word Author"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Music author"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Key</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Key"
                      onChange={handleChange}>
                      <MenuItem value={1}>A</MenuItem>
                      <MenuItem value={2}>B</MenuItem>
                      <MenuItem value={3}>C</MenuItem>
                      <MenuItem value={4}>D</MenuItem>
                      <MenuItem value={5}>E</MenuItem>
                      <MenuItem value={6}>F</MenuItem>
                      <MenuItem value={7}>G</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={4}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="CCLI"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Tempo />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<AddOutlined />}
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? "composition-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}>
                    Add Section
                  </Button>
                </Grid>
              </Grid>
              {songElementList.map((singleService, index) => (
                <Grid container columnSpacing={1} key={index}>
                  <Grid item xs={11} sm={10} md={9} lg={8}>
                    <Typography>{singleService.songElement}</Typography>

                    <TextField
                      multiline
                      minRows={5}
                      maxRows={12}
                      fullWidth
                      sx={{ position: "relative" }}
                    />
                  </Grid>
                  <Grid item xs={1} sx={{ pt: 3 }}>
                    <Fab
                      onClick={() => handleRemove(singleService)}
                      color="primary"
                      aria-label="add"
                      sx={{ position: "absolute", mr: 240 }}>
                      <DeleteOutlineOutlinedIcon />
                    </Fab>
                  </Grid>
                </Grid>
              ))}
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}>
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="element-intro"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}>
                          <MenuItem
                            id="intro"
                            onClick={() => {
                              setSongElementList([
                                ...songElementList,
                                { id: nextId + 1, songElement: "Intro" },
                              ]);
                              handleClose();
                            }}>
                            Intro
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setSongElementList([
                                ...songElementList,
                                { id: nextId + 1, songElement: "Verse" },
                              ]);
                              handleClose();
                            }}>
                            Verse
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setSongElementList([
                                ...songElementList,
                                { id: nextId + 1, songElement: "Pre-Chorus" },
                              ]);
                              handleClose();
                            }}>
                            Pre-Chorus
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setSongElementList([
                                ...songElementList,
                                { id: nextId + 1, songElement: "Chorus" },
                              ]);
                              handleClose();
                            }}>
                            Chorus
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setSongElementList([
                                ...songElementList,
                                { id: nextId + 1, songElement: "Bridge" },
                              ]);
                              handleClose();
                            }}>
                            Bridge
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setSongElementList([
                                ...songElementList,
                                { id: nextId + 1, songElement: "Ending" },
                              ]);
                              handleClose();
                            }}>
                            Ending
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setSongElementList([
                                ...songElementList,
                                { id: nextId + 1, songElement: "Refrain" },
                              ]);
                              handleClose();
                            }}>
                            Refrain
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setSongElementList([
                                ...songElementList,
                                { id: nextId + 1, songElement: "Outro" },
                              ]);
                              handleClose();
                            }}>
                            Outro
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateSong;
