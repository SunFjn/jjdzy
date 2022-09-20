class View_BaoKu_Panel extends UIPanelBase {

	public c1: fairygui.Controller;
	public headIcon: fairygui.GLoader;
	public costLb: fairygui.GRichTextField;
	public tabArr: TabButton[] = [];
	public list: fairygui.GList;
	private linkLb: fairygui.GRichTextField;

	public static URL: string = "ui://6tpaxc0krkjp1";

	public constructor() {
		super();
		this.setSkin("baoku", "baoku_atlas0", "View_BaoKu_Panel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(BaoKuItem.URL, BaoKuItem);
	}

	protected initView(): void {
		super.initView();
		let a = this;
		for (let i = 0; i < 4; i++) {
			var tab: TabButton = a[`tab${i}`];
			tab.data = i;
			tab.addClickListener(a.OnTab, a);
			a.tabArr.push(tab);
		}
		a.list.callbackThisObj = this;
		a.list.itemRenderer = a.renderHandler;
		a.list.setVirtual();
		a.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, a.changeHandle, this);
		let date: Date = new Date(Model_GlobalMsg.getServerTime());
		let key = "baoku_" + Model_player.voMine.id + "_" + date.getDay() + date.getMonth() + date.getFullYear();
		let value = egret.localStorage.getItem(key);
		if (!value) {
			GGlobal.mainUICtr.setIconNotice(UIConst.BAOKU_LZ, false);
			egret.localStorage.setItem(key, "baoku_Notice");
		}
		a.linkLb.addClickListener(a.linkHandler, this);
	}

	private linkHandler(event: egret.TouchEvent) {
		let panelArr = [3702, 1603, 3602, 4401];
		GGlobal.layerMgr.open(panelArr[this.c1.selectedIndex]);
		event.stopImmediatePropagation();
	}

	private OnTab(evt: egret.TouchEvent) {
		let a = this;
		let index: number = evt.target.data;
		if (a.c1.selectedIndex == index) return;
		let arr = [UIConst.BAOKU_LZ, UIConst.BAOKU_WS, UIConst.BAOKU_XX, UIConst.BAOKU_SG];
		if (!ModuleManager.isOpen(arr[index], true)) {
			a.tabArr[index].selected = false;
			return;
		}
		a.tabArr[a.c1.selectedIndex].selected = false;
		a.tabArr[index].selected = true;
		a.c1.selectedIndex = index;
	}

	private changeHandle() {
		let a = this;
		if (Model_BaoKu.baoKuArr[a.c1.selectedIndex]) {
			a.updateShow();
		} else {
			GGlobal.modelBaoKu.CG_OPEN_BAOKU(a.c1.selectedIndex + 1);
		}
	}

	private renderHandler(index: number, obj: fairygui.GObject) {
		let item = obj as BaoKuItem;
		item.show(Model_BaoKu.baoKuArr[this.c1.selectedIndex][index]);
	}

	private updateShow() {
		let a = this;
		if (!Model_BaoKu.baoKuArr[a.c1.selectedIndex]) return;
		let cfg = Config.bk_236[a.c1.selectedIndex + 1];
		let itemVo: VoItem = VoItem.create(cfg.item);
		let count = Model_Bag.getItemCount(cfg.item);
		a.costLb.text = count + "";
		a.list.numItems = Model_BaoKu.baoKuArr[a.c1.selectedIndex].length;
		IconUtil.setImg1(Enum_Path.BACK_URL + "baoku_" + a.c1.selectedIndex + ".jpg", a.headIcon);
	}

	protected onShown(): void {
		let a = this;
		GGlobal.control.listen(Enum_MsgType.BAOKU, a.updateShow, a);
		if (a._args) {
			if (a.c1.selectedIndex == a._args) {
				a.changeHandle();
			} else {
				a.tabArr[a.c1.selectedIndex].selected = false;
				a.c1.selectedIndex = a._args;
			}
		} else {
			if (a.c1.selectedIndex == 0) {
				a.changeHandle();
			} else {
				a.tabArr[a.c1.selectedIndex].selected = false;
				a.c1.selectedIndex = 0;
			}
		}
		a.tabArr[a.c1.selectedIndex].selected = true;
	}

	protected onHide(): void {
		let a = this;
		GGlobal.layerMgr.close(UIConst.BAOKU_LZ);
		GGlobal.control.remove(Enum_MsgType.BAOKU, a.updateShow, a);
		a.list.numItems = 0;
		IconUtil.setImg1(null, a.headIcon);
	}
}