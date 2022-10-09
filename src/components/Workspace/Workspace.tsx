// Workspace - "article" нашего SPA.
// В нем отображаются заметки, заметки с сортировкой по ярлыкам и заметки в корзине.
// Реализует логику добавления, удаления и редактирования заметок
import { useState } from "react";
import { v4 } from "uuid";

import ViewNotes from "../../components/Notes/ViewNotes";
import AddNotesForm from "../../components/Forms/AddNotesForm";
import EditNotesForm from "../../components/Forms/EditNotesForm";
import ViewTrashNotes from "../../components/Notes/VIewTrashNotes";
import { WorkspaceProps } from "./interface";

const Workspace: (props: WorkspaceProps) => JSX.Element = (
  props: WorkspaceProps
) => {
  const initialState = { id: null, title: "", body: "", tag: "" };
  const [currentNote, setCurrentNote] = useState(initialState);

  const addNote = (note: { id: string }) => {
    note.id = v4();
    props.setNotes([...props.notes, note]);
  };

  const deleteNote = (id: number, note: any) => {
    props.setEditing(false);
    props.setDeletedNotes([...props.deletedNotes, note]);
    props.setNotes(
      props.notes.filter((note: { id: number }) => note.id !== id)
    );
  };

  const editNote = (note: {
    id: any;
    title: string;
    body: string;
    tag: string;
  }) => {
    props.setEditing(true);
    setCurrentNote({
      id: note.id,
      title: note.title,
      body: note.body,
      tag: note.tag,
      // color: note.color,
      // isPinned: note.isPinned,
    });
  };

  const updateNote = (id: number, updatedNote: any) => {
    props.setEditing(false);
    props.setSearching(false);
    props.setNotes(
      props.notes.map((note: { id: number }) =>
        note.id === id ? updatedNote : note
      )
    );
  };

  const pinNote = (id: number) => {
    props.setNotes((notes: any[]) =>
      notes.map((note: { id: number; isPinned: any }) => {
        if (note.id === id) {
          return { ...note, isPinned: !note.isPinned };
        }
        return note;
      })
    );
  };

  const trashDelete = (id: number) => {
    props.setDeletedNotes(
      props.deletedNotes.filter((note: any) => note.id !== id)
    );
  };

  const trashRestore = (note: any, id: number) => {
    props.setNotes([...props.notes, note]);
    props.setDeletedNotes(
      props.deletedNotes.filter((note: any) => note.id !== id)
    );
  };

  return (
    <>
      {props.editing && !props.viewTrash ? (
        <div>
          <EditNotesForm
            tags={props.tags}
            setEditing={props.setEditing}
            currentNote={currentNote}
            updateNote={updateNote}
          />
        </div>
      ) : (
        <div>
          {!props.viewTrash && (
            <AddNotesForm addNote={addNote} tags={props.tags} />
          )}
        </div>
      )}

      {props.viewTrash && (
        <div>
          <ViewTrashNotes
            notes={props.deletedNotes}
            trashDelete={trashDelete}
            trashRestore={trashRestore}
          />
        </div>
      )}

      {props.filtering && (
        <div>
          <ViewNotes
            notes={props.filteredNotes}
            editNote={editNote}
            deleteNote={deleteNote}
            pinNote={pinNote}
          />
        </div>
      )}

      {props.searching && (
        <div>
          <ViewNotes
            notes={props.searchedNotes}
            editNote={editNote}
            deleteNote={deleteNote}
            pinNote={pinNote}
          />
        </div>
      )}

      {!props.filtering && !props.viewTrash && !props.searching && (
        <div>
          <ViewNotes
            isMainPage
            notes={props.notes}
            editNote={editNote}
            deleteNote={deleteNote}
            pinNote={pinNote}
          />
        </div>
      )}
    </>
  );
};

export default Workspace;
