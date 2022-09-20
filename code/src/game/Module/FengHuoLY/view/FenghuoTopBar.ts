/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class FenghuoTopBar extends fairygui.GComponent {

	public c1: fairygui.Controller;
	public n1: fairygui.GImage;
	public hp1: fairygui.GLoader;
	public n2: fairygui.GRichTextField;
	public n3: fairygui.GRichTextField;
	public n5: fairygui.GRichTextField;

	public static URL: string = "ui://edvdots4b801w25";

	public static createInstance(): FenghuoTopBar {
		return <FenghuoTopBar><any>(fairygui.UIPackage.createObject("FengHuoLY", "FenghuoTopBar"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.c1 = this.getController("c1");
		this.n1 = <fairygui.GImage><any>(this.getChild("n1"));
		this.hp1 = <fairygui.GLoader><any>(this.getChild("hp1"));
		this.n2 = <fairygui.GRichTextField><any>(this.getChild("n2"));
		this.n3 = <fairygui.GRichTextField><any>(this.getChild("n3"));
		this.n5 = <fairygui.GRichTextField><any>(this.getChild("n5"));
	}

	// 1上方不需要显示胜利失败
	//2 结算界面需要显示
	public setUIPos(t){
		this.n5.visible = t == 1;
	}

	public setForce(b){
		this.c1.selectedIndex = b;
	}

	public setdata(data){
		let s = this;
		let camp = data[0];
		let score = data[1];
		let server = data[2];
		let type = data[3];

		s.setUIPos(type);
		s.setForce(camp-1);
		s.n2.text = server == 0?"轮空":"S."+server;
		s.n3.text = "积分："+score;

		s.hp1.width = ModelFengHuoLY.maxScore==0?0:312*score/ModelFengHuoLY.maxScore;
	}
}