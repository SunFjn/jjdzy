class NZBZHead extends fairygui.GComponent {

	public headIcon: fairygui.GLoader;
	public frameIcon: fairygui.GLoader;
	public countryImg: fairygui.GLoader;
	public levelLb: fairygui.GRichTextField;

	public static URL: string = "ui://xzyn0qe3aro8m";

	public static createInstance(): NZBZHead {
		return <NZBZHead><any>(fairygui.UIPackage.createObject("nzbz", "NZBZHead"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.headIcon = <fairygui.GLoader><any>(this.getChild("headIcon"));
		this.frameIcon = <fairygui.GLoader><any>(this.getChild("frameIcon"));
		this.countryImg = <fairygui.GLoader><any>(this.getChild("countryImg"));
		this.levelLb = <fairygui.GRichTextField><any>(this.getChild("levelLb"));
	}

	public show(headId, frameId, country, level) {
		var headPic = Config.shezhi_707[headId];
		var framePic = Config.shezhi_707[frameId];
		ImageLoader.instance.loader(Enum_Path.HEAD_URL + headPic.picture + ".png", this.headIcon);
		ImageLoader.instance.loader(Enum_Path.HEAD_URL + framePic.picture + ".png", this.frameIcon);
		this.countryImg.url = CommonManager.getCommonUrl("country" + country);
		this.levelLb.text = level + "";
	}
}