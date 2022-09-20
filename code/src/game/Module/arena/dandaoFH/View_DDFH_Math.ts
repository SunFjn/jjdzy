class View_DDFH_Math extends UIModalPanel {

	public list: fairygui.GList;
	public qzImg: fairygui.GLoader;
	public static URL: string = "ui://me1skowlr4ogg";

	public constructor() {
		super();
		fairygui.UIObjectFactory.setPackageItemExtension(DDFH_MathRender.URL, DDFH_MathRender);
		this.isClosePanel = false;
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let a = this;
		a.view = fairygui.UIPackage.createObject("Arena", "View_DDFH_Math").asCom;
		a.contentPane = a.view;
		a.qzImg = <fairygui.GLoader><any>(a.view.getChild("qzImg"));
		a.list = <fairygui.GList><any>(a.view.getChild("list"));
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandler;
		a.list.setVirtualAndLoop();
		super.childrenCreated();
	}

	private renderHandler(index: number, obj: fairygui.GObject): void {
		let a = this;
		let render = obj as DDFH_MathRender;
		render.show(a.listArr[index][0], a.listArr[index][1], a.listArr[index][2]);
	}

	private index = 1;
	private listArr = [];
	private isStart: boolean = false;
	public updateShow(): void {
		let a = this;
		a.listArr = [[1001, 2001, ""], [1002, 2001, ""], [1003, 2001, ""]];
		let len = a.listArr.length;
		a.list.numItems = len;
		a.isStart = false;
		a.index = 0;
		a.list.scrollPane.scrollDown(1, true);
	}

	private scrollComp() {
		let a = this;
		a.index++;
		if (a.index >= 3 && Model_DDFH.enemyArr.length > 0 && !a.isStart) {
			a.starTime();
		} else {
			if (a.list.getFirstChildInView() >= 3) {
				a.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL_END, this.scrollComp, this);
				let times = setTimeout(() => {
					a.doHideAnimation();
					GGlobal.mapscene.enterScene(SceneCtrl.DANDAO_FUHUI);
					clearTimeout(times);
				}, 1000);
				return;
			}
		}
		a.list.scrollPane.scrollDown(1, true);
	}

	public starTime(): void {
		let a = this;
		if (Model_DDFH.enemyArr.length <= 0 || a.index < 3) return;
		a.isStart = true;
		a.listArr = a.listArr.concat(Model_DDFH.enemyArr);
		let len = a.listArr.length;
		a.list.numItems = len;
	}

	private times = 11;
	private timeHandler() {
		let self = this;
		self.times--;
		if (self.times <= 0 && Model_DDFH.enemyArr.length <= 0) {
			ViewCommonWarn.text("匹配不成功");
			self.doHideAnimation();
		}
	}

	protected onShown(): void {
		let a = this;
		a.updateShow();
		a.list.scrollPane.addEventListener(fairygui.ScrollPane.SCROLL_END, this.scrollComp, this);
		IconUtil.setImg(a.qzImg, Enum_Path.IMAGE_MODULES_URL + "area/qz.png");
		a.times = 11;
		Timer.instance.listen(a.timeHandler, a, 1000);
	}

	protected onHide(): void {
		let a = this;
		Model_DDFH.enemyArr = [];
		Timer.instance.remove(a.timeHandler, a);
		GGlobal.layerMgr.close(UIConst.DANDAO_FUHUI_MATH);
		a.list.scrollPane.removeEventListener(fairygui.ScrollPane.SCROLL_END, this.scrollComp, this);
		IconUtil.setImg(a.qzImg, null);
	}
}