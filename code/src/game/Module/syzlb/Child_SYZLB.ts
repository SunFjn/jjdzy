class Child_SYZLB extends fairygui.GComponent implements IPanel {

	public c1: fairygui.Controller;
	public c2: fairygui.Controller;
	public createBt: fairygui.GButton;
	public listJoin: fairygui.GList;
	public lbNoTeam: fairygui.GRichTextField;
	public teamDataGroup: fairygui.GGroup;
	public listTeam: fairygui.GList;
	public battleBt: fairygui.GButton;
	public yaoQingBt: fairygui.GButton;
	public exitBt: fairygui.GButton;
	public teamRoleGroup: fairygui.GGroup;
	public chatBt: fairygui.GButton;
	public listRew: fairygui.GList;
	public lbBat: fairygui.GRichTextField;
	public txtDes: fairygui.GRichTextField;
	public backImg: fairygui.GLoader;
	public backImg1: fairygui.GLoader;
	public btnAdd: Button2;
	public groupItem: fairygui.GGroup;
	public itemIcon: fairygui.GLoader;
	public itemCt: fairygui.GRichTextField;
	public itemLb: fairygui.GRichTextField;
	public tabBtn0: fairygui.GButton;
	public tabBtn1: fairygui.GButton;

	public static URL: string = "ui://3o8q23uuhfuw9";
	public static createInstance(): Child_SYZLB {
		return <Child_SYZLB><any>(fairygui.UIPackage.createObject("syzlb", "Child_SYZLB"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
		s.listTeam.callbackThisObj = s;
		s.listTeam.itemRenderer = s.renderTeam
		s.listJoin.callbackThisObj = s;
		s.listJoin.itemRenderer = s.renderJoin
		s.listRew.callbackThisObj = s;
		s.listRew.itemRenderer = s.renderRew
		s.txtDes.text = HtmlUtil.createLink("玩法说明");
	}

	public initView(pParent: fairygui.GObject) {

	}

	private rewArr;
	public openPanel(pData?: any) {
		let s = this;
		s.addListen();
		s.update();
		s.onTimer()
	}

	public closePanel(pData?: any) {
		let self = this;
		self.removeListen();
		if (!Model_Syzlb.batIng) {
			let m = GGlobal.model_Syzlb
			if (m.teamMyArr.length > 0) {
				m.CG_LEAVE_TEAM();
			}
		}
		self.listRew.numItems = 0;
	}

	private onTimer() {//每5秒
		GGlobal.model_Syzlb.CG_OPENUI();
	}

	private addListen(): void {
		let s = this;
		IconUtil.setImg(s.backImg, Enum_Path.BACK_URL + "syzlb.jpg");
		IconUtil.setImg(s.backImg1, Enum_Path.BACK_URL + "syzlb1.png");
		s.createBt.addClickListener(s.createRoom, s);
		s.battleBt.addClickListener(s.onBattle, s);
		s.exitBt.addClickListener(s.onExit, s);
		s.chatBt.addClickListener(s.onChat, s);
		s.btnAdd.addClickListener(s.onAdd, s);
		s.yaoQingBt.addClickListener(s.onYaoQing, s);
		s.tabBtn0.addClickListener(s.selTab, s);
		s.tabBtn1.addClickListener(s.selTab, s);
		GGlobal.model_Syzlb.listen(Model_Syzlb.openui, s.update, s);
		GGlobal.model_Syzlb.listen(Model_Syzlb.room_data, s.update, s);
		GGlobal.model_Syzlb.listen(Model_Syzlb.teamui, s.update, s);
		GGlobal.model_Syzlb.listen(Model_Syzlb.msg_invite, s.onInvite, s);
		s.txtDes.addEventListener(egret.TextEvent.LINK, s.onLink, s);
		s._first = true;
	}


	private removeListen(): void {
		let s = this;
		IconUtil.setImg(s.backImg, null);
		IconUtil.setImg(s.backImg1, null);
		s.createBt.removeClickListener(s.createRoom, s);
		s.battleBt.removeClickListener(s.onBattle, s);
		s.exitBt.removeClickListener(s.onExit, s);
		s.chatBt.removeClickListener(s.onChat, s);
		s.yaoQingBt.removeClickListener(s.onYaoQing, s);
		s.btnAdd.removeClickListener(s.onAdd, s);
		s.tabBtn0.removeClickListener(s.selTab, s);
		s.tabBtn1.removeClickListener(s.selTab, s);
		GGlobal.model_Syzlb.remove(Model_Syzlb.openui, s.update, s);
		GGlobal.model_Syzlb.remove(Model_Syzlb.room_data, s.update, s);
		GGlobal.model_Syzlb.remove(Model_Syzlb.teamui, s.update, s);
		GGlobal.model_Syzlb.remove(Model_Syzlb.msg_invite, s.onInvite, s);
		s.txtDes.removeEventListener(egret.TextEvent.LINK, s.onLink, s);
		Timer.instance.remove(s.onTimer, s);
	}
	private onLink() {
		GGlobal.layerMgr.open(UIConst.WFSM_PANEL, UIConst.SYZLB);
	}

	private onAdd(): void {
		let m = GGlobal.model_Syzlb
		let maxCt = m.batBuyMaxCt;
		const lastBuy = maxCt - m.batBuy;
		if (lastBuy <= 0) {
			ViewCommonWarn.text("已达购买上限");
			return;
		}
		var cost = m.batBuyCost;
		if (cost > 0) {
			ViewSYZLBCtBuy.show(cost, lastBuy, maxCt, "", Handler.create(null, this.okHandle));
		} else {
			ViewCommonWarn.text("已达购买上限");
		}
	}

	private okHandle(count): void {
		let m = GGlobal.model_Syzlb
		let cost = 0
		for (let i = 0; i < count; i++) {
			let v = Config.sycs_762[m.batBuy + 1 + i]
			if (v) {
				cost += Number(JSON.parse(v.xh)[0][2]);
			}
		}
		if (Model_player.voMine.yuanbao < cost) {
			ModelChongZhi.guideToRecharge()
			return;
		}
		let maxCt = m.batBuyMaxCt;
		const lastBuy = maxCt - m.batBuy;
		if (count > lastBuy) {
			ViewCommonWarn.text("购买次数不足")
			return;
		}
		GGlobal.model_Syzlb.CG_BUY_CHA_NUM(count);
	}

	private _joinArr: Vo_Syzlb[]
	private _teamMyArr: Vo_Syzlb[]
	private _isLeader = false;;
	private update() {
		let s = this
		let m = GGlobal.model_Syzlb;



		if (m.teamMyArr.length > 0) {
			s.c1.selectedIndex = 1;
			let isLeader = false;
			for (let i = 0; i < m.teamMyArr.length; i++) {
				let team = m.teamMyArr[i]
				if (team.pId == Model_player.voMine.id) {
					if (team.type == 1) isLeader = true;
					break;
				}
			}
			if (isLeader) {
				s.yaoQingBt.visible = true;
				s.battleBt.visible = true;
				s.exitBt.visible = false;
			} else {
				s.yaoQingBt.visible = false;
				s.battleBt.visible = false;
				s.exitBt.visible = true;
			}
			s._teamMyArr = m.teamMyArr
			s._isLeader = isLeader;
			s.listTeam.numItems = s._teamMyArr.length
			Timer.instance.remove(s.onTimer, s);
		} else {
			s.c1.selectedIndex = 0;
			Timer.instance.listen(s.onTimer, s, 10000, 0, false);
		}

		let itemCt = Model_Bag.getItemCount(Model_Syzlb.ITEM_BATCT)
		if (m.batCt == 0 && itemCt > 0) {
			s.lbBat.text = ""
			s.btnAdd.visible = false
			s.groupItem.visible = true;
			s.itemLb.text = "三英令："
			s.itemCt.text = "" + itemCt
			let icon = Config.daoju_204[Model_Syzlb.ITEM_BATCT].icon
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + icon + ".png", s.itemIcon);
		} else {
			s.lbBat.text = "挑战次数：" + HtmlUtil.fontNoSize(m.batCt + "/" + ConfigHelp.getSystemNum(7501), m.batCt > 0 ? Color.GREENSTR : Color.REDSTR);
			s.btnAdd.visible = true
			s.groupItem.visible = false;
		}

		//难度
		if (m.hard <= 1) {
			s.tabBtn0.visible = false
			s.tabBtn1.visible = false
			s.c2.selectedIndex = 0;
			s.selHandle();
		} else {
			s.tabBtn0.visible = true
			s.tabBtn1.visible = true

			if (m.teamMyArr.length > 0) {
				s.c2.selectedIndex = m.teamHard - 1
				s.selHandle();
			} else {
				if (s._first && m.hard > 0) {
					s._first = false
					s.c2.selectedIndex = m.hard - 1;
					s.selHandle();
				} else {
					s.selHandle();
				}
			}
		}
	}
	private _first = true;
	private createRoom() {
		let hard = this.c2.selectedIndex + 1;//1普通2困难 3地狱 4恶魔
		GGlobal.model_Syzlb.CG_CREATE_TEAM(hard);
	}

	private onBattle() {
		if(TimeUitl.cool("Child_SYZLB", 3000)){
			GGlobal.model_Syzlb.CG_CHALLENGE();
		}
	}

	private onExit() {
		let m = GGlobal.model_Syzlb
		if (m.teamMyArr.length > 0) {
			m.CG_LEAVE_TEAM();
		}
	}


	private renderTeam(index, obj) {
		let v: ItemSYZLBTeam = obj as ItemSYZLBTeam
		v.setVo(this._teamMyArr[index], this._isLeader)
	}

	private onChat() {
		GGlobal.layerMgr.open(UIConst.CHAT);
	}

	private onYaoQing() {
		if (this.yaoQingBt.enabled == false) {
			ViewCommonWarn.text("请稍等!");
			return;
		}
		GGlobal.model_Syzlb.CG_BROADCAST_INVITE();
	}

	private lastTime: number = 0;
	private onInvite(time: number) {
		this.lastTime = time;
		this.yaoQingBt.enabled = false;
		Timer.instance.listen(function onT() {
			this.lastTime--;
			if (this.lastTime < 0) {
				this.yaoQingBt.enabled = true;
				this.yaoQingBt.text = "邀请协助";
				Timer.instance.remove(onT, this);
			} else {
				this.yaoQingBt.text = `等待(${this.lastTime})`;
			}
		}, this, 1000);
	}


	private renderJoin(index, obj) {
		let v: ItemSYZLBJoin = obj as ItemSYZLBJoin
		v.vo = this._joinArr[index]
	}

	private renderRew(index, obj: ViewGrid) {
		obj.tipEnabled = true;
		obj.isShowEff = true;
		obj.vo = this.rewArr[index]
	}

	private selTab(e: egret.TouchEvent) {
		let s = this;
		let m = GGlobal.model_Syzlb
		if (m.teamMyArr.length > 0) {
			ViewCommonWarn.text("请先退出当前队伍");
			s.c2.selectedIndex = m.teamHard - 1;
		}
		s.selHandle();
	}

	private selHandle() {
		let s = this;
		let m = GGlobal.model_Syzlb
		let hard = s.c2.selectedIndex + 1
		let v = Config.syzlbyl_762[hard]
		s.rewArr = ConfigHelp.makeItemListArr(JSON.parse(v.jlyl));
		s.listRew.numItems = s.rewArr.length;

		s._joinArr = [];
		for (let i = 0; i < m.teamJoinArr.length; i++) {
			if (m.teamJoinArr[i].hard == hard) {
				s._joinArr.push(m.teamJoinArr[i]);
			}
		}
		s.listJoin.numItems = s._joinArr.length
		s.lbNoTeam.visible = s._joinArr.length == 0
	}

}