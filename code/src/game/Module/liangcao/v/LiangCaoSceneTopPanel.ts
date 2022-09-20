/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class LiangCaoSceneTopPanel extends fairygui.GComponent {

	public n17: fairygui.GImage;
	public n26: fairygui.GImage;
	public serverList: fairygui.GList;
	public n24: fairygui.GList;
	public n25: fairygui.GImage;
	public n23: fairygui.GRichTextField;
	public lbScore: fairygui.GRichTextField;
	public lbTime: fairygui.GRichTextField;
	public lbRefresh: fairygui.GRichTextField;

	public static URL: string = "ui://mbcu0qc0hd200";

	private static _inst: LiangCaoSceneTopPanel;
	public static createInstance(): LiangCaoSceneTopPanel {
		if (!this._inst) {
			this._inst = <LiangCaoSceneTopPanel><any>(fairygui.UIPackage.createObject("liangcao", "LiangCaoSceneTopPanel"));
		}
		return this._inst;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.serverList.callbackThisObj = self;
		self.serverList.itemRenderer = self.serverRenderHD;

		self.n24.callbackThisObj = self;
		self.n24.itemRenderer = self.bossRender;
	}

	maxScore = 0;
	serverRenderHD = (idx, obj) => {
		let item: LiangCaoScoreBar = obj as LiangCaoScoreBar;
		item.setdata(idx, 2, this.maxScore);
	}
	bossRender = (idx, obj) => {
		let item: LiangCaoHead = obj as LiangCaoHead;
		item.setdata(idx);
	}

	udpate = () => {
		let self = this;
		let model = GGlobal.modelLiangCao;
		self.maxScore = model.getMaxScore();
		self.serverList.numItems = 3;
		self.n24.numItems = 3;
	}

	timerHD = () => {
		let self = this;
		let model = GGlobal.modelLiangCao;
		let now = Model_GlobalMsg.getServerTime();
		self.lbRefresh.text = "";

		self.lbScore.text = "我的积分：" + model.myScore;

		if (model.remaindTime > now) {
			self.lbTime.text = "活动时间：" + DateUtil.getHMSBySecond2(((model.remaindTime - now) / 1000) >> 0, "::");
		} else {
			self.lbTime.text = "已结束，请主动退出活动";
		}

		let cfgTime = ConfigHelp.getSystemNum(7605);
		let monster = cfgTime - (((now - model.monsterFreshTime) / 1000) >> 0) % cfgTime;
		self.lbRefresh.text = "强盗刷新时间：" + DateUtil.getHMSBySecond2(monster, "::");
	}

	cShow = () => {
		let self = this;
		let pat = GGlobal.layerMgr.UI_MainBottom;
		pat.addChild(self);
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, GGlobal.layerMgr.uiAlign);

		self.udpate();
		GGlobal.control.listen(UIConst.LIANGCAO, self.udpate, self);
		Timer.listen(self.timerHD, self, 1000);
	}

	cHide = () => {
		let self = this;
		self.removeFromParent();
		GGlobal.control.remove(UIConst.LIANGCAO, self.udpate, self);
		Timer.remove(self.timerHD, self);
	}
}