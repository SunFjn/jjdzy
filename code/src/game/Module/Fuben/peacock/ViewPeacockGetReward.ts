class ViewPeacockGetReward extends UIModalPanel {

	public lbTitle:fairygui.GTextField;
	public list:fairygui.GList;
	public btnGet:Button1;

	private _curLayer: number;
	private _dropReward: Array<any>;

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		this.view = fairygui.UIPackage.createObject("FuBen", "ViewPeacockGetReward").asCom;
		this.contentPane = this.view;

		this.lbTitle = <fairygui.GTextField><any>(this.view.getChild("lbTitle"));
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.btnGet = <Button1><any>(this.view.getChild("btnGet"));
		
		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
		super.childrenCreated();
	}

	protected onShown(): void {
		this.btnGet.addClickListener(this.getHandle, this);
		GGlobal.control.listen(Enum_MsgType.PEACOCK_PASSLAYER_NUM, this.upReward, this)
	}

	protected onHide(): void {
		this.btnGet.removeClickListener(this.getHandle, this);
		GGlobal.control.remove(Enum_MsgType.PEACOCK_PASSLAYER_NUM, this.upReward, this)
		GGlobal.layerMgr.close(UIConst.PEACOCK_REWARD);
		this.list.numItems = 0;
	}

	public onOpen(arg){
		super.onOpen(arg)
		this.updateView(arg)
	}

	private updateView(cur: number): void {
		if(cur == 0){
			this.lbTitle.text = "铜雀台挑战奖励已全部领取"
			this.lbTitle.color = Color.GREENINT
			this.btnGet.visible = false;
			this.list.numItems = 0;
			return;
		}
		this.btnGet.visible = true;
		this._curLayer = cur;
		this.lbTitle.text = "铜雀台挑战达到" + this._curLayer + "层，可领取"
		if(Model_Peacock.curLayer >= this._curLayer){
			this.lbTitle.color = Color.GREENINT
			this.btnGet.checkNotice = true;
		}else{
			this.lbTitle.color = Color.REDINT
			this.btnGet.checkNotice = false;
		}
		var tower = Config.tower_219[this._curLayer];
		if(tower)
			this._dropReward = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(tower.reward1));
		else
			this._dropReward = [];	
		this.list.numItems = this._dropReward.length;

		this.btnGet.enabled = Model_Peacock.curLayer >= this._curLayer;
	}

	private getHandle(event: egret.TouchEvent = null): void {
		if(Model_Peacock.curLayer >= this._curLayer){
			GGlobal.modelPeacock.CG_GETREWARD(this._curLayer);
		}else{
			ViewCommonWarn.text("尚未达到领取条件")
		}
	}
	
	private renderHandle(index: number, obj: fairygui.GObject): void {
		var item: ViewGrid = obj as ViewGrid;
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = this._dropReward[index];
		item.tipEnabled = true;
	}

	private upReward():void{
		var layer = Model_Peacock.getRewardLayer();
		this.updateView(layer)
	}
}