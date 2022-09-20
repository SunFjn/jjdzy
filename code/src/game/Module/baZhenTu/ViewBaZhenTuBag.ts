class ViewBaZhenTuBag extends UIPanelBase {

	public list: fairygui.GList;
	public BtnGo: fairygui.GButton;
	public labT: fairygui.GLabel;
	public lbTip: fairygui.GTextField;
	public vEqu: VBaZTBag;

	public static URL: string = "ui://xrzn9ppacsl06";

	public static createInstance(): ViewBaZhenTuBag {
		return <ViewBaZhenTuBag><any>(fairygui.UIPackage.createObject("baZhenTu", "ViewBaZhenTuBag"));
	}

	public constructor() {
		super();
		this.setSkin("baZhenTu", "baZhenTu_atlas0", "ViewBaZhenTuBag");
	}

	protected initView(): void {
		super.initView();
		this.frame.getChild("icon").asLoader.url = "ui://xrzn9ppab5l2n";
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandler;
		this.list.setVirtual()
	}

	protected onShown(): void {
		this._index = this._args

		this.addListen();
		this.update();
	}

	protected onHide(): void {
		this.removeListen();
		GGlobal.layerMgr.close(UIConst.BAZHENTU_BAG)
		if (!this._goStatus) {
			GGlobal.layerMgr.open(UIConst.BAZHENTU, 0)
		}
		this._goStatus = false;
		this.list.numItems = 0;
	}

	private addListen(): void {
		this.BtnGo.addClickListener(this.onGo, this);
		GGlobal.modelBaZhenTu.listen(Model_BaZhenTu.OPENUI, this.update, this);
	}

	private removeListen(): void {
		this.vEqu.grid.showEff(false);
		this.BtnGo.removeClickListener(this.onGo, this);
		GGlobal.modelBaZhenTu.remove(Model_BaZhenTu.OPENUI, this.update, this);
	}

	private _index;//1-8
	private _showArr: VoBaZhenTu[];
	private update() {
		this._showArr = []
		let len = Model_BaZhenTu.bagArr.length
		let arr1 = [];//红点替换
		let arr2 = [];//无
		let equip = Model_BaZhenTu.equipArr[this._index - 1];
		let typeArr = {};
		for (let j = 0; j < Model_BaZhenTu.equipArr.length; j++) {
			let eq = Model_BaZhenTu.equipArr[j];
			if (!eq || eq.id == 0) continue;
			typeArr[eq.type] = true;
		}

		for (let i = 0; i < Model_BaZhenTu.bagArr.length; i++) {
			let v = Model_BaZhenTu.bagArr[i];
			if (v == null || v.type == 0) {
				continue;
			}
			if (equip == null || equip.id == 0) {//没装备
				if (typeArr[v.type]) {//同类型
					arr2.push(v)
				} else {
					arr1.push(v);
				}
			} else {//有装备
				if (v.power > equip.power) {
					if (v.type == equip.type || !typeArr[v.type]) {
						arr1.push(v)
					} else {
						arr2.push(v)
					}
				} else {
					arr2.push(v)
				}
			}
		}
		arr1.sort(this.sortFunc);
		arr2.sort(this.sortFunc);
		this._showArr = arr1.concat(arr2);
		len = this._showArr.length
		this.list.numItems = len
		if (len > 0) {
			this.list.scrollToView(0)
		}
		this.lbTip.visible = this.BtnGo.visible = this.BtnGo.touchable = len == 0;
		this.vEqu.grid.isShowEff = true;
		this.vEqu.setEqu(Model_BaZhenTu.equipArr[this._index - 1], this._index);
	}

	private sortFunc(a: VoBaZhenTu, b: VoBaZhenTu) {
		if (a.pz != b.pz) {
			return b.pz - a.pz;
		}
		if (a.starLv != b.starLv) {
			return b.starLv - a.starLv;
		}
		if (a.level != b.level) {
			return b.level - a.level;
		}
		return b.id - a.id;
	}

	private renderHandler(index: number, obj: fairygui.GObject) {
		let grid = obj as VBaZTBag;
		grid.grid.isShowEff = true;
		grid.setBag(this._showArr[index], this._index);
	}

	private _goStatus = false;
	private onGo() {
		this._goStatus = true;
		if (GGlobal.layerMgr.isOpenView(UIConst.BAZHENTU)) {
			(GGlobal.layerMgr.getView(UIConst.BAZHENTU) as ViewBaZhenTuPanel).setSelectIndex(2);
		} else {
			GGlobal.layerMgr.open(UIConst.BAZHENTU_JIANDING)
		}
		this.closeEventHandler(null)
	}
}