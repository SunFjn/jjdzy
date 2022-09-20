class ViewJuQingPanel extends UIModalPanel {

	public lbDesc: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lbTime: fairygui.GRichTextField;
	public viewHead: fairygui.GLoader;

	public static URL: string = "ui://vm8a565ak0t23fn";

	public static createInstance(): ViewJuQingPanel {
		return <ViewJuQingPanel><any>(fairygui.UIPackage.createObject("juQing", "ViewJuQingPanel"));
	}

	public constructor() {
		super();
		// this.isShowOpenAnimation = false;
		this.isShowMask = false;
		this.loadRes("juQing", "juQing_atlas0");
		// this.setSkin("juQing", "juQing_atlas0", "ViewJuQingPanel");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("juQing");
		this.view = fairygui.UIPackage.createObject("juQing", "ViewJuQingPanel").asCom;
		this.contentPane = this.view;

		this.lbDesc = <fairygui.GRichTextField><any>(this.view.getChild("lbDesc"));
		this.lbName = <fairygui.GRichTextField><any>(this.view.getChild("lbName"));
		this.viewHead = <fairygui.GLoader><any>(this.view.getChild("viewHead"));
		this.lbTime = <fairygui.GRichTextField><any>(this.view.getChild("lbTime"));
		this.isShowOpenAnimation = false;
		this.isClosePanel = false;
		super.childrenCreated();
	}

	private _time: number = 2;
	private _juQArr: { npc: number, word: string }[];
	private _index;

	protected onShown(): void {
		this.setXY(-this.width, 250);
		egret.Tween.get(this).to({ x: 41 }, 400, egret.Ease.backInOut).call(this.begain, this);
		let type = this._args[0]
		let gua = this._args[1]
		this._juQArr = ViewJuQingPanel.getJuQCfg(type, gua);
		this._time = 3;
		this._index = 0;
		this.visible = true;
		this._clickEnable = false;
		this.upTimer();
		this.next();
	}

	private begain() {
		let s = this;
		Timer.instance.listen(s.upTimer, s, 1000);
		GGlobal.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, s.onClick, s);
	}

	private end() {
		let s = this;
		Timer.instance.remove(s.upTimer, s);
		GGlobal.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, s.onClick, s);
	}

	protected onHide(): void {
		let s = this;
		IconUtil.setImg(s.viewHead, null);
		GGlobal.layerMgr.close(UIConst.XIN_SHOU_JU_QING);
		ViewJuQingPanel.status = 1;
		s.end();

	}
	public static status = 0;//0初始   1剧情完   2剧情中  3人物剧情  4boss剧情
	public static _maxGua: number = 0;
	public static get maxGua() {
		if (ViewJuQingPanel._maxGua == 0) {
			ViewJuQingPanel.initData();
		}
		return ViewJuQingPanel._maxGua
	}
	private static _juQCfg: any
	public static getJuQCfg($lei, $gua): { npc: number, word: string }[] {
		ViewJuQingPanel.initData();
		return ViewJuQingPanel._juQCfg[$lei][$gua]
	}

	private static initData() {
		if (ViewJuQingPanel._juQCfg == null) {
			ViewJuQingPanel._juQCfg = {}
			for (let keys in Config.xsjq_014) {
				let v = Config.xsjq_014[keys]
				let t = JSON.parse(v.type)//ConfigHelp.SplitStr(v.type)
				let lei = Number(t[0][0])
				let gua = Number(t[0][1])
				if (ViewJuQingPanel._juQCfg[lei] == null) {
					ViewJuQingPanel._juQCfg[lei] = {}
				}
				let wordArr = JSON.parse(v.word)//ConfigHelp.SplitStr(v.word)
				let arr = []
				for (let i = 0; i < wordArr.length; i++) {
					let npc = Number(wordArr[i][0])
					let word = wordArr[i][1]
					arr[i] = { npc: npc, word: word }
				}
				ViewJuQingPanel._juQCfg[lei][gua] = arr;

				if (lei == 1 && gua > ViewJuQingPanel._maxGua) {
					ViewJuQingPanel._maxGua = gua;
				}
			}
		}
	}

	private upTimer(): void {
		this._time--;
		if (this._time <= 0) {
			this.visible = false;
			this.lbTime.text = ""
			this.chageStatus();
		} else {
			this.lbTime.text = "" + this._time;
		}
	}

	private chageStatus() {
		let s = this;
		s.end();
		setTimeout(function () {
			s._time = 3
			s._clickEnable = false;
			s.next()
		}, 1000);

		if (this._index < this._juQArr.length) {
			if (ViewJuQingPanel.status == 3 || ViewJuQingPanel.status == 4) {
				ViewJuQingPanel.status = ViewJuQingPanel.status == 4 ? 3 : 4;
			}
			GGlobal.control.notify(Enum_MsgType.MSG_JUQING_STATUS, true);
		}
	}

	private next() {
		let v = this._juQArr[this._index]
		if (v) {
			this.setXY(-this.width, 250);
			egret.Tween.get(this).to({ x: 41 }, 400, egret.Ease.backInOut).call(this.begain, this);
			this.visible = true;
			if (v.npc == 0) {
				this.lbName.text = Model_player.voMine.name;
				var headPic = Config.shezhi_707[Model_Setting.headId];
				IconUtil.setImg(this.viewHead, RoleUtil.getHeadJuQ(headPic.picture + ""));
				if (ViewJuQingPanel.status == 0) ViewJuQingPanel.status = 3;
			} else {
				let npc = Config.NPC_200[v.npc]
				this.lbName.text = npc.name;
				IconUtil.setImg(this.viewHead, RoleUtil.getHeadJuQ(npc.head + ""));
				if (ViewJuQingPanel.status == 0) ViewJuQingPanel.status = 4;
			}
			this.lbDesc.text = v.word
		} else {
			this.visible = false;
			this.lbTime.text = ""
			this.closeEventHandler(null)
		}
		this._index++;
	}
	private _clickEnable = false;
	private onClick() {
		if (this._clickEnable) {
			return;
		}
		this._clickEnable = true;
		this._time = 1;
		this.upTimer();
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, 250);
		// if (this.modalLayer) this.modalLayer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
		this.setModalMask();
	}
}