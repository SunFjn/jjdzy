/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewWenDingTXTopUI extends fairygui.GComponent {

	public n27: fairygui.GImage;
	public n28: fairygui.GImage;
	public n29: fairygui.GImage;
	public lbTime: fairygui.GRichTextField;
	public lbAwards: fairygui.GRichTextField;
	public lbMapName: fairygui.GRichTextField;
	public lbDesc: fairygui.GRichTextField;
	public lb: fairygui.GRichTextField;
	public n10: fairygui.GRichTextField;
	public n32: fairygui.GImage;
	public n35: fairygui.GImage;
	public imghead: fairygui.GLoader;
	public imgHeadGrid: fairygui.GLoader;
	public n17: fairygui.GRichTextField;
	public lbMVPName: fairygui.GRichTextField;
	public g0: ViewGrid;
	public g1: ViewGrid;
	public g2: ViewGrid;
	public n30: fairygui.GImage;
	public n31: fairygui.GImage;
	public n36: fairygui.GImage;
	public n38: fairygui.GImage;
	public n33: fairygui.GImage;
	public lbKillCount: fairygui.GRichTextField;
	public n39: fairygui.GGroup;
	public groupInfo: fairygui.GGroup;
	public n34: fairygui.GRichTextField;

	public static URL: string = "ui://gxs8kn67fl2h0";

	private static _inst: ViewWenDingTXTopUI;
	public static createInstance(): ViewWenDingTXTopUI {
		if (!this._inst) {
			this._inst = <ViewWenDingTXTopUI><any>(fairygui.UIPackage.createObject("wendingTX", "ViewWenDingTXTopUI"));
		}
		return this._inst;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n27 = <fairygui.GImage><any>(this.getChild("n27"));
		this.n28 = <fairygui.GImage><any>(this.getChild("n28"));
		this.n29 = <fairygui.GImage><any>(this.getChild("n29"));
		this.lbTime = <fairygui.GRichTextField><any>(this.getChild("lbTime"));
		this.lbAwards = <fairygui.GRichTextField><any>(this.getChild("lbAwards"));
		this.lbMapName = <fairygui.GRichTextField><any>(this.getChild("lbMapName"));
		this.lbDesc = <fairygui.GRichTextField><any>(this.getChild("lbDesc"));
		this.lb = <fairygui.GRichTextField><any>(this.getChild("lb"));
		this.n10 = <fairygui.GRichTextField><any>(this.getChild("n10"));
		this.n32 = <fairygui.GImage><any>(this.getChild("n32"));
		this.imghead = <fairygui.GLoader><any>(this.getChild("imghead"));
		this.imgHeadGrid = <fairygui.GLoader><any>(this.getChild("imgHeadGrid"));
		this.n17 = <fairygui.GRichTextField><any>(this.getChild("n17"));
		this.lbMVPName = <fairygui.GRichTextField><any>(this.getChild("lbMVPName"));
		this.g0 = <ViewGrid><any>(this.getChild("g0"));
		this.g1 = <ViewGrid><any>(this.getChild("g1"));
		this.g2 = <ViewGrid><any>(this.getChild("g2"));
		this.n30 = <fairygui.GImage><any>(this.getChild("n30"));
		this.n31 = <fairygui.GImage><any>(this.getChild("n31"));
		this.n33 = <fairygui.GImage><any>(this.getChild("n33"));
		this.n38 = <fairygui.GImage><any>(this.getChild("n38"));
		this.lbKillCount = <fairygui.GRichTextField><any>(this.getChild("lbKillCount"));
		this.groupInfo = <fairygui.GGroup><any>(this.getChild("groupInfo"));
		this.n39 = <fairygui.GGroup><any>(this.getChild("n39"));
		this.n34 = <fairygui.GRichTextField><any>(this.getChild("n34"));
		this.n34.text = HtmlUtil.createLink("隐藏");
		this.lbDesc.text = HtmlUtil.createLink("玩法说明");
		this.grids = [this.g0, this.g1, this.g2];
	}

	private grids: ViewGrid[];

	private openDesc(evt) {
		evt.stopPropagation();
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.WENDINGTX);
	}

	private timingHD() {
		let m = GGlobal.modelWenDingTX;
		let now = Model_GlobalMsg.getServerTime();
		let limt = m.activiyEndTime - now;
		if (limt > 0) {
			this.lbTime.text = "活动时间：<font color='#ffffff'>" + DateUtil.getMSBySec3((limt / 1000) >> 0, ":") + "</font>";
		} else {
			this.lbTime.text = "活动已结束";
		}
		let progres = ((m.fixedTimeAwards - now) / 1000) >> 0;
		progres = progres > 0 ? progres : 0;
		this.lb.text = "收益发放倒计时:<font color='#ffffff'>" + progres + "s</font>";
	}


	public pushData() {
		let s = this;
		let m = GGlobal.modelWenDingTX;
		if (m.layer == 0) return;
		let cfg = Config.wdtx_260[m.layer];
		s.lbAwards.text = "<font color='#ffffff'>" + ConfigHelp.makeItemRewardText(cfg.reward) + "\n积分*"+cfg.point1+"</font>";
		s.lbMapName.text = "第" + m.layer + "层";
		s.n10.text = cfg.tips;
		s.lbKillCount.text = "" + m.kill_count;
		this.n39.visible = m.kill_count>=3;

		s.lbMVPName.text = m.mvp_name;
		if (!m.mvpHeadGrid_id) {
			this.imgHeadGrid.visible = false;
			this.imghead.visible = false;
			this.n38.visible = true;
		} else {
			this.n38.visible = false;
			this.imghead.visible = true;
			this.imgHeadGrid.visible = true;
			ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(m.mvpHeadGrid_id + ""), this.imgHeadGrid);
			ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(m.mvpHead_id + ""), this.imghead);
		}
	}

	private setInfoVis(e) {
		e.stopPropagation();
		this.groupInfo.visible = !this.groupInfo.visible;
		this.n34.text = this.groupInfo.visible ? HtmlUtil.createLink("隐藏") : HtmlUtil.createLink("显示");
	}

	public toShow() {
		let s = this;
		let pat = GGlobal.layerMgr.UI_MainBottom;
		pat.addChild(s);
		s.resetPostion();
		s.pushData();

		s.n34.addEventListener(egret.TextEvent.LINK, s.setInfoVis, s);
		s.lbDesc.addEventListener(egret.TextEvent.LINK, s.openDesc, s);
		Timer.instance.listen(s.timingHD, s, 1000);
		GGlobal.control.listen(Enum_MsgType.WDTX_MINE_UPDATE, s.pushData, s);
		GGlobal.control.listen(Enum_MsgType.WDTX_MVP, s.pushData, s);
		let yuxiAwards = ConfigHelp.makeItemListArr(JSON.parse(ConfigHelp.getSystemDesc(4702)));
		for (let i = 0; i < 3; i++) {
			this.grids[i].tipEnabled = true;
			this.grids[i].vo = yuxiAwards[i];
			this.grids[i].showEff(true);
		}
	}

	public toHide() {
		let s = this;
		s.n34.removeEventListener(egret.TextEvent.LINK, s.setInfoVis, s);
		s.lbDesc.removeEventListener(egret.TextEvent.LINK, s.openDesc, s);
		GGlobal.control.remove(Enum_MsgType.WDTX_MVP, s.pushData, s);
		GGlobal.control.remove(Enum_MsgType.WDTX_MINE_UPDATE, s.pushData, s);
		Timer.instance.remove(s.timingHD, s);

		for (let i = 0; i < 3; i++) {
			this.grids[i].tipEnabled = false;
			this.grids[i].showEff(false);
		}
		s.removeFromParent();
	}

	public resetPostion() {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, GGlobal.layerMgr.uiAlign + 46);
	}
}