import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { SearchBoxProps } from "./interface";

const SearchBox: (props: SearchBoxProps) => JSX.Element = (
  props: SearchBoxProps
) => {
  return (
    <form
      onSubmit={props.submitHandler}
      className="flex-form search-form"
      autoComplete="off"
    >
      <button className="search-icon">
        <IconButton>
          <SearchIcon />
        </IconButton>
      </button>
      <input
        type="text"
        name="search"
        value={props.searchField}
        onChange={props.changeHandler}
        className="search-input"
        placeholder="Поиск"
      />
      <button className="search-icon close-icon" onClick={props.clickHandler}>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </button>
    </form>
  );
};

export default SearchBox;
