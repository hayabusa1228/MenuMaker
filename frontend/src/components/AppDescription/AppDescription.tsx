const AppDescription: React.FC = () => {
  return (
    <div className="flex flex-col">
    <div className="font-mono mt-10 text-center font-bold text-7xl italic text-lime-600">Menu Maker</div>
    <div className="mt-10 text-center text-xl" id="app-description">
    <div>簡単にメニューを作成できるアプリです。</div>
    <div>個人経営の飲食店の方々のために作成しました。</div>
    </div>
    <div className="mt-10 text-xl flex justify-center" id="function-description">
    <ul>
      <h1>機能</h1>
      <li>①メニュー作成</li>
      <li>②注文</li>
      <li>③お会計</li>
      <li>④売上分析</li>
    </ul>
    </div>
    </div>
  )
};

export { AppDescription };
