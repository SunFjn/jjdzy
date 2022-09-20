class ModelSuperMarbles extends BaseModel {
	public constructor() {
		super();
	}

	score: number = 0;
	shopdata = {};

	shotTime = 0;
	closeNum = 0;
	pools: { idx: number, type: number, id: number, count: number, isclose: number }[];

	newQS;
	_lastQS = 0;
	public createCfg() {
		let self = this;
		if (self._lastQS != self.newQS || !self._cfg || !self._shopcfg) {
			let lib = Config.cjdz_502;
			self._cfg = [];
			for (let i in lib) {
				let item: Icjdz_502 = lib[i];
				if (item.qs == self.newQS) {
					self._cfg.push(item);
				}
			}

			let lib1 = Config.cjdzstore_502;
			self._shopcfg = [];
			for (let i in lib1) {
				let item1: Icjdzstore_502 = lib1[i];
				if (item1.qs == self.newQS) {
					self._shopcfg.push(item1);
				}
			}
		}
		self._lastQS = self.newQS;
	}

	_cfg: Icjdz_502[];
	get cfg() {//打开界面才可获取数据
		let self = this;
		return self._cfg;
	}

	_shopcfg: Icjdzstore_502[];
	get shopcfg() {
		const self = this;
		return self._shopcfg;
	}

	public listenServ(wsm: WebSocketMgr) {
		const self = this;
		self.socket = wsm;
		wsm.regHand(11730, self.GC_openui, self);
		wsm.regHand(11732, self.GC_optAwards, self);
		wsm.regHand(11734, self.GC_reOptAwards, self);
		wsm.regHand(11736, self.GC_reset, self);
		wsm.regHand(11738, self.GC_shopdata, self);
		wsm.regHand(11740, self.GC_buy, self);
	}

	/**返回界面信息 I:当前已发射次数[B:位置序号B:道具类型I:道具idI:道具数量B:是否屏蔽（1是，0否）]奖池数据*/
	private GC_openui(self: ModelSuperMarbles, data: BaseBytes) {
		self.shotTime = data.readInt();
		self.pools = [];
		self.closeNum = 0;
		for (let i = data.readShort(); i > 0; i--) {
			let obj: any = {};
			obj.idx = data.readByte();
			obj.type = data.readByte();
			obj.id = data.readInt();
			obj.count = data.readInt();
			obj.isclose = data.readByte();
			if (obj.isclose) {
				self.closeNum++;
			}
			self.pools.push(obj);
		}
		self.score = data.readLong();
		self.pools.sort(function (a, b) { return a.idx < b.idx ? -1 : 1; });
		self.notifyGlobal(UIConst.ACTCOMCJDZ);
	}

	public CG_optAwards(pos, opt) {
		let byte = this.getBytes();
		byte.writeByte(opt);
		byte.writeByte(pos);
		this.sendSocket(11731, byte);
	}
	/**屏蔽操作结果 B:结果：（0：失败，1：成功）B:失败：（1：位置已屏蔽，2：位置未被屏蔽不用解除屏蔽），成功：操作类型B:操作位置*/
	private GC_optAwards(self: ModelSuperMarbles, data: BaseBytes) {
		let ret = data.readByte();
		let retType = data.readByte();
		let idx = data.readByte();
		if (ret == 1) {
			for (let i = self.pools.length; i > 0; i--) {
				let obj = self.pools[i-1];
				if (obj.idx == idx) {
					obj.isclose = obj.isclose?0:1;
					if (obj.isclose) {
						self.closeNum++;
					}else{
						self.closeNum--;
					}
					break;
				}
			}
		} else {
			if (retType == 1) {
				self.warn("位置已屏蔽");
			} else if (retType == 2) {
				self.warn("位置未被屏蔽不用解除屏蔽");
			}
		}
		self.notifyGlobal(UIConst.ACTCOMCJDZ);
	}

	public CG_reOptAwards(opt) {
		let byte = this.getBytes();
		byte.writeByte(opt);
		this.sendSocket(11733, byte);
	}
	/**B:抽奖结果：0：失败，1：成功I:失败：（1：不能发射5次，2：元宝不足），成功：已发射次数[B:位置序号B:道具类型I:道具idI:道具数量]奖励数据*/
	private GC_reOptAwards(self: ModelSuperMarbles, data: BaseBytes) {
		let ret = data.readByte();
		let retType = data.readInt();
		self.score = data.readLong();
		if (ret == 1) {
			self.shotTime = retType;
			let awards = [];
			let vos = [];
			for (let i = data.readShort(); i > 0; i--) {
				let obj: any = {};
				obj.idx = data.readByte();
				obj.type = data.readByte();
				obj.id = data.readInt();
				obj.count = data.readInt();
				vos.push(ConfigHelp.makeItem([obj.type,obj.id,obj.count]));
				awards.push(obj);
			}
			self.notifyGlobal(UIConst.ACTCOMCJDZ, [awards,vos]);
		} else {
			if (retType == 1) {
				self.warn("不能发射5次");
			} else if (retType == 2) {
				self.warn("元宝不足");
			}
		}
	}

	public CG_reset() {
		let byte = this.getBytes();
		this.sendSocket(11735, byte);
	}
	/**重置结果 B:结果：0：失败（元宝不足），1：成功*/
	private GC_reset(self: ModelSuperMarbles, data: BaseBytes) {
		let retType = data.readByte();
		if (retType == 0) {
			self.warn("元宝不足");
		} else if (retType == 1) {
			self.warn("重置成功");
		}
	}

	public CG_shopdata() {
		let byte = this.getBytes();
		this.sendSocket(11737, byte);
	}
	/**弹珠积分商店数据返回 L:弹珠积分[I:商品idI:已买数量]商品数据*/
	private GC_shopdata(self: ModelSuperMarbles, data: BaseBytes) {
		self.score = data.readLong();
		self.shopdata = {};
		for (let i = data.readShort(); i > 0; i--) {
			self.shopdata[data.readInt()] = data.readInt();
		}
		self.notifyGlobal(UIConst.ACTCOMCJDZ_SHOP);
	}

	public CG_buy(id, num) {
		let byte = this.getBytes();
		byte.writeInt(id);
		byte.writeInt(num);
		this.sendSocket(11739, byte);
	}
	/**兑换结果 B:结果：0：失败，1：成功I:失败：（1：积分不足），成功：兑换idI:已兑换数量*/
	private GC_buy(self: ModelSuperMarbles, data: BaseBytes) {
		let ret = data.readByte();
		if (ret == 1) {
			self.shopdata[data.readInt()] = data.readInt();
			self.notifyGlobal(UIConst.ACTCOMCJDZ_SHOP);
		}
	}

}