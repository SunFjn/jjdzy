class ViewBaZhenTuTemp extends UIPanelBase {

	public frame: fairygui.GComponent;
	public list: fairygui.GList;
	public vSelect: VBaZTBag;

	public static URL: string = "ui://xrzn9ppab5l2z";

	public static createInstance(): ViewBaZhenTuTemp {
		return <ViewBaZhenTuTemp><any>(fairygui.UIPackage.createObject("baZhenTu", "ViewBaZhenTuTemp"));
	}

	public constructor() {
		super();
		this.setSkin("baZhenTu", "baZhenTu_atlas0", "ViewBaZhenTuTemp");
	}

	protected initView(): void {
		super.initView();
		this.frame.getChild("icon").asLoader.url = "ui://xrzn9ppab5l2n";
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHander;
		this.list.setVirtual();
	}

	protected onShown(): void {
		this.list.addEventListener(fairygui.ItemEvent.CLICK, this.itemClick, this);
		this.update();
	}

	protected onHide(): void {
		this.vSelect.grid.tipEnable = false;
		this.list.removeEventListener(fairygui.ItemEvent.CLICK, this.itemClick, this);
		GGlobal.layerMgr.close(UIConst.BAZHENTU_TEMP)
		this.list.numItems = 0;
	}

	private _showArr: Ibztzf_261[]
	private update() {
		this._showArr = []
		for (let keys in Config.bztzf_261) {
			let v = Config.bztzf_261[keys]
			this._showArr.push(v);
		}
		this.list.numItems = this._showArr.length;
		if (this._showArr.length > 0) {
			this.list.scrollToView(0)
			this.list.selectedIndex = 0
		}
		this.selectdUpdate(this._showArr[0]);
	}


	private renderHander(index: number, obj: fairygui.GObject): void {
		var gird: VBaZTGridFenJ = obj as VBaZTGridFenJ;
		gird.grid.isShowEff = true;
		gird.setTemp(this._showArr[index]);
	}

	private itemClick(e) {
		var clickItem = e.itemObject as VBaZTGridFenJ
		this.selectdUpdate(clickItem.getTemp())
	}

	private selectdUpdate(v: Ibztzf_261) {
		let vba: VoBaZhenTu = new VoBaZhenTu();
		vba.starLv = 1;
		vba.level = 0;
		vba.id = v.id;
		vba.initLib();
		this.vSelect.grid.isShowEff = true;
		this.vSelect.vo = vba;
		this.vSelect.grid.tipEnable = true;
		this.vSelect.btnDown.visible = this.vSelect.btnDown.touchable = false
		this.vSelect.btnWear.visible = this.vSelect.btnWear.touchable = false
		this.vSelect.imgEquip.visible = false
	}
}