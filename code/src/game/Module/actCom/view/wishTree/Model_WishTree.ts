class Model_WishTree extends BaseModel{
	/** 是否播放抽奖动画 */
    public isPlayMc7219 = true;
	public isPlayMc7751 = true;
	/** 抽奖正在播放动画的状态 */
    public isPlayingMc = false;
	public type:number = 0;

	public constructor() {
		super();
	}

	public targetMap: { [id: number]: number } = {};

	/**10041 许愿 B:许愿类型 1为许愿1次 2为许愿10次I:系统id  */
	public CG_DRAW(type:number, systemId:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		ba.writeInt(systemId);
		this.sendSocket(10041, ba);
		this.type = type;
	}

	/**10043 领取奖励 I:目标idI:系统id  */
	public CG_GET_AWARD(target:number, systemId:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(target);
		ba.writeInt(systemId);
		this.sendSocket(10043, ba);
	}

	/**10045 打开排行榜  */
	public CG_OPEN_RANKUI() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(10045, ba);
	}

	/**10047 打开目标页面 I:系统id  */
	public CG_OPEN_TARGETUI(systemId:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(systemId);
		this.sendSocket(10047, ba);
	}

	/**10049 领取页面目标奖励 I:配置表idI:系统id  */
	public CG_GET_TARGETAWARD(id:number, systemId:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		ba.writeInt(systemId);
		this.sendSocket(10049, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let a = this;
		a.socket = wsm;
		wsm.regHand(10040, a.GC_OPEN_UI, a);
		wsm.regHand(10042, a.GC_DRAW, a);
		wsm.regHand(10044, a.GC_GET_AWARD, a);
		wsm.regHand(10046, a.GC_OPEN_RANKUI, a);
		wsm.regHand(10048, a.GC_OPEN_TARGETUI, a);
		wsm.regHand(10050, a.GC_GET_TARGETAWARD, a);
	}

	public voArr: WishTreeVO[] = [];
	public wish:number = 0;
	/**10040 打开界面返回 [I:目标idI:奖励状态 -1已领取 0条件不符 >0可领取次数]目标列表I:许愿次数*/
	private GC_OPEN_UI(s: Model_WishTree, data: BaseBytes) {
		s.voArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let id:number = data.readInt();
			let status:number = data.readInt();
			s.targetMap[id] = status;
		}
		s.wish = data.readInt();
		GGlobal.control.notify(UIConst.WISHTREE_ACT);
		GGlobal.control.notify(UIConst.WISHTREE_SYSTEM);
	}

	public systemId:number = 0;
	public resultList: IGridImpl[] = [];
	/**10042 许愿返回 B:状态 1成功 2元宝不足[B:道具类型I:道具idI:道具数量B:是否大奖]道具列表[I:目标idI:状态 -1已领取 0条件不符 >0可领取次数]目标列表I:许愿次数I:系统id*/
	private GC_DRAW(s: Model_WishTree, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			s.resultList.length = 0;
			let len = data.readShort();
			for (let i = 0; i < len; i++) {
				let t_itemVO = ConfigHelp.parseItemBa(data);
				let arg5 = data.readByte();
				t_itemVO.extra = arg5 == 1 ? 5 : 0;
				s.resultList.push(t_itemVO);
			}
			len = data.readShort();
			for (let i = 0; i < len; i++) {
				let id:number = data.readInt();
				let status:number = data.readInt();
				s.targetMap[id] = status;
			}
			s.wish = data.readInt();
			s.systemId = data.readInt();
			if(s.type == 1)
			{
				s.targetCount += 1;
			}else{
				s.targetCount += 10;
			}
			if(s.targetArr.length > 0)
			{
				let len:number = s.targetArr.length;
				let cfg:Ixysslb_328;
				for(let j:number = 0;j < len;j ++)
				{
					let v: WishTreeVO = s.targetArr[j];
					cfg = Config.xysslb_328[v.id];
					if(v.status <= 0 && s.targetCount >= cfg.time)
					{
						v.status = 1;
					}
				}
			}
			GGlobal.control.notify(Enum_MsgType.WISHTREE_PRAY_MOVIE);
			s.reddotCheckWishTree();
			s.reddotCheckWishTreeTarget();
		}else{
			ViewCommonWarn.text("元宝不足");
		}
	}

	/**10044 领取奖励返回 B:状态 1成功 2条件不符 3背包已满 4参数错误 5已领取I:目标idI:目标奖励状态 -1已领取 0条件不符 >0可领取次数I:系统id*/
	private GC_GET_AWARD(s: Model_WishTree, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			let id:number = data.readInt();
			let status:number = data.readInt();
			s.targetMap[id] = status;
			s.systemId = data.readInt();
			s.resultList.length = 0;
			GGlobal.control.notify(UIConst.WISHTREE_ACT);
			GGlobal.control.notify(UIConst.WISHTREE_SYSTEM);
			s.reddotCheckWishTree();
		}
	}

	public rankArr: WishTreeVO[] = [];
	public myRank:number = 0;
	public myWish:number = 0;
	/**10046 打开排行榜返回 [S:排名U:玩家名I:许愿次数]排行列表S:我的排名 没进排名为0I:我的许愿次数*/
	private GC_OPEN_RANKUI(s: Model_WishTree, data: BaseBytes) {
		s.rankArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: WishTreeVO = new WishTreeVO();
			v.readRankMsg(data);
			s.rankArr.push(v);
		}
		s.myRank = data.readUnsignedShort();
		s.myWish = data.readInt();
		GGlobal.control.notify(UIConst.WISHTREE_RANK);
	}

	public targetArr: WishTreeVO[] = [];
	public targetCount:number = 0;
	/**10048 打开目标页面返回 [I:配置表idB:状态 0未领取 1可领取 2已领取]目标列表I:系统idI:次数*/
	private GC_OPEN_TARGETUI(s: Model_WishTree, data: BaseBytes) {
		s.targetArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: WishTreeVO = new WishTreeVO();
			v.readMsg(data);
			s.targetArr.push(v);
		}
		s.systemId = data.readInt();
		s.targetCount = data.readInt();
		// GGlobal.control.notify(UIConst.WISHTREE_TARGET);
		GGlobal.control.notify(UIConst.WISHTREE_ACT);
		GGlobal.control.notify(UIConst.WISHTREE_SYSTEM);
	}

	/**10050 领取页面目标奖励返回 B:状态I:目标idI:系统id*/
	private GC_GET_TARGETAWARD(s: Model_WishTree, data: BaseBytes) {
		let res = data.readByte();
		let id:number = data.readInt();
		s.systemId = data.readInt();
		if (res == 1) {
			let len:number = s.targetArr.length;
			for(var i:number = 0;i < len;i ++)
			{
				let v: WishTreeVO = s.targetArr[i];
				if(v.id == id)
				{
					v.status = 2;
					break;
				}
			}
			s.reddotCheckWishTreeTarget();
			// GGlobal.control.notify(UIConst.WISHTREE_TARGET);
			GGlobal.control.notify(UIConst.WISHTREE_ACT);
			GGlobal.control.notify(UIConst.WISHTREE_SYSTEM);
		}
	}

	private static _xyspmCfg: any;
	public static getxyspmCfg(qs: number, rank: number): any {
		if (Model_WishTree._xyspmCfg == null) {
			Model_WishTree._xyspmCfg = {};
			for (let keys in Config.xyspmb_328) {
				let cfg = Config.xyspmb_328[keys];
				if (Model_WishTree._xyspmCfg[cfg.qs] == null) {
					Model_WishTree._xyspmCfg[cfg.qs] = {};
				}

				let arr = ConfigHelp.SplitStr(cfg.rank)
				for (let j = Number(arr[0][0]); j <= Number(arr[0][1]); j++) {
					Model_WishTree._xyspmCfg[cfg.qs][j] = cfg;
				}
			}
		}
		return Model_WishTree._xyspmCfg[qs] ? Model_WishTree._xyspmCfg[qs][rank] : null;
	}

	public static getWishTreeVO(id:number): WishTreeVO {
		let model = GGlobal.modelWishTree;
		if(model.voArr && model.voArr.length > 0)
		{
			let len:number = model.voArr.length;
			let vo:WishTreeVO;
			for(var i:number = 0;i < len;i ++)
			{
				vo = model.voArr[i];
				if(vo.id == id)
				{
					return vo;
				}
			}
		}
		return null;
	}

	/**
     * 检查抽奖道具是否足够（非元宝）
     * @param pType 1抽一次 2抽10次
     */
    public checkItemEnough(pType: number): boolean {
        let t = this;
        if (pType == 1) {
            //抽一次
            return FastAPI.checkItemEnough(416010, 1, false);
        }
        else {
            //抽10次
            return FastAPI.checkItemEnough(416010, 10, false);
        }
    }

	 /** 检查许愿树红点 */
    public reddotCheckWishTree() {
		let bol:boolean = false;
		let sf = GGlobal.reddot;
        for(let key in this.targetMap)
		{
			var status:number = this.targetMap[key];
			if(status > 0)
			{
				bol = true;
				break;
			}
		}
		if(!bol)
		{
			bol = GGlobal.modelWishTree.checkItemEnough(1) || GGlobal.modelWishTree.checkItemEnough(1)? true:false;
		}
		if(GGlobal.modelWishTree.systemId > 0)
		{
			sf.setCondition(GGlobal.modelWishTree.systemId, 0, bol);
			sf.notifyMsg(GGlobal.modelWishTree.systemId);
		}else{
			sf.setCondition(UIConst.WISHTREE_ACT, 0, bol);
			sf.notifyMsg(UIConst.WISHTREE_ACT);
			sf.setCondition(UIConst.WISHTREE_SYSTEM, 0, bol);
			sf.notifyMsg(UIConst.WISHTREE_SYSTEM);
		}
    }

	 /** 检查许愿树目标红点 */
    public reddotCheckWishTreeTarget() {
		let bol:boolean = false;
		let sf = GGlobal.reddot;
		let cfg:Ixysslb_328;
		if(this.targetArr)
		{
			let len:number = this.targetArr.length;
			for(var i:number = 0;i < len;i ++)
			{
				let v: WishTreeVO = this.targetArr[i];
				cfg = Config.xysslb_328[v.id];
				if(v.status == 1)
				{
					bol = true;
					break;
				}else if(v.status == 0 && GGlobal.modelWishTree.wish >= cfg.time)
				{
					bol = true;
					break;
				}
			}
		}
		sf.setCondition(GGlobal.modelWishTree.systemId, 1, bol);
		sf.notifyMsg(GGlobal.modelWishTree.systemId);
    }
}