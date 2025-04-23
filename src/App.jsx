import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

export default function App() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid gap-6">
      <h1 className="text-2xl font-bold">Canvas 自动排版工具</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded-xl space-y-4 shadow">
          <input
            type="text"
            placeholder="主标题"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="副标题"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            rows={6}
            placeholder="正文内容"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <label className="flex items-center gap-2 cursor-pointer">
            <UploadCloud className="w-5 h-5" />
            <span>上传图片</span>
            <input type="file" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>

        <div className="border p-4 rounded-xl shadow space-y-4">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-3xl font-bold" style={{ lineHeight: '1.5' }}>
              {title || "主标题预览"}
            </h2>
            <h3 className="text-xl font-medium text-gray-700">
              {subtitle || "副标题预览"}
            </h3>
            <p className="text-base text-gray-800 leading-relaxed">
              {body || "这里是正文内容的预览。请输入一些文字内容以查看效果。"}
            </p>
            {image && (
              <img
                src={image}
                alt="Uploaded"
                className="rounded-xl w-full object-cover"
                style={{ aspectRatio: "16/9" }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
