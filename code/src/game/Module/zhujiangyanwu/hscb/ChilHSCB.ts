class ChilHSCB extends fairygui.GComponent {

	public lbCur: fairygui.GRichTextField;
	public lbBig: fairygui.GRichTextField;
	public lbPower: fairygui.GRichTextField;
	public imgPass: fairygui.GImage;
	public layer1: ItemHSCB;
	public listRew: fairygui.GList;
	public vhead: ViewHead;
	public btnBat: fairygui.GButton;
	public btnRank: fairygui.GButton;
	public lbRank: fairygui.GRichTextField;
	public listBig: fairygui.GList;
	public layer2: ItemHSCB;
	public layer3: ItemHSCB;
	public layer0: ItemHSCB;
	public imgBg: fairygui.GLoader;

	public static URL: string = "ui://7a366usaql4nf";


	public static createInstance(): ChilHSCB {
		return <ChilHSCB><any>(fairygui.UIPackage.createObject("zjyw", "ChilHSCB"));
	}

	public constructor() {
		super();
	}

	private layerArr: ItemHSCB[];
	private _rewArr;
	private _bigArr;

	protected constructFromXML(xml) {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onShow, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onHide, this);
		this.layerArr = [this.layer0, this.layer1, this.layer2, this.layer3]
		this.listRew.itemRenderer = this.renderHandle;
		this.listRew.callbackThisObj = this;
		this.listBig.itemRenderer = this.renderBig;
		this.listBig.callbackThisObj = this;
	}

	public onShow() {
		IconUtil.setImg(this.imgBg, Enum_Path.BACK_URL + "hscb.jpg");
		GGlobal.model_HSCB.CG_OPENUI_7931();
		this.btnBat.addClickListener(this.onChallenge, this);
		this.btnRank.addClickListener(this.onRank, this);
		GGlobal.model_HSCB.listen(Model_HSCB.msg_openui, this.onUpdate, this);

	}
	public onHide() {
		IconUtil.setImg(this.imgBg, null);
		this.btnBat.removeClickListener(this.onChallenge, this);
		this.btnRank.removeClickListener(this.onRank, this);
		GGlobal.model_HSCB.remove(Model_HSCB.msg_openui, this.onUpdate, this);
		for (let i = 0; i < this.layerArr.length; i++) {
			const item = this.layerArr[i];
			item.removeEvent();
		}
		this.listRew.numItems = 0;
		this.listBig.numItems = 0;
	}

	private onChallenge() {
		GGlobal.model_HSCB.CG_UPLAYER_7933();
	}

	private onRank() {
		GGlobal.layerMgr.open(UIConst.HSCB_RANK)
	}

	private onUpdate() {
		let s = this;
		let m = GGlobal.model_HSCB
		let curLayer = m.curLayer + 1;


		let arr: Ihscb_751[] = [];
		let i = m.curLayer <= 0 ? 1 : m.curLayer
		while (true) {
			let v = Config.hscb_751[i]
			if (v) { arr.push(v); }
			else { break; }
			if (arr.length >= 4) break;
			i++;
		}
		if (arr.length < 4) {
			i = m.curLayer - 1
			while (true) {
				let v = Config.hscb_751[i]
				if (v) { arr.unshift(v); }
				else { break; }
				if (arr.length >= 4) break;
				i--;
			}
		}
		if (arr.length == 0) return;
		for (let i = 0; i < s.layerArr.length; i++) {
			let v = s.layerArr[i]
			v.vo = arr[i];
		}

		let layVo = Config.hscb_751[curLayer]
		if (!layVo) {//最大
			s.lbCur.text = "当前关卡：" + (curLayer - 1) + "关";
			layVo = Config.hscb_751[curLayer - 1]
			s._rewArr = ConfigHelp.makeItemListArr(JSON.parse(layVo.gqjl))
			s.listRew.numItems = s._rewArr.length

			this.imgPass.visible = true;
			this.btnBat.visible = false;
		} else {
			s.lbCur.text = "当前关卡：" + curLayer + "关";
			s._rewArr = ConfigHelp.makeItemListArr(JSON.parse(layVo.gqjl))
			s.listRew.numItems = s._rewArr.length

			this.imgPass.visible = false;
			this.btnBat.visible = true;
		}

		//大奖
		let maxCfg: Ihscb_751 = m.getBigRewCfg(curLayer)
		s._bigArr = ConfigHelp.makeItemListArr(JSON.parse(maxCfg.dj))
		s.listBig.numItems = s._bigArr.length
		s.lbBig.text = maxCfg.id + "关大奖";
		if (maxCfg.zl == 0) {
			this.lbPower.text = "战力飙升";
		} else {
			this.lbPower.text = "战力+" + maxCfg.zl;
		}
		//第一
		if (m.firName) {
			s.vhead.setdata(m.firHead, 0, m.firName, 0, false, m.firFrame)
			s.lbRank.text = "通关" + m.firLayer + "层"
		} else {
			s.vhead.setdata(0, 0, "虚位以待")
			s.lbRank.text = ""
		}
	}


	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.tipEnabled = true;
		v.isShowEff = true;
		v.vo = this._rewArr[index];
	}
	private renderBig(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.tipEnabled = true;
		v.isShowEff = true;
		v.vo = this._bigArr[index];
	}
}