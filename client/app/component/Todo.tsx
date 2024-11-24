import React from "react";

const Todo = () => {
  return (
    <div>
      <li className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <input type="checkbox" className="h-5 w-5 rounded border-gray-300" />
          <span className="text-gray-700">サンプルタスク</span>
        </div>
        <button className="text-red-500 hover:text-red-700">
          <span className="text-sm">削除</span>
        </button>
      </li>
    </div>
  );
};

export default Todo;
