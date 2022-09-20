/**
 * 对对联奖励展示面板
 */
class DDLRewardView extends UIModalPanel{
	public list: fairygui.GList;
	private _cfg:Iddlreward_297;
	private _listData: Array<any>;
	public btnGet:Button1;
	public imgHas:fairygui.GImage;
	public c1: fairygui.Controller;
	private _status:number = 0;

	public static URL: string = "ui://ke8qv0ckqq0ga";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("ActCom_DDL", "DDLRewardView").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);

		self.list.itemRenderer = self.renderHandle;
		self.list.callbackThisObj = self;
		self.list.setVirtual();
		super.childrenCreated();
	}

	protected onShown(): void {
		let self = this;
		self.addListen();
		self._cfg = self._args.cfg;
		self.updateView();
	}

	protected onHide(): void {
		this.removeListen();
		this.list.numItems = 0;
		GGlobal.layerMgr.close(UIConst.DDL_REWARD);
	}

	private addListen(): void {
		let self = this;
		GGlobal.control.listen(UIConst.ACTCOM_DDL, self.updateView, self);
		self.btnGet.addClickListener(self.onGetAward, self);
	}

	private removeListen(): void {
		let self = this;
		GGlobal.control.remove(UIConst.ACTCOM_DDL, self.updateView, self);
		self.btnGet.removeClickListener(self.onGetAward, self);
	}

	/**
	 * 更新界面数据
	 */
	private updateView() {
		let self = this;
		self._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(self._cfg.reward));
		self.list.numItems = self._listData.length;

		let model = GGlobal.model_DDL;
		let len:number = model.rewardArr.length;
		for(let i:number = 0;i < len;i ++)
		{
			let vo:DDLVO = model.rewardArr[i];
			if(vo.id == self._cfg.id)
			{
				self._status = vo.status;
			}
		}
		self.c1.selectedIndex = self._status == 2? 1:0;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.tipEnabled = true
		v.isShowEff = true
		v.vo = this._listData[index];
	}

	private onGetAward(e: egret.TouchEvent): void {
		let self = this;
		var btn = e.currentTarget as Button2;
		if(self._status == 2)  return;

		GGlobal.model_DDL.CG_GET_TARGETAWARD(self._cfg.id);
	}
}