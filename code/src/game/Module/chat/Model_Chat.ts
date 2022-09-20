class Model_Chat extends BaseModel {

	//系统
	public static SYSTEM = 1;

	public static chatArr = [];
	public static blackList = [];
	public static hornNum = 0;
	public static checkSel: boolean = false;
	public static selType: number = 0;
	public static chatContent: string = "";

	public static historyChatContentDic = [];
	/**451 聊天频道聊天 B:B(1跨服,2本服,3国家4系统)U:内容  */
	public CG_SEND_CHAT_CONTENT(type, content) {
		let warn = 0;
		let maxLen = Model_Chat.historyChatContentDic.length;
		if (content.length > 4 && maxLen > 0) {
			for (let i = 0; i < maxLen; i++) {
				let chatdStr = Model_Chat.historyChatContentDic[i];
				let pro = StringUtil.compare(content, chatdStr);
				if (pro > 50) {
					warn++;
				}
			}
			if (warn>0&&warn >= maxLen - 1){
				ViewCommonWarn.text("请不要发送重复文字");
				return;
			}
		}
		if (maxLen > 2) {
			Model_Chat.historyChatContentDic.shift();
		}
		Model_Chat.historyChatContentDic.push(content);
		let ba: BaseBytes = new BaseBytes();
		Model_Chat.selType = type;
		Model_Chat.chatContent = content;
		ba.writeByte(type);
		ba.writeUTF(content);
		this.sendSocket(451, ba);
	}

	/**459 CG 打开聊天界面获取数据 B:1跨服频道2本服频道3国家频道  */
	public CG_OPEN_CHAT(type) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(459, ba);
	}
	/**473 CG 添加黑名单 L:拉黑玩家U:名字   */
	public CG_CHAT_ADD_BLACKLIST(id, name) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeLong(id);
		ba.writeUTF(name);
		this.sendSocket(473, ba);
	}

	/**475 CG 取消拉黑 L:取消拉黑   */
	public CG_CHAT_REMOVE_BLACKLIST(id) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeLong(id);
		this.sendSocket(475, ba);
	}

	/**477 CG 打开黑名单    */
	public CG_CHAT_OPEN_BLACKLIST() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(477, ba);
	}

	/**481 B-I CG 聊天展示 B:类型（1图鉴2宝物3兵法4异宝5神剑6战甲7天书8武将9符文10兽灵装备展示11少主展示12专属神兵展示13专属神兵皮肤展示14异兽录展示15奇策展示18坐骑幻化展示）typeI:要展示的索引idindex*/
	public CG_CHAT_SHOW_DATA(type, ID) {
		let lv = Config.xtcs_004[2504].num;
		// if (Model_player.voMine.level < lv) {
		if (Model_LunHui.realLv < lv) {
			ViewCommonWarn.text("需要达到" + lv + "级才可展示")
			return;
		}
		let ba = new BaseBytes();
		ba.writeByte(type);
		ba.writeInt(ID);
		this.sendSocket(481, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(452, this.GC_SEND_CHAT_CONTENT, this);
		wsm.regHand(454, this.GC_CHAT_EXCUSE, this);
		wsm.regHand(456, this.GC_CHAT_BROADCAST, this);
		wsm.regHand(458, this.GC_CHAT_RESULT, this);
		wsm.regHand(460, this.GC_OPEN_CHAT, this);
		wsm.regHand(474, this.GC_CHAT_ADD_BLACKLIST, this);
		wsm.regHand(476, this.GC_CHAT_REMOVE_BLACKLIST, this);
		wsm.regHand(478, this.GC_CHAT_OPEN_BLACKLIST, this);
		wsm.regHand(480, this.GC_CHAT_SENDMSG_NUM, this);
		wsm.regHand(482, this.GC_CHAT_SHOW_DATA, this);
	}

	/**482	GC 聊天展示结果 B:0成功 1失败 */
	public GC_CHAT_SHOW_DATA(self: Model_Chat, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			ViewCommonWarn.text("展示成功");
		}
	}

	/**480 GC 通知次数 B:跨服聊天已经使用次数B:本服聊天已经使用次数B:国家聊天已经使用次数  */
	public GC_CHAT_SENDMSG_NUM(self: Model_Chat, data: BaseBytes) {
		Model_Chat.hornNum = data.readByte();
	}

	/**478 GC 打开黑名单 [L:玩家idU:玩家名字]  */
	public GC_CHAT_OPEN_BLACKLIST(self: Model_Chat, data: BaseBytes) {
		Model_Chat.blackList = [];
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let roleId = data.readLong();
			let roleName = data.readUTF();
			Model_Chat.blackList.push([roleId, roleName]);
		}
		GGlobal.control.notify(Enum_MsgType.CHAT_BLACKLIST);
	}

	/**476 GC 取消拉黑 B:0成功 1失败L:玩家id   */
	public GC_CHAT_REMOVE_BLACKLIST(self: Model_Chat, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			let roleId = data.readLong();
			for (let i = 0; i < Model_Chat.blackList.length; i++) {
				if (Model_Chat.blackList[i][0] == roleId) {
					Model_Chat.blackList.splice(i, 1);
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.CHAT_BLACKLIST);
		}
	}

	/**474 GC 添加黑名单返回 B:0成功1失败 2已经存在L:玩家id  */
	public GC_CHAT_ADD_BLACKLIST(self: Model_Chat, data: BaseBytes) {
		let result = data.readByte();
		if (result == 0) {
			let roleId = data.readLong();
			for (let i = 0; i < 3; i++) {
				let arr: Vo_Chat[] = Model_Chat.chatArr[i];
				if (arr) {
					for (let j = 0; j < arr.length; j++) {
						let chatVo: Vo_Chat = arr[j];
						if (chatVo.id == roleId) {
							arr.splice(j, 1);
							j--;
						}
					}
				}
			}
			GGlobal.control.notify(Enum_MsgType.CHAT);
		} else if (result == 2) {
			ViewCommonWarn.text("已存在");
		} else if (result == 3) {
			ViewCommonWarn.text("黑名单已达上限");
		}
	}

	/**460 GC 打开聊天界面信息 [B:频道L:玩家idU:名称B:vip等级I:头像idI:头像框idI:等级I:转生L:战斗力I:晋升B:国家I:将衔I:称号I:职业时装I:神兵B:是否展示typeU:内容I:轮回等级]聊天信息  */
	public GC_OPEN_CHAT(self: Model_Chat, data: BaseBytes) {
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let arr = data.readFmt(["B", "L", "U", "B", "I", "I", "I", "I", "L", "I", "B", "I", "I", "I", "I", "B", "U", "I", "I"]);
			let vo: Vo_Chat = new Vo_Chat();
			vo.type = arr[0];
			vo.id = arr[1];
			vo.name = arr[2];
			vo.vip = arr[3];
			vo.headId = arr[4];
			vo.frameId = arr[5];
			vo.level = arr[6];
			vo.zs = arr[7];
			vo.power = arr[8];
			vo.jinsheng = arr[9];
			vo.country = arr[10];
			vo.jx = arr[11];
			vo.titleID = arr[12];
			vo.fashion = arr[13];
			vo.godWeapon = arr[14];
			vo.showtype = arr[15];
			vo.content = arr[16];
			vo.lunhui = arr[17];
			vo.horseId = arr[18];
			if (i == 0) {
				Model_Chat.chatArr[vo.type - 1] = [];
			}
			if (Model_Chat.chatArr[vo.type - 1].length >= 30) Model_Chat.chatArr[vo.type - 1].shift();
			Model_Chat.chatArr[vo.type - 1].push(vo);
		}
		GGlobal.control.notify(Enum_MsgType.CHAT);
	}

	/**458 GC 聊天结果 成功推送452 B:1：成功，2：还没到等级，3：聊天内容过长 4：时间冷却中 5：已到聊天次数上限 6：不够元宝，7：敏感字B:下次发言剩余时间  */
	public GC_CHAT_RESULT(self: Model_Chat, data: BaseBytes) {
		let ret = data.readByte();
		let str = "";
		switch (ret) {
			case 1:
				View_Chat_Panel.sendTime = egret.getTimer();
				break;
			case 2:
				str = "还没到等级";
				break;
			case 3:
				str = "聊天内容过长";
				break;
			case 4:
				str = "时间冷却中";
				break;
			case 5:
				str = "已到聊天次数上限";
				break;
			case 6:
				str = "不够元宝";
				break;
			case 8:
				str = "服务器维护中，请稍后再拨。";
				break;
			case 9:
				str = "请勿发送重复内容";
				break;
		}
		if (str) ViewCommonWarn.text(str);
	}

	/**456 GC广播 I:广播编号U:参数集合  */
	public GC_CHAT_BROADCAST(self: Model_Chat, data: BaseBytes) {
		var id = data.readInt();
		var param = data.readUTF();
		self.addNotice(true, id, param);
	}

	/**454 禁言返回 B:B(0：否 1：是 2：自己能看到自己发言但是别人看不到 )  */
	public GC_CHAT_EXCUSE(self: Model_Chat, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			ViewCommonWarn.text("您已被禁言");
		} else if (result == 2) {
			let vomine = Model_player.voMine;
			let vo: Vo_Chat = new Vo_Chat();
			vo.type = Model_Chat.selType;
			vo.id = vomine.id;
			vo.headId = Model_Setting.headId;
			vo.frameId = Model_Setting.frameId;
			vo.level = vomine.level;
			vo.power = vomine.str;
			vo.jinsheng = vomine.jinsheng;
			vo.zs = vomine.zsID;
			vo.country = vomine.country;
			vo.jx = vomine.jiangXian;
			vo.name = vomine.name;
			vo.vip = vomine.viplv;
			vo.godWeapon = vomine.godWeapon;
			vo.fashion = vomine._shiZhuang;
			vo.content = Model_Chat.chatContent;
			vo.horseId = vomine.horseId;
			if (!Model_Chat.chatArr[vo.type - 1]) {
				Model_Chat.chatArr[vo.type - 1] = [];
			}
			Model_Chat.chatArr[vo.type - 1].push(vo);
			GGlobal.control.notify(Enum_MsgType.CHAT);
		}
	}

	/**452 GC广播聊天频道内容 B:(1跨服,2本服,3国家4系统)L:玩家idI:头像idI:头像框idI:等级L:战斗力I:晋升I:转生B:国家I:将衔I:称号U:名字B:vip
	 * I:职业时装I:神兵B:是否展示（0不是展示1图鉴2宝物3兵法4异宝5神剑6战甲7天书8武将）U: 内容I:轮回等级  */
	public GC_SEND_CHAT_CONTENT(self: Model_Chat, data: BaseBytes) {
		let arr = data.readFmt(["B", "L", "I", "I", "I", "L", "I", "I", "B", "I", "I", "U", "B", "I", "I", "B", "U", "I", "I"]);
		let vo: Vo_Chat = new Vo_Chat();
		vo.type = arr[0];
		vo.id = arr[1];
		vo.headId = arr[2];
		vo.frameId = arr[3];
		vo.level = arr[4];
		vo.power = arr[5];
		vo.jinsheng = arr[6];
		vo.zs = arr[7];
		vo.country = arr[8];
		vo.jx = arr[9];
		vo.titleID = arr[10]
		vo.name = arr[11];
		vo.vip = arr[12];
		vo.fashion = arr[13];
		vo.godWeapon = arr[14]
		vo.showtype = arr[15];
		vo.content = arr[16];
		vo.lunhui = arr[17];
		vo.horseId = arr[18];
		if (!Model_Chat.chatArr[vo.type - 1]) {
			Model_Chat.chatArr[vo.type - 1] = [];
		}
		Model_Chat.chatArr[vo.type - 1].push(vo);
		GGlobal.control.notify(Enum_MsgType.CHAT);
	}

	/**增加公告 */
	public addNotice(isnotify: boolean, id: number, arg?: any): void {
		if (!Config.tishi_703) return;
		if (id == 0 && arg) {
			ViewBroadcastText.showMsg(arg);
			return;
		}
		if (!Config.tishi_703[id]) {
			return;
		}

		var info = Config.tishi_703[id];
		var paramCall: string = info.key;
		var type: number = info.leixing;
		let content = BroadCastManager.repText(info.content, arg, paramCall);
		if (type == 4) {
			this.showSysChat(content, arg);
			var vo = new Vo_Chat();
			vo.id = id;
			vo.content = content;
			ViewBroadcastText.showMsg(vo.content);
		} else if (type == 1) {
			this.showSysChat(content, arg);
		} else {
			var vo = new Vo_Chat();
			vo.id = id;
			vo.content = content;
			ViewBroadcastText.showMsg(vo.content);
		}
	}

	public addChatByClient(type, id, content, paramCall) {
		let vo: Vo_Chat = new Vo_Chat();
		vo.type = 1;
		vo.id = 0;
		vo.content = content;
		vo.paramCall = paramCall;
		if (type == Model_Chat.SYSTEM && Model_GlobalMsg.kaifuDay > 7) {
			if (!Model_Chat.chatArr[0]) {
				Model_Chat.chatArr[0] = [];
			}
			Model_Chat.chatArr[0].push(vo);
		}
		if (!Model_Chat.chatArr[type]) {
			Model_Chat.chatArr[type] = [];
		}
		Model_Chat.chatArr[type].push(vo);
		GGlobal.control.notify(Enum_MsgType.CHAT);
	}

	private showSysChat(content: string, paramCall: any) {
		let vo: Vo_Chat = new Vo_Chat();
		vo.type = 1;
		vo.id = 0;
		vo.content = content;
		vo.paramCall = paramCall;

		if (Model_GlobalMsg.kaifuDay > 7) {
			if (!Model_Chat.chatArr[0]) {
				Model_Chat.chatArr[0] = [];
			}
			Model_Chat.chatArr[0].push(vo);
		}
		if (!Model_Chat.chatArr[1]) {
			Model_Chat.chatArr[1] = [];
		}
		Model_Chat.chatArr[1].push(vo);
		GGlobal.control.notify(Enum_MsgType.CHAT);
	}
}