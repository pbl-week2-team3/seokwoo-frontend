import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Route } from "react-router-dom";
import styled from 'styled-components';
import Header from "../components/Header";
import { Button, Grid } from "../elements";
import PostWrite from "../pages/PostWrite";
import { history } from "../redux/configureStore";
import "./App.css";
import { Login, SignUp, Main, Write, Detail, Update } from "../pages"

function App() {

  return (
    <React.Fragment>
      <Wrap>
      <Grid margin="0px auto">
        <ConnectedRouter history={history}>
          <Header></Header>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/write" exact component={Write} />
          <Route path="/write/:id" exact component={Write} />
          <Route path="/post/:id" exact component={Detail} />
          {/* <Route path="/noti" exact component={Notification} /> */}
        </ConnectedRouter>
      </Grid>
      
      
        <Button
          is_float
          text="+"
          _onClick={() => {
            history.push("/write");
          }}
        ></Button>
      
      </Wrap>
    </React.Fragment>
  );
}

const Wrap = styled.div`
margin: auto;
max-width: 1200px;
justify-content: center;
`;

export default App;
