/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class QuanMinHead extends fairygui.GComponent {

	public sg: fairygui.GImage;
	public headIcon: ViewHead;
	public ng: fairygui.GImage;

	public static URL: string = "ui://47jfyc6egs0dr";

	public static createInstance(): QuanMinHead {
		return <QuanMinHead><any>(fairygui.UIPackage.createObject("Boss", "QuanMinHead"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.sg = <fairygui.GImage><any>(s.getChild("sg"));
		s.headIcon = <ViewHead><any>(s.getChild("headIcon"));
		s.ng = <fairygui.GImage><any>(s.getChild("ng"));
	}

	setSel(v) {
		this.sg.visible = v;
	}

	setNotice(v) {
		this.ng.visible = v;
	}

	public isOpenAndLife = false;
	public vo: Vo_QuanMinBoss;
	public setVO(_vo: Vo_QuanMinBoss) {
		let s = this;
		s.vo = _vo;
		s.touchable = _vo.isOpen();
		s.grayed = !_vo.isOpen();

		let itemCount = Model_Bag.getItemCount(410015);
		let count = GGlobal.modelBoss.qmCount;
		s.isOpenAndLife = (count > 0||itemCount>0) && _vo.st == 1 && _vo.isOpen();
		s.setNotice(s.isOpenAndLife);
		s.headIcon.setdata(RoleUtil.getHeadImg(_vo.bosshead + ""), -1, _vo.level,0,true);
	}
}