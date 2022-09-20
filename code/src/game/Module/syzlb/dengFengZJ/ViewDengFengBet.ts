class ViewDengFengBet extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public lbTip0: fairygui.GRichTextField;
	public lbTip1: fairygui.GRichTextField;
	public lbTip2: fairygui.GRichTextField;
	public btn: fairygui.GButton;
	public lbCt: fairygui.GRichTextField;
	public lbSt: fairygui.GRichTextField;
	public pageTxt: fairygui.GRichTextField;
	public btnLeft: fairygui.GButton;
	public btnRight: fairygui.GButton;
	public imgCt: fairygui.GImage;

	public static URL: string = "ui://3o8q23uujo891s";

	public static createInstance(): ViewDengFengBet {
		return <ViewDengFengBet><any>(fairygui.UIPackage.createObject("syzlb", "ViewDengFengBet"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("syzlb", "ViewDengFengBet").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.renderItm
		super.childrenCreated();
	}
	private _betArr: Vo_DengFengZJ[];
	protected onShown(): void {
		let s = this;
		// s.update();
		s.registerEvent(true);
		let m = GGlobal.modelDengFengZJ
		m.CG_GET_PREDICT()
		m.finalChaiID = 0;
		//下注消耗
		s.lbCt.text = JSON.parse(ConfigHelp.getSystemDesc(8304))[0][2] + "";
		let ct1 = JSON.parse(ConfigHelp.getSystemDesc(8305))[0][2] + "";
		let ct2 = JSON.parse(ConfigHelp.getSystemDesc(8306))[0][2] + "";
		// s.lbTip1.text = HtmlUtil.fontNoSize("下对", "#18F02C") + "获得       " + ct1 + "，" + HtmlUtil.fontNoSize("下错", "#ff0000") + "获得       " + ct2
		s.lbTip1.text = ct1 + "，" + HtmlUtil.fontNoSize("下错", "#ff0000") + "获得"
		s.lbTip2.text = "" + ct2
	}

	protected onHide(): void {
		let s = this;
		s.list.numItems = 0;
		s.registerEvent(false);
		let m = GGlobal.modelDengFengZJ
		m.finalChaiID = 0;
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		let m = GGlobal.modelDengFengZJ
		m.register(pFlag, Model_DengFengZJ.BET_DAT, self.update, self);
		m.register(pFlag, Model_DengFengZJ.BET_SUC, self.upSuc, self);

		EventUtil.register(pFlag, self.btn, egret.TouchEvent.TOUCH_TAP, self.onBet, self);
		EventUtil.register(pFlag, self.btnLeft, egret.TouchEvent.TOUCH_TAP, self.onLeft, self);
		EventUtil.register(pFlag, self.btnRight, egret.TouchEvent.TOUCH_TAP, self.onRight, self);
		EventUtil.register(pFlag, self.list, fairygui.ItemEvent.CLICK, self.onLstSel, self);
	}

	private update() {
		let s = this;
		let m = GGlobal.modelDengFengZJ
		s._betArr = m.finalBetArr
		s.upSuc()

		s._totalPage = s._betArr.length > 0 ? Math.ceil(s._betArr.length / 12) : 1
		s._curPage = 1
		s.upPage()
	}

	private upSuc() {
		let s = this;
		let m = GGlobal.modelDengFengZJ

		s.list.touchable = m.finalBetId == 0;

		if (m.getBetStatus()) {
			s.lbSt.text = "已下注"
			s.lbSt.color = Color.GREENINT;
			s.lbSt.visible = m.finalBetId > 0;
			s.lbCt.visible = m.finalBetId == 0;
			s.imgCt.visible = m.finalBetId == 0;
			s.btn.visible = m.finalBetId == 0;
		} else {
			s.lbSt.text = "已超时";
			s.lbSt.color = Color.REDINT;
			s.lbSt.visible = true;

			s.lbCt.visible = false;
			s.imgCt.visible = false;
			s.btn.visible = false;
		}
	}

	private _curPage = 1
	private _totalPage = 1

	private renderItm(index, obj: VDengFengBet) {
		obj.vo = this._betArr[index + (this._curPage - 1) * 12]
	}

	private onBet() {
		let m = GGlobal.modelDengFengZJ
		if (!m.finalChaiID) {
			ViewCommonWarn.text("没有选择玩家");
			return;
		}
		if (m.finalBetId > 0) {
			ViewCommonWarn.text("已下注");
			return;
		}
		GGlobal.modelDengFengZJ.CG_BET(m.finalChaiID);
	}

	/**
	 * 左翻页事件
	 */
	private onLeft(e: egret.TouchEvent): void {
		let s = this
		s._curPage--;
		if (s._curPage < 1) {
			s._curPage = 1;
		}
		this.upPage()
	}

	/**
	 * 右翻页事件
	 */
	private onRight(e: egret.TouchEvent): void {
		let s = this
		s._curPage++;
		if (s._curPage > s._totalPage) {
			s._curPage = s._totalPage;
		}
		s.upPage()
	}

	private upPage() {
		let s = this;
		let m = GGlobal.modelDengFengZJ
		s.pageTxt.text = s._curPage + "/" + s._totalPage;

		let len = s._betArr ? s._betArr.length : 0;
		if (len > 12) len = 12;
		s.list.numItems = len
		let selIdx = -1
		for (let i = 0; i < 12; i++) {
			let v = s._betArr[i + (s._curPage - 1) * 12]
			if (!v) {
				break;
			}
			if (v.plyId == m.finalBetId) {
				selIdx = i;
				break;
			}
		}
		s.list.selectedIndex = selIdx;
	}

	private _preSel: VDengFengBet
	private onLstSel(e: fairygui.ItemEvent): void {
		let s = this;
		if (s._preSel) {
			s._preSel.check.selected = false;
		}
		var vSel = e.itemObject as VDengFengBet
		vSel.check.selected = true;
		let m = GGlobal.modelDengFengZJ
		if (vSel.vo) {
			m.finalChaiID = vSel.vo.plyId;
		}
		s._preSel = vSel
	}
}