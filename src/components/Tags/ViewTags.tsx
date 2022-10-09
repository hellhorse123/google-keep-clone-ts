import { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";

import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import { ViewTagsProps } from "./interface";

const ViewTags: (props: ViewTagsProps) => JSX.Element = (
  props: ViewTagsProps
) => {
  const [currentTag, setCurrentTag] = useState(props.currentTag);

  useEffect(() => {
    setCurrentTag(props.currentTag);
  }, [props]);

  return (
    <div className="tag-container">
      <div
        className={currentTag === "all" ? "tag-div-active" : "tag-div"}
        onClick={props.allNotes}
      >
        <span className="tag-icon">
          <EmojiObjectsOutlinedIcon />
        </span>
        <div className="tag-name">Заметки</div>
      </div>
      {props.tags.length > 0 &&
        props.tags.map(
          (tag: any, i: number) =>
            tag.name !== "" && (
              <div
                className={
                  tag.name === currentTag ? "tag-div-active" : "tag-div"
                }
                key={tag.id}
                onClick={() => props.filterTag(i)}
              >
                {tag.name !== "" && tag.name === currentTag ? (
                  <Tooltip title="Редактировать ярлык">
                    <IconButton
                      style={{ paddingTop: "11px", marginLeft: "-8px" }}
                      onClick={() => props.editTag(tag)}
                    >
                      <LabelOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <span className="tag-icon label-icon">
                    <LabelOutlinedIcon />
                  </span>
                )}

                <div className="tag-name"> {tag.name}</div>
              </div>
            )
        )}
      <div
        className={currentTag === "trash" ? "tag-div-active" : "tag-div"}
        onClick={() => props.viewDeletedNotes()}
      >
        <span className="tag-icon">
          <DeleteOutlineIcon />
        </span>
        <div className="tag-name">Корзина</div>
      </div>
    </div>
  );
};

export default ViewTags;
