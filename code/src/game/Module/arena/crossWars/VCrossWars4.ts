class VCrossWars4 extends fairygui.GComponent {

	public btnLook: fairygui.GButton;
	public btnYa: fairygui.GButton;
	public viewWin1: VCrossWarsWin;
	public viewWin2: VCrossWarsWin;
	public imgWin2: fairygui.GImage;
	public imgYa1: fairygui.GImage;
	public imgWin1: fairygui.GImage;
	public imgYa2: fairygui.GImage;

	public static URL: string = "ui://me1skowlhfct48";

	public static createInstance(): VCrossWars4 {
		return <VCrossWars4><any>(fairygui.UIPackage.createObject("crossKing", "VCrossWars4"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.btnYa.addClickListener(self.onGuess, self);
		self.btnLook.addClickListener(self.onGuess, self);
	}

	private onGuess() {
		VCrossWars16.onGuess(this._vo)
	}

	private _vo: Vo_CrossWarsPly
	public set vo(v: Vo_CrossWarsPly) {
		let self = this;
		self._vo = v;
		self.viewWin1.setVoWars(v, 1)
		self.viewWin2.setVoWars(v, 2)
		VCrossWars16.setData(self._vo, self.viewWin1.lbName, self.viewWin2.lbName, self.btnYa, self.btnLook, self.imgWin1, self.imgWin2, self.imgYa1, self.imgYa2);
	}

	public set first(v) {
		let self = this;
		self._vo = v;
		if (v) {
			self.visible = true
			self.viewWin1.setVoWars(v, 1)
			self.viewWin2.setVoWars(v, 2)
			VCrossWars16.setData(self._vo, self.viewWin1.lbName, self.viewWin2.lbName, self.btnYa, self.btnLook, self.imgWin1, self.imgWin2, self.imgYa1, self.imgYa2);
		} else {
			self.visible = false
		}

	}

	public clean(): void {
		super.clean();
		let self = this;
		self.viewWin1.clean();
		self.viewWin2.clean();
	}
}