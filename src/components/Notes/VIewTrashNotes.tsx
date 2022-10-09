import React, { useState, useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import NoteItem from "../NoteItem/NoteItem";
import { ViewTrashNotesProps } from "./interfaces";

const ViewTrashNotes: (props: ViewTrashNotesProps) => JSX.Element = (
  props: ViewTrashNotesProps
) => {
  const [noteList, setNoteList] = useState(props.notes);

  useEffect(() => {
    setNoteList(props.notes);
  }, [props.notes]);

  return (
    <>
      <div className="cards">
        {noteList.length > 0 && <h2>Заметок найдено: {noteList.length}</h2>}

        <div className="card-group">
          {noteList.length > 0 &&
            noteList.map((note: any) => (
              <NoteItem
                note={note}
                trashDelete={props.trashDelete}
                trashRestore={props.trashRestore}
                isTrashNote
              />
            ))}
        </div>
      </div>

      {!noteList.length && (
        <div className="no-cards">
          <div className="nonote-img">
            <DeleteOutlineIcon fontSize="inherit" />
          </div>
          <div className="nonote-text">В корзине ничего нет.</div>
        </div>
      )}
    </>
  );
};

export default ViewTrashNotes;
