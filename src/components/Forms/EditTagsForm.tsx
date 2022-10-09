import { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutline";
import CloseOutlinedIcon from "@mui/icons-material/Close";
import { EditTagsProps } from "./interfaces";

const EditTagsForm: (props: EditTagsProps) => JSX.Element = (
  props: EditTagsProps
) => {
  const [tag, setTag] = useState(props.selectTag);

  useEffect(() => {
    setTag(props.selectTag);
  }, [props]);

  function changeHandler(event: { target: { name: string; value: string } }) {
    const { name, value } = event.target;
    setTag({ ...tag, [name]: value });
  }

  function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (!tag.name) {
      return;
    }
    props.updateTag(tag.id, tag);
  }

  return (
    <form onSubmit={submitHandler} autoComplete="off">
      <input
        type="text"
        name="name"
        value={tag.name}
        onChange={changeHandler}
        placeholder="Обновить ярлык"
        className="tag-form edit-form"
        style={{ textAlign: "center" }}
      />
      <Tooltip title="Удалить ярлык">
        <IconButton onClick={() => props.deleteTag(tag.id)}>
          <DeleteOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Отмена">
        <IconButton>
          <button className="tag-close">
            <CloseOutlinedIcon fontSize="small" />
          </button>
        </IconButton>
      </Tooltip>
    </form>
  );
};

export default EditTagsForm;
