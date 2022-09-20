/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChongZhiItem extends fairygui.GComponent {

	public lbYB: fairygui.GRichTextField;
	public lbRMB: fairygui.GRichTextField;
	public mulIcon: fairygui.GImage;
	public imgBox: fairygui.GLoader;
	public lbCount: fairygui.GRichTextField;
	public g0: fairygui.GGroup;

	public static URL: string = "ui://42zxp7qjnvyw1";

	public static createInstance(): ChongZhiItem {
		return <ChongZhiItem><any>(fairygui.UIPackage.createObject("chongzhi", "ChongZhiItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;

		s.lbYB = <fairygui.GRichTextField><any>(s.getChild("lbYB"));
		s.lbRMB = <fairygui.GRichTextField><any>(s.getChild("lbRMB"));
		s.mulIcon = <fairygui.GImage><any>(s.getChild("mulIcon"));
		s.imgBox = <fairygui.GLoader><any>(s.getChild("imgBox"));
		s.lbCount = <fairygui.GRichTextField><any>(s.getChild("lbCount"));
		s.g0 = <fairygui.GGroup><any>(s.getChild("g0"));
		s.addClickListener(s.clickHand, s);
	}

	private lastT: number = 0;
	public ids: number = 0;
	private clickHand() {
		let now = egret.getTimer();
		if (now - this.lastT < 1000) {
			return;
		}
		this.lastT = now;
		GGlobal.modelchongzhi.CG_CHONGZHI_135(this.ids);
	}

	public setdata(d: any[], i) {
		let s = this
		s.ids = i + 1;
		let lib = Config.chongzhi_716[s.ids];
		s.lbRMB.text = lib.RMB + "n";
		let isMul=d[1] == 0;
		if(isMul){
			s.lbYB.text = (Number(lib.COIN) * 5) + "";
		}else{
			s.lbYB.text = lib.COIN + "";
		}
		s.imgBox.url = fairygui.UIPackage.getItemURL("chongzhi", "yuanbao" + lib.pic);
		s.lbCount.text = d[1]+"";
		s.mulIcon.visible = isMul;
		s.g0.visible = !isMul;
	}
}