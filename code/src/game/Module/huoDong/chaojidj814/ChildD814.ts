/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildD814 extends fairygui.GComponent {

	public imgNotice: fairygui.GImage;
	public grid: ViewGrid;
	public imgHead: fairygui.GLoader;
	public lbName: fairygui.GRichTextField;
	public ylq: fairygui.GImage;


	public static URL: string = "ui://vrw7je9rhfv1g";

	public static createInstance(): ChildD814 {
		return <ChildD814><any>(fairygui.UIPackage.createObject("huoDong", "ChildD814"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;

		s.imgHead = <fairygui.GLoader><any>(s.getChild("imgHead"));
		s.lbName = <fairygui.GRichTextField><any>(s.getChild("lbName"));
		s.ylq = <fairygui.GImage><any>(s.getChild("ylq"));
		s.imgNotice = <fairygui.GImage><any>(s.getChild("imgNotice"));
		s.grid = <ViewGrid><any>(s.getChild("grid"));
		s.addClickListener(s.clickHandler, s)
	}

	private clickHandler() {
		if (this.st != 2) {
			if (GGlobal.modelHuoD814.CJDJ_count > 0) {
				let ef = EffectMgr.addEff("uieff/" + 10007, this.displayListContainer, 65, 60, 600, 600, false);
				ef.mc.scaleX = ef.mc.scaleY = 1.5;
			}
			GGlobal.modelHuoD814.CG_LQ_4811(this.idx + 1);
		}
	}

	private idx;
	private st = 0;
	public setdata(data, index) {
		let s = this;
		s.st = data[0];
		s.idx = index;
		let award = [data[1], data[2], data[3]];
		s.grid.visible = s.st == 2;
		let vo: IGridImpl;
		if (s.st == 2) {
			vo = ConfigHelp.makeItem(award);
			s.grid.vo = vo;
			s.grid.tipEnabled = true;
		}
		s.ylq.visible = s.st == 2;
		s.imgNotice.visible = s.st == 0 && GGlobal.modelHuoD814.CJDJ_count > 0;
		s.imgHead.visible = s.st != 2;
		let lib = Config.cjdjxs3_010[index + 1];
		let head = lib.head;
		if (s.st == 2) {
			s.lbName.text = HtmlUtil.fontNoSize(vo.name, Color.getColorStr(vo.quality));
		} else {
			s.lbName.text = lib.name;
		}
		var headPic = Config.shezhi_707[head];
		ImageLoader.instance.loader(Enum_Path.HEAD_URL + head + ".png", s.imgHead);
		s.ylq.visible = s.st == 2;
	}
}