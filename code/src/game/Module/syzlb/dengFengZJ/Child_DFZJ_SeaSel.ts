class Child_DFZJ_SeaSel extends fairygui.GComponent {

	public imgBg: fairygui.GLoader;
	public labTips: fairygui.GRichTextField;
	public btnCge: fairygui.GButton;
	public btnRank: fairygui.GButton;
	public btnPoint: Button2;
	public btnSM: fairygui.GRichTextField;
	public ply1: VDengFengPly;
	public ply0: VDengFengPly;
	public ply2: VDengFengPly;
	public ply3: VDengFengPly;
	public ply4: VDengFengPly;
	public ply5: VDengFengPly;
	public lbMyRank: fairygui.GRichTextField;
	public lbPower: fairygui.GRichTextField;
	public lbMyPoint: fairygui.GRichTextField;
	public lbBatCt: fairygui.GRichTextField;
	public lbCge: fairygui.GRichTextField;
	public btnAdd: fairygui.GButton;

	public groupItem: fairygui.GGroup;
	public itemIcon: fairygui.GLoader;
	public itemCt: fairygui.GRichTextField;
	public itemLb: fairygui.GRichTextField;

	public static URL: string = "ui://3o8q23uujo891o";

	public static createInstance(): Child_DFZJ_SeaSel {
		return <Child_DFZJ_SeaSel><any>(fairygui.UIPackage.createObject("syzlb", "Child_DFZJ_SeaSel"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s._plyArr = [s.ply0, s.ply1, s.ply2, s.ply3, s.ply4, s.ply5]
		s.btnSM.text = HtmlUtil.createLink("玩法说明");
	}

	private _plyArr: VDengFengPly[]
	public show() {
		let s = this;
		s.registerEvent(true);
		let m = GGlobal.modelDengFengZJ
		s.zeroReset()
		m.CG_POINT_DAT()
		s.labTips.text = "本批全部战胜额外获得" + ConfigHelp.getSystemNum(8309) + "积分";
		s.lbCge.text = JSON.parse(ConfigHelp.getSystemDesc(8301))[0][2] + ""
		IconUtil.setImg(s.imgBg, Enum_Path.BACK_URL + "dfzj1.jpg");
	}

	public hide() {
		let s = this;
		s.registerEvent(false);
		for (let i = 0; i < s._plyArr.length; i++) {
			s._plyArr[i].clean();
		}
		IconUtil.setImg(s.imgBg, null);
	}
	private registerEvent(pFlag: boolean): void {
		let self = this;
		let m = GGlobal.modelDengFengZJ
		m.register(pFlag, Model_DengFengZJ.SEA_UI, self.updateShow, self);
		GGlobal.reddot.register(pFlag, UIConst.DENG_FENG_SEA, self.upRed, self)
		EventUtil.register(pFlag, self.btnAdd, egret.TouchEvent.TOUCH_TAP, self.onAdd, self);
		EventUtil.register(pFlag, self.btnPoint, egret.TouchEvent.TOUCH_TAP, self.onPoint, self);
		EventUtil.register(pFlag, self.btnRank, egret.TouchEvent.TOUCH_TAP, self.onRank, self);
		EventUtil.register(pFlag, self.btnCge, egret.TouchEvent.TOUCH_TAP, self.onChage, self);
		EventUtil.register(pFlag, self.btnSM, egret.TextEvent.LINK, self.onLink, self);
		GGlobal.control.register(pFlag, Enum_MsgType.ZERO_RESET, self.zeroReset, self);
	}

	private zeroReset() {
		GGlobal.modelDengFengZJ.CG_OPENUI(0);
	}

	private onLink() {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.DENG_FENG_SEA);
	}

	private onAdd() {
		let m = GGlobal.modelDengFengZJ
		let s = this;
		if (m.status != 1) {
			ViewCommonWarn.text("本周赛事已结束");
			return;
		}
		ViewDengFengBuy.show(m.hasSeaBuy, Config.dfzjhx3_261, Handler.create(null, s.sureAdd));
	}

	private sureAdd(ct) {
		GGlobal.modelDengFengZJ.CG_BUY_TIME(0, ct)
	}

	private updateShow() {
		let s = this;
		let m = GGlobal.modelDengFengZJ

		s.lbPower.text = "" + ConfigHelp.getYiWanText(m.seaPower)
		s.lbMyRank.text = "我的排名：" + (m.seaRank == 0 ? "未上榜" : HtmlUtil.fontNoSize(m.seaRank + "", Color.GREENSTR))
		s.lbMyPoint.text = "我的积分：" + HtmlUtil.fontNoSize(m.seaPoint + "", Color.GREENSTR);

		s.upRed();
		if (m.seaData.length == 0) {
			return;
		}
		//0   1,2,   3,4,5
		let unBatIdx = -1;//未挑战序号
		for (let i = m.seaData.length - 1; i >= 0; i--) {
			let v = m.seaData[i];
			if (v.st == 0) {
				unBatIdx = i;
				break;
			}
		}
		for (let i = 0; i < s._plyArr.length; i++) {
			s._plyArr[i].seaVo(m.seaData[i], i, unBatIdx)
		}
		if (m.seaFreEff) {
			Timer.instance.callLater(s.showEff, 300, s, 0, false, false, true)
			m.seaFreEff = false;
		}

		let itemCt = Model_Bag.getItemCount(Model_DengFengZJ.ITEM_BATCT)
		if (m.seaBatCt == 0 && itemCt > 0) {
			let itemCfg = Config.daoju_204[Model_DengFengZJ.ITEM_BATCT]
			s.lbBatCt.text = ""
			s.btnAdd.visible = false
			s.groupItem.visible = true;
			s.itemLb.text = itemCfg.name + "："
			s.itemCt.text = HtmlUtil.fontNoSize(itemCt + "/1", Color.GREENSTR);
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + itemCfg.icon + ".png", s.itemIcon);
		} else {
			s.lbBatCt.text = "今日挑战次数：" + HtmlUtil.fontNoSize(m.seaBatCt + "", m.seaBatCt > 0 ? Color.GREENSTR : Color.REDSTR);
			s.btnAdd.visible = true
			s.groupItem.visible = false;
		}

	}

	private upRed() {
		let s = this;
		s.btnPoint.checkNotice = GGlobal.reddot.checkCondition(UIConst.DENG_FENG_SEA, 1);
	}

	private showEff() {
		let s = this;
		for (let i = 0; i < s._plyArr.length; i++) {
			s._plyArr[i].plyEff()
		}
	}

	private onPoint() {
		GGlobal.layerMgr.open(UIConst.DENG_FENG_POINT);
	}

	private onRank() {
		GGlobal.layerMgr.open(UIConst.DENG_FENG_RANK, 0);
	}

	private onChage() {
		let m = GGlobal.modelDengFengZJ;
		// if (m.status != 1) {
		// 	ViewCommonWarn.text("本周赛事已结束");
		// 	return;
		// }
		GGlobal.modelDengFengZJ.CG_REPLACE(0)
	}
}