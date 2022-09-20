class Model_HomeTask extends BaseModel {
	public constructor() {
		super();
	}

	static OPEN_TASK = "open_task"
	static UP_TASK = "up_task"
	static OPEN_GOAL = "open_goal"
	static UP_GOAL = "up_goal"

	//CG打开府邸日常任务界面
	public CG_OPEN_DAYTASK_11407(): void {
		var bates = this.getBytes();
		this.sendSocket(11407, bates);
	}

	//获取任务奖励 I: 任务索引
	public CG_GET_TASK_REWARD_11409(id): void {
		var bates = this.getBytes();
		bates.writeInt(id);
		this.sendSocket(11409, bates);
	}

	//获取宝箱奖励I:宝箱索引
	public CG_GET_BOX_REWARD_11411(id): void {
		var bates = this.getBytes();
		bates.writeInt(id);
		this.sendSocket(11411, bates);
	}

	//CG打开府邸目标
	public CG_OPEN_GOAL_11413(): void {
		var bates = this.getBytes();
		this.sendSocket(11413, bates);
	}

	//CG获取目标奖励 I:目标序号
	public CG_GET_GOAL_REWARD_11415(id): void {
		var bates = this.getBytes();
		bates.writeInt(id);
		this.sendSocket(11415, bates);
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(11408, this.GC_OPEN_DAYTASK_11408, this);
		mgr.regHand(11410, this.GC_GET_TASK_REWARD_11410, this);
		mgr.regHand(11412, this.GC_GET_BOX_REWARD_11412, this);
		//目标
		mgr.regHand(11414, this.GC_OPEN_GOAL_11414, this);
		mgr.regHand(11416, this.GC_GET_GOAL_REWARD_11416, this);
		mgr.regHand(11418, this.GC_GOAL_CHANG_11418, this);
	}

	/**任务数据*/
	public data: Vo_HomeTask[] = [];
	public mappingObj;
	/**宝箱数据*/
	public boxData: number[] = [0, 0, 0, 0, 0];
	public initLib() {
		this.mappingObj = {};
		let lib = Config.fdrc_019;
		for (var i in lib) {
			let vo: Vo_HomeTask = new Vo_HomeTask();
			vo.initLib(lib[i]);
			this.mappingObj[vo.id] = vo;
		}
	}

	// public sortTask() {
	// 	this.data.sort(function (a, b) {
	// 		return a.sortIndex < b.sortIndex ? -1 : 1;
	// 	});
	// }

	/**
	 * GC 打开府邸日常任务返回 [I:任务idI:奖励完成状态0 1 2][I:宝箱索引I:奖励完成状态0 1 2]
	*/
	private GC_OPEN_DAYTASK_11408(s: Model_HomeTask, b: BaseBytes) {
		s.data = [];
		if (!s.mappingObj) s.initLib();
		let len = b.readShort();
		let vo: Vo_HomeTask;
		let id;
		for (let i = 0; i < len; i++) {
			id = b.readInt();
			vo = s.mappingObj[id]//s.getVoById(id);
			if (vo) {
				vo.state = b.readInt();
				vo.update();
				s.data.push(vo);
			}
		}
		len = b.readShort();
		s.boxData = [];
		for (let i = 0; i < len; i++) {
			s.boxData[b.readInt()] = b.readInt();
		}
		s.sortTask(s.data);
		s.checkNotice();
		s.notify(Model_HomeTask.OPEN_TASK)
	}

	/**
	 * 日常任务奖励状态变化 I:任务索引I: 奖励状态
	*/
	private GC_GET_TASK_REWARD_11410(s: Model_HomeTask, b: BaseBytes) {
		let id = b.readInt();
		if (!s.mappingObj) s.initLib();
		let vo = s.mappingObj[id]//s.getVoById(id);
		vo.state = b.readInt();
		vo.update();
		s.sortTask(s.data);
		s.checkNotice();
		s.notify(Model_HomeTask.OPEN_TASK);
	}

	/**
	 *GC每日宝箱奖励变化 I:宝箱索引I: 奖励状态
	*/
	private GC_GET_BOX_REWARD_11412(s: Model_HomeTask, b: BaseBytes) {
		let id = b.readInt();
		s.boxData[id] = b.readInt();
		s.checkNotice();
		s.notify(Model_HomeTask.UP_TASK);
		s.notify(Model_HomeTask.OPEN_TASK);
	}

	checkNotice() {
		let s = this;
		let red = s.getTaskRed();
		let red1 = s.getGoalRed();
		let reddot = GGlobal.reddot
		reddot.setCondition(UIConst.HOME_TASK, 0, red || red1)
		reddot.setCondition(UIConst.HOME_TASK, 1, red)
		reddot.setCondition(UIConst.HOME_TASK, 2, red1)
		reddot.notify(UIConst.HOME_TASK);
	}

	private getTaskRed() {
		let s = this;
		for (let i = 0; i < s.data.length; i++) {
			if (s.data[i].state == 1) {
				return true;
			}
		}
		for (let i = 0; i < s.boxData.length; i++) {
			if (s.boxData[i] == 1) {
				return true;
			}
		}
		return false
	}

	private getGoalRed() {
		let s = this;
		for (let i = 0; i < s.datGoal.length; i++) {
			for (let j = 0; j < s.datGoal[i].length; j++) {
				if (s.datGoal[i][j].state == 1) {
					return true;
				}
			}
		}
		return false
	}

	//============================================================
	/**任务数据*/
	private _dGoal: Vo_HomeGoal[][] = null;
	private _mapGoal: { [id: number]: Vo_HomeGoal };

	public get datGoal(): Vo_HomeGoal[][] {
		let s = this;
		if (s._dGoal == null) {
			s._dGoal = []
			s._mapGoal = {}
			for (let k in Config.fdmb_019) {
				let v = new Vo_HomeGoal();
				v.initCfg(Config.fdmb_019[k])
				s._mapGoal[v.id] = v;
				if (s._dGoal[v.fenlei - 1] == null) {
					s._dGoal[v.fenlei - 1] = []
				}
				s._dGoal[v.fenlei - 1].push(v);
			}
		}
		return this._dGoal
	}

	public progreGoal: any = {}



	public sortTask(arr: Vo_HomeTask[]) {
		arr.sort(function (a, b) {
			return a.sortIndex < b.sortIndex ? -1 : 1;
		});
	}

	public sortGOAL(arr: Vo_HomeGoal[][]) {
		for (let i = 0; i < arr.length; i++) {
			let v = arr[i];
			v.sort(function (a, b) {
				return a.sortIndex < b.sortIndex ? -1 : 1;
			});
		}

	}
	//GC府邸目标奖励状态返回 [I:目标idI:奖励状态][I:类别I: 任务进度]目标进度按类型
	private GC_OPEN_GOAL_11414(s: Model_HomeTask, b: BaseBytes) {
		s.datGoal;
		let len = b.readShort();
		for (let i = 0; i < len; i++) {
			let id = b.readInt();
			let state = b.readInt();
			let v = s._mapGoal[id];
			v.state = state;
			v.update();
		}
		s.sortGOAL(s.datGoal);
		len = b.readShort();
		s.progreGoal = {};
		for (let i = 0; i < len; i++) {
			let type = b.readInt()
			let progress = b.readInt()
			s.progreGoal[type] = progress;
		}
		s.checkNotice();
		s.notify(Model_HomeTask.OPEN_GOAL)
	}


	/**
	 * CG 府邸目标奖励变化 I: 目标idI:奖励状态
	*/
	private GC_GET_GOAL_REWARD_11416(s: Model_HomeTask, b: BaseBytes) {
		let id = b.readInt();
		if (!s._mapGoal) s.datGoal;
		let vo = s._mapGoal[id]//s.getVoById(id);
		vo.state = b.readInt();
		vo.update();
		s.sortGOAL(s.datGoal);
		s.checkNotice();
		s.notify(Model_HomeTask.UP_GOAL);
	}

	/**
	 * GC 按类别某些目标组变化 I: 目标分类序号I:目标分类参数变化
	*/
	private GC_GOAL_CHANG_11418(s: Model_HomeTask, b: BaseBytes) {
		let id = b.readInt();
		if (!s._mapGoal) s.datGoal;
		let vo = s._mapGoal[id]//s.getVoById(id);
		vo.state = b.readInt();
		vo.update();
		s.sortGOAL(s.datGoal);
		s.checkNotice();
		s.notify(Model_HomeTask.UP_GOAL);
	}
}