export interface AddNotesProps {
  addNote: any;
  tags: any;
}

export interface EditNotesProps {
  tags: any;
  setEditing: React.Dispatch<React.SetStateAction<any>>;
  currentNote: any;
  updateNote: any;
}

export interface AddTagsProps {
  addTag: any;
}

export interface EditTagsProps {
  currentTag: any;
  selectTag: any;
  updateTag: any;
  deleteTag: any;
}
