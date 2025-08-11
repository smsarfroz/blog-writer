import { createContext } from "react";
const blogContext = createContext({
  posts: [],
  loggedIn: false
});

export { blogContext };
