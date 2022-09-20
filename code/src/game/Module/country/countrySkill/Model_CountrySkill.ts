class Model_CountrySkill extends BaseModel {
	public constructor() {
		super();
	}

	/**打开界面 */
	public CG_OPENUI(): void {
		var bates = this.getBytes();
		this.sendSocket(6001, bates);
	}

	/**激活或升级 I:技能idB:状态：1：激活，2：升级 */
	public CG_JIHUO_OR_UPLV(skillId: number): void {
		var bates = this.getBytes();
		bates.writeInt(skillId)
		this.sendSocket(6003, bates);
	}

	public shengwang = 0;
	public status = 1;//B:王位之争活动开启状态，0：未开启，1：已开启
	public skillArr: { skillId: number, isAct: number, cfg: Igjjn_748 }[] = [];

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(6002, this.GC_OPENUI_6002, this);
		mgr.regHand(6004, this.GC_JIHUO_OR_UPLV_6004, this);
	}

	//打开界面返回 [I:技能idB:是否激活，0：未激活，1：激活]技能列表I:国家战力I:国家声望
	private GC_OPENUI_6002(self: Model_CountrySkill, data: BaseBytes): void {
		self.skillArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let skillId = data.readInt();
			let isAct = data.readByte();
			let cfg = Config.gjjn_748[skillId];
			self.skillArr[cfg.wz - 1] = { skillId: skillId, isAct: isAct, cfg: cfg };
		}
		self.shengwang = data.readLong();
		self.status = data.readByte();
		GGlobal.control.notify(Enum_MsgType.COUNTRY_SKILL_OPEN_UI);
		GGlobal.control.notify(Enum_MsgType.COUNTRY_SKILL_RED);
	}

	//激活或升级返回 B:状态：0：失败，1：成功，2：未满足条件field: state I:技能id
	private GC_JIHUO_OR_UPLV_6004(self: Model_CountrySkill, data: BaseBytes): void {
		let res = data.readByte();
		let skillId = data.readInt();
		self.shengwang = data.readLong();
		if (res == 1) {
			let v = Config.gjjn_748[skillId];
			self.skillArr[v.wz - 1].skillId = skillId
			self.skillArr[v.wz - 1].cfg = v
			self.skillArr[v.wz - 1].isAct = 1
			GGlobal.control.notify(Enum_MsgType.COUNTRY_SKILL_UP);
			GGlobal.control.notify(Enum_MsgType.COUNTRY_SKILL_RED);
		} else {
			ViewCommonWarn.text("升级失败")
		}
	}

	public checkRed(){
		if(!this.canUpSkill()){
			return false;
		}
		let arr = this.skillArr
		for(let i = 0; i < arr.length; i++){
			let red = this.checkRedVo(arr[i].skillId)
			if(red)return true;
		}
		return false
	}

	public checkRedVo(id){
		if(!this.canUpSkill()){
			return false;
		}
		let cfg = Config.gjjn_748[id];
		let red1 = false;//总等级满足
		if (cfg.tj > 0) {
			let total = 0;
			for (let i = 0; i < this.skillArr.length; i++) {
				let v = this.skillArr[i];
				total += (v.skillId % 1000)
			}
			red1 = total >= cfg.tj
		} else {
			red1 = true;
		}
		//消耗满足
		let red2 = false;
		if(cfg.consume != "0"){
			let consume = JSON.parse(cfg.consume)
			red2 = this.shengwang >= Number(consume[0][2])
		}
		return red1 && red2
	}

	public canUpSkill() {
		if (Model_Country.kingName == "") {
			return false;
		}
		if (Model_Country.kingName != Model_player.voMine.name) {
			return false;
		}
		if (GGlobal.modelCouSkill.status == 1) {
			return false;
		}
		return true
	}
}