class Child_NZBZ extends fairygui.GComponent {

	public headItem: NZBZHead;
	public guanxianLb: fairygui.GRichTextField;
	public gongxunLb: fairygui.GRichTextField;
	public prestigeLb: fairygui.GRichTextField;
	public myRankLb: fairygui.GRichTextField;
	public countryLb: fairygui.GRichTextField;
	public expLb: fairygui.GRichTextField;
	public battleLb: fairygui.GRichTextField;
	public timeLb: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;
	public expBar: fairygui.GProgressBar;
	public rankBt: fairygui.GLoader;
	public jifenBt: fairygui.GLoader;
	public addBt: fairygui.GButton;
	public resBt: fairygui.GButton;
	public noticeImg: fairygui.GImage;
	public item0: NZBZ_Item;
	public item1: NZBZ_Item;

	public static URL: string = "ui://xzyn0qe3nb1u7";

	public static createInstance(): Child_NZBZ {
		return <Child_NZBZ><any>(fairygui.UIPackage.createObject("nzbz", "Child_NZBZ"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.headItem = <NZBZHead><any>(this.getChild("headItem"));
		this.guanxianLb = <fairygui.GRichTextField><any>(this.getChild("guanxianLb"));
		this.gongxunLb = <fairygui.GRichTextField><any>(this.getChild("gongxunLb"));
		this.prestigeLb = <fairygui.GRichTextField><any>(this.getChild("prestigeLb"));
		this.myRankLb = <fairygui.GRichTextField><any>(this.getChild("myRankLb"));
		this.countryLb = <fairygui.GRichTextField><any>(this.getChild("countryLb"));
		this.expLb = <fairygui.GRichTextField><any>(this.getChild("expLb"));
		this.battleLb = <fairygui.GRichTextField><any>(this.getChild("battleLb"));
		this.timeLb = <fairygui.GRichTextField><any>(this.getChild("timeLb"));
		this.powerLb = <fairygui.GRichTextField><any>(this.getChild("powerLb"));
		this.expBar = <fairygui.GProgressBar><any>(this.getChild("expBar"));
		this.rankBt = <fairygui.GLoader><any>(this.getChild("rankBt"));
		this.jifenBt = <fairygui.GLoader><any>(this.getChild("jifenBt"));
		this.addBt = <fairygui.GButton><any>(this.getChild("addBt"));
		this.resBt = <fairygui.GButton><any>(this.getChild("resBt"));
		this.item0 = <NZBZ_Item><any>(this.getChild("item0"));
		this.item1 = <NZBZ_Item><any>(this.getChild("item1"));
		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
		this.addBt.addClickListener(this.addHandler, this);
		this.rankBt.addClickListener(this.rankHandler, this);
		this.jifenBt.addClickListener(this.jifenHandler, this);
		this.resBt.addClickListener(this.resHandler, this);
	}

	private resHandler(): void {
		GGlobal.modelnzbz.CG_NZBZ_RES_ENEMY();
	}

	private jifenHandler(): void {
		GGlobal.layerMgr.open(UIConst.NANZHENG_BEIZHAN_JIFEN);
	}

	private rankHandler(): void {
		GGlobal.layerMgr.open(UIConst.NANZHENG_BEIZHAN_RANK);
	}

	private addHandler(): void {
		Model_NZBZ.addHandler()
		// if (Model_NZBZ.battleNum >= 5) {
		// 	ViewCommonWarn.text("????????????????????????");
		// 	return;
		// }
		// if (Model_NZBZ.buyNum <= 0) {
		// 	ViewCommonWarn.text("??????????????????");
		// 	return;
		// }
		// var cost = 100
		// // const battleMax = 5 - Model_NZBZ.battleNum
		// ViewAlertBuy.show(cost, Model_NZBZ.buyNum, Model_NZBZ.buyNum, "", Handler.create(this, this.okHandle));

		// ViewAlert.show("????????????" + HtmlUtil.fontNoSize("100??????", Color.getColorStr(2)) + "??????1??????????????????\n????????????????????????" +
		// 	HtmlUtil.fontNoSize("(" + Model_NZBZ.buyNum + "/10" + ")", Color.getColorStr(2)), Handler.create(this, this.okHandle));
	}

	// private okHandle(count): void {
	// 	if (Model_player.voMine.yuanbao < 100 * count) {
	// 		ModelChongZhi.guideToRecharge();
	// 		return;
	// 	}
	// 	GGlobal.modelnzbz.CG_NZBZ_BUY_BATTLENUM(count);
	// }

	private updateShow(): void {
		var vomine = Model_player.voMine;
		if (vomine) {
			//??????
			this.headItem.show(Model_Setting.headId, Model_Setting.frameId, vomine.country, vomine.level)
			if (GGlobal.modelguanxian.guanzhi <= 1) {
				this.guanxianLb.text = vomine.name;
			} else {
				this.guanxianLb.text = "???" + (GGlobal.modelguanxian.guanzhi - 1) + "?????" + Config.guanxian_701[GGlobal.modelguanxian.guanzhi].name + "???" + vomine.name;
			}
			this.gongxunLb.text = "??????         " + vomine.gongxun;
			this.prestigeLb.text = "??????         " + vomine.prestige;
			this.powerLb.text = "?????????" + vomine.str;
			if (Model_NZBZ.myRank == 0) {
				this.myRankLb.text = "???????????????10+";
			} else {
				this.myRankLb.text = "???????????????" + Model_NZBZ.myRank;
			}
			this.countryLb.text = "???????????????" + Model_NZBZ.countryRank;
			let expMax: number = 0;
			for (let i = 0; i < Model_NZBZ.jifenArr.length; i++) {
				if (Model_NZBZ.myJiFen < Model_NZBZ.jifenArr[i].point || i == Model_NZBZ.jifenArr.length - 1) {
					expMax = Model_NZBZ.jifenArr[i].point;
					break;
				}
			}
			this.expBar.max = expMax;
			this.expBar.value = Model_NZBZ.myJiFen;
			if (Model_NZBZ.battleNum <= 0) {
				this.battleLb.text = "????????????: " + HtmlUtil.fontNoSize(Model_NZBZ.battleNum + "/5", Color.getColorStr(6));
			} else {
				this.battleLb.text = "????????????: " + HtmlUtil.fontNoSize(Model_NZBZ.battleNum + "/5", Color.getColorStr(2));
			}

			if (Model_NZBZ.coolTime > 0) {
				this.timeLb.text = DateUtil.getHMSBySecond2(Model_NZBZ.coolTime) + "???????????????";
				this.timeLb.visible = true;
				if (!Timer.instance.has(this.timeHandle, this)) {
					Timer.instance.listen(this.timeHandle, this, 1000);
				}
			} else {
				this.timeLb.visible = false;
				Timer.instance.remove(this.timeHandle, this);
			}
			if (Model_NZBZ.enemyArr[0]) {
				this.item0.vo = Model_NZBZ.enemyArr[0];
			} else {
				this.item0.vo = null;
			}
			if (Model_NZBZ.enemyArr[1]) {
				this.item1.vo = Model_NZBZ.enemyArr[1];
			} else {
				this.item1.vo = null;
			}

			this.noticeImg.visible = Model_NZBZ.checkJiFenNotice();
		}
	}

	private timeHandle(): void {
		Model_NZBZ.coolTime--;
		this.timeLb.text = DateUtil.getHMSBySecond2(Model_NZBZ.coolTime) + "???????????????";
		if (Model_NZBZ.coolTime <= 0) {
			Model_NZBZ.battleNum++;
			this.battleLb.text = "???????????????" + Model_SGZS.battleNum + "/5";
			if (Model_NZBZ.battleNum < 5) {
				Model_NZBZ.coolTime = 3600;
			} else {
				this.timeLb.visible = false;
				Timer.instance.remove(this.timeHandle, this);
			}
		}
	}

	public show(): void {
		this.updateShow();
	}

	public clean(): void {
		Timer.instance.remove(this.timeHandle, this);
	}

	public guide_NZBZ_battle(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.item0.battleBt, self.item0.battleBt.width / 2, self.item0.battleBt.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.item0.battleBt, 0, self.item0.battleBt.height / 2, 180, -250, -35);
		if (self.item0.battleBt.parent) self.item0.battleBt.parent.setChildIndex(self.item0.battleBt, self.item0.battleBt.parent.numChildren - 1);
	}
}