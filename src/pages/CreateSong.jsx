import { AddOutlined } from "@mui/icons-material";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Container,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  MenuList,
  ClickAwayListener,
  Grow,
  Popper,
  Fab,
} from "@mui/material";
import React, { useState } from "react";
import Tempo from "../components/Tempo";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
let nextId = 0;

const CreateSong = () => {
  // STATES:
  const [title, setTitle] = useState("");
  const [authorWord, setAuthorWord] = useState("");
  const [authorMusic, setAuthorMusic] = useState("");
  const [originalKey, setOriginalKey] = useState("");
  const [ccli, setCcli] = useState("");
  const [songTempoBpm, setSongTempoBpm] = useState("");
  const [songTempoTime, SetSongTempoTime] = useState("");
  const [textArea, setTextArea] = useState("");

  const handleChangeOriginalKey = (event) => {
    setOriginalKey(event.target.value);
  };
  // Dynamic append new form of song input (intro, verse, chorus ... )
  const [name, setName] = useState("");
  const [songElementList, setSongElementList] = React.useState([]);

  // Dynamic menu for selecting + New song chapter.
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((open) => !open);
  };

  const handleClose = (event) => {
    // if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //   return;
    // }

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

  const handleRemove = (value) => {
    setSongElementList((oldValues) => {
      return oldValues.filter((songElementList) => songElementList !== value);
    });
  };

  // Selected text
  function getSelectedText() {
    var selectedText = "";

    // window.getSelection
    if (window.getSelection) {
      selectedText = window.getSelection();
    }
    // document.getSelection
    else if (document.getSelection) {
      selectedText = document.getSelection();
    }
    // document.selection
    else if (document.selection) {
      selectedText = document.selection.createRange().text;
    } else return;
    // To write the selected text into the textarea
    document.testform.selectedtext.value = selectedText;
  }

  // FIREBASE Create:
  const submitSong = async (e) => {
    e.preventDefault(e);
    if (title === "") {
      alert("please enter a song title!");
      return;
    }
    await addDoc(collection(db, "songs"), {
      title: title,
      authorWords: authorWord,
      authorMusic: authorMusic,
      originalKey: originalKey,
      ccli: ccli,
      tempoBpm: songTempoBpm,
      tempoTime: songTempoTime,
      multiline: textArea,
    });
    e.target.reset();
  };
  return (
    <Box>
      <Typography variant="h2">Form</Typography>

      <form onSubmit={submitSong}>
        <Grid container spacing={2} columnSpacing={10}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }} elevation={4}>
              <Grid container columnSpacing={3} rowSpacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    onChange={(e) => setTitle(e.target.value)}
                    id="outlined-basic"
                    label="Song title"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    onChange={(e) => setAuthorWord(e.target.value)}
                    id="outlined-basic"
                    label="Word Author"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    onChange={(e) => setTextArea(e.target.value)}
                    id="outlined-basic"
                    label="Music author"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <textarea
                    name="selectedtext"
                    rows="5"
                    cols="20"
                    onChange={(e) => setAuthorMusic(e.target.value)}></textarea>
                </Grid>
                <Grid item xs={4} md={4}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Key</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={originalKey}
                      label="Key"
                      onChange={handleChangeOriginalKey}>
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="C">C</MenuItem>
                      <MenuItem value="D">D</MenuItem>
                      <MenuItem value="E">E</MenuItem>
                      <MenuItem value="F">F</MenuItem>
                      <MenuItem value="G">G</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={8} md={4}>
                  <TextField
                    fullWidth
                    onChange={(e) => setCcli(e.target.value)}
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
                    <Container
                      sx={{ border: 1 }}>{`Indeksas: ${index}`}</Container>
                    <TextField
                      id={`indexas_${index}`}
                      multiline
                      minRows={5}
                      maxRows={12}
                      fullWidth
                      sx={{ position: "relative" }}
                    />
                    <input
                      type="button"
                      value="Get Selection"
                      onMouseDown={getSelectedText}></input>
                    <form name="testform"></form>
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
              <Button variant="contained" type="submit">
                Submit Form
              </Button>
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
