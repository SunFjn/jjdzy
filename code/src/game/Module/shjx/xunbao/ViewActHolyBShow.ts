class ViewActHolyBShow extends UIModalPanel {

	public list: fairygui.GList;
	public surebt: Button0;
	public continuebt: Button1;
	public lab: fairygui.GRichTextField;
	public img: fairygui.GLoader;

	public constructor() {
		super();
		this.loadRes("bossTiShi","bossTiShi_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("bossTiShi");
		this.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show2").asCom;
		this.contentPane = this.view;

		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.surebt = <Button0><any>(this.view.getChild("surebt"));
		this.continuebt = <Button1><any>(this.view.getChild("continuebt"));
		this.lab = <fairygui.GRichTextField><any>(this.view.getChild("lab"));
		this.img = <fairygui.GLoader><any>(this.view.getChild("img"));

		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandler;
		this.surebt.addClickListener(this.OnSure, this);
		this.continuebt.addClickListener(this.OnContinue, this);
		this.isShowOpenAnimation = false;
		this.closeButton = this.view.getChild("closeButton");
		super.childrenCreated();
	}
	

	protected onShown(){
		this.rewardArr = ConfigHelp.makeItemListArr(this._args);
		this.list.numItems = this.rewardArr.length;
		this.times = 11;
		Timer.instance.listen(this.timeHandler, this, 1000);
		this.continuebt.text = "再来一次"

		let ct = Model_Bag.getItemCount(Model_SHXunBao.XB_ITEM)
		if (ct >= 1) {
			this.lab.color = Color.GREENINT;
		} else {
			this.lab.color = Color.REDINT;
		}
		this.lab.text = "" + ct;
		let icon = Config.daoju_204[Model_SHXunBao.XB_ITEM].icon
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + icon + ".png", this.img);
	}

	protected onHide(): void {
		this.list.numItems = 0;
		Timer.instance.remove(this.timeHandler, this);
		GGlobal.layerMgr.close(UIConst.ACT_HOLYB_XBSHOW);
	}

	private OnSure() {
		this.doHideAnimation();
	}

	private OnContinue(): void {
		this.onBuy()
		this.doHideAnimation();
	}

	private onBuy(): void {
		let ct = Model_Bag.getItemCount(Model_SHXunBao.XB_ITEM)
		if (ct <= 0) {
			ViewCommonWarn.text("道具不足")
			return;
		}
		GGlobal.modelSHXunbao.CG_XUNBAO_ROLL();
	}

	private renderHandler(index: number, obj: fairygui.GObject) {
		let grid = obj as ViewGridRender;
		grid.vo = this.rewardArr[index];
	}

	private rewardArr:IGridImpl[];
	private times = 10;

	private timeHandler() {
		this.times--;
		this.surebt.text = "确定(" + this.times + ")";
		if (this.times <= 0) {
			this.doHideAnimation();
		}
	}
}