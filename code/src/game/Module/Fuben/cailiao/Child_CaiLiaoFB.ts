class Child_CaiLiaoFB extends fairygui.GComponent implements IPanel {

	//>>>>start
	public list: fairygui.GList;
	public promptLb: fairygui.GRichTextField;
	public jihuoBt: Button1;
	public buyBt: Button0;
	public imgZhe: fairygui.GImage;
	public lbZhe: fairygui.GRichTextField;
	public buyGroup: fairygui.GGroup;
	//>>>>end

	public static URL: string = "ui://pkuzcu87ox4fi";

	public static createInstance(): Child_CaiLiaoFB {
		return <Child_CaiLiaoFB><any>(fairygui.UIPackage.createObject("FuBen", "Child_CaiLiaoFB"));
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
		this.show();
	}

	closePanel(pData?: any) {
		this.disposePanel();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		CommonManager.parseChildren(a, a);
		a.list.callbackThisObj = a;
		a.list.foldInvisibleItems = true;
		a.list.itemRenderer = a.renderHandler;
		a.jihuoBt.addClickListener(a.jihuoHandle, a);
		a.buyBt.addClickListener(a.buyHandler, a);
		GGlobal.modelcailiao.CG_OPEN_CAILIAOFUBEN();
	}

	private buyHandler() {
		let self = this;
		let arr = Model_CaiLiao.caiLiaoArr;
		let money = 0;
		let MAXNUM = Config.xtcs_004[2011].num;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].startcondition != "0" && !Model_CaiLiao.checkCoditionOpenHandler(JSON.parse(arr[i].startcondition), arr[i].id)) {

			} else {
				for (let j = arr[i].buyNum + 1; j <= MAXNUM; j++) {
					let cfg = Config.cailiaoxiaohao_709[j];
					let moneyArr = JSON.parse(cfg.expend);
					if (cfg) {
						money += parseInt(moneyArr[0][2]);
					}
				}
			}
		}

		if (money > 0) {
			let money1 = Math.floor(money * 7 / 10);
			ViewAlert.show("是否花费" + HtmlUtil.fontNoSize(money1 + "元宝", Color.getColorStr(2)) + "购买所有副本挑战次数？", Handler.create(self, function (): void {
				if (Model_player.voMine.yuanbao < money1) {
					ModelChongZhi.guideToRecharge();
				} else {
					GGlobal.modelcailiao.CG_CAILIAOFUBEN_BUYKEY();
				}
			}));
		} else {
			ViewCommonWarn.text("已无可购买次数");
		}
	}

	private jihuoHandle(): void {
		let a = this;
		let cfg = GGlobal.modelvip.getCfgByVip(Model_player.voMine.viplv);
		if ((cfg && cfg.SAODANGFUBEN == 1) ||  Model_player.voMine.maxLv >= Config.xtcs_004[2013].num) {
			if (a.checkNotice) {
				let arr = Model_CaiLiao.caiLiaoArr;
				let index = 0;
				for (let i = 0; i < arr.length; i++) {
					if (arr[i].pass == 1 && arr[i].battleNum > 0) {
						index++;
						GGlobal.modelcailiao.CG_CAILIAOFUBEN_SAODANG();
						break;
					}
				}
				if (index == 0) {
					ViewCommonWarn.text("没有可扫荡的副本");
				}
			} else {
				ViewCommonWarn.text("没有可扫荡的副本");
			}
		} else {
			ViewChongZhi.tryToOpenCZ();
		}
	}

	private renderHandler(index: number, obj: fairygui.GObject): void {
		let a = this;
		let item: CaiLiaoFBItem = obj as CaiLiaoFBItem;
		item.vo = Model_CaiLiao.caiLiaoArr[index];
		item.visible =  Model_player.voMine.maxLv >= item.vo.lib.xianshi;
		if (item.battleBt.checkNotice) a.checkNotice = true;
	}

	private checkNotice: boolean = false;
	public updateShow(): void {
		let a = this;
		let cfg = GGlobal.modelvip.getCfgByVip(Model_player.voMine.viplv);
		if (cfg.SAODANGFUBEN == 1 ||  Model_player.voMine.maxLv >= Config.xtcs_004[2013].num) {
			a.jihuoBt.text = "一键扫荡";
			a.promptLb.text = "每日0点重置次数,通关后可扫荡";
		} else {
			a.jihuoBt.text = "提升VIP";
			a.promptLb.text = "每日0点重置次数\n等级200级开启扫荡    VIP" + Config.xtcs_004[2012].num + "可快速开启";
		}
		a.checkNotice = false;
		a.list.numItems = Model_CaiLiao.caiLiaoArr.length;
	}

	private scrollHandle() {
		this.list.scrollToView(Model_CaiLiao.curSelIndex, true);
	}

	public show(): void {
		let a = this;
		Model_CaiLiao.caiLiaoArr.sort(Model_CaiLiao.sortList);
		a.updateShow();
		GGlobal.reddot.listen(ReddotEvent.CHECK_FUBEN_CAILIAO, a.updateShow, this);
		GGlobal.control.listen(Enum_MsgType.FUBEN_CAILIAO_BATTLENUM_UPDATE, a.scrollHandle, a);
	}

	public disposePanel(): void {
		let a = this;
		a.list.numItems = 0;
		GGlobal.reddot.remove(ReddotEvent.CHECK_FUBEN_CAILIAO, a.updateShow, a);
		GGlobal.control.remove(Enum_MsgType.FUBEN_CAILIAO_BATTLENUM_UPDATE, a.scrollHandle, a);
	}

	public guideBattle(step) {
		let self = this;
		for (let i = 0; i < this.list._children.length; i++) {
			let item = this.list._children[i] as CaiLiaoFBItem;
			if (item.vo.taskType == step.arg) {
				GuideStepManager.instance.showGuide(item.battleBt, item.battleBt.width / 2, item.battleBt.height / 2);
				GuideStepManager.instance.showGuide1(step.source.index, item.battleBt, 0, item.battleBt.height / 2, 180, -250, -35);
				if (item.battleBt.parent) item.battleBt.parent.setChildIndex(item.battleBt, item.battleBt.parent.numChildren - 1);
				break;
			}
		}
	}
}