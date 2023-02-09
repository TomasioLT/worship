import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  querySnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
const Songs = () => {
  const [songList, setSongList] = useState([]);

  // Firestore

  // Firestore Create song item [NEW]
  useEffect(() => {
    const q = query(collection(db, "songs"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setSongList(todosArr);
    });
    return () => unsubscribe();
  }, []);
  // FireStore Delete song item [NEW]
  const deleteSong = async (id) => {
    await deleteDoc(doc(db, "songs", id));
  };
  const [deleteSongId, setDeleteSongId] = useState("");

  // Dialog
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleClickDialogOpen = () => {
    setDialogOpen(true);
    setOpenSnackBar(false);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);

    handleClickSnackBar();
  };

  // Snackbar
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const handleClickSnackBar = () => {
    setOpenSnackBar(true);
  };
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  return (
    <Box>
      <Typography variant="h4">Songs List</Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "75vw" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Song Title</TableCell>
                <TableCell align="right">Key</TableCell>
                <TableCell align="right">BPM</TableCell>
                <TableCell align="right">Time</TableCell>
                <TableCell align="right">Music by</TableCell>
                <TableCell align="right">Author by</TableCell>
                <TableCell align="right">CCLI</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {songList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">80 BPM</TableCell>
                  <TableCell align="right">4/4</TableCell>
                  <TableCell align="right">{row.originalKey}</TableCell>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell align="right">{row.authorMusic}</TableCell>
                  <TableCell align="right">{row.authorWords}</TableCell>
                  <TableCell align="right">{row.ccli}</TableCell>
                  <TableCell align="right">
                    {
                      <ButtonGroup>
                        <Button align="right">
                          <EditOutlined />
                        </Button>
                        <Button
                          align="right"
                          color="error"
                          onClick={() => {
                            setDeleteSongId(row.id);
                            handleClickDialogOpen();
                          }}>
                          <DeleteOutline />
                        </Button>
                      </ButtonGroup>
                    }
                  </TableCell>
                </TableRow>
              ))}
              <Dialog
                open={dialogOpen}
                onClose={() => {
                  handleCloseDialog();
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure want to delete this song?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    This is one way. There is no returning back or backup after
                    deleting this.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog} variant="outlined">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleCloseDialog();
                      deleteSong(deleteSongId);
                    }}
                    autoFocus
                    variant="contained"
                    color="error">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openSnackBar}
          autoHideDuration={2000}
          onClose={handleCloseSnackBar}
          message="Note archived">
          <Alert severity="warning" sx={{ width: "100%" }}>
            Item has been deleted!
          </Alert>
        </Snackbar>
        <Button variant="outlined" sx={{ m: 1 }}>
          DEBUG
        </Button>
      </Paper>
    </Box>
  );
};

export default Songs;
