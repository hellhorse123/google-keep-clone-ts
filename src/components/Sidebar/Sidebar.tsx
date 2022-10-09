// Sidebar - "aside" нашего SPA.
// В нем отображается вертикальное меню со всеми компонентам нашего SPA.
// Реализует логику добавления и редактирования ярлыков
// Для добавления ярлыка необходимо нажать на соответствующую кнопку, ввести в input названия и нажать "Enter"

import { useState } from "react";

import ViewTags from "../../components/Tags/ViewTags";
import AddTagsForm from "../../components/Forms/AddTagsForm";
import EditTagsForm from "../../components/Forms/EditTagsForm";
import { SidebarProps } from "./interface";

const Sidebar: (props: SidebarProps) => JSX.Element = (props: SidebarProps) => {
  const [tagEditing, setTagEditing] = useState(false);

  const addTag = (tag: { id: number }) => {
    tag.id = props.tags.length + 1;
    props.setTags([...props.tags, tag]);
  };

  const editTag = (tag: { id: number; name: string }) => {
    setTagEditing(true);
    props.setSelectTag({ id: tag.id, name: tag.name });
  };

  const updateTag = (id: number, updatedTag: number) => {
    setTagEditing(false);
    props.setTags(
      props.tags.map((tag: { id: number }) =>
        tag.id === id ? updatedTag : tag
      )
    );
  };

  const deleteTag = (id: number) => {
    setTagEditing(false);
    props.setTags(props.tags.filter((tag: { id: number }) => tag.id !== id));
  };

  return (
    <>
      <ViewTags
        tags={props.tags}
        filterTag={props.filterTag}
        editTag={editTag}
        currentTag={props.currentTag}
        allNotes={props.allNotes}
        viewDeletedNotes={props.viewDeletedNotes}
      />
      {tagEditing ? (
        <EditTagsForm
          currentTag={props.currentTag}
          selectTag={props.selectTag}
          updateTag={updateTag}
          deleteTag={deleteTag}
        />
      ) : (
        <AddTagsForm addTag={addTag} />
      )}
    </>
  );
};

export default Sidebar;
