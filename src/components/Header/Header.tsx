import { useState, useEffect, SetStateAction } from "react";
import { Grid } from "@mui/material";
import SearchBox from "../SearchBox/SearchBox";
import { HeaderProps } from "./interface";

const Header: (props: HeaderProps) => JSX.Element = (props: HeaderProps) => {
  const [searchField, setSearchField] = useState("");
  const [notes, setNotes] = useState(props.notes);

  useEffect(() => {
    setNotes(props.notes);
  }, [props]);

  function changeHandler(event: { target: { value: SetStateAction<string> } }) {
    setSearchField(event.target.value);
  }

  function clickHandler() {
    setSearchField("");
  }

  const searchedNotes = notes.filter((note: any) => {
    return (
      note.title.toLowerCase().includes(searchField.toLowerCase()) ||
      note.body.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (searchField === "") {
      return;
    }
    props.setSearching(true);
    props.setSearchedNotes(searchedNotes);
    setSearchField("");
  }

  return (
    <Grid
      container
      alignItems="center"
      style={{ gap: 20, padding: "0.5rem 0" }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        lg={2}
        md={3}
        sm={4}
        xs={4}
      >
        <img
          src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
          alt=""
          srcSet="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png 2x "
        />
        <span className="nav-brand">{props.appName}</span>
      </Grid>
      <Grid item xs>
        <SearchBox
          submitHandler={submitHandler}
          clickHandler={clickHandler}
          changeHandler={changeHandler}
          searchField={searchField}
        />
      </Grid>
    </Grid>
  );
};

export default Header;
