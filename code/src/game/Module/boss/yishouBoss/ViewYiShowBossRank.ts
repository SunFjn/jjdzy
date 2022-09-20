/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewYiShowBossRank extends UIModalPanel {

	public frame: fairygui.GLabel;
	public n2: fairygui.GImage;
	public n3: fairygui.GRichTextField;
	public n6: fairygui.GRichTextField;
	public n7: fairygui.GRichTextField;
	public n14: fairygui.GList;
	public n15: fairygui.GImage;
	public lbRank: fairygui.GRichTextField;
	public lbLayer: fairygui.GRichTextField;

	public static URL: string = "ui://47jfyc6ehul73k";

	public constructor() {
		super();
		let f = fairygui.UIObjectFactory.setPackageItemExtension;
		f(ItemYSBOSS.URL, ItemYSBOSS);
		this.loadRes("Boss", "Boss_atlas0");
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("Boss", "ViewYiShowBossRank").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.n14.callbackThisObj = self;
		self.n14.itemRenderer = self.renderHd;
		super.childrenCreated();
	}

	private renderHd(idx, obj) {
		let item: ItemYSBOSS = obj as ItemYSBOSS;
		item.setdate(this.__data[idx]);
	}

	update = () => {
		let self = this;
		let m = GGlobal.modelYiShouBOSS;
		self.__data = m.rankdata;
		self.n14.numItems = self.__data.length;

		let rank = m.myRank;
		if (rank > 0) {
			self.lbRank.text = "我的排名：<font color=\"#15f234\">" + rank + "</font>";
		} else {
			self.lbRank.text = "我的排名：未上榜";
		}
		self.lbLayer.text = "通关数：" + m.crossLayer;
	}

	eventFun = (v) => {
		let self = this;
		let control = GGlobal.control;
		control.register(v, UIConst.YSBOSS, self.update, self);
	}

	private __data;
	public onShown() {
		let self = this;
		GGlobal.modelYiShouBOSS.CG_SpecialAnimalBoss_getRank_9441();
		self.eventFun(1);
	}

	public onHide() {
		let self = this;
		self.n14.numItems = 0;
		self.eventFun(0);
		GGlobal.layerMgr.close(UIConst.YSBOSSRANK);
	}
}