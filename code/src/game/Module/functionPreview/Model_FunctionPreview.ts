class Model_FunctionPreview extends BaseModel {

	public static listArr: any[] = [];
	public static drawArr: any[] = [];
	public static getFunctionPreView() {
		if (Model_FunctionPreview.listArr.length <= 0) {
			for (let key in Config.sysshow_228) {
				let cfg = Config.sysshow_228[key];
				Model_FunctionPreview.listArr.push(cfg);
			}
			Model_FunctionPreview.listArr.sort(GGlobal.modelPreview.sortList);
		}
	}

	public sortList(a, b) {
		if ((Model_FunctionPreview.drawArr.indexOf(a.id) != -1 && Model_FunctionPreview.drawArr.indexOf(b.id) != -1) ||
			(Model_FunctionPreview.drawArr.indexOf(a.id) == -1 && Model_FunctionPreview.drawArr.indexOf(b.id) == -1)) {
			return a.id - b.id;
		} else {
			if (Model_FunctionPreview.drawArr.indexOf(a.id) != -1) {
				return 1;
			} else {
				return -1;
			}
		}
	}

	/**1801  打开功能预览界面 */
	public CG_OPEN_FUNCTIONPREVIEW() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(1801, ba);
	}
	/**1803 领取目标奖励 I:关卡id  */
	public CG_FUNCTIONPREVIEW_DRAWREWARD(guanqia) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(guanqia);
		this.sendSocket(1803, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(1802, this.GC_OPEN_FUNCTIONPREVIEW, this);
		wsm.regHand(1804, this.GC_FUNCTIONPREVIEW_DRAWREWARD, this);
	}

	/**1804 领取目标奖励 B:状态，1：成功，2：没有该奖励 3：当前关卡不满足 4：不可重复领取I:状态为成功时返回关卡奖励id  */
	public GC_FUNCTIONPREVIEW_DRAWREWARD(self: Model_FunctionPreview, data: BaseBytes) {
		let result = data.readByte();
		if (result == 1) {
			Model_FunctionPreview.drawArr.push(data.readInt());
			GGlobal.control.notify(Enum_MsgType.FUNCTIONPREVIEW);
		}
	}

	public static isFirstOpen: boolean = false;
	/**1802 打开功能预览界面 [I:关卡id]已领取的列表I:现在的关卡id  */
	public GC_OPEN_FUNCTIONPREVIEW(self: Model_FunctionPreview, data: BaseBytes) {
		Model_FunctionPreview.drawArr = [];
		Model_FunctionPreview.isFirstOpen = true;
		for (let i = 0, len = data.readShort(); i < len; i++) {
			Model_FunctionPreview.drawArr.push(data.readInt());
		}
		GGlobal.control.notify(Enum_MsgType.FUNCTIONPREVIEW);
	}
}