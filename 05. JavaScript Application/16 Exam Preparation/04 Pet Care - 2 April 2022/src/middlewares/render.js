import { html, render } from "../../node_modules/lit-html/lit-html.js";

const navTemplate = (user) => html`
  <!--Users and Guest-->
  <li><a href="/">Home</a></li>
  <li><a href="/dashboard">Dashboard</a></li>
  ${user
    ? html`
        <!--Only Users-->
        <li><a href="/create">Create Postcard</a></li>
        <li><a href="/logout">Logout</a></li>
      `
    : html`
        <!--Only Guest-->
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      `}
`;

let mainContent = document.getElementById("content");
let ulContent = document.querySelector("ul");

function ctxRender(content) {
  render(content, mainContent);
}

export function addRender(ctx, next) {
  render(navTemplate(ctx.user), ulContent);

  ctx.render = ctxRender;
  next();
}
