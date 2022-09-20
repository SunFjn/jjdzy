/**
 * 许愿树排行榜奖励展示
 */
class WishTreeRewView extends UIModalPanel {

	public c1:fairygui.Controller;
	public lb:fairygui.GTextField;
	public list:fairygui.GList;
	public btnGet:Button1;
	public imgHas:fairygui.GImage;

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("ActCom_WishTree");
		this.view = fairygui.UIPackage.createObject("ActCom_WishTree", "WishTreeRewView").asCom;
		this.contentPane = this.view;
		CommonManager.parseChildren(this.view, this);

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
		super.childrenCreated();

	}

	private _listData: Array<any>
	private _type: number
	private _pointCfg: any
	private _vPoint: Vo_LingLong
	private _base:number

	protected onShown(): void {
		this._listData = this._args.award || [];
		this._type = this._args.type;
		this._vPoint = this._args.vo;
		this._base = this._args.base;

		this.update();
	}

	protected onHide(): void {
		GGlobal.layerMgr.close(UIConst.WISHTREE_REW);
		this.list.numItems = 0;
	}

	private update() {
		this.list.numItems = this._listData.length
		this.c1.selectedIndex = this._type == 2 ? 0 : 1;
		this.upStatus();
	}

	private upStatus() {
		if (this._type == 1) {
			this._pointCfg = Config.llgpoint_239[this._vPoint.point]
			let need = this._base + this._pointCfg.point
			if (this._vPoint.status > 0) {
				this.imgHas.visible = false;
				this.btnGet.visible = true;
				this.btnGet.checkNotice = true;
			} else if(this._pointCfg == null || Model_LingLong.myPoint < need){
				this.imgHas.visible = false;
				this.btnGet.visible = true;
				this.btnGet.checkNotice = false;
			} else if (this._vPoint.status == -1) {//已领取
				this.imgHas.visible = true;
				this.btnGet.visible = false;
			} else{
				this.imgHas.visible = false;
				this.btnGet.visible = true;
				this.btnGet.checkNotice = false;
			}
		}
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ViewGrid = obj as ViewGrid
		v.tipEnabled = true
		v.isShowEff = true
		v.vo = this._listData[index];
	}
}