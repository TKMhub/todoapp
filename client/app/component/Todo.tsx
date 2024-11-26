import React, { useState } from "react";
import { TodoType } from "../types";
import useSWR from "swr";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}

type TodoProps = {
  todo: TodoType;
};

const Todo = ({ todo }: TodoProps) => {
  const [isEditing, setIsEdting] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);

  const { data, isLoading, error, mutate } = useSWR(
    "http://localhost:8080/allTodos",
    fetcher
  );

  const hundleEdit = async () => {
    setIsEdting(!isEditing);

    console.log("isEditing", isEditing);
    if (isEditing) {
      const response = await fetch(
        `http://localhost:8080/edintTodo/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editedTitle, // 期待するキー名を確認
          }),
        }
      );
      if (response.ok) {
        const editedTodo = await response.json();
        mutate([...data, editedTodo]);
        setEditedTitle("");
      }
    }
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
