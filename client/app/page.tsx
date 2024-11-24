"use client";
import Todo from "./component/Todo";
import useSWR from "swr";
import { TodoType } from "./types";
import { useRef } from "react";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}

export default function Home() {
  //SSRの場合のフェッチ方法
  // const allTodos = await fetch("API", { cache: "force-cache" });

  //useStateとは異なり、useRefでは値が変わっても際レンダリングされない
  const inputRef = useRef<HTMLInputElement | null>(null);

  // SWRによるキャッシュ
  const { data, isLoading, error, mutate } = useSWR(
    "http://localhost:8080/allTodos",
    fetcher
  );

  console.log(data);

  const hundleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8080/createTodo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: inputRef.current?.value, // 期待するキー名を確認
        isCompleted: false, // サーバーが受け入れるキーを送信
      }),
    });
    if (response.ok) {
      const newTodo = await response.json();
      mutate([...data, newTodo]);
      inputRef.current!.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Todoリスト</h1>

        {/* 入力フォーム */}
        <form onSubmit={hundleSubmit}>
          <div className="mb-6">
            <input
              type="text"
              placeholder="新しいタスクを入力..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={inputRef}
            />
            <button className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
              追加
            </button>
          </div>
        </form>

        {/* Todoリスト */}
        <ul className="space-y-3">
          {data?.map((todo: TodoType) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
}
