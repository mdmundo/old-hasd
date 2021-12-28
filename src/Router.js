import Selector from "./selector";
import Loader from "./loader";
import Share from "./share";
import Error from "./error";
import Player from "./player";
import { Router } from "@reach/router";

const AppRouter = () => (
  <Router>
    <Selector default path="/" />
    <Loader path="/load/:mode/:hymn" />
    <Share path="/share/:mode/:hymn" />
    <Error path="/error" />
    <Player path="/play/:mode/:hymn" />
    <Player path="/play/:mode/:hymn/:url" />
  </Router>
);

export default AppRouter;
