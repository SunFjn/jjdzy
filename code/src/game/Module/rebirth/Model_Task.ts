class Model_Task extends BaseModel {
	public constructor() {
		super();
	}
	/***当前活跃度*/
	public huoyuedu: number = 0;

	/**任务数据*/
	public data: VoTask[];
	public mappingObj;
	/**宝箱数据*/
	public boxData: any[] = [0, 0, 0, 0, 0];
	public initLib() {
		this.mappingObj = {};
		let vo: VoTask;
		let obj;
		let lib = Config.meirirenwu_708;
		for (var i in lib) {
			vo = new VoTask();
			obj = lib[i];
			vo.id = obj["id"];
			vo.lib = obj;
			vo.initLib();
			this.mappingObj[vo.id] = vo;
		}
	}

	public sort(){
		this.data.sort(function (a,b){
			return a.sortIndex < b.sortIndex?-1:1;
		});
	}

	listenServ(sc: WebSocketMgr) {
		this.socket = sc;
		sc.regHand(1050, this.GC_DATA_1050, this);
		sc.regHand(1052, this.GC_INFO_1052, this);
		sc.regHand(1054, this.GC_AWARDS_1054, this);
		sc.regHand(1056, this.GC_BX_1056, this);
	}

	/**
	 * 1050
	 * I-I-B-B
	 * GC I:活跃度I:任务idB:完成数B:奖励状态  更新变化
	*/
	private GC_DATA_1050(s: Model_Task, b: BaseBytes) {
		if (!s.mappingObj) s.initLib();
		s.huoyuedu = b.readInt();
		let id = b.readInt();
		let pro = b.readByte();
		let state = b.readByte();
		let vo = s.mappingObj[id];
		vo.progress = pro;
		vo.state = state;
		vo.update();
		GGlobal.control.notify(Enum_MsgType.MSG_TASK_UP, 0);
	}

	/**CG 打开每日任务ui*/
	public CG_INFO_1051() {
		this.socket.sendCMDBytes(1051, this.getBytes());
	}
	/**
	 * 1052
	 * I-[I-B-B]-[B-B]
	 * GC 获取每日任务ui I:活跃度[I:任务idB:任务完成数B:任务奖励转态][B:宝箱奖励idB:奖励状态]
	*/
	private GC_INFO_1052(s: Model_Task, b: BaseBytes) {
		s.data = [];
		var d = s.data;
		if (!s.mappingObj) s.initLib();
		s.huoyuedu = b.readInt();
		let len = b.readShort();
		let vo: VoTask;
		let id;
		for (let i = 0; i < len; i++) {
			id = b.readInt();
			vo = s.mappingObj[id]//s.getVoById(id);
			vo.progress = b.readByte();
			vo.state = b.readByte();
			vo.update();
			d.push(vo);
		}
		len = b.readShort();
		s.boxData = [];
		for (let i = 0; i < len; i++) {
			s.boxData[b.readByte()] = b.readByte();
		}
		s.sort();
		GGlobal.control.notify(Enum_MsgType.MSG_TASK_UP);
	}

	/**
	 * 1053
	 * i
	 * CG 获取每日任务奖励 I:任务id
	*/
	public CG_AWARDS_1053(i) {
		var b = this.getBytes();
		b.writeInt(i);
		this.socket.sendCMDBytes(1053, b);
	}
	/**
	 * 1054
	 * B-I-B
	 * GC 获取每日任务奖励 B:0成功 1失败I:任务idB:任务奖励转态
	*/
	private GC_AWARDS_1054(s: Model_Task, b: BaseBytes) {
		var ret = b.readByte();
		if (ret == 0) {
			let id = b.readInt();
			let vo = s.mappingObj[id]//s.getVoById(id);
			vo.state = b.readByte();
			vo.update();
			s.sort(); 
			GGlobal.control.notify(Enum_MsgType.MSG_TASK_UP, 1);
		} else ViewCommonWarn.text("领取失败");
	}

	/**
	 * 1055
	 * B
	 * 	CG 领取活跃宝箱奖励 B:宝箱id
	*/
	public CG_BX_1055(i) {
		var b = this.getBytes();
		b.writeByte(i);
		this.socket.sendCMDBytes(1055, b);
	}
	/**
	 * 1056
	 * B-B-B
	 * GC 获取活跃宝箱返回 B:0成功 1失败B:宝箱indexB:转态
	*/
	private GC_BX_1056(s: Model_Task, b: BaseBytes) {
		var ret = b.readByte();
		if (ret == 0) {
			let id = b.readByte();
			s.boxData[id] = b.readByte();
			GGlobal.control.notify(Enum_MsgType.MSG_TASK_UP, 2);
		} else ViewCommonWarn.text("领取失败");
	}

}