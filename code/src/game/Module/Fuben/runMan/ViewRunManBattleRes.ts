class ViewRunManBattleRes extends UIModalPanel {

	public bg1: fairygui.GComponent;
	public btnClose: fairygui.GButton;
	public btnContinue: fairygui.GButton;
	public hunGrid: VRunManGrid;
	public gHun: fairygui.GGroup;
	public gFirst: fairygui.GGroup;
	public list: fairygui.GList;
	public listFirst: fairygui.GList;

	public static URL: string = "ui://pkuzcu87em4dm";

	// protected grids: ViewGridRender[] = [];
	// protected gridsFrist: ViewGridRender[] = [];


	public static createInstance(): ViewRunManBattleRes {
		return <ViewRunManBattleRes><any>(fairygui.UIPackage.createObject("FuBen", "ViewRunManBattleRes"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("FuBen", "ViewRunManBattleRes").asCom;
		this.contentPane = this.view;

		this.bg1 = <fairygui.GComponent><any>(this.view.getChild("bg1"));
		this.btnClose = <fairygui.GButton><any>(this.view.getChild("btnClose"));
		this.btnContinue = <fairygui.GButton><any>(this.view.getChild("btnContinue"));
		this.hunGrid = <VRunManGrid><any>(this.view.getChild("hunGrid"));
		this.gHun = <fairygui.GGroup><any>(this.view.getChild("gHun"));
		this.gFirst = <fairygui.GGroup><any>(this.view.getChild("gFirst"));
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.listFirst = <fairygui.GList><any>(this.view.getChild("listFirst"));

		this.list.itemRenderer = this.renderHander
		this.list.callbackThisObj = this;
		this.listFirst.itemRenderer = this.renderHanderFirst
		this.listFirst.callbackThisObj = this;
		super.childrenCreated();
	}

	protected onShown(): void {
		this.addListen();
		this.update();
	}

	protected onHide(): void {
		this.removeListen();
		GGlobal.layerMgr.close(UIConst.FUBEN_RUNMAN_RES);
	}

	private addListen(): void {
		this.btnClose.addClickListener(this.exitHandle, this);
		this.btnContinue.addClickListener(this.continueHandle, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
	}

	private removeListen(): void {
		// ConfigHelp.cleanGridview(this.grids);
		this.btnClose.removeClickListener(this.exitHandle, this);
		this.btnContinue.removeClickListener(this.continueHandle, this);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
		this.list.numItems = 0
		this.listFirst.numItems = 0
	}

	private exitHandle(event: egret.TouchEvent = null): void {
		GGlobal.control.notify(Enum_MsgType.RUNMAN_CLOSE_BATTLE);
		this.closeEventHandler(event);
	}

	private continueHandle(event: egret.TouchEvent = null): void {
		GGlobal.modelRunMan.CG_BattleType(Model_RunMan.battleType);
		// GGlobal.modelRunMan.CG_BattleType();
		this.closeEventHandler(event);
	}


	private update(): void {
		this.remainTime = 5000;
		this._dropReward = ConfigHelp.makeItemListArr(Model_RunMan.dropArr)
		var self = this;
		this.list.numItems = this._dropReward.length

		this._dropFirst = Model_RunMan.dropFirst
		this.gFirst.visible = this._dropFirst.length > 0;
		this.listFirst.numItems = this._dropFirst.length;

		if (Model_RunMan.dropHun) {
			this.hunGrid.vo = Model_RunMan.dropHun;
			this.hunGrid.visible = true;
			this.hunGrid.actiVis = false;
			this.gHun.visible = true;
		} else {
			this.hunGrid.visible = false;
			this.gHun.visible = false;
		}
		var ggzj = Config.ggzj_008[Model_RunMan.battleLayer];
		if (ggzj.next == 0) {//最后一关
			this.btnClose.x = 256
			this.isPass = true;
			this.btnClose.text = "退出(10)"
			this.btnContinue.visible = this.btnContinue.touchable = false;
		} else {
			this.btnClose.x= 162
			this.isPass = false;
			this.btnClose.text = "退出"
			this.btnContinue.text = "继续(10)"
			this.btnContinue.visible = this.btnContinue.touchable = true;
		}

	}
	private isPass: boolean = false;

	private _dropReward: IGridImpl[];
	private _dropFirst: IGridImpl[];
	private renderHander(index: number, obj: fairygui.GObject): void {
		var item: ViewGridRender = obj as ViewGridRender;
		item.tipEnabled = true;
		item.vo = this._dropReward[index]
	}

	private remainTime = 5000;
	protected onframe(e: egret.Event) {
		var newt = this.remainTime - GGlobal.mapscene.dt;
		if (newt < 0) {
			newt = 0;
			if (this.isPass) {
				this.exitHandle();
			} else {
				this.continueHandle();
			}
		}
		this.remainTime = newt;
		this.udTimeView();
	}

	private udTimeView(): void {
		var last = Math.floor(this.remainTime / 1000)
		if (this.isPass) {
			this.btnClose.text = "退出(" + last + ")"
		} else {
			this.btnContinue.text = "继续(" + last + ")"
		}
	}


	private renderHanderFirst(index: number, obj: fairygui.GComponent): void {
		var item = obj as ViewGridRender;
		item.tipEnabled = true;
		item.vo = this._dropFirst[index];
	}
}