class Model_XingTu extends BaseModel {

	public static checkXingTuNotice(): boolean {
		let ret = false;
		for (let i = 0; i < Model_XingTu.xingtuArr.length; i++) {
			let cfg = Model_XingTu.xingtuArr[i];
			ret = Model_XingTu.checkTabNotice(cfg.type);
			if (ret) break;
		}
		return ret;
	}

	public static checkTabNotice(type: number): boolean {
		let cfg1 = Model_XingTu.xingtuArr[type - 1];
		if (Model_player.voMine.zsID >= cfg1.condition) {
			let xingtuID = Model_XingTu.xingtuIDArr[type - 1];
			let cfg = Config.xingtu_706[xingtuID];
			let costArr = JSON.parse(cfg.need);
			if (cfg.next > 0 && Model_player.voMine.xinghun >= costArr[0][2]) {
				return true;
			}
		}
		return false;
	}
	public static xingtuIDArr: Array<any> = [];
	public static xingtuArr: Array<any> = [];
	public static getXingTuArr(): void {
		if (Model_XingTu.xingtuArr.length <= 0) {
			for (let i = 1; i < 8; i++) {
				let cfg = Config.xingtujh_706[i];
				Model_XingTu.xingtuArr.push(cfg);
				Model_XingTu.xingtuIDArr.push(i * 100000)
			}
		}
	}

	/*921  打开星图 */
	public CG_OPEN_XINGTU(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(921, ba);
	}

	/*923 星图升级 B:星图类型  */
	public CG_XINGTU_UPGRADE(type: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(923, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(922, this.GC_OPEN_XINGTU, this);
		wsm.regHand(924, this.GC_XINGTU_UPGRADE, this);
	}

	/**924 星图升级结果 B:0:失败，1：成功I:失败：错误码（1:达到最高级，2：未达开启条件，3：材料不足），成功：星图id   */
	public GC_XINGTU_UPGRADE(self: Model_XingTu, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let id: number = data.readInt();
			let type = Math.floor(id / 100000);
			Model_XingTu.xingtuIDArr[type - 1] = id;
			GGlobal.control.notify(Enum_MsgType.XINGTU_DATA_UPDATE);
		}
	}

	public static isFirstOpen: boolean = false;
	/**922 星图信息返回 [I:星图id]星图信息  */
	public GC_OPEN_XINGTU(self: Model_XingTu, data: BaseBytes): void {
		Model_XingTu.isFirstOpen = true;
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let id: number = data.readInt();
			if (id <= 0) continue;
			let type = Math.floor(id / 100000);
			Model_XingTu.xingtuIDArr[type - 1] = id;
		}
		GGlobal.control.notify(Enum_MsgType.XINGTU_DATA_UPDATE);
	}
}