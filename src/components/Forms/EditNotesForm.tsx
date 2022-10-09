import { IconButton, Tooltip } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";
import { EditNotesProps } from "./interfaces";

const EditNotesForm: (props: EditNotesProps) => JSX.Element = (
  props: EditNotesProps
) => {
  const [note, setNote] = useState(props.currentNote);
  const [pin, setPin] = useState(note.isPinned);
  const [color, setColor] = useState(note.color);

  useEffect(() => {
    setNote(props.currentNote);
  }, [props]);

  function changeHandeller(event: { target: { name: string; value: string } }) {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  }

  function pinHandeller(event: { preventDefault: () => void }) {
    event.preventDefault();
    setNote({ ...note, isPinned: !note.isPinned });
    setPin(!pin);
  }

  function colorHandeller(event: { target: { value: string } }) {
    setColor(event.target.value);
    setNote({ ...note, color: event.target.value });
  }

  function submitHandeller(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (!note.body) {
      return;
    }
    props.updateNote(note.id, note);
  }

  return (
    <form
      className="flex-form"
      onSubmit={submitHandeller}
      style={{ backgroundColor: color }}
      autoComplete="off"
    >
      <input
        type="text"
        name="title"
        value={note.title}
        onChange={changeHandeller}
        className="form-items form-input"
        style={{ backgroundColor: color }}
      />
      <textarea
        name="body"
        value={note.body}
        onChange={changeHandeller}
        className="form-items form-textarea"
        rows={3}
        style={{ backgroundColor: color }}
      />

      <div className="form-items-secondary">
        <div className="form-group">
          <select
            name="tag"
            value={note.tag}
            onChange={changeHandeller}
            className="form-select"
          >
            <option hidden>Добавить ярлык</option>
            {props.tags.map(
              (tag: {
                id: Key | null | undefined;
                name:
                  | string
                  | number
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | ReactPortal
                  | null
                  | undefined;
              }) => (
                <option key={tag.id}>{tag.name}</option>
              )
            )}
          </select>
          <input
            name="color"
            type="color"
            value={note.color}
            onChange={colorHandeller}
            className="form-color"
          />
        </div>

        <div>
          <button className="form-button">Обновить</button>
          <button
            onClick={() => props.setEditing(false)}
            className="form-button"
          >
            Отмена
          </button>
        </div>
      </div>
      <Tooltip title={pin ? "Открепить заметку" : "Закрепить заметку"}>
        <IconButton
          onClick={pinHandeller}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
          }}
        >
          {pin ? <PushPinIcon /> : <PushPinOutlinedIcon />}
        </IconButton>
      </Tooltip>
    </form>
  );
};

export default EditNotesForm;
