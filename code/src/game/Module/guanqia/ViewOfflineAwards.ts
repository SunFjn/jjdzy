/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewOfflineAwards extends UIModalPanel {

	public frame: fairygui.GComponent;
	public btnConfirm: fairygui.GButton;
	public lbTime: fairygui.GRichTextField;
	public imgBG: fairygui.GLoader;
	public n25: fairygui.GList;
	public n26: fairygui.GRichTextField;

	public static URL: string = "ui://r92dp953hfx72";

	public static createInstance(): ViewOfflineAwards {
		return <ViewOfflineAwards><any>(fairygui.UIPackage.createObject("guanqia", "ViewOfflineAwards"));
	}

	public constructor() {
		super();
		this.loadRes("guanqia", "guanqia_atlas0");
	}

	protected childrenCreated(): void {
		var self = this;
		GGlobal.createPack("guanqia");
		self.view = fairygui.UIPackage.createObject("guanqia", "ViewOfflineAwards").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		if (GGlobal.sdk) {
			self.n26.visible = true;
		} else {
			self.n26.visible = false;
		}
		self.n25.callbackThisObj = self;
		self.n25.itemRenderer = self.awardsRender;

		self.btnConfirm.addClickListener(self.onCloseHandler, self);
		self.isShowOpenAnimation = false;
		super.childrenCreated();
		self.resetPosition();
	}

	private awards = [];
	private awardsRender(idx, obj) {
		let item: ViewGridRender = obj as ViewGridRender;
		item.vo = this.awards[idx];
		item.tipEnabled = true;
		item.grid.showEff(true);
	}

	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) / 2, (fairygui.GRoot.inst.height - this.height) / 2);
	}

	public onShown() {
		this.update();
		IconUtil.setImg(this.imgBG, Enum_Path.BACK_URL + "guanqialx.jpg");
	}

	public onHide() {
		GGlobal.layerMgr.close(UIConst.GUANQIAOFFLINEINCOM);
		if (this.imgBG) IconUtil.setImg(this.imgBG, null);
	}

	public onCloseHandler() {
		this.doHideAnimation();
		this.n25.numItems = 0;
		GGlobal.layerMgr.close(UIConst.GUANQIASWEEPING);
	}

	public update() {
		var m: ModelGuanQia = GGlobal.modelGuanQia;
		var self = this;
		var offlinedata = m.offlinedata;
		self.lbTime.text = "" + DateUtil.getHMSBySecond(offlinedata[7]);

		var awards: any[] = offlinedata[6];
		awards.unshift([Enum_Attr.TONGBI, 0, offlinedata[2]]);
		awards.unshift([Enum_Attr.EXP, 0, offlinedata[3]]);
		awards.unshift([Enum_Attr.EQUIP, 0, offlinedata[5]]);
		awards.unshift([9, 0, offlinedata[4]]);

		var list: IGridImpl[] = [];
		var vo: IGridImpl;
		for (var i = 0; i < awards.length; i++) {
			var rw = awards[i];
			if (parseInt(rw[0]) == Enum_Attr.ITEM) {//道具
				vo = VoItem.create(parseInt(rw[1]));
			} else {//货币
				vo = Vo_Currency.create(rw[0]);
				(vo as Vo_Currency).showCount = true;
				vo.gType = Enum_Attr.TONGBI;
			}
			if (vo) {
				vo.count = parseInt(rw[2]);
				list.push(vo);
			}
		}
		this.awards = list;
		this.n25.numItems = list.length;
	}

}