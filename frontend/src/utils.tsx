// Redirect is a component for declarative navigation, typically used within the rendering logic of Route components to handle conditional redirects.
import { redirect } from "react-router-dom";

export default function requireAuth(request: any) {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken == null || accessToken == "undefined") {
    throw redirect(`/login`);
  }

  return null;
}
