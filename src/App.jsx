import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const templates = {
  modern: {
    name: "现代简约风",
    className: "text-left space-y-4"
  },
  business: {
    name: "商务专业风",
    className: "text-justify space-y-4 font-serif"
  },
  creative: {
    name: "创意活泼风",
    className: "text-left space-y-2 italic text-orange-700"
  },
  magazine: {
    name: "杂志风格",
    className: "text-justify space-y-4 tracking-wide"
  }
};

export default function App() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);
  const [parsed, setParsed] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
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
      format: [540, 900]
    });
    pdf.addImage(imgData, "JPEG", 0, 0, 540, 900);
    pdf.save("layout.pdf");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-6 border-r space-y-4">
        <h1 className="text-xl font-bold">🎨 样式模板选择</h1>
        <textarea
          rows="10"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入自然语言段落，我将提取出结构自动排版"
          className="w-full p-3 border rounded"
        />
        <input type="file" onChange={handleImageUpload} />
        <div className="flex gap-2 flex-wrap">
          {Object.entries(templates).map(([key, tpl]) => (
            <button
              key={key}
              className={\`px-3 py-1 rounded border \${selectedTemplate === key ? "bg-black text-white" : "bg-white"}\`}
              onClick={() => setSelectedTemplate(key)}
            >
              {tpl.name}
            </button>
          ))}
        </div>
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
          className={\`bg-white w-[540px] h-[900px] p-6 shadow rounded-lg overflow-hidden \${templates[selectedTemplate].className}\`}
        >
          {parsed && (
            <>
              <h1 className="text-3xl font-bold">{parsed.title}</h1>
              <h2 className="text-xl text-gray-700">{parsed.subtitle}</h2>
              <p className="text-base text-gray-800 leading-relaxed">{parsed.body}</p>
              {image && (
                <img
                  src={image}
                  alt="upload"
                  className="w-full rounded-lg object-cover h-48 mt-2"
                />
              )}
              <div className="text-sm text-gray-500 mt-2">{parsed.caption}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
