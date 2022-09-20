class VCrossWars2 extends fairygui.GComponent {

	public lbName:fairygui.GRichTextField;

	public static URL:string = "ui://me1skowlhfct4e";

	public static createInstance():VCrossWars2 {
		return <VCrossWars2><any>(fairygui.UIPackage.createObject("crossKing","VCrossWars2"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbName = <fairygui.GRichTextField><any>(this.getChild("lbName"));
	}

	public set vo(v:string){
		this.lbName.text = v
	}
}