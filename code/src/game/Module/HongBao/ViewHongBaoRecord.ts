class ViewHongBaoRecord extends UIModalPanel {
	public bgImg: fairygui.GLoader;
	public closeBtn: Button2;
	public list: fairygui.GList;
	public totalLab: fairygui.GRichTextField;
	public iconYuanBao: fairygui.GLoader;

	private _listData = [];
	private _max: number = 0;

	public static URL: string = "ui://s01exr8xqz027";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("HongBao", "ViewHongBaoRecord").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);

		self.list.itemRenderer = self.renderHandle;
		self.list.callbackThisObj = self;
		self.list.setVirtual();
		super.childrenCreated();
	}

	protected onShown(): void {
		let self = this;
		let vo: Vo_HongBao = self._args;
		self.addListen();
		GGlobal.modelHB.CG_RedBoxAct_lookinfos_11761(vo.id);
		self.totalLab.text = vo.moneyNum + "";
	}

	protected onHide(): void {
		let self = this;
		self.removeListen();
	}

	private addListen(): void {
		let self = this;
		IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + "tianjianghongbao1.png");
		self.closeBtn.addClickListener(self.onCloseView, self);
		GGlobal.control.listen(UIConst.HONGBAO_RECORD, self.updateView, self);
	}

	private removeListen(): void {
		let self = this;
		IconUtil.setImg(self.bgImg, null);
		GGlobal.control.remove(UIConst.HONGBAO_RECORD, self.updateView, self);
		self.closeBtn.removeClickListener(self.onCloseView, self);
	}

	/**
     * 更新页面数据
     */
	private updateView() {
		let self = this;
		let model = GGlobal.modelHB;
		let len: number = model.recordArr.length;
		self._max = 0;
		for (let i: number = 0; i < len; i++) {
			let v = model.recordArr[i];
			if (v.money > self._max) {
				self._max = v.money;
			}
		}
		self.list.numItems = model.recordArr.length;
	}

	/**
	 * 关闭界面
	 */
	private onCloseView() {
		this.doHideAnimation();
	}

	private renderHandle(index: number, obj: ItemHongBaoRecord): void {
		let vo: Vo_HongBao = GGlobal.modelHB.recordArr[index];
		obj.setData(vo, vo.money >= this._max && vo.drawNum >= Model_HongBao.max);
	}
}