class ModelJBP extends BaseModel {
	public constructor() {
		super();
	}
	//购买的VIP礼包数据
	packDta;
	actDta;//[st sortIndex, index]
	mapDta;//a.type.index=st;
	red: Object;
	day;
	public setRedState() {
		let r = false;
		let s = this;
		let packDta = s.packDta;
		let mvip = Model_player.voMine.viplv;
		s.red = [false, false, false, false];
		for(let i =1; i < 5; i ++){
			if(packDta.indexOf(i)>-1){
				continue;
			}
			let cfg = Config.jbpbuy_718[i];
			let vip = cfg.VIP;
			if(mvip >= vip){
				s.red[i - 1] = true;
			}
		}
		if (s.packDta.length == 0) return false;
		for (let i = 0; i < s.packDta.length; i++) {
			let type = s.packDta[i];
			let index = type -1;
			let arr = s.actDta[index];
			for (let j = 0; j < arr.length; j++) {
				if (arr[j][0] == 1) {
					s.red[index] = true;
					break;
				}
			}
			arr.sort(function (a,b){
				return a[1]<b[1]?-1:1;
			});
		}
	}

	public checkMain() {
		if (!this.red) return false;
		for (let i in this.red) {
			if (this.red[i] == true) return true;
		}
		return false;
	}

	public listenServ(mgr: WebSocketMgr) {
		let s = this;
		s.socket = mgr;
		mgr.regHand(2082, s.GC_OPEN, s);
		mgr.regHand(2084, s.GC_BUY, s);
		mgr.regHand(2086, s.GC_GET, s);
	}

	public CG_OPEN() {
		this.sendSocket(2081, this.getBytes());
	}

	/**2082 [B]-[B-[B]]-I-I-I-L-I
	 * 打开界面返回 [B:购买的礼包id]购买礼包列表[[B:登录返利奖励状态0未达成1可领取2已领取]登录返利奖励状态列表[B:闯关返利奖励状态]
	 * 闯关返利奖励状态列表[B:等级返利奖励状态]等级返利奖励状态列表[B:成长返利奖励状态]成长返利奖励状态列表]奖励状态列表I:累计登录天数I:关卡I:等级L:战力I:vip等级
	*/
	private GC_OPEN(s: ModelJBP, d: BaseBytes) {
		s.packDta = [];
		s.actDta = [];
		s.mapDta = {};
		let len1 = d.readShort();
		for (let i = 0; i < len1; i++) {
			s.packDta.push(d.readByte());
		}

		let len = d.readShort();
		for (let i = 0; i < len; i++) {
			let t = [];
			let tp = d.readByte();
			let len1 = d.readShort();
			s.mapDta[tp] = [];
			for (let i = 0; i < len1; i++) {
				let st = d.readByte();
				let sortIndex=i;
				if(st == 2)
					sortIndex = i+st*100;
				else if(st == 1)
					sortIndex = i-st*100;
				let a1 =[st,sortIndex, i];
				t.push(a1);
				s.mapDta[tp][i+1] = a1;
			}
			s.actDta.push(t);
		}
		s.day = d.readInt();
		s.setRedState();
		GGlobal.control.notify(Enum_MsgType.JUBAOPENG);
	}

	//购买礼包 B:礼包类型
	public CG_BUY(b) {
		let ba = this.getBytes();
		ba.writeByte(b);
		this.sendSocket(2083, ba);
	}

	/**2084 B-B
	 * 购买礼包返回 B:状态，0：礼包不存在，1：成功，2：vip等级不满足，3：元宝不足，4：不能重复购买B:购买的礼包类型
	*/
	private GC_BUY(s: ModelJBP, d: BaseBytes) {
		let r = d.readByte();
		if (r == 1) {
			let id = d.readByte();
			s.packDta.push(id);
			s.setRedState();
			GGlobal.control.notify(Enum_MsgType.JUBAOPENG);
		} else {
			let txt;
			if (r == 0) txt = "礼包不存在";
			else if (r == 2) txt = "vip等级不满足";
			else if (r == 3) txt = "元宝不足";
			else if (r == 4) txt = "不能重复购买";
		}
	}

	//领取奖励 I:奖励id，为配置表奖励id
	public CG_GET(i) {
		let ba = this.getBytes();
		ba.writeInt(i);
		this.sendSocket(2085, ba);
	}

	/**2086 B-I
	 * 领取奖励返回 B:状态，0：奖励不存在，1：成功，2：未达到条件，3：不可重复领取，4：礼包未购买，不能领取I:领取的奖励id
	*/
	private GC_GET(s: ModelJBP, d: BaseBytes) {
		let r = d.readByte();
		if (r == 1) {
			let id = d.readInt();
			let type = (id / 1000) >> 0;
			let index = id % 1000;
			s.mapDta[type][index][0] = 2;
			s.mapDta[type][index][1] = index+200;
			s.setRedState();
			GGlobal.control.notify(Enum_MsgType.JUBAOPENG);
		} else {
			var txt;
			if (r == 0) txt = "奖励不存在";
			else if (r == 2) txt = "未达到条件";
			else if (r == 3) txt = "不可重复领取";
			else if (r == 4)
				txt = "礼包未购买，不能领取";
			ViewCommonWarn.text(txt);
		}
	}
}