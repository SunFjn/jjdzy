class ModelGuanQiaHelp extends BaseModel {
	public constructor() {
		super();
	}

	hasSuprise = 0;//是否有金甲兵
	teamerid = 0;//队友ID
	curGuanQiaLv = 0;
	public listenServ(wsm: WebSocketMgr) {
		let s = this;
		this.socket = wsm;
		wsm.regHand(5902, s.GC_5902_HELP, s);
		wsm.regHand(5904, s.GC_5904_NOTICE, s);
		wsm.regHand(5906, s.GC_5906_READY, s);
		wsm.regHand(5908, s.GC_5908_BATTLE, s);
		wsm.regHand(5910, s.GC_5910_DEAD, s);
		wsm.regHand(5912, s.GC_5912_UPDATE, s);
		wsm.regHand(5914, s.GC_5914_BOSSHP, s);
		wsm.regHand(5916, s.GC_5916_EXITE, s);
		wsm.regHand(5918, s.GC_5918_UPDATE, s);
	}

	public CG_5901_HELP() {
		let ba = this.getBytes();
		this.sendSocket(5901, ba);
	}

	//同意协助关卡 L:需要协助玩家idI:关卡数
	public CG_5905_READY(id, gq) {
		let ba = this.getBytes();
		ba.writeLong(id);
		ba.writeInt(gq);
		this.sendSocket(5905, ba);
	}

	//通知后端是否可以开启战斗 B:状态1成功
	public CG_5907_BATTLE(id) {
		let ba = this.getBytes();
		ba.writeLong(id);
		this.sendSocket(5907, ba);
	}
	public CG_5915_EXITE() {
		let ba = this.getBytes();
		ba.writeLong(this.roomID);
		this.sendSocket(5915, ba);
	}

	/**
	 * 5902 B
	 * 广播邀请协助返回 B:结果 1成功,2已无求助次数,3求助CD中,4已通关该关卡
	 * **/
	private GC_5902_HELP(m: ModelGuanQiaHelp, ba: BaseBytes) {
		let ret = ba.readByte();
		let str = "发送成功";
		let arr = ["", "发送成功", "已无求助次数", "求助CD中", "击杀小怪波数不足", "请先前往下一关", "正在战斗中"];
		if (ret) {
			str = arr[ret]
		}
		ViewCommonWarn.text(str);
	}
	/**
	 * 5904 I-U-L
	 * 广播其他玩家信息 I:关卡数U:需要协助玩家名字L:玩家id
	 * **/
	private GC_5904_NOTICE(m: ModelGuanQiaHelp, ba: BaseBytes) {
		let guanqia = ba.readInt();
		let name = ba.readUTF();
		let id = ba.readLong();
		let str = "[color=#15f234]" + name + "[/color]向大神求助,帮其通关 [color=#ed1414]关卡第" + guanqia + "关[/color] ";
		let link = HtmlUtil.createLink("[color=#15f234]【点击帮助】[/color]", true, "guanqia");
		str = str + link;
		GGlobal.modelchat.addChatByClient(Model_Chat.SYSTEM, 0, str, id + "_" + guanqia);
	}
	/**
	 * 5906 L
	 * 开始战斗前返回 B:返回状态1成功,其他
	 * **/
	public roomID = 0;
	private GC_5906_READY(m: ModelGuanQiaHelp, ba: BaseBytes) {
		let id = ba.readLong();
		m.roomID = id;
		if (GGlobal.sceneType != SceneCtrl.GUANQIA) {
			if (id > 0) m.CG_5907_BATTLE(id * -1);
			return;
		}
		if (id > 0) {
			m.CG_5907_BATTLE(id);
		}
		let tips = ["", "求助者已通关该关卡", "该求助已超时", "求助者在副本中", "需通关该关卡", "帮助次数不足", "求助者不在线","求助者不在线"];
		let idx = id * -1;
		if (tips[idx]) {
			ViewCommonWarn.text(tips[idx]);
		}
	}
	/**
	 * 5908 B-B-L
	 * 返回是否开启战斗 B:状态1成功B:是否有金甲兵0无1有
	 * **/
	private GC_5908_BATTLE(m: ModelGuanQiaHelp, ba: BaseBytes) {
		let ret = ba.readByte();
		if (ret == 1) {
			m.hasSuprise = ba.readByte();
			m.teamerid = ba.readLong();
			m.curGuanQiaLv = ba.readInt();
			GGlobal.mapscene.enterScene(SceneCtrl.GUANQIABOSS_HELP);
		} else if (ret == -1) {
			ViewCommonWarn.text("对方在副本里");
		} else if (ret == -2) {
			ViewCommonWarn.text("该求助已过期");
		}
	}
	/**
	 * 5910 L
	 * 死亡通知广播给其他人 L:角色ID
	 * **/
	private GC_5910_DEAD(m: ModelGuanQiaHelp, ba: BaseBytes) {
		let id = ba.readLong();
		GGlobal.control.notify(Enum_MsgType.GUANQIA_HELP_DEAD, id);
	}
	/**
	 * 5912 [L-L]
	 * 刷新队员气血 [L:玩家IDL:气血]队伍气血数据
	 * **/
	private GC_5912_UPDATE(m: ModelGuanQiaHelp, ba: BaseBytes) {
		let hps = [];
		let len = ba.readShort();
		for (let i = 0; i < len; i++) {
			hps.push([ba.readLong(), ba.readLong()]);
		}
		GGlobal.control.notify(Enum_MsgType.GUANQIA_HELP_PLAYER_HP, hps);
	}
	/**
	 * 5914 L-L
	 * 场景刷新数据 L:boss气血上限L:boss当前气血
	 * **/
	private GC_5914_BOSSHP(m: ModelGuanQiaHelp, ba: BaseBytes) {
		let opt: any = {};
		opt.maxHp = ba.readLong();
		opt.hp = ba.readLong();
		GGlobal.control.notify(Enum_MsgType.GUANQIA_HELP_BOSS_HP, opt);
	}
	/**
	 * 5916 L-U
	 *离开战斗返回 L:玩家idU:玩家名字
	 * **/
	private GC_5916_EXITE(m: ModelGuanQiaHelp, ba: BaseBytes) {
		let liveid = ba.readLong();
		GGlobal.control.notify(Enum_MsgType.GUANQIA_HELP_LEAVE, liveid);
	}

	private GC_5918_UPDATE(md: ModelGuanQiaHelp, ba: BaseBytes) {
		let m = GGlobal.modelGuanQia;
		m.curGuanQiaLv = ba.readInt();
		m.curWave = 0;

		GGlobal.control.notify(Enum_MsgType.MSG_GQ_UPDATE);
		GGlobal.control.notify(Enum_MsgType.MSG_WAVEUPDATE);
	}
}