/**新手加载页*/class ViewNebieLoading extends UIPanelBase {

	public n0: fairygui.GRichTextField;
	public n1: fairygui.GLoader;
	public n3: fairygui.GImage;


	public static URL: string = "ui://hpazy1telkx8z";
	public static createInstance(): ViewNebieLoading {
		return <ViewNebieLoading><any>(fairygui.UIPackage.createObject("createRole", "ViewNebieLoading"));
	}

	public constructor() {
		super();
		this.isShowOpenAnimation = false;
		this.setSkin("createRole", "createRole_atlas0", "ViewNebieLoading");
	}
	protected initView(): void {
		super.initView();

		let sc = LayerManager.getFullScreenSc();
		this.setScale(sc, sc);
		let xx = (App.stage.stageWidth - this.width * sc) >> 1;
		let yy = (App.stage.stageHeight - this.height * sc) >> 1;
		this.setXY(xx, yy);//不考虑横屏
	}

	private drawBlackBg() {
		var shap: fairygui.GGraph = new fairygui.GGraph();
		shap.setSize(App.stage.stageWidth, App.stage.stageHeight);
		shap.drawRect(0, 0, 0, 0x0, 1);
		this._bgGraph = shap;
		GGlobal.main.addChildAt(shap.displayObject, 2);
	}

	private _bgGraph;
	protected onShown(): void {
		this.start = egret.getTimer();
		this.drawBlackBg();
		IconUtil.setImg(this.n1, Enum_Path.BACK_URL + "jjjad.jpg");
		this.addEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
	}

	protected onHide(): void {
		if (this._bgGraph) GGlobal.main.removeChild(this._bgGraph.displayObject);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onframe, this);
		RESManager.destoryRes("createRole_atlas0");
		this.clearTextureAndUIPackage();
		IconUtil.setImg(this.n1, null);
	}

	private start = 0;
	protected onframe(): void {
		let now = egret.getTimer();
		let len = (now - this.start) / 100 >> 0;
		let str = "汉建安十六年冬，孙权趁刘备入蜀之际意图挟持阿斗换回荆州...";
		if (str.length >= len) {
			this.n0.text = str.slice(0, len);
		}
	}
}