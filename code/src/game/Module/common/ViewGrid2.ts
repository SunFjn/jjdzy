class ViewGrid2 extends fairygui.GComponent {
	public iconImg: fairygui.GLoader;

	public static URL: string = "ui://jvxpx9emtw1l5d";
	public static createInstance(): ViewGrid2 {
		return <ViewGrid2><any>(fairygui.UIPackage.createObject("common", "ViewGrid2"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.iconImg = <fairygui.GLoader><any>(this.getChild("iconImg"));
	}

	public static POOL = [];
	public static create() {
		return ViewGrid2.POOL.length ? ViewGrid2.POOL.pop() : ViewGrid2.createInstance();
	}

	private _vo: IGridImpl;
	set vo(v: IGridImpl) {
		this._vo = v;
		if (v) {
			// ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", this.iconImg);
			IconUtil.setImg(this.iconImg, Enum_Path.ICON70_URL + v.icon + ".png");
			this.iconImg.visible = true;
		} else {
			this.iconImg.visible = false;
		}
	}

	get vo(): IGridImpl {
		return this._vo;
	}

	/**设置是否显示tip */
	set tipEnabled(bo: boolean) {
		if (bo) {
			this.addClickListener(this.onTips, this);
		} else {
			this.removeClickListener(this.onTips, this);
		}
	}

	private onTips(): void {
		if (!this._vo) {
			return;
		}
		GGlobal.layerMgr.open(UIConst.TIP_BAG_ITEM, this._vo)
	}

	public disposeGrid() {
		this.removeFromParent();
		ViewGrid2.POOL.push(this);
	}
}