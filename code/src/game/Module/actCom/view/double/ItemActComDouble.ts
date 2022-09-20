class ItemActComDouble extends fairygui.GComponent {

	public img: fairygui.GLoader;
	public btn: fairygui.GButton;

	public static URL: string = "ui://746rywv8e3qh1";

	public static createInstance(): ItemActComDouble {
		return <ItemActComDouble><any>(fairygui.UIPackage.createObject("actComDouble", "ItemActComDouble"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.img = <fairygui.GLoader><any>(this.getChild("img"));
		this.btn = <fairygui.GButton><any>(this.getChild("btn"));
		this.btn.addClickListener(this.onClick, this);
	}

	private _vo: number;
	public set vo(v: number) {
		this._vo = v;
		IconUtil.setImg(this.img, Enum_Path.ACTCOM_URL + "double" + (v + 1) + ".png");
	}

	public clean() {
		super.clean();
		IconUtil.setImg(this.img, null);
	}

	private onClick(e: egret.TouchEvent) {
		switch (this._vo) {
			case 0:
				GGlobal.layerMgr.open(UIConst.BOSS)
				break;
			case 1:
				GGlobal.layerMgr.open(UIConst.QMBOSS)
				break;
			case 2:
				GGlobal.layerMgr.open(UIConst.CROSS_TEAM)
				break;
			case 3:
				GGlobal.layerMgr.open(UIConst.SJMJ1)
				break;
		}
		e.stopPropagation();
		e.stopImmediatePropagation();
	}
}