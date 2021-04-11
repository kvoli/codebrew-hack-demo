import React, {useState} from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import {
  Button,
  Grid,
  TextField,
  Container,
  List,
  ListItemText,
  ListItem,
  Paper,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import FileCopySharpIcon from "@material-ui/icons/FileCopySharp";
import {useCollectionData} from "react-firebase-hooks/firestore";
import CssBaseline from "@material-ui/core/CssBaseline";

firebase.initializeApp({
  // setup firebase config
});

const firestore = firebase.firestore();

function App() {
  return (
    <>
      <CssBaseline />
      <ServerList />
    </>
  );
}

function ServerList() {
  const serversRef = firestore.collection("servers");
  const query = serversRef.orderBy("createdAt").limit(25);

  const [servers] = useCollectionData(query, {idField: "id"});

  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");

  const createServer = async (e) => {
    e.preventDefault();

    await serversRef.add({
      title: title,
      address: address,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setAddress("");
    setTitle("");
  };

  return (
    <Container maxWidth="sm">
      {servers && servers.map((server) => <ServerEntry server={server} />)}

      <form onSubmit={createServer}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="baseline"
        >
          <Grid item>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              variant="outlined"
            />
          </Grid>
          <Grid>
            <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              label="Address"
              variant="outlined"
            />
          </Grid>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </form>
    </Container>
  );
}

function ServerEntry(props) {
  const server = props.server;

  return (
    <List>
      <Paper>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Server Logo"
              src="https://logodix.com/logo/956726.jpg"
            />
          </ListItemAvatar>
          <ListItemText
            primary={server.title}
            secondary={server.address}
            id={server.id}
          />
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => navigator.clipboard.writeText(server.address)}
            >
              <FileCopySharpIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </Paper>
    </List>
  );
}

export default App;
