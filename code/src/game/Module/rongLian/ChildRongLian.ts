class ChildRongLian extends fairygui.GComponent implements IPanel{

	//>>>>start
	public dataList: fairygui.GList;
	public btn_rl: Button0;
	public expBar: fairygui.GProgressBar;
	public labLevel: fairygui.GTextField;
	public labAttr0: fairygui.GTextField;
	public labAttr1: fairygui.GTextField;
	public labAttr2: fairygui.GTextField;
	public labRl0: fairygui.GTextField;
	public labRl1: fairygui.GTextField;
	public labRl2: fairygui.GTextField;
	public labRl3: fairygui.GTextField;
	public labRl4: fairygui.GTextField;
	public linkLb1: fairygui.GRichTextField;
	public linkLb2: fairygui.GRichTextField;
	public linkLb3: fairygui.GRichTextField;
	public linkLb0: fairygui.GRichTextField;
	public boxGetEq: fairygui.GGroup;
	//>>>>end

	private _showList: Array<any>;
	private _sendList: Array<any>;
	private _lastTime: number = 0;
	private _labAttrArr: Array<fairygui.GTextField>;
	private _labRlArr: Array<fairygui.GTextField>;

	public static URL: string = "ui://ny9kb4yzetor1";

	public static createInstance(): ChildRongLian {
		return <ChildRongLian><any>(fairygui.UIPackage.createObject("rongLian", "ChildRongLian"));
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
		this.addListen();
		this.update();
	}
	
	closePanel(pData?: any) {
		this.removeListen();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);

		this._labAttrArr = [this.labAttr0, this.labAttr1, this.labAttr2]
		this._labRlArr = []
		for (let i = 0; i < 5; i++) {
			this._labRlArr.push(<fairygui.GTextField><any>(this.getChild("labRl" + i)))
		}
		this.dataList.itemRenderer = this.renderHandle;
		this.dataList.callbackThisObj = this;

		this.linkLb1.text = HtmlUtil.createLink("闯关");
		this.linkLb2.text = HtmlUtil.createLink("扫荡");
		this.linkLb3.text = HtmlUtil.createLink("全民BOSS");
		// this.linkLb3.width = this.linkLb3.width + 30;
	}
	private _first: boolean = true;
	public addListen(): void {
		this.btn_rl.addClickListener(this.onTouchTapHandler, this);
		this.linkLb1.addClickListener(this.onLinkHandler1, this);
		this.linkLb2.addClickListener(this.onLinkHandler2, this);
		this.linkLb3.addClickListener(this.onLinkHandler3, this);
		GGlobal.control.listen(Enum_MsgType.MSG_RL_REFLASH1, this.upReFlash1, this);
		GGlobal.control.listen(Enum_MsgType.MSG_RL_INOF, this.upRLInfo, this);
	}

	public removeListen(): void {
		this.btn_rl.removeClickListener(this.onTouchTapHandler, this);
		this.linkLb1.removeClickListener(this.onLinkHandler1, this);
		this.linkLb2.removeClickListener(this.onLinkHandler2, this);
		this.linkLb3.removeClickListener(this.onLinkHandler3, this);
		GGlobal.control.remove(Enum_MsgType.MSG_RL_REFLASH1, this.upReFlash1, this);
		GGlobal.control.remove(Enum_MsgType.MSG_RL_INOF, this.upRLInfo, this);
		this._first = false;
		clearTimeout(this._timeOut);
	}
	private _timeOut;
	private upReFlash1(): void {
		//动画
		this.showEff();
		var self = this;
		this._timeOut = setTimeout(function () {
			self.showEffEnd();
		}, 600);
	}

	private showEffEnd(): void {
		var item = 0;
		var coin = 0;
		var exp = 0;
		var pro = 0;
		var lianhun = 0;
		var peiydan = 0;
		var arr = this._showList
		var progress = this.expBar.data;
		var level = this.labLevel.data;

		for (let i = 0; i < arr.length; i++) {
			var equip = arr[i];
			if (equip == null) {
				continue;
			}
			var rewardArr = ConfigHelp.SplitStr(equip.cfg.reward);
			for (let j = 0; j < rewardArr.length; j++) {
				let type = Number(rewardArr[j][0]);
				let itemId = Number(rewardArr[j][1]);
				let count = Number(rewardArr[j][2])
				if (type == 1) {
					if (itemId == 410001) {
						item += count;
					}
					else if (itemId == 410058) {
						peiydan += count;
					}
					else {
						lianhun += count;
					}
				} else if (type == 3) {
					coin += count;
				} else if (type == 6) {
					exp += count;
				} else if (type == 8) {
					pro += count;
				}
			}
		}
		this._labRlArr[0].data += exp
		this._labRlArr[1].data += coin
		this._labRlArr[2].data += item;
		this._labRlArr[3].data += lianhun;
		this._labRlArr[4].data += peiydan;
		this._labRlArr[0].text = "经验" + "[color=#18e748]+" + this._labRlArr[0].data + "[color]";
		this._labRlArr[1].text = "铜钱" + "[color=#18e748]+" + this._labRlArr[1].data + "[color]";
		this._labRlArr[2].text = "强化石" + "[color=#18e748]+" + this._labRlArr[2].data + "[color]";
		this._labRlArr[3].text = "炼魂石" + "[color=#18e748]+" + this._labRlArr[3].data + "[color]";
		this._labRlArr[4].text = "星宿培养丹" + "[color=#18e748]+" + this._labRlArr[4].data + "[color]";
		progress += pro;
		while (1) {
			var ronglianVo = Config.ronglian_204[level];
			if (ronglianVo == null || ronglianVo.ronglian == 0) {
				break;//已满级
			}
			if (progress < ronglianVo.ronglian) {
				break;
			}
			level++;
			progress -= ronglianVo.ronglian
		}
		let len = this._sendList.length > 15 ? 15 : this._sendList.length
		if (len == 0) {
			let obj = { exp: this._labRlArr[0].data, coin: this._labRlArr[1].data, item: this._labRlArr[2].data, lianhun: this._labRlArr[3].data, dan: this._labRlArr[4].data }
			GGlobal.layerMgr.open(UIConst.RONGLIAN_SUCCESS, obj)
			this.onTouchTapHandler(null);
			this.initStatus();
			this.btn_rl.checkNotice = Model_Bag.checkRongLing()
		} else {
			this._sendList.splice(0, len);
			this._showList = this.autoFill(this._sendList);
			this.upView(this._showList, level, progress)
			this.upReFlash1();
		}
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		var item: ViewGridRender = obj as ViewGridRender;
		item.tipEnabled = false;
		item.vo = this._showList[index];
	}

	protected onTouchTapHandler(event: egret.TouchEvent): void {
		var now = egret.getTimer();
		if (now - this._lastTime < 200) {
			return;
		}
		this._lastTime = now;
		if (this._sendList.length > 0) {
			GGlobal.modelRL.CG_RL_EQUIP_LIST(1, this._sendList);
			this.boxGetEq.visible = this.btn_rl.visible = this.btn_rl.touchable = false;
		} else if (this._sendList.length == 0 && this.btn_rl.touchable == true) {
			ViewCommonWarn.text("没有装备可熔炼");
		}
	}

	private initStatus(): void {
		this.boxGetEq.visible = this.btn_rl.visible = this.btn_rl.touchable = true;
		for (let i = 0; i < this._labRlArr.length; i++) {
			this._labRlArr[i].text = "";
			this._labRlArr[i].data = 0;
		}
	}

	private upRLInfo(): void {
		if (this._first) {
			this.update();
			this._first = false;
		}
	}

	public update(): void {
		clearTimeout(this._timeOut);
		this.initStatus();
		this._sendList = Model_RongLian.onekeyRongLianArr();
		this._showList = this.autoFill(this._sendList);
		this.upView(this._showList, Model_RongLian.rl_level, Model_RongLian.rl_progress)
		this.btn_rl.checkNotice = Model_Bag.checkRongLing()
	}

	private upView(arr, level, progress): void {
		this.dataList.numItems = arr.length;
		this.labLevel.text = "熔炼等级    " + level
		this.labLevel.data = level
		var ronglianVo = Config.ronglian_204[level];
		var barValue;
		if (ronglianVo.ronglian == 0) {
			barValue = 0;
			// this.expBar.text = "已满级";
			this.expBar._titleObject.text = "已满级";
		} else {
			barValue = progress * 100 / ronglianVo.ronglian;
			// this.expBar.text = progress + "/" + ronglianVo.ronglian;
			this.expBar._titleObject.text = progress + "/" + ronglianVo.ronglian;
		}
		this.expBar.data = progress
		var preValue = this.expBar.value;
		if (preValue > barValue) {
			if (preValue >= 100) {
				this.expBar.value = 0
				this.expBar.tweenValue(barValue, 0.3);
			} else {
				var x1 = (100 - preValue) * 0.3 / (100 - preValue + barValue)
				var x2 = 0.3 - x1;
				this.expBar.tweenValue(100, x1).onComplete(function () { this.expBar.value = 0; this.expBar.tweenValue(barValue, x2); }, this);
			}
		} else {
			this.expBar.tweenValue(barValue, 0.3);
		}
		var shuxingArr = ConfigHelp.SplitStr(ronglianVo.shuxing)
		for (let i: number = 0; i < shuxingArr.length; i++) {
			let attrType: number = Number(shuxingArr[i][0]);
			let attrValue: number = Number(shuxingArr[i][1]);
			if (this._labAttrArr[i]) {
				let name = Config.jssx_002[attrType].name;
				this._labAttrArr[i].text = name + "[color=#18e748]+" + attrValue + "[color]";
			}
		}
	}

	protected autoFill(equipList): any {
		var ret = [];
		for (var i: number = 0; i < 15; i++) {
			var voe: VoEquip = equipList[i];
			ret.push(voe);
		}
		return ret;
	}


	public showEff(): void {
		for (let i = 0; i < this.dataList.numItems; i++) {
			let gridRender: ViewGridRender = this.dataList.getChildAt(i) as ViewGridRender;
			if (gridRender.vo) {
				let grid = gridRender.grid;
				EffectMgr.addEff("uieff/10007", grid.displayListContainer, grid.width / 2, grid.height / 2, 400, 400, false);
			}
		}
	}

	public guide_ronglian(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.btn_rl, self.btn_rl.width / 2, self.btn_rl.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.btn_rl, self.btn_rl.width / 2, 0, -90, -106, -100);
		if (self.btn_rl.parent) self.btn_rl.parent.setChildIndex(self.btn_rl, self.btn_rl.parent.numChildren - 1);
	}

	private onLinkHandler1(e: egret.TouchEvent) {
		e.stopPropagation();
		e.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.GUANQIABOSSUI)
	}
	private onLinkHandler2(e: egret.TouchEvent) {
		e.stopPropagation();
		e.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.GUANQIASWEEPING)
	}
	private onLinkHandler3(e: egret.TouchEvent) {
		e.stopPropagation();
		e.stopImmediatePropagation();
		GGlobal.layerMgr.open(UIConst.QMBOSS)
	}
}