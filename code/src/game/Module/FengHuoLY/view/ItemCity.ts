/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ItemCity extends fairygui.GComponent {

	public n10: fairygui.GImage;
	public btnCheck: fairygui.GButton;
	public n6: fairygui.GLoader;
	public lbName: fairygui.GTextField;
	public n11: fairygui.GImage;
	public lbMember: fairygui.GTextField;
	public groupMember: fairygui.GGroup;
	public imgArrow: fairygui.GImage;
	public imgHead: fairygui.GLoader;
	public n14: fairygui.GLoader;
	public n17: fairygui.GLoader;
	public n18: fairygui.GImage;
	public lbOwner: fairygui.GTextField;
	public barHp: fairygui.GProgressBar;
	public groupHead: fairygui.GGroup;
	public barTime: fairygui.GProgressBar;
	public lbTime: fairygui.GTextField;
	public groupPro: fairygui.GGroup;
	public t0: fairygui.Transition;
	public bg: fairygui.GImage;
	public groupState: fairygui.GGroup;

	public static URL: string = "ui://edvdots4srrs5";

	public static createInstance(): ItemCity {
		return <ItemCity><any>(fairygui.UIPackage.createObject("FengHuoLY", "ItemCity"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		let sf = this;
		CommonManager.parseChildren(sf,sf);
		sf.t0 = sf.getTransition("t0");
		sf.barHp.max = 100;
		sf.groupPro.visible = false;
		sf.groupState.visible = false;
		super.constructFromXML(xml);
	}

	idx;
	camp;//卫城阵营不变
	type;
	time;
	public initCFG(val) {
		let sf = this;
		sf.idx = val;
		let cfg = Config.fhly_254[val];
		sf.camp = cfg.gs;
		sf.type = cfg.type;
		sf.time = cfg.time;
		sf.barTime.max = cfg.time;
		sf.groupState.visible = false;
		sf.barTime._titleObject.visible = false;
		sf.lbName.text = ModelFengHuoLY.CITYNAME[sf.type];
		sf.lbName.color = ModelFengHuoLY.CITYNAMECOLOR[sf.type];
		IconUtil.setImg(sf.n6,Enum_Path.IMAGE_MODULES_URL+"fenghuolangyan/city" + sf.type+".png");
	}

	public vo;
	public updateVO(city: Vo_City) {
		if (!city) return;
		let sf = this;
		sf.vo = city;
		let m = GGlobal.modelFengHuoLY;
		sf.lbMember.text = city.hasTakeCount + "/" + city.cfg.num;
		sf.groupState.visible = city.state == 1;
		if (city.owerID > 0) {
			sf.groupHead.visible = true;
			sf.lbOwner.text = city.ower;
			sf.barHp.value = city.hp;
			sf.n17.url = ["","ui://edvdots4ekf6u" , "ui://edvdots4jv3kw1w","ui://edvdots4byucw2d"][city.camp];
			sf.setArrowST();
			let pvo = m.getPlayer(city.owerID);
			if (!pvo) return;
			ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(city.head), sf.imgHead);
			ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(city.headGrid), sf.n14);
		} else {
			sf.imgArrow.visible = false;
			sf.groupHead.visible = false;
		}
	}

	private setArrowST() {
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		let atCity = Model_player.isMineID(sf.vo.owerID) || (m.state == 1 && m.zhengshouID == sf.idx);
		sf.imgArrow.visible = atCity;
	}

	private collectCount = 0;
	public updateShow(now) {
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		if (m.state == 1 && m.zhengshouID == sf.idx) {
			let val = ((now / 1000 - m.startCollectTime / 1000) >> 0);
			val = sf.time - Math.abs(val) % sf.time;
			sf.barTime.value = val;
			sf.groupPro.visible = true;
			sf.lbTime.text = val + "s";
			let tempCount = (Math.abs(val) / sf.time) >> 0;
			if (tempCount != 0 && Math.abs(val) % sf.time == 0 && tempCount != sf.collectCount) {
				GGlobal.modelFengHuoLY.CG_SCORE_3579();
				m.startCollectTime = now;
			}
			sf.collectCount = tempCount;
		} else {
			sf.stopCollect();
		}
		sf.setArrowST();
	}

	private moveHD() {
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		let st = GGlobal.modelFengHuoLY.state;
		let cityplayerVO = m.hero;
		if (m.getMyCity() == sf.idx || cityplayerVO.soakCity == sf.idx) {
			ViewCommonWarn.text("正在征收中");
			return;
		}
		if (m.getMyCity() > 0) {
			ViewAlert.show("若移动到其他地方视为\n<font color='#fe0000'>放弃</font>本城池守城者\n且<font color='#fe0000'>所有征收者</font>停止征收并返回基地", Handler.create(sf, sf.move), ViewAlert.OKANDCANCEL, "移动");
		} else if (st == 1) {
			ViewAlert.show("若移动到其他地方视为\n<font color='#fe0000'>放弃征收</font>", Handler.create(sf, sf.move), ViewAlert.OKANDCANCEL, "移动");
		} else {
			sf.move();
		}
	}

	private move() {
		let m = GGlobal.modelFengHuoLY;
		if (m.state == 1 && m.zhengshouID == this.idx) {
			ViewCommonWarn.text("已在征收中");
			return;
		}
		m.state = 0;
		m.moveCityID = this.idx;
		m.CG_MOVE_3561(this.xx, this.yy);
	}

	private checkHD() {
		GGlobal.modelFengHuoLY.CG_CHECK_3559(this.idx);
		GGlobal.layerMgr.open(UIConst.FHLY_INFO, this.idx);
	}

	public get xx(): number {
		return this.n6.x + this.n6.width / 2 + this.x;
	}

	public get yy(): number {
		return this.n6.y + this.n6.height / 2 + this.y;
	}

	public registHD() {
		let sf = this;
		sf.n6.addClickListener(sf.moveHD, sf);
		sf.btnCheck.addClickListener(sf.checkHD, sf);
	}

	public removeHD() {
		let sf = this;
		sf.n6.removeClickListener(sf.moveHD, sf);
		sf.btnCheck.removeClickListener(sf.checkHD, sf);
	}

	private collectionHD() {
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		let vo = m.getCity(this.idx);
		if (vo.hasTakeCount >= vo.maxTakeCount) {
			ViewCommonWarn.text("当前征收人数已满");
			return;
		}
		let st = GGlobal.modelFengHuoLY.state;
		if (st != 0) {
			ViewCommonWarn.text("当前状态不可征收");
		} else {
			let cfg = Config.fhly_254[sf.idx];
			sf.groupPro.visible = true;
			GGlobal.modelFengHuoLY.zhengshouID = sf.idx;
			if (sf.type == 3 || vo.camp == m.myCamp)
				sf.CG_Collect();
			else
				sf.CG_occupy();
		}
	}

	public stopCollect() {
		let sf = this;
		sf.groupPro.visible = false;
		sf.collectCount = -1;
	}

	private CG_occupy() {
		GGlobal.modelFengHuoLY.CG_OCCUPY_3565(this.idx);
	}

	private CG_Collect() {
		GGlobal.modelFengHuoLY.CG_LEVY_3573(this.idx);
	}

	private battleHD() {
		GGlobal.modelFengHuoLY.zhengshouID = this.idx;
		GGlobal.modelFengHuoLY.CG_OCCUPY_3565(this.idx);
	}

	public interactive() {
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		let vo = sf.vo;
		if (vo.inBattle()) {
			ViewCommonWarn.text("城池正在被争夺中");
			return;
		}
		if (m.state == 1 && m.zhengshouID == sf.idx) {
			ViewCommonWarn.text("已在征收中");
			return;
		}
		if (sf.type == 3) {//卫城
			if (sf.camp == m.myCamp) {
				ViewAlert.show("是否开始征收", Handler.create(sf, sf.collectionHD), ViewAlert.OKANDCANCEL, "征收");
			} else {
				ViewCommonWarn.text("敌方卫城不可征收");
			}
		} else {
			if (vo.owerID == 0) {
				ViewAlert.show("是否占领该城池并征收？", Handler.create(sf, sf.collectionHD), ViewAlert.OKANDCANCEL, "征收");
			} else {
				if (vo.camp == m.myCamp) {
					ViewAlert.show("该城池被本服玩家占领\n是否开始征收", Handler.create(sf, sf.collectionHD), ViewAlert.OKANDCANCEL, "征收");
				} else {
					ViewAlert.show("是否攻打敌方占领城池\n攻占后可进行征收", Handler.create(sf, sf.battleHD), ViewAlert.OKANDCANCEL);
				}
			}
		}
	}

	public resetView() {
		let sf = this;
		sf.groupState.visible = false;
	}
}
