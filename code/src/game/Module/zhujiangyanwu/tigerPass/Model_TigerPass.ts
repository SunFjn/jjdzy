class Model_TigerPass extends BaseModel {
	public static msg_openui = "msg_openui";
	public static msg_employ_list = "msg_employ_list";//雇佣列表
	public static msg_datas_hurt = "msg_datas_hurt";//伤害
	public static msg_bat_res = "msg_bat_res";//战斗结果
	public static msg_employ = "msg_employ";//雇佣别人
	public static msg_join_employ = "msg_join_employ";//加入雇佣
	public listenServ(wsm: WebSocketMgr) {
		super.listenServ(wsm);
		wsm.regHand(8902, this.GCOpenUI8902, this);
		wsm.regHand(8904, this.GCBattle8904, this);
		wsm.regHand(8906, this.GCBattleInfo8906, this);
		wsm.regHand(8908, this.GCBattleRes8908, this);
		wsm.regHand(8910, this.GCOpenEmploy8910, this);
		wsm.regHand(8912, this.GCChooseEmploy8912, this);
		wsm.regHand(8914, this.GCJoinEmploy8914, this);
		wsm.regHand(8916, this.GCRefreshEmploy8916, this);
		wsm.regHand(8918, this.GCgetReward8918, this);
	}

	public static TZ_LING = 416003

	public curId: number = 0;
	public bossCurHp: number = 0;
	public bossMaxHp: number = 0;
	public batCt: number = 0;
	public cdTime: number = 0;
	public isEmploy: number = 0;
	public ctEmploy: number = 0;
	public rewArr: { id: number, status: number }[]
	//被雇佣的人
	public employId: number;
	public employHead: number;
	public employFrame: number;
	public employName: string;
	public employVip: number;
	public employPower: number;
	//列表
	public employArr: { head: number, frame: number, name: string, vip: number, plyId: number, power: number, price: number, count: number }[] = [];
	//战斗
	public myHurt: number;
	public batRes: number;
	public batDrop: any[]
	public batRank: any[]
	/**openUI */
	public CGOpenUI8901() {
		const bytes = this.getBytes();
		this.sendSocket(8901, bytes);
	}

	//GC 打开ui返回 B: 当前boss序号L:boss当前血量L: boss最大血量B:剩余进入次数I: 距离下次增加次数时间B:自己是否加入雇佣兵0没有1有[B:奖励序号B:奖励领取情况0 1 2]L: 雇佣兵id 0没有 >0有I: 头像I:头像框U: 玩家名字I:玩家vipL: 玩家战力
	private GCOpenUI8902(self: Model_TigerPass, bytes: BaseBytes) {
		self.curId = bytes.readByte();
		self.bossCurHp = bytes.readLong();
		self.bossMaxHp = bytes.readLong();
		self.batCt = bytes.readInt();
		self.cdTime = bytes.readInt();
		self.isEmploy = bytes.readByte();
		self.ctEmploy = bytes.readByte();
		self.rewArr = []
		let len = bytes.readShort();
		for (let i = 0; i < len; i++) {
			let id = bytes.readByte();
			let status = bytes.readByte();
			self.rewArr.push({ id: id, status: status })
		}
		self.employId = bytes.readLong();
		self.employHead = bytes.readInt();
		self.employFrame = bytes.readInt();
		self.employName = bytes.readUTF();
		self.employVip = bytes.readInt();
		self.employPower = bytes.readLong();

		GGlobal.reddot.setCondition(UIConst.CHILD_TIGER_PASS, 0, self.getNotice());
		GGlobal.reddot.notify(UIConst.CHILD_TIGER_PASS)
		self.notify(Model_TigerPass.msg_openui);
	}

	/**CG 进入副本*/
	public CGBattle8903() {
		const bytes = this.getBytes();
		this.sendSocket(8903, bytes);
	}

	//GC 进入返回 B: 0成功 1失败 2次数不足 3已经在副本内
	private GCBattle8904(self: Model_TigerPass, bytes: BaseBytes) {
		const res = bytes.readByte();
		if (res == 0) {
			GGlobal.mapscene.enterScene(SceneCtrl.TIGER_PASS);
		} else {
			ViewCommonWarn.text(["", "挑战失败", "次数不足", "已经在副本内", "当前已达最大层数", "活动数据重置中"][res]);
		}
	}

	//GC 场景刷新个人以及boss数据 L: 我的剩余血量L:我的伤害L: boss气血上限L:boss当前气血[U:名字L:伤害]伤害排行数据
	private GCBattleInfo8906(self: Model_TigerPass, bytes: BaseBytes) {
		self.myHurt = bytes.readLong()
		self.bossMaxHp = bytes.readLong()
		self.bossCurHp = bytes.readLong()
		let len = bytes.readShort();
		self.batRank = []
		for (let i = 0; i > len; i++) {
			let name = bytes.readUTF()
			let hurt = bytes.readLong()
			self.batRank.push({ name: name, hurt: hurt })
		}
		self.notify(Model_TigerPass.msg_datas_hurt);
	}

	/**CG 通知后端本人和佣兵都已经死亡 申请参与奖励*/
	public CGDie8907() {
		const bytes = this.getBytes();
		this.sendSocket(8907, bytes);
	}

	//战斗结果 B:0成功 1失败B:当前boss序号L: boss当前血量L:boss总血量[B:奖励类型I:道具idI:道具数量]
	private GCBattleRes8908(self: Model_TigerPass, bytes: BaseBytes) {
		self.batRes = bytes.readByte();
		self.curId = bytes.readByte();
		self.bossCurHp = bytes.readLong();
		self.bossMaxHp = bytes.readLong();
		let len = bytes.readShort();
		self.batDrop = [];
		for (let i = 0; i < len; i++) {
			var type = bytes.readByte();
			var id = bytes.readInt();
			var count = bytes.readInt();
			var vo: IGridImpl;
			if (type == Enum_Attr.EQUIP) {
				vo = VoEquip.create(id);
			} else if (type == Enum_Attr.ITEM) {
				vo = VoItem.create(id);
			} else {//货币
				vo = Vo_Currency.create(type);
			}
			vo.count = count;
			self.batDrop.push(vo)
		}
		self.notify(Model_TigerPass.msg_bat_res);
	}

	public CGOpenEmploy8909() {
		const bytes = this.getBytes();
		this.sendSocket(8909, bytes);
	}

	//GC [I:头像I: 头像框U:玩家名字I: VIP等级L:玩家idL: 玩家战力]
	private GCOpenEmploy8910(self: Model_TigerPass, bytes: BaseBytes) {
		let len = bytes.readShort();
		self.employArr = []
		for (let i = 0; i < len; i++) {
			self.employArr.push({
				head: bytes.readInt(),
				frame: bytes.readInt(),
				name: bytes.readUTF(),
				vip: bytes.readInt(),
				plyId: bytes.readLong(),
				power: bytes.readLong(),
				price: bytes.readInt(),
				count: bytes.readByte()
			})
		}
		self.notify(Model_TigerPass.msg_employ_list)
	}

	public CGChooseEmploy8911(id) {
		const bytes = this.getBytes();
		bytes.writeLong(id);
		this.sendSocket(8911, bytes);
	}

	//GC 雇佣返回 B: 0成功 1失败 2已被别人雇佣满次数 3本人次数不够L:雇佣兵玩家id
	private GCChooseEmploy8912(self: Model_TigerPass, bytes: BaseBytes) {
		let res = bytes.readByte();
		if (res == 0) {
			self.employId = bytes.readLong();
			self.employHead = bytes.readInt();
			self.employFrame = bytes.readInt();
			self.employVip = bytes.readInt();
			self.employPower = bytes.readLong();
			self.employName = bytes.readUTF();

			self.ctEmploy--;
			if (self.ctEmploy < 0) {
				self.ctEmploy = 0;
			}
			self.notify(Model_TigerPass.msg_employ)
		}
		ViewCommonWarn.text(["雇佣成功", "雇佣失败", "已被别人雇佣", "雇佣次数不够", "雇佣失败", "元宝不足"][res])
	}

	//CG 报名加入雇佣行列
	public CGJoinEmploy8913() {
		const bytes = this.getBytes();
		this.sendSocket(8913, bytes);
	}


	//GC报名加入雇佣行列 B:0成功 1失败 2已经在行列中
	private GCJoinEmploy8914(self: Model_TigerPass, bytes: BaseBytes) {
		const res = bytes.readByte();
		if (res == 0) {
			self.isEmploy = 1;
			ViewCommonWarn.text("报名雇佣成功");
			self.notify(Model_TigerPass.msg_join_employ)
		} else {
			ViewCommonWarn.text(["", "报名雇佣失败", "已经报名成功"][res]);
		}
	}

	//CG 刷新雇佣兵列表
	public CGRefreshEmploy8915() {
		const bytes = this.getBytes();
		this.sendSocket(8915, bytes);
	}

	//GC刷新雇佣兵列表 B:0成功 1钱不够 2暂无佣兵 3失败
	private GCRefreshEmploy8916(self: Model_TigerPass, bytes: BaseBytes) {
		const res = bytes.readByte();
		if (res == 0) {

		} else {
			ViewCommonWarn.text(["", "铜钱不够", "暂无佣兵", "刷新失败", "佣兵数量不足"][res]);
		}
	}

	//CG 刷新雇佣兵列表
	public CGgetReward8917(id) {
		const bytes = this.getBytes();
		bytes.writeByte(id)
		this.sendSocket(8917, bytes);
	}

	//层数首通奖励变化 B:层数B:奖励领取情况 0 1 2
	private GCgetReward8918(self: Model_TigerPass, bytes: BaseBytes) {
		let id = bytes.readByte();
		let status = bytes.readByte();

		for (let i = 0; i < self.rewArr.length; i++) {
			if (id == self.rewArr[i].id) {
				self.rewArr[i].status = status
				break;
			}
		}
		self.notify(Model_TigerPass.msg_openui);

		GGlobal.reddot.setCondition(UIConst.CHILD_TIGER_PASS, 0, self.getNotice());
		GGlobal.reddot.notify(UIConst.CHILD_TIGER_PASS)
	}


	private getNotice() {
		let m = this;
		let ct = Model_Bag.getItemCount(Model_TigerPass.TZ_LING);
		if (m.batCt > 0 || ct > 0) {//有挑战次数
			return true;
		}
		if (m.isEmploy == 0) {//可报名雇佣
			return true;
		}
		if (m.rewArr.length > 0) {//可领取奖励
			for (let i = 0; i < m.rewArr.length; i++) {
				if (m.rewArr[i].status == 1) {
					return true;
				}
			}
		}
		return false;
	}
}