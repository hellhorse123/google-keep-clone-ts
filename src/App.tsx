// App - наш главный родитель, в нем расположены главные компоненты нашего SPA.
// Типизация пропсов и др. для компонентов вынесена в отдельные файлы interface.ts
// В файлах notesData и tagsData содержаться начальные состояния для нескольких заметок и ярлыков.
// Поиск и различные добавления/редактирования реализованы с помощью форм.
import "./App.css";
import { useState } from "react";
import { Grid } from "@mui/material";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Workspace from "./components/Workspace/Workspace";

import notesData from "./data/NotesData";
import tagsData from "./data/TagsData";

function App() {
  const [appName, setAppName] = useState("Keep");

  // состояния для заметок
  const [notes, setNotes] = useState(notesData);
  const [editing, setEditing] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [deletedNotes, setDeletedNotes] = useState<any>([]);
  const [viewTrash, setViewTrash] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchedNotes, setSearchedNotes] = useState([]);

  // состояния для ярлыков
  const [tags, setTags] = useState(tagsData);

  const initialTagState = { id: null, name: "" };

  const [currentTag, setCurrentTag] = useState(initialTagState);
  const [selectTag, setSelectTag] = useState(initialTagState);

  // функции для заметок

  const allNotes = () => {
    setSearching(false);
    setFiltering(false);
    setViewTrash(false);
    //@ts-ignore
    setCurrentTag("all");
    setAppName("Keep");
  };

  const viewDeletedNotes = () => {
    setFiltering(false);
    setViewTrash(true);
    setAppName("Корзина");
    //@ts-ignore
    setCurrentTag("trash");
  };

  // функции для ярлыков

  const filterTag = (i: number) => {
    setSearching(false);
    setViewTrash(false);
    setFiltering(true);
    //@ts-ignore
    setCurrentTag(tags[i].name);
    setAppName(tags[i].name);
    //@ts-ignore
    setFilteredNotes(notes.filter((note) => note.tag === tags[i].name));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <Header
            appName={appName}
            setSearching={setSearching}
            setSearchedNotes={setSearchedNotes}
            deletedNotes={deletedNotes}
            notes={notes}
          />
        </div>
        <Grid container style={{ gap: 20 }}>
          <Grid item lg={2} md={3} sm={4} xs={4}>
            <Sidebar
              tags={tags}
              setTags={setTags}
              currentTag={currentTag}
              selectTag={selectTag}
              setSelectTag={setSelectTag}
              filterTag={filterTag}
              allNotes={allNotes}
              viewDeletedNotes={viewDeletedNotes}
            />
          </Grid>
          <Grid item xs>
            <Workspace
              editing={editing}
              setEditing={setEditing}
              searching={searching}
              setSearching={setSearching}
              filtering={filtering}
              setFiltering={setFiltering}
              notes={notes}
              setNotes={setNotes}
              deletedNotes={deletedNotes}
              setDeletedNotes={setDeletedNotes}
              filteredNotes={filteredNotes}
              searchedNotes={searchedNotes}
              tags={tags}
              setCurrentTag={setCurrentTag}
              viewTrash={viewTrash}
              setViewTrash={setViewTrash}
              setAppName={setAppName}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
