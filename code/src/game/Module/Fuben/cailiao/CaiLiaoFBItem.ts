class CaiLiaoFBItem extends fairygui.GComponent {

	public grid: ViewGrid;
	public promptLb: fairygui.GRichTextField;
	public battleNumLb: fairygui.GRichTextField;
	public openLb: fairygui.GRichTextField;
	public openGroup: fairygui.GGroup;
	public addBt: fairygui.GButton;
	public battleBt: Button0;
	public battleGroup: fairygui.GGroup;
	public bgImg: fairygui.GLoader;
	public lbImg: fairygui.GLoader;
	public iconImg: fairygui.GLoader;
	public maskImg: fairygui.GImage;

	public static URL: string = "ui://pkuzcu87dlakh";

	public static createInstance(): CaiLiaoFBItem {
		return <CaiLiaoFBItem><any>(fairygui.UIPackage.createObject("FuBen", "CaiLiaoFBItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.addBt.addClickListener(self.addHandler, self);
		self.battleBt.addClickListener(self.battleHandle, self);
		self.grid.isShowEff = true;
	}

	private battleHandle(): void {
		let self = this;
		if (self.battleBt.checkNotice) {
			GGlobal.modelcailiao.CG_ENTER_CAILIAOFUBEN(self.vo.id);
		} else {
			self.addHandler();
		}
	}

	private addHandler(): void {
		let cfg = Config.cailiaoxiaohao_709[this.vo.buyNum + 1];
		if (cfg) {
			let arr = JSON.parse(cfg.expend);
			let MAXNUM = Config.xtcs_004[2011].num;
			if (Model_player.voMine.yuanbao >= arr[0][2]) {
				ViewAlert.show("是否花费" + HtmlUtil.fontNoSize(arr[0][2] + "元宝", Color.getColorStr(2)) + "购买1次挑战次数？\n今日剩余购买次数" +
					HtmlUtil.fontNoSize("(" + (MAXNUM - this.vo.buyNum) + "/" + MAXNUM + ")", Color.getColorStr(2)), Handler.create(this, this.okHandle));
			} else {
				ModelChongZhi.guideToRecharge();
			}
		} else {
			ViewCommonWarn.text("已无购买次数");
		}
	}

	private okHandle(): void {
		GGlobal.modelcailiao.CG_CAILIAOFUBEN_BUYNUM(this.vo.id);
	}

	private eff: Part;
	private _vo: Vo_CaiLiaoFB;
	public set vo(vo: Vo_CaiLiaoFB) {
		let s = this;
		s._vo = vo;
		s.promptLb.visible = true;
		s.openGroup.visible = false;
		let gridVo: IGridImpl;
		if (vo.rewardArr[0][0] == Enum_Attr.ITEM) {
			gridVo = VoItem.create(vo.rewardArr[0][1]);
		} else if (vo.rewardArr[0][0] == Enum_Attr.EQUIP) {
			gridVo = VoEquip.create(vo.rewardArr[0][1]);
		} else {
			gridVo = Vo_Currency.create(vo.rewardArr[0][0]);
		}
		gridVo.count = vo.rewardArr[0][2] + vo.addArr[0][2] * Math.floor(Model_player.voMine.zsID / 1000);
		s.grid.vo = gridVo;
		if (vo.startcondition != "0" && !s.checkCoditionOpenHandler(JSON.parse(vo.startcondition), vo.id)) {
			s.openGroup.visible = true;
			s.addBt.enabled = s.grid.tipEnabled = s.battleBt.enabled = s.battleBt.checkNotice = false;
		} else {
			let cfg = Config.zhuansheng_705[(Math.floor(Model_player.voMine.zsID / 1000) + 1) * 1000 + 1]
			if (cfg) {
				s.promptLb.text = (Math.floor(Model_player.voMine.zsID / 1000) + 1) + "转可以提升副本收益";
				s.promptLb.color = Color.getColorInt(5);
			} else {
				s.promptLb.text = "已达最大转数";
			}
			s.addBt.touchable = s.grid.tipEnabled = s.battleBt.enabled = true;
			if (vo.battleNum <= 0) {
				s.battleBt.checkNotice = false;
				s.battleNumLb.setVar("num", HtmlUtil.fontNoSize(vo.battleNum + "", Color.getColorStr(6))).flushVars();
			} else {
				s.battleNumLb.setVar("num", HtmlUtil.fontNoSize(vo.battleNum + "", Color.getColorStr(2))).flushVars();
				s.battleBt.checkNotice = true;
			}
			let buycfg = Config.cailiaoxiaohao_709[s.vo.buyNum + 1];
			s.addBt.grayed = buycfg ? false : true;
		}
		IconUtil.setImg(s.bgImg, Enum_Path.FUBEN_URL + vo.picture + ".jpg");
		IconUtil.setImg(s.lbImg, Enum_Path.FUBEN_URL + "clwz/" + vo.tupian + ".png");
		IconUtil.setImg(s.iconImg, Enum_Path.FUBEN_URL + "cltb/" + vo.tupian + ".png");
		let cfg = Config.mission_243[Model_player.taskId]
		if (cfg && vo.taskType == cfg.type) {
			if (s.eff) {
				EffectMgr.instance.removeEff(s.eff);
				s.eff = null;
			}
			if (!s.eff) {
				s.eff = EffectMgr.addEff("uieff/10039", s.displayListContainer, s.width / 2, s.height / 2 + 10, 1000);
			}
		} else {
			if (s.eff) {
				EffectMgr.instance.removeEff(s.eff);
				s.eff = null;
			}
		}
	}

	/**特殊处理 [[1,x],[2,y],[3,z]]
	1:达到关卡
	2:转生
	3:等级
	y=转生ID*/
	private checkCoditionOpenHandler(condition: any[], id: number): boolean {
		var ret: boolean = true;
		if (!Model_player.voMine) return false;
		var cl = condition.length;
		var b;
		var msg;
		var m = GGlobal.modelGuanQia;
		for (var i: number = 0; i < cl; i++) {
			var tp = condition[i][0];
			var val = condition[i][1];
			switch (tp) {
				case 1:
					b = m.curGuanQiaLv >= val;
					msg = BroadCastManager.reTxt("{0}关开启", val);
					break;//关卡
				case 2:
					b = Model_player.voMine.zsID >= val;
					msg = BroadCastManager.reTxt("{0}开启", Config.zhuansheng_705[val].lv);
					break;//转生等级
				case 3:
					b =  Model_player.voMine.maxLv >= val;
					msg = BroadCastManager.reTxt("等级{0}级开启", val);
					break;
			}

			var bo: boolean = true;
			var lib = Config.cailiaofuben_709;
			if (lib) {
				var info = lib[id];
				if (info && info.day) {
					let d = info.day;
					let d1 = 0;
					if (Model_GlobalMsg.kaifuDay == 0) {
						bo = false;
					} else {
						if (d <= Model_GlobalMsg.kaifuDay) {//第几天开启某个系统
							bo = true;
						} else {
							bo = false;
						}
					}
					if (b) {
						msg = BroadCastManager.reTxt("开服第{0}天开启", d);
					}
				}
			}

			if (!b || !bo) {
				ret = false;
				break;
			}
		}
		if (!b || !bo) {
			this.openLb.text = msg;
		}
		return ret;
	}

	public get vo(): Vo_CaiLiaoFB {
		return this._vo;
	}

	public clean() {
		let self = this;
		ConfigHelp.cleanGridEff(self.grid);
		IconUtil.setImg(self.bgImg, null);
		IconUtil.setImg(self.lbImg, null);
		if (self.eff) {
			EffectMgr.instance.removeEff(self.eff);
			self.eff = null;
		}
	}
}