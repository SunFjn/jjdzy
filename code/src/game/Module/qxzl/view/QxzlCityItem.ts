/**
 * @author: lujiahao 
 * @date: 2019-09-26 10:18:06 
 */
class QxzlCityItem extends fairygui.GLabel {

	//>>>>start
	public countryCtrl: fairygui.Controller;
	public btnGo: Button0;
	public tfCityName: fairygui.GRichTextField;
	public imgArrow: fairygui.GImage;
	public btnCheck: Button2;
	public tfId: fairygui.GRichTextField;
	public tfNeed: fairygui.GRichTextField;
	public imageIcon: fairygui.GLoader;
	public groupNeed: fairygui.GGroup;
	public btnAttack: Button0;
	public tfCount: fairygui.GRichTextField;
	public mcArrow: fairygui.Transition;
	//>>>>end

	public static URL: string = "ui://6d8dzzdgems47";

	public curVo: VoCityQxzl;
	public cityId: number = 0;

	public static createInstance(): QxzlCityItem {
		return <QxzlCityItem><any>(fairygui.UIPackage.createObject("qxzl", "QxzlCityItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
	}

	//=========================================== API ==========================================
	public itniData() {
		this.curVo = GGlobal.modelQxzl.getCityVoById(~~this.data);
		this.cityId = this.curVo.id;

		ImageLoader.instance.loader(Enum_Path.ICON70_URL + "18" + ".png", this.imageIcon);
		this.tfNeed.text = GGlobal.modelQxzl.moveNeedStamina + "";
	}

	public refreshData() {
		let t = this;
		if (t.curVo) {
			t.registerEvent(true);
			t.tfCityName.text = t.curVo.cfg.name;
			t.tfId.text = t.curVo.id + "";
			t.tfCount.text = t.curVo.guardCount + "";
			t.countryCtrl.selectedIndex = t.curVo.countryId

			t.btnGo.visible = false;
			t.imgArrow.visible = false;
			t.groupNeed.visible = false;
			t.btnAttack.visible = false;

			if (t.curVo.isDouble) {
				t.showDoubleEffect(true);
			}
			else {
				t.showDoubleEffect(false);
			}

			if (t.curVo.isMyPosCity) {
				if (GGlobal.modelQxzl.isInCity) { //在驻守
					t.imgArrow.visible = true;
				}
				else { //在城外逛
					if (t.curVo.isMyCountryCity || t.curVo.countryId == 0) {
						t.btnAttack.title = "驻守城池";
					}
					else {
						t.btnAttack.title = "攻打城池";
					}
					if (t.curVo.isMainCity && !t.curVo.isMyCountryCity) {
						//非自己的主城不显示
					}
					else {
						t.btnAttack.visible = true;
					}
				}
			}
			else { //非所在位置的城池
				if (t.curVo.isPosNear)
					t.groupNeed.visible = t.btnGo.visible = true;
			}
		}
		else {
		}
	}

	/** 隐藏移动的按钮，在角色移动时候调用 */
	public hideBtnGo() {
		if (this.btnGo.visible)
			this.groupNeed.visible = this.btnGo.visible = false;
		if (this.btnAttack.visible)
			this.btnAttack.visible = false;
	}

	private _effDouble: Part;
	public showDoubleEffect(pFlag: boolean) {
		let t = this;
		if (pFlag) {
			if (!t._effDouble) {
				t._effDouble = EffectMgr.addEff("uieff/10056", t.displayListContainer, t.width / 2, t.height / 2, 1000, -1);
			}
		}
		else {
			if (t._effDouble) {
				EffectMgr.instance.removeEff(t._effDouble);
				t._effDouble = null;
			}
		}
	}

	public clean() {
		this.registerEvent(false);
		this.showDoubleEffect(false);
	}

	public dispose() {
		this.clean();
		super.dispose();
	}

	//===================================== private method =====================================
	private registerEvent(pFlag: boolean) {
		let t = this;
		EventUtil.register(pFlag, t.btnGo, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
		EventUtil.register(pFlag, t.btnCheck, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
		EventUtil.register(pFlag, t.btnAttack, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
		EventUtil.register(pFlag, t.imageIcon, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
	}

	//======================================== handler =========================================
	private onBtnClick(e: egret.TouchEvent) {
		let t = this;
		switch (e.currentTarget) {
			case t.btnGo:
				//移动
				if (GGlobal.modelQxzl.isInCity) {
					ViewAlert.show("您当前处于驻守状态，移动会退出驻守状态\n是否执行移动操作？", Handler.create(t, t.onMoveSure));
				}
				else {
					GGlobal.modelQxzl.CG_QunXiongZhuLu_move_8967(t.cityId);
				}
				break;

			case t.btnCheck: //查看城池信息
			case t.btnAttack: //驻守/攻击
				GGlobal.layerMgr.open(UIConst.QXZL_CITY_INFO, { "cityId": t.cityId });
				break;

			case t.imageIcon:
				FastAPI.showItemTips(18);
				break;
		}
	}

	private onMoveSure() {
		GGlobal.modelQxzl.CG_QunXiongZhuLu_move_8967(this.cityId);
	}
}