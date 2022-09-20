/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class LongZDIt extends fairygui.GComponent {

	public imgBg: fairygui.GImage;
	public imgBg1: fairygui.GImage;
	public lbInfo: fairygui.GRichTextField;
	public imgright: fairygui.GImage;
	public imageX: fairygui.GImage;

	public static URL: string = "ui://1xydor24n7ie2";

	public static createInstance(): LongZDIt {
		return <LongZDIt><any>(fairygui.UIPackage.createObject("activityHall", "LongZDIt"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;

		s.imgBg = <fairygui.GImage><any>(s.getChild("imgBg"));
		s.imgBg1 = <fairygui.GImage><any>(s.getChild("imgBg1"));
		s.lbInfo = <fairygui.GRichTextField><any>(s.getChild("lbInfo"));
		s.imgright = <fairygui.GImage><any>(s.getChild("imgright"));
		s.imageX = <fairygui.GImage><any>(s.getChild("imageX"));
		s.addClickListener(s.clickHd, s);
		s.imageX.visible = s.imgright.visible == false;
	}

	private clickHd() {
		let m = GGlobal.modelActivityHall;
		if (m.lzd_id == m.lzd_lastId) {
			return;
		}
		this.imgBg.visible = false;
		this.imgBg1.visible = true;
		GGlobal.modelActivityHall.CG_ANSWER_1983(this.idx);
	}

	public check() {
		let s = this;
		let isRight = s.isAnswer;
		s.imgright.visible = isRight;
		s.imageX.visible = !isRight;

		let m = GGlobal.modelActivityHall;
		let isSelect = m.curAnswerID == s.idx;
		s.imgBg.visible = !isSelect;
		s.imgBg1.visible = isSelect;
	}

	//题目索引
	public idx;
	//答案索引
	private isAnswer;
	public setdata(txt, isAnswer) {
		let s = this;
		s.isAnswer = isAnswer;
		s.lbInfo.text = ["", "A", "B", "C", "D"][s.idx] + "、" + txt;
		let m = GGlobal.modelActivityHall;
		if (m.lzd_id == m.lzd_lastId) {
			this.check();
		} else {
			s.imgBg.visible = true;
			s.imgBg1.visible = false;
			s.imageX.visible = s.imgright.visible = false;
		}
	}
}