class View_CaiLiao_GetPanel extends UIModalPanel {

	public grid: ViewGrid;
	public list: fairygui.GList;

	public static URL: string = "ui://jvxpx9emhzfc9g";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("common", "View_CaiLiao_GetPanel").asCom;
		a.contentPane = a.view;
		a.grid = <ViewGrid><any>(a.view.getChild("grid"));
		a.list = <fairygui.GList><any>(a.view.getChild("list"));
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandler;
		a.list.foldInvisibleItems = true;
		super.childrenCreated();
	}

	private OnList(evt: fairygui.ItemEvent) {
		evt.stopPropagation();
		let iconLb = evt.itemObject as fairygui.GLabel;
		GGlobal.layerMgr.closeAllPanel(true);
		let uiId = iconLb.data.id;
		let uiP = iconLb.data.p;
		if (uiId == UIConst.NANZHENG_BEIZHAN && Model_player.voMine.country == 0) {
			GGlobal.layerMgr.open(UIConst.COUNTRY_SELECT);
		} else if (uiId == UIConst.SJMJ1) {
			if (ModuleManager.isOpen(uiId, true)) {
				if (GGlobal.sceneType != SceneCtrl.GUANQIA || GGlobal.modelFengHuoLY.inActivity) {
					ViewCommonWarn.text("副本中不可加入");
					return;
				}
				if (Model_CrossTeam.teamId > 0) {
					ViewCommonWarn.text("请先退出跨服组队");
					return;
				}
				if (uiP) {
					GGlobal.modelSJMJ.isGetOpen = true;
					GGlobal.modelSJMJ.isGetID = uiP;
				}
				GGlobal.layerMgr.open(uiId);
			}
		} else if (uiId == UIConst.DISCOUNT_SHOP) {
			if (ModelEightLock.getActVo(UIConst.DISCOUNT_SHOP1)) {
				GGlobal.layerMgr.open(UIConst.CHAOZHIFL, UIConst.DISCOUNT_SHOP1);
			} else {
				GGlobal.layerMgr.open(UIConst.CHAOZHIFL, UIConst.DISCOUNT_SHOP);
			}
		} else if (uiId == UIConst.SYSTEM_ZHI_GOU) {
			if (Model_GlobalMsg.kaifuDay > 7) {
				GGlobal.layerMgr.open(UIConst.ZHI_GOU, { day: 99, type: 0 });
			} else {
				GGlobal.layerMgr.open(UIConst.SYSTEM_ZHI_GOU, { day: 99, type: 0 });
			}
		} else {
			GGlobal.layerMgr.open(uiId, uiP);
		}
	}

	private renderHandler(index: number, obj: fairygui.GObject) {
		let a = this;
		let iconLb = obj as fairygui.GLabel;
		let uiId = a.iconArr[index][0];
		let d = { id: uiId, p: a.iconArr[index][3] }
		iconLb.data = d;
		iconLb.getChild("icon").visible = a.iconArr[index][1] == 1;
		iconLb.text = HtmlUtil.underLine(a.iconArr[index][2]);
		iconLb.visible = true;
		if (uiId == UIConst.DISCOUNT_SHOP || uiId == UIConst.DISCOUNT_SHOP1) {
			if (Model_GlobalMsg.kaifuDay == a.iconArr[index][3]) {
			} else {
				if (Model_GlobalMsg.kaifuDay > 7) {
					var date: Date = new Date(Model_GlobalMsg.getServerTime());
					let weekDay = date.getDay();
					if (weekDay == 0) weekDay = 7;
					iconLb.visible = weekDay == a.iconArr[index][3];
				} else {
					iconLb.visible = false;
				}
			}
		}
	}

	private iconArr = [];
	private updateShow() {
		let a = this;
		if (!a._args) return;
		let vo: VoItem = a._args;
		a.frame.text = vo.name;
		a.grid.vo = vo;
		a.iconArr = vo.wayArr;
		a.list.numItems = a.iconArr.length;
	}

	protected onShown(): void {
		let a = this;
		a.updateShow();
		a.list.addEventListener(fairygui.ItemEvent.CLICK, a.OnList, a);
	}

	protected onHide(): void {
		let a = this;
		GGlobal.layerMgr.close(UIConst.CAILIAO_GET);
		a.list.removeEventListener(fairygui.ItemEvent.CLICK, a.OnList, a);
		a.list.numItems = 0;
	}

	public static show(vo: VoItem) {
		if (vo.wayArr.length <= 0) {
			ViewCommonWarn.text("缺少道具：" + HtmlUtil.fontNoSize(vo.name, Color.getColorStr(vo.quality)));
		} else {
			GGlobal.layerMgr.open(UIConst.CAILIAO_GET, vo);
		}
	}
}