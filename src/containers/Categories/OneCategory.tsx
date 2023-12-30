import React from "react";
import { Category } from "../../types";

interface Props{
    category: Category;
}

const OneCategory:React.FC<Props> = ({category}) => {
    return(
        <div>
            <h1>{category.name}</h1>
            <p>{category.type}</p>
        </div>
    )
}

export default OneCategory;