class Model_Shop extends BaseModel {
	public static itemID = 410040;
	public static shopArr: Array<Array<Vo_Shop>> = [];
	public static checkVipShop(): boolean {
		let arr = Model_Shop.shopArr[2];
		if (arr) {
			let len = arr.length;
			let vomine = Model_player.voMine;
			for (let i = 0; i < len; i++) {
				let vo: Vo_Shop = arr[i];
				if ((vo.condition.length <= 0 || vo.condition[0][1] <= vomine.viplv) && vo.buyNum < vo.time) {
					return true;
				}
			}
		}
		return false;
	}

	/**5253	打开界面 */
	public CG_OPEN_QUICKBUY_5253() {
		this.sendSocket(5253, new BaseBytes())
	}

	/**5251	购买商品 I:商品idI:购买数量 */
	public CG_QUICKBUY_BUY_5251(id, count) {
		let ba = new BaseBytes();
		ba.writeInt(id);
		ba.writeInt(count);
		this.sendSocket(5251, ba);
	}

	/**1181 打开商城界面 B:商店类  */
	public CG_OPEN_SHOP(type): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(1181, ba);
	}


	/**1183 刷新商店 B:商店类型   */
	public CG_SHOP_REFRESH(type: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(1183, ba);
	}

	/**1185 购买商品 B:商店类型I:商品索引idI:购买次数（预留字段）   */
	public CG_SHOP_BUYITEM(type: number, id: number, num: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		ba.writeInt(id);
		ba.writeInt(num);
		this.sendSocket(1185, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(1182, this.GC_OPEN_SHOP, this)
		wsm.regHand(1186, this.GC_SHOP_BUYITEM, this);
		wsm.regHand(5254, this.GC_OPEN_QUICKBUY_5254, this);
		wsm.regHand(5252, this.GC_QUICKBUY_BUY_5252, this);
	}

	/**5252	购买结果返回 B:结果：0：失败，1：成功I:失败：（1：达到今天限购数量），成功：商品idI:今日已购数量 */
	public GC_QUICKBUY_BUY_5252(self: Model_Shop, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			let id = data.readInt();
			let count = data.readInt();
			Model_Shop.buyArr[id] = count;
			ViewCommonWarn.text("购买成功");
		} else {

		}
	}

	public static buyArr = {};
	/**5254	返回界面信息 [I:购买idI:已购买数量]已购买信息 */
	public GC_OPEN_QUICKBUY_5254(self: Model_Shop, data: BaseBytes) {
		View_QuickBuy_Panel.isFirt = false;
		Model_Shop.buyArr = {};
		for (let i = 0, len = data.readShort(); i < len; i++) {
			let id = data.readInt();
			let count = data.readInt();
			Model_Shop.buyArr[id] = count;
		}
		View_QuickBuy_Panel.show(null, View_QuickBuy_Panel.ct);
	}

	/**1186 购买结果 B:0：失败，1：成功B:商店类型I:失败：错误码（1：商品不存在，2：vip等级不足，3：达购买上限，4：背包满，5：货币不足），成功：商品索引idI:已购买数量  */
	public GC_SHOP_BUYITEM(self: Model_Shop, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let type = data.readByte();
			let id = data.readInt();
			let buyNum = data.readInt();
			let len = Model_Shop.shopArr[type - 1].length;
			for (let j = 0; j < len; j++) {
				let vo: Vo_Shop = Model_Shop.shopArr[type - 1][j];
				if (id == vo.id) {
					vo.buyNum = buyNum;
					break;
				}
			}
			GGlobal.control.notify(Enum_MsgType.SHOP_UPDATE);
		}
	}

	public static isFirstOpen: boolean = false;
	/**1182 商店数据返回 [B:商店类型[I:商品索引idB:商品格子位置I:已购买次数]商品数据]商店数据 */
	public GC_OPEN_SHOP(self: Model_Shop, data: BaseBytes): void {
		Model_Shop.isFirstOpen = true;
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let type: number = data.readByte();
			Model_Shop.shopArr[type - 1] = [];
			let len1 = data.readShort();
			for (let j = 0; j < len1; j++) {
				let id: number = data.readInt();
				let pos = data.readByte();
				let buyNum = data.readInt();
				let vo: Vo_Shop = Vo_Shop.create(id);
				vo.pos = pos;
				vo.buyNum = buyNum;
				Model_Shop.shopArr[type - 1].push(vo);
			}
			Model_Shop.shopArr[type - 1].sort(Model_Shop.sortShop);
		}
		GGlobal.control.notify(Enum_MsgType.SHOP_UPDATE);
	}

	public static sortShop(a: Vo_Shop, b: Vo_Shop): number {
		if (a.pos == b.pos) {
			return a.id - b.id;
		} else {
			return a.pos - b.pos;
		}
	}
}