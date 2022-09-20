class ViewGrid1 extends fairygui.GComponent {

	public lbName:fairygui.GTextField;
	public grid:ViewGrid;

	public static URL:string = "ui://jvxpx9emetorp";

	public static createInstance():ViewGrid1 {
		return <ViewGrid1><any>(fairygui.UIPackage.createObject("common","ViewGrid1"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbName = <fairygui.GTextField><any>(this.getChild("lbName"));
		this.grid = <ViewGrid><any>(this.getChild("grid"));
	}

	public static POOL = [];
	public static create() {
		return ViewGrid1.POOL.length ? ViewGrid1.POOL.pop() : new ViewGrid1();
	}
	private effPart: Part;
	public showEff(v: boolean): void {
		if (v) {
			if (this.effPart == null) {
				this.effPart = EffectMgr.addEff("eff/9011", this.displayListContainer, 32, 31, 1000, -1,true,1,Main.skill_part_type);
			}
		} else {
			if (this.effPart) {
				EffectMgr.instance.removeEff(this.effPart);
				this.effPart = null;
			}
		}
	}

	set vo(v: IGridImpl) {
		var a = this.grid;
		var b = this;
		var c = v;
		this.grid.vo = v;
		if (v) {
			if (v.gType == Enum_Attr.ITEM) {//道具
				this.lbName.text = v.name;
			} else if (v.gType == Enum_Attr.EQUIP) {//装备
				var ve = v as VoEquip;
				this.lbName.text = ve.gridName;
			}else {
				this.lbName.text = v.name;
			}
			this.lbName.color = v.qColor;
		} else {
			this.lbName.text = "";
		}
	}

	get vo(): IGridImpl {
		if (this.grid) {
			return this.grid.vo;
		}
		return null;
	}

	public dispose() {
		if(this.parent) {
			this.parent.removeChild(this);
		}
		ViewGrid1.POOL.push(this);
	}
	public clean():void{
		super.clean();
		this.showEff(false);
	}
}