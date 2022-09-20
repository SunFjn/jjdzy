class ItemActQFXF extends fairygui.GComponent {

	public list: fairygui.GList;
	public lbTitle: fairygui.GRichTextField;
	public lbCost: fairygui.GRichTextField;
	public lb: fairygui.GRichTextField;
	public noticeImg: fairygui.GImage;

	public static URL: string = "ui://p8fr1bvgkzdy6";

	public static createInstance(): ItemActQFXF {
		return <ItemActQFXF><any>(fairygui.UIPackage.createObject("actQFXF", "ItemActQFXF"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.itemRender;
		s.list.setVirtual();
	}

	private _lisDat: { id: number, st: number, cfg: Iqfxf_768 }[]
	public set vo(v: { id: number, st: number, cfg: Iqfxf_768 }[]) {
		let s = this;
		let tarXF = v[0].cfg.qf
		let nowXF = GGlobal.model_ActQFXF.qfxf
		s.lbCost.text = "目标：" + ConfigHelp.getYiWanText(tarXF);
		s.lb.text = "当前：" + ConfigHelp.getYiWanText(nowXF)
		s.lb.color = nowXF >= tarXF ? Color.getColorInt(2) : Color.getColorInt(6);

		s._lisDat = [];
		let arr0 = []
		let arr1 = []
		let arr2 = []
		for (let i = 0; i < v.length; i++) {
			if (v[i].st == 0) {
				arr0.push(v[i])
			} else if (v[i].st == 1) {
				arr1.push(v[i])
			} else {
				arr2.push(v[i])
			}
		}
		s._lisDat = arr1.concat(arr0).concat(arr2);
		s.list.numItems = s._lisDat.length
		if (s._lisDat.length > 0) {
			s.list.scrollToView(0);
		}

		let red = false
		for (let i = 0; i < v.length; i++) {
			if (v[i].st == 1) {
				red = true;
				break;
			}
		}
		s.noticeImg.visible = red
	}

	private itemRender(index, obj) {
		let s = this;
		let item: GridActQFXF = obj as GridActQFXF;
		item.vo = s._lisDat[index];
	}

	public clean() {
		super.clean();
		this.list.numItems = 0;
	}
}