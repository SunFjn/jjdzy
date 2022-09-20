class ViewHead extends fairygui.GComponent {

	public headIcon: fairygui.GLoader;
	public frameIcon: fairygui.GLoader;
	public lbLv: fairygui.GRichTextField;
	public g0: fairygui.GGroup;
	public ng: fairygui.GImage;
	public lbName: fairygui.GRichTextField;
	public g1: fairygui.GGroup;
	public gvip: fairygui.GGroup;
	public vipLb: fairygui.GTextField;
	public imgCountry: fairygui.GLoader;

	public static URL: string = "ui://jvxpx9emp75387";

	public static createInstance(): ViewHead {
		return <ViewHead><any>(fairygui.UIPackage.createObject("common", "ViewHead"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.headIcon = <fairygui.GLoader><any>(s.getChild("headIcon"));
		s.frameIcon = <fairygui.GLoader><any>(s.getChild("frameIcon"));
		s.lbLv = <fairygui.GRichTextField><any>(s.getChild("lbLv"));
		s.g0 = <fairygui.GGroup><any>(s.getChild("g0"));
		s.ng = <fairygui.GImage><any>(s.getChild("ng"));
		s.lbName = <fairygui.GRichTextField><any>(s.getChild("lbName"));
		s.g1 = <fairygui.GGroup><any>(s.getChild("g1"));
		s.gvip = <fairygui.GGroup><any>(s.getChild("gvip"));
		s.vipLb = <fairygui.GTextField><any>(s.getChild("vipLb"));
		s.imgCountry = <fairygui.GLoader><any>(s.getChild("imgCountry"));
		s.imgCountry.visible = false;
	}
	/**
	 * head 设置表的id
	 * lv 等级
	 * name 名字
	 *  vip
	 * nocfg 全URL
	*/
	public setdata(head = null, lv: any = -1, name: string = "", vip: number = -1, noCFG = false, frame = null, country: number = 0) {
		let s = this;
		if (!head) {//头像
			ImageLoader.instance.loader(RoleUtil.getHeadRole("tx_00"), s.headIcon);
		} else if (noCFG) {
			ImageLoader.instance.loader(head, s.headIcon);
		} else {
			var headPic = Config.shezhi_707[head];
			ImageLoader.instance.loader(RoleUtil.getHeadRole(headPic.picture + ""), s.headIcon);
		}
		if (!frame) {//头像框
			ImageLoader.instance.loader(RoleUtil.getHeadRole("2001"), s.frameIcon);
		} else if (noCFG) {
			ImageLoader.instance.loader(frame, s.frameIcon);
		} else {
			var framePic = Config.shezhi_707[frame];
			ImageLoader.instance.loader(RoleUtil.getHeadRole(framePic.picture + ""), s.frameIcon);
		}
		s.g0.visible = false;
		s.g1.visible = false;
		s.gvip.visible = false;
		if (lv > 0) {
			s.lbLv.text = lv + "";
			s.g0.visible = true;
		}
		if (name) {
			s.lbName.text = name;
			s.g1.visible = true;
		}
		if (vip > 0) {
			s.vipLb.text = ConfigHelp.getVipShow(vip);
			s.gvip.visible = true;
		}
		if (country > 0) {
			s.imgCountry.url = CommonManager.getCommonUrl("country" + country);
			s.imgCountry.visible = true;
		} else {
			s.imgCountry.visible = false;
		}
	}
}