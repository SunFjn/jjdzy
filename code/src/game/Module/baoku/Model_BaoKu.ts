class Model_BaoKu extends BaseModel {

	public static baoKuArr: Vo_BaoKu[][] = [];
	public sortBaoKu(a: Vo_BaoKu, b: Vo_BaoKu) {
		return a.sortNum - b.sortNum;
	}

	/**2041 打开宝库界面 B:宝库id，1：隆中宝库，2：无双宝库，3：枭雄宝库，4：三国宝库  */
	public CG_OPEN_BAOKU(id) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(id);
		this.sendSocket(2041, ba);
	}
	/**2043 兑换 I:宝库id，1：隆中宝库，2：无双宝库，3：枭雄宝库，4：三国宝库I:商品id  */
	public CG_BAOKU_DUIHUAN(id, itemId) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		ba.writeInt(itemId);
		this.sendSocket(2043, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(2042, this.GC_OPEN_BAOKU, this);
		wsm.regHand(2044, this.GC_BAOKU_DUIHUAN, this);
	}

	/**2044 兑换返回 B:状态，1：成功，2：宝库道具不足，3：商品已售罄，4：vip等级不足，5：商品不存在I:商品id  */
	public GC_BAOKU_DUIHUAN(self: Model_BaoKu, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			let itemId = data.readInt();
			let cfg = Config.bkitem_236[itemId];
			let arr: Vo_BaoKu[] = Model_BaoKu.baoKuArr[cfg.bk - 1];
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].id == itemId) {
					arr[i].count++;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.BAOKU);
		}
	}

	/**2042 打开宝库界面返回 [I:商品idI:商品已购买次数]商品列表  */
	public GC_OPEN_BAOKU(self: Model_BaoKu, data: BaseBytes) {
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let itemId = data.readInt();
			let count = data.readInt();
			let vo: Vo_BaoKu = Vo_BaoKu.create(itemId);
			vo.count = count;
			if (i == 0) {
				Model_BaoKu.baoKuArr[vo.bk - 1] = [];
			}
			Model_BaoKu.baoKuArr[vo.bk - 1].push(vo);
		}

		for (let i = 0; i < Model_BaoKu.baoKuArr.length; i++) {
			if (Model_BaoKu.baoKuArr[i]) Model_BaoKu.baoKuArr[i].sort(self.sortBaoKu);
		}
		GGlobal.control.notify(Enum_MsgType.BAOKU);
	}
}