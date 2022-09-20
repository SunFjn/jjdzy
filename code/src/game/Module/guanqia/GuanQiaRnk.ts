class GuanQiaRnk extends fairygui.GComponent {

	public lbRank: fairygui.GTextField;
	public lbName: fairygui.GTextField;
	public lbStr: fairygui.GTextField;
	public lbLv: fairygui.GTextField;

	public static URL: string = "ui://r92dp953u94lp";

	public static createInstance(): GuanQiaRnk {
		return <GuanQiaRnk><any>(fairygui.UIPackage.createObject("guanqia", "GuanQiaRnk"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbRank = <fairygui.GTextField><any>(this.getChild("lbRank"));
		this.lbName = <fairygui.GTextField><any>(this.getChild("lbName"));
		this.lbLv = <fairygui.GTextField><any>(this.getChild("lbLv"));
	}

	set vo(data) {
		if (data) {
			this.lbRank.text = data[0]+"";
			this.lbName.text = data[2];
			this.lbName.color = data[1]==Model_player.voMine.id?Color.GREENINT:Color.WHITEINT;
			this.lbLv.text = data[3]+"";
		} else {
			this.lbStr.text = this.lbName.text = this.lbLv.text = "";
		}
	}
}