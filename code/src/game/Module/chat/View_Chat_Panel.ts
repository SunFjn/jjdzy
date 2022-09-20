class View_Chat_Panel extends UIPanelBase {

	public c1: fairygui.Controller;
	public c2: fairygui.Controller;
	public list: fairygui.GList;
	public list1: fairygui.GList;
	public msgLb: fairygui.GTextInput;
	public sendBt: fairygui.GButton;
	public shezhiBt: fairygui.GButton;
	public faceBt: fairygui.GButton;
	public prohibitLb: fairygui.GRichTextField;
	public faceBtArr: Button2[] = [];
	public faceGroup: fairygui.GGroup;
	public blackGroup: fairygui.GGroup;
	public blackListLb: fairygui.GRichTextField;
	public check0: fairygui.GButton;
	public tabArr: TabButton[] = [];
	private hornImg: fairygui.GImage;

	public static URL: string = "ui://fx4pr5qemtzm0";

	public constructor() {
		super();
		this.setSkin("chat", "chat_atlas0", "View_Chat_Panel");
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(ChatItem.URL, ChatItem);
		fairygui.UIObjectFactory.setPackageItemExtension(ChatRoleHead.URL, ChatRoleHead);
		fairygui.UIObjectFactory.setPackageItemExtension(ChatWuJiangSkillS.URL, ChatWuJiangSkillS);
		fairygui.UIObjectFactory.setPackageItemExtension(ItemSHJXC.URL, ItemSHJXC);
		fairygui.UIObjectFactory.setPackageItemExtension(ChatShaoZhuSkillGrid.URL, ChatShaoZhuSkillGrid);
		fairygui.UIObjectFactory.setPackageItemExtension(ChatLabelItem.URL, ChatLabelItem);
	}

	protected initView(): void {
		super.initView();
		let self = this;
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.renderHandler;
		self.list.setVirtual();
		self.list1.callbackThisObj = self;
		self.list1.itemRenderer = self.sysRenderHandler;
		self.list1.setVirtual();
		for (let i = 0; i < 16; i++) {
			let faceBt0 = self["faceBt" + i];
			faceBt0.data = i;
			faceBt0.icon = CommonManager.getUrl("chat", (i + 1) + "");
			faceBt0.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.sendFace, this)
			self.faceBtArr.push(faceBt0);
			if (i < 3) {
				let tab = self["tab" + i];
				tab.data = i;
				tab.addClickListener(self.OnTab, self);
				self.tabArr.push(tab);
			}
		}
		self.check0.selected = false;
		self.blackListLb.text = HtmlUtil.createLink("查看黑名单");
		self.msgLb.maxLength = 30;
		if (Model_GlobalMsg.kaifuDay <= 7) {
			GGlobal.control.listen(Enum_MsgType.KAIFUDAY_UPDATE, self.updateTab, self);
			self.updateTab();
		}
	}

	private sysRenderHandler(index: number, obj: ChatLabelItem) {
		obj.show(this.sysChatArr[index]);
	}

	public updateTab() {
		if (Model_GlobalMsg.kaifuDay > 7) {
			this.tabArr[0].visible = true;
			this.tabArr[1].setXY(134, 924);
			this.tabArr[2].setXY(254, 924);
			GGlobal.control.remove(Enum_MsgType.KAIFUDAY_UPDATE, this.updateTab, this);
		} else {
			this.tabArr[0].visible = false;
			this.tabArr[1].setXY(14, 924);
			this.tabArr[2].setXY(134, 924);
		}
	}

	private textChange() {
		let a = this;
		a.msgLb.requestFocus();
		a.msgLb.text = a.msgLb.text.replace(/[\r\n]/g, "");
		if (a.msgLb.text.length > 30) {
			a.msgLb.text = a.msgLb.text.substr(0, 30);
		}
	}

	private OnBlackList(evt: egret.TextEvent) {
		evt.stopPropagation();
		GGlobal.layerMgr.open(UIConst.CHAT_BLACKLIST);
	}

	private OnChange2() {
		let a = this;
		a.blackGroup.visible = false;
		a.faceGroup.visible = false;
		if (a.c2.selectedIndex == 1) {
			a.faceGroup.visible = true;
			GGlobal.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, a.OnStageHandler, a);
		} else if (a.c2.selectedIndex == 2) {
			a.blackGroup.visible = true;
		}
	}

	private OnStageHandler() {
		let a = this;
		if (a.c2.selectedIndex == 1) a.c2.selectedIndex = 0;
		GGlobal.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, a.OnStageHandler, a);
	}

	private OnChange() {
		let a = this;
		a.updateShow();
		if (a.list.numItems > 0) {
			a.list.scrollToView(a.list.numItems - 1, false, true);
		}
	}

	private checkTime = -15000;
	private OnCheck(evt: egret.TouchEvent) {
		let a = this;
		let nowTime = egret.getTimer();
		if (nowTime - a.checkTime <= 15 * 1000) {
			ViewCommonWarn.text("15秒内不得反复设置屏蔽");
			a.check0.selected = Model_Chat.checkSel;
			return;
		}
		a.checkTime = nowTime;
		Model_Chat.checkSel = a.check0.selected;
		a.updateShow();
		if (a.list.numItems > 0) {
			a.list.scrollToView(a.list.numItems - 1, false, true);
		}
	}

	private OnSheZhi() {
		let a = this;
		if (a.c2.selectedIndex == 2) {
			a.c2.selectedIndex = 0;
		} else {
			a.c2.selectedIndex = 2;
		}
	}

	public static sendTime = 0;
	private OnSend() {
		let a = this;
		if (a.msgLb.text == "控制台") {
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "../loginjs/vconsole.min.js";
			document.getElementsByTagName('head')[0].appendChild(script);
			script.onload = function () { eval("var vconsole = new VConsole();") }
			a.msgLb.text = "";
			return;
		}

		if (!this.checkChatCdt()) {
			return;
		}
		let vipcfg = Config.VIP_710[Model_player.voMine.viplv + 1];
		let cfg1 = Config.xtcs_004[2501];
		if (vipcfg && vipcfg.LIAOTIAN == 1) {

		} else {
			if (Model_Chat.hornNum >= cfg1.num) {
				ViewCommonWarn.text("需要等级达到100级且VIP等级达到16");
				return;
			}
		}
		if (a.msgLb.text) {
			let nowTime = egret.getTimer();
			if (View_Chat_Panel.sendTime != 0 && nowTime - View_Chat_Panel.sendTime < 10 * 1000) {
				ViewCommonWarn.text("发言需间隔10秒");
				return;
			}
			if (!vipcfg || (vipcfg && vipcfg.LIAOTIAN != 1)) Model_Chat.hornNum++;
			GGlobal.modelchat.CG_SEND_CHAT_CONTENT(a.c1.selectedIndex + 1, a.msgLb.text)
			a.msgLb.text = "";
		} else {
			ViewCommonWarn.text("输入的内容不得为空");
		}
	}

	private checkChatCdt() {
		let chatlv = ConfigHelp.getSystemNum(2504);
		let vip = ConfigHelp.getSystemNum(9913);
		if ((Model_player.voMine.id <= vip || Model_LunHui.realLv < chatlv) && !GGlobal.main.getWhiteState()) {
			ViewCommonWarn.text("需达到" + chatlv + "级或者VIP" + vip + "才可发言");
			return false;
		}
		return true;
	}

	private curTab: TabButton;
	private isFirstOpen1: boolean = true;
	private isFirstOpen2: boolean = true;
	private OnTab(event: egret.TouchEvent) {
		let a = this;
		let tab = event.target as TabButton;
		if (a.curTab.data == tab.data) return;
		switch (tab.data) {
			case 0:
				break;
			case 1:
				if (a.isFirstOpen1) {
					a.isFirstOpen1 = false;
					GGlobal.modelchat.CG_OPEN_CHAT(2);
				}
				break;
			case 2:
				if (Model_player.voMine.country <= 0) {
					ViewCommonWarn.text("请先加入国家");
					tab.selected = false;
					return;
				}
				if (a.isFirstOpen2) {
					a.isFirstOpen2 = false;
					GGlobal.modelchat.CG_OPEN_CHAT(3);
				}
				break;
		}
		if (a.curTab) a.curTab.selected = false;
		a.c1.selectedIndex = tab.data;
		a.tabArr[a.c1.selectedIndex].selected = true;
		a.curTab = a.tabArr[a.c1.selectedIndex];
	}

	private sendFace(evt: egret.TouchEvent) {
		let a = this;
		evt.stopPropagation();
		let vipcfg = Config.VIP_710[Model_player.voMine.viplv + 1];
		let cfg = Config.xtcs_004[2501];
		let nowTime = egret.getTimer();
		if (View_Chat_Panel.sendTime != 0 && nowTime - View_Chat_Panel.sendTime < 10 * 1000) {
			ViewCommonWarn.text("发言需间隔10秒");
			return;
		}
		if (vipcfg && vipcfg.LIAOTIAN == 1) {
		} else {
			if (Model_Chat.hornNum >= cfg.num) {
				ViewCommonWarn.text("今天发言次数已用尽,VIP4可无限制聊天");
				return;
			}
			Model_Chat.hornNum++;
		}
		let num = evt.target.data;
		let code = '[e:' + num + ':e]';
		GGlobal.modelchat.CG_SEND_CHAT_CONTENT(a.c1.selectedIndex + 1, code);
		a.c2.selectedIndex = 0;
	}

	private OnFace(evt: egret.TouchEvent) {
		evt.stopPropagation();
		let a = this;
		if (!this.checkChatCdt()) {
			return;
		}
		if (a.c2.selectedIndex == 1) {
			a.c2.selectedIndex = 0;
		} else {
			a.c2.selectedIndex = 1;
		}
	}

	private renderHandler(index: number, obj: fairygui.GObject) {
		let a = this;
		let item = obj as ChatItem;
		let vo: Vo_Chat = a.chatArr[index]
		item.show(vo);
	}

	private chatArr = [];
	private sysChatArr = [];
	public updateShow() {
		let a = this;
		if (!Model_Chat.chatArr[a.c1.selectedIndex]) Model_Chat.chatArr[a.c1.selectedIndex] = [];
		let ret = a.list.getFirstChildInView() >= a.list.numItems - 5;
		let len = Model_Chat.chatArr[a.c1.selectedIndex].length;
		a.chatArr = [];
		a.sysChatArr = [];
		let vo: Vo_Chat = new Vo_Chat();
		vo.type = 1;
		vo.id = 0;
		vo.content = "亲爱的主公" + HtmlUtil.fontNoSize(Model_player.voMine.name, Color.getColorStr(2)) + "，欢迎来到" + GameConfig.gameName;
		a.sysChatArr.push(vo);
		if (Model_Chat.checkSel) {
			for (let i = 0; i < len; i++) {
				let vo: Vo_Chat = Model_Chat.chatArr[a.c1.selectedIndex][i];
				if (vo.id == 0) {
					a.sysChatArr.push(vo);
				} else {
					if (vo.level >= Config.xtcs_004[2502].num || vo.id == Model_player.voMine.id) {
						a.chatArr.push(vo);
					}
				}
			}
		} else {
			for (let i = 0; i < len; i++) {
				let vo: Vo_Chat = Model_Chat.chatArr[a.c1.selectedIndex][i];
				if (vo.id == 0) {
					a.sysChatArr.push(vo);
				} else {
					a.chatArr.push(vo);
				}
			}
		}
		a.list.numItems = a.chatArr.length;
		if (a.list.numItems > 0 && ret) {
			a.list.scrollToView(a.list.numItems - 1, false, true);
		}
		let ret1 = a.list1.getFirstChildInView() >= a.list1.numItems - 3;
		a.list1.numItems = a.sysChatArr.length;
		if (a.list1.numItems > 0 && ret1) {
			a.list1.scrollToView(a.list1.numItems - 1, false, true);
		}

		let vipcfg = Config.VIP_710[Model_player.voMine.viplv + 1];
		if (vipcfg && vipcfg.LIAOTIAN == 1) {
			a.hornImg.visible = a.prohibitLb.visible = false;
		} else {
			let cfg = Config.xtcs_004[2501];
			a.prohibitLb.text = (cfg.num - Model_Chat.hornNum) + "";
			a.hornImg.visible = a.prohibitLb.visible = true;
		}
	}

	protected onShown(): void {
		let a = this;
		a.c2.selectedIndex = 0;
		if (a._args) {
			a.c1.selectedIndex = a._args;
		} else {
			if (Model_GlobalMsg.kaifuDay > 7) {
				a.c1.selectedIndex = 0;
			} else {
				a.c1.selectedIndex = 1;
			}
		}
		a.updateShow();
		if (a.curTab) a.curTab.selected = false;
		a.tabArr[a.c1.selectedIndex].selected = true;
		a.curTab = a.tabArr[a.c1.selectedIndex];
		a.registerEvent(true);
	}

	private onFocusOut() {
		(window as any).scrollTo(0, 0);
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;

		EventUtil.register(pFlag, self.faceBt, egret.TouchEvent.TOUCH_TAP, self.OnFace, self);
		EventUtil.register(pFlag, self.sendBt, egret.TouchEvent.TOUCH_TAP, self.OnSend, self);
		EventUtil.register(pFlag, self.shezhiBt, egret.TouchEvent.TOUCH_TAP, self.OnSheZhi, self);
		EventUtil.register(pFlag, self.check0, egret.TouchEvent.TOUCH_TAP, self.OnCheck, self);
		EventUtil.register(pFlag, self.c1, fairygui.StateChangeEvent.CHANGED, self.OnChange, self);
		EventUtil.register(pFlag, self.c2, fairygui.StateChangeEvent.CHANGED, self.OnChange2, self);
		EventUtil.register(pFlag, self.msgLb, egret.Event.CHANGE, self.textChange, self);
		EventUtil.register(pFlag, self.blackListLb, egret.TextEvent.LINK, self.OnBlackList, self);

		GGlobal.control.register(pFlag, Enum_MsgType.CHAT, self.updateShow, self);
		if (PlatformManager.isTanWan && GGlobal.loginArg && GGlobal.loginArg.os == "ios") {
			EventUtil.register(pFlag, self.msgLb, egret.FocusEvent.FOCUS_OUT, self.onFocusOut, self);
		}
		GGlobal.control.register(pFlag, Enum_MsgType.CHAT_LONG_CLICK, self.longClick, self);
	}

	private longClick(vo: Vo_Chat) {
		let t = this;
		let str = t.msgLb.text
		t.msgLb.text = str + "@" + vo.name + "\t";

	}

	protected onHide(): void {
		let a = this;
		a.list.numItems = 0;
		a.list1.numItems = 0;
		a.registerEvent(false);
	}
}