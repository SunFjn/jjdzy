/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewQianRenZhan extends UIModalPanel {

	public frame: fairygui.GComponent;
	public btnLQ: fairygui.GButton;
	public lbCount: fairygui.GRichTextField;
	public lbPro: fairygui.GRichTextField;
	public n11: fairygui.GList;

	public static URL: string = "ui://r92dp953u94lq";

	public static createInstance(): ViewQianRenZhan {
		return <ViewQianRenZhan><any>(fairygui.UIPackage.createObject("guanqia", "ViewQianRenZhan"));
	}

	public constructor() {
		super();
		this.loadRes("guanqia", "guanqia_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("guanqia");
		let s = this;
		s.view = fairygui.UIPackage.createObject("guanqia", "ViewQianRenZhan").asCom;
		s.contentPane = s.view;

		s.frame = <fairygui.GComponent><any>(s.view.getChild("frame"));
		s.btnLQ = <fairygui.GButton><any>(s.view.getChild("btnLQ"));
		s.lbCount = <fairygui.GRichTextField><any>(s.view.getChild("lbCount"));
		s.lbPro = <fairygui.GRichTextField><any>(s.view.getChild("lbPro"));
		this.n11 = <fairygui.GList><any>(s.view.getChild("n11"));
		this.n11.callbackThisObj = this;
		this.n11.itemRenderer = this.awardsRender;

		s.btnLQ.addClickListener(s.onLQhandler, s);
		super.childrenCreated();
		s.resetPosition();
	}

	private awards = [];
	private awardsRender(idx, obj) {
		let item: ViewGridRender = obj as ViewGridRender;
		item.vo = this.awards[idx];
		item.tipEnabled = true;
		item.grid.showEff(true);
	}

	private tip;
	private state = -1;
	private nextGuanQian = 0;
	private maxKill = 0;
	private update() {
		let s = this;
		var m = GGlobal.modelGuanQia;
		var index = m.killAwardsIndex + 1;
		if (!Config.kill_205[index]) {
			index = m.killAwardsIndex;
		}
		var lib = Config.kill_205[index];
		s.maxKill = lib["num"];
		let currentMax = m.getQRZMax();
		s.lbCount.text = "本日已领取(" + m.killAwardsIndex + "/" + currentMax + ")次奖励";
		if (m.killCount >= s.maxKill) {
			var str = Color.getColorStr(Color.GREEN);
		} else {
			var str = Color.getColorStr(Color.RED);
		}

		var awards = JSON.parse(lib["reward"]);
		s.state = -1;
		s.btnLQ.enabled = true;
		if (m.killCount < s.maxKill) {
			s.state = 1
			s.tip = "条件未满足"
			s.btnLQ.enabled = false;
		}
		s.btnLQ.visible = true;
		if (m.killAwardsIndex == currentMax) {
			if (Config.kill_205[index]) {
				s.state = 2;
				s.tip = "通关" + Config.kill_205[index].tj + "关后可增加领取次数"
			} else {
				s.btnLQ.visible = false;
			}
		}

		s.awards = ConfigHelp.makeItemListArr(awards);
		s.n11.numItems = s.awards.length;
		if (!Config.kill_205[m.killAwardsIndex + 1]) {
			s.btnLQ.enabled = false;
			s.btnLQ.text = "已领取";
			s.lbPro.text = "已领取完所有奖励";
		} else {
			s.btnLQ.text = "领取";
			s.lbPro.text = "击败一定数量怪物可领取奖励<font color='" + str + "'>(" + m.killCount + "/" + s.maxKill + ")</font>";
		}
	}

	protected onShown() {
		this.update();
		GGlobal.control.listen(Enum_MsgType.MSG_GQ_UPDATE, this.update, this);
	}


	protected onHide() {
		GGlobal.control.remove(Enum_MsgType.MSG_GQ_UPDATE, this.update, this);
		GGlobal.layerMgr.close(UIConst.QIANRENZHAN);
	}

	private closeHandler() {
		this.n11.numItems = 0;
		GGlobal.layerMgr.close(UIConst.QIANRENZHAN);
	}

	private onLQhandler() {
		if (this.state != -1) {
			ViewCommonWarn.text(this.tip);
			return;
		}
		var m = GGlobal.modelGuanQia;
		m.CG_ZHANSHA_1111();
	}
}