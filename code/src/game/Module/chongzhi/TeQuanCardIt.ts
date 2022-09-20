// /** This is an automatically generated class by FairyGUI. Please do not modify it. **/
// class TeQuanCardIt extends fairygui.GComponent {

// 	public imgCard: fairygui.GLoader;
// 	public IMGpRICE: fairygui.GLoader;
// 	public lbDesc: fairygui.GRichTextField;
// 	public ygm: fairygui.GImage;

// 	public static URL: string = "ui://42zxp7qjanpmm";

// 	public static createInstance(): TeQuanCardIt {
// 		return <TeQuanCardIt><any>(fairygui.UIPackage.createObject("chongzhi", "TeQuanCardIt"));
// 	}

// 	public constructor() {
// 		super();
// 	}

// 	protected constructFromXML(xml: any): void {
// 		super.constructFromXML(xml);
// 		let s = this;

// 		s.imgCard = <fairygui.GLoader><any>(s.getChild("imgCard"));
// 		s.IMGpRICE = <fairygui.GLoader><any>(s.getChild("IMGpRICE"));
// 		s.lbDesc = <fairygui.GRichTextField><any>(s.getChild("lbDesc"));
// 		s.ygm = <fairygui.GImage><any>(s.getChild("ygm"));
// 		s.addClickListener(s.onClick, s);
// 	}
// 	public idx;
// 	public st;
// 	private onClick() {
// 		if (!this.st) {
// 			GGlobal.modelchongzhi.CG_CHONGZHI_135(2, this.idx);
// 		}
// 	}

// 	public setIdx(idx) {
// 		let cfg = Config.tqk_719[idx];
// 		this.idx = idx;
// 		this.imgCard.url = fairygui.UIPackage.getItemURL("chongzhi", "card" + idx);
// 		this.IMGpRICE.url = fairygui.UIPackage.getItemURL("chongzhi", "price" + idx);
// 		let str:string = cfg.SEC1;
// 		this.lbDesc.text =str;
// 	}

// 	public setSt(val) {
// 		this.st = val;
// 		this.ygm.visible = this.st;
// 	}
// }