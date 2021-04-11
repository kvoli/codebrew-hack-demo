Codebrew Web Tech Demo
===

###### tags: `codebrew`

### Introducion

This tutorial gives a terse guide which at the end of you should have a barebones minecraft serverlist.

The tech stack is React, Material-UI and Firebase.

This is a quick and reliable stack - perfect for hackathons.

If you just want the code

### Setup

```bash
npx create-react-app codebrew-hack-demo
cd codebrew-hack-demo
```

There's a few imports we're going to use

```bash
npm install firebase \
react-firebase-hooks firebase-tools \
@material-ui/core @material-ui/icons
```

### Skeleton

Then open up your favorite editor.

```bash
vim src/App.js
```

Lets remove the boilerplate code and add in our required firebase imports.

```javascript
import React, {useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
 // your values
});

const firestore = firebase.firestore();

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ServerList />
    </React.Fragment>
  );
}

function ServerList() {
   return(
     <></>
   )
}
```

### Firebase Setup

Cool, next step is to setup the firebase project online (don't worry its free).

1. Head to https://firebase.google.com/ and login
2. Add a new firebase project ![](https://i.imgur.com/C8SeXro.png)
3. Add a new database ![](https://i.imgur.com/vYHas9M.png)
4. Go for un-authenticated and select the australian server (it may take a moment to get going)
5. Great, once that's provisioned - it should look like this ![](https://i.imgur.com/vhstOQg.png)
6. Time for the last step, we're going to create an app (web) and add the credentials![](https://i.imgur.com/LGUsEXX.png)
7. Enter the details you want and select hosting.
8. Now we can finally grab the details here ![](https://i.imgur.com/19iAxvG.png)


Lets put thos details in our code

```javascript
firebase.initializeApp({
... // paste here
});
```

### The Code

Now that we've set that up we can get to the coding.

We're going to use Material-UI with almost no CSS setup in this tutorial. CSS very important (aesthetically), it also takes a lot of time.

Lets start by creating the necessary data to access our server collection on Firebase.



```javascript
function ServerList() {
  const serversRef = firestore.collection("servers");
  const query = serversRef.orderBy("createdAt").limit(50);

  const [servers] = useCollectionData(query, {idField: "id"});
  ...
}
```

Next, we can add in the necessary functions to create a server. Which we can then call with user input values.

```javascript
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");

  const createServer = async (e) => {
    e.preventDefault();

    await serversRef.add({
      title: title,
      address: address,
      tags: tags,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setAddress("");
    setTitle("");
  };

```

Finally, we can call this new function `createServer` and declare our jsx code.

```javascript
  return (
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
  );
```

And perhaps the easiest part - just rendering the servers!

Lets map over the servers ref we created earler.

```javascript
{servers && servers.map((server) =>
   <ServerEntry server={server} />
)}
```

Lets create the function to render each server entry

```javascript
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
```

### Conclusion

Thats it. It should take about 15-30 minutes depending on your exp to get it all going.

Its scrappy but it works as a first step.

To make it look great, add more functionality and start building out your product for the pitch - have a look at some more advanced tutorials i'll include below.


### Next Steps

1. Make it look great https://mui-treasury.com/
2. Setup Auth (only a few more lines) https://react-firebase-js.com/docs/react-firebase-auth/getting-started
3. Expand further - see here for a great tutorial https://www.youtube.com/watch?v=m_u6P5k0vP0
