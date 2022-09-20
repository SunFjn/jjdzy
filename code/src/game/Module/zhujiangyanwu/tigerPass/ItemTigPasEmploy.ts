class ItemTigPasEmploy extends fairygui.GButton {

	public button: fairygui.Controller;
	public vhead: ViewHead;
	public lbPower: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lbCt: fairygui.GRichTextField;
	public lbYb: fairygui.GRichTextField;
	public imgYb: fairygui.GImage;
	public lbNo: fairygui.GRichTextField;

	public static URL: string = "ui://7a366usay5hd2g";

	public static createInstance(): ItemTigPasEmploy {
		return <ItemTigPasEmploy><any>(fairygui.UIPackage.createObject("zjyw", "ItemTigPasEmploy"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);
	}

	private _vo: { head: number, frame: number, name: string, vip: number, plyId: number, power: number, price: number, count: number }
	public set vo(v: { head: number, frame: number, name: string, vip: number, plyId: number, power: number, price: number, count: number }) {
		let s = this;
		s._vo = v;
		if (v) {
			s.vhead.setdata(v.head, -1, "", v.vip, false, v.frame);
			s.lbName.text = v.name
			s.lbNo.visible = false;
			s.lbYb.text = "" + v.price
			if (Model_player.voMine.yuanbao < v.price) {
				s.lbYb.color = Color.REDINT;
			} else {
				s.lbYb.color = Color.GREENINT;
			}
			s.lbPower.text = "战力:" + ConfigHelp.numToStr(v.power)
			// s.lbPower.text = "战力:" + v.power
			s.imgYb.visible = true;
			let color = v.count == 0 ? Color.REDSTR : Color.GREENSTR
			s.lbCt.text = "剩余雇佣次数：" + HtmlUtil.fontNoSize(v.count + "", color)
		} else {
			s.vhead.setdata(null);
			s.lbNo.visible = true;
			s.lbYb.text = ""
			s.lbPower.text = ""
			s.lbName.text = ""
			s.imgYb.visible = false;
			s.lbCt.text = ""
		}
	}

	public get vo() {
		return this._vo
	}
}