class Model_WuShengList extends BaseModel {

	public static power = 0;
	public static drawArr = [];
	public static rankArr = [];
	public static listArr = [];
	public static myRank = 0;
	public static getRank() {
		Model_WuShengList.listArr = [];
		for (let i = 1; i < 8; i++) {
			let cfg = Config.ws_238[i];
			Model_WuShengList.listArr.push(cfg);
		}
	}
	/**2301 CG 打开ui B:打开某个榜  */
	public CG_OPEN_WUSHENG_LIST(index) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(index);
		this.sendSocket(2301, ba);
	}

	/**2303 GC 领取奖励 I:奖励序号  */
	public CG_WUSHENG_LIST_DRAW(index) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(index);
		this.sendSocket(2303, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(2302, this.GC_OPEN_WUSHENG_LIST, this);
		wsm.regHand(2304, this.GC_WUSHENG_LIST_DRAW, this);
	}

	/**2304 GC 奖励发生变化 I:奖励序号B:奖励状态0不能领1可以领2已经领完  */
	public GC_WUSHENG_LIST_DRAW(self: Model_WuShengList, data: BaseBytes) {
		let arr = data.readFmt(["I", "B"]);
		let arr1 = Model_WuShengList.drawArr;
		for (let i = 0; i < arr1.length; i++) {
			if (arr[0] == arr1[i][0]) {
				arr1[i][1] = arr[1];
				break;
			}
		}
		GGlobal.control.notify(Enum_MsgType.WUSHENG_LIST_DRAW, { state: arr[1], targetId: arr[0] });
	}

	/**2302 GC 打开ui信息 L:我的x榜战力I:我的x榜排名[I:奖励序号B:奖励领取情况][L:玩家idU:玩家姓名L:玩家战力B:排名]  */
	public GC_OPEN_WUSHENG_LIST(self: Model_WuShengList, data: BaseBytes) {
		Model_WuShengList.drawArr = [];
		Model_WuShengList.rankArr = [];
		Model_WuShengList.myRank = 0;
		Model_WuShengList.power = data.readLong();
		Model_WuShengList.myRank = data.readInt();
		for (let i = 0, len = data.readShort(); i < len; i++) {
			Model_WuShengList.drawArr.push(data.readFmt(["I", "B"]));
		}
		Model_WuShengList.drawArr.sort(self.sortReward);
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let arr = data.readFmt(["L", "U", "L", "B"]);
			Model_WuShengList.rankArr[arr[3] - 1] = arr;
		}
		GGlobal.control.notify(Enum_MsgType.WUSHENG_LIST);
	}

	public sortReward(a, b) {
		return a[0] - b[0];
	}
}