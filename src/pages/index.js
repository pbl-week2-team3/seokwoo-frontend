import React from "react";
import Loadable from "react-loadable";
import { Spinner } from "../elements";

const Loading = () => {
  return (
    <div>
      <Spinner>Now Loading...</Spinner>
    </div>
  );
};

export const Login = Loadable({
  loader: () => import("./LoginPage"),
  loading: Loading,
});

export const SignUp = Loadable({
  loader: () => import("./SignUpPage"),
  loading: Loading,
});

export const Main = Loadable({
  loader: () => import("./PostList"),
  loading: Loading,
});

export const Detail = Loadable({
  loader: () => import("./PostDetail"),
  loading: Loading,
});

export const Write = Loadable({
  loader: () => import("./PostWrite"),
  loading: Loading,
});

export const Update = Loadable({
    loader: () => import("./PostWrite"),
    loading: Loading,
  });