import { useState, useEffect } from "react";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";

import NoteItem from "../NoteItem/NoteItem";
import { ViewNotesProps } from "./interfaces";

const ViewNotes: (props: ViewNotesProps) => JSX.Element = (
  props: ViewNotesProps
) => {
  const [noteList, setNoteList] = useState(props.notes);
  const [pinnedList, setPinnedList] = useState([]);
  const [otherList, setOtherList] = useState([]);

  useEffect(() => {
    setNoteList(props.notes);
    setPinnedList(
      props.notes.filter((note: { isPinned: boolean }) => note.isPinned)
    );
    setOtherList(
      props.notes.filter((note: { isPinned: boolean }) => !note.isPinned)
    );
  }, [props.notes]);

  return (
    <>
      <div className="cards">
        <div className="card-group">
          {!pinnedList.length &&
            noteList.length > 0 &&
            noteList.map((note: any) => (
              <NoteItem
                isGroupNote
                deleteNote={props.deleteNote}
                pinNote={props.pinNote}
                editNote={props.editNote}
                note={note}
              />
            ))}
        </div>
        <div className="card-group group-text">
          {pinnedList.length > 0 && <span>ЗАКРЕПЛЕННЫЕ</span>}
        </div>
        <div className="card-group">
          {pinnedList.length > 0 &&
            pinnedList.map((note: any) => (
              <NoteItem
                isNote
                deleteNote={props.deleteNote}
                pinNote={props.pinNote}
                editNote={props.editNote}
                note={note}
              />
            ))}
        </div>
        <div className="card-group group-text">
          {pinnedList.length > 0 && otherList.length > 0 && (
            <span>ДРУГИЕ ЗАМЕТКИ</span>
          )}
        </div>
        <div className="card-group">
          {pinnedList.length > 0 &&
            noteList.length > 0 &&
            otherList.map((note: any) => (
              <NoteItem
                isOtherNote
                deleteNote={props.deleteNote}
                pinNote={props.pinNote}
                editNote={props.editNote}
                note={note}
              />
            ))}
        </div>
      </div>

      {!noteList.length && (
        <div className="no-cards no-note">
          <div className="nonote-img">
            {props.isMainPage ? (
              <EmojiObjectsOutlinedIcon fontSize="inherit" />
            ) : (
              <LabelOutlinedIcon fontSize="inherit" />
            )}
          </div>
          {props.isMainPage ? (
            <div className="nonote-text">Здесь будут ваши заметки</div>
          ) : (
            <div className="nonote-text">Нет заметок с этим ярлыком</div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewNotes;
