class VCrossWars8 extends fairygui.GComponent {

	public lbGroup: fairygui.GRichTextField;
	public viewHead1: ViewHead;
	public btnYa: fairygui.GButton;
	public btnLook: fairygui.GButton;
	public lbName1: fairygui.GRichTextField;
	public viewHead2: ViewHead;
	public lbName2: fairygui.GRichTextField;
	public imgWin2: fairygui.GImage;
	public imgWin1: fairygui.GImage;
	public imgYa1: fairygui.GImage;
	public imgYa2: fairygui.GImage;

	public static URL: string = "ui://me1skowlhfct47";

	public static createInstance(): VCrossWars8 {
		return <VCrossWars8><any>(fairygui.UIPackage.createObject("crossKing", "VCrossWars8"));
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
		if (v) {
			self.lbGroup.text = Model_CrossWars.getGroupName(v.index + 1);
		} else {
			self.lbGroup.text = ""
		}
		VCrossWars16.setData(self._vo, self.lbName1, self.lbName2, self.btnYa, self.btnLook, self.imgWin1, self.imgWin2, self.imgYa1, self.imgYa2);
		self.viewHead1.setdata(self._vo.head1, -1, "", -1, false, self._vo.frame1)
		self.viewHead2.setdata(self._vo.head2, -1, "", -1, false, self._vo.frame2)
	}
}