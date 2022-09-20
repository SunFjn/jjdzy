class NoticeItem1 extends fairygui.GComponent{
	public bgImg: fairygui.GLoader;
	public lbTitle: fairygui.GRichTextField;

	public static URL: string = "ui://ye1luhg3k2yd1g";

	public static createInstance(): NoticeItem1 {
		return <NoticeItem1><any>(fairygui.UIPackage.createObject("Welfare", "NoticeItem1"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public show(vo:Ignyg_336) {
		let self = this;
		if(!vo)    return;

		self.lbTitle.text = vo.nr;
		if(vo.bg == "0")
		{
			IconUtil.setImg(self.bgImg, null);
			self.height = 36;
		}else{
			IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + vo.bg + ".jpg");
			self.height = 211;
		}
	}
}