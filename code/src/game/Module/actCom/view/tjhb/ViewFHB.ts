/**
 * 发红包界面
 */
class ViewFHB extends UIModalPanel{
	public list: fairygui.GList;

	private _listData = [];

	public static URL: string = "ui://fm0lrzctv4652";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("ActCom_TJHB", "ViewFHB").asCom;
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
		// GGlobal.model_TJHB.CG_SEND_UI();
		self.updateView();
	}

	protected onHide(): void {
		let self = this;
		self.removeListen();
		GGlobal.layerMgr.close(UIConst.TJHB_FHB);
	}

	private addListen(): void {
		let self = this;
		GGlobal.control.listen(UIConst.TJHB_FHB, self.updateView, self);
	}

	private removeListen(): void {
		let self = this;
		GGlobal.control.remove(UIConst.TJHB_FHB, self.updateView, self);
		self.list.numItems = 0;
	}

	/**
     * 更新页面数据
     */
	private updateView() {
		let self = this;
		let model = GGlobal.model_TJHB;
		self._listData = Model_ActComTJHB.getListData(model.fhbArr);
		self.list.numItems = self._listData.length;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ItemFHB = obj as ItemFHB;
		v.setVo(this._listData[index]);
	}
	
}