import { useState } from "react";
import { AddTagsProps } from "./interfaces";

const AddTagsForm: (props: AddTagsProps) => JSX.Element = (
  props: AddTagsProps
) => {
  const initialState = { id: null, name: "", selected: false };

  const [tag, setTag] = useState(initialState);

  function changeHandler(event: { target: { name: string; value: string } }) {
    const { name, value } = event.target;
    setTag({ ...tag, [name]: value });
  }

  function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (!tag.name) {
      return;
    }
    props.addTag(tag);
    setTag(initialState);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={submitHandler} autoComplete="off">
        <input
          type="text"
          name="name"
          value={tag.name}
          onChange={changeHandler}
          placeholder="Добавить ярлык"
          className="tag-form"
          style={{ textAlign: "center" }}
        />
      </form>
    </div>
  );
};

export default AddTagsForm;
