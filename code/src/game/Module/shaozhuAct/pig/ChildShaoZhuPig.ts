/** sf is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildShaoZhuPig extends fairygui.GComponent {
	public c1: fairygui.Controller;
	public n23: fairygui.GImage;
	public n27: fairygui.GLoader;
	public n28: fairygui.GLoader;
	public n37: fairygui.GImage;
	public n33: fairygui.GImage;
	public n34: fairygui.GImage;
	public n35: fairygui.GImage;
	public n36: fairygui.GImage;
	public headYlq: fairygui.GImage;
	public btnGo0: Button0;
	public btnGo1: Button0;
	public btnBuy0: Button1;
	public btnBuy1: Button1;
	public btnLq: Button1;
	public lbTask1: fairygui.GRichTextField;
	public lbTask: fairygui.GRichTextField;
	public lbyuanbao0: fairygui.GRichTextField;
	public lbadd0: fairygui.GRichTextField;
	public lbyuanbao1: fairygui.GRichTextField;
	public lbadd1: fairygui.GRichTextField;
	public n38: fairygui.GRichTextField;
	public headIcon: fairygui.GLoader;
	public frameIcon: fairygui.GLoader;
	public page0: fairygui.GGroup;
	public n44: fairygui.GImage;
	public imgBanner: fairygui.GLoader;
	public n45: fairygui.GImage;
	public n48: fairygui.GImage;
	public n49: fairygui.GImage;
	public n50: fairygui.GImage;
	public n11: fairygui.GImage;
	public jnnn: fairygui.GRichTextField;
	public lbPro: fairygui.GRichTextField;
	public lbBuff: fairygui.GRichTextField;
	public lbAwards: fairygui.GRichTextField;
	public n17: fairygui.GRichTextField;
	public lbTime: fairygui.GRichTextField;
	public tab0: TabButton2;
	public tab1: TabButton2;
	public n16: fairygui.GList;
	public page2: fairygui.GGroup;

	public static URL: string = "ui://w5ll6n5jhsa2f";

	private static _instance: ChildShaoZhuPig;
	public static get instance(): ChildShaoZhuPig {
		const sf = this;
		if (!sf._instance) {
			sf._instance = <ChildShaoZhuPig><any>(fairygui.UIPackage.createObject("shaozhuAct", "ChildShaoZhuPig"));
		}
		return sf._instance;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.n16.callbackThisObj = self;
		self.n16.itemRenderer = self.taskRender;
		self.n16.setVirtual();
		self.setCfgDta();
	}

	private setCfgDta() {
		const sf = this;
		let chongzhiCFG = Config.shop_011;
		sf.btnBuy0.text = chongzhiCFG[42].explain;
		sf.btnBuy1.text = chongzhiCFG[43].explain;

		let pigCFG = Config.pig_272[1];
		sf.lbyuanbao0.text = BroadCastManager.reTxt("购买立返<font color='{0}'>{1}</font>", Color.TEXT_YELLOW, JSON.parse(pigCFG.reward)[0][2]);
		sf.lbadd0.text = "完成任务再送";

		let pigCFG1 = Config.pig_272[2];
		sf.lbyuanbao1.text = BroadCastManager.reTxt("购买立返<font color='{0}'>{1}</font>", Color.TEXT_YELLOW, JSON.parse(pigCFG1.reward)[0][2]);
		sf.lbadd1.text = "完成任务再送";
	}

	public decideToClose() {
		const sf = this;
		if (sf.c1.selectedIndex == 1) {
			sf.backToMain();
			return false;
		}
		return true;
	}

	private taskRender(idx, obj) {
		const sf = this;
		let item: ItemPig = obj as ItemPig;
		item.setdata(sf._data[idx]);
	}

	private backToMain() {
		let n = this;
		n.c1.selectedIndex = 0;
		n.updateView(0);
	}

	private goPage0() {
		let n = this;
		n._taskType = 0;
		n.updateView(n._taskType);
	}

	private checkTask(e: egret.Event) {
		let n = this;
		n._taskType = 0;
		e.stopImmediatePropagation();
		n.c1.selectedIndex = 1;
	}

	private checkTask1(e: egret.Event) {
		let n = this;
		n._taskType = 1;
		e.stopImmediatePropagation();
		n.c1.selectedIndex = 1;
	}

	private goPage1() {
		let n = this;
		n._taskType = 1;
		n.updateView(n._taskType);
	}

	private checkPage0() {
		const sf = this;
		sf._taskType = 0;
		sf.updateView(1);
	}

	private checkPage1() {
		const sf = this;
		sf._taskType = 1;
		sf.updateView(1);
	}

	private buy0() {
		GGlobal.modelchongzhi.CG_CHONGZHI_135(42);
	}

	private buy1() {
		GGlobal.modelchongzhi.CG_CHONGZHI_135(43);
	}

	private lqHeadHD() {
		if (GGlobal.modelShaoZhuAct.headst == 1) {
			GGlobal.modelShaoZhuAct.CG_GETHEAD_PIG();
		} else {
			ViewCommonWarn.text("尚未达到领取条件");
		}
	}

	private _data = [];
	updateView(page) {
		let n = this;
		let m = GGlobal.modelShaoZhuAct;
		let cfg = Config.pig_272;
		n.n16.scrollToView(0)
		n.n16.selectedIndex = 0
		if (n._taskType == 0) {
			n.tab0.selected = true;
			n.tab1.selected = false;
			n._data = m.silverPigtask_data;
			IconUtil.setImg(n.imgBanner, Enum_Path.IMAGE_URL + "shaozhuact/yingzhu.jpg");
			n.lbBuff.text = BroadCastManager.reTxt("元宝增幅：<font color='#15f234'>{0}%</font>", m.yuanbaoAddsilver);
			let yb = (m.yuanbaoAddsilver + 100) / 100 * (JSON.parse(cfg[1].cun)[0][2]) >> 0;
			n.lbAwards.text = yb + "";
			n.lbPro.text = "完成任务：<font color='#15f234'>" + m.silverCompleteCount + "/" + m.maxTask + "</font>";
		} else {
			n.tab0.selected = false;
			n.tab1.selected = true;
			n._data = m.GodPigtask_data;
			IconUtil.setImg(n.imgBanner, Enum_Path.IMAGE_URL + "shaozhuact/jingzhu.jpg");
			n.lbBuff.text = BroadCastManager.reTxt("元宝增幅：<font color='#15f234'>{0}%</font>", m.yuanbaoAddGod);
			let yb = ((m.yuanbaoAddGod + 100) / 100 * (JSON.parse(cfg[2].cun)[0][2])) >> 0;
			n.lbAwards.text = yb + "";
			n.lbPro.text = "完成任务：<font color='#15f234'>" + m.goldompleteCount + "/" + m.maxTask + "</font>";
		}
		n.n16.numItems = n._data.length;
	}

	public selectPage() {
		const sf = this;
		sf.updateView(sf._taskType);
	}

	private updateShow() {
		let m = GGlobal.modelShaoZhuAct;
		let n = this;
		n.btnGo0.visible = m.silverst != 0;
		n.btnGo1.visible = m.goldst != 0;
		n.btnBuy0.visible = m.silverst == 0;
		n.btnBuy1.visible = m.goldst == 0;
		n.headYlq.visible = m.headst == 2;
		n.btnLq.visible = m.headst != 2;
		n.btnLq.checkNotice = m.headst == 1;
		n.btnBuy0.checkNotice = true;
		n.btnBuy1.checkNotice = true;

		let bool1 = false;
		let bool2 = false;
		let len = m.silverPigtask_data.length;
		for (let i = 0; i < len; i++) {
			let data = m.silverPigtask_data[i];
			bool1 = data.st == 1;
			if (bool1) break;
		}
		len = m.GodPigtask_data.length;
		for (let i = 0; i < len; i++) {
			let data = m.GodPigtask_data[i];
			bool2 = data.st == 1;
			if (bool2) break;
		}
		n.btnGo0.checkNotice = n.tab0.checkNotice = bool1 && m.silverst == 1;
		n.btnGo1.checkNotice = n.tab1.checkNotice = bool2 && m.goldst == 1;
		n.updateView(n._taskType);
	}

	private onUpdate() {
		const sf = this;
		const datas = GGlobal.modelEightLock.getDatas();
		const act = ModelEightLock.originalDatas[UIConst.SHAOZHU_PIG];
		const end = act ? act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			sf.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			sf.lbTime.text = "00:00:00";
		}
	}

	disposePanel() {
		let n = this;
		n.eventFunction(0);
		n._taskType = 0;
		n.n16.numItems = 0;
		GGlobal.control.remove(UIConst.SHAOZHU_PIG, n.updateShow, n);
		IconUtil.setImg(n.n27, null);
		IconUtil.setImg(n.n28, null);
		IconUtil.setImg(n.imgBanner, null);
		IconUtil.setImg(n.frameIcon, null);
		IconUtil.setImg(n.headIcon, null);
	}

	private _taskType = 0;//0淫猪 1金猪
	show() {
		let n = this;
		let cfg = Config.xtcs_004[6202];
		let headcfg = Config.shezhi_707[cfg.num];
		IconUtil.setImg(n.headIcon, Enum_Path.HEAD_URL + headcfg.picture + ".png")
		IconUtil.setImg(n.frameIcon, Enum_Path.HEAD_URL + 2002 + ".png")
		n.eventFunction(1);
		GGlobal.modelEightLock.CG4571(UIConst.SHAOZHU_PIG);

		GGlobal.control.listen(UIConst.SHAOZHU_PIG, n.updateShow, n);
		n.c1.selectedIndex = 0;
		IconUtil.setImg(n.n27, Enum_Path.IMAGE_URL + "shaozhuact/pig1.png");
		IconUtil.setImg(n.n28, Enum_Path.IMAGE_URL + "shaozhuact/pig2.png");
	}

	eventFunction = (t) => {
		let self = this;
		let event = EventUtil.register;
		event(t, self.lbTask, EventUtil.TOUCH, self.checkTask, self);
		event(t, self.btnGo0, EventUtil.TOUCH, self.goPage0, self);
		event(t, self.btnGo1, EventUtil.TOUCH, self.goPage1, self);
		event(t, self.btnBuy0, EventUtil.TOUCH, self.buy0, self);
		event(t, self.btnBuy1, EventUtil.TOUCH, self.buy1, self);
		event(t, self.btnLq, EventUtil.TOUCH, self.lqHeadHD, self);
		event(t, self.lbTask1, EventUtil.TOUCH, self.checkTask1, self);
		event(t, self.tab0, EventUtil.TOUCH, self.checkPage0, self);
		event(t, self.tab1, EventUtil.TOUCH, self.checkPage1, self);
		event(t, self.c1, fairygui.StateChangeEvent.CHANGED, self.selectPage, self);
	}
}