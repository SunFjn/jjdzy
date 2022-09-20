/**
 * 桃园结义开启BOSS提示界面
 */
class TYJY_BossTips extends UIModalPanel{
	public lowBtn: Button0;
	public highBtn: Button1;
	public vres: ViewResource;
	private _cost:number = 0;

	public static URL: string = "ui://m2fm2aiyozk41e";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("taoYuanJieYi", "TYJY_BossTips").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);

		self.vres.setType(1);
		super.childrenCreated();
	}

	protected onShown(): void {
		let self = this;
		self.lowBtn.addClickListener(self.onLow, self);
		self.highBtn.addClickListener(self.onHigh, self);

		self.vres.icon = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);
		let cfg:Ityjyboss_251 = Config.tyjyboss_251[343002];
		self._cost = Number(ConfigHelp.SplitStr(cfg.consume)[0][2]);
		self.vres.text = "" + self._cost;
		if (Model_player.voMine.yuanbao >= self._cost) {
			self.vres.color = Color.GREENINT;
		} else {
			self.vres.color = Color.REDINT;
		}
	}

	protected onHide(): void {
		let self = this;
		self.lowBtn.removeClickListener(self.onLow, self);
		self.highBtn.removeClickListener(self.onHigh, self);
	}

	/**
	 * 开启低级
	 */
	private onLow(e: egret.TouchEvent): void {
		GGlobal.model_TYJY.CG_OPEN_BOSS(343001);
		GGlobal.layerMgr.close(UIConst.TYJY_APPLY);
	}

	/**
	 * 开启高级
	 */
	private onHigh(e: egret.TouchEvent): void {
		if (Model_player.voMine.yuanbao < this._cost) {
			ViewCommonWarn.text("元宝不足");
			return;
		}
		GGlobal.model_TYJY.CG_OPEN_BOSS(343002);
		GGlobal.layerMgr.close(UIConst.TYJY_APPLY);
	}
}