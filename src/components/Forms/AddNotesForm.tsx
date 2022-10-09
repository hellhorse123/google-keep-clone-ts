import { IconButton, Tooltip } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { useState } from "react";
import { AddNotesProps } from "./interfaces";

const AddNotesForm: (props: AddNotesProps) => JSX.Element = (
  props: AddNotesProps
) => {
  const initialState = {
    id: null,
    title: "",
    body: "",
    tag: "",
    isPinned: false,
    color: "",
  };

  const [note, setNote] = useState(initialState);
  const [expanded, setExpanded] = useState(false);
  const [pin, setPin] = useState(false);
  const [color, setColor] = useState("");

  function changeHandler(event: { target: { name: string; value: string } }) {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  }

  function clickHandler() {
    setExpanded(true);
  }

  function closeHandler() {
    if (!note.title && !note.body) {
      setExpanded(false);
    }
  }

  function pinHandler(event: { preventDefault: () => void }) {
    event.preventDefault();
    setNote({ ...note, isPinned: !note.isPinned });
    setPin(!pin);
  }

  function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (!note.body) {
      return;
    }
    props.addNote(note);
    setNote(initialState);
    setPin(false);
    setColor("");
  }

  return (
    <form
      className="flex-form"
      onSubmit={submitHandler}
      style={{ backgroundColor: color }}
      autoComplete="off"
    >
      {expanded && (
        <input
          type="text"
          name="title"
          value={note.title}
          onChange={changeHandler}
          className="form-items form-input"
          placeholder="Введите заголовок"
          style={{ backgroundColor: color }}
        />
      )}
      <textarea
        name="body"
        value={note.body}
        onChange={changeHandler}
        onClick={clickHandler}
        className="form-items form-textarea"
        rows={expanded ? 3 : 1}
        placeholder="Заметка..."
        style={{ backgroundColor: color }}
      />

      {expanded && (
        <div className="form-items-secondary">
          <div className="form-group">
            <select
              name="tag"
              value={note.tag}
              onChange={changeHandler}
              className="form-select"
            >
              <option hidden>Добавить ярлык</option>
              {props.tags.map((tag: any) => (
                <option key={tag.id}>{tag.name}</option>
              ))}
            </select>
          </div>
          <button className="form-button" onClick={closeHandler}>
            Закрыть
          </button>
        </div>
      )}
      {expanded && (
        <Tooltip title={pin ? "Открепить заметку" : "Закрепить заметку"}>
          <IconButton
            onClick={pinHandler}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
            }}
          >
            {pin ? <PushPinIcon /> : <PushPinOutlinedIcon />}
          </IconButton>
        </Tooltip>
      )}
    </form>
  );
};

export default AddNotesForm;
