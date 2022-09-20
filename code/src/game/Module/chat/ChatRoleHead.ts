class ChatRoleHead extends fairygui.GComponent {

	public headIcon: fairygui.GLoader;
	public frameIcon: fairygui.GLoader;
	public countryImg: fairygui.GLoader;
	public vipLb: fairygui.GRichTextField;
	public vipGroup: fairygui.GGroup;

	public static URL: string = "ui://fx4pr5qeog791";

	public static createInstance(): ChatRoleHead {
		return <ChatRoleHead><any>(fairygui.UIPackage.createObject("chat", "ChatRoleHead"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		a.headIcon = <fairygui.GLoader><any>(a.getChild("headIcon"));
		a.frameIcon = <fairygui.GLoader><any>(a.getChild("frameIcon"));
		a.countryImg = <fairygui.GLoader><any>(a.getChild("countryImg"));
		a.vipLb = <fairygui.GRichTextField><any>(a.getChild("vipLb"));
		a.vipGroup = <fairygui.GGroup><any>(a.getChild("vipGroup"));
	}

	public show(vo: Vo_Chat) {
		let a = this;
		var headPic = Config.shezhi_707[vo.headId];
		var framePic = Config.shezhi_707[vo.frameId];
		ImageLoader.instance.loader(Enum_Path.HEAD_URL + headPic.picture + ".png", a.headIcon);
		ImageLoader.instance.loader(Enum_Path.HEAD_URL + framePic.picture + ".png", a.frameIcon);
		if (vo.country > 0) {
			a.countryImg.url = CommonManager.getCommonUrl("country" + vo.country);
			a.countryImg.visible = true;
		} else {
			a.countryImg.visible = false;
		}
		if (vo.vip <= 0) {
			a.vipGroup.visible = false;
		} else {
			a.vipLb.text = ConfigHelp.getVipShow(vo.vip);
			a.vipGroup.visible = true;
		}
	}
}