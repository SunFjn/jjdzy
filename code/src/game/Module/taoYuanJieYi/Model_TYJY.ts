/**
 * 桃园结义数据管理
 */
class Model_TYJY extends BaseModel{
	public static readonly msg_batInfo = "msg_batInfo";
	public static readonly msg_beenKiller = "msg_beenKiller";//更新被杀的玩家
    public static readonly msg_bossBeenKill = "msg_bossBeenKill";//boss已被杀
	public static msg_invite = "msg_invite";
	 /**战斗信息 */
    public battleInfo: {
        myHp: number, bossMaxHp: number, bossHp: number, myDamage: number, others: { name: string, demage: number }[]
    } = <any>{ bossHp: 1 };
	public lifeTime: number = 0;
	public static readonly ROLE_LIFE = "role_life";//复活
	public static readonly MSG_PLAYER_RELIFE = "msg_player_relife";//其他玩家复活
	public static readonly SCENE_PLAYER_STATE = "scene_player_state";

	public constructor() {
		super();
	}

	/**3101 CG 打开结义列表 I:分页  */
	public CG_GET_INFOS(page:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(page);
		this.sendSocket(3101, ba);
	}

	/**3103 CG 打开我的义盟  */
	public CG_OPEN_MYGANG() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(3103, ba);
	}

	/**3105 CG 申请加入义盟 L:义盟唯一id  */
	public CG_APPLY_JOIN(id:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeLong(id);
		this.sendSocket(3105, ba);
	}

	/**3107 CG 获取申请列表  */
	public CG_GET_APPLYMEMBER() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(3107, ba);
	}

	/**3109 CG 批准申请 B:1.同意 2拒绝 3全部拒绝L:玩家id  */
	public CG_APPROVAL_APPLY(status:number, playerId:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(status);
		ba.writeLong(playerId);
		this.sendSocket(3109, ba);
	}

	/**3111 CG 取消申请加入义盟 L:义盟id  */
	public CG_CANCEL_APPLY(id:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeLong(id);
		this.sendSocket(3111, ba);
	}

	/**3113 CG 退出义盟   */
	public CG_QUIT() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(3113, ba);
	}

	/**3115 CG 踢人 L:兄弟id   */
	public CG_EXPEL(id:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeLong(id);
		this.sendSocket(3115, ba);
	}

	/**3117 CG 领取礼包 I:任务idB: 1人礼包 2人礼包 3人礼包  */
	public CG_GET_REWARD(taskId:number, type:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(taskId);
		ba.writeByte(type);
		this.sendSocket(3117, ba);
	}

	/**3119 CG 转让大哥 L:对方id  */
	public CG_TRANSFER(id:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeLong(id);
		this.sendSocket(3119, ba);
	}

	/**3121 CG 申请大哥  */
	public CG_APPLY_BROTHER() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(3121, ba);
	}

	/**3123 CG 招募兄弟  */
	public CG_RECRUITING() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(3123, ba);
	}

	public gangName:string = "";
	/**3125 CG 修改义盟名字 U:义盟名字  */
	public CG_CHANGE_NAME(name:string) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeUTF(name);
		this.sendSocket(3125, ba);
		this.gangName = name;
	}

	/**3127 CG 创建义盟 U:义盟名称  */
	public CG_CREATE(name:string) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeUTF(name);
		this.sendSocket(3127, ba);
	}

	/**3131 CG 打开桃园BOSS界面  */
	public CG_OPEN_TYBOSSUI() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(3131, ba);
	}

	/**3133 CG 开启桃园BOSS I:BOSS id  */
	public CG_OPEN_BOSS(id:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(3133, ba);
	}

	/**3135 CG 领取桃园BOSS奖励  */
	public CG_GET_BOSSREWARD() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(3135, ba);
	}

	/**3137 CG 挑战BOSS  */
	public CG_CHALLENGE_BOSS() {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(3137, ba);
	}

	/**3141 CG 通知/退出/复活桃园BOSS 0.退出 1复活 2通知后端本人死亡 B:0.退出 1复活 2通知后端本人死亡   */
	public CG_QUIT_TAOYUANBOSS(type:number) {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		this.sendSocket(3141, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		let self = this;
		self.socket = wsm;
		wsm.regHand(3102, self.GC_GET_INFOS, self);
		wsm.regHand(3104, self.GC_OPEN_MYGANG, self);
		wsm.regHand(3106, self.GC_APPLY_JOIN, self);
		wsm.regHand(3108, self.GC_GET_APPLYMEMBER, self);
		wsm.regHand(3110, self.GC_APPROVAL_APPLY, self);
		wsm.regHand(3112, self.GC_CANCEL_APPLY, self);
		wsm.regHand(3114, self.GC_QUIT, self);
		wsm.regHand(3116, self.GC_EXPEL, self);
		wsm.regHand(3118, self.GC_GET_REWARD, self);
		wsm.regHand(3120, self.GC_TRANSFER, self);
		wsm.regHand(3122, self.GC_APPLY_BROTHER, self);
		wsm.regHand(3124, self.GC_RECRUITING, self);
		wsm.regHand(3126, self.GC_CHANGE_NAME, self);
		wsm.regHand(3128, self.GC_CREATE, self);
		wsm.regHand(3130, self.GC_NOTICE, self);
		wsm.regHand(3132, self.GC_OPEN_TYBOSSUI, self);
		wsm.regHand(3134, self.GC_OPEN_BOSS, self);
		wsm.regHand(3136, self.GC_GET_BOSSREWARD, self);
		wsm.regHand(3138, self.GC_CHALLENGE_BOSS, self);
		wsm.regHand(3140, self.GC_HURT_INFO, self);
		wsm.regHand(3142, self.GC_QUIT_TAOYUANBOSS, self);
		wsm.regHand(3144, self.GC_BEKILL, self);
		wsm.regHand(3146, self.GC_BOSS_DIE, self);
		wsm.regHand(3148, self.GC_LIVE_NOTICE, self);
	}

	public list:Array<TYJY_VO> = [];
	public curPage:number = 0;
	public totalPage:number = 0;
	/**3102 GC 打开结义列表 [L:义盟idI:义盟人数U:义盟名称B:状态：4.取消申请 3.申请加入 2申请已满 1已满员L:总战力U:大哥名称]I:当前页数I:总页数 */
	public GC_GET_INFOS(s: Model_TYJY, data: BaseBytes) {
		s.list = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: TYJY_VO = new TYJY_VO();
			v.readGangMsg(data);
			s.list.push(v);
		}
		s.curPage = data.readInt();
		s.totalPage = data.readInt();
		GGlobal.control.notify(UIConst.TAOYUANJIEYI);
		GGlobal.reddot.setCondition(UIConst.TAOYUANJIEYI, 0, false);
		GGlobal.reddot.setCondition(UIConst.TYJY_YMRW, 0, false);
		GGlobal.reddot.setCondition(UIConst.TYJY_YMFB, 0, false);
		GGlobal.reddot.notifyMsg(UIConst.TYJY_YMRW);
	}

	public myGangList:Array<TYJY_VO> = [];
	public myGangName:string = "";
	public taskObj: { [id: number]: { id: number, arr, arr1} } = {};
	/**3104 GC 我的义盟信息 [L:玩家idU:玩家姓名I:玩家离线时间 =0在线，>0离线时间(秒)I:头像I:头像框B:地位标识：1.大哥 2.二哥 3.三弟B:VIP等级I:玩家等级L:战力]成员信息[I:任务id[U:玩家名称I:任务完成参数][B:奖励状态：0.条件不符 1.可领取 2.已领取]]任务信息U:义盟名字 */
	public GC_OPEN_MYGANG(s: Model_TYJY, data: BaseBytes) {
		s.myGangList = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: TYJY_VO = new TYJY_VO();
			v.readMemberMsg(data);
			s.myGangList.push(v);
		}
		len = data.readShort();
		for (let i = 0; i < len; i++)
		{
			let id:number = data.readInt();
			let len1 = data.readShort();
			let arr = [];
			for (let j = 0; j < len1; j++) {
				let name:string = data.readUTF();
				let num:number = data.readInt();
				arr.push([name, num]);
			}
			let len2 = data.readShort();
			let arr1 = [];
			for (let k = 0; k < len2; k++) {
				let status:number = data.readByte();
				arr1.push(status);
			}
			s.taskObj[id] = { id: id, arr: arr, arr1: arr1};
		}
		s.myGangName = data.readUTF();
		GGlobal.control.notify(UIConst.TAOYUANJIEYI);
		// s.reddotCheckApply();
		s.reddotCheckTask();
	}

	/**3106 GC 申请加入返回 B:状态：1.成功 2.您已有结义兄弟 3.该义盟人数已满 4该义盟可接收申请人数已满 5.已达到申请上限 6.该义盟已解散L:义盟id */
	public GC_APPLY_JOIN(s: Model_TYJY, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			let gangId:number = data.readLong();
			if(s.list)
			{
				let len:number = s.list.length;
				for(let i:number = 0;i < len;i ++)
				{
					let v: TYJY_VO = s.list[i];
					if(v.gangId == gangId)
					{
						v.status = 4;
						break;
					}
				}
			}
			GGlobal.control.notify(UIConst.TAOYUANJIEYI);
		}else if(res == 2)
		{
			ViewCommonWarn.text("您已有结义兄弟");
		}else if(res == 3)
		{
			ViewCommonWarn.text("该义盟人数已满");
		}else if(res == 4)
		{
			ViewCommonWarn.text("该义盟可接收申请人数已满");
		}else if(res == 5)
		{
			ViewCommonWarn.text("已达到申请上限");
		}else if(res == 6)
		{
			ViewCommonWarn.text("该义盟已解散");
		}
	}

	public applyList:Array<TYJY_VO> = [];
	/**3108 GC 申请义盟列表 [L:玩家idU:玩家姓名I:玩家头像I:玩家头像框L:玩家战力B:玩家vip] */
	public GC_GET_APPLYMEMBER(s: Model_TYJY, data: BaseBytes) {
		s.applyList = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: TYJY_VO = new TYJY_VO();
			v.readApplyMsg(data);
			s.applyList.push(v);
		}
		GGlobal.control.notify(UIConst.TYJY_APPLY);
	}

	/**3110 GC 批准申请返回 B:1成功 2拒绝 3申请已过期 4对方已加入义盟 5本已盟人数已满 6没有权限 7.全部拒绝 8对方已取消申请L:玩家id */
	public GC_APPROVAL_APPLY(s: Model_TYJY, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			s.CG_OPEN_MYGANG();
		}
		if(res == 1 || res == 2 || res == 3 || res == 4 || res == 5 || res == 8)
		{
			let playerId:number = data.readLong();
			let index:number = 0;
			let len:number = s.applyList.length;
			let v: TYJY_VO;
			for(var i:number = 0;i < len;i ++)
			{
				v = s.applyList[i];
				if(v.playerId == playerId)
				{
					index = i;
					break;
				}
			}
			s.applyList.splice(index, 1);
			GGlobal.control.notify(UIConst.TYJY_APPLY);
			s.reddotCheckApply();
		}
		if(res == 3){
			ViewCommonWarn.text("申请已过期");
			return;
		}else if(res == 4)
		{
			ViewCommonWarn.text("对方已加入义盟");
			return;
		}else if(res == 5)
		{
			ViewCommonWarn.text("本盟人数已满");
			return;
		}else if(res == 7)
		{
			s.applyList = [];
			GGlobal.control.notify(UIConst.TYJY_APPLY);
			s.reddotCheckApply();
		}else if(res == 8)
		{
			ViewCommonWarn.text("对方已取消申请");
			return;
		}
	}

	/**3112 GC 取消申请返回 B:1成功 2不存在L:义盟id  */
	public GC_CANCEL_APPLY(s: Model_TYJY, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			let gangId:number = data.readLong();
			if(s.list)
			{
				let len:number = s.list.length;
				for(let i:number = 0;i < len;i ++)
				{
					let v: TYJY_VO = s.list[i];
					if(v.gangId == gangId)
					{
						v.status = 3;
						break;
					}
				}
			}
			GGlobal.control.notify(UIConst.TAOYUANJIEYI);
		}else
		{
			ViewCommonWarn.text("义盟不存在");
			return;
		}
	}

	/**3114 GC 退出义盟返回 B:1成功 2失败  */
	public GC_QUIT(s: Model_TYJY, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			Model_player.voMine.tyjyId = 0;
			s.myGangName = "";
			GGlobal.layerMgr.close(UIConst.TYJY_MEMBER);
			s.CG_GET_INFOS(1);
		}else
		{
			ViewCommonWarn.text("退出义盟失败");
			return;
		}
	}

	/**3116 GC 踢人返回 B:1成功 2失败L:兄弟id  */
	public GC_EXPEL(s: Model_TYJY, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			let id:number = data.readLong();
			let len:number = s.myGangList.length;
			let index:number = 0;
			let v: TYJY_VO;
			for(var i:number = 0;i < len;i ++)
			{
				v = s.myGangList[i];
				if(v.playerId == id)
				{
					index = i;
					break;
				}
			}
			s.myGangList.splice(index, 1);
			GGlobal.control.notify(UIConst.TAOYUANJIEYI);
		}else
		{
			ViewCommonWarn.text("踢人失败失败");
			return;
		}
	}

	/**3118 GC 领取奖励返回 B:状态：1.成功 2.背包已满 3.参数错误 4.领取条件不足I:任务idB:领取类型(1-3)  */
	public GC_GET_REWARD(s: Model_TYJY, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			let id:number = data.readInt();
			let type:number = data.readByte();
			let arr = s.taskObj[id].arr1;
			arr[type - 1] = 2;
			GGlobal.control.notify(UIConst.TYJY_YMRW);
			s.reddotCheckTask();
		}else if(res == 2){
			ViewCommonWarn.text("背包已满");
			return;
		}else if(res == 3){
			ViewCommonWarn.text("参数错误");
			return;
		}else if(res == 4){
			ViewCommonWarn.text("领取条件不足");
			return;
		}
	}

	/**3120 GC 转让大哥返回 B:1.成功 2.没有权限 3.该玩家已离开义盟  */
	public GC_TRANSFER(s: Model_TYJY, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			s.CG_OPEN_MYGANG();
		}else if(res == 2){
			ViewCommonWarn.text("没有权限");
		}else if(res == 3){
			ViewCommonWarn.text("该玩家已离开义盟");
		}
	}

	/**3122 GC 申请大哥返回 B:1.成功 2.大哥离线3天以上才可申请 */
	public GC_APPLY_BROTHER(s: Model_TYJY, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			s.CG_OPEN_MYGANG();
		}else if(res == 2)
		{
			ViewCommonWarn.text("大哥离线3天以上才可申请");
		}
	}

	/**3124 GC 招募兄弟返回 B:1.成功 2.人数已满 */
	public GC_RECRUITING(s: Model_TYJY, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			s.notify(Model_TYJY.msg_invite, 10);
			// GGlobal.control.notify(UIConst.TAOYUANJIEYI);
		}else
		{
			ViewCommonWarn.text("人数已满");
		}
	}

	/**3126 GC 修改义盟名字返回 B: B:1.成功 2.非法字符 3.名字没有改变 4.名字已经存在 5.改名卡不足 6没有权限 7.名字过长 */
	public GC_CHANGE_NAME(s: Model_TYJY, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			s.myGangName = s.gangName;
			GGlobal.layerMgr.close(UIConst.TYJY_CREATE);
			GGlobal.control.notify(UIConst.TAOYUANJIEYI);
			ViewCommonWarn.text("修改成功");
		}else if(res == 2)
		{
			ViewCommonWarn.text("非法字符");
		}else if(res == 3)
		{
			ViewCommonWarn.text("名字没有改变");
		}else if(res == 4)
		{
			ViewCommonWarn.text("名字已经存在");
		}else if(res == 5)
		{
			ViewCommonWarn.text("改名卡不足");
		}else if(res == 6)
		{
			ViewCommonWarn.text("没有权限");
		}else if(res == 7)
		{
			ViewCommonWarn.text("名字过长");
		}
	}

	/**3128 GC 创建义盟返回 B:1.成功 2.非法字符 3.名字过长 4.名字已经存在 5.元宝不足 6.已有义盟L:义盟id */
	public GC_CREATE(s: Model_TYJY, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			let gangId:number = data.readLong();
			Model_player.voMine.tyjyId = gangId;
			s.CG_OPEN_MYGANG();
			GGlobal.layerMgr.close(UIConst.TYJY_CREATE);
		}else if(res == 2)
		{
			ViewCommonWarn.text("非法字符");
		}else if(res == 3)
		{
			ViewCommonWarn.text("名字过长");
		}else if(res == 4)
		{
			ViewCommonWarn.text("名字已经存在");
		}else if(res == 5)
		{
			ViewCommonWarn.text("元宝不足");
		}else if(res == 6)
		{
			ViewCommonWarn.text("已有义盟");
		}
	}

	public joinGang:string = "";
	/**3130 GC 通知有人加入有人退出 B:1加入义盟 2被踢3.通知大哥有人申请加入4.通知大哥有人取消申请L:玩家idU:玩家名称U:义盟名称L:义盟id */
	public GC_NOTICE(s: Model_TYJY, data: BaseBytes) {
		let res = data.readByte();
		let id:number = data.readLong();
		let name:string = data.readUTF();
		s.joinGang = data.readUTF();
		let gangId:number = data.readLong();
		if(res == 1)
		{
			Model_player.voMine.tyjyId = gangId;
			if (GGlobal.layerMgr.isOpenView(UIConst.TAOYUANJIEYI))
			{
				s.CG_OPEN_MYGANG();
				return;
			}
			TYJY_JoinTipsView.show();
		}else if(res == 2)
		{
			Model_player.voMine.tyjyId = 0;
			s.CG_GET_INFOS(1);
		}else if(res == 3)
		{
			GGlobal.reddot.setCondition(UIConst.TAOYUANJIEYI, 0, true);
			GGlobal.reddot.notifyMsg(UIConst.TAOYUANJIEYI);
		}else if(res == 4)
		{
			let index:number = 0;
			let len:number = s.applyList.length;
			let v: TYJY_VO;
			for(var i:number = 0;i < len;i ++)
			{
				v = s.applyList[i];
				if(v.playerId == id)
				{
					index = i;
					break;
				}
			}
			s.applyList.splice(index, 1);
			s.reddotCheckApply();
		}
	}

	public isBossOpen:number = 0;
	public bossOpenByPlayer:string = "";
	public bossGet:number = 0;
	public bossPro:number = 0;
	public bossTime:number = 0;
	/**3132 GC 打开桃园BOSS界面返回 I:BOSS id 0.未开启U:开启玩家名称B:领取状态：0.条件不符 1.可领取 2.已领取I:完成义盟任务数量I:剩余时间（秒） */
	public GC_OPEN_TYBOSSUI(s: Model_TYJY, data: BaseBytes) {
		Model_TYJY.curBossID = data.readInt();
		s.bossOpenByPlayer = data.readUTF();
		s.bossGet = data.readByte();
		s.bossPro = data.readInt();
		s.bossTime = data.readInt();
		GGlobal.control.notify(UIConst.TYJY_YMFB);
		s.reddotCheckBoss();
	}

	/**3134 GC 开启桃园BOSS返回 B:1.成功 2.BOSS已被开启 3.开启条件不足 4.元宝不足 5.参数错误I:BOSS idU:开启玩家名称 */
	public GC_OPEN_BOSS(s: Model_TYJY, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			Model_TYJY.curBossID = data.readInt();
			s.bossOpenByPlayer = data.readUTF();
			GGlobal.control.notify(UIConst.TYJY_YMFB);
			if (GGlobal.layerMgr.isOpenView(UIConst.TYJY_BOSSTIPS))
			{
				GGlobal.layerMgr.close(UIConst.TYJY_BOSSTIPS);
			}
		}else if(res == 2)
		{
			ViewCommonWarn.text("BOSS已被开启");
		}else if(res == 3)
		{
			ViewCommonWarn.text("开启条件不足");
		}else if(res == 4)
		{
			ViewCommonWarn.text("元宝不足");
		}else if(res == 5)
		{
			ViewCommonWarn.text("参数错误");
		}
	}

	/**3136 GC 领取桃园BOSS奖励 B:1.成功 2.背包已满 3.领取条件不足 */
	public GC_GET_BOSSREWARD(s: Model_TYJY, data: BaseBytes) {
		let res = data.readByte();
		if (res == 1) {
			s.bossGet = 2;
			GGlobal.control.notify(UIConst.TYJY_YMFB);
			s.reddotCheckBoss();
		}else if(res == 2){
			ViewCommonWarn.text("背包已满");
		}else if(res == 3){
			ViewCommonWarn.text("领取条件不足");
		}
	}

	public static curBossID: number;//保存挑战boss 进入场景初始化气血
	/**3138 GC 挑战BOSS返回 B:1.成功 2.失败2boss已经死亡3你已经在副本内I:BOSS id */
	public GC_CHALLENGE_BOSS(s: Model_TYJY, data: BaseBytes) {
		const state = data.readByte();
		Model_TYJY.curBossID = data.readInt();
        switch (state) {
            case 1://成功
                GGlobal.mapscene.enterScene(SceneCtrl.TAOYUANJIEYI);
                GGlobal.layerMgr.close2(UIConst.TAOYUANJIEYI);
                break;
            case 2:
                ViewCommonWarn.text("boss已经死亡");
                s.CG_OPEN_TYBOSSUI();
                break;
            case 3:
                ViewCommonWarn.text("您已经在副本中");
                break;
        }
	}

	/**3140 GC 场景中伤害数据同步 L:我的气血L:boss最大气血L:boss当前血量L:我的伤害值[U:玩家名称L:玩家伤害] */
	public GC_HURT_INFO(s: Model_TYJY, data: BaseBytes) {
		s.battleInfo = s.battleInfo || <any>{};
        data.readLong();
        s.battleInfo.bossMaxHp = data.readLong();
        s.battleInfo.bossHp = data.readLong();
        s.battleInfo.myDamage = data.readLong();
        s.battleInfo.others = [];
        const len = data.readShort();
        for (let i = 0; i < len; i++) {
            s.battleInfo.others.push({ name: data.readUTF(), demage: data.readLong() });
        }
        s.notify(Model_TYJY.msg_batInfo);
	}

	/**3142 GC 退出桃园BOSS返回 B:1成功 2元宝不足B:类型：0.退出 1复活 2通知后端本人死亡 */
	public GC_QUIT_TAOYUANBOSS(s: Model_TYJY, data: BaseBytes) {
		const state = data.readByte();
		const type = data.readByte();
        switch (state) {
            case 1://1成功
				if(type == 0)//退出
				{
					// const awards = Config.tyjyboss_251[Model_TYJY.curBossID].reward;
					// const drops = ConfigHelp.makeItemListArr(JSON.parse(awards));
					if (s.battleInfo && s.battleInfo.bossHp > 0) {
						if (!GGlobal.layerMgr.isOpenView(UIConst.COMMON_FAIL)) {
							ViewCommonFail.show(5000, s, "离开", s.realQuit, null, null);
						}
					} else {
						if (!GGlobal.layerMgr.isOpenView(UIConst.COMMON_WIN)) {
							ViewCommonWin.show(null, 10000, s, "退出", s.realQuit);
						}
					}
				}else if(type == 1){
					s.notify(Model_TYJY.ROLE_LIFE);
				}
                break;
            case 2://失败
                ViewCommonWarn.text("退出失败!");
                break;
        }
	}

	private realQuit() {
        GGlobal.modelScene.returnMainScene();
        GGlobal.layerMgr.close2(UIConst.BATTLEWIN);
        if (GGlobal.layerMgr.lastPanelId <= 0) GGlobal.layerMgr.open(UIConst.TYJY_YMFB);
    }

	/**3144 GC 被击杀的玩家id [L:玩家id] */
	public GC_BEKILL(s: Model_TYJY, data: BaseBytes) {
		let id = Model_player.voMine.id;
        let len = data.readShort();
        let temp = [];
        for (let i = 0; i < len; i++) {
            let l = data.readLong();
            if (l == id) {
                GGlobal.control.notify(Enum_MsgType.MSG_MINEHPCHANGE, { hp: 0 });
                s.lifeTime = Model_GlobalMsg.getServerTime() + ConfigHelp.getSystemNum(1012) * 1000;
                s.notify(Model_TYJY.ROLE_LIFE, 1);
            } else {
                temp.push(l);
            }
        }
        s.notify(Model_TYJY.SCENE_PLAYER_STATE, { st: 1, list: temp });
	}

	/**3146 GC 广播副本内玩家boss死亡  */
	public GC_BOSS_DIE(s: Model_TYJY, data: BaseBytes) {
		ViewBroadcastText.showMsg("桃园BOSS已经死亡，领奖励去吧!");
        s.notify(Model_TYJY.msg_bossBeenKill);
	}

	/**3148 GC 通知玩家复活 [L:复活玩家id]  */
	public GC_LIVE_NOTICE(s: Model_TYJY, data: BaseBytes) {
		let id = Model_player.voMine.id;
        let len = data.readShort();
        let temp = [];
        for (let i = 0; i < len; i++) {
            let l = data.readLong();
            if (l == id) {
                if (Model_player.voMine.sceneChar) Model_player.voMine.sceneChar.curhp = Model_player.voMine.sceneChar.maxhp;
                s.notify(Model_TYJY.ROLE_LIFE, 0);
            } else {
                temp.push(l);
            }
        }
        s.notify(Model_TYJY.MSG_PLAYER_RELIFE, temp);
	}

	/**
	 * 根据离线秒数获取时间文本
	 */
	public getOffLineStr(second:number):string
	{
		let str:string = "";
		let oneHour:number = 60 * 60;
		let oneDay:number = 24 * oneHour;
		let threeDay:number = 3 * oneDay;
		let time:number;
		if(second < oneHour)
		{
			str = "离线＜1小时";
		}else if(second >= oneHour && second < oneDay)
		{
			time = Math.floor(second / oneHour);
			str = "离线" + time + "小时";
		}else if(second >= oneDay && second < threeDay)
		{
			time = Math.floor(second / oneDay);
			str = "离线" + time + "天";
		}else{
			str = "离线＞3天";
		}
		return str;
	}

	/** 检查申请列表红点 */
    public reddotCheckApply() {
		let bol:boolean = false;
		let sf = GGlobal.reddot;
		let list = GGlobal.model_TYJY.applyList;
		if(list && list.length > 0)
		{
			bol = true;
		}
		sf.setCondition(UIConst.TAOYUANJIEYI, 0, bol);
		sf.notifyMsg(UIConst.TAOYUANJIEYI);
	}

	/** 检查任务列表红点 */
    public reddotCheckTask() {
		let bol:boolean = false;
		let sf = GGlobal.reddot;
		for(let key in GGlobal.model_TYJY.taskObj)
		{
			let obj = GGlobal.model_TYJY.taskObj[key];
			let arr = obj.arr1;
			for(let i:number = 0;i < arr.length;i ++)
			{
				let status:number = arr[i];
				if(status == 1)
				{
					bol = true;
					break;
				}
			}
			if(bol)  break;
		}
		sf.setCondition(UIConst.TYJY_YMRW, 0, bol);
		sf.notifyMsg(UIConst.TYJY_YMRW);
	}

	/** 检查boss奖励红点 */
    public reddotCheckBoss() {
		let bol:boolean = false;
		let sf = GGlobal.reddot;
		if(GGlobal.model_TYJY.bossGet == 1)
		{
			bol = true;
		}else if(GGlobal.model_TYJY.bossGet == 0)
		{
			let total:number = Config.xtcs_004[7702].num;
			if(GGlobal.model_TYJY.bossPro >= total)
			{
				bol = true;
			}
		}
		sf.setCondition(UIConst.TYJY_YMFB, 0, bol);
		sf.notifyMsg(UIConst.TYJY_YMFB);
	}
}