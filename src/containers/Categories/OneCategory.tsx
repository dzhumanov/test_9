import React from "react";
import { Category } from "../../types";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner";

interface Props {
  category: Category;
  onDelete: React.MouseEventHandler;
  deleteLoading: boolean | string;
}

const OneCategory: React.FC<Props> = ({
  category,
  onDelete,
  deleteLoading,
}) => {
  let color;
  if (category.type === "income") {
    color = "text-success";
  } else if (category.type === "expense") {
    color = "text-danger";
  }

  return (
    <div className="d-flex align-items-center">
      <h3 className={color}>{category.name}</h3>
      <p className="m-0 ms-3">{category.type}</p>
      <div className="btn-wrapper d-flex gap-3 ms-auto">
        <button className="btn btn-success">Edit</button>
        <button
          className="btn btn-danger"
          onClick={onDelete}
          disabled={deleteLoading ? deleteLoading === category.id : false}
        >
          {deleteLoading && deleteLoading === category.id && <ButtonSpinner />}
          Delete
        </button>
      </div>
    </div>
  );
};

export default OneCategory;
