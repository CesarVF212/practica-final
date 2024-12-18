import Router from "next/router";

export default function checkToken() {
  Router;
  const token = localStorage.getItem("jwt");
  if (!token) Router.push("/login");
}
