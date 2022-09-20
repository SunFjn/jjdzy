class VDengFengRank extends fairygui.GComponent {

	public img: fairygui.GLoader;
	public lbName: fairygui.GRichTextField;
	public lbPoint: fairygui.GRichTextField;
	public lb: fairygui.GRichTextField;
	public list: fairygui.GList;
	public imgNO: fairygui.GImage;

	public static URL: string = "ui://3o8q23uua0u32b";

	public static createInstance(): VDengFengRank {
		return <VDengFengRank><any>(fairygui.UIPackage.createObject("syzlb", "VDengFengRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.renderRew
	}

	private lisDat: IGridImpl[]
	public setVo(v: Idfzjjs1_261 | Idfzjhx1_261, type, rank) {
		let s = this;
		let m = GGlobal.modelDengFengZJ

		let dat = m.rankDat[rank - 1]
		s.lbName.text = dat ? dat.name : ""
		s.lbPoint.text = dat ? "积分：" + dat.point : "";
		s.imgNO.visible = dat ? false : true;

		if (rank < 4) {
			s.img.url = CommonManager.getCommonUrl("rank_" + rank);
			s.img.visible = true;
			s.lb.text = ""
		} else {
			s.img.visible = false;
			s.lb.text = rank + ""
		}

		s.lisDat = ConfigHelp.makeItemListArr(JSON.parse(v.reward));
		s.list.numItems = s.lisDat.length

	}

	private renderRew(index, obj: ViewGrid) {
		obj.tipEnabled = true;
		obj.isShowEff = true;
		obj.vo = this.lisDat[index]
	}

	public clean() {
		this.list.numItems = 0;
	}
}