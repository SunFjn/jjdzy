/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class MengHuoItem extends fairygui.GComponent {

	public lbRank: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lbLv: fairygui.GRichTextField;
	public btnCheck: fairygui.GButton;

	public static URL: string = "ui://47jfyc6eee1117";

	public static createInstance(): MengHuoItem {
		return <MengHuoItem><any>(fairygui.UIPackage.createObject("Boss", "MengHuoItem"));
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
		let rk = 0;
		var vo = GGlobal.modelBoss.mhVO;
		if (this.type == 0) {
			var l = vo.personRankWard.length;
			rk = this.rank > l ? l : this.rank;
			var arr = vo.personRankWard[rk- 1];
		} else {
			var l = vo.personRankWard.length;
			rk = this.rank > l ? l : this.rank;
			var arr = vo.contryWard[rk - 1];
		}
		GGlobal.layerMgr.open(UIConst.LVBUBOX, { rank: this.rank, data: arr });
	}

	private type: number = 0;
	private rank: number = 0;
	public setdata(index, data: any[], t) {
		this.type = t;
		this.rank = index;
		this.lbRank.text = "第" + index + "名";
		if (t == 1){
			if (data[0] == 0) this.lbName.text = "虚位以待";
			else this.lbName.text = Model_Country.getCountryName(data[0]);
		} else {
			this.lbName.text = "" + data[0];
		}
		this.lbLv.text = "" + ConfigHelp.getYiWanText(data[1]);
	}
}