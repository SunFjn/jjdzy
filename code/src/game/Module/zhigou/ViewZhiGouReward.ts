/**
 * 直购奖励框
 */
class ViewZhiGouReward extends UIModalPanel {

	public c1: fairygui.Controller;
	public list: fairygui.GList;
	// public lb: fairygui.GTextField;
	public btnGet: Button1
	public imgHas: fairygui.GImage

	public constructor() {
		super();
		this.loadRes("zhigou", "zhigou_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("zhigou");
		this.view = fairygui.UIPackage.createObject("zhigou", "ViewZhiGouReward").asCom;
		this.contentPane = this.view;

		this.c1 = this.view.getController("c1");
		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.btnGet = <Button1><any>(this.view.getChild("btnGet"));
		this.imgHas = <fairygui.GImage><any>(this.view.getChild("imgHas"));

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
		super.childrenCreated();
	}

	private _listData: Array<any>
	private _type: number
	private _pointCfg: any
	private _vPoint: ZhiGouVO;

	protected onShown(): void {
		this._listData = this._args.award || [];
		this._vPoint = this._args.vo;

		this.btnGet.addClickListener(this.onGet, this);
		GGlobal.control.listen(Enum_MsgType.ZHIGOU_UPDATE, this.update, this);
		this.update();
	}

	protected onHide(): void {
		this.btnGet.removeClickListener(this.onGet, this);
		GGlobal.layerMgr.close(UIConst.ZHI_GOU_REWARD);
		GGlobal.control.remove(Enum_MsgType.ZHIGOU_UPDATE, this.update, this);
		this.list.numItems = 0;
	}

	private update() {
		this.list.numItems = this._listData.length;
		this.c1.selectedIndex = this._vPoint.state == 2 ? 1 : 0;
		if(this._vPoint && this._vPoint.state == 1)
		{
			this.btnGet.checkNotice = true;
		}else{
			this.btnGet.checkNotice = false;
		}
		this._pointCfg = Config.mrzgmb_256[this._vPoint.id];
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.tipEnabled = true
		v.isShowEff = true
		v.vo = this._listData[index];
	}

	private onGet(): void {
		if (this._pointCfg == null) return;
		if (this.btnGet.checkNotice == false) {
			ViewCommonWarn.text("领取条件不足")
			return;
		}

		let _act:Vo_Activity = ModelEightLock.getActVo(UIConst.ZHI_GOU828);
		if (Model_GlobalMsg.kaifuDay <= 7) {
			GGlobal.modelZhiGou.CG_3707(this._vPoint.id);
		}else if(_act){
			GGlobal.modelZhiGou.CG_7005(this._vPoint.id);
		}else {
			GGlobal.modelZhiGou.CG_3725(this._vPoint.id);
		}
	}
}