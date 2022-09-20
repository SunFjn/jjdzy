class LvBuItem extends fairygui.GComponent {

	public lbRank: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lbLv: fairygui.GRichTextField;
	public btnCheck: fairygui.GButton;

	public static URL: string = "ui://47jfyc6eqcyl11";

	public static createInstance(): LvBuItem {
		return <LvBuItem><any>(fairygui.UIPackage.createObject("Boss", "LvBuItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbRank = <fairygui.GRichTextField><any>(this.getChild("lbRank"));
		this.lbName = <fairygui.GRichTextField><any>(this.getChild("lbName"));
		this.lbLv = <fairygui.GRichTextField><any>(this.getChild("lbLv"));
		this.btnCheck = <fairygui.GButton><any>(this.getChild("btnCheck"));
		this.btnCheck.addClickListener(this.onCheck, this);
	}

	private onCheck() {
		var lib = Config.lvbu_224[361001];
		var arr:any[];
		switch (this.rank) {
			case 1:
				arr = JSON.parse(lib["reward1"]);
				break;
			case 2:
				arr = JSON.parse(lib["reward2"]);
				break;
			case 3:
				arr = JSON.parse(lib["reward3"]);
				break;
			default:
				arr = JSON.parse(lib["reward4"]);
				break;
		}
		GGlobal.layerMgr.open(UIConst.LVBUBOX, {rank:this.rank,data:arr});
	}

	private rank: number = 0;
	public setdata(data: any[]) {
		this.rank = data[0];
		this.lbRank.text = "" + data[0];
		this.lbName.text = "" + data[1];
		this.lbLv.text = "" + ConfigHelp.getYiWanText(data[2]);
	}
}