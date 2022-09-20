class VFenJieGrid extends fairygui.GButton {

	public grid:ViewGrid;
	public lbName:fairygui.GRichTextField;
	public selectImg:fairygui.GImage;

	public static URL:string = "ui://ny9kb4yze1fic";

	public static createInstance():VFenJieGrid {
		return <VFenJieGrid><any>(fairygui.UIPackage.createObject("rongLian","VFenJieGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.grid = <ViewGrid><any>(this.getChild("grid"));
		this.lbName = <fairygui.GRichTextField><any>(this.getChild("lbName"));
		this.selectImg = <fairygui.GImage><any>(this.getChild("selectImg"));
	}

	set vo(v){
		this.grid.vo = v;
		this.grid.tipEnabled = false;
		if (v != null) {
			if (v.gType == Enum_Attr.ITEM) {
				var voi: VoItem = v as VoItem;
				this.lbName.text = voi.name;
				this.lbName.color = voi.qColor;
			} else if (v.gType == Enum_Attr.EQUIP) {
				var voe: VoEquip = v as VoEquip;
				this.lbName.text = voe.gridName;
				this.lbName.color = voe.qColor;
			} else {
				var voc: Vo_Currency = v as Vo_Currency;
				this.lbName.text = voc.name;
				this.lbName.color = voc.qColor;
			}
			//显示特效
			this.grid.showEff(v.showEffect);
			this.lbNum.visible = false;
			if (v.count > 1) {
				this.lbNum.visible = true;
				this.lbNum.text = ConfigHelp.getYiWanText(v.count);
			}
		} else {
			this.lbName.text = "";
			this.lbNum.visible = false;
			this.grid.tipEnabled = false;
			this.grid.showEff(false);
		}
	}

	get vo(){
		return this.grid.vo
	}

	get lbNum(): fairygui.GTextField {
		if (this.grid) {
			return this.grid.lbNum;
		}
		return null;
	}

	public clean():void{
		super.clean();
		this.grid.clean();
	}
}