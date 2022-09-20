/**
 * Model_YuanXiaoLocal
 * 做元宵
 */
class Model_YuanXiaoLocal extends BaseModel {

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(11630, this.GC_YuanXiaoLocal_openUi_11630, this);
		mgr.regHand(11632, this.GC_YuanXiaoLocal_openBattle_11632, this);
		mgr.regHand(11634, this.GC_YuanXiaoLocal_battleHid_11634, this);
		mgr.regHand(11636, this.GC_YuanXiaoLocal_refresh_11636, this);
		mgr.regHand(11638, this.GC_YuanXiaoLocal_make_11638, this);
	}

	/**11639 CG 获取元宵免费材料  */
	public CG_GET_YUANXIAO_CAILIAO() {
		var bates = this.getBytes();
		this.sendSocket(11639, bates);
	}

	/**11640 GC 材料数量变化 I:材料1I:材料2I:材料3  */
	public GC_YUANXIAO_CAILIAO_CHANGE(self: Model_YuanXiaoLocal, data: BaseBytes): void {
		let arg3 = data.readInt();
		let arg4 = data.readInt();
		let arg5 = data.readInt();
		self.numArr = [arg3, arg4, arg5];
		GGlobal.control.notify(UIConst.ACTCOM_YUANXIAO);
	}

	/**11642 领取免费材料返回 B:0成功 1失败I:已经领取次数I:可以领取次数  */
	public GC_YUANXIAO_CAILIAO_DRAW(self: Model_YuanXiaoLocal, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			self.drawTime = data.readInt();
			self.drawNum = data.readInt();
			GGlobal.control.notify(UIConst.ACTCOM_YUANXIAO);
		}
	}

	public drawNum = 0;
	public drawTime = 0;
	public numArr = [];
	public ldNum = 0;
	public resTime = 0;
	public battleReportArr: { name: string, state: number, itemID: number, count: number }[] = [];
	public roleDic: { [type: number]: { id: number, name: string, power: number, weapon: number, job: number, ride: number, surNum: number, state: number }[] }
	/**11630 I-I-I-I-I GC 打开ui返回 I:可领取免费次数freenumI:倒计时timeI:材料1数量onenumI:材料2数量twonumI:材料3数量threenum*/
	public GC_YuanXiaoLocal_openUi_11630(self: Model_YuanXiaoLocal, data: BaseBytes): void {
		self.drawNum = data.readInt();
		self.drawTime = data.readInt();
		let arg3 = data.readInt();
		let arg4 = data.readInt();
		let arg5 = data.readInt();
		self.numArr = [arg3, arg4, arg5];
		GGlobal.control.notify(UIConst.ACTCOM_YUANXIAO);
	}

	/**11631  CG 打开抢夺材料界面 B:打卡某个材料抢夺界面 */
	public CG_YuanXiaoLocal_openBattle_11631(type: number): void {
		var bates = this.getBytes();
		bates.writeByte(type);
		this.sendSocket(11631, bates);
	}

	/**11632 GC 打开掠夺界面返回 I:剩余掠夺次数I:刷新时间B:材料分类（1 2 3）[L:玩家idU:玩家名字L:玩家战力I:武器模型I:人物模型（job）I:坐骑I:剩余对应材料数量B:掠夺状态0未掠夺1已掠夺]*/
	public GC_YuanXiaoLocal_openBattle_11632(self: Model_YuanXiaoLocal, data: BaseBytes): void {
		self.ldNum = data.readInt();
		self.resTime = data.readInt();
		let type = data.readByte();
		self.roleDic[type] = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let arg3 = data.readLong();
			let arg4 = data.readUTF();
			let arg5 = data.readLong();
			let arg6 = data.readInt();
			let arg7 = data.readInt();
			let arg8 = data.readInt();
			let arg9 = data.readInt();
			let state = data.readByte();
			self.roleDic[type].push({ id: arg3, name: arg4, power: arg5, weapon: arg6, job: arg7, ride: arg8, surNum: arg9, state: state });
		}
		GGlobal.control.notify(UIConst.ACTCOM_YUANXIAO);
	}

	/**11633CG 请求掠夺 B:目标材料对象L:目标id*/
	public CG_YuanXiaoLocal_battleHid_11633(type: number, arg1): void {
		var bates = this.getBytes();
		bates.writeByte(type);
		bates.writeLong(arg1);
		this.sendSocket(11633, bates);
	}

	/**11634GC GC战斗返回 B:0开始战斗 1对方没有屯粮了B:0胜利1失败I:拥有材料1数量I:拥有材料2数量I:拥有材料3数量
	 * L:胜利玩家IDI:胜利头像IDL:战力U:名字I:胜利者将衔IDL:左边玩家IDL:右边玩家ID*/
	public GC_YuanXiaoLocal_battleHid_11634(self: Model_YuanXiaoLocal, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			let arg2 = data.readByte();
			let arg3 = data.readInt();
			let arg4 = data.readInt();
			let arg5 = data.readInt();
			self.numArr = [arg3, arg4, arg5];
			self.enterBattle(data);
		} else {
			if (result == 1) {
				ViewCommonWarn.text("对方没有屯粮了");
			}
		}
	}

	public enterBattle(data: BaseBytes) {
		let winerid = data.readLong();
		let headid = data.readInt();
		let power = data.readLong();
		let name = data.readUTF();
		let jiangxian = data.readInt();
		let leftid = data.readLong();
		let rightid = data.readLong();
		let ctrl = SceneCtrl.getCtrl(SceneCtrl.COMMON_VIDEOTAP) as CommonVideotapeCtrl;
		ctrl.power = power;
		ctrl.name = name;
		ctrl.winerid = winerid;
		ctrl.headid = headid;
		ctrl.jiangxian = jiangxian;
		ctrl.leftid = leftid;
		ctrl.rightid = rightid;
		let vo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_YUANXIAO);
		ctrl.panelIdArr = [vo.groupId];
		GGlobal.mapscene.scenetype = SceneCtrl.COMMON_VIDEOTAP;
		GGlobal.mapscene.enterSceneCtrl(ctrl);
	}

	/**11635 B CG刷新 B:材料x（24,25,26）type*/
	public CG_YuanXiaoLocal_refresh_11635(arg1): void {
		var bates = this.getBytes();
		bates.writeByte(arg1);
		this.sendSocket(11635, bates);
	}

	/**11636 B GC刷新返回11632 B:0成功 1没有人有材料 2次数不够rest*/
	public GC_YuanXiaoLocal_refresh_11636(self: Model_YuanXiaoLocal, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			ViewCommonWarn.text("刷新成功");
		}
	}

	/**11637  CG 制作元宵 */
	public CG_YuanXiaoLocal_make_11637(): void {
		var bates = this.getBytes();
		this.sendSocket(11637, bates);
	}

	/**11638 GC 制作结果 B:0成功 1材料不足 I:道具IDI:道具数量I:材料1数量I:材料2数量I:材料3数量*/
	public GC_YuanXiaoLocal_make_11638(self: Model_YuanXiaoLocal, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			let itemID = data.readInt();
			let count = data.readInt();
			let arg3 = data.readInt();
			let arg4 = data.readInt();
			let arg5 = data.readInt();
			let itemVo = VoItem.create(itemID);
			itemVo.count = count;
			self.numArr = [arg3, arg4, arg5];
			GGlobal.control.notify(UIConst.ACTCOM_YUANXIAO_EFF);
		}
	}

}