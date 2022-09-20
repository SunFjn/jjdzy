class Model_ActComJRSC extends BaseModel {
	public constructor() {
		super();
	}
	static OPENUI = "openui"
	static FRESH_ZHE = "fresh_zhe"
	static FRESH_ITEM = "fresh_item"

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		let self = this;
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(10800, self.GC_OPENUI_10800, self);
		mgr.regHand(10802, self.GC_REFRESH_10802, self);
		mgr.regHand(10804, self.GC_REFRESH_ZHE_10804, self);
		mgr.regHand(10806, self.GC_BUY_10806, self);
	}

	static ITEM_ID = 416034//刷新道具id

	shopArr: { id: number, ct: number, cfg: Ijrscspb_334 }[];
	freshCt = 0
	freeCt = 0;
	itCt = 0
	zhe = 0;
	addCt = 1;//累计次数

	/**打开界面返回 [I:商品idI:购买次数]商品信息I:剩余刷新次数I:剩余免费次数I:折扣钥匙有多少个I:当前折扣id*/
	public GC_OPENUI_10800(self: Model_ActComJRSC, data: BaseBytes): void {
		let len = data.readShort();
		self.shopArr = [];
		for (let i = 0; i < len; i++) {
			let id = data.readInt()
			let ct = data.readInt()
			let cfg = Config.jrscspb_334[id]
			self.shopArr.push({ id: id, ct: ct, cfg: cfg });
		}
		self.freshCt = data.readInt();
		self.freeCt = data.readInt();
		self.itCt = data.readInt();
		self.zhe = data.readInt();
		self.addCt = data.readInt();
		self.checkRed();
		self.notify(Model_ActComJRSC.OPENUI);
	}

	public checkRed() {
		let s = this;
		let red = s.freeCt > 0;
		let sf = GGlobal.reddot;
		sf.setCondition(UIConst.ACTCOM_JRSC, 0, red);
		sf.notifyMsg(UIConst.ACTCOM_JRSC);
	}

	/**刷新商店数据*/
	public CG_REFRESH_10801(): void {
		var bates = this.getBytes();
		this.sendSocket(10801, bates);
	}

	/**刷新商店数据返回 B:状态 1成功 2元宝不足*/
	public GC_REFRESH_10802(self: Model_ActComJRSC, data: BaseBytes): void {
		let res = data.readByte();
		if (res == 1) {
			ViewCommonWarn.text("刷新成功")
			self.notify(Model_ActComJRSC.FRESH_ITEM);
		} else if (res == 2) {
			ViewCommonWarn.text("元宝不足")
		} else {
			ViewCommonWarn.text("刷新失败")
		}
	}

	/**刷新商店折扣数据*/
	public CG_REFRESH_ZHE_10803(): void {
		var bates = this.getBytes();
		this.sendSocket(10803, bates);
	}

	/**刷新商店折扣数据返回 B:状态 1成功 2元宝不足 3道具不足 4刷新折扣次数不足*/
	public GC_REFRESH_ZHE_10804(self: Model_ActComJRSC, data: BaseBytes): void {
		let res = data.readByte();
		if (res == 1) {
			ViewCommonWarn.text("刷新成功")
			self.notify(Model_ActComJRSC.FRESH_ZHE);
		} else {
			ViewCommonWarn.text(["元宝不足", "道具不足", "刷新折扣次数不足", "已达到最低折扣"][res - 2])
		}
	}

	public CG_BUY_10805(id): void {
		var bates = this.getBytes();
		bates.writeInt(id);
		this.sendSocket(10805, bates);
	}

	/**购买商品返回 B:状态 1成功 2元宝不足 3没有购买次数 4没有该商品I: 商品id*/
	private GC_BUY_10806(self: Model_ActComJRSC, data: BaseBytes) {
		let res = data.readByte();
		let id = data.readInt();
		if (res == 1) {
			for (let i = 0; i < self.shopArr.length; i++) {
				if (self.shopArr[i].id == id) {
					self.shopArr[i].ct++
					break;
				}
			}
			self.notify(Model_ActComJRSC.OPENUI);
		} else {
			ViewCommonWarn.text(["元宝不足", "没有购买次数", "没有该商品"][res - 2])
		}
	}
	private _MinZhe
	public getMinZhe(qs) {
		let s = this;
		if (s._MinZhe == null) {
			s._MinZhe = {}
			for (let k in Config.jrsczkb_334) {
				let v = Config.jrsczkb_334[k];
				if (s._MinZhe[v.qs] == null || s._MinZhe[v.qs] > v.zk) {
					s._MinZhe[v.qs] = v.zk
				}
			}
		}
		return s._MinZhe[qs]
	}

	private _addCtPrice: number[][];
	public getAddCtPrice(qs, ct) {
		let s = this;
		if (s._addCtPrice == null) {
			s._addCtPrice = []
			for (let k in Config.jrscybb_334) {
				let v = Config.jrscybb_334[k];
				if (s._addCtPrice[v.qs] == null) {
					s._addCtPrice[v.qs] = [];
				}
				s._addCtPrice[v.qs][v.zk - 1] = JSON.parse(v.jg)[0][2]
			}
		}
		let arr = s._addCtPrice[qs];
		if (!arr) {
			return 0;
		}
		if (ct > arr.length - 1) {
			return arr[arr.length - 1]
		} else {
			return arr[ct - 1];
		}
	}
}