class Model_ShouLing extends BaseModel {

	public static isFirst: boolean = false;
	public static slArr: Array<any> = [1000, 2000, 3000, 4000];
	public static checkTabNotice(type: number): boolean {
		let ret: boolean = false;
		let cfg = Config.shoulin_704[Model_ShouLing.slArr[type]];
		if (cfg.next > 0) {
			let costArr: Array<any> = JSON.parse(cfg.consume);
			let count = Model_Bag.getItemCount(costArr[0][1]);
			if (count >= costArr[0][2]) ret = true;
		}
		return ret;
	}

	/**851  请求界面信息   */
	public CG_OPEN_SHOULING(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(851, ba);
	}

	/**853 兽灵升级 I:兽灵id   */
	public CG_UPGRADE_SHOULING(id: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(853, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		// wsm.regHand(852, this.GC_OPEN_SHOULING, this);
		wsm.regHand(854, this.GC_UPGRADE_SHOULING, this);
	}

	/**854 升级兽灵结果 B:0：失败，1：成功I:失败：错误码；成功：兽灵id  */
	public GC_UPGRADE_SHOULING(self: Model_ShouLing, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 1) {
			let id = data.readInt();
			Model_ShouLing.slArr[Math.floor(id / 1000) - 1] = id;
			GGlobal.control.notify(Enum_MsgType.SHOULING_DATA_UPDATE);
		}
	}

	/**852 返回兽灵信息 [I:兽灵id]兽灵数据  */
	public GC_OPEN_SHOULING(self: Model_ShouLing, data: BaseBytes): void {
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let id = data.readInt();
			Model_ShouLing.slArr[Math.floor(id / 1000) - 1] = id;
		}
		GGlobal.control.notify(Enum_MsgType.SHOULING_DATA_UPDATE);
	}
}