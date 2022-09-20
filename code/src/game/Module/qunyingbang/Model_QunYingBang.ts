class Model_QunYingBang extends BaseModel {
	public constructor() {
		super();
	}

	day;
	myRank;
	score;
	rankDta;
	awardID;

	// rankLastDta;
	// myLastRank;
	// myLastScore;

	public static getLibByID(rk) {
		let r;
		let l = Config.qyrank_235;
		for (var i in l) {
			let cds = JSON.parse(l[i].rank)[0];
			if (rk >= cds[0] && rk <= cds[1]) {
				r = l[i];
				break;
			}
		}
		return r;
	}

	public listenServ(m: WebSocketMgr) {
		let s = this;
		s.socket = m;

		m.regHand(2192, s.GC_OPEN, s);
		m.regHand(2194, s.GC_LINGQU, s);
		m.regHand(2196, s.GC_SHUAXIN, s);
		m.regHand(2198, s.GC_LAST_2198, s);
	}

	public CG_OPEN() {
		this.sendSocket(2191, this.getBytes());
	}

	/**
	 *B-I-I-[I-L-U-I-I-I]-I
	 * 群英榜界面数据 B:周几I:自己排名I:积分[I:排名L:玩家idU:玩家名I:积分I:头像I:头像框]排行数据I:已领取的积分奖励项id
	*/
	private GC_OPEN(m: Model_QunYingBang, d: BaseBytes) {
		m.day = d.readByte();
		m.myRank = d.readInt();
		m.score = d.readInt();
		let len = d.readShort();
		m.rankDta = [];
		for (let i = 0; i < 100; i++) {
			if (i < len) {
				m.rankDta.push([d.readInt(), d.readLong(), d.readUTF(), d.readInt(), d.readInt(), d.readInt()]);
			} else {
				m.rankDta.push([i + 1, 0, "虚位以待", 0, 0, 0]);
			}
		}
		m.awardID = d.readInt();
		GGlobal.control.notify(Enum_MsgType.QUNYINGBANG);
	}
	//打开上期排名界面
	public CG_LAST_2197() {
		this.sendSocket(2197, this.getBytes());
	}

	/**
	 * 打开上期排名界面返回 [I:排名L:玩家idU:玩家名I:积分I:头像I:头像框]上期排行数据I:自己排名,不在榜上为0I:积分
	*/
	private GC_LAST_2198(m: Model_QunYingBang, d: BaseBytes) {
		let len = d.readShort();
		m.rankDta = [];
		for (let i = 0; i < 100; i++) {
			if (i < len) {
				m.rankDta.push([d.readInt(), d.readLong(), d.readUTF(), d.readInt(), d.readInt(), d.readInt()]);
			} else {
				m.rankDta.push([i + 1, 0, "虚位以待", 0, 0, 0]);
			}
		}
		m.myRank = d.readInt();
		m.score = d.readInt();
		m.day = d.readByte();
		GGlobal.control.notify(Enum_MsgType.QUNYINGBANG_LAST);
	}


	public CG_LINGQU(I) {
		let ba = this.getBytes();
		ba.writeInt(I);
		this.sendSocket(2193, ba);
	}

	/**
	 *	B-I
	 * 领取积分奖励结果 B:0：失败，1：成功I:失败：错误码，成功：奖励项id
	*/
	private GC_LINGQU(m: Model_QunYingBang, d: BaseBytes) {
		let r = d.readByte();
		let i = d.readInt();
		if (r == 1) {
			m.awardID = i;
			GGlobal.control.notify(Enum_MsgType.QUNYINGBANG);
		} else {
			ViewCommonWarn.text("领取失败");
		}
	}


	public CG_SHUAXIN() {
		if(egret.getTimer() - this.lastTime >0){
			this.sendSocket(2195, this.getBytes());
		}else{
			ViewCommonWarn.text("2分钟内只可刷新一次");
		}
	}

	/**
	 *	I-[I-L-U-I-I-I]
	 * 排行榜数据返回 I:自己的排名[I:排名L:玩家idU:玩家名称I:玩家积分I:玩家头像I:玩家头像框]排行数据
	*/
	public lastTime=0;
	private GC_SHUAXIN(m: Model_QunYingBang, d: BaseBytes) {
		m.lastTime = egret.getTimer()+120000;
		m.myRank = d.readInt();
		let len = d.readShort();
		m.rankDta = [];
		for (let i = 0; i < 100; i++) {
			if (i < len) {
				m.rankDta.push([d.readInt(), d.readLong(), d.readUTF(), d.readInt(), d.readInt(), d.readInt()]);
			} else {
				m.rankDta.push([i + 1, 0, "虚位以待", 0, 0, 0]);
			}
		}
		GGlobal.control.notify(Enum_MsgType.QUNYINGBANG);
	}
}