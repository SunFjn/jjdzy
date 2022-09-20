class View_JiangHun_UpgradePanel extends UIModalPanel {

	public frame: fairygui.GComponent;
	public nameLb: fairygui.GRichTextField;
	public levelLb: fairygui.GRichTextField;
	public powerLb: fairygui.GTextField;
	public curAtt: fairygui.GRichTextField;
	public nextAtt: fairygui.GRichTextField;
	public expbar: fairygui.GProgressBar;
	public moneyLb: fairygui.GRichTextField;
	public upBt: Button0;
	public grid: JiangHunGrid;

	public static URL: string = "ui://3tzqotadk8ozp";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("role", "View_JiangHun_UpgradePanel").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		super.childrenCreated();
		s.upBt.addClickListener(s.upHandle, this);
	}

	private upHandle(): void {
		let s = this;
		if (Model_player.voMine.hunhuo > 0) {
			if (s.vo.next > 0) {
				GGlobal.modeljh.CG_JIANGHUN_UP(s.vo.ID);
			} else {
				ViewCommonWarn.text("已满级");
			}
		} else {
			ViewCommonWarn.text("魂火数量不足");
		}
	}

	private vo: Vo_JiangHun;
	public updateShow(): void {
		let s = this;
		s.vo = s._args;
		let vo = s.vo;
		s.nameLb.text = vo.name;
		s.nameLb.color = Color.getColorInt(vo.quality);
		s.levelLb.text = "Lv." + vo.level;

		s.powerLb.text = vo.power + "";
		let attstr0: string = "";
		let attstr1: string = "";
		let nextcfg = Config.genlv_006[vo.next];
		if (nextcfg) {
			s.expbar.max = vo.consumeArr[0][2];
			s.expbar.value = vo.exp;
			s.upBt.enabled = s.upBt.checkNotice = Model_player.voMine.hunhuo >= (vo.consumeArr[0][2] - vo.exp);
		} else {
			s.expbar.max = 1;
			s.expbar.value = 1;
			s.expbar._titleObject.text = "已满级";
			s.upBt.enabled = s.upBt.checkNotice = false;
		}
		s.moneyLb.text = Model_player.voMine.hunhuo + "";

		let len = vo.attArr.length;
		if (len <= 0) {
			let attArr = JSON.parse(nextcfg.attr);
			for (let i = 0; i < attArr.length; i++) {
				if (i == 0) {
					attstr0 += Vo_attr.getShowStr(attArr[i][0], 0);
					attstr1 += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				} else {
					attstr0 += "\n" + Vo_attr.getShowStr(attArr[i][0], 0);
					attstr1 += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				}
			}
		} else {
			if (nextcfg) {
				let attArr = JSON.parse(nextcfg.attr);
				for (let i = 0; i < len; i++) {
					if (i == 0) {
						attstr0 += Vo_attr.getShowStr(attArr[i][0], vo.attArr[i][1]);
						attstr1 += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
					} else {
						attstr0 += "\n" + Vo_attr.getShowStr(attArr[i][0], vo.attArr[i][1]);
						attstr1 += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
					}
				}
			} else {
				for (let i = 0; i < len; i++) {
					if (i == 0) {
						attstr0 += Vo_attr.getShowStr(vo.attArr[i][0], vo.attArr[i][1]);
						attstr1 += Vo_attr.getShowStr(vo.attArr[i][0], vo.attArr[i][1]);
					} else {
						attstr0 += "\n" + Vo_attr.getShowStr(vo.attArr[i][0], vo.attArr[i][1]);
						attstr1 += "\n" + Vo_attr.getShowStr(vo.attArr[i][0], vo.attArr[i][1]);
					}
				}
			}
		}

		s.curAtt.text = attstr0;
		s.nextAtt.text = attstr1;
		s.grid.vo1 = vo;
	}

	protected onShown(): void {
		let s = this;
		s.updateShow();
		GGlobal.reddot.listen(ReddotEvent.CHECK_JIANGHUN, s.updateShow, s);
	}

	protected onHide(): void {
		let s = this;
		s.grid.vo1 = null;
		GGlobal.layerMgr.close(UIConst.JIANGHUN_UP);
		GGlobal.reddot.remove(ReddotEvent.CHECK_JIANGHUN, s.updateShow, s);
	}
}