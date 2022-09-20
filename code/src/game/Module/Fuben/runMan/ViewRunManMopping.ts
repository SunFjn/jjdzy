class ViewRunManMopping extends UIModalPanel {

	public lbTitle: fairygui.GRichTextField;
	public list: fairygui.GList;
	// public lbType: fairygui.GRichTextField;
	public lbLayer: fairygui.GRichTextField;
	public lbAward: fairygui.GRichTextField;
	public btnSure: fairygui.GButton;

	public static URL: string = "ui://pkuzcu87em4dn";

	public static createInstance(): ViewRunManMopping {
		return <ViewRunManMopping><any>(fairygui.UIPackage.createObject("FuBen", "ViewRunManMopping"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("FuBen", "ViewRunManMopping").asCom;
		this.contentPane = this.view;

		this.lbTitle = <fairygui.GRichTextField><any>(this.view.getChild("lbTitle"));
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		// this.lbType = <fairygui.GRichTextField><any>(this.view.getChild("lbType"));
		this.lbLayer = <fairygui.GRichTextField><any>(this.view.getChild("lbLayer"));
		this.lbAward = <fairygui.GRichTextField><any>(this.view.getChild("lbAward"));
		this.btnSure = <fairygui.GButton><any>(this.view.getChild("btnSure"));

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
		super.childrenCreated();
	}

	protected onShown(): void {
		this.addListen();
	}

	protected onHide(): void {
		this.removeListen();
		GGlobal.layerMgr.close(UIConst.FUBEN_RUNMAN_MOP);
		this.list.numItems = 0;
	}

	private addListen(): void {
		this.btnSure.addClickListener(this.closeEventHandler, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
	}

	private removeListen(): void {
		this.btnSure.removeClickListener(this.closeEventHandler, this);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
	}

	public onOpen(arg){
		super.onOpen(arg)
		this.update(arg.arr, arg.info);
	}

	public update(arr: Array<any>, info: VoRunManInfo): void {
		this.resetPosition();
		this.remainTime = 10000;
		this._dropReward = arr;
		this.list.numItems = this._dropReward.length;
		// this.lbType.text = Model_RunMan.getTypeName(info.type);
		let curLayer = 1
		if(info.layerId > 0){
			curLayer = Config.ggzj_008[info.layerId].guan
		}

		let maxLayer = 1
		if(info.layerMaxId > 0){
			maxLayer = Config.ggzj_008[info.layerMaxId].guan
		}
		this.lbLayer.text = "扫荡关数：" + curLayer + "-" + maxLayer + "关"
	}


	private _dropReward: IGridImpl[];
	private renderHandle(index: number, obj: fairygui.GObject): void {
		var item: ViewGridRender = obj as ViewGridRender;
		var v = this._dropReward[index]
		item.vo = v;
	}

	private remainTime = 10000;
	protected onframe(e: egret.Event) {
		var newt = this.remainTime - GGlobal.mapscene.dt;
		if (newt < 0) {
			newt = 0;
			this.closeEventHandler(null);
		}
		this.remainTime = newt;
		this.udTimeView();
	}

	private udTimeView(): void {
		var last = Math.floor(this.remainTime / 1000)
		this.btnSure.text = "确定（" + last + "）"
	}
}