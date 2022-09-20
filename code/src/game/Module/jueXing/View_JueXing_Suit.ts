class View_JueXing_Suit extends UIModalPanel {
	public c1: fairygui.Controller;
	public upgradeBt: Button1;
	public suitLb: fairygui.GTextField;
	public powerLb: fairygui.GTextField;
	public nextLb: fairygui.GTextField;
	public nextAttLb: fairygui.GTextField;
	public curLb: fairygui.GTextField;
	public curAttLb: fairygui.GTextField;
	public boxMax: fairygui.GGroup;

	public static URL: string = "ui://tbqdf7fdnlhgd";

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("jueXing", "View_JueXing_Suit").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		s.curAttLb.leading = 6;
		s.nextAttLb.leading = 6;
		super.childrenCreated();
		s.upgradeBt.addClickListener(s.upHandle, this);
	}

	private upHandle(): void {
		let s = this;
		var nextCfg = Config.jxzl_271[s.vo.quality * 100 + s.vo.suitLv + 1];
		if (nextCfg) {
			let index: number = 0;
			if (s.vo.skilllv0 % 1000 >= nextCfg.lv) {
				index++;
			}
			if (s.vo.skilllv1 % 1000 >= nextCfg.lv) {
				index++;
			}
			if (s.vo.skilllv2 % 1000 >= nextCfg.lv) {
				index++;
			}
			if (index >= 3) {
				GGlobal.modeljx.CG_UPGRADE_JUEXING_821(s.vo.type, s.vo.id, 4);
			} else {
				ViewCommonWarn.text("未达到条件，不能进阶");
			}
		} else {
			ViewCommonWarn.text("已满级");
		}
	}

	private vo: Vo_JueXing;
	public updateShow(vo: Vo_JueXing): void {
		let s = this;
		s.vo = vo;
		s.boxMax.visible = false;
		s.upgradeBt.visible = true;
		if (vo.suitLv > 0) {
			let cfg = Config.jxzl_271[s.vo.quality * 100 + vo.suitLv];
			s.suitLb.text = "觉醒之力" + vo.suitLv + "阶";
			s.powerLb.text = "战力：" + cfg.power;
			s.curLb.setVar("des", "全身觉醒至" + cfg.lv).setVar("state", "[color=#00ff00](已激活)[/color]").flushVars();
			let attArr: Array<any> = JSON.parse(cfg.attr);
			let attStr: string = "";
			for (let i = 0; i < attArr.length; i++) {
				if (i == 0) {
					attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				} else {
					attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				}
			}
			s.curAttLb.text = attStr;
			var nextCfg = Config.jxzl_271[s.vo.quality * 100 + vo.suitLv + 1];
			if (nextCfg) {
				s.c1.selectedIndex = 1;
				let attArr1: Array<any> = JSON.parse(nextCfg.attr);
				let attStr1: string = "";
				for (let i = 0; i < attArr1.length; i++) {
					if (i == 0) {
						attStr1 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
					} else {
						attStr1 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
					}
				}
				let index: number = 0;
				if (vo.skilllv0 % 1000 >= nextCfg.lv) {
					index++;
				}
				if (vo.skilllv1 % 1000 >= nextCfg.lv) {
					index++;
				}
				if (vo.skilllv2 % 1000 >= nextCfg.lv) {
					index++;
				}
				if (index >= 3) {
					s.nextLb.setVar("des", "全身觉醒至" + nextCfg.lv).setVar("state", "[color=#15f234](" + index + "/3)[/color]").flushVars();
					s.upgradeBt.enabled = s.upgradeBt.checkNotice = true;
				} else {
					s.nextLb.setVar("des", "全身觉醒至" + nextCfg.lv).setVar("state", "[color=#ed1414](" + index + "/3)[/color]").flushVars();
					s.upgradeBt.enabled = s.upgradeBt.checkNotice = false;
				}
				s.nextAttLb.text = attStr1;
			} else {
				s.c1.selectedIndex = 2;
				s.upgradeBt.visible = false;
				s.boxMax.visible = true;
			}
		} else {
			s.c1.selectedIndex = 0;
			let cfg = Config.jxzl_271[s.vo.quality * 100 + 1];
			s.suitLb.text = "觉醒之力1阶";
			s.powerLb.text = "战力：0";
			let index: number = 0;
			if (vo.skilllv0 % 1000 >= cfg.lv) {
				index++;
			}
			if (vo.skilllv1 % 1000 >= cfg.lv) {
				index++;
			}
			if (vo.skilllv2 % 1000 >= cfg.lv) {
				index++;
			}

			if (index >= 3) {
				s.nextLb.setVar("des", "全身觉醒至" + cfg.lv).setVar("state", "[color=#15f234](" + index + "/3)[/color]").flushVars();
				s.upgradeBt.enabled = s.upgradeBt.checkNotice = true;
			} else {
				s.nextLb.setVar("des", "全身觉醒至" + cfg.lv).setVar("state", "[color=#ed1414](" + index + "/3)[/color]").flushVars();
				s.upgradeBt.enabled = s.upgradeBt.checkNotice = false;
			}
			let attArr: Array<any> = JSON.parse(cfg.attr);
			let attStr: string = "";
			for (let i = 0; i < attArr.length; i++) {
				if (i == 0) {
					attStr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				} else {
					attStr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1]);
				}
			}
			s.nextAttLb.text = attStr;
		}
	}

	protected onShown(): void {
		let s = this;
		GGlobal.control.listen(Enum_MsgType.JUEXING_SUIT_UPDATE, s.updateShow, this);
		s.updateShow(s._args);
	}

	protected onHide(): void {
		let s = this;
		GGlobal.layerMgr.close(UIConst.JUEXING_SUIT);
		GGlobal.control.remove(Enum_MsgType.JUEXING_SUIT_UPDATE, s.updateShow, this);
	}
}