/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewActivityHall extends UIPanelBase {

	public c1: fairygui.Controller;
	public frame: fairygui.GLabel;
	public lst: fairygui.GList;
	public tab0: TabButton;
	public tab1: TabButton;
	public tab2: TabButton;
	public static URL: string = "ui://1xydor24n7ie0";
	public constructor() {
		super();
		this.setSkin("activityHall", "activityHall_atlas0", "ViewActivityHall");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(LongZDIt.URL, LongZDIt);
		fairygui.UIObjectFactory.setPackageItemExtension(LZDRankIt.URL, LZDRankIt);
		fairygui.UIObjectFactory.setPackageItemExtension(AcitivityTab.URL, AcitivityTab);
	}

	protected initView(): void {
		super.initView();
		let s = this;
		s.lst.callbackThisObj = s;
		s.lst.itemRenderer = s.onRender;
		s.lst.setVirtual();
	}

	private onRender(idx, obj) {
		let item = obj as AcitivityTab;
		item.setIdx(this.dta[this.c1.selectedIndex][idx], idx);
	}

	private update() {
		let self = this;
		if (!self.dta) {
			self.dta = [];
			let cfg = Config.hddt_200;
			for (let i in cfg) {
				let tabType = cfg[i].fenlei -1;
				if (!self.dta[tabType]) {
					self.dta[tabType] = [];
				}
				self.dta[tabType].push(Number(i));
			}
		}
		self.lst.numItems = self.dta[self.c1.selectedIndex].length;
	}

	private checkRedot() {
		let self = this;
		let m =GGlobal.modelActivityHall;
		let dta = self.dta;
		let red1 = 0;
		let red2 = 0;
		self.tab0.checkNotice = false;
		self.tab1.checkNotice = false;
		self.tab2.checkNotice = false;
		for(let i = 0; i < dta.length; i ++){
			let temp = dta[i];
			for(let j=0;j<temp.length; j++){
				let red = m.checkNotice(temp[j]);
				if(red){
					self["tab"+i].checkNotice = red;
				}
			}
		}
	}

	private onChangerHandler(evt?) {
		this.update();
	}

	private eventFun(b) {
		let self = this;
		EventUtil.register(b, self.c1, fairygui.StateChangeEvent.CHANGED, this.onChangerHandler, this);
	}

	private dta;
	protected onShown() {
		let self = this;
		if(self._args){
			self.c1.setSelectedIndex(self._args);
		}
		self.update();
		self.checkRedot();
		self.eventFun(1);
		GGlobal.modelActivityHall.CG_OPEN_ACTIVITYHALL();
		GGlobal.control.listen(UIConst.ACTIVITYHALL, self.update, self);
		GGlobal.reddot.listen(UIConst.SHAOZHU_ESCORT, self.update, self);
	}

	protected onHide() {
		let self = this;
		self.lst.numItems = 0;
		self.eventFun(0);
		GGlobal.control.remove(UIConst.ACTIVITYHALL, self.update, self);
		GGlobal.layerMgr.close(UIConst.ACTIVITYHALL);
		GGlobal.reddot.remove(UIConst.SHAOZHU_ESCORT, self.update, self);
	}
}