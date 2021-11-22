import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { navBarOpened } from "./Actions/NavBarActions";
import { MediaQueryMobile } from "./Constants";
import { AddAuthor } from "./Pages/AddAuthor.tsx/AddAuthor";
import { AddNews } from "./Pages/AddNews/AddNews";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { News } from "./Pages/News/News";
import { RootState } from "./Reducers";
import { NavBar } from "./Shared/NavBar/NavBar";

export function App() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: MediaQueryMobile });

  const openNavBar = useSelector(
    (state: RootState) => state.navBar.openedNavBar
  );
  return (
    <BrowserRouter>
      {isMobile ? (
        <div style={{marginTop: "1rem"}}>
          <Button
            icon="angle double right"
            onClick={() => dispatch(navBarOpened(!openNavBar))}
          />
        </div>
      ) : null}
      <NavBar />
      <div className="general-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="newNews" element={<AddNews />} />
          <Route path="newNews/:id" element={<AddNews />} />
          <Route path="newAuthor" element={<AddAuthor />} />
          <Route path="/:id" element={<News />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
