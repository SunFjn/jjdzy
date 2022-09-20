class Child_RunMan extends fairygui.GComponent implements IPanel {

	//>>>>start
	public backImg: fairygui.GLoader;
	public imgBig: fairygui.GImage;
	public labMaxLayer: fairygui.GRichTextField;
	public btnChallenge: Button0;
	public labBigReward: fairygui.GTextField;
	public btnOneKey: Button1;
	public gridBigReward: VRunManGrid;
	public vLayer2: VRunManLayer;
	public vLayer1: VRunManLayer;
	public vLayer0: VRunManLayer;
	public vLayer3: VRunManLayer;
	public btnSoul: Button2;
	//>>>>end

	public static URL: string = "ui://pkuzcu87x3g6l";

	public vLayerArr: Array<VRunManLayer>;

	public static createInstance(): Child_RunMan {
		return <Child_RunMan><any>(fairygui.UIPackage.createObject("FuBen", "Child_RunMan"));
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
		const self = this;

		CommonManager.parseChildren(self, self);

		self.vLayerArr = [];
		for (let i = 0; i < 4; i++) {
			self.vLayerArr.push(<VRunManLayer><any>(self.getChild("vLayer" + i)))
		}

		self.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, self.onAdd, self);
		self.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.onRemove, self);
	}
	private onAdd() {
		IconUtil.setImg(this.backImg, Enum_Path.BACK_URL + "bg4.jpg");
	}
	private onRemove() {
		this.gridBigReward.onRemove();
		IconUtil.setImg(this.backImg, null);
	}

	public addListen(): void {
		this.btnSoul.addClickListener(this.onSoul, this);
		this.btnChallenge.addClickListener(this.onChallenge, this);
		this.btnOneKey.addClickListener(this.onOneKey, this);
		GGlobal.control.listen(Enum_MsgType.RUNMAN_OPENUI, this.openUI, this)
		GGlobal.modelRunMan.CG_OPENUI();
	}

	public removeListen(): void {
		this.btnSoul.removeClickListener(this.onSoul, this);
		this.btnChallenge.removeClickListener(this.onChallenge, this);
		this.btnOneKey.removeClickListener(this.onOneKey, this);
		for (let i = 0; i < 4; i++) {
			this.vLayerArr[i].removeListen();
		}
		GGlobal.control.remove(Enum_MsgType.RUNMAN_OPENUI, this.openUI, this)
	}

	private _curLayer: number;
	private _maxLayer: number;
	private _infoCur: VoRunManInfo;
	private _infoMax: VoRunManInfo;
	public update(): void {
		// var type = 1
		// var info = Model_RunMan.layerInfo[type - 1];
		// if (info) {
		// 	this._curLayer = info.layerId % 1000 + 1;
		// 	this._maxLayer = info.layerMaxId % 1000;
		// } else {
		// 	this._curLayer = 1;
		// 	this._maxLayer = 0
		// }
		this._curLayer = 1;
		this._maxLayer = 0

		this._infoCur = null;
		this._infoMax = null;
		for (let i = 0; i < 4; i++) {
			let info = Model_RunMan.layerInfo[i];
			if (!info) {
				continue;
			}
			if (info.layerId > 0) {
				this._infoCur = info;
				if (Config.ggzj_008[info.layerId].next == 0) {
					this._curLayer = Config.ggzj_008[info.layerId].guan
				} else {
					this._curLayer = Config.ggzj_008[info.layerId].guan + 1;
				}
			}
			if (info.layerMaxId > 0) {
				this._infoMax = info;
				this._maxLayer = Config.ggzj_008[info.layerMaxId].guan;
			}
		}

		this.labMaxLayer.text = "最高通关：" + this._maxLayer + "关";
		//将魂奖励
		var soulInfo = Model_RunMan.getSoulReward(this._infoMax ? this._infoMax.type : 1, this._maxLayer);
		if (soulInfo) {
			let vo: Vo_JiangHun = Vo_JiangHun.create(soulInfo.ID);
			this.gridBigReward.vo = vo;
			this.gridBigReward.visible = true;
			this.labBigReward.text = "第" + soulInfo.actLayer + "关"
			this.imgBig.visible = true;
		} else {
			this.gridBigReward.visible = false;
			this.labBigReward.text = ""
			this.imgBig.visible = false;
		}
		//层
		let layer = Math.floor((this._curLayer - 1) / 4) * 4 + 1;
		for (let i = 0; i < 4; i++) {
			this.vLayerArr[i].setVo(i + layer, this._infoCur, this._infoMax);
		}
		this.btnOneKey.checkNotice = Model_RunMan.checkTabNotice();
	}

	private onSoul(): void {
		GGlobal.layerMgr.open(UIConst.JIANGHUN);
	}

	private onChallenge(): void {
		if (this._infoCur) {
			var id = this._infoCur.layerId
			var ggzj = Config.ggzj_008[id];
			if (ggzj.next == 0) {
				ViewCommonWarn.text("已达最大关卡");
				return;
			}
		}
		GGlobal.modelRunMan.CG_BattleType(1);
	}

	private onOneKey(): void {
		if (this._infoCur && this._infoCur.layerId >= this._infoMax.layerMaxId) {
			ViewCommonWarn.text("没有可扫荡的关卡");
			return;
		}
		GGlobal.modelRunMan.CG_OneKey(1);
	}

	private openUI(): void {
		this.update();
	}
}