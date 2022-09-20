class View_ZhiGou_Panel extends UIModalPanel {

	public buyBt: Button2;
	public closeBt: fairygui.GButton;
	public moneyIcon: fairygui.GLoader;
	public list: fairygui.GList;
	private tabArr: Array<fairygui.GButton> = [];
	private moneyTabArr: Array<fairygui.GButton> = [];
	private drawImg: fairygui.GImage;
	private moneyLb: fairygui.GRichTextField;
	public icon0: fairygui.GComponent;
	public lb0: fairygui.GRichTextField;
	public v0: fairygui.GGroup;
	public noticeImg0: fairygui.GImage;
	public icon1: fairygui.GComponent;
	public lb1: fairygui.GRichTextField;
	public v1: fairygui.GGroup;
	public noticeImg1: fairygui.GImage;
	public icon2: fairygui.GComponent;
	public lb2: fairygui.GRichTextField;
	public v2: fairygui.GGroup;
	public noticeImg2: fairygui.GImage;
	public expBar: fairygui.GProgressBar;
	public img0: fairygui.GImage;
	public img1: fairygui.GImage;
	public img2: fairygui.GImage;
	public timeTxt: fairygui.GTextField;

	public static URL: string = "ui://42sp9wgri884a";

	public static createInstance(): View_ZhiGou_Panel {
		return <View_ZhiGou_Panel><any>(fairygui.UIPackage.createObject("zhigou", "View_ZhiGou_Panel"));
	}

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(ZhiGouGrid.URL, ZhiGouGrid);
		this.loadRes("zhigou", "zhigou_atlas0")
	}

	protected childrenCreated(): void {
		let s = this;
		GGlobal.createPack("zhigou");
		s.view = fairygui.UIPackage.createObject("zhigou", "View_ZhiGou_Panel").asCom;
		s.contentPane = s.view;
		for (let i = 0; i < 7; i++) {
			let tab: fairygui.GButton = <fairygui.GButton><any>(s.view.getChild("tab" + i));
			tab.data = i + 1;
			this.tabArr.push(tab);
			tab.addClickListener(s.tabHandler, s);
			if (i < 3) {
				let moneyTab: fairygui.GButton = <fairygui.GButton><any>(s.view.getChild("moneyTab" + i));
				moneyTab.data = i;
				moneyTab.addClickListener(s.moneyTabHandler, s);
				this.moneyTabArr.push(moneyTab);
			}
		}
		s.list = <fairygui.GList><any>(s.view.getChild("list"));
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.renderHandler;
		s.moneyIcon = <fairygui.GLoader><any>(s.view.getChild("moneyIcon"));
		s.drawImg = <fairygui.GImage><any>(s.view.getChild("drawImg"));
		s.moneyLb = <fairygui.GRichTextField><any>(s.view.getChild("moneyLb"));
		s.closeBt = <fairygui.GButton><any>(s.view.getChild("closeBt"));
		s.buyBt = <Button2><any>(s.view.getChild("buyBt"));
		s.buyBt.addClickListener(s.buyHandler, s);
		s.icon0 = <fairygui.GComponent><any>(s.view.getChild("icon0"));
		s.lb0 = <fairygui.GRichTextField><any>(s.view.getChild("lb0"));
		s.v0 = <fairygui.GGroup><any>(s.view.getChild("v0"));
		s.noticeImg0 = <fairygui.GImage><any>(s.view.getChild("noticeImg0"));
		s.icon1 = <fairygui.GComponent><any>(s.view.getChild("icon1"));
		s.lb1 = <fairygui.GRichTextField><any>(s.view.getChild("lb1"));
		s.v1 = <fairygui.GGroup><any>(s.view.getChild("v1"));
		s.noticeImg1 = <fairygui.GImage><any>(s.view.getChild("noticeImg1"));
		s.icon2 = <fairygui.GComponent><any>(s.view.getChild("icon2"));
		s.lb2 = <fairygui.GRichTextField><any>(s.view.getChild("lb2"));
		s.v2 = <fairygui.GGroup><any>(s.view.getChild("v2"));
		s.noticeImg2 = <fairygui.GImage><any>(s.view.getChild("noticeImg2"));
		s.expBar = <fairygui.GProgressBar><any>(s.view.getChild("expBar"));
		s.img0 = <fairygui.GImage><any>(s.view.getChild("img0"));
		s.img1 = <fairygui.GImage><any>(s.view.getChild("img1"));
		s.img2 = <fairygui.GImage><any>(s.view.getChild("img2"));
		s.timeTxt = <fairygui.GTextField><any>(s.view.getChild("timeTxt"));
		let _act: Vo_Activity = ModelEightLock.getActVo(UIConst.ZHI_GOU828);
		if (Model_GlobalMsg.kaifuDay <= 7) {
			// GGlobal.modelActivity.CG_OPENACT(UIConst.ZHI_GOU);
			GGlobal.modelZhiGou.CG_ZHIGOU_OPEN_UI();
		} else if (_act) {
			GGlobal.modelEightLock.CG4571(UIConst.ZHI_GOU828);
		} else {
			// GGlobal.modelZhiGou.CG_ZHIGOU_OPEN_UI();
			GGlobal.modelActivity.CG_OPENACT(UIConst.ZHI_GOU);
		}
		s.closeBt.addClickListener(s.closeEventHandler, s);
		let date: Date = new Date(Model_GlobalMsg.getServerTime());
		let key = "zhigou_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
		let value = egret.localStorage.getItem(key);
		if (!value) {
			GGlobal.mainUICtr.setIconNotice(UIConst.ZHI_GOU, false);
			egret.localStorage.setItem(key, "zhigou_Notice");
		}
		super.childrenCreated();
	}

	private buyHandler() {
		let s = this;
		if (!s.curcfg) return;
		if (s.state == 0) {
			let cfgId = this.curcfg.cz
			GGlobal.modelchongzhi.CG_CHONGZHI_135(cfgId, null, false, "" + this.curcfg.id);
		} else if (s.state == 1) {
			let _act: Vo_Activity = ModelEightLock.getActVo(UIConst.ZHI_GOU828);
			if (Model_GlobalMsg.kaifuDay <= 7) {
				// GGlobal.modelZhiGou.CG_ZHIGOU_DRAWREWARD_ACTIVITY(s.curcfg.day, s.curcfg.id);
				GGlobal.modelZhiGou.CG_ZHIGOU_DRAWREWARD(s.curcfg.day, s.curcfg.id);
			} else if (_act) {
				GGlobal.modelZhiGou.CG_ZHIGOU_DRAWREWARD_828(s.curcfg.id);
			} else {
				// GGlobal.modelZhiGou.CG_ZHIGOU_DRAWREWARD(s.curcfg.day, s.curcfg.id);
				GGlobal.modelZhiGou.CG_ZHIGOU_DRAWREWARD_ACTIVITY(s.curcfg.day, s.curcfg.id);
			}
		}
	}

	private moneyTab: fairygui.GButton;
	private moneyTabHandler(event: egret.TouchEvent): void {
		let s = this;
		let tab: fairygui.GButton = event.target as fairygui.GButton;
		if (s.moneyTab && tab.id == s.moneyTab.id) return;
		if (s.moneyTab) s.moneyTab.selected = false;
		tab.selected = true;
		s.moneyTab = tab;
		s.updateList();
	}

	private curTab: fairygui.GButton;
	private tabHandler(event: egret.TouchEvent) {
		let s = this;
		let tab: fairygui.GButton = event.target as fairygui.GButton;
		if (s.curTab && tab.data == s.curTab.data) return;
		if (s.curTab) s.curTab.selected = false;
		tab.selected = true;
		s.curTab = tab;
		s.curSelDay = tab.data;
		if (s.moneyTab) s.moneyTab.selected = false;
		s.moneyTab = null;
		s.updateList();
	}

	private renderHandler(index: number, obj: ZhiGouGrid) {
		obj.setVo(this.rewardArr[index]);
	}

	private curSelDay: number = 0;
	private updateShow() {
		let s = this;
		if (s.curSelDay <= 0) {
			for (let i = 0; i < s.tabArr.length; i++) {
				if (i < Model_ZhiGou.curDay) {
					s.tabArr[i].visible = true;
					if (s._args && s._args < Model_ZhiGou.curDay) {
						s.tabArr[i].selected = i + 1 == s._args;
					} else {
						s.tabArr[i].selected = i + 1 == Model_ZhiGou.curDay;
					}
				} else {
					s.tabArr[i].visible = false;
				}
			}
			s.curSelDay = s._args && s._args.day < Model_ZhiGou.curDay ? s._args.day : Model_ZhiGou.curDay;
			s.curTab = s.tabArr[s.curSelDay - 1];
		}
		s.updateList();
		s.updateReward();
	}

	private rewardArr: IGridImpl[];
	private curcfg;
	private state: number;
	private _act: Vo_Activity;
	private updateList() {
		const s = this;
		if (Model_ZhiGou.rewardArr.length <= 0) return;
		if (!s.curSelDay) return;
		const dataArr = Model_ZhiGou.rewardArr[s.curSelDay - 1];
		for (let i = 0; i < Model_ZhiGou.rewardArr.length; i++) {
			let dataArr = Model_ZhiGou.rewardArr[i];
			for (let j = 0; j < dataArr.length; j++) {
				if (dataArr[j][1] == 1) {
					s.tabArr[i].getChild("noticeImg").visible = true;
					break;
				} else {
					s.tabArr[i].getChild("noticeImg").visible = false;
				}
			}
		}
		let state = 0;
		this._act = ModelEightLock.getActVo(UIConst.ZHI_GOU828);
		if (Model_GlobalMsg.kaifuDay <= 7) {
			for (let i = 0; i < dataArr.length; i++) {
				let cfg = Config.mrzg1_256[dataArr[i][0]];
				s.moneyTabArr[i].text = cfg.rmb + "元直购";
				if (dataArr[i][1] == 1) {
					s.moneyTabArr[i].getChild("noticeImg").visible = true;
				} else {
					s.moneyTabArr[i].getChild("noticeImg").visible = false;
				}
			}
			if (s._args) {
				let cfg = Config.mrzg1_256[dataArr[s._args.type][0]];
				if (s.moneyTab) s.moneyTab.selected = false;
				s.moneyTabArr[s._args.type].selected = true;
				s.moneyTab = s.moneyTabArr[s._args.type];
				s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
				s.curcfg = cfg;
				state = dataArr[s._args.type][1];
				s._args = null;
			} else {
				for (let i = 0; i < dataArr.length; i++) {
					let cfg = Config.mrzg1_256[dataArr[i][0]];
					if (!s.moneyTab && dataArr[i][1] != 2) {
						s.moneyTabArr[i].selected = true;
						s.moneyTab = s.moneyTabArr[i];
						s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
						s.curcfg = cfg;
						state = dataArr[i][1];
						break;
					} else if (s.moneyTab && s.moneyTab.data == i) {
						s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
						s.curcfg = cfg;
						state = dataArr[i][1];
						break;
					} else if (i == dataArr.length - 1) {
						if (s.moneyTab) s.moneyTab.selected = false;
						s.moneyTabArr[i].selected = true;
						s.moneyTab = s.moneyTabArr[i];
						s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
						s.curcfg = cfg;
						state = dataArr[i][1];
					}
				}
			}
		} else if (this._act) {
			for (let i = 0; i < dataArr.length; i++) {
				let cfg = Config.mrzg3_256[dataArr[i][0]];
				s.moneyTabArr[i].text = cfg.rmb + "元直购";
				if (dataArr[i][1] == 1) {
					s.moneyTabArr[i].getChild("noticeImg").visible = true;
				} else {
					s.moneyTabArr[i].getChild("noticeImg").visible = false;
				}
			}

			for (let i = 0; i < dataArr.length; i++) {
				let cfg = Config.mrzg3_256[dataArr[i][0]];
				if (!s.moneyTab && dataArr[i][1] != 2) {
					s.moneyTabArr[i].selected = true;
					s.moneyTab = s.moneyTabArr[i];
					s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
					s.curcfg = cfg;
					state = dataArr[i][1];
					break;
				} else if (s.moneyTab && s.moneyTab.data == i) {
					s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
					s.curcfg = cfg;
					state = dataArr[i][1];
					break;
				} else if (i == dataArr.length - 1) {
					if (s.moneyTab) s.moneyTab.selected = false;
					s.moneyTabArr[i].selected = true;
					s.moneyTab = s.moneyTabArr[i];
					s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
					s.curcfg = cfg;
					state = dataArr[i][1];
				}
			}
		} else {
			for (let i = 0; i < dataArr.length; i++) {
				let cfg = Config.mrzg2_256[dataArr[i][0]];
				s.moneyTabArr[i].text = cfg.rmb + "元直购";
				if (dataArr[i][1] == 1) {
					s.moneyTabArr[i].getChild("noticeImg").visible = true;
				} else {
					s.moneyTabArr[i].getChild("noticeImg").visible = false;
				}
			}

			for (let i = 0; i < dataArr.length; i++) {
				let cfg = Config.mrzg2_256[dataArr[i][0]];
				if (!s.moneyTab && dataArr[i][1] != 2) {
					s.moneyTabArr[i].selected = true;
					s.moneyTab = s.moneyTabArr[i];
					s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
					s.curcfg = cfg;
					state = dataArr[i][1];
					break;
				} else if (s.moneyTab && s.moneyTab.data == i) {
					s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
					s.curcfg = cfg;
					state = dataArr[i][1];
					break;
				} else if (i == dataArr.length - 1) {
					if (s.moneyTab) s.moneyTab.selected = false;
					s.moneyTabArr[i].selected = true;
					s.moneyTab = s.moneyTabArr[i];
					s.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
					s.curcfg = cfg;
					state = dataArr[i][1];
				}
			}
		}
		s.buyBt.visible = true;
		s.moneyLb.visible = true;
		s.drawImg.visible = false;
		s.buyBt.checkNotice = state == 1;
		s.state = state;
		s.moneyIcon.url = CommonManager.getUrl("zhigou", (s.curcfg.cz - 30) + "");
		//0:未购买，1:已购买但未领取，2:已领取
		switch (state) {
			case 0:
				s.moneyLb.text = s.curcfg.rmb + "元直购";
				break;
			case 1:
				s.moneyLb.text = "领取";
				break;
			case 2:
				s.moneyLb.visible = s.buyBt.visible = false;
				s.drawImg.visible = true;
				break;
		}
		s.list.numItems = s.rewardArr.length;
	}

	/**更新奖励 */
	private updateReward() {
		let s = this;
		let arr = Model_ZhiGou.rewarStatedArr;
		if (!arr || arr.length <= 0) return;

		const end = Model_ZhiGou.endTime;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			this.timeTxt.text = DateUtil.getMSBySecond5(end - servTime);
			Timer.instance.listen(this.onTick, this, 60000);
		} else {
			this.timeTxt.text = "活动已结束";
		}

		let cfgv: Imrzgmb_256;
		for (let i = 0; i < 3; i++) {
			let vo: ZhiGouVO = arr[i];
			let cfg = Config.mrzgmb_256[vo.id];
			let icon = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward))[0];
			s["icon" + i].vo = icon;
			s["icon" + i].tipEnabled = false;
			s["lb" + i].text = "购买" + cfg.cishu + "次";
			if (vo.state == 2) {
				s["img" + i].visible = true;
			} else {
				s["img" + i].visible = false;
			}
			if (vo.state == 1) {
				s["noticeImg" + i].visible = true;
			} else {
				s["noticeImg" + i].visible = false;
			}
			cfgv = cfg;
		}

		let index: number = 0;
		let curCfg;
		for (let i = 0; i < 3; i++) {
			let vo: ZhiGouVO = arr[i];
			let cfg = Config.mrzgmb_256[vo.id];
			if (Model_ZhiGou.count <= cfg.cishu) {
				index = i;
				curCfg = cfg;
				break;
			}
		}

		s.expBar.max = 100;
		s.expBar.value = (33 * (index + 1)) * (Model_ZhiGou.count / curCfg.cishu);
		s.expBar._titleObject.text = Model_ZhiGou.count + "/" + cfgv.cishu;
	}

	/**icon点击事件 */
	private iconClick(e: egret.TouchEvent) {
		var curTarget: fairygui.GComponent = e.currentTarget;
		var index: number = Number(curTarget.name);
		var vo: ZhiGouVO = Model_ZhiGou.rewarStatedArr[index];
		let pointCfg = Config.mrzgmb_256[vo.id];
		var rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(pointCfg.reward))
		GGlobal.layerMgr.open(UIConst.ZHI_GOU_REWARD, { award: rewardArr, vo: vo });
	}

	protected onShown(): void {
		let s = this;
		GGlobal.control.listen(Enum_MsgType.ZHIGOU_UPDATE, s.updateShow, s);
		s.updateShow();
		for (let i = 0; i < 3; i++) {
			s["icon" + i].addClickListener(s.iconClick, s);
			s["icon" + i].name = i + "";
		}
	}

	protected onHide(): void {
		let s = this;
		if (s.moneyTab) s.moneyTab.selected = false;
		s.moneyTab = null;
		if (s.curTab) s.curTab.selected = false;
		s.curTab = null;
		GGlobal.layerMgr.close(UIConst.ZHI_GOU);
		GGlobal.control.remove(Enum_MsgType.ZHIGOU_UPDATE, s.updateShow, s);
		for (let i = 0; i < 3; i++) {
			s["icon" + i].removeClickListener(s.iconClick, s)
		}
		Timer.instance.remove(s.onTick, s);
		s.curSelDay = 0;
		s.list.numItems = 0;
	}

	/**活动时间刷新 */
	private onTick() {
		const end = Model_ZhiGou.endTime;
		const servTime = Model_GlobalMsg.getServerTime() / 1000 >> 0;
		if (end - servTime > 0) {
			this.timeTxt.text = DateUtil.getMSBySecond5(end - servTime);
		} else {
			this.timeTxt.text = "活动已结束";
			Timer.instance.remove(this.onTick, this);
		}
	}
}