class View_FunctionPreview_Panel extends UIPanelBase {

	public list: fairygui.GList;
	public grid0: ViewGrid;
	public grid1: ViewGrid;
	public drawBt: Button1;
	public drawImg: fairygui.GImage;
	public iconImg: fairygui.GLoader;
	public lbImg: fairygui.GLoader;
	public backImg: fairygui.GLoader;
	public gqLb: fairygui.GRichTextField;

	public static URL: string = "ui://j1v1kh34ejra0";

	public constructor() {
		super();
		this.setSkin("functionPreview", "functionPreview_atlas0", "View_FunctionPreview_Panel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(FunctionPreviewItem.URL, FunctionPreviewItem);
	}

	protected initView(): void {
		super.initView();
		let a = this;
		a.list.callbackThisObj = this;
		a.list.itemRenderer = a.renderHandler;
		a.list.setVirtual();
		a.list.addEventListener(fairygui.ItemEvent.CLICK, a.listHandle, this);
		a.grid0.isShowEff = true;
		a.grid1.isShowEff = true;
		a.drawBt.addClickListener(a.onDraw, this);
		Model_FunctionPreview.getFunctionPreView();
		GGlobal.modelPreview.CG_OPEN_FUNCTIONPREVIEW();
	}

	private onDraw() {
		if (this.drawBt.checkNotice) {
			GGlobal.modelPreview.CG_FUNCTIONPREVIEW_DRAWREWARD(this.curVo.id);
		} else {
			ViewCommonWarn.text(HtmlUtil.fontNoSize("未达到领取条件", Color.getColorStr(6)));
		}
	}

	private curVo;
	private curItem: FunctionPreviewItem;
	private listHandle(evt: fairygui.ItemEvent) {
		let a = this;
		let item: FunctionPreviewItem = evt.itemObject as FunctionPreviewItem;
		if (a.curVo && a.curVo.id == item.vo.id) return;
		if (a.curVo) a.curVo.choose = false;
		if (a.curItem) a.curItem.setChoose(false);
		item.setChoose(true);
		a.curVo = item.vo;
		a.curItem = item;
		a.updateChooseShow();
	}

	private renderHandler(index: number, obj: fairygui.GObject) {
		let a = this;
		let item: FunctionPreviewItem = obj as FunctionPreviewItem;
		let vo = Model_FunctionPreview.listArr[index];
		item.show(vo);
		if (!a.curVo && GGlobal.modelGuanQia.curGuanQiaLv >= vo.id && Model_FunctionPreview.drawArr.indexOf(vo.id) == -1) {
			item.setChoose(true);
			a.curVo = vo;
			a.curItem = item;
		} else if (!a.curVo && Model_FunctionPreview.drawArr.indexOf(vo.id) == -1) {
			item.setChoose(true);
			a.curVo = vo;
			a.curItem = item;
		} else if (a.curVo && a.curVo.id == vo.id) {
			a.curVo.choose = false;
			item.setChoose(true);
			a.curVo = vo;
			a.curItem = item;
		}
	}

	private index: number = 0;
	private updateShow() {
		let a = this;
		a.index = -1;
		if (a.curVo) a.curVo.choose = false;
		a.curVo = null;
		if (a.curItem) a.curItem.choose = false;
		a.curItem = null;
		let arr = Model_FunctionPreview.listArr;
		for (let i = 0; i < arr.length; i++) {
			let vo = Model_FunctionPreview.listArr[i];
			if (Model_FunctionPreview.drawArr.indexOf(vo.id) == -1) {
				a.index = i;
				break;
			}
		}
		if (a.index == -1) {
			a.curVo = arr[arr.length - 1];
			a.index = arr.length - 1;
		}
		a.list.numItems = arr.length;
		a.list.scrollToView(Math.floor(a.index / a.list.columnCount) * a.list.columnCount);
		a.updateChooseShow();
	}

	private updateChooseShow() {
		let a = this;
		if (!a.curVo) return;
		let reward = ConfigHelp.makeItemListArr(JSON.parse(a.curVo.reward));
		a.grid0.vo = reward[0];
		a.grid0.tipEnabled = true;
		a.grid1.vo = reward[1];
		a.grid1.tipEnabled = true;
		a.drawBt.visible = true;
		a.drawImg.visible = false;
		a.gqLb.visible = false;
		IconUtil.setImg1(Enum_Path.SYSSHOW_URL + a.curVo.icon + ".png", a.iconImg);
		IconUtil.setImg1(Enum_Path.SYSSHOW_URL + a.curVo.font + ".png", a.lbImg);
		if (Model_FunctionPreview.drawArr.indexOf(a.curVo.id) != -1) {
			a.drawBt.visible = false;
			a.drawImg.visible = true;
		} else {
			if (a.curItem.check) {
				a.drawBt.checkNotice = a.curItem.check;
			} else {
				a.drawBt.visible = false;
				a.gqLb.text = a.curVo.tips;
				a.gqLb.visible = true;
			}
		}
	}

	protected onShown(): void {
		let a = this;
		a.updateShow();
		// ImageLoader.instance.loader(Enum_Path.BACK_URL + "functionview.jpg", this.backImg);
		IconUtil.setImg(this.backImg, Enum_Path.BACK_URL + "functionview.jpg");
		GGlobal.control.listen(Enum_MsgType.FUNCTIONPREVIEW, a.updateShow, this);
	}

	protected onHide(): void {
		let a = this;
		if (a.curVo) a.curVo.choose = false;
		a.curVo = null;
		if (a.curItem) a.curItem.choose = false;
		a.curItem = null;
		IconUtil.setImg(this.backImg, null);
		ConfigHelp.cleanGridEff(a.grid0);
		ConfigHelp.cleanGridEff(a.grid1);
		this.list.numItems = 0;
		GGlobal.layerMgr.close(UIConst.FUNCTIONPREVIEW);
		GGlobal.control.remove(Enum_MsgType.FUNCTIONPREVIEW, a.updateShow, this);
		IconUtil.setImg1(null, a.iconImg);
		IconUtil.setImg1(null, a.lbImg);
	}

	public guideDraw() {
		GuideStepManager.instance.showGuide(this.drawBt, this.drawBt.width / 2, this.drawBt.height / 2);
	}

	public guideClosePanel() {
		GuideStepManager.instance.showGuide(this.closeButton.asButton, this.closeButton.width / 2, this.closeButton.height / 2, null, true);
	}
}