export interface HeaderProps {
  appName: string;
  setSearching: React.Dispatch<React.SetStateAction<any>>;
  setSearchedNotes: React.Dispatch<React.SetStateAction<any>>;
  deletedNotes: Array<String>;
  notes: Array<Object>;
}
