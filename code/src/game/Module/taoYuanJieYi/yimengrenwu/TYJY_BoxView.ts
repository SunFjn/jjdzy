/**
 * 桃园结义宝箱奖励
 */
class TYJY_BoxView extends UIModalPanel{
	public frame: fairygui.GComponent;
	public getBtn: fairygui.GButton;
	public getImg: fairygui.GImage;
	public tips: fairygui.GRichTextField;

	public static URL: string = "ui://m2fm2aiygt1t1d";

	public static createInstance(): TYJY_BoxView {
		return <TYJY_BoxView><any>(fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_BoxView"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_BoxView").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	private getAwards() {
		GGlobal.model_TYJY.CG_GET_REWARD(this._cfg.id, this._idx + 1);
		this.doHideAnimation();
	}

	private updateView() {
		this._st = 0;
		this._st = GGlobal.model_TYJY.taskObj[this._cfg.id].arr1[this._idx];
		this.getBtn.visible = this._st == 1;
		this.getImg.visible = this._st == 2;
		this.tips.visible = this._st == 0;
	}

	private arr;
	private _idx;
	private _st;
	private _cfg:Ityjyrw_251;
	protected onShown(): void {
		this._cfg = this._args.cfg;
		let awards;
		this._idx = this._args.idx;
		if(this._idx == 0)
		{
			awards = this._cfg.reward1;
		}else if(this._idx == 1)
		{
			awards = this._cfg.reward2;
		}else{
			awards = this._cfg.reward3;
		}

		awards = JSON.parse(awards);
		if (this.arr) ConfigHelp.cleanGridview(this.arr);
		awards = ConfigHelp.makeItemListArr(awards);
		this.arr = ConfigHelp.addGridview(awards, this, 100, 100);
		ConfigHelp.centerGrid(this.arr, 70, 110, 3, 130);
		this.getBtn.addClickListener(this.getAwards, this);

		GGlobal.control.listen(UIConst.TYJY_YMRW, this.updateView, this);

		this.updateView();
	}

	protected onHide(): void {
		if (this.arr) ConfigHelp.cleanGridview(this.arr);
		GGlobal.layerMgr.close(UIConst.TYJY_TASKBOX);
		this.getBtn.removeClickListener(this.getAwards, this);
		GGlobal.control.remove(UIConst.TYJY_YMRW, this.updateView, this);
	}
}