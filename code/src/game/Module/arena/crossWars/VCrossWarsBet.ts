class VCrossWarsBet extends fairygui.GButton {

	public lbName: fairygui.GTextField;
	public lbGuanxian: fairygui.GTextField;
	public lbPower: fairygui.GTextField;
	public viewHead: ViewHead;
	public imgYa1: fairygui.GImage;
	public imgYa2: fairygui.GImage;

	public static URL: string = "ui://me1skowlhfct4d";

	public static createInstance(): VCrossWarsBet {
		return <VCrossWarsBet><any>(fairygui.UIPackage.createObject("crossKing", "VCrossWarsBet"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	public setVo(v: Vo_CrossWarsPly, index) {
		let self = this;
		self.imgYa1.visible = false
		self.imgYa2.visible = false
		if (index == 0) {
			self.lbName.text = v.name1;
			self.lbGuanxian.text = Model_GuanXian.getJiangXianStr1(v.guanxian1);
			self.lbPower.text = "战斗力" + v.power1;
			self.viewHead.setdata(v.head1, -1, null, -1, false, v.frame1)
			if (v.buywin == 1) {
				self.imgYa1.visible = true
			}
		} else {
			self.lbName.text = v.name2;
			self.lbGuanxian.text = Model_GuanXian.getJiangXianStr1(v.guanxian2);;
			self.lbPower.text = "战斗力" + v.power2;
			self.viewHead.setdata(v.head2, -1, null, -1, false, v.frame2)
			if (v.buywin == 2) {
				self.imgYa2.visible = true
			}
		}
	}
}