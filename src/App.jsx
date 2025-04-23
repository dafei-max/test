import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function App() {
  const [title, setTitle] = useState("Part One\n代际性的制度革新\n变革与新生");
  const [paragraph1, setParagraph1] = useState("编辑按：去年3月，外交公寓12号（以下简称DRC NO. 12）宣布成立新一届理事会，同时创始人彭晓阳将空间的所有权及相关权益交给理事会。一个独立空间在即将进入第十年之际进行这样的自我变革，让北京独立空间的“生存”状态又一次进入我们的视野。");
  const [paragraph2, setParagraph2] = useState("“生存”这个常常与独立空间联系在一起的词总是令人紧张，也确实符合独立空间所面临的常见挑战：资源不足、物理空间缺乏长期保障、运营稳定性与创始人个人状态密切相关……但同时，与挑战常伴的状态也赋予了独立空间不断解决问题的生命力。除了主动进行具有理想主义色彩的代际性制度改革的DRC NO.");
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("刘辛夷，“应有掌声”展览现场\n2019年4月28日至6月13日");

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
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <div className="text-4xl font-bold whitespace-pre-line leading-snug text-neutral-800">
        {title}
      </div>

      <div className="space-y-4 text-[#9B5A1E] text-base leading-relaxed text-justify">
        <p>{paragraph1}</p>
        <p>{paragraph2}</p>
      </div>

      <div className="space-y-2">
        {image && (
          <img
            src={image}
            alt="Uploaded"
            className="rounded-xl w-full h-72 object-cover"
          />
        )}
        <div className="text-sm text-[#C0A98E] whitespace-pre-line">{caption}</div>
      </div>

      <div className="mt-10 space-y-4 border-t pt-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="输入主标题（支持换行）"
          className="w-full p-2 border rounded"
        />
        <textarea
          rows="4"
          value={paragraph1}
          onChange={(e) => setParagraph1(e.target.value)}
          placeholder="输入第一段正文"
          className="w-full p-2 border rounded"
        />
        <textarea
          rows="4"
          value={paragraph2}
          onChange={(e) => setParagraph2(e.target.value)}
          placeholder="输入第二段正文"
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          onChange={handleImageUpload}
          className="block"
        />
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="图片下方图注"
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
}
