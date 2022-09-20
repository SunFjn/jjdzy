class View_ActCom_CzZPShow extends UIModalPanel {

	public list: fairygui.GList;
	public surebt: Button0;
	public continuebt: Button1;
	public lab: fairygui.GRichTextField;
	public img: fairygui.GLoader;

	public constructor() {
		super();
		this.loadRes("bossTiShi", "bossTiShi_atlas0");
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

	protected onShown() {
		let cfg = Config.czzpreward_281[this._args];
		let v = { item: ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.show))[0], isBig: cfg.big };
		this.rewardArr = [v];

		ViewCommonPrompt.textItemList([v.item]);

		this.list.numItems = this.rewardArr.length;
		this.times = 11;
		Timer.instance.listen(this.timeHandler, this, 1000);
		this.continuebt.text = "再来一次"
		let model = GGlobal.model_actCom;
		let ct = model.zpHaveCt
		if (ct >= 1) {
			this.lab.color = Color.GREENINT;
		} else {
			this.lab.color = Color.REDINT;
		}
		this.lab.text = ct + "次";
		this.img.visible = false;
	}

	protected onHide(): void {
		this.list.numItems = 0;
		Timer.instance.remove(this.timeHandler, this);
	}

	private OnSure() {
		this.doHideAnimation();
	}

	private OnContinue(): void {
		this.doHideAnimation();
		GGlobal.model_actCom.CG_CHONG_ZHI_ZP_TURN();
	}

	public bigAward: any
	private renderHandler(index: number, obj: fairygui.GObject) {
		let grid = obj as ViewGridRender;
		let v = this.rewardArr[index];
		v.item.extra = v.isBig ? 5 : 0
		grid.vo = v.item;
	}

	private rewardArr: { item: IGridImpl, isBig: number }[];
	private times = 10;

	private timeHandler() {
		this.times--;
		this.surebt.text = "确定(" + this.times + ")";
		if (this.times <= 0) {
			this.doHideAnimation();
		}
	}
}