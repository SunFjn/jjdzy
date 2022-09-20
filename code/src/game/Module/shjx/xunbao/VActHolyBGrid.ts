class VActHolyBGrid extends fairygui.GComponent {

	public grid:ViewGrid;

	public static URL:string = "ui://4aepcdbwwg9y4p";

	public static createInstance():VActHolyBGrid {
		return <VActHolyBGrid><any>(fairygui.UIPackage.createObject("shouhunJX","VActHolyBGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.grid = <ViewGrid><any>(this.getChild("grid"));
	}

	public set vo(v){
		if(v == null){
			this.grid.visible = false;
			this._vo = null
		}else{
			this.grid.tipEnabled = true;
			this.grid.isShowEff = true;
			this.grid.vo = ConfigHelp.makeItem(v);
			this.grid.visible = true;
			this._vo = this.grid.vo
		}
	}
	private _vo
	public get vo(){
		return this._vo;
	}

	public clean(){
		super.clean()
		this.grid.clean();
	}
}
