import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { MediaQueryMobile } from "../../Constants";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Reducers";
import { navBarOpened } from "../../Actions/NavBarActions";

export function NavBar() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: MediaQueryMobile });
  const openNavBar = useSelector(
    (state: RootState) => state.navBar.openedNavBar
  );

  return (
    <div
      className={`${styles.navBar} ${
        isMobile ? `${styles.mobile} ${openNavBar ? "" : styles.closed}` : ""
      }`}
    >
      {isMobile && (
        <div className={styles.buttonClose}>
          <Button
            icon="close"
            onClick={() => dispatch(navBarOpened(!openNavBar))}
          />
        </div>
      )}
      <div className={styles.logo}>
        <Link to="/" onClick={() => dispatch(navBarOpened(!openNavBar))}>
          <strong>New News</strong>
        </Link>
      </div>
      <div className={styles.menuList}>
        <Link to="/">
          <Button onClick={() => dispatch(navBarOpened(!openNavBar))}>
            Início
          </Button>
        </Link>
        <Link to="newNews">
          <Button onClick={() => dispatch(navBarOpened(!openNavBar))}>
            Adicionar notícia
          </Button>
        </Link>
        <Link to="newAuthor">
          <Button onClick={() => dispatch(navBarOpened(!openNavBar))}>
            Adicionar autor
          </Button>
        </Link>
        <Link to="search-news">
          <Button onClick={() => dispatch(navBarOpened(!openNavBar))}>
            Buscar notícia
          </Button>
        </Link>
      </div>
    </div>
  );
}
