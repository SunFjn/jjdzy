/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildShaoZhuHongBao extends fairygui.GComponent {

	public c1: fairygui.Controller;
	public n9: fairygui.GImage;
	public n10: fairygui.GImage;
	public n11: fairygui.GImage;
	public n12: fairygui.GLoader;
	public btnChai: fairygui.GLoader;
	public n0: fairygui.GList;
	public n3: HongBaoLabel;
	public list0: fairygui.GList;
	public list1: fairygui.GList;
	public n13: fairygui.GLoader;
	public lbTime: fairygui.GRichTextField;
	public n16: fairygui.GImage;
	public n17: fairygui.GImage;
	public n18: fairygui.GImage;

	public static URL: string = "ui://w5ll6n5jhsa2h";

	private static _instance: ChildShaoZhuHongBao;
	public static get instance(): ChildShaoZhuHongBao {
		if (!this._instance) {
			this._instance = <ChildShaoZhuHongBao><any>(fairygui.UIPackage.createObject("shaozhuAct", "ChildShaoZhuHongBao"));
		}
		return this._instance;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		self.n0.callbackThisObj = self;
		self.n0.itemRenderer = self.dayTabHD;
		self.list0.callbackThisObj = self;
		self.list0.itemRenderer = self.bigAwardsHD;
		self.list1.callbackThisObj = self;
		self.list1.itemRenderer = self.defaultAwardsHD;
	}

	private dayTabHD(idx, obj) {
		let a = this;
		let tab: fairygui.GButton = obj as fairygui.GButton;
		tab.data = idx + 1;
		tab.text = BroadCastManager.reTxt("第{0}天", idx + 1);
		let m = GGlobal.modelShaoZhuAct;
		let currentDay = m.hongbaoDay;
		let data = m.hongbao_data[idx + 1];
		if (data) {
			tab.getChild("noticeImg").visible = currentDay >= idx + 1 && data.st == 1;
			tab.getChild("imgYlq").visible = data.st == 2;
			tab.enabled = idx + 1 <= currentDay;
		}
	}

	private bigAwardsHD(idx, obj) {
		let item: ViewGridRender = obj as ViewGridRender;
		item.grid.isShowEff = true;
		item.tipEnabled = true;
		let vo = ConfigHelp.makeItem(this._bigAwards[idx]);
		vo.extra = 5;
		item.vo = vo;
	}

	private defaultAwardsHD(idx, obj) {
		let item: ViewGrid = obj as ViewGrid;
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = ConfigHelp.makeItem(this._defaultAwards[idx]);
	}

	private listHandle(evt: fairygui.ItemEvent) {
		let a = this;
		let tab = evt.itemObject as fairygui.GButton;
		a.updateChildShow(tab.data);
	}

	updateChildShow(day) {
		let a = this;
		a.currentDay = day;
		a.n13.url = ["", "ui://w5ll6n5jpdzwl", "ui://w5ll6n5jpdzwo", "ui://w5ll6n5jpdzwn", "ui://w5ll6n5jpdzwr", "ui://w5ll6n5jpdzwp", "ui://w5ll6n5jpdzwq", "ui://w5ll6n5jpdzwm"][day];
		this.n0.numItems = 7;
		let m = GGlobal.modelShaoZhuAct;
		let data = m.hongbao_data[day];
		if (!data) return;
		if (data.st == 2) {
			this.c1.selectedIndex = 1;
			let totalArr = data.items;
			a._bigAwards = [];
			a._defaultAwards = [];
			let ii = 0;
			let len = totalArr.length;
			for (ii = 0; ii < len; ii++) {
				let item = totalArr[ii]
				if (item[3] == 1) {
					a._bigAwards.push(item);
				} else {
					a._defaultAwards.push(item);
				}
			}
			this.list0.numItems = a._bigAwards.length;
			this.list1.numItems = a._defaultAwards.length;
		} else {
			this.c1.selectedIndex = 0;
		}
		this.n18.visible = data.st == 1;
		this.updatelog();
	}

	private GC_LQ(a) {
		let arr = [];
		let len = a.length;
		for (let i = 0; i < len; i++) {
			let vo = {};
			vo['item'] = ConfigHelp.makeItem(a[i]);
			vo["isBig"] = a[i][3] == 1;
			arr.push(vo);
		}
		GGlobal.layerMgr.open(UIConst.SHAOZHU_HONGBAO_AWARDS, arr);
		this.updateChildShow(this.currentDay);
	}

	private GC_OPEN() {
		let self = this;
		self.currentDay = GGlobal.modelShaoZhuAct.hongbaoDay;
		self.n0.selectedIndex = self.currentDay - 1;
		self.n0.scrollToView(self.currentDay - 1);
		self.updateChildShow(self.currentDay);
	}

	private updatelog() {
		let n = this;
		let str = '';
		let m = GGlobal.modelShaoZhuAct;
		let len = m.hongbao_log.length;
		for (let i = 0; i < len; i++) {
			let item = m.hongbao_log[i];
			let name = ConfigHelp.getItemColorName(item[2]);
			str += BroadCastManager.reTxt("<font color='{0}'>{1}</font> 开启红包获得了惊喜大奖 {2}*{3}", Color.YELLOWSTR, item[0], name, item[3]);
			if (i < len - 1) {
				str += "\n";
			}
		}
		n.n3.setText(str);
		n.n3.reScroll();
	}

	private CG_GET() {
		GGlobal.modelShaoZhuAct.CG_GET_HONGBAO(this.currentDay);
	}

	private onUpdate() {
		const datas = GGlobal.modelEightLock.getDatas();
		const act = ModelEightLock.originalDatas[UIConst.SHAOZHU_HONGBAO];
		const end = act ? act.end : 0;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getMSBySecond4(end - servTime) + "</font>";
		} else {
			this.lbTime.text = "00:00:00";
		}
	}

	disposePanel() {
		let self = this;
		self.n0.removeEventListener(fairygui.ItemEvent.CLICK, self.listHandle, self);
		GGlobal.control.remove(UIConst.SHAOZHU_HONGBAO_AWARDS, self.GC_LQ, self);
		GGlobal.control.remove(UIConst.SHAOZHU_HONGBAO, self.GC_OPEN, self);
		self.btnChai.removeClickListener(self.CG_GET, self);
		self.n0.numItems = 0;
		self.list0.numItems = 0;
		self.list1.numItems = 0;
		IconUtil.setImg(self.n12, null);
		IconUtil.setImg(self.btnChai, null);
	}

	private currentDay = 1;
	private _bigAwards = [];
	private _defaultAwards = [];
	show() {
		let self = this;
		self.n0.numItems = 7;
		GGlobal.modelEightLock.CG4571(UIConst.SHAOZHU_HONGBAO);
		self.n0.addEventListener(fairygui.ItemEvent.CLICK, self.listHandle, self);
		GGlobal.control.listen(UIConst.SHAOZHU_HONGBAO_AWARDS, self.GC_LQ, self);
		GGlobal.control.listen(UIConst.SHAOZHU_HONGBAO, self.GC_OPEN, self);
		self.btnChai.addClickListener(this.CG_GET, this);
		IconUtil.setImg(self.n12, Enum_Path.IMAGE_URL + "shaozhuact/hongbaobg.png");
		IconUtil.setImg(self.btnChai, Enum_Path.IMAGE_URL + "shaozhuact/hongbaochai.jpg");
	}
}