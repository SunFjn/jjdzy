class VCrossWars16 extends fairygui.GComponent {

	public imgWin1: fairygui.GGraph;
	public imgWin2: fairygui.GGraph;
	public imgWin3: fairygui.GGraph;
	public imgWin4: fairygui.GGraph;
	public lbName1: fairygui.GRichTextField;
	public lbName2: fairygui.GRichTextField;
	public lbGroup: fairygui.GRichTextField;
	public lbName3: fairygui.GRichTextField;
	public lbName4: fairygui.GRichTextField;
	public btnLook2: fairygui.GButton;
	public btnLook1: fairygui.GButton;
	public imgYa1: fairygui.GImage;
	public btnYa2: fairygui.GButton;
	public btnYa1: fairygui.GButton;
	public imgYa3: fairygui.GImage;
	public imgYa2: fairygui.GImage;
	public imgYa4: fairygui.GImage;

	public static URL: string = "ui://me1skowlhfct46";

	public static createInstance(): VCrossWars16 {
		return <VCrossWars16><any>(fairygui.UIPackage.createObject("crossKing", "VCrossWars16"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);

		self.btnYa1.addClickListener(self.onGuess1, self);
		self.btnYa2.addClickListener(self.onGuess2, self);
		self.btnLook1.addClickListener(self.onGuess1, self);
		self.btnLook2.addClickListener(self.onGuess2, self);
	}

	private onGuess1() {
		VCrossWars16.onGuess(this._vo1)
	}
	private onGuess2() {
		VCrossWars16.onGuess(this._vo2)
	}

	public static onGuess(v: Vo_CrossWarsPly) {
		if (v.power1 == 0 && v.power2 == 0) {
			return;
		}
		if (v.battleRes > 0) {
			if (v.power1 == 0 || v.power2 == 0) {
				ViewCommonWarn.text("本次战斗轮空");
				return;
			}
			GGlobal.modelCrossWars.CG_LOOK_BATTLE(v)
			return;//可观战
		}
		let buyIndex = -1
		let arr = Model_CrossWars.matchPlyArr[v.turn]
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].buywin > 0) {
				buyIndex = arr[i].index;
				break;
			}
		}
		if (buyIndex == -1 || buyIndex == v.index) {
			GGlobal.layerMgr.open(UIConst.CROSS_WARS_BET, v)
			return;
		}
		ViewCommonWarn.text("每个赛程只可押注一场")
	}

	private _vo1: Vo_CrossWarsPly
	private _vo2: Vo_CrossWarsPly
	public set vo(arr: Array<Vo_CrossWarsPly>) {
			let self = this;
		self._vo1 = arr[0];
		self._vo2 = arr[1];
		if (self._vo1) {
			self.lbGroup.text = Model_CrossWars.getGroupName(self._vo1.index / 2 + 1);

		} else {
			self.lbGroup.text = "";
		}
		VCrossWars16.setData(self._vo1, self.lbName1, self.lbName2, self.btnYa1, self.btnLook1, self.imgWin1, self.imgWin2, self.imgYa1, self.imgYa2)
		VCrossWars16.setData(self._vo2, self.lbName3, self.lbName4, self.btnYa2, self.btnLook2, self.imgWin3, self.imgWin4, self.imgYa3, self.imgYa4)
	}

	public static setData(v: Vo_CrossWarsPly, lb1: fairygui.GTextField, lb2: fairygui.GTextField,
		btnYa: fairygui.GButton, btnLook: fairygui.GButton,
		imgW1: fairygui.GObject, imgW2: fairygui.GObject,
		imgYa1: fairygui.GObject, imgYa2: fairygui.GObject): void {
		btnYa.visible = btnYa.touchable = false
		btnLook.visible = btnLook.touchable = false
		imgW1.visible = false;
		imgW2.visible = false;
		imgYa1.visible = false;
		imgYa2.visible = false;
		if (v) {
			lb1.text = v.name1 ? v.name1 : "暂无"
			lb2.text = v.name2 ? v.name2 : "暂无"
			lb1.color = 0xffffff;
			lb1.color = 0xffffff;
			if (v.buywin == 1) {
				imgYa1.visible = true;
			} else if (v.buywin == 2) {
				imgYa2.visible = true;
			}

			if (v.battleRes == 1) {
				imgW1.visible = true;
				if (v.name2) lb2.color = 0x999999;
			} else if (v.battleRes == 2) {
				imgW2.visible = true;
				if (v.name1) lb1.color = 0x999999;
			}
			if (v.power1 == 0 && v.power2 == 0) {//没人

			}
			else if (v.battleRes > 0) {
				btnLook.visible = btnLook.touchable = true
			} else {
				btnYa.visible = btnYa.touchable = true
			}
		} else {
			lb1.text = "暂无"
			lb2.text = "暂无"
		}
	}
}