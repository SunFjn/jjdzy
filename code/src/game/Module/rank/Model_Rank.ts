class Model_Rank extends BaseModel {

	public static rankData: any = {};

	/**获取排行榜数据 B:排行榜类型 */
	public CG_GET_RANK_LIST(type): void {
		var bates = this.getBytes();
		bates.writeByte(type);
		this.sendSocket(1451, bates);
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(1452, this.GC_GET_RANK_LIST, this);
	}

	/**排行榜数据返回 B:排行榜类型[I:排名L:玩家idU:玩家名称I:职业时装（job*1000+时装id）I:专属神兵I:等级I:轮回等级I:vip等级I:官衔I:国家B:是否显示（0：显示，1：隐藏）L:战力I:特殊字段1（铜雀台：层数）（火烧赤壁：关数）I:头像idI:头像框idI:称号idL:个人总战力]排行数据*/
	public GC_GET_RANK_LIST(self: Model_Rank, data: BaseBytes): void {
		let type = data.readByte();
		let len = data.readShort();
		Model_Rank.rankData[type] = [];
		for (let i = 0; i < len; i++) {
			let rank: VoRank = new VoRank();
			rank.readMsg(data);
			rank.type = type;
			Model_Rank.rankData[type].push(rank);
		}
		GGlobal.control.notify(Enum_MsgType.RANK_UPDATE)
	}

	public static _rankTabArr: Array<any>;
	public static get rankTabArr(): Array<any> {
		if (Model_Rank._rankTabArr == null) {
			Model_Rank._rankTabArr = [];
			for (let keys in Config.paihangbang_711) {
				Model_Rank._rankTabArr.push(Config.paihangbang_711[keys]);
			}
		}
		return Model_Rank._rankTabArr
	}

	public static setRankTxt(v: VoRank): string {
		if (!v) {
			return ""
		}
		if (v.type == 1) {
			return "等级：" + v.level;
		}
		if (v.type == 3) {
			return "铜雀台：" + v.params + "层";
		}
		return "等级：" + v.level;
	}

	public static setPowerTxt(v: VoRank): string {
		if (!v) {
			return ""
		}
		if (v.type <= 4) {
			return "战力：" + v.power;
		} else {
			var name: string = Config.paihangbang_711[v.type].NAME
			name = name.substr(0, 2);
			return name + "战力：" + v.power;
		}
	}

	public static setMyInfoTxt(v: VoRank): string {
		if (!v) {
			return ""
		}
		if (v.type <= 4) {
			if (v.type == 1) {
				return "等级：" + v.level;
			}
			if(v.type == 2){
				return "战力：" + v.power;
			}
			if (v.type == 3) {
				return "铜雀台：" + v.params + "层";
			}
			if (v.type == 4) {
				return "战力：" + v.power;
			}
		} else {
			var name: string = Config.paihangbang_711[v.type].NAME
			name = name.substr(0, 2);
			return name + "战力：" + v.power;
		}
	}
}