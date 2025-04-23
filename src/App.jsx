import React, { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const parseInput = () => {
    setLoading(true);
    setTimeout(() => {
      const title = input.match(/主标题为“(.+?)”/)?.[1] || "";
      const subtitle = input.match(/副标题为“(.+?)”/)?.[1] || "";
      const body = input.match(/正文为“(.+?)”/)?.[1] || "";
      const caption = input.match(/注释为“(.+?)”/)?.[1] || "";
      setData({ title, subtitle, body, caption });
      setLoading(false);
    }, 800); // 模拟生成延迟
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-6 border-r flex flex-col gap-4">
        <h1 className="text-xl font-semibold">🧠 对话输入</h1>
        <textarea
          rows="8"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='主标题为“xxx”，副标题为“xxx”，正文为“xxx”，注释为“xxx”'
          className="w-full p-3 border rounded resize-none"
        />
        <input type="file" onChange={handleImageUpload} />
        <button
          onClick={parseInput}
          className="self-start px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          ✅ 生成图文排版
        </button>
      </div>

      <div className="w-full md:w-1/2 p-6 overflow-y-auto bg-gray-50">
        {loading && (
          <div className="text-center text-gray-400 text-sm animate-pulse">生成中...</div>
        )}
        {data && !loading && (
          <motion.div
            className="space-y-6 max-w-xl mx-auto animate-slide-in"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold">{data.title}</h2>
            <h3 className="text-xl font-medium text-gray-700">{data.subtitle}</h3>
            <p className="text-base text-gray-800 leading-relaxed text-justify">{data.body}</p>
            {image && (
              <img
                src={image}
                alt="Uploaded"
                className="w-full rounded-lg object-cover h-64"
              />
            )}
            {data.caption && (
              <div className="text-sm text-gray-500 mt-2">{data.caption}</div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
