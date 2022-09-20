class VDengFengPly extends fairygui.GComponent {

	public img2: fairygui.GImage;
	public img3: fairygui.GImage;
	public img1: fairygui.GImage;
	public imgNO: fairygui.GImage;
	public imgPower: fairygui.GImage;
	public imgHasBat: fairygui.GLoader;
	public imgPoint: fairygui.GImage;
	public lbPoint: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lbPower: fairygui.GRichTextField;
	public btnBat: fairygui.GButton;
	public imgOne: fairygui.GImage;
	public lbRank: fairygui.GRichTextField;
	public gRank: fairygui.GGroup;

	public roleModel: EmptyComp;
	public effCont: EmptyComp;

	public static URL: string = "ui://3o8q23uujo891r";

	public static createInstance(): VDengFengPly {
		return <VDengFengPly><any>(fairygui.UIPackage.createObject("syzlb", "VDengFengPly"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s);
		s.imgOne.visible = false;
		s.btnBat.addClickListener(s.onBat, s);
	}

	private onBat() {
		let s = this;
		let m = GGlobal.modelDengFengZJ
		if (!s._vo) {
			return;
		}
		if (s._vo.plyId == Model_player.voMine.id) {
			ViewCommonWarn.text("不能挑战自己");
			return;
		}
		if (s.type == 0) {
			// if (m.status != 1) {
			// 	ViewCommonWarn.text("本周赛事已结束");
			// 	return;
			// }
			m.CG_BATTLE(0, s._vo.plyId)
		} else if (s.type == 1) {
			// if (m.status != 2) {
			// 	ViewCommonWarn.text("本周赛事已结束");
			// 	return;
			// }
			if (m.finalRank == 0) {
				ViewCommonWarn.text("未进入决赛不能挑战");
				return;
			}
			m.CG_BATTLE(1, s._vo.plyId)
		}
	}

	private type = -1;//0海选  1 决赛
	private _vo: Vo_DengFengZJ


	public seaVo(v: Vo_DengFengZJ, idx: number, unBatIdx: number) {
		let s = this;
		let m = GGlobal.modelDengFengZJ
		s.setVo(v);
		s.type = 0
		if (v) {
			s.imgHasBat.visible = v.st == 1;
			s.btnBat.visible = false;
			if (v.st == 0) {
				if (idx > 2) {
					s.btnBat.visible = true;
				} else if (idx > 0) {
					if (unBatIdx == 1 || unBatIdx == 2) {
						s.btnBat.visible = true;
					}
				} else {
					if (unBatIdx == 0) {
						s.btnBat.visible = true;
					}
				}
			}
			s.lbPoint.text = "积分+" + m.getAddPointSea(idx);
			s.imgPoint.visible = true
		}
		s.gRank.visible = false;
		s.img3.visible = idx == 0
		s.img2.visible = idx > 2
		s.img1.visible = (idx == 1 || idx == 2)
	}

	public finalVo(v: Vo_DengFengZJ, idx: number) {
		let s = this;
		let m = GGlobal.modelDengFengZJ
		s.setVo(v);
		s.type = 1
		if (v) {
			if (idx == 0) {
				s.imgOne.visible = true;
				s.gRank.visible = false
			} else {
				s.imgOne.visible = false;
				s.gRank.visible = true
				s.lbRank.text = v.rank + ""
			}
			s.lbPoint.text = "积分+" + m.getAddPointFinal(v.rank);
			s.imgPoint.visible = true
		}
		s.imgHasBat.visible = false;
		s.img3.visible = false
		s.img2.visible = false
		s.img1.visible = false
	}
	//公共的
	private setVo(v: Vo_DengFengZJ) {
		let s = this;
		s._vo = v;
		if (v) {
			s.roleModel.setUIRole(v.fashion, v.weakean, v.horse);
			if (v.horse) {
				s.roleModel.getUIRole().setScaleXY(0.6, 0.6);
			} else {
				s.roleModel.getUIRole().setScaleXY(1, 1);
			}
			s.btnBat.visible = true;
			s.imgNO.visible = false;
			s.imgPower.visible = true
		} else {
			s.clearAwatar();
			s.btnBat.visible = false;
			s.imgNO.visible = true;
			//积分
			s.lbPoint.text = ""
			s.imgPoint.visible = false

			s.gRank.visible = false
			s.imgOne.visible = false;
			s.imgHasBat.visible = false
			s.imgPower.visible = false
		}

		s.lbName.text = v ? v.name : ""
		s.lbPower.text = v ? ConfigHelp.getYiWanText(v.power) + "" : ""
	}

	public clean() {
		super.clean();
		let s = this;
		s.clearAwatar();
		s._vo = null;
		s.lbName.text = ""
		s.lbPower.text = ""
	}

	private clearAwatar() {
		let self = this;
		self.roleModel.setUIRole(null);
	}

	public plyEff() {
		let s = this;
		EffectMgr.addEff("uieff/10092", s.effCont.displayListContainer, 0, 0, 400, 400, false);
	}
}