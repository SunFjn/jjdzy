class Child_JinSheng extends fairygui.GComponent implements IPanel {

	//>>>>start
	public rewardBt: Button2;
	public iconJSHL: Button2;
	public pinImg: fairygui.GLoader;
	public nameImg: fairygui.GLoader;
	public limitImg: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	public noticeImg2: fairygui.GImage;
	public list: fairygui.GList;
	public rewardList: fairygui.GList;
	public expBar: fairygui.GProgressBar;
	public jihuoBt: Button0;
	public powerLb: fairygui.GRichTextField;
	public jinshengGroup: fairygui.GGroup;
	public promptLb: fairygui.GRichTextField;
	public backBg: fairygui.GLoader;
	//>>>>end

	public static URL: string = "ui://dllc71i9s0h0e";

	public static createInstance(): Child_JinSheng {
		return <Child_JinSheng><any>(fairygui.UIPackage.createObject("rebirth", "Child_JinSheng"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.open();
	}

	closePanel(pData?: any) {
		this.hide();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		CommonManager.parseChildren(a, a);

		a.rewardList.callbackThisObj = a;
		a.rewardList.itemRenderer = a.rewardListHandle;
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandler;
		a.list.setVirtual();

		Model_JinSheng.getJinSheng();

		a.rewardBt.addClickListener(a.onReward, a);
		a.jihuoBt.addClickListener(a.OnJiHuo, a);
		a.iconJSHL.addClickListener(a.onJSHL, a);
	}
	/**晋升好礼 */
	private onJSHL() {
		if (ModuleManager.isOpen(UIConst.VIEWLVBUCOMEUP, true)) {
			GGlobal.layerMgr.open(UIConst.VIEWLVBUCOMEUP);
		}
	}
	public JSHLNot() {
		const bool = GGlobal.reddot.checkCondition(UIConst.VIEWLVBUCOMEUP);
		this.noticeImg2.visible = bool && Model_GlobalMsg.kaifuDay <= 7;
	}
	private rewardListHandle(index: number, obj: JinShengGrid) {
		obj.setVo(this.rewardArr[index], Model_GlobalMsg.kaifuDay <= 7 && index == this.rewardArr.length - 1 && Model_JinSheng.level < 8);
	}

	private OnJiHuo() {
		// Model_JinSheng.generalIcon = this.grid.vo.icon;
		GGlobal.modeljinsheng.CG_JINSHENG_JIHUO();
	}

	private onReward() {
		GGlobal.layerMgr.open(UIConst.JINSHENG_REWARD);
	}

	private renderHandler(index: number, obj: fairygui.GObject) {
		let item: JinShengItem = obj as JinShengItem;
		let vo = this.taskArr[index]
		item.show(vo);
		if (item.drawBt.visible && item.drawBt.checkNotice) {
			this.isShowNotice = true;
		}
	}

	private rewardArr = [];
	private isShowNotice: boolean;
	private taskArr: Vo_JinShengTask[];
	private updateShow() {
		let a = this;
		a.isShowNotice = false;
		let cfg = Config.up_231[Model_JinSheng.level];
		if (cfg.id >= 2) {
			let gaunzhi = cfg.id;
			if (cfg.id > 11) {
				gaunzhi = 11;
			}
			IconUtil.setImg(a.pinImg, "resource/image/jinsheng/js_" + gaunzhi + ".png");
		} else {
			IconUtil.setImg(a.pinImg, null);
		}
		IconUtil.setImg(a.nameImg, "resource/image/jinsheng/name" + cfg.id + ".png");
		if (cfg.exp == 0) {
			a.jinshengGroup.visible = false;
			a.promptLb.visible = true;
		} else {
			a.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg["reward" + Model_JinSheng.job]));
			if (Model_GlobalMsg.kaifuDay <= 7) {
				a.rewardList.numItems = a.rewardArr.length;
			} else {
				if (Model_JinSheng.level < 8) {
					a.rewardList.numItems = a.rewardArr.length - 1;
				} else {
					a.rewardList.numItems = a.rewardArr.length;
				}
			}
			a.expBar.value = Model_JinSheng.exp;
			a.expBar.max = cfg.exp;
			a.jinshengGroup.visible = true;
			a.promptLb.visible = false;
		}
		a.taskArr = [];
		for (let i = 0; i < Model_JinSheng.taskArr.length; i++) {
			if (Model_GlobalMsg.kaifuDay >= Model_JinSheng.taskArr[i].kfDay) {
				a.taskArr.push(Model_JinSheng.taskArr[i]);
			}
		}
		a.list.numItems = a.taskArr.length;
		let curTime = Math.floor(Model_GlobalMsg.getServerTime() / 1000);
		let oldTime = Model_GlobalMsg.kaiFuTime;
		var data: Date = new Date(oldTime * 1000);
		let h: number = data.getHours();
		let m: number = data.getMinutes();
		let s: number = data.getSeconds();
		a.surTime = 24 * 60 * 60 * 7 - (curTime - oldTime) - (h * 60 * 60 + m * 60 + s);
		a.limitImg.visible = a.surTime > 0;
		if (a.surTime > 0) {
			if (!Timer.instance.has(a.timeHandler, a)) {
				Timer.instance.listen(a.timeHandler, a, 1000);
			}
		} else {
			Timer.instance.remove(a.timeHandler, a);
			if (cfg.exp <= 0) {
				a.powerLb.text = HtmlUtil.fontNoSize("奖励已领取", Color.getColorStr(2));
			} else {
				let nextcfg = Config.up_231[Model_JinSheng.level + 1];
				if (nextcfg) {
					a.powerLb.text = nextcfg.tips + "可领取";
				} else {
					a.powerLb.text = "";
				}
			}
		}
		a.jihuoBt.checkNotice = a.jihuoBt.visible = Model_JinSheng.exp >= cfg.exp;
		if (!a.isShowNotice) a.isShowNotice = Model_JinSheng.exp >= cfg.exp;
		a.powerLb.visible = Model_JinSheng.exp < cfg.exp;

		a.noticeImg.visible = false;
		GGlobal.reddot.setCondition(UIConst.JINSHENG, 0, a.isShowNotice);
		GGlobal.reddot.notifyMsg(UIConst.REBIRTH);
		if (this.guideHandler) {
			this.guideHandler.run();
			this.guideHandler = null;
		}
		if (Model_GlobalMsg.kaifuDay <= 7) {
			a.iconJSHL.visible = true;
		} else {
			a.iconJSHL.visible = false;
		}
		a.JSHLNot();
	}

	private surTime = 0;
	private timeHandler() {
		let a = this;
		a.surTime--;
		if (a.surTime <= 0) {
			Timer.instance.remove(a.timeHandler, this);
			let nextcfg = Config.up_231[Model_JinSheng.level + 1];
			if (nextcfg) {
				a.powerLb.text = nextcfg.tips + "可领取";
			} else {
				a.powerLb.text = "";
			}
		} else {
			a.powerLb.text = "限时奖励领取" + HtmlUtil.fontNoSize(DateUtil.getMSBySecond4(a.surTime), Color.getColorStr(6)) + "后结束";
		}
	}

	open() {
		let a = this;
		IconUtil.setImg(a.backBg, Enum_Path.BACK_URL + "frameBg3.jpg");
		var c = GGlobal.control;
		c.listen(Enum_MsgType.JINSHENG, a.updateShow, a);
		c.listen(Enum_MsgType.KAIFUDAY_UPDATE, a.updateShow, a);
		GGlobal.modeljinsheng.CG_OPEN_JINSHENG();
		c.listen(ReddotEvent.CHECK_LBCOMEUP, a.JSHLNot, a);
	}

	hide() {
		let a = this;
		var c = GGlobal.control;
		a.list.numItems = 0;
		a.rewardList.numItems = 0;
		IconUtil.setImg(a.backBg, null);
		IconUtil.setImg(a.pinImg, null);
		IconUtil.setImg(a.nameImg, null);
		c.remove(Enum_MsgType.JINSHENG, a.updateShow, a);
		c.remove(Enum_MsgType.KAIFUDAY_UPDATE, a.updateShow, a);
		c.remove(ReddotEvent.CHECK_LBCOMEUP, a.JSHLNot, a);
		Timer.instance.remove(a.timeHandler, a);
	}

	public guideHandler: Handler;
	public setGuide(hd) {
		this.guideHandler = hd;
		if (this.list.numItems > 0) {
			if (this.guideHandler) {
				this.guideHandler.run();
				this.guideHandler = null;
			}
		}
	}

	public guideTask(step) {
		for (let i = 0; i < this.list._children.length; i++) {
			let item = this.list._children[i] as JinShengItem;
			if (item.vo.id == 3001) {
				GuideStepManager.instance.showGuide(item.drawBt, item.drawBt.width / 2, item.drawBt.height / 2);
				GuideStepManager.instance.showGuide1(step.source.index, item.drawBt, item.drawBt.width / 2, item.drawBt.height, 90, -106, 35);
				break;
			}
		}
	}

	public guideFinishCheck(value) {
		let cfg = Config.up_231[Model_JinSheng.level];
		if (!cfg) return false;
		return Model_JinSheng.exp >= cfg.exp;
	}
}