class VActHolyBHead extends fairygui.GComponent {

	public chooseImg:fairygui.GImage;
	public headIcon:fairygui.GLoader;
	public frameIcon:fairygui.GLoader;

	public static URL:string = "ui://4aepcdbwwg9y4q";

	public static createInstance():VActHolyBHead {
		return <VActHolyBHead><any>(fairygui.UIPackage.createObject("shouhunJX","VActHolyBHead"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.chooseImg = <fairygui.GImage><any>(this.getChild("chooseImg"));
		this.headIcon = <fairygui.GLoader><any>(this.getChild("headIcon"));
		this.frameIcon = <fairygui.GLoader><any>(this.getChild("frameIcon"));
	}

	public upHead(){
		let s = this;
		let head = Model_Setting.headId
		let frame = Model_Setting.frameId
		var headPic = Config.shezhi_707[head];
		ImageLoader.instance.loader(RoleUtil.getHeadRole(headPic.picture + ""), s.headIcon);
		var framePic = Config.shezhi_707[frame];
		ImageLoader.instance.loader(RoleUtil.getHeadRole(framePic.picture + ""), s.frameIcon);
	}
}