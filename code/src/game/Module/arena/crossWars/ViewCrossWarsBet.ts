/**枭雄争霸 竞猜*/
class ViewCrossWarsBet extends UIModalPanel {

	public c1: fairygui.Controller;
	public frame: fairygui.GComponent;
	public lbTitle: fairygui.GRichTextField;
	public lbTips: fairygui.GRichTextField;
	public ply0: VCrossWarsBet;
	public ply1: VCrossWarsBet;
	public lbCost: fairygui.GRichTextField;
	public btnBet: fairygui.GButton;
	public lbTips1: fairygui.GRichTextField;
	public lbTips2: fairygui.GRichTextField;
	public lbTipCount1: fairygui.GRichTextField;
	public lbTipCount2: fairygui.GRichTextField;
	public gTips: fairygui.GGroup;

	public static URL: string = "ui://yqpfulef6wztn";

	private _vo: Vo_CrossWarsPly

	public static createInstance(): ViewCrossWarsBet {
		return <ViewCrossWarsBet><any>(fairygui.UIPackage.createObject("Arena", "ViewCrossWarsBet"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("Arena");
		let self = this;
		self.view = fairygui.UIPackage.createObject("Arena", "ViewCrossWarsBet").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}
	public resetPosition(): void {
		let self = this;
		self.setXY((fairygui.GRoot.inst.width - self.width) >> 1, (fairygui.GRoot.inst.height - self.height) >> 1);
	}

	protected onShown(): void {
		super.onShown()
		let self = this;
		self._vo = self._args
		self.addListen();
		self.update();
		if (self._vo.power1 >= self._vo.power2) {
			self.c1.selectedIndex = 0;
		} else {
			self.c1.selectedIndex = 1;
		}
		if (self._vo.power1 == 0 || self._vo.power2 == 0) {
			self.ply0.touchable = false;
			self.ply1.touchable = false;
			self.ply0.visible = self._vo.power1 > 0;
			self.ply1.visible = self._vo.power2 > 0;
		} else {
			self.ply0.touchable = true;
			self.ply1.touchable = true;
			self.ply0.visible = self.ply1.visible = true;
		}
	}

	protected onHide(): void {
		this.removeListen();
	}

	private addListen(): void {
		let self = this;
		self.btnBet.addClickListener(self.onBet, self);
		GGlobal.control.listen(Enum_MsgType.CROSSWARS_BUY_WIN, self.update, self)
	}

	private removeListen(): void {
		let self = this;
		self.btnBet.removeClickListener(self.onBet, self);
		GGlobal.control.remove(Enum_MsgType.CROSSWARS_BUY_WIN, self.update, self)
		GGlobal.layerMgr.close(UIConst.CROSS_WARS_BET);
	}
	private _cost: number;
	private update(): void {
		let self = this;
		self.ply0.setVo(self._vo, 0)
		self.ply1.setVo(self._vo, 1)
		var cost = ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2401))[0][2]
		self._cost = Number(cost);
		self.lbCost.text = "" + cost
		if (self._vo.buywin > 0) {
			self.btnBet.text = "已押注"
		} else {
			self.btnBet.text = "押注"
		}

		self.lbTipCount1.text = "" + (2 * Number(cost));
		self.lbTipCount2.text = "" + (0.5 * Number(cost));
	}

	public onBet(): void {
		let self = this;
		if (Model_player.voMine.yuanbao < self._cost) {
			ModelChongZhi.guideToRecharge();
			return;
		}
		if (self._vo == null) {
			return;
		}
		if (self._vo.buywin > 0) {
			ViewCommonWarn.text("已押注");
			return;
		}
		GGlobal.modelCrossWars.CG_BUY_WIN(self._vo.turn, self._vo.index, self.c1.selectedIndex + 1);
	}

}