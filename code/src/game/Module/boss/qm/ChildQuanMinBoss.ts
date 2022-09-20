/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ChildQuanMinBoss extends fairygui.GComponent implements IPanel {

	//>>>>start
	public lst: fairygui.GList;
	public lbKiller: fairygui.GRichTextField;
	public btnFight: Button1;
	public btnSao: Button0;
	public lbCount: fairygui.GRichTextField;
	public lbTips: fairygui.GRichTextField;
	public hpBar: fairygui.GProgressBar;
	public bgv1: fairygui.GImage;
	public lbRelive: fairygui.GRichTextField;
	public g0: fairygui.GGroup;
	public lbItemCount: fairygui.GRichTextField;
	public lbRemaindTime: fairygui.GRichTextField;
	public groupItem: fairygui.GGroup;
	public lbName: fairygui.GRichTextField;
	public imgDoub: fairygui.GImage;
	//>>>>end

	public static URL: string = "ui://47jfyc6egs0dq";

	public static createInstance(): ChildQuanMinBoss {
		return <ChildQuanMinBoss><any>(fairygui.UIPackage.createObject("Boss", "ChildQuanMinBoss"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.open();
	}

	closePanel(pData?: any) {
		this.close();
	}

	private com: fairygui.GComponent;
	private gridCom: fairygui.GComponent;
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);

		s.hpBar.max = 100;
		s.lst.callbackThisObj = s;
		s.lst.itemRenderer = s.itemRender;
		s.lst.setVirtual();

		s.com = new fairygui.GComponent();
		s.addChildAt(s.com, s.numChildren - 8);
		s.gridCom = new fairygui.GComponent();
		s.gridCom.setScale(0.8, 0.8);
		s.addChild(s.gridCom);

		s.groupItem.visible = false;
	}

	private curItem: QuanMinHead;
	private itemRender(index, obj) {
		let s = this;
		let item: QuanMinHead = obj as QuanMinHead;
		item.setVO(this.dta[index]);
		if (!s.curItem && s.selID == index) {
			s.curItem = item;
			s.curItem.setSel(true);
			s._vo = item.vo;
			s.setInfo();
		} else {
			item.setSel(false);
		}
	}

	private itemClickHandle(event: fairygui.ItemEvent): void {
		let s = this;
		let item: QuanMinHead = event.itemObject as QuanMinHead;
		if (s.curItem) s.curItem.setSel(false);
		s.curItem = item;
		s.curItem.setSel(true);
		s._vo = item.vo;
		s.setInfo();
	}

	private onFight(e: egret.TouchEvent) {
		if (!this._vo) {
			ViewCommonWarn.text("BOSS数据已刷新");
			GGlobal.modelBoss.CG_OPENUI_1351();
			return;
		}
		let itemCount = Model_Bag.getItemCount(410015);
		if (GGlobal.modelBoss.qmCount < 1 && itemCount == 0) {
			ViewCommonWarn.text("没有剩余次数");
			return;
		}

		let te = this._vo.reliveTime * 1000 - Model_GlobalMsg.getServerTime();
		if (te > 0) {
			ViewCommonWarn.text("BOSS尚未复活");
			return;
		}
		if (GGlobal.sceneType == SceneCtrl.QMBOSS) {
			return;
		}
		if (Model_Bag.checkBagCapacity()) {
			if (e.currentTarget.id == this.btnFight.id) {//挑战
				GGlobal.modelBoss.CG_ENTER_1353(this._vo.id);
			} else {//扫荡
				GGlobal.modelBoss.CG_MOPUP_1369(this._vo.id);
			}
		}
	}

	private upSaodan(arr: VoItem[]) {
		let s = this;
		// s.update();
		//飘奖励
		let startPos = s.btnSao.localToRoot();
		let retPos = ViewMainBottomUI.instance.getBagRootPos();
		let len = arr.length
		for (let i = 0; i < len; i++) {
			let g = ViewGrid.createInstance();
			g.vo = arr[i];
			g.setXY(startPos.x + s.btnSao.width / 2 - g.width / 2, startPos.y - g.height);
			GGlobal.layerMgr.UI_Message.addChild(g);
			// Timer.instance.callLater(function () {
			egret.Tween.get(g).to({ x: g.x - len * 15 + i * 30, y: g.y - 30 }, 300, egret.Ease.backIn).to({ x: retPos.x, y: retPos.y }, 500, egret.Ease.backIn).call(s.clearGrid, s, [g]);;
			// }, 200 * (len - i - 1), s);
		}
	}

	public clearGrid(g: ViewGrid) {
		if (g && g.parent) {
			g.removeFromParent();
			g.disposePanel();
		}
	}

	private selID = 0;
	private grids: any[] = [];
	private awatar: UIRole;
	private _vo: Vo_QuanMinBoss;
	private setInfo() {
		if (!this._vo) return;
		let s = this;
		let v = s._vo;
		s.lbName.text = v.name.replace("·", "\n·\n");;
		ConfigHelp.cleanGridview(s.grids);
		let award = ConfigHelp.makeItemListArr(v.reward);
		s.grids = ConfigHelp.addGridview(award, s.gridCom, 270, 853, true, false, 5, 115);
		s.lbKiller.text = v.lastKiller;
		if (!s.awatar) {
			s.awatar = UIRole.create();
			s.awatar.uiparent = s.com.displayListContainer;
		}
		s.awatar.setPos(380, 490);
		s.awatar.setScaleXY(1.5, 1.5);
		if (v.weapon) {
			s.awatar.setWeapon(v.bossbody);
		} else {
			s.awatar.setWeapon(0);
		}
		s.awatar.setBody(v.bossbody);
		if (v.bossbody == "201002") {
			s.awatar.setScaleXY(1.5, 1.5);
		} else if (v.bossbody == "201011") {
			s.awatar.setPos(400, 645);
		}
		s.awatar.onAdd();

		if (Config.all_221[v.id].single == 1) {
			s.hpBar.value = s.hpBar.max;
		} else {
			s.hpBar.value = v.curHp;
		}
		s.setTime();
	}

	private needRefresh: boolean = false;
	private setTime() {
		if (!this._vo) return;
		let s = this;
		let m = GGlobal.modelBoss;
		let te = s._vo.reliveTime * 1000 - Model_GlobalMsg.getServerTime();
		if (te > 0) {
			s.g0.visible = true;
			s.hpBar.value = 0;
			s.lbRelive.text = "复活时间：" + TimeUitl.getRemainingTime(te, 0, { minute: ":", second: " " });
		} else {
			if (this._vo.curHp == 0) {
				this.hpBar.value = this._vo.maxHp;
			}
			s.g0.visible = false;
		}
		te = GGlobal.modelBoss.remainSec - Model_GlobalMsg.getServerTime();
		let c = "挑战次数：<font color='#15f234'>" + m.qmCount + "/5</font>";
		if (te > 0) {
			s.needRefresh = true;
			s.lbCount.text = c + "<font color='#fe0000'>(" + TimeUitl.getRemainingTime(te, 0, { minute: ":", second: " " }) + "后回复1次)</font>";
			s.lbRemaindTime.text = "<font color='#fe0000'>(" + TimeUitl.getRemainingTime(te, 0, { minute: ":", second: " " }) + "后回复1次)</font>";
		} else {
			s.lbCount.text = c;
			if (s.needRefresh) {
				GGlobal.modelBoss.CG_OPENUI_1351();
				s.needRefresh = false;
			}
		}
	}

	private dta: any[] = [];
	private update() {
		let s = this;
		let m = GGlobal.modelBoss;
		s.dta = m.qmData;
		s.selID = 0;

		if (s.curItem) {
			s.curItem.setSel(false);
			s.curItem = null
		}
		for (let i = s.dta.length - 1; i >= 0; i--) {
			let v = s.dta[i];
			if (s.selID == 0 && v.isOpen() && v.st == 1) {
				s.selID = i;
				break;
			}
		}
		s.lst.numItems = s.dta.length;
		let temp = s.selID;
		if (temp >= 0 && temp < 2) {
			temp = 0;
		} else {
			temp -= 2;
		}
		s.lst.scrollToView(temp);
		egret.callLater(this.setSelected, this);

		if (s.dta.length) s._vo = s.dta[s.selID];
		s.lbCount.text = "挑战次数：<font color='#15f234'>" + m.qmCount + "/5</font>";
		s.groupItem.visible = false;
		s.lbCount.visible = true;
		if (m.qmCount == 0) {
			let itemCount = Model_Bag.getItemCount(410015);
			if (itemCount > 0) {
				this.groupItem.visible = true;
				s.lbCount.visible = false;
				this.lbItemCount.text = "全民挑战令：      <font color='#15f234'>" + itemCount + "/1</font>";
			}
		}

		s.setInfo();
	}

	private setSelected() {
		let s = this;
		if (s.curItem)
			s.curItem.setSel(true);
	}

	public open() {
		let s = this;
		GGlobal.modelBoss.CG_OPENUI_1351();
		s.btnFight.addClickListener(s.onFight, s);
		s.btnSao.addClickListener(s.onFight, s);
		s.lst.addEventListener(fairygui.ItemEvent.CLICK, s.itemClickHandle, s);
		Timer.instance.listen(s.setTime, s, 1000, 0, false);
		GGlobal.control.listen(Enum_MsgType.MSG_QMBOSS_UPDATE, s.update, s);
		GGlobal.control.listen(Enum_MsgType.MSG_QMBOSS_SAODAN, s.upSaodan, s);

		let act = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_DOUBLE);
		this.imgDoub.visible = (act != null)

		let vip = ConfigHelp.getSystemNum(8421)
		let guan = ConfigHelp.getSystemNum(8422)
		if (Model_player.voMine.viplv < vip || GGlobal.modelGuanQia.curGuanQiaLv < guan) {//未开启
			s.btnSao.visible = false;
			s.btnFight.x = 323
			this.lbTips.text = "VIP" + vip + "且通关" + guan + "关开启扫荡"
		} else {
			s.btnSao.visible = true;
			s.btnFight.x = 232
			this.lbTips.text = ""
		}
	}

	public close() {
		let s = this;
		s.curItem = null;
		if (s.awatar) {
			s.awatar.onRemove();
			s.awatar = null;
		}
		s.lst.numItems = 0;
		s.needRefresh = false;
		ConfigHelp.cleanGridview(s.grids);
		Timer.instance.remove(s.setTime, s);
		s.btnFight.removeClickListener(s.onFight, s);
		s.btnSao.removeClickListener(s.onFight, s);
		s.lst.removeEventListener(fairygui.ItemEvent.CLICK, s.itemClickHandle, s);
		GGlobal.control.remove(Enum_MsgType.MSG_QMBOSS_UPDATE, s.update, s);
		GGlobal.control.remove(Enum_MsgType.MSG_QMBOSS_SAODAN, s.upSaodan, s);
	}

	public guide_QMBOSS_battle(step) {
		let self = this;
		GuideStepManager.instance.showGuide(self.btnFight, self.btnFight.width / 2, self.btnFight.height / 2);
		GuideStepManager.instance.showGuide1(step.source.index, self.btnFight, self.btnFight.width / 2, 0, -90, -106, -100);
		if (self.btnFight.parent) self.btnFight.parent.setChildIndex(self.btnFight, self.btnFight.parent.numChildren - 1);
	}
}