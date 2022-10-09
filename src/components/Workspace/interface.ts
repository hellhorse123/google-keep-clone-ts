export interface WorkspaceProps {
  editing: any;
  searching: any;
  filtering: any;
  viewTrash: any;
  tags: any;
  deletedNotes: any;
  filteredNotes: any;
  searchedNotes: any;
  notes: any;
  setNotes: React.Dispatch<React.SetStateAction<any>>;
  setEditing: React.Dispatch<React.SetStateAction<any>>;
  setSearching: React.Dispatch<React.SetStateAction<any>>;
  setFiltering: React.Dispatch<React.SetStateAction<any>>;
  setDeletedNotes: React.Dispatch<React.SetStateAction<any>>;
  setViewTrash: React.Dispatch<React.SetStateAction<any>>;
  setCurrentTag: React.Dispatch<React.SetStateAction<any>>;
  setAppName: React.Dispatch<React.SetStateAction<any>>;
}
