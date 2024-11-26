import React, { useState } from "react";
import { TodoType } from "../types";
import { useTodos } from "../hooks/useTodos";
import useSWR, { mutate } from "swr";
import { API_URL } from "@/constants/url";

type TodoProps = {
  todo: TodoType;
};

const Todo = ({ todo }: TodoProps) => {
  const [isEditing, setIsEdting] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);
  const { todos, isLoading, error, mutate } = useTodos();

  const hundleEdit = async () => {
    setIsEdting(!isEditing);

    console.log("isEditing", isEditing);
    if (isEditing) {
      const response = await fetch(
        `${API_URL}/editedTodo/${todo.id}`,
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
        const updatedTodos = todos.map((todo: TodoType) =>
          todo.id === editedTodo.id ? editedTodo : todo
        );
        mutate(updatedTodos);
        setEditedTitle("");
      }
    }
  };
  const handleDelete = async (id: number) => {
    const response = await fetch(
      `${API_URL}/deleteTodo/${todo.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      const updatedTodos = todos.filter((todo: TodoType) => todo.id !== id);
      mutate(updatedTodos);
    }
  };

  const toggleTodoCompleted = async (id: number, isCompleted: boolean) => {
    const response = await fetch(
      ``${API_URL}/editedTodo/${todo.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isCompleted: !isCompleted, // 期待するキー名を確認
        }),
      }
    );
    if (response.ok) {
      const editedTodo = await response.json();
      const updatedTodos = todos.map((todo: TodoType) =>
        todo.id === editedTodo.id ? editedTodo : todo
      );
      mutate(updatedTodos);
      setEditedTitle("");
    }
  };

  return (
    <div>
      <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="h-5 w-5 rounded border-gray-300"
            onChage={() => toggleTodoCompleted(todo.id, todo.isCompleted)}
          />
          {isEditing ? (
            <input
              type="text"
              className="border rounded py-1 px-2"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <span
              className={`text-gray-700"${
                todo.isCompleted ? "line-through" : ""
              }}`}
            >
              {todo.title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={hundleEdit}
          >
            <span className="text-sm">{isEditing ? "保存" : "編集"}</span>
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(todo.id)}
          >
            <span className="text-sm">削除</span>
          </button>
        </div>
      </li>
    </div>
  );
};

export default Todo;
