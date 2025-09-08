import path from "path";

export const configViews = {
  root: path.resolve(process.cwd(), "public"), // point directly to `view` folder
  prefix: "/views/", // optional: serve files with `/view/Home.html`
};

export const Home = "/views/index.html";
