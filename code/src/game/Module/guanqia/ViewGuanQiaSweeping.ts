/** s is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewGuanQiaSweeping extends UIModalPanel {

	public c1: fairygui.Controller;
	public frame: fairygui.GLabel;
	public imgBG: fairygui.GLoader;
	public n10: fairygui.GImage;
	public btnSweep: fairygui.GButton;
	public lbTip: fairygui.GRichTextField;
	public lbCount: fairygui.GRichTextField;
	public n16: fairygui.GTextField;
	public n23: ViewGridRender;
	public n24: ViewGridRender;
	public n25: ViewGridRender;
	public n26: ViewGridRender;
	public n27: ViewGridRender;
	public n28: fairygui.GGroup;
	public n29: fairygui.GList;
	public n31: fairygui.GImage;
	public n32: fairygui.GImage;
	public n33: fairygui.GRichTextField;
	public n30: Button1;
	public n34: fairygui.GButton;
	public n36: fairygui.GRichTextField;
	public n37: fairygui.GRichTextField;
	public n38: fairygui.GGroup;

	public static URL: string = "ui://r92dp953u94lr";

	public static createInstance(): ViewGuanQiaSweeping {
		return <ViewGuanQiaSweeping><any>(fairygui.UIPackage.createObject("guanqia", "ViewGuanQiaSweeping"));
	}

	public constructor() {
		super();
		let s = this;
		s.loadRes("guanqia", "guanqia_atlas0");
		s.isShowOpenAnimation = false;
	}

	protected childrenCreated(): void {
		GGlobal.createPack("guanqia");
		let s = this;
		s.view = fairygui.UIPackage.createObject("guanqia", "ViewGuanQiaSweeping").asCom;
		s.contentPane = s.view;

		s.c1 = s.view.getController("c1");
		s.frame = <fairygui.GLabel><any>(s.view.getChild("frame"));
		s.imgBG = <fairygui.GLoader><any>(s.view.getChild("imgBG"));
		s.n10 = <fairygui.GImage><any>(s.view.getChild("n10"));
		s.btnSweep = <fairygui.GButton><any>(s.view.getChild("btnSweep"));
		s.lbTip = <fairygui.GRichTextField><any>(s.view.getChild("lbTip"));
		s.lbCount = <fairygui.GRichTextField><any>(s.view.getChild("lbCount"));
		s.n16 = <fairygui.GTextField><any>(s.view.getChild("n16"));
		s.n23 = <ViewGridRender><any>(s.view.getChild("n23"));
		s.n24 = <ViewGridRender><any>(s.view.getChild("n24"));
		s.n25 = <ViewGridRender><any>(s.view.getChild("n25"));
		s.n26 = <ViewGridRender><any>(s.view.getChild("n26"));
		s.n27 = <ViewGridRender><any>(s.view.getChild("n27"));
		s.n28 = <fairygui.GGroup><any>(s.view.getChild("n28"));
		s.n29 = <fairygui.GList><any>(s.view.getChild("n29"));
		s.n31 = <fairygui.GImage><any>(s.view.getChild("n31"));
		s.n32 = <fairygui.GImage><any>(s.view.getChild("n32"));
		s.n33 = <fairygui.GRichTextField><any>(s.view.getChild("n33"));
		s.n30 = <Button1><any>(s.view.getChild("n30"));
		s.n34 = <fairygui.GButton><any>(s.view.getChild("n34"));
		s.n36 = <fairygui.GRichTextField><any>(s.view.getChild("n36"));
		s.n37 = <fairygui.GRichTextField><any>(s.view.getChild("n37"));
		s.n38 = <fairygui.GGroup><any>(s.view.getChild("n38"));
		s.grids = [s.n23, s.n24, s.n25, s.n26, s.n27];
		super.childrenCreated();
		s.resetPosition();

		s.n29.setVirtual();
		s.n29.callbackThisObj = s;
		s.n29.itemRenderer = s.itemRender;
	}

	private itemRender(idx, obj) {
		let item: ViewGridRender = obj as ViewGridRender;
		item.grid.showEff(true);
		item.tipEnabled = true;
		item.vo = this._awards[idx];
	}

	private onVIP() {
		this.onCloseHandler();
		GGlobal.layerMgr.open(UIConst.VIP);
	}

	private _awards;
	private changeMode(awards) {
		this.c1.setSelectedIndex(1);
		this._awards = awards;
		this.n29.numItems = awards.length;
	}

	private onSweeping() {
		let m = GGlobal.modelGuanQia;
		if (m.SDCount < m.totalSD) {
			let r = GGlobal.modelGuanQia.challBossWithCond();
			if (r) {
				let lib = Config.clear_205;
				let cost = lib[m.SDCount + 1].xh;
				let yb = JSON.parse(cost)[0][2];
				if (yb == 0) {
					this.sweepToServ();
				} else {
					let b = ConfigHelp.checkEnough(cost, true);
					if (b) {
						ViewAlert.show("是否消耗<font color='#ffc334'>" + JSON.parse(cost)[0][2] + "元宝</font>扫荡？", Handler.create(this, this.sweepToServ), ViewAlert.OKANDCANCEL);
					}
				}
			}
		} else ViewCommonWarn.text("没有扫荡次数");
	}

	private DirectSweeping() {
		let m = GGlobal.modelGuanQia;
		if (m.SDCount < m.totalSD) {
			let r = GGlobal.modelGuanQia.challBossWithCond();
			if (r) {
				let lib = Config.clear_205;
				let cost = lib[m.SDCount + 1].xh;
				let yb = JSON.parse(cost)[0][2];
				if (yb == 0) {
					this.sweepToServ();
				} else {
					let b = ConfigHelp.checkEnough(cost, true);
					if (b) {
						this.sweepToServ();
					} else {
						ModelChongZhi.guideToRecharge();
					}
				}
			}
		} else ViewCommonWarn.text("没有扫荡次数");
	}

	private oneKeyRL() {
		Model_RongLian.onekeyRongLian();
	}

	private sweepToServ() {
		GGlobal.modelGuanQia.CG_SWEEP_1109();
	}

	private onCloseHandler() {
		this.doHideAnimation();
		GGlobal.layerMgr.close(UIConst.GUANQIASWEEPING);
	}

	private grids: ViewGridRender[] = [];
	private updateAwards() {
		let self = this;
		let m = GGlobal.modelGuanQia;
		let gkcfg = Config.BOSS_205[m.curGuanQiaLv];
		let skillArr = GGlobal.modelCouSkill.skillArr;
		let slen = skillArr.length;
		let tongqian = 0;
		let exp = 0;
		for (let i = 0; i < slen; i++) {
			let item = skillArr[i];
			if (item.isAct) {
				tongqian += item.cfg.lxtq;
				exp += item.cfg.lxjy;
			}
		}

		let awards = JSON.parse(gkcfg.reward);
		awards = ConfigHelp.makeItemListArr(awards);
		for (let i = 0; i < 5; i++) {
			let grid = this.grids[i];
			if (i < awards.length) {
				grid.tipEnabled = true;
				grid.grid.showEff(true);
				let vo = awards[i];
				if (vo.cfg.id == Enum_Attr.TONGBI) {
					vo.count += tongqian;
				} else if (vo.cfg.id == Enum_Attr.EXP) {
					vo.count += exp;
				}
				grid.vo = vo;
				grid.visible = true;
			} else {
				grid.tipEnabled = false;
				grid.grid.showEff(false);
				grid.visible = false;
			}
		}
		this.lbTip.visible = m.SDCount == 0;
		if (m.totalSD - m.SDCount > 0) {
			self.n36.text = self.lbCount.text = "剩余次数：<font color='" + Color.GREENSTR + "'>" + (m.totalSD - m.SDCount) + "/" + m.totalSD + "</font>";
		} else {
			self.n36.text = self.lbCount.text = "剩余次数：<font color='" + Color.REDSTR + "'>" + (m.totalSD - m.SDCount) + "/" + m.totalSD + "</font>";
		}

		if (m.SDCount < m.totalSD) {
			let lib = Config.clear_205;
			let cost = lib[m.SDCount + 1].xh;
			let yb = JSON.parse(cost)[0][2];
			this.n33.text = yb + "";
		}
	}

	private checkRLNotice() {
		this.n30.checkNotice = Model_Bag.equipList.length >= Model_Bag.getCurBagNum();
	}

	protected onShown() {
		let s = this;

		this.c1.setSelectedIndex(0);
		s.btnSweep.addClickListener(s.onSweeping, s);
		s.n34.addClickListener(s.DirectSweeping, s);
		s.n30.addClickListener(s.oneKeyRL, s);
		GGlobal.control.listen(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, s.checkRLNotice, s);
		GGlobal.control.listen(Enum_MsgType.MSG_GQ_SWEEP, s.updateAwards, s);
		GGlobal.control.listen(Enum_MsgType.MSG_GQ_SWEEP_01, s.changeMode, s);
		s.updateAwards();
		IconUtil.setImg(this.imgBG, Enum_Path.BACK_URL + "guanqiasd.jpg");
		GGlobal.modelGuanQia.CS_BOSSINFO_1103();
	}

	protected onHide() {
		let s = this;
		for (let i = 0; i < 5; i++) {
			let grid = this.grids[i];
			grid.tipEnabled = false;
			grid.grid.showEff(false);
			grid.visible = false;
		}
		GGlobal.control.remove(Enum_MsgType.MSG_BAG_EQUIP_UPDATE, s.checkRLNotice, s);
		GGlobal.control.remove(Enum_MsgType.MSG_GQ_SWEEP, s.updateAwards, s);
		GGlobal.control.remove(Enum_MsgType.MSG_GQ_SWEEP_01, s.changeMode, s);
		s.btnSweep.removeClickListener(s.onSweeping, s);
		s.n34.removeClickListener(s.DirectSweeping, s);
		s.n30.removeClickListener(s.oneKeyRL, s);
		GGlobal.layerMgr.close(UIConst.GUANQIASWEEPING);
		if (s.imgBG) IconUtil.setImg(s.imgBG, null);
		s.n29.numItems = 0;
	}
}