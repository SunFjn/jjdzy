class Child_Peacock extends fairygui.GComponent implements IPanel {

	//>>>>start
	public imgBg: fairygui.GLoader;
	public btnChallenge: Button1;
	public listDrop: fairygui.GList;
	public labReachMax: fairygui.GTextField;
	public labMaxName: fairygui.GTextField;
	public labMaxLayer: fairygui.GTextField;
	public btnRank: Button2;
	public viewHead: ViewHead;
	public labCurLayer: fairygui.GTextField;
	public labDrop: fairygui.GImage;
	public layer3: VPeacockPly;
	public layer2: VPeacockPly;
	public layer1: VPeacockPly;
	public gridBigReward: ViewGridRender;
	public labBigPower: fairygui.GTextField;
	public labRewardPeople: fairygui.GTextField;
	public btnGetReward: Button2;
	public labBigReward: fairygui.GTextField;
	public labReward: fairygui.GTextField;
	//>>>>end

	public static URL: string = "ui://pkuzcu87hjjz3";

	private _layerReward1: number;
	private _dropReward: Array<any>

	public static createInstance(): Child_Peacock {
		return <Child_Peacock><any>(fairygui.UIPackage.createObject("FuBen", "Child_Peacock"));
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

		this.listDrop.itemRenderer = this.renderHandle;
		this.listDrop.callbackThisObj = this;
		this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);

	}
	protected onAdd() {
		// ImageLoader.instance.loader(Enum_Path.BACK_URL + "bg3.jpg", this.imgBg);
		IconUtil.setImg(this.imgBg, Enum_Path.BACK_URL + "bg3.jpg");
	}
	protected onRemove() {
		IconUtil.setImg(this.imgBg, null);
	}

	public addListen(): void {
		this.btnRank.addClickListener(this.onRank, this);
		this.btnChallenge.addClickListener(this.onChallenge, this);
		this.btnGetReward.addClickListener(this.onGetReward, this);
		GGlobal.control.listen(Enum_MsgType.PEACOCK_PASSLAYER_NUM, this.showNumReward1, this)
	}

	public removeListen(): void {
		this.btnRank.removeClickListener(this.onRank, this);
		this.btnChallenge.removeClickListener(this.onChallenge, this);
		this.btnGetReward.removeClickListener(this.onGetReward, this);
		GGlobal.control.remove(Enum_MsgType.PEACOCK_PASSLAYER_NUM, this.showNumReward1, this)
		this.layer1.removeListen();
		this.layer2.removeListen();
		this.layer3.removeListen();
		this.listDrop.numItems = 0;
		this.gridBigReward.clean();
	}

	public update(): void {
		var curLayer = Model_Peacock.curLayer + 1;
		this.labMaxLayer.text = "??????:" + (Model_Peacock.maxLayer ? Model_Peacock.maxLayer : "0") + "???";
		this.labMaxName.text = Model_Peacock.maxName ? Model_Peacock.maxName : "";
		this.viewHead.setdata(Model_Peacock.maxHead, -1, null, -1, false, Model_Peacock.maxFrame)
		// this.labUltimateName.text = "???????????????[color=#ffffff]" + (Model_Peacock.ultimateName == "" ? "" : Model_Peacock.ultimateName) + "[/color]";
		// this.labUltimatePower.text = "???????????????[color=#ffffff]" + (Model_Peacock.ultimatePower == 0 ? "" : Model_Peacock.ultimatePower) + "[/color]";
		//??????
		var bigLayer = 0;
		var bigReward = ""
		var bigPower = 0
		for (let i = curLayer - 1; i < Model_Peacock.towerArr.length; i++) {
			let tower = Model_Peacock.towerArr[i];
			if (tower.reward != "0") {
				bigLayer = tower.id;
				bigReward = tower.reward
				bigPower = tower.power
				break;
			}
		}
		if (bigReward == "") {//???????????????
			for (let i = curLayer - 1; i >= 0; i--) {
				let tower = Model_Peacock.towerArr[i];
				if (tower && tower.reward != "0") {
					bigLayer = tower.id;
					bigReward = tower.reward
					bigPower = tower.power
					break;
				}
			}
		}
		if (bigReward == "") {
			this.labBigReward.text = ""
			this.gridBigReward.visible = this.gridBigReward.touchable = false;
			this.labBigPower.text = "";
		} else {
			this.labBigReward.text = bigLayer + "?????????"
			this.gridBigReward.visible = this.gridBigReward.touchable = true;
			this.gridBigReward.tipEnabled = true;
			this.gridBigReward.vo = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(bigReward))[0];
			if (bigPower == 0) {
				this.labBigPower.text = "????????????";
			} else {
				this.labBigPower.text = "??????+" + bigPower;
			}
		}
		//??????
		this.showNumReward1()
		//????????????
		var tower = Config.tower_219[curLayer];
		if (tower) {
			this.labCurLayer.text = "???????????????" + curLayer + "???"
			this.labReachMax.text = ""
			this.btnChallenge.touchable = this.btnChallenge.visible = true;
		} else {//?????????
			tower = Config.tower_219[curLayer - 1];
			this.labCurLayer.text = "???????????????" + (curLayer - 1) + "???"
			this.labReachMax.text = "?????????"
			this.btnChallenge.touchable = this.btnChallenge.visible = false;
		}
		if (tower) {
			this._dropReward = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(tower.reward2))
			this.listDrop.numItems = this._dropReward.length;
		} else {
			this.listDrop.numItems = 0;
		}

		let lay;
		if (curLayer == 1) {//?????????
			lay = 2
		} else if (Config.tower_219[curLayer] == null) {//?????????
			lay = curLayer - 2
		} else if (Config.tower_219[curLayer + 1] == null) {//999???
			lay = curLayer - 1
		} else {
			lay = curLayer
		}

		this.layer1.vo = lay - 1;
		this.layer2.vo = lay;
		this.layer3.vo = lay + 1;
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		var item: ViewGrid = obj as ViewGrid;
		item.vo = this._dropReward[index];
		item.tipEnabled = true;
	}

	private onRank(): void {
		GGlobal.layerMgr.open(UIConst.RANK, 2);
	}

	private onChallenge(): void {
		GGlobal.modelPeacock.CG_UPTOWER();
	}


	private onGetReward(): void {
		GGlobal.layerMgr.open(UIConst.PEACOCK_REWARD, this._layerReward1)
	}

	private showNumReward1(): void {
		var curLayer = Model_Peacock.curLayer + 1;
		//??????
		this._layerReward1 = 0;
		var reward1 = "";
		var people1 = 0;
		var peoplePass = 0;
		if (Model_Peacock.rewLayerArr.length > 0) {
			this._layerReward1 = Model_Peacock.rewLayerArr[0]
			peoplePass = Model_Peacock.rewPeopleObj[this._layerReward1]
			people1 = Config.tower_219[this._layerReward1].num
			reward1 = Config.tower_219[this._layerReward1].reward1
		} else {
			for (let i = curLayer - 1; i < Model_Peacock.towerArr.length; i++) {
				let tower = Model_Peacock.towerArr[i];
				if (tower.reward1 != "0") {
					this._layerReward1 = tower.id
					reward1 = tower.reward1
					people1 = tower.num
					peoplePass = Model_Peacock.rewPeopleObj[this._layerReward1];
					if (peoplePass == null) {
						GGlobal.modelPeacock.CG_GETNUM(this._layerReward1);
						peoplePass = 0
					}
					break;
				}
			}
		}
		if (this._layerReward1 == 0) {
			this.btnGetReward.visible = this.btnGetReward.touchable = false;
			this.labReward.text = ""
			this.labRewardPeople.text = ""
		} else {
			this.btnGetReward.visible = this.btnGetReward.touchable = true;
			this.labReward.text = this._layerReward1 + "?????????"
			this.labRewardPeople.text = "???" + people1 + "????????????\n????????????[color=#0ef619]" + peoplePass + "[/color]???"
			this.btnGetReward.checkNotice = Model_Peacock.curLayer >= this._layerReward1;
		}

	}

	public guide_peacock_battle(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.btnChallenge, self.btnChallenge.width / 2, self.btnChallenge.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.btnChallenge, self.btnChallenge.width / 2, 0, -90, -106, -100);
		if (self.btnChallenge.parent) self.btnChallenge.parent.setChildIndex(self.btnChallenge, self.btnChallenge.parent.numChildren - 1);
	}
}