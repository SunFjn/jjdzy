/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class BrocastTxt extends fairygui.GComponent {

	public lbContent: fairygui.GRichTextField;

	public static URL: string = "ui://7gxkx46we2bn4b";

	public static createInstance(): BrocastTxt {
		return <BrocastTxt><any>(fairygui.UIPackage.createObject("MainUI", "BrocastTxt"));
	}

	public constructor() {
		super();
	}
	public callBack: Handler;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lbContent = <fairygui.GRichTextField><any>(this.getChild("lbContent"));
	}

	public setdata(str) {
		this.lbContent.text = str;
		this.tween();
	}

	private tween(): void {
		var iw = this.lbContent.textWidth;
		var time = (iw / 60) * 1000;
		this.lbContent.x = 380;
		egret.Tween.get(this.lbContent).to({ x: -iw }, time).call(this.run, this);
	}

	public clear(): void {
		egret.Tween.removeTweens(this);          
		this.lbContent.x = 0;
		this.lbContent.text = "";
	}

	private run() {
		this.callBack.run();
	}

}