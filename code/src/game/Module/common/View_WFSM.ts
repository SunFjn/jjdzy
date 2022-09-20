class View_WFSM extends fairygui.GComponent {

	public explainLb:fairygui.GRichTextField;

	public static URL:string = "ui://jvxpx9emah3c3aq";

	public static createInstance():View_WFSM {
		return <View_WFSM><any>(fairygui.UIPackage.createObject("common","View_WFSM"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.explainLb = <fairygui.GRichTextField><any>(this.getChild("explainLb"));
	}

	public set vo(v){
		this.explainLb.text = v;
	}
}