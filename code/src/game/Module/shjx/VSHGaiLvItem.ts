class VSHGaiLvItem extends fairygui.GComponent {

	public lb2: fairygui.GRichTextField;
	public lb3: fairygui.GRichTextField;
	public lb1: fairygui.GRichTextField;

	public static URL: string = "ui://4aepcdbwl5k549";

	public static createInstance(): VSHGaiLvItem {
		return <VSHGaiLvItem><any>(fairygui.UIPackage.createObject("shouhunJX", "VSHGaiLvItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lb2 = <fairygui.GRichTextField><any>(this.getChild("lb2"));
		this.lb3 = <fairygui.GRichTextField><any>(this.getChild("lb3"));
		this.lb1 = <fairygui.GRichTextField><any>(this.getChild("lb1"));
	}

	public set vo(v: Ishjxxl_266) {
		let times = JSON.parse(v.time)
		if (Number(times[0][1]) == 0) {
			this.lb3.text = times[0][0] + "次以上";
		} else {
			this.lb3.text = times[0][0] + "-" + times[0][1] + "次";
		}
		let fws = JSON.parse(v.fw)
		this.lb2.text = fws[0][0] + "-" + fws[0][1] + "星";
		this.lb1.text = v.id + "星";
	}
}