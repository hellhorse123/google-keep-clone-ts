import React from "react";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { NoteProps } from "./interface";

const NoteItem: (props: NoteProps) => JSX.Element = (props: NoteProps) => {
  return (
    <div className="card" key={props.note.id}>
      <span className="card-title">{props.note.title}</span>
      <p className="card-body">{props.note.body}</p>
      <div className="card-row">
        {props.note.tag !== null && (
          <span className="card-tag">{props.note.tag}</span>
        )}
        {props.isTrashNote ? (
          <div>
            <Tooltip title="Восстановить">
              <IconButton
                onClick={() => props.trashRestore(props.note, props.note.id)}
              >
                <RestoreFromTrashIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Удалить навсегда">
              <IconButton onClick={() => props.trashDelete(props.note.id)}>
                <DeleteForeverIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        ) : props.isNote || props.isGroupNote || props.isOtherNote ? (
          <>
            <div>
              <Tooltip title="Редактировать">
                <IconButton onClick={() => props.editNote(props.note)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Удалить заметку">
                <IconButton
                  onClick={() => props.deleteNote(props.note.id, props.note)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
            <Tooltip
              title={props.isNote ? "Открепить заметку" : "Закрепить заметку"}
            >
              <IconButton
                style={{
                  position: "absolute",
                  top: "0.6rem",
                  right: "0.6rem",
                }}
                onClick={() => props.pinNote(props.note.id)}
              >
                {props.isNote ? (
                  <PushPinIcon />
                ) : props.isGroupNote || props.isOtherNote ? (
                  <PushPinOutlinedIcon />
                ) : null}
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <PushPinIcon />
        )}
      </div>
    </div>
  );
};

export default NoteItem;
