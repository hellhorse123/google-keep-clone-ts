export interface SidebarProps {
  tags: any;
  setTags: React.Dispatch<React.SetStateAction<any>>;
  currentTag: any;
  filterTag: any;
  selectTag: any;
  setSelectTag: React.Dispatch<React.SetStateAction<any>>;
  allNotes: any;
  viewDeletedNotes: any;
}
