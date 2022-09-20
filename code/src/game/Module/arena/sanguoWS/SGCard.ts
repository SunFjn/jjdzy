/** s is an automatically generated class by FairyGUI. Please do not modify it. **/
class SGCard extends fairygui.GComponent {

	public sg: fairygui.GImage;
	public lbGX: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lbPower: fairygui.GRichTextField;
	public head: ViewHead;
	public yxz: fairygui.GImage;

	public static URL: string = "ui://me1skowl608a10";

	public static createInstance(): SGCard {
		return <SGCard><any>(fairygui.UIPackage.createObject("Arena", "SGCard"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;

		s.sg = <fairygui.GImage><any>(s.getChild("sg"));
		s.lbGX = <fairygui.GRichTextField><any>(s.getChild("lbGX"));
		s.lbName = <fairygui.GRichTextField><any>(s.getChild("lbName"));
		s.lbPower = <fairygui.GRichTextField><any>(s.getChild("lbPower"));
		s.head = <ViewHead><any>(s.getChild("head"));
		s.yxz = <fairygui.GImage><any>(s.getChild("yxz"));
		s.addClickListener(s.onClick, s);
		s.sg.visible = false;
	}

	public idx;
	private playerid;
	public clickHandler: Handler;
	private onClick() {
		let s = this;
		s.clickHandler.runWith(s.playerid);
	}

	public setSel(v) {
		let s = this;
		s.sg.visible = s.playerid == v;
	}

	public setYaZhu(v) {
		let s = this;
		s.yxz.visible = s.playerid == v;
	}

	public setdata(v: Node_SGWS, id) {
		let s = this;
		if (v) {
			s.playerid = v.id;
			s.head.setdata(v.head,null,null,null,false,v.headicn);
			s.lbGX.text = Model_GuanXian.getJiangXianStr(v.jiangxian);
			s.lbName.text = v.name;
			s.lbPower.text = v.power + "";
			s.yxz.visible = true;
			s.head.visible = true;
		} else {
			s.lbGX.text = "";
			s.lbName.text = "";
			s.lbPower.text = "";
			s.yxz.visible = false;
			s.head.visible = false;
		}
		s.yxz.visible = v&&id == v.id;
	}
}