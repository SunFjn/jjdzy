class ChatItem extends fairygui.GComponent {

	public headIcon: ChatRoleHead;
	public lookBt: fairygui.GButton;
	public excuseBt: fairygui.GButton;
	public nameLb: fairygui.GRichTextField;
	public contentLb: fairygui.GRichTextField;
	public titleIcon: fairygui.GLoader;

	public static URL: string = "ui://fx4pr5qeov4j2";
	public static createInstance(): ChatItem {
		return <ChatItem><any>(fairygui.UIPackage.createObject("chat", "ChatItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		s.headIcon = <ChatRoleHead><any>(s.getChild("headIcon"));
		s.excuseBt = <fairygui.GButton><any>(s.getChild("excuseBt"));
		s.nameLb = <fairygui.GRichTextField><any>(s.getChild("nameLb"));
		s.contentLb = <fairygui.GRichTextField><any>(s.getChild("contentLb"));
		s.contentLb.setXY(s.contentLb.x, s.contentLb.y - 5);
		s.titleIcon = <fairygui.GLoader><any>(s.getChild("titleIcon"));
		s.excuseBt.addClickListener(s.OnExcuse, s);
		s.headIcon.addClickListener(s.OnLook, s);
		s.contentLb.addEventListener(egret.TextEvent.LINK, s.linkHandler, s);

		s.headIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, s.longStart, s);
		s.headIcon.addEventListener(egret.TouchEvent.TOUCH_END, s.longEnd, s);
	}

	private linkTime: number = 0;
	private linkHandler(event: egret.TextEvent) {
		let s = this;
		if (event.text == "tujian") {
			GGlobal.layerMgr.open(UIConst.CHAT_TUJIAN, s.vo);
		} else if (event.text == "baowu" || event.text == "godWeapon") {
			GGlobal.layerMgr.open(UIConst.CHAT_BAOWU, s.vo);
		} else if (event.text == "wujiang") {
			GGlobal.layerMgr.open(UIConst.CHAT_WUJIANG, s.vo);
		} else if (event.text == "shjx") {
			GGlobal.layerMgr.open(UIConst.SHJXCHECKINFO, s.vo);
		} else if (event.text == "fuwen") {
			GGlobal.layerMgr.open(UIConst.BAZHENTU_SHOW, s.vo);
		} else if (event.text == "shaozhu") {
			GGlobal.layerMgr.open(UIConst.CHAT_SHAOZHU, s.vo);
		} else if (event.text == "yishou") {
			GGlobal.layerMgr.open(UIConst.CHAT_YISHOU, s.vo);
		} else if (event.text == "qice") {
			GGlobal.layerMgr.open(UIConst.CHAT_QICE, s.vo);
		} else if (event.text == "horse") {
			GGlobal.layerMgr.open(UIConst.CHAT_HORSE, s.vo);
		} else if (event.text == "maid") {
			GGlobal.layerMgr.open(UIConst.CHAT_MAID, s.vo);
		}
	}

	private OnLook() {
		let t = this;
		if (t.longBoo) {
			return;
		}
		GGlobal.layerMgr.open(UIConst.CHAT_LOOK, this.vo);
	}

	private OnExcuse() {
		if (Model_Chat.blackList.length >= Config.xtcs_004[2503].num) {
			ViewCommonWarn.text("黑名单已满");
			return;
		}
		ViewAlert.show("是否将该玩家加入黑名单并屏蔽聊天信息？", Handler.create(this, this.OnOk))
	}

	private OnOk() {
		GGlobal.modelchat.CG_CHAT_ADD_BLACKLIST(this.vo.id, this.vo.name);
	}

	private vo: Vo_Chat;
	private faceStr: string = "abcdefghijklmnopqrstuvwxyz";
	//GC广播聊天频道内容 
	public show(vo: Vo_Chat) {
		let s = this;
		s.vo = vo;
		s.nameLb.visible = true;
		s.headIcon.visible = true
		s.titleIcon.visible = true;
		let content = "";
		let cfg = Config.chenghao_702[vo.titleID];
		if (vo.showtype > 0) {
			let arr = vo.content.split("_");
			switch (vo.showtype) {
				case 1:
					let tjcfg = Config.picture_005[arr[0]];
					content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + tjcfg.name + "·图鉴】", Color.getColorStr(tjcfg.quality)), true, "tujian");
					break;
				case 2:
					let bwcfg = Config.bao_214[arr[0]];
					content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + bwcfg.name + "】", Color.getColorStr(bwcfg.pin)), true, "baowu");
					break;
				case 3:
					let bfcfg = Config.book_213[arr[0]];
					content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + bfcfg.name + "】", Color.getColorStr(bfcfg.pin)), true, "baowu");
					break;
				case 4:
					let ybcfg = Config.yb_217[arr[0]];
					content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + ybcfg.name + "】", Color.getColorStr(ybcfg.pin)), true, "baowu");
					break;
				case 5:
					let sjcfg = Config.sword_216[arr[0]];
					content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + sjcfg.name + "】", Color.getColorStr(sjcfg.pin)), true, "baowu");
					break;
				case 6:
					let zjcfg = Config.clothes_212[arr[0]];
					content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + zjcfg.name + "】", Color.getColorStr(zjcfg.pinzhi)), true, "baowu");
					break;
				case 7:
					let tscfg = Config.book_215[arr[0]];
					content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + tscfg.name + "】", Color.getColorStr(tscfg.pin)), true, "baowu");
					break;
				case 8:
					let wjcfg = Config.hero_211[arr[0]];
					content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + wjcfg.name + "】", Color.getColorStr(wjcfg.pinzhi)), true, "wujiang");
					break;
				case 9:
					let fuwen = Config.bztzf_261[arr[0]];
					content = HtmlUtil.createLink(ConfigHelp.createColorName("【" + fuwen.name + "】", fuwen.pz), true, "fuwen");
					break;
				case 10:
					let equip = Config.zhuangbei_204[arr[1]];
					content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【" + equip.n + "】", Color.getColorStr(equip.q)), true, "shjx");
					break;
				case 11:
					let shaozhu = Config.son_267[arr[1]];
					content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【少主·" + shaozhu.name + "】", Color.getColorStr(shaozhu.pz)), true, "shaozhu");
					break;
				case 12:
					let godWeapon = Config.sb_750[arr[0]];
					content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【神兵·" + godWeapon.name + "】", Color.getColorStr(godWeapon.pinzhi)), true, "godWeapon");
					break;
				case 13:
					let godWeaponBody = Config.sbpf_750[arr[0]];
					content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【神兵·" + godWeaponBody.mz + "】", Color.getColorStr(godWeaponBody.pz)), true, "godWeapon");
					break;
				case 14:
					let yishou = Config.ysl_752[arr[1]];
					let costArr = JSON.parse(yishou.jihuo);
					let itemVo: VoItem = VoItem.create(costArr[0][1]);
					content = HtmlUtil.createLink(HtmlUtil.fontNoSize("【异兽·" + yishou.mingzi + "】", Color.getColorStr(itemVo.quality)), true, "yishou");
					break;
				case 15:
					let qice = Config.qc_760[arr[0]];
					content = HtmlUtil.createLink(HtmlUtil.font("【奇策·" + qice.name + "】", Color.getColorStr(qice.pz)), true, "qice");
					break;
				case 16:
				case 18:
					let horse = Config.zq_773[arr[1]];
					content = HtmlUtil.createLink(HtmlUtil.font("【坐骑·" + horse.name + "】", Color.getColorStr(horse.quality)), true, "horse");
					break;
				case 17:
					let maid = Config.shinv_020[arr[0]];
					content = HtmlUtil.createLink(HtmlUtil.font("【" + maid.mingzi + "】", Color.getColorStr(maid.pinzhi)), true, "maid");
					break;
			}
			s.contentLb.font = "Microsoft YaHei";
		} else {
			let reg = /\[e:(\w+):e\]/g;
			if (reg.test(vo.content)) {//是表情
				var icon: string = vo.content.split(":")[1];
				s.contentLb.font = "ui://fx4pr5qeov4j13";
				content += s.faceStr.substr((parseInt(icon)), 1);
			} else {
				content += vo.content;
				s.contentLb.font = "Microsoft YaHei";
			}
			let aIdx = content.indexOf("@")
			if (aIdx != -1) {//是@头像
				let arr = content.split("@")
				let contentVal = ""
				for (let i = 0; i < arr.length; i++) {
					if (i == 0) {
						contentVal += arr[i]
						continue;
					}
					let strTX = arr[i]
					let bIdx = strTX.indexOf("\t")
					if (bIdx != -1) {
						let strTX1 = strTX.substr(0, bIdx);
						let strTX2 = strTX.substr(bIdx + 1);
						arr[i] = "[color=#00F234]" + strTX1 + "[/color]" + " " + strTX2
					}
					contentVal += "@" + arr[i]
				}
				content = contentVal
			}
		}
		s.contentLb.text = content;
		if (cfg && cfg.xianshi) {
			s.titleIcon.visible = true;
			ImageLoader.instance.loader(Enum_Path.TITLE_URL + cfg.picture + ".png", s.titleIcon);//此处会有一个BUG 不能用iconutl
		} else {
			s.titleIcon.visible = false;
		}
		if (vo.jinsheng > 1) {
			let cfg = Config.up_231[vo.jinsheng];
			if (vo.id == Model_player.voMine.id) {
				s.nameLb.text = HtmlUtil.fontNoSize(vo.name, Color.getColorStr(2)) + "    " + cfg.pin + cfg.name;
			} else {
				s.nameLb.text = vo.name + "    " + cfg.pin + cfg.name;
			}
		} else {
			if (vo.id == Model_player.voMine.id) {
				s.nameLb.text = HtmlUtil.fontNoSize(vo.name, Color.getColorStr(2))
			} else {
				s.nameLb.text = vo.name;
			}
		}
		s.headIcon.show(vo);
		s.excuseBt.visible = Model_player.voMine.id != vo.id;
	}


	//=============长按
	private longs
	private longBoo = false
	private longStart(e) {
		let t = this
		t.longBoo = false;
		t.longs = setTimeout(function () {
			t.longPress();
		}, 800);
	}

	private longEnd() {
		let t = this
		clearTimeout(t.longs);
	}

	private longPress() {
		let t = this
		t.longBoo = true;
		GGlobal.control.notify(Enum_MsgType.CHAT_LONG_CLICK, t.vo);
	}
}