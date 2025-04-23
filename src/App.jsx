import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="canvas-modern">
        <div className="title">代际性的制度革新</div>
        <div className="subtitle">变革与新生</div>
        <div className="editor-note">去年3月，外交公寓12号宣布成立新一届理事会...</div>
        <div className="centered-paragraph">“生存”这个词常与独立空间联系，反映现实挑战与生命力并存。</div>
        <div className="image-container">
          <img src="/templates/modern.png" alt="示例图片" className="article-image" />
          <div className="image-caption">刘辛夷，“应有掌声”展览现场</div>
          <div className="image-date">2019年4月28日至6月13日</div>
        </div>
      </div>
    </div>
  );
}
