/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class TipBtn extends fairygui.GComponent {

	public img: fairygui.GLoader;

	public static URL: string = "ui://7gxkx46wjv3k6c";

	public static createInstance(): TipBtn {
		return <TipBtn><any>(fairygui.UIPackage.createObject("MainUI", "TipBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.img = <fairygui.GLoader><any>(this.getChild("img"));
	}

	public clean() {
		let s = this;
		IconUtil.setImg(s.img, null);
		s.removeClickListener(s.onClick, s);
		if (s.iconEff) {
			EffectMgr.instance.removeEff(s.iconEff);
			s.iconEff = null;
		}
	}

	private onClick() {
		let id = this.idx;
		let layr = GGlobal.layerMgr;
		switch (id) {
			case UIConst.WELFARE_NOTICE:
				GGlobal.modelGlobalMsg.CG_NOTICE_173();
				layr.open(UIConst.WELFARE_NOTICE);
				GGlobal.mainUICtr.removeTipBTN(id);
				break;
			case UIConst.BW_XIANSHI:
				if (GGlobal.mapscene.scenetype != SceneCtrl.GUANQIA) return;
				GGlobal.mainUICtr.removeTipBTN(id);
				if (GGlobal.modelbwXianShi.batCount > 0) {
					GGlobal.mapscene.enterScene(SceneCtrl.BW_XIANSHI);
				} else {
					ViewCommonWarn.text("挑战次数已满")
				}
				break;
			case UIConst.CROSS_KING:
				GGlobal.mainUICtr.removeReportBTN(UIConst.CROSS_KING);
				layr.open(UIConst.CROSS_KING);
				GGlobal.modelCrossKing.CG_REPORT_CONTENT();
				break;
			case UIConst.COUNTRY_KINGSHIP:
				let str = "";
				if (Model_Kingship.myguanZhi == 0) {
					str = "无";
				} else {
					str = Model_Kingship.countryText[Model_player.voMine.country - 1][Model_Kingship.myguanZhi - 1 >= 3 ? 3 : Model_Kingship.myguanZhi - 1];
				}
				ViewAlert.show(HtmlUtil.fontNoSize(Model_Kingship.roleName, Color.getColorStr(2)) + "战胜了您\n官职下降为" + HtmlUtil.fontNoSize(str, Color.getColorStr(2)),
					Handler.create(this, function (): void {
						GGlobal.layerMgr.open(UIConst.COUNTRY_KINGSHIP);
					}));
				GGlobal.mainUICtr.removeReportBTN(id);
				break;
			case UIConst.REWARD_BACK:
				GGlobal.mainUICtr.removeTipBTN(id);
				layr.open(UIConst.WELFARE, 3);
				break;
			case UIConst.CROSS_MINERAL:
				layr.open(UIConst.CROSS_MINERAL);
				GGlobal.mainUICtr.removeReportBTN(id);
				break;
			case UIConst.ZSSF:
				GGlobal.mainUICtr.removeReportBTN(UIConst.ZSSF);
				layr.open(UIConst.ZSSF);
				break;
			case UIConst.ACTCOM_TJHB:
				GGlobal.mainUICtr.removeReportBTN(UIConst.ACTCOM_TJHB);
				let t_actVo: Vo_Activity = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_TJHB);
				if (t_actVo) {
					layr.open(t_actVo.groupId, UIConst.ACTCOM_TJHB);
				}
				break;
			case UIConst.HONGBAO:
				GGlobal.mainUICtr.removeReportBTN(UIConst.HONGBAO);
				layr.open(UIConst.HONGBAO);
				break;
			case UIConst.ACTCOM_LEITAI:
				GGlobal.mainUICtr.removeReportBTN(UIConst.ACTCOM_LEITAI);
				layr.open(UIConst.ACTCOM, UIConst.ACTCOM_LEITAI);
				break;
			case UIConst.GCBZ_CITYDATA:
			case UIConst.GCBZ_SHOP:
				GGlobal.mainUICtr.removeReportBTN(UIConst.GCBZ_CITYDATA);
				GGlobal.mainUICtr.removeReportBTN(UIConst.GCBZ_SHOP);
				layr.open(UIConst.GCBZ);
				break;
		}
	}

	private idx;
	public setID(id) {
		let cfg = Config.xitong_001[id];
		this.idx = id;
		if (cfg) {
			IconUtil.setImg(this.img, Enum_Path.MAINUI_URL + "tipbtn/" + cfg.icon + ".png");
		}
		this.addClickListener(this.onClick, this);
		if (id == UIConst.BW_XIANSHI) {
			this.showEff(true);
		} else if (id == UIConst.REWARD_BACK) {
			this.showEff(true, 10038);
		}
	}

	public setReportID(id) {
		let self = this;
		if (id == UIConst.GCBZ_SHOP || id == UIConst.GCBZ_CITYDATA) {
			self.idx = id;
			if (Config.xitong_001[UIConst.GCBZ]) {
				IconUtil.setImg(self.img, "resource/image/tipbtn/" + id + ".png");
			}
		} else {
			let cfg = Config.xitong_001[id];
			self.idx = id;
			if (cfg) {
				IconUtil.setImg(self.img, "resource/image/tipbtn/" + cfg.icon + ".png");
			}
		}
		self.addClickListener(self.onClick, self);
	}


	private iconEff: Part;
	public showEff(value: boolean, effID: number = 10021) {
		let s = this;
		if (value) {
			if (s.iconEff) {
				EffectMgr.instance.removeEff(s.iconEff);
				s.iconEff = null;
			}
			if (!s.iconEff) {
				s.iconEff = EffectMgr.addEff("uieff/" + effID, s.displayListContainer, 35, 40, 1000, -1, true);
			}
		} else {
			if (s.iconEff) {
				EffectMgr.instance.removeEff(s.iconEff);
				s.iconEff = null;
			}
		}
	}
}