class View_BoxReward_Show extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public lb: fairygui.GRichTextField;

	public static URL: string = "ui://jvxpx9em81i09f";

	private _defaultTitle = "";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("common", "View_BoxReward_Show").asCom;
		a.contentPane = a.view;
		a.frame = <fairygui.GLabel><any>(a.view.getChild("frame"));
		a.list = <fairygui.GList><any>(a.view.getChild("list"));
		a.list.callbackThisObj = this;
		a.list.itemRenderer = a.renderHandler;
		a.lb = <fairygui.GRichTextField><any>(a.view.getChild("lb"));
		a.isShowOpenAnimation = false;

		//缓存默认标题
		a._defaultTitle = a.frame.title;

		super.childrenCreated();
	}

	private renderHandler(index: number, obj: fairygui.GObject): void {
		let grid: ViewGrid = obj as ViewGrid;
		grid.isShowEff = true;
		grid.vo = this.itemArr[index];
		grid.tipEnabled = true;
	}

	public onDraw: Handler;
	private itemArr: IGridImpl[];
	private updateShow(): void {
		let a = this;
		if (!a._args) return;
		let arg: { reward: IGridImpl[], text: string, title: string } = a._args;
		a.itemArr = arg.reward;
		if (arg.text) {
			a.lb.visible = true;
			a.lb.text = arg.text;
		} else {
			a.lb.visible = false;
		}

		if (arg.title)
			a.frame.title = arg.title;
		else
			a.frame.title = a._defaultTitle;

		a.list.numItems = a.itemArr.length;
	}

	protected onShown(): void {
		this.updateShow();
	}

	protected onHide(): void {
		this.list.numItems = 0;
		GGlobal.layerMgr.close(UIConst.BOX_REWARD_SHOW);
	}

	public static show(reward: IGridImpl[], text?: string, pTitle?: string) {
		var arg = { reward: reward, text: text, title: pTitle };
		GGlobal.layerMgr.open(UIConst.BOX_REWARD_SHOW, arg);
	}
}