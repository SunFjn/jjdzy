/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class MHTab extends fairygui.GComponent {

	public sg: fairygui.GImage;
	public head: ViewHead;

	public static URL: string = "ui://47jfyc6erjjf14";

	public static createInstance(): MHTab {
		return <MHTab><any>(fairygui.UIPackage.createObject("Boss", "MHTab"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.sg = <fairygui.GImage><any>(s.getChild("sg"));
		s.head = <ViewHead><any>(s.getChild("head"));
		s.head.ng.visible = false;
		s.head.g1.y = 90;
	}

	public setSel(val) {
		this.sg.visible = val;
		this.grayed = !val;
	}

	private _vo: Vo_7MH;
	public setVO(v) {
		this._vo = v;
		this.head.setdata(RoleUtil.getHeadImg(v.head + ""), -1, v.level,0,true);
	}
}