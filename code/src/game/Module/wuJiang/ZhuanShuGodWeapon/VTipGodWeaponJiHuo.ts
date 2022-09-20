class VTipGodWeaponJiHuo extends UIModalPanel {
	public bwIcon: fairygui.GLoader;
	public nameLb: fairygui.GLabel;
	public btnHand: Button0;
	public jihuoLb: fairygui.GRichTextField;
	public constructor() {
		super();
		this.childrenCreated();
	}
	protected childrenCreated() {
		const self = this;
		self.view = fairygui.UIPackage.createObject("wuJiang", "VTipGodWeaponJiHuo").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		self.btnHand.addClickListener(self.closeEventHandler, self);
		super.childrenCreated();
	}

	protected closeEventHandler() {
		let layerMgr = GGlobal.layerMgr
		if (layerMgr.isOpenView(UIConst.ZS_GODWEAPON)) {
			let panel = layerMgr.getView(UIConst.ZS_GODWEAPON) as ViewWuJiangPanel;
			panel.openPanel(10);
		} else {
			GGlobal.layerMgr.open(UIConst.ZS_GODWEAPON);
		}
		super.closeEventHandler(null);
	}

	private godWeaponEff: Part;
	private showDetail(vo: Vo_ZSGodWeapon) {
		const self = this;
		if (self.godWeaponEff) {
			EffectMgr.instance.removeEff(self.godWeaponEff);
			self.godWeaponEff = null;
		}
		if (vo.bodyIDArr[vo.bodyIDArr.length - 1] == vo.cfg.bianhao) {
			self.nameLb.text = vo.cfg.name;
			self.btnHand.text = "前往使用";
			self.jihuoLb.text = ConfigHelp.reTxt("激活神兵·{0}", vo.cfg.name);
			self.godWeaponEff = EffectMgr.addEff("uieff/" + vo.cfg.picture, self.bwIcon.displayObject as fairygui.UIContainer, self.bwIcon.width / 2, self.bwIcon.height / 2, 1000);
		} else {
			let cfg = Config.sbpf_750[vo.bodyIDArr[vo.bodyIDArr.length - 1]];
			self.nameLb.text = cfg.mz;
			self.btnHand.text = "前往穿戴";
			self.jihuoLb.text = ConfigHelp.reTxt("激活神兵·{0}的新皮肤", vo.cfg.name);
			self.godWeaponEff = EffectMgr.addEff("uieff/" + cfg.zs, self.bwIcon.displayObject as fairygui.UIContainer, self.bwIcon.width / 2, self.bwIcon.height / 2, 1000);
		}
	}

	protected onShown(): void {
		this.showDetail(this._args);
	}

	protected onHide() {
		let self = this;
		GGlobal.layerMgr.close(UIConst.ZS_GODWEAPON_BODY_SHOW);
		if (self.godWeaponEff) {
			EffectMgr.instance.removeEff(self.godWeaponEff);
			self.godWeaponEff = null;
		}
	}
}