class ChildGmTip extends fairygui.GComponent {

	public lbName:fairygui.GTextField;

	public static URL:string = "ui://vm9a8xq8qm4n5";

	public static createInstance():ChildGmTip {
		return <ChildGmTip><any>(fairygui.UIPackage.createObject("GM","ChildGmTip"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbName = <fairygui.GTextField><any>(this.getChild("lbName"));
	}

	private _vo:any
	public set vo(value:any){
		this._vo = value;
		this.lbName.text = value.text;
	}

	public get vo(){
		return this._vo;
	}
}