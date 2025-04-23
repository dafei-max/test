import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function App() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [parsed, setParsed] = useState(null);
  const outputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const extractInfo = () => {
    const lines = input.split(/\n|。|！|？/).filter(l => l.trim().length > 5);
    const title = lines[0]?.trim() || "未命名标题";
    const subtitle = lines[1]?.trim() || "副标题";
    const body = lines.slice(2, 4).join("。");
    const caption = lines.slice(4).join("。");
    setParsed({ title, subtitle, body, caption });
  };

  const exportAsImage = async () => {
    const canvas = await html2canvas(outputRef.current);
    const link = document.createElement("a");
    link.download = "layout.jpg";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  };

  const exportAsPDF = async () => {
    const canvas = await html2canvas(outputRef.current);
    const imgData = canvas.toDataURL("image/jpeg");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [540, 900]  // 3:5 尺寸
    });
    pdf.addImage(imgData, "JPEG", 0, 0, 540, 900);
    pdf.save("layout.pdf");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-6 border-r space-y-4">
        <h1 className="text-xl font-bold">🧠 AI 智能结构提取</h1>
        <textarea
          rows="10"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="请输入一段文字，系统将自动识别标题、副标题、正文和图注"
          className="w-full p-3 border rounded"
        />
        <input type="file" onChange={handleImageUpload} />
        <div className="flex gap-2">
          <button onClick={extractInfo} className="px-4 py-2 bg-black text-white rounded">
            生成排版
          </button>
          <button onClick={exportAsImage} className="px-4 py-2 border rounded">
            导出 JPG
          </button>
          <button onClick={exportAsPDF} className="px-4 py-2 border rounded">
            导出 PDF
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-gray-100 p-4 overflow-auto flex justify-center items-center">
        <div
          ref={outputRef}
          className="relative bg-white w-[540px] h-[900px] p-6 shadow rounded-lg space-y-4 overflow-hidden"
        >
          {parsed && (
            <>
              <Draggable bounds="parent">
                <h1 className="text-3xl font-bold">{parsed.title}</h1>
              </Draggable>
              <Draggable bounds="parent">
                <h2 className="text-xl font-medium text-gray-700">{parsed.subtitle}</h2>
              </Draggable>
              <Draggable bounds="parent">
                <p className="text-base text-gray-800 leading-relaxed text-justify">{parsed.body}</p>
              </Draggable>
              {image && (
                <Draggable bounds="parent">
                  <img
                    src={image}
                    alt="upload"
                    className="w-full rounded-lg object-cover h-48"
                  />
                </Draggable>
              )}
              <Draggable bounds="parent">
                <div className="text-sm text-gray-500">{parsed.caption}</div>
              </Draggable>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
