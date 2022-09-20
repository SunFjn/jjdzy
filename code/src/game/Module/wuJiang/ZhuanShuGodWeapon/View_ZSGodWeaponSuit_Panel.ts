class View_ZSGodWeaponSuit_Panel extends UIModalPanel {

	public frame: fairygui.GLabel;
	public powerLb: fairygui.GLabel;
	public levelLb: fairygui.GRichTextField;
	public wujiangGrid: VWuJiangGrid;
	public weaponGrid: VZSGodWeaponGrid;
	public godBt: Button1;
	public nextLb: fairygui.GRichTextField;
	public nextAttLb: fairygui.GRichTextField;
	public nextGroup: fairygui.GGroup;
	public curLb: fairygui.GRichTextField;
	public curAttLb: fairygui.GRichTextField;
	public curGroup: fairygui.GGroup;

	public static URL: string = "ui://zyx92gzwhi6342";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("wuJiang", "View_ZSGodWeaponSuit_Panel").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);
		super.childrenCreated();
	}

	private updateShow() {
		let self = this;
		let vo = self.vo;
		self.powerLb.text = vo.zhuanShuCfg.zhanli + "";
		self.wujiangGrid.setSuitVo(vo.wujiangVo);
		self.weaponGrid.setSuitVo(vo);
		self.levelLb.text = "专属等级：" + vo.zsLv;
		let tiaoJianArr = JSON.parse(vo.zhuanShuCfg.dangqian);
		let index = 0;
		self.godBt.checkNotice = false;
		if (vo.zhuanShuCfg.next == 0) {
			self.curLb.text = ConfigHelp.reTxt("当前阶段：武将·{0}和神兵·{1}达到{2}星({3})", vo.wujiangVo.name, vo.cfg.name, tiaoJianArr[0][1],
				HtmlUtil.fontNoSize("已满级", Color.getColorStr(2)));
			let skillArr = JSON.parse(vo.zhuanShuCfg.jineng);
			self.curAttLb.text = ConfigHelp.reTxt("{0}提升[color=#66CCFF]{1}%[/color]伤害", Config.skill_210[skillArr[0][0]].n, skillArr[0][1] / 1000) + "\n" +
				ConfigHelp.attrString(JSON.parse(vo.zhuanShuCfg.shuxing), "+");
			self.curAttLb.color = Color.getColorInt(2);
			self.nextGroup.visible = false;
		} else if (vo.zhuanShuCfg.zhanli == 0) {
			let nextcfg = Config.sbzs_750[vo.zhuanShuCfg.next];
			let tiaoJianArr1 = JSON.parse(nextcfg.dangqian);
			if (Model_WuJiang.getWuJiangStarByJob(vo.job) >= tiaoJianArr1[0][1]) index++;
			if (vo.starLv >= tiaoJianArr1[1][1]) index++;
			let color = index >= 2 ? 2 : 6;
			self.curLb.text = ConfigHelp.reTxt("下一阶段：武将·{0}和神兵·{1}达到{2}星({3})", vo.wujiangVo.name, vo.cfg.name, tiaoJianArr1[0][1],
				HtmlUtil.fontNoSize(index + "/2", Color.getColorStr(color)));
			let skillArr = JSON.parse(nextcfg.jineng);
			self.curAttLb.text = ConfigHelp.reTxt("{0}提升[color=#66CCFF]{1}%[/color]伤害", Config.skill_210[skillArr[0][0]].n, skillArr[0][1] / 1000) + "\n" +
				ConfigHelp.attrString(JSON.parse(nextcfg.shuxing), "+");
			self.curAttLb.color = 0x999999;
			self.nextGroup.visible = false;
			self.godBt.enabled = self.godBt.checkNotice = index >= 2;
			self.godBt.text = "激活";
		} else {
			let nextcfg = Config.sbzs_750[vo.zhuanShuCfg.next];
			let tiaoJianArr1 = JSON.parse(nextcfg.dangqian);
			if (Model_WuJiang.getWuJiangStarByJob(vo.job) >= tiaoJianArr1[0][1]) index++;
			if (vo.starLv >= tiaoJianArr1[1][1]) index++;
			let color = index >= 2 ? 2 : 6;
			self.curLb.text = ConfigHelp.reTxt("当前阶段：武将·{0}和神兵·{1}达到{2}星({3})", vo.wujiangVo.name, vo.cfg.name, tiaoJianArr[0][1],
				HtmlUtil.fontNoSize("2/2", Color.getColorStr(2)));
			let skillArr = JSON.parse(vo.zhuanShuCfg.jineng);
			self.curAttLb.text = ConfigHelp.reTxt("{0}提升[color=#66CCFF]{1}%[/color]伤害", Config.skill_210[skillArr[0][0]].n, skillArr[0][1] / 1000) + "\n" +
				ConfigHelp.attrString(JSON.parse(vo.zhuanShuCfg.shuxing), "+");
			self.curAttLb.color = Color.getColorInt(2);
			self.nextLb.text = ConfigHelp.reTxt("下一阶段：武将·{0}和神兵·{1}达到{2}星({3})", vo.wujiangVo.name, vo.cfg.name, tiaoJianArr1[0][1],
				HtmlUtil.fontNoSize(index + "/2", Color.getColorStr(color)));
			let skillArr1 = JSON.parse(nextcfg.jineng);
			self.nextAttLb.text = ConfigHelp.reTxt("{0}提升[color=#66CCFF]{1}%[/color]伤害", Config.skill_210[skillArr1[0][0]].n, skillArr1[0][1] / 1000) + "\n" +
				ConfigHelp.attrString(JSON.parse(nextcfg.shuxing), "+");
			self.nextGroup.visible = true;
			self.godBt.enabled = self.godBt.checkNotice = index >= 2;
			self.godBt.text = "升级";
		}
	}

	private OnUp() {
		let self = this;
		if (self.godBt.checkNotice) {
			GGlobal.modelGodWeapon.CG_GodWeapon_actzhuanshuLv_7857(self.vo.job);
		} else {
			ViewCommonWarn.text("专属神兵已满级")
		}
	}

	private vo: Vo_ZSGodWeapon;
	protected onShown(): void {
		let self = this;
		self.vo = self._args;
		self.updateShow();
		self.godBt.addClickListener(self.OnUp, self);
		GGlobal.reddot.listen(UIConst.ZS_GODWEAPON, self.updateShow, self);
	}

	protected onHide(): void {
		let self = this;
		GGlobal.layerMgr.close(UIConst.ZS_GODWEAPON_SUIT);
		self.godBt.removeClickListener(self.OnUp, self);
		GGlobal.reddot.remove(UIConst.ZS_GODWEAPON, self.updateShow, self);
	}
}