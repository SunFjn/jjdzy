class View_Reward_Show extends UIModalPanel {

	public list: fairygui.GList;
	public dataLb: fairygui.GRichTextField;
	public promptLb: fairygui.GRichTextField;
	public drawBt: Button0;
	public drawImg: fairygui.GImage;

	public static URL: string = "ui://jvxpx9emr6x487";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("common", "View_Reward_Show").asCom;
		a.contentPane = a.view;
		a.list = <fairygui.GList><any>(a.view.getChild("list"));
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandler;
		a.dataLb = <fairygui.GRichTextField><any>(a.view.getChild("dataLb"));
		a.promptLb = <fairygui.GRichTextField><any>(a.view.getChild("promptLb"));
		a.drawBt = <Button0><any>(a.view.getChild("drawBt"));
		a.drawImg = <fairygui.GImage><any>(a.view.getChild("drawImg"));
		a.isShowOpenAnimation = false;
		super.childrenCreated();
		a.drawBt.addClickListener(a.drawHandler, a);
	}

	private drawHandler(): void {
		if (this.onDraw) {
			this.onDraw.run();
		} else {
			this.doHideAnimation();
		}
	}

	private renderHandler(index: number, obj: fairygui.GObject): void {
		let grid: ViewGridRender = obj as ViewGridRender;
		grid.vo = this.itemArr[index];
	}

	public onDraw: Handler;
	private itemArr: IGridImpl[];
	public updateShow(): void {
		let a = this;
		if (!a._args) return;
		let arg = a._args;
		a.onDraw = arg.onDraw;
		a.itemArr = arg.reward;
		a.dataLb.text = arg.text0;
		a.drawImg.visible = false;
		if (arg.text1) {
			a.promptLb.text = arg.text1;
			a.promptLb.visible = true;
			a.drawBt.visible = false;
		} else {
			a.drawBt.visible = true;
			a.drawBt.checkNotice = false;
			if (arg.state == 1) {
				a.drawBt.checkNotice = true
			} else if (arg.state == 2) {
				a.drawBt.visible = false;
				a.drawImg.visible = true;
			}
			a.promptLb.visible = false
		}
		a.list.numItems = a.itemArr.length;
	}

	protected onShown(): void {
		this.updateShow();
	}

	protected onHide(): void {
		this.list.numItems = 0;
		this.onDraw = null;
		GGlobal.layerMgr.close(UIConst.REWARD_SHOW);
	}

	public static show(reward: IGridImpl[], text0: string, text1: string, onDraw: Handler = null, state?: number) {
		var arg = { reward: reward, text0: text0, text1: text1, onDraw: onDraw, state: state };
		if (GGlobal.layerMgr.isOpenView(UIConst.REWARD_SHOW)) {
			let ui = GGlobal.layerMgr.getView(UIConst.REWARD_SHOW) as View_Reward_Show;
			ui._args = arg;
			ui.updateShow();
		} else {
			GGlobal.layerMgr.open(UIConst.REWARD_SHOW, arg);
		}
	}
}