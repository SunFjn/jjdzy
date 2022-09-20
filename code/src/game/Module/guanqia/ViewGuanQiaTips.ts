/**
 * 关卡收益提示面板
*/
class ViewGuanQiaTips extends UIModalPanel{
	public closeBt: fairygui.GButton;
	public curTongBiTxt: fairygui.GRichTextField;
	public curExpTxt: fairygui.GRichTextField;
	public nextTongBiTxt: fairygui.GRichTextField;
	public nextExpTxt: fairygui.GRichTextField;
	private _timer: number = 0;

	public constructor() {
		super();
		this.loadRes("guanqia", "guanqia_atlas0");
	}

	protected childrenCreated(): void
	{
		GGlobal.createPack("guanqia");
		let self = this;
		// self.isShowMask = false;
		self.view = fairygui.UIPackage.createObject("guanqia", "ViewGuanQiaTips").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
		self.closeBt.addClickListener(self.closeEventHandler, self);
	}

	protected onShown(): void
	{
		let self = this;
		let m = GGlobal.modelGuanQia;
		self._timer = 0
		Timer.instance.listen(this.upTime, this, 1000);
		let vomine = Model_player.voMine;
		let expValue = ModelGuanQia.getExpGP(m.curGuanQiaLv - 1);
		expValue = Math.ceil(Number(expValue) * (100 + vomine.expAdd) / 100);
		self.curExpTxt.text = ConfigHelp.numToStr(expValue) + "/小时";

		expValue = ModelGuanQia.getExpGP(m.curGuanQiaLv);
		expValue = Math.ceil(Number(expValue) * (100 + vomine.expAdd) / 100);
		self.nextExpTxt.text = ConfigHelp.numToStr(expValue) + "/小时";

		self.curTongBiTxt.text = ConfigHelp.numToStr(ModelGuanQia.getTBGP(m.curGuanQiaLv - 1)) + "/小时";
		self.nextTongBiTxt.text = ConfigHelp.numToStr(ModelGuanQia.getTBGP(m.curGuanQiaLv)) + "/小时";
	}

	/**打开界面 */
	public static show() 
	{
		let m = GGlobal.modelGuanQia;
		let lb = Config.BOSS_205[m.curGuanQiaLv];
		if(!lb)   return;

		if (GGlobal.layerMgr.isOpenView(UIConst.GQBOSSTIPS)) {
			let panel = GGlobal.layerMgr.getView(UIConst.GQBOSSTIPS) as ViewGuanQiaTips;
			panel.onShown();
		} else {
			GGlobal.layerMgr.open(UIConst.GQBOSSTIPS);
		}
	}

	protected onHide(): void
	{
		GGlobal.layerMgr.close(UIConst.GQBOSSTIPS);
		Timer.instance.remove(this.upTime, this);
		this.closeBt.removeClickListener(this.closeEventHandler, this);
	}

	private upTime() {
		this._timer++;
		if (this._timer > 2) {
			GGlobal.layerMgr.close2(UIConst.GQBOSSTIPS)
		}
	}

}