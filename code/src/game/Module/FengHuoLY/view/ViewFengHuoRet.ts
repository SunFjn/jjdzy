/** sf is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewFengHuoRet extends UIModalPanel {

	public frame: fairygui.GLabel;
	public n21: fairygui.GImage;
	public n22: fairygui.GLoader;
	public n14: fairygui.GButton;
	public n20: fairygui.GImage;
	public n29: fairygui.GList;
	public n10: fairygui.GImage;
	public lbMvpName: fairygui.GTextField;
	public n12: fairygui.GTextField;
	public imgHead: fairygui.GLoader;
	public imgHeadGrid: fairygui.GLoader;
	public groupHead: fairygui.GGroup;
	public static URL: string = "ui://edvdots4j08a1j";

	public static createInstance(): ViewFengHuoRet {
		return <ViewFengHuoRet><any>(fairygui.UIPackage.createObject("FengHuoLY", "ViewFengHuoRet"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("FengHuoLY");
		let sf = this;
		sf.view = fairygui.UIPackage.createObject("FengHuoLY", "ViewFengHuoRet").asCom;
		sf.contentPane = sf.view;
		CommonManager.parseChildren(sf.view, sf);
		sf.n29.callbackThisObj = sf;
		sf.n29.itemRenderer = sf.itemRender;

		super.childrenCreated();
	}

	private _data = [];
	private itemRender(idx, obj) {
		let item: FenghuoTopBar = obj as FenghuoTopBar;
		item.setdata(this._data[idx]);
	}

	private setUIDta() {
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		if (m.mvpHead) {
			ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(m.mvpHeadGrid), sf.imgHeadGrid);
			ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(m.mvpHead), sf.imgHead);
			sf.lbMvpName.text = m.MVP;
		} else {
			sf.lbMvpName.text = "";
		}
		sf._data = m.endDta;
		sf._data[0][3] = 1;
		sf.n29.numItems = sf._data.length;
	}

	private onExite() {
		GGlobal.modelFengHuoLY.exite();
	}

	private btnTimer() {
		let sf = this;
		sf.now--;
		if (sf.now < 1) {
			sf.onExite();
		}
		sf.n14.text = "确定（" + sf.now + "s）";
	}

	private now = 5;
	private barWidth;
	protected onShown() {
		let sf = this;
		sf.setUIDta();
		sf.now = 8;
		sf.n14.addClickListener(sf.onExite, sf);
		Timer.instance.listen(sf.btnTimer, sf, 1000);
		GGlobal.control.listen(UIConst.FHLY + "end", this.setUIDta, this);
		IconUtil.setImg(sf.n22, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/bg.png");
	}

	protected onHide() {
		let sf = this;
		GGlobal.control.remove(UIConst.FHLY + "end", this.setUIDta, this);
		if (sf.n14)
			sf.n14.removeClickListener(sf.onExite, sf);
		GGlobal.layerMgr.close(UIConst.FHLY_END);
		Timer.instance.remove(sf.btnTimer, sf);
		IconUtil.setImg(sf.n22, null);
		sf.n29.numItems = 0;
	}
}