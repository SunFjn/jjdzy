class View_LiuChuQS_Panel extends UIPanelBase {

	public c1: fairygui.Controller;
	public saoDanBt: Button1;
	public createBt: fairygui.GButton;
	public listJoin: fairygui.GList;
	public listMap: fairygui.GList;
	public lbNoTeam: fairygui.GRichTextField;
	public teamDataGroup: fairygui.GGroup;
	public battleBt: fairygui.GButton;
	public listTeam: fairygui.GList;
	public yaoQingBt: fairygui.GButton;
	public exitBt: fairygui.GButton;
	public teamRoleGroup: fairygui.GGroup;
	public chatBt: fairygui.GButton;
	public vTitle: ItemLCQSTitle;
	public imapName: fairygui.GLoader;
	public btnLeft: fairygui.GButton;
	public btnRight: fairygui.GButton;
	public imgMapBg: fairygui.GLoader;

	public tabBtn0: fairygui.GButton;
	public tabBtn1: fairygui.GButton;
	public c2: fairygui.Controller;

	public constructor() {
		super();
		this.setSkin("zjyw", "zjyw_atlas0", "View_LiuChuQS_Panel");
	}

	protected setExtends() {
		let f = fairygui.UIObjectFactory
		f.setPackageItemExtension(ItemLCQSMap.URL, ItemLCQSMap);
		f.setPackageItemExtension(ItemLCQSMapDetail.URL, ItemLCQSMapDetail);
		f.setPackageItemExtension(ItemLCQSTeam.URL, ItemLCQSTeam);
		f.setPackageItemExtension(ItemLCQSTeamJoin.URL, ItemLCQSTeamJoin);
		f.setPackageItemExtension(ItemLCQSTitle.URL, ItemLCQSTitle);
	}

	protected initView(): void {
		super.initView();
		let s = this;
		s.listTeam.callbackThisObj = s;
		s.listTeam.itemRenderer = s.renderTeam
		s.listJoin.callbackThisObj = s;
		s.listJoin.itemRenderer = s.renderJoin
		s.listMap.callbackThisObj = s;
		s.listMap.itemRenderer = s.renderMap
		s.listMap.setVirtual();
		s.listMap.scrollItemToViewOnClick = false;
		s.listMap.selectionMode = fairygui.ListSelectionMode.Single;

	}
	private _index: number;//大关卡id
	private _selId;//选中关卡
	private _guanArr: Isix_279[]//关卡列表

	protected onShown(): void {
		let s = this;
		s._index = s._args
		s._guanArr = GGlobal.model_LiuChuQS.getGuanArr(s._index)
		
		s.addListen();
		s.upGuanSel();
		s.update();
		s.checkNotice();
		GGlobal.model_LiuChuQS.CG_OPENUI_8201();
		s.c2.selectedIndex = s._guanArr[0].hard;
	}

	protected onHide(): void {
		this.removeListen();
		if (!Model_LiuChuQS.batIng) {
			let m = GGlobal.model_LiuChuQS
			if (m.teamMyArr.length > 0) {
				m.CG_LEAVE_8211(m.teamMyArr[0].teamId);
			}
		}
	}

	protected closeEventHandler(evt: egret.Event) {
		super.closeEventHandler(evt)
		GGlobal.layerMgr.open(UIConst.CHILD_LCQS);
	}

	private addListen(): void {
		let s = this;
		let backImg: fairygui.GLoader = s.frame.getChild("backImg").asLoader;
		IconUtil.setImg(backImg, Enum_Path.GUAN_QIA_URL + "lcqsFrame.jpg");
		IconUtil.setImg(s.imgMapBg, Enum_Path.GUAN_QIA_URL + "lcqsMapBg.png");
		let v = s._guanArr[0]
		IconUtil.setImg(s.imapName, Enum_Path.GUAN_QIA_URL + "lcqs" + v.name + ".png");
		s.vTitle.addListen();
		s.createBt.addClickListener(s.createRoom, s);
		s.battleBt.addClickListener(s.onBattle, s);
		s.exitBt.addClickListener(s.onExit, s);
		s.saoDanBt.addClickListener(s.onSaoDan, s);
		s.chatBt.addClickListener(s.onChat, s);
		s.yaoQingBt.addClickListener(s.onYaoQing, s);
		s.btnLeft.addClickListener(s.pageHandler, s);
		s.btnRight.addClickListener(s.pageHandler, s);
		GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.openui, s.upOpenUI, s);
		GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.room_data, s.update, s);
		GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.teamui, s.upTeam, s);
		GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.guan_sel_msg, s.guanSel, s);
		GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.msg_invite, s.onInvite, s);
		GGlobal.reddot.listen(UIConst.CHILD_LCQS, s.checkNotice, s);
	}

	private removeListen(): void {
		let s = this;
		let backImg: fairygui.GLoader = s.frame.getChild("backImg").asLoader;
		IconUtil.setImg(backImg, null);
		IconUtil.setImg(s.imapName, null);
		IconUtil.setImg(s.imgMapBg, null);
		s.listMap.numItems = 0
		s.vTitle.removeListen();
		s.createBt.removeClickListener(s.createRoom, s);
		s.battleBt.removeClickListener(s.onBattle, s);
		s.exitBt.removeClickListener(s.onExit, s);
		s.saoDanBt.removeClickListener(s.onSaoDan, s);
		s.chatBt.removeClickListener(s.onChat, s);
		s.yaoQingBt.removeClickListener(s.onYaoQing, s);
		s.btnLeft.addClickListener(s.pageHandler, s);
		s.btnRight.addClickListener(s.pageHandler, s);
		GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.openui, s.upOpenUI, s);
		GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.room_data, s.update, s);
		GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.teamui, s.upTeam, s);
		GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.guan_sel_msg, s.guanSel, s);
		GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.msg_invite, s.onInvite, s);
		GGlobal.reddot.remove(UIConst.CHILD_LCQS, s.checkNotice, s);
	}

	private upOpenUI(){
		let s = this;
		s.upGuanSel();
		GGlobal.model_LiuChuQS.CG_TEAM_DATA_8203(s._selId);
	}

	private upTeam(){
		let s = this;
		s.update();
		s.upGuanSel()
		GGlobal.model_LiuChuQS.notify(Model_LiuChuQS.guan_sel, s._selId);
	}
	private upGuanSel() {
		let s = this;
		let srollTo = -1;
		let m = GGlobal.model_LiuChuQS
		let mustTo = m.curGuan;
		if (m.teamMyArr.length > 0) {
			mustTo = m.teamMyArr[0].guan//组队后定位到相应关卡
		}
		for (let i = 0; i < s._guanArr.length; i++) {
			if (s._guanArr[i].id >= mustTo) {
				srollTo = i;
				break;
			}
		}
		if (srollTo == -1) {
			srollTo = s._guanArr.length - 1;
		}
		s._selId = s._guanArr[srollTo].id
		//列表
		s.listMap.numItems = s._guanArr.length
		//选中
		s.listMap.scrollToView(srollTo);
	}

	private guanSel(id) {
		this._selId = id
		GGlobal.model_LiuChuQS.CG_TEAM_DATA_8203(id);
	}

	private _joinArr
	private _teamMyArr
	private _isLeader = false;;
	private update() {
		let s = this
		let m = GGlobal.model_LiuChuQS;
		if (m.teamMyArr.length > 0) {
			s.c1.selectedIndex = 1;
			let isLeader = false;
			for (let i = 0; i < m.teamMyArr.length; i++) {
				let team = m.teamMyArr[i]
				if (team.plyId == Model_player.voMine.id) {
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
			this._teamMyArr = m.teamMyArr
			this._isLeader = isLeader;
			s.listTeam.numItems = this._teamMyArr.length
		} else {
			s.c1.selectedIndex = 0;
			this._joinArr = m.teamJoinArr
			s.listJoin.numItems = this._joinArr.length
			this.lbNoTeam.visible = this._joinArr.length == 0
		}
	}

	private createRoom() {
		GGlobal.model_LiuChuQS.CG_BUILD_TEAM_8205(this._selId);
	}

	private onBattle() {
		GGlobal.model_LiuChuQS.CG_BATTLE_8215();
	}

	private onExit() {
		let m = GGlobal.model_LiuChuQS
		if (m.teamMyArr.length > 0) {
			m.CG_LEAVE_8211(m.teamMyArr[0].teamId);
		}
	}

	private onSaoDan() {
		GGlobal.model_LiuChuQS.CG_SAO_DANG_8225();
	}

	private renderTeam(index, obj) {
		let v: ItemLCQSTeam = obj as ItemLCQSTeam
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
		if (GGlobal.model_LiuChuQS.helpMeCt <= 0) {
			ViewCommonWarn.text("今日求助次数已用完");
			return;
		}
		GGlobal.model_LiuChuQS.CG_BROAD_CAST_8209();
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

	private checkNotice() {
		let boo = GGlobal.model_LiuChuQS.checkSaiDan();
		this.saoDanBt.checkNotice = boo
		this.saoDanBt.enabled = boo
	}

	private renderJoin(index, obj) {
		let v: ItemLCQSTeamJoin = obj as ItemLCQSTeamJoin
		v.vo = this._joinArr[index]
	}

	private renderMap(index, obj) {
		let v: ItemLCQSMap = obj as ItemLCQSMap
		v.setVo(this._guanArr[index], this._selId)
	}

	private _curpage: number = 0;
	private pageHandler(event: egret.TouchEvent): void {
		let btn: fairygui.GButton = event.target as fairygui.GButton;
		let curpage: number = this.listMap.getFirstChildInView();
		switch (btn.id) {
			case this.btnLeft.id:
				if (curpage > 0) {
					curpage = curpage - 3;
					if (curpage < 0) curpage = 0;
				}
				break;
			case this.btnRight.id:
				if (curpage < this.listMap.numItems - 1) {
					curpage = curpage + 3;
					if (curpage >= this.listMap.numItems - 1) curpage = this.listMap.numItems - 1;
				}
				break;
		}
		this._curpage = curpage;
		if (this.listMap.numItems > 0)
			this.listMap.scrollToView(curpage, true, true);
	}
}