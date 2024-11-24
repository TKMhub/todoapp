"use client";
import Todo from "./component/Todo";
import useSWR from "swr";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}

export default function Home() {
  //SSRの場合のフェッチ方法
  // const allTodos = await fetch("API", { cache: "force-cache" });

  // SWRによるキャッシュ
  const { data, isLoading, error } = useSWR(
    "http://localhost:8080/allTodos",
    fetcher
  );

  console.log(data);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Todoリスト</h1>

        {/* 入力フォーム */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="新しいタスクを入力..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Todoリスト */}
        <ul className="space-y-3">
          <Todo />
        </ul>
      </div>
    </div>
  );
}
