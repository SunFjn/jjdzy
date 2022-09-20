class Child_DFZJ_Final extends fairygui.GComponent {

	public imgBg: fairygui.GLoader;
	public ply0: VDengFengPly;
	public ply1: VDengFengPly;
	public ply2: VDengFengPly;
	public ply3: VDengFengPly;
	public ply4: VDengFengPly;
	public lbMyRank: fairygui.GRichTextField;
	public lbPower: fairygui.GRichTextField;
	public lbMyPoint: fairygui.GRichTextField;
	public lbBatCt: fairygui.GRichTextField;
	public btnAdd: fairygui.GButton;
	public btnBet: Button2;
	public btnRank: fairygui.GButton;
	public btnSM: fairygui.GRichTextField;
	public btnCge: fairygui.GButton;
	public lbCge: fairygui.GRichTextField;
	public imgCge: fairygui.GImage;

	public static URL: string = "ui://3o8q23uujo891m";

	public static createInstance(): Child_DFZJ_Final {
		return <Child_DFZJ_Final><any>(fairygui.UIPackage.createObject("syzlb", "Child_DFZJ_Final"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s._plyArr = [s.ply0, s.ply1, s.ply2, s.ply3, s.ply4]
		s.btnSM.text = HtmlUtil.createLink("玩法说明");
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		let m = GGlobal.modelDengFengZJ
		m.register(pFlag, Model_DengFengZJ.FINAL_UI, self.updateShow, self);
		GGlobal.reddot.register(pFlag, UIConst.DENG_FENG_FINAL, self.upRed, self)
		EventUtil.register(pFlag, self.btnAdd, egret.TouchEvent.TOUCH_TAP, self.onAdd, self);
		EventUtil.register(pFlag, self.btnBet, egret.TouchEvent.TOUCH_TAP, self.onBet, self);
		EventUtil.register(pFlag, self.btnRank, egret.TouchEvent.TOUCH_TAP, self.onRank, self);
		EventUtil.register(pFlag, self.btnCge, egret.TouchEvent.TOUCH_TAP, self.onChage, self);
		EventUtil.register(pFlag, self.btnSM, egret.TextEvent.LINK, self.onLink, self);
		GGlobal.control.register(pFlag, Enum_MsgType.ZERO_RESET, self.zeroReset, self);
	}

	private zeroReset() {
		GGlobal.modelDengFengZJ.CG_OPENUI(1);
	}

	private onLink() {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.DENG_FENG_FINAL);
	}

	private _plyArr: VDengFengPly[]

	public show() {
		let s = this;
		s.registerEvent(true)
		s.zeroReset()
		s.lbCge.text = JSON.parse(ConfigHelp.getSystemDesc(8308))[0][2] + ""
		IconUtil.setImg(s.imgBg, Enum_Path.BACK_URL + "dfzj2.jpg");
	}

	public hide() {
		let s = this;
		s.registerEvent(false)
		for (let i = 0; i < s._plyArr.length; i++) {
			s._plyArr[i].clean();
		}
		IconUtil.setImg(s.imgBg, null);
	}

	private updateShow() {
		let s = this;
		let m = GGlobal.modelDengFengZJ
		for (let i = 0; i < 5; i++) {
			s._plyArr[i].finalVo(m.finalData[i], i)
		}
		s.lbPower.text = "" + ConfigHelp.getYiWanText(m.finalPower)

		if (m.finalRank == 0) {
			s.lbMyRank.text = "我的排名：未上榜";
			s.lbMyPoint.text = "";
			s.lbBatCt.text = "";
			s.btnAdd.visible = false

			s.btnCge.visible = false;
			s.lbCge.visible = false;
			s.imgCge.visible = false;
		} else {
			s.lbMyRank.text = "我的排名：" + HtmlUtil.fontNoSize(m.finalRank + "", Color.GREENSTR);
			s.lbMyPoint.text = "我的积分：" + HtmlUtil.fontNoSize(m.finalPoint + "", Color.GREENSTR);
			s.lbBatCt.text = "今日挑战次数：" + HtmlUtil.fontNoSize(m.finalBatCt + "", m.finalBatCt > 0 ? Color.GREENSTR : Color.REDSTR);
			s.btnAdd.visible = true

			s.btnCge.visible = true;
			s.lbCge.visible = true;
			s.imgCge.visible = true;
		}

		s.upRed()
	}

	private upRed() {
		let s = this;
		s.btnBet.checkNotice = GGlobal.reddot.checkCondition(UIConst.DENG_FENG_FINAL, 1);
	}

	private onAdd() {
		let m = GGlobal.modelDengFengZJ
		let s = this;
		if (m.status != 2) {
			ViewCommonWarn.text("本周赛事已结束");
			return;
		}
		ViewDengFengBuy.show(m.hasFinalBuy, Config.dfzjjs3_261, Handler.create(null, s.sureAdd));
	}

	private sureAdd(ct) {
		GGlobal.modelDengFengZJ.CG_BUY_TIME(1, ct)
	}

	private onBet() {
		GGlobal.layerMgr.open(UIConst.DENG_FENG_BET);
	}

	private onRank() {
		GGlobal.layerMgr.open(UIConst.DENG_FENG_RANK, 1);
	}

	private onChage() {
		let m = GGlobal.modelDengFengZJ;
		// if (m.status != 2) {
		// 	ViewCommonWarn.text("本周赛事已结束");
		// 	return;
		// }
		GGlobal.modelDengFengZJ.CG_REPLACE(1)
	}
}