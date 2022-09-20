/**
 * 桃园结义申请界面
 */
class TYJY_ApplyView extends UIModalPanel{
	public list: fairygui.GList;
	public cancelBtn: Button0;

	private _listData:Array<TYJY_VO>;

	public static URL: string = "ui://m2fm2aiyvfmx18";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_ApplyView").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);

		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRender;
		super.childrenCreated();
	}

	protected onShown(): void {
		let self = this;
		GGlobal.model_TYJY.CG_GET_APPLYMEMBER();
		GGlobal.control.listen(UIConst.TYJY_APPLY, self.updateList, self);
		self.cancelBtn.addClickListener(self.onCancel, self);
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
		GGlobal.control.remove(UIConst.TYJY_APPLY, self.updateList, self);
		self.cancelBtn.removeClickListener(self.onCancel, self);
	}

	private itemRender(idx, obj) {
		let item: TYJY_ApplyItem = obj as TYJY_ApplyItem;
		item.setdata(this._listData[idx]);
	}

	/**
	 * 更新列表数据
	 */
	private updateList()
	{
		let self = this;
		self._listData = GGlobal.model_TYJY.applyList;
		self.list.numItems = self._listData ? self._listData.length : 0;
	}

	/**
	 * 全部拒绝
	 */
	private onCancel(e: egret.TouchEvent): void {
		GGlobal.model_TYJY.CG_APPROVAL_APPLY(3, 0);
		GGlobal.layerMgr.close(UIConst.TYJY_APPLY);
	}
}