class ItemHongBaoRecord extends fairygui.GComponent {
	public lbName: fairygui.GRichTextField;
	public lbNum: fairygui.GRichTextField;
	public dingImg: fairygui.GImage;

	public static URL: string = "ui://s01exr8xqz028";

	public static createInstance(): ItemHBRecord {
		return <ItemHBRecord><any>(fairygui.UIPackage.createObject("HongBao", "ItemHongBaoRecord"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public setData(vo: Vo_HongBao, bol: boolean = false) {
		let self = this;
		if (!vo) return;
		self.lbName.text = vo.recordName;
		self.lbName.color = vo.isMyself ? Color.GREENINT : Color.WHITEINT;
		self.lbNum.text = vo.money + "";
		self.dingImg.visible = bol;
	}
}