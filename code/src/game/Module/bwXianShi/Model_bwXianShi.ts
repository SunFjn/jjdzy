class Model_bwXianShi extends BaseModel {
	//宝物现世 by xhm
	public constructor() {
		super();
	}

	public listenServ(mgr: WebSocketMgr) {
		let s = this;
		s.socket = mgr;
		mgr.regHand(4000, s.GC_LOGINDATA_4000, s);
		mgr.regHand(4002, s.GC_GETAWARDS_4002, s);
	}
	//战斗结束通知
	public CG_GETAWARDS_4001() {
		let ba = this.getBytes();
		ba.writeByte(1);
		this.sendSocket(4001, ba);
	}

	public batTime;
	public batCount;

	/**登录发需要用的数据 I:下次显示宝物的时间B:今天可挑战次数*/
	private GC_LOGINDATA_4000(s: Model_bwXianShi, d: BaseBytes) {
		s.batTime = d.readInt();
		s.batCount = d.readByte();
		s.bwXianShi();
	}

	public bwXianShi(){
		if(!ModuleManager.isOpen(UIConst.BW_XIANSHI))
		{
			return;
		}
		let s = GGlobal.modelbwXianShi;
		if (s.batCount > 0) {
			Timer.instance.listen(s.updateTime, s, 1000);
		} else {
			Timer.instance.remove(s.updateTime, s);
		}
	}

	public static dropArr;
	/**战斗结束通知 B:结果 1成功*/
	private GC_GETAWARDS_4002(s: Model_bwXianShi, d: BaseBytes) {
		let res = d.readByte();
		Model_bwXianShi.dropArr = [];
		if (res == 1) {
			let len = d.readShort()
			Model_bwXianShi.dropArr = [];
			for (let i = 0; i < len; i++) {
				var type = d.readByte();
				var id = d.readInt();
				var count = d.readInt();
				Model_bwXianShi.dropArr.push([type, id, count]);
			}
			s.serGainText();
		}
		GGlobal.control.notify(Enum_MsgType.BAOWU_XIANSHI_DROP);
	}

	public serGainText():void{
		for (let i = 0; i < Model_bwXianShi.dropArr.length; i++) {
			let d = Model_bwXianShi.dropArr[i]
			var type = d[0];
			var id = d[1];
			var count = d[2];
			if(Model_BaoWu.isBaoWuJHItem(id)){
				Model_BaoWu.mustAndShow(id);
			}
		}
	}

	private updateTime() {
		let s = this;
		let t = Model_GlobalMsg.getServerTime() / 1000 - s.batTime;
		if (t >= 0) {
			Timer.instance.remove(s.updateTime, s);
			GGlobal.mainUICtr.addTipBTN(UIConst.BW_XIANSHI);
		}
	}
}