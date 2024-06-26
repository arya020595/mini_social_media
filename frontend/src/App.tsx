import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
// import "./App.css";
import NotFound from "./NotFound";
import AuthLayout from "./components/AuthLayout";
import Error from "./components/Error";
import Layout from "./components/Layout";
import ChangePassword, {
  action as ChangePasswordAction,
  loader as ChangePasswordLoader,
} from "./pages/ChangePassword";
import Home, { loader as homesloader } from "./pages/Home";
import Login, {
  action as loginAction,
  loader as loginLoader,
} from "./pages/Login";
import Register, {
  action as registerAction,
  loader as registerLoader,
} from "./pages/Register";
import User, { action as userAction, loader as userloader } from "./pages/User";
import Post, { loader as postsloader } from "./pages/posts/Post";
import PostForm, { action as postsAction } from "./pages/posts/PostForm";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route element={<Layout />}>
          <Route
            index
            element={<Home />}
            loader={homesloader}
            errorElement={<Error />}
          />
          <Route
            path="user"
            element={<User />}
            loader={userloader}
            action={userAction}
            errorElement={<Error />}
          />
          <Route
            path="change-password"
            element={<ChangePassword />}
            loader={ChangePasswordLoader}
            action={ChangePasswordAction}
            errorElement={<Error />}
          />
          <Route
            path="post"
            element={<Post />}
            loader={postsloader}
            errorElement={<Error />}
          />
          <Route
            path="post-form"
            element={<PostForm />}
            action={postsAction}
            errorElement={<Error />}
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route
            path="login"
            element={<Login />}
            loader={loginLoader}
            action={loginAction}
            errorElement={<Error />}
          />
          <Route
            path="register"
            element={<Register />}
            loader={registerLoader}
            action={registerAction}
            errorElement={<Error />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
