class Model_LingLong extends BaseModel {

	/**2221 打开界面 */
	public CG_OPENUI(): void {
		var bates = this.getBytes();
		this.sendSocket(2221, bates);
	}
	/**2223 购买 B:购买次数，1次或10次B:购买类型，0：玲珑币购买，1：元宝购买 */
	public CG_BUY(count: number, type: number): void {
		var bates = this.getBytes();
		bates.writeByte(count)
		bates.writeByte(type)
		this.sendSocket(2223, bates);
	}
	/**2225 排行榜界面 B:0人物积分界面 1区服积分排行*/
	public CG_RANKUI(type): void {
		var bates = this.getBytes();
		bates.writeByte(type)
		this.sendSocket(2225, bates);
	}
	/**2227 领取每日积分宝箱奖励 I:玲珑阁积分表id */
	public CG_GET_SCORE_AWARD(id): void {
		var bates = this.getBytes();
		bates.writeInt(id)
		this.sendSocket(2227, bates);
	}

	/**打开上期排名界面 */
	public CG_OPEN_LAST_RANK(): void {
		var bates = this.getBytes();
		this.sendSocket(2233, bates);
	}
	/**打开上期排名界面 */
	public CG_OPEN_LAST_ZONE(): void {
		var bates = this.getBytes();
		this.sendSocket(2235, bates);
	}
	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(2222, this.GC_OPENUI, this);
		mgr.regHand(2224, this.GC_BUY, this);
		mgr.regHand(2226, this.GC_RANKUI, this);
		mgr.regHand(2228, this.GC_GET_SCORE_AWARD, this);
		mgr.regHand(2230, this.GC_LOGS, this);
		mgr.regHand(2232, this.GC_RANK1UI, this);
		mgr.regHand(2234, this.GC_OPEN_LAST_RANK, this);
		mgr.regHand(2236, this.GC_OPEN_LAST_ZONE, this);
	}

	public static cfgId: number = 0;
	public static lastCount: number = -1
	public static logsArr: Array<Vo_LingLong> = [];
	public static lingLong: number = 0;//积分表
	public static pointArr: Array<Vo_LingLong> = [];
	public static myPoint: number = 0;
	public static rankArr: Array<Vo_LingLong> = [];
	public static rank1Arr: Array<Vo_LingLong> = [];
	public static rankId: number = 0;

	public static rankLastArr: Array<Vo_LingLong> = [];
	public static rankLastId: number = 0;
	public static myLastPoint:number = 0;

	public static rankLast1Arr: Array<Vo_LingLong> = [];
	public static rankLast1Id: number = 0;
	

	public static lingLongId = 410023;//玲珑币
	public static skipTween: boolean = false;//是否跳过动画

	//打开界面返回 I:玲珑阁表配置idB:必得高级道具剩余次数[U:玩家姓名I:道具id]获奖公告列表I:玲珑币数量[I:玲珑阁积分表idB:状态]每日目标积分奖励状态列表I:个人积分
	private GC_OPENUI(self: Model_LingLong, data: BaseBytes): void {
		Model_LingLong.cfgId = data.readInt();
		Model_LingLong.lastCount = data.readByte();
		var len = data.readShort();
		Model_LingLong.logsArr = [];
		for (let i = 0; i < len; i++) {
			let vLog: Vo_LingLong = new Vo_LingLong();
			vLog.readMsgLog(data);
			Model_LingLong.logsArr.push(vLog);
		}
		Model_LingLong.lingLong = data.readInt();

		var len = data.readShort();
		Model_LingLong.pointArr = [];
		for (let i = 0; i < len; i++) {
			var vPonit: Vo_LingLong = new Vo_LingLong();
			vPonit.readMsgPoint(data);
			Model_LingLong.pointArr.push(vPonit);
		}
		Model_LingLong.myPoint = data.readInt();
		GGlobal.control.notify(Enum_MsgType.LINGLONG_OPEN_UI)
	}

	//购买返回 B:状态，1：成功，2：玲珑币不足，3：元宝不足[B:奖品类型I:奖品idI:奖品数量B:是否大奖]抽取的奖品列表B:必得高级道具剩余次数I:玲珑币数量I:个人积分
	private GC_BUY(self: Model_LingLong, data: BaseBytes): void {
		var result = data.readByte();
		if (result == 1) {
			let len = data.readShort();
			var dropArr:IGridImpl[] = [];
			for (let i = 0; i < len; i++) {
				let item = ConfigHelp.parseItemBa(data)
				item.extra = data.readByte() == 1 ? 5 : 0
				dropArr.push(item);
			}
			let dTime = Model_LingLong.skipTween ? 0 : 1200
			setTimeout(function () {
				GGlobal.layerMgr.open(UIConst.LING_LONG_SHOW, dropArr);
				let arrGet = [];
				for (let i = 0; i < dropArr.length; i++) {
					let it = dropArr[i]
					if (it.gType == Enum_Attr.ITEM && it.quality > 5) {
						arrGet.push(it)
					}
				}
				if (arrGet) {
					ViewCommonPrompt.textItemList(arrGet);
				}
			}, dTime);

			Model_LingLong.lastCount = data.readByte();
			Model_LingLong.lingLong = data.readInt();
			Model_LingLong.myPoint = data.readInt();
			GGlobal.control.notify(Enum_MsgType.LINGLONG_OPEN_UI)
			GGlobal.control.notify(Enum_MsgType.LINGLONG_BUY_FLASH, dropArr)
		} else if (result == 2) {
			View_CaiLiao_GetPanel.show(VoItem.create(Model_LingLong.lingLongId));
		} else if (result == 3) {
			ModelChongZhi.guideToRecharge()
		} else {
			ViewCommonWarn.text("购买失败")
		}
		// GGlobal.control.notify(Enum_MsgType.LINGLONG_BUY)
	}

	//排行榜界面返回 [U:玩家姓名I:玩家积分I:玲珑阁排名表id]排行榜列表
	private GC_RANKUI(self: Model_LingLong, data: BaseBytes): void {
		var len = data.readShort();
		Model_LingLong.rankArr = [];
		for (let i = 0; i < len; i++) {
			let vo: Vo_LingLong = new Vo_LingLong();
			vo.readMsgRank(data);
			vo.rank = i + 1;
			Model_LingLong.rankArr.push(vo);
		}
		Model_LingLong.rankId = data.readInt();
		GGlobal.control.notify(Enum_MsgType.LINGLONG_OPEN_RANK)
	}

	//GC 区服积分排名 [I:区idI:区积分]I:区排名I:区积分
	private GC_RANK1UI(self: Model_LingLong, data: BaseBytes): void {
		var len = data.readShort();
		Model_LingLong.rank1Arr = [];
		for (let i = 0; i < len; i++) {
			let vo: Vo_LingLong = new Vo_LingLong();
			vo.readMsgRank1(data);
			vo.rank = i + 1;
			Model_LingLong.rank1Arr.push(vo);
		}
		let voSelf: Vo_LingLong = new Vo_LingLong();
		voSelf.status = 1;
		voSelf.rank = data.readInt();
		voSelf.point = data.readInt();
		let hasSelf = false;
		for(let i = 0; i < len; i++){
			let vo: Vo_LingLong = Model_LingLong.rank1Arr[i];
			if(vo.rank == voSelf.rank){
				vo.status = 1;
				hasSelf = true;
				break;
			}
		}
		// if(!hasSelf){
		// 	Model_LingLong.rank1Arr.push(voSelf);
		// }
		GGlobal.control.notify(Enum_MsgType.LINGLONG_OPEN_RANK)
	}

	//领取每日积分宝箱奖励 B:0领取成功 1失败 -1更新状态I:玲珑阁积分表idI:剩余领取个数 -1领取完了
	private GC_GET_SCORE_AWARD(self: Model_LingLong, data: BaseBytes): void {
		var result = data.readByte();
		var pointId = data.readInt();
		var status = data.readInt();
		if (result == 0 || result == -1) {
			for (let i = 0; i < Model_LingLong.pointArr.length; i++) {
				let vo: Vo_LingLong = Model_LingLong.pointArr[i];
				if (vo.point == pointId) {
					vo.status = status;
					GGlobal.control.notify(Enum_MsgType.LINGLONG_GET_AWARD)
					break;
				}
			}
			if (result == 0) {
				ViewCommonWarn.text("领取成功")
			}
		} else {
			ViewCommonWarn.text("领取失败")
		}
	}

	//在线推送获奖公告 [U:玩家姓名I:道具id]获奖公告列表
	private GC_LOGS(self: Model_LingLong, data: BaseBytes): void {
		var len = data.readShort();
		for (let i = 0; i < len; i++) {
			let vLog: Vo_LingLong = new Vo_LingLong();
			vLog.readMsgLog(data);
			if (Model_LingLong.logsArr) {
				Model_LingLong.logsArr.push(vLog);
			}
		}
		let plyid = data.readLong();
		//自己的需要播放动画后显示日记
		if (len > 0 && plyid != Model_player.voMine.id) {
			GGlobal.control.notify(Enum_MsgType.LINGLONG_LOGS)
		}
	}
	//打开上期排名界面返回 [L:玩家idU:玩家姓名I:玩家积分]上期排行列表I:我的上期排名I:我的上期积分
	private GC_OPEN_LAST_RANK(self: Model_LingLong, data: BaseBytes){
		var len = data.readShort();
		Model_LingLong.rankLastArr = [];
		for (let i = 0; i < len; i++) {
			let vo: Vo_LingLong = new Vo_LingLong();
			vo.readMsgRank(data);
			vo.rank = i + 1;
			Model_LingLong.rankLastArr.push(vo);
		}
		let myLastRank = data.readInt();
		Model_LingLong.myLastPoint = data.readInt();
		Model_LingLong.rankLastId = data.readInt();
		GGlobal.control.notify(Enum_MsgType.LINGLONG_OPEN_RANK)
	}
	//打开上期区服积分排名界面返回 [I:区idI:区积分]上期区服积分排名列表I:区排名I:区积分
	private GC_OPEN_LAST_ZONE(self: Model_LingLong, data: BaseBytes){
		var len = data.readShort();
		Model_LingLong.rankLast1Arr = [];
		for (let i = 0; i < len; i++) {
			let vo: Vo_LingLong = new Vo_LingLong();
			vo.readMsgRank1(data);
			vo.rank = i + 1;
			Model_LingLong.rankLast1Arr.push(vo);
		}
		let voSelf: Vo_LingLong = new Vo_LingLong();
		voSelf.status = 1;
		voSelf.rank = data.readInt();
		voSelf.point = data.readInt();
		let hasSelf = false;
		for(let i = 0; i < len; i++){
			let vo: Vo_LingLong = Model_LingLong.rankLast1Arr[i];
			if(vo.rank == voSelf.rank){
				vo.status = 1;
				hasSelf = true;
				break;
			}
		}
		Model_LingLong.rankLast1Id = data.readInt();
		GGlobal.control.notify(Enum_MsgType.LINGLONG_OPEN_RANK)
	}
	

	private static _llgCfg: any;
	public static getLLgCfg(llg: number, rank: number): any {
		if (Model_LingLong._llgCfg == null) {
			Model_LingLong._llgCfg = {};
			for (let keys in Config.llgrank_239) {
				let llCfg = Config.llgrank_239[keys];
				if (Model_LingLong._llgCfg[llCfg.llg] == null) {
					Model_LingLong._llgCfg[llCfg.llg] = {};
				}

				let arr = ConfigHelp.SplitStr(llCfg.rank)
				for (let j = Number(arr[0][0]); j <= Number(arr[0][1]); j++) {
					Model_LingLong._llgCfg[llCfg.llg][j] = llCfg
				}
			}
		}
		return Model_LingLong._llgCfg[llg] ? Model_LingLong._llgCfg[llg][rank] : null;
	}

	private static _llgRank1: any;
	public static getLLGRank1(llg: number, rank: number):any{
		if (Model_LingLong._llgRank1 == null) {
			Model_LingLong._llgRank1 = {};
			for (let keys in Config.llgqf_239) {
				let llCfg = Config.llgqf_239[keys];
				if (Model_LingLong._llgRank1[llCfg.llg] == null) {
					Model_LingLong._llgRank1[llCfg.llg] = {};
				}

				let arr = ConfigHelp.SplitStr(llCfg.rank)
				for (let j = Number(arr[0][0]); j <= Number(arr[0][1]); j++) {
					Model_LingLong._llgRank1[llCfg.llg][j] = llCfg
				}
			}
		}
		return Model_LingLong._llgRank1[llg] ? Model_LingLong._llgRank1[llg][rank] : null;

	}
}

declare interface Illg_239 {
/**界面奖励展示*/showArr;
}