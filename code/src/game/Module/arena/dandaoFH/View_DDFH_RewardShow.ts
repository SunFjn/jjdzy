class View_DDFH_RewardShow extends UIModalPanel {

	public list: fairygui.GList;
	public dataLb: fairygui.GRichTextField;
	public promptLb: fairygui.GRichTextField;
	public drawBt: Button0;
	public drawImg: fairygui.GImage;

	public static URL: string = "ui://me1skowljs6lk";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("Arena", "View_DDFH_RewardShow").asCom;
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
		let num = this._args.num;
		if (Model_DDFH.winNum >= num && Model_DDFH.winRewardArr.indexOf(num) == -1) {
			GGlobal.modelddfh.CG_DANDAOFH_DRAWWINREWARD(num);
		} else {
			if (Model_DDFH.winRewardArr.indexOf(num) != -1) {
				ViewCommonWarn.text("奖励已领取");
			} else {
				ViewCommonWarn.text("未达到领取条件");
			}
		}
		this.doHideAnimation();
	}

	private renderHandler(index: number, obj: fairygui.GObject): void {
		let grid: ViewGridRender = obj as ViewGridRender;
		grid.vo = this.itemArr[index];
	}

	private itemArr = [];
	private updateShow(): void {
		let a = this;
		if (!a._args) return;
		let cfg = a._args;
		if (cfg.panelId == UIConst.DANDAO_FUHUI_RANK) {
			if (cfg.isCross) {
				a.dataLb.text = "跨服排名第" + cfg.num + "可领取";
			} else {
				a.dataLb.text = "本服排名第" + cfg.num + "可领取";
			}
			a.promptLb.visible = true;
			a.drawBt.visible = false;
			a.drawImg.visible = false;
		} else {
			a.promptLb.visible = false;
			a.drawBt.visible = true;
			if (Model_DDFH.winNum >= cfg.num) {
				a.dataLb.text = "今日胜利" + cfg.num + "场可领取" + HtmlUtil.fontNoSize("(" + Model_DDFH.winNum + "/" + cfg.num + ")", Color.getColorStr(2));
				a.drawBt.checkNotice = Model_DDFH.winRewardArr.indexOf(cfg.num) == -1;
			} else {
				a.dataLb.text = "今日胜利" + cfg.num + "场可领取" + HtmlUtil.fontNoSize("(" + Model_DDFH.winNum + "/" + cfg.num + ")", Color.getColorStr(6));
				a.drawBt.checkNotice = false;
			}
			if (Model_DDFH.winRewardArr.indexOf(cfg.num) != -1) {
				a.drawBt.visible = false;
				a.drawImg.visible = true;
			} else {
				a.drawBt.visible = true;
				a.drawImg.visible = false;
			}
		}
		a.itemArr = ConfigHelp.makeItemListArr(cfg.reward);
		a.list.numItems = a.itemArr.length;
	}

	protected onShown(): void {
		this.updateShow();
		GGlobal.control.listen(Enum_MsgType.DANDAO_FUHUI, this.updateShow, this);
	}

	protected onHide(): void {
		let a = this;
		GGlobal.layerMgr.close(UIConst.DANDAO_FUHUI_REWARDSHOW);
		GGlobal.control.remove(Enum_MsgType.DANDAO_FUHUI, a.updateShow, a);
		a.list.numItems = 0;
	}
}