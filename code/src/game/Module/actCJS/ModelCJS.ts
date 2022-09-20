/**
 * 成就树数据管理器
 * @author: lujiahao 
 * @date: 2019-11-20 15:38:05 
 */
class ModelCJS extends BaseModel {
	constructor() {
		super();
	}

	private _taskVoMap: { [taskId: number]: VoTaskCJS } = {};
	private _rewardVoMap: { [id: number]: VoLayerRewardCJS } = {};
	private _maxLayerMap: { [qs: number]: number } = {};

	/** 当前层数 */
	public curLayer = 1;

	private _setupFlag = false;
	public setup() {
		if (this._setupFlag)
			return;
		this._setupFlag = true;

		{
			let t_cfg = Config.cjs_769;
			for (let k in t_cfg) {
				let t_vo = new VoTaskCJS();
				t_vo.id = ~~k;
				let t_qs = t_vo.cfg.qs;
				let t_cs = t_vo.cfg.cs;
				let t_maxLayer = this._maxLayerMap[t_qs];
				if (t_maxLayer === undefined) {
					this._maxLayerMap[t_qs] = t_cs;
				}
				else {
					if (t_cs > t_maxLayer) {
						this._maxLayerMap[t_qs] = t_cs;
					}
				}
				this._taskVoMap[t_vo.id] = t_vo;
			}
		}

		{
			let t_cfg = Config.cjsjl_769;
			for (let k in t_cfg) {
				let t_vo = new VoLayerRewardCJS();
				t_vo.id = ~~k;
				this._rewardVoMap[t_vo.id] = t_vo;
			}
		}
	}
	//========================================= 协议相关 ========================================
	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		//注册GC方法
		mgr.regHand(10570, this.GC_AchievementTree_openUI_10570, this);
		mgr.regHand(10572, this.GC_AchievementTree_openFloorUI_10572, this);
		mgr.regHand(10574, this.GC_AchievementTree_getReward_10574, this);
	}

	/**10570 [B-[I-B-L]]-I 打开界面返回 [B:任务类型[I:任务idB:任务状态 0未完成 1已完成L:对应的完成值]]任务数据sendDataI:当前成就树层数floor*/
	public GC_AchievementTree_openUI_10570(self: ModelCJS, data: BaseBytes): void {
		let t_change = false;
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let arg1 = data.readByte(); //任务类型
			let len1 = data.readShort();
			for (let i = 0; i < len1; i++) {
				let arg2 = data.readInt(); //任务id
				let arg3 = data.readByte(); //任务状态
				let arg4 = data.readLong(); //任务计数

				let t_vo = self.getTaskVoById(arg2);
				if (t_vo) {
					let t_maxCount = t_vo.cfg.cs1;
					arg4 = arg4 > t_maxCount ? t_maxCount : arg4;
					if (t_vo.update({ state: arg3, count: arg4 })) {
						t_change = true;
					}
				}
			}
		}

		let t_qs = self.getCurQs();
		let arg5 = data.readInt(); //当前层数
		if (self.curLayer != arg5) {
			self.curLayer = arg5;
			t_change = true;

			//把之前层次的任务设置成完成
			for (let i = arg5 - 1; i >= 1; i--) {
				let t_voList = self.getTaskVoListByQsAndLayer(t_qs, i);
				for (let v of t_voList) {
					v.update({ state: 1, count: v.cfg.cs1 })
				}
			}
		}

		if (t_change) {
			GGlobal.control.notify(Enum_MsgType.CJS_UPDATE);
		}
	}

	/**10572 [I-B] 打开成就树楼层奖励返回 [I:成就树楼层indexB:状态 0未领取 1可领取 2已领取]成就树层数奖励sendList*/
	public GC_AchievementTree_openFloorUI_10572(self: ModelCJS, data: BaseBytes): void {
		let t_change = false;
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let arg1 = data.readInt(); //id
			let arg2 = data.readByte(); //状态

			let t_vo = self.getRewardVoById(arg1);
			if (t_vo && t_vo.update({ state: arg2 })) {
				t_change = true;
			}
		}
		if (t_change) {
			self.reddotCheck();
			GGlobal.control.notify(Enum_MsgType.CJS_REWARD_UPDATE);
		}
	}

	/**10571  打开成就树楼层奖励 */
	public CG_AchievementTree_openFloorUI_10571(): void {
		var bates = this.getBytes();
		this.sendSocket(10571, bates);
	}

	/**10573 I 领取奖励 I:表的idindex*/
	public CG_AchievementTree_getReward_10573(arg1): void {
		var bates = this.getBytes();
		bates.writeInt(arg1);
		this.sendSocket(10573, bates);
	}

	/**10574 B-I 领取奖励返回 B:状态 0失败 1成功stateI:失败(1未达到要求层数 2已领取 3非法参数) 成功的时候返回表的indexindex*/
	public GC_AchievementTree_getReward_10574(self: ModelCJS, data: BaseBytes): void {
		let t_change = false;

		let arg1 = data.readByte(); //结果
		let arg2 = data.readInt(); //id

		switch (arg1) {
			case 1: //成功
				let t_vo = self.getRewardVoById(arg2);
				if (t_vo && t_vo.update({ state: 2 })) {
					t_change = true;
				}
				break;
			case 0: //失败
				switch (arg2) {
					case 1:
						ViewCommonWarn.text("未达指定层数");
						break;
					case 2:
						ViewCommonWarn.text("奖励已领取过了");
						break;
					case 3:
						ViewCommonWarn.text("非法参数");
						break;
					default:
						ViewCommonWarn.text("[ERROR]未知错误");
						break;
				}
				break;
		}

		if (t_change) {
			self.reddotCheck();
			GGlobal.control.notify(Enum_MsgType.CJS_REWARD_UPDATE);
		}
	}

	//=========================================== API ==========================================
	/** 获取当前活动期数 */
	public getCurQs(): number {
		let t_actVo = GGlobal.modelActivity.getActivityByID(UIConst.ACTCOM_CJS);
		if (t_actVo)
			return t_actVo.qs;
		else
			return 1;
	}

	public getTaskVoById(pTaskId: number): VoTaskCJS {
		return this._taskVoMap[pTaskId];
	}

	private _taskVoListMap: { [key: string]: VoTaskCJS[] } = {};
	/**
	 * 通过期数和层数获取任务数据列表
	 * @param pQs 期数
	 * @param pLayer 层数
	 */
	public getTaskVoListByQsAndLayer(pQs: number, pLayer: number): VoTaskCJS[] {
		let t = this;
		let t_key = pQs + "_" + pLayer;
		let t_list = t._taskVoListMap[t_key];
		if (t_list === undefined) {
			t._taskVoListMap[t_key] = t_list = [];
			for (let k in t._taskVoMap) {
				let t_vo = t._taskVoMap[k];
				if (t_vo && t_vo.cfg.qs == pQs && t_vo.cfg.cs == pLayer) {
					t_list.push(t_vo);
				}
			}
		}
		return t_list;
	}

	/**
	 * 通过期数获取最大层数
	 * @param pQs 期数
	 */
	public getMaxLayerByQs(pQs: number): number {
		return this._maxLayerMap[pQs];
	}

	public getRewardVoById(pId: number): VoLayerRewardCJS {
		return this._rewardVoMap[pId];
	}

	private _rewardVoListMap: { [qs: number]: VoLayerRewardCJS[] } = {};
	/**
	 * 通过期数获取奖励数据列表
	 * @param pQs 期数
	 */
	public getRewardVoListByQs(pQs: number): VoLayerRewardCJS[] {
		let t = this;
		let t_list = t._rewardVoListMap[pQs];
		if (t_list === undefined) {
			t._rewardVoListMap[pQs] = t_list = [];
			for (let k in t._rewardVoMap) {
				let t_vo = t._rewardVoMap[k];
				if (t_vo && t_vo.cfg.qs == pQs) {
					t_list.push(t_vo);
				}
			}
		}
		return t_list;
	}

	//===================================== private method =====================================
	private reddotCheck() {
		let t = this;
		let t_value = false;
		let t_qs = t.getCurQs();
		let t_voList = t.getRewardVoListByQs(t_qs);
		for (let v of t_voList) {
			if (v.state == 1) {
				t_value = true;
				break;
			}
		}
		GGlobal.reddot.setCondition(UIConst.ACTCOM_CJS, 1, t_value);
		GGlobal.reddot.notify(UIConst.ACTCOM);
	}
	//======================================== handler =========================================
}