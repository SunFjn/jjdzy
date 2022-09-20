class VDengFengPoint extends fairygui.GComponent {

	public lb: fairygui.GRichTextField;
	public list: fairygui.GList;
	public btnGet: Button1;
	public imgHas: fairygui.GImage;
	public lbNO: fairygui.GRichTextField;

	public static URL: string = "ui://3o8q23uua0u32d";

	public static createInstance(): VDengFengPoint {
		return <VDengFengPoint><any>(fairygui.UIPackage.createObject("syzlb", "VDengFengPoint"));
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
		s.btnGet.addClickListener(s.onGet, s);
	}

	private _lisDat
	private _vo: Idfzjhx2_261
	public set vo(v: Idfzjhx2_261) {
		let s = this;
		let m = GGlobal.modelDengFengZJ
		s._vo = v;
		s.lb.text = v.point + ""
		s._lisDat = ConfigHelp.makeItemListArr(JSON.parse(v.reward))
		s.list.numItems = s._lisDat.length

		let st = m.pointDat[v.id];
		let point = m.seaPoint
		if (st) {//已领取
			s.imgHas.visible = true;
			s.lbNO.visible = false
			s.btnGet.visible = false
		} else {
			s.imgHas.visible = false;
			if (point >= v.point) {//可领取
				s.btnGet.visible = true
				s.btnGet.checkNotice = true;
				s.lbNO.visible = false
			} else {
				s.btnGet.visible = false
				s.lbNO.visible = true
			}
		}
	}

	private onGet() {
		let s = this;
		if (!s._vo) {
			return;
		}
		GGlobal.modelDengFengZJ.CG_POINT_GET(s._vo.id);
	}

	private renderRew(index, obj: ViewGrid) {
		obj.isShowEff = obj.tipEnabled = true;
		obj.vo = this._lisDat[index]
	}

	public clean() {
		super.clean();
		let s = this
		s.list.numItems = 0;
		s._vo = null
	}
}