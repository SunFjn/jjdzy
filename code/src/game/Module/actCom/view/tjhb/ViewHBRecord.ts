/**
 * 发红包记录界面
 */
class ViewHBRecord extends UIModalPanel {
	public bgImg: fairygui.GLoader;
	public closeBtn: Button2;
	public list: fairygui.GList;
	public totalLab:fairygui.GRichTextField;
	public iconYuanBao: fairygui.GLoader;

	private _listData = [];
	private _max: number = 0;

	public static URL: string = "ui://fm0lrzctv465i";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("ActCom_TJHB", "ViewHBRecord").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);

		self.list.itemRenderer = self.renderHandle;
		self.list.callbackThisObj = self;
		self.list.setVirtual();
		super.childrenCreated();
	}

	protected onShown(): void {
		let self = this;
		let vo: HBVo = this._args.vo;
		self.addListen();
		GGlobal.model_TJHB.CG_OPENRECORD_UI(vo.hbId);
		let cfg:any;
		if(vo.isSystemHB == 0)
		{
			cfg = Config.tjhb_296[vo.hbType];
		}else{
			cfg = Config.tjhbsys_296[vo.hbType];
		}
		let id:number = Number(ConfigHelp.SplitStr(cfg.hb)[0][0]);
		let v = VoItem.create(id);
		let num:number = Number(ConfigHelp.SplitStr(cfg.hb)[0][2]);
		IconUtil.setImg(self.iconYuanBao, Enum_Path.ICON70_URL + v.icon + ".png");
		self.totalLab.text = num + "";
	}

	protected onHide(): void {
		let self = this;
		self.removeListen();
		GGlobal.layerMgr.close(UIConst.TJHB_RECORD);
		IconUtil.setImg(self.iconYuanBao, null);
	}

	private addListen(): void {
		let self = this;
		IconUtil.setImg(self.bgImg, Enum_Path.ACTCOM_URL + "tianjianghongbao1.png");
		self.closeBtn.addClickListener(self.onCloseView, self);
		GGlobal.control.listen(UIConst.TJHB_RECORD, self.updateView, self);
	}

	private removeListen(): void {
		let self = this;
		IconUtil.setImg(self.bgImg, null);
		GGlobal.control.remove(UIConst.TJHB_RECORD, self.updateView, self);
		self.closeBtn.removeClickListener(self.onCloseView, self);
	}

	/**
     * 更新页面数据
     */
	private updateView() {
		let self = this;
		let model = GGlobal.model_TJHB;
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
		this.onHide();
		// GGlobal.layerMgr.close(UIConst.TJHB_RECORD);
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: ItemHBRecord = obj as ItemHBRecord;
		let vo: HBVo = GGlobal.model_TJHB.recordArr[index];
		v.setData(vo, vo.money >= this._max);
	}
}