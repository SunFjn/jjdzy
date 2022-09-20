class ChildBaZhenTuGod extends fairygui.GComponent {

	public list: fairygui.GList;
	public labChip: ViewResource;
	public imgBg: fairygui.GLoader;

	public static URL: string = "ui://xrzn9ppairzj2b";

	public static createInstance(): ChildBaZhenTuGod {
		return <ChildBaZhenTuGod><any>(fairygui.UIPackage.createObject("baZhenTu", "ChildBaZhenTuGod"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s)

		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.renderHander;
		s.list.setVirtual();
	}

	private _lisDat: Ibztsf_261[]
	public open() {
		let s = this;
		let m = GGlobal.modelBaZhenTu
		s._lisDat = m.getbztsf()
		IconUtil.setImg(s.imgBg, Enum_Path.BAZHENTU_URL + "bg3.jpg");
		m.listen(Model_BaZhenTu.BUY_GOD, s.upView, s)
		s.upView();
	}

	private _it
	private upView() {
		let s = this;
		s.list.numItems = s._lisDat.length;
		if (!s._it) {
			s._it = VoItem.create(Model_BaZhenTu.GODid);
			s.labChip.setImgUrl(s._it.icon);
		}
		let ct = Model_Bag.getItemCount(Model_BaZhenTu.GODid);
		s.labChip.setCount(ct);
		s.labChip.color = Color.WHITEINT;
	}

	public close() {
		let s = this;
		let m = GGlobal.modelBaZhenTu
		s.list.numItems = 0;
		IconUtil.setImg(s.imgBg, null);
		m.remove(Model_BaZhenTu.BUY_GOD, s.upView, s)
	}

	private renderHander(index: number, obj: fairygui.GObject): void {
		var gird: VBaZTGridGod = obj as VBaZTGridGod;
		gird.vo = this._lisDat[index]
	}
}