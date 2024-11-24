import React, { useState } from "react";
import { TodoType } from "../types";

type TodoProps = {
  todo: TodoType;
};

const Todo = ({ todo }: TodoProps) => {
  const [isEditing, setIsEdting] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);

  const hundleEdit = () => {
    setIsEdting(!isEditing);
  };

  return (
    <div>
      <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
          {isEditing ? (
            <input
              type="text"
              className="border rounded py-1 px-2"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <span className="text-gray-700">{todo.title}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={hundleEdit}
          >
            <span className="text-sm">{isEditing ? "保存" : "編集"}</span>
          </button>
          <button className="text-red-500 hover:text-red-700">
            <span className="text-sm">削除</span>
          </button>
        </div>
      </li>
    </div>
  );
};

export default Todo;
