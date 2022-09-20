class TitlePage extends fairygui.GComponent {

	public img: fairygui.GLoader;
	public imgSelected: fairygui.GImage;
	public imgNotice: fairygui.GImage;
	public lbName: fairygui.GRichTextField;

	public static URL: string = "ui://3tzqotadp6mw3w";

	public static createInstance(): TitlePage {
		return <TitlePage><any>(fairygui.UIPackage.createObject("role", "TitlePage"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.img = <fairygui.GLoader><any>(this.getChild("img"));
		this.imgSelected = <fairygui.GImage><any>(this.getChild("imgSelected"));
		this.imgNotice = <fairygui.GImage><any>(this.getChild("imgNotice"));
		this.lbName = <fairygui.GRichTextField><any>(this.getChild("lbName"));
	}

	vo;
	public setdata(vo:VoTitle){
		this.vo = vo;
		let state = vo.state;
		this.img.url = state == 0?"ui://3tzqotadp6mw3x":"ui://3tzqotadp6mw3y";
		this.imgNotice.visible = vo.isNotice();
		this.lbName.text = vo.name;
	}

	public setChoose(val){
		this.imgSelected.visible = val;
	}

	public clean(){
		this.setChoose(false);
	}
}