/**
 * Model_RedBoxAct
 * 红包活动
 */
class Model_HongBao extends BaseModel {

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(11760, this.GC_RedBoxAct_openUi_11760, this);
		mgr.regHand(11762, this.GC_RedBoxAct_lookinfos_11762, this);
		mgr.regHand(11764, this.GC_RedBoxAct_faBoxs_11764, this);
		mgr.regHand(11766, this.GC_RedBoxAct_getBox_11766, this);
		mgr.regHand(11768, this.GC_RedBoxAct_tishi_11768, this);
	}

	public static max = 10;
	public moneyNum = 0;
	public surNum = 0;
	public hbArr: Vo_HongBao[] = [];
	public recordArr = [];
	public drawID = 0;
	/**11760 L-I-[L-U-U-I-I-B-I-I] GC打开红包ui返回 L:金元宝数量maxNumI:剩余发送红包机会leftNum[L:红包唯一idU:发送者名字U:红包名称I:头像idI:头像框B:已经领取人数I:领取了多少 0是没有领取 >0领取了I:红包总金额]redBoxs*/
	public GC_RedBoxAct_openUi_11760(self: Model_HongBao, data: BaseBytes): void {
		self.hbArr = [];
		self.moneyNum = data.readLong();
		self.surNum = data.readInt();
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let vo = new Vo_HongBao();
			vo.readData(data);
			self.hbArr.push(vo);
		}
		GGlobal.control.notify(UIConst.HONGBAO);
	}

	/**11761 L CG 查看红包领取情况 L:红包唯一idboxid*/
	public CG_RedBoxAct_lookinfos_11761(arg1): void {
		var bates = this.getBytes();
		bates.writeLong(arg1);
		this.sendSocket(11761, bates);
	}

	/**11762 GC查看红包领取情况 [U:玩家名字L:领取红包数量B:是否玩家本人,1是,0不是]*/
	public GC_RedBoxAct_lookinfos_11762(self: Model_HongBao, data: BaseBytes): void {
		self.recordArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let vo = new Vo_HongBao();
			vo.drawNum = len;
			vo.readRecord(data);
			self.recordArr.push(vo);
		}
		GGlobal.control.notify(UIConst.HONGBAO_RECORD);
	}

	/**11763 L-U CG 发送红包 L:红包数量fanumU:红包名称boxname*/
	public CG_RedBoxAct_faBoxs_11763(arg1, arg2): void {
		var bates = this.getBytes();
		bates.writeLong(arg1);
		bates.writeUTF(arg2);
		this.sendSocket(11763, bates);
	}

	/**11764 B GC 发红包返回 B:0成功1次数不够2金元宝不足rest*/
	public GC_RedBoxAct_faBoxs_11764(self: Model_HongBao, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			GGlobal.layerMgr.close2(UIConst.HONGBAO_SEND);
			self.CG_OPEN_HONGBAO_11769();
			ViewCommonWarn.text("发送红包成功");
		} else if (result == 3) {
			ViewCommonWarn.text("含有非法字符");
		} else if (result == 5) {
			ViewCommonWarn.text("此时间段不能发红包");
		}
	}

	/**11765 L CG领取红包 L:红包唯一idboxid*/
	public CG_RedBoxAct_getBox_11765(arg1): void {
		let self = this;
		var bates = self.getBytes();
		bates.writeLong(arg1);
		self.drawID = arg1;
		self.sendSocket(11765, bates);
	}

	/**11766 B-L GC 领取红包返回 B:0成功1被抢光了restL:领取数量num*/
	public GC_RedBoxAct_getBox_11766(self: Model_HongBao, data: BaseBytes): void {
		let result = data.readByte();
		let arg2 = data.readLong();
		for (let i = 0; i < self.hbArr.length; i++) {
			if (self.hbArr[i].id == self.drawID) {
				if (result == 0) {
					self.hbArr[i].robNum = arg2;
				} else if (result == 1) {
					self.hbArr[i].drawNum = Model_HongBao.max;
					ViewCommonWarn.text("红包已被抢光");
				}
				break;
			}
		}
		GGlobal.control.notify(UIConst.HONGBAO);
	}

	/**11768 U GC提示有人发了红包 U:玩家名字name*/
	public GC_RedBoxAct_tishi_11768(self: Model_HongBao, data: BaseBytes): void {
		let arg1 = data.readUTF();
		if (ModuleManager.isOpen(UIConst.HONGBAO)) {
			TJHBEff.show();
			GGlobal.modelchat.addNotice(true, 116, arg1 + "_")
			GGlobal.mainUICtr.addReportBTN(UIConst.HONGBAO);
		}
	}

	/**11769  打开红包ui返回11760   */
	public CG_OPEN_HONGBAO_11769() {
		var bates = this.getBytes();
		this.sendSocket(11769, bates);
	}

}