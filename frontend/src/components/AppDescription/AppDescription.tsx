const AppDescription: React.FC = () => {
  return (
    <div className="flex flex-col">
    <div className="font-mono mt-10 text-center font-bold text-7xl italic text-lime-600">Menu Maker</div>
    <div className="mt-10 md:text-xl  text-sm md:mx-auto mx-10" id="app-description">
    <p>
    最近よく見るQRコードで読み取って注文するための電子メニューを簡単に作成できるアプリです。</p>
    <p>
    個人経営の飲食店の方々のために作成しました。
    </p>
    <br></br>
    <p>お客様自身のスマ-トフォンで注文して頂くので、お店としてタブレットなどの初期費用はかかりません。</p>
    <p>導入のためにしなければならないことはメニューの作成とQRコードの設置のみです。</p>
    <br></br>
    <p>注文内容をデータベースで管理しており、売上を分析することができます。</p>
    <div></div>
    </div>
    <div className="mt-10 text-xl flex justify-center" id="function-description">
    <ul>
      <h1>機能</h1>
      <li>①メニュー作成</li>
      <li>②注文管理</li>
      <li>③お会計管理</li>
      <li>④売上分析</li>
    </ul>
    </div>
    </div>
  )
};

export { AppDescription };
