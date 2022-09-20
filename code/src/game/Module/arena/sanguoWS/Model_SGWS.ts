class Model_SGWS extends BaseModel {
	/**1为16进8 2：8进4 3：4进2 4：2进1*/
	public lun: number = 0;
	//1准备中 2进行中
	public state: number = 0;
	public times: number = 0;
	/**比赛VO映射 id为key*/
	raceMapping;
	/**lun为key 每轮分组数据*/
	zuMapping;
	/**名字排序 先左边填充再填充右边*/
	raceInfo;
	/**冠军信息 L:第一名玩家idU:玩家名称I:头像I:头像框*/
	champion;
	/**奖池数据  赛程key*/
	wardPool;
	/**押注数据 赛程key*/
	yazhu;

	initLib() {
		let s = this;
		s.raceInfo = [];
		s.wardPool = {};
		s.zuMapping = {};
		s.raceMapping = {};
		s.yazhu = {};
	}

	//比赛进程
	public isOpen() {
		let now = new Date(Model_GlobalMsg.getServerTime());
		let day = now.getDay();
		let h = now.getHours();
		let ret = false;
		let lun = this.lun;
		let st = this.state;
		ret = lun == 5 || lun == 0//周日活动 不是最后一轮的结束状态
		// ret = day != 0 || (lun == 5 && st == 1)//周日活动 不是最后一轮的结束状态
		return !ret;
	}

	//查询某组是否可下注
	public checkYazhu(lun, zu) {
		let ret = false;
		if (lun == this.lun && !this.yazhu[lun] && this.zuMapping[lun] && this.zuMapping[lun][zu] && this.state != 2) {
			ret = true;
		}
		return ret;
	}

	//通过组和轮次获取玩家数据
	public getGrouperByLun(lun, zu) {
		let dta = [];
		if (this.zuMapping[lun] && this.zuMapping[lun][zu]) {
			dta = this.zuMapping[lun][zu]
		}
		return dta;
	}

	public checkYaZhuReddot() {
		let lun = this.lun;
		let ret = false;
		let state = this.state;
		if (state == 1 && !this.yazhu[lun]) {
			let arr = this.getGrouperByLun(lun, 1);
			if (arr.length > 1) {
				ret = true;
			}
		}
		GGlobal.reddot.setCondition(UIConst.SANGUO_WUSHUANG, 1, ret);
		this.checkSanGuoReddot();
	}

	public checkPoolReddot() {
		let ret = false;
		for (var id in this.wardPool) {
			let vo: Vo_SGPool = this.wardPool[id];
			if (vo.id > this.lun) break;
			ret = vo.myCount == 0 && vo.remaindCount > 0 && this.lun > vo.id;
			if (ret) break;
		}
		let red = GGlobal.reddot;
		red.setCondition(UIConst.SANGUO_WUSHUANG, 2, ret);
		this.checkSanGuoReddot();
	}

	public checkSanGuoReddot() {
		let red = GGlobal.reddot;
		let ret = red.checkCondition(UIConst.SANGUO_WUSHUANG, 2) || red.checkCondition(UIConst.SANGUO_WUSHUANG, 1);
		red.setCondition(UIConst.SANGUO_WUSHUANG, 0, ret);
		red.notify(UIConst.SANGUO_WUSHUANG);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(s: WebSocketMgr) {
		let a = this;
		a.socket = s;
		s.regHand(1832, a.GC_OPEN_SANGUOWS, a);
		s.regHand(1834, a.GC_XIAZHU_1834, a);
		s.regHand(1836, a.GC_POOL_1836, a);
		s.regHand(1838, a.GC_TAKE_1838, a);
		s.regHand(1840, a.GC_LUCKER_1840, a);
		s.regHand(1842, a.GC_BATTLE_1842, a);
	}

	/**1831  打开三国无双界面   */
	public CG_OPEN_SANGUOWS(): void {
		if (!this.raceMapping) this.initLib();
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(1831, ba);
	}

	/**1832 B-B-I-[B-[B-[L-B]]][L-U-I-I-I-L]-L-U-I-I
	 * 返回三国无双界面数据 B:当前第几轮B:状态(1：准备中，2：战斗中)I:剩余时间[B:第几轮[B:分组[L:玩家idB:下注状态 0：没下，1：有下注]]]
	 * 比赛对阵数据[L:玩家idU:玩家名称I:头像I:头像框I:将衔L:战力]参赛玩家数据L:第一名玩家idU:玩家名称I:头像I:头像框
	  */
	public GC_OPEN_SANGUOWS(s: Model_SGWS, data: BaseBytes): void {
		s.lun = data.readByte();
		s.state = data.readByte();
		s.times = data.readInt();
		if (DEBUG) console.log("当前轮：" + s.lun + "当前状态：" + s.state);

		s.raceInfo = [];
		s.wardPool = {};
		s.zuMapping = {};
		s.raceMapping = {};
		s.yazhu = {};
		let vo;
		let roleID;
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let lun = data.readByte();
			let zugroup = [];
			s.zuMapping[lun] = zugroup;//只保存最新的分组
			for (let j = 0, len1 = data.readShort(); j < len1; j++) {
				let zu = data.readByte();
				zugroup[zu] = [];//只保存最新的分组
				for (let n = 0, len2 = data.readShort(); n < len2; n++) {
					roleID = data.readLong();
					if (!s.raceMapping[roleID]) {
						vo = new Node_SGWS();
						s.raceMapping[roleID] = vo;
						vo.id = roleID;
					} else {
						vo = s.raceMapping[roleID];
					}
					let xiazhu = data.readByte();
					if (xiazhu == 1) {
						s.yazhu[lun] = [roleID];
					}
					vo.xiazhu = xiazhu;
					vo.lun = lun;
					zugroup[zu].push(vo);
					if(lun  == 1){//首轮将 成员数据保存 
						vo.initPos = zu;
					}
				}
			}
		}

		let temp = s.zuMapping[1];
		let l = data.readShort();
		for (let m = 0; m < l; m++) {
			roleID = data.readLong();
			vo = s.raceMapping[roleID];
			if (!vo) {
				vo = new Node_SGWS();
				vo.id = roleID;
			}
			vo.name = data.readUTF();
			vo.head = data.readInt();
			vo.headicn = data.readInt();
			vo.jiangxian = data.readInt();
			vo.power = data.readLong();
			if(temp[vo.initPos]){
				let index = temp[vo.initPos].indexOf(vo);
				s.raceInfo[index+(vo.initPos-1)*2] = vo;
			}
		}
		s.champion = data.readFmt(["L", "U", "I", "I"]);
		s.checkYaZhuReddot();
		GGlobal.control.notify(Enum_MsgType.SGWS_OPENUI);
	}

	/**1833 L
	 * 下注 L:被押注的玩家id
	*/
	public tempLun;
	public CG_XIAZHU_1833(i, j) {
		this.tempLun = j;
		let b = this.getBytes();
		b.writeLong(i);
		this.sendSocket(1833, b);
	}

	/**1834 	B-L
	 * 下注结果 B:0：失败，1：成功L:失败：错误码（1：本轮已经下注过，2：准备期才能下注，3：元宝不足），成功：被下注的玩家id
	 * */
	private GC_XIAZHU_1834(s: Model_SGWS, d: BaseBytes) {
		let r = d.readByte();
		if (r == 1) {
			ViewCommonWarn.text("下注成功");
			let id = d.readLong();
			s.yazhu[s.tempLun] = [id];
			if (s.raceMapping[id]) {
				s.raceMapping[id].xiazhu = 1;
			}
			s.checkYaZhuReddot();
			GGlobal.control.notify(Enum_MsgType.SGWS_YZ, id);
		} else {
			let l = d.readLong();
			let str;
			if (l == 1) {
				str = "本轮已经下注过";
			} else if (l == 2) {
				str = "准备期才能下注";
			} else if (l == 3) {
				str = "元宝不足";
			}
			ViewCommonWarn.text(str);
		}
	}

	/**1835 
	 *打开奖池界面
	*/
	public CG_POOL_1835() {
		this.sendSocket(1835, this.getBytes());
	}
	/**1836 [B-I-I-L-U-I]
	 *奖池界面信息 [B:奖池idI:已领取次数I:本人领取的数量L:玩家idU:玩家名称I:领取最高奖励数量]奖池数据
	 * */
	private GC_POOL_1836(s: Model_SGWS, d: BaseBytes) {
		let l = d.readShort();
		let v: Vo_SGPool;
		for (let i = 0; i < l; i++) {
			let id = d.readByte();
			v = new Vo_SGPool();
			v.id = id;
			v.count = d.readInt();
			v.myCount = d.readInt();
			v.luckerID = d.readLong();
			v.luckerName = d.readUTF();
			v.luckNum = d.readInt();
			v.init();
			s.wardPool[id] = v;
		}
		s.checkPoolReddot();
		GGlobal.control.notify(Enum_MsgType.SGWS_POOL);
	}

	/**1837 B
	 * 领取奖池奖励 B:奖池id
	*/
	public CG_TAKE_1837(i) {
		let b = this.getBytes();
		b.writeByte(i);
		this.sendSocket(1837, b);
	}
	/**1838 	B-B-I
	 * 领取奖池奖励结果 B:0：失败，1：成功B:失败：错误码（1:未到对应阶段不能领取,2:已经领取过,3:已被全部领取），成功：奖池idI:已领数量
	 * */
	private GC_TAKE_1838(s: Model_SGWS, d: BaseBytes) {
		let r = d.readByte();
		if (r == 1) {
			s.CG_POOL_1835();
		} else {
			let str;
			let code = d.readByte();
			if (code == 1) {
				str = "未到对应阶段不能领取";
			} else if (code == 2) {
				str = "已经领取过";
			} else if (code == 3) {
				str = "已被全部领取";
			}
		}
	}

	/**1840 B-L-U-I
	 *更新抢到最高奖励的玩家 B:奖池idL:玩家idU:玩家名称I:领取数据
	 * */
	private GC_LUCKER_1840(s: Model_SGWS, d: BaseBytes) {
		let id = d.readByte();
		let v: Vo_SGPool = s.wardPool[id];
		v.luckerID = d.readLong();
		v.luckerName = d.readUTF();
		v.luckNum = d.readInt();
		s.checkPoolReddot();
		GGlobal.control.notify(Enum_MsgType.SGWS_POOL);
	}

	/**1841 b b
	 * 看录像 B:轮数B:分组id
	*/
	public CG_BATTLE_1841(j, l) {
		let b = this.getBytes();
		b.writeByte(j);
		b.writeByte(l);
		this.sendSocket(1841, b);
		console.log("战斗查询：" + j + "轮" + l);
	}
	/**1842 
	 * 返回录像对战双方战斗数据 [L:玩家idU:玩家名称[L:唯一id，第一个跟hid一样I:人物武将类型I:专属神兵
	 * [I:属性keyL:属性值]战斗属性[B:技能位置0-7I:技能idS:技能等级]技能数据I:时装资源id]属性L:总战力]玩家数据
	 * */
	private GC_BATTLE_1842(s: Model_SGWS, d: BaseBytes) {
		// var leftPlayer: Vo_Player = new Vo_Player();
		// var rightPlayer: Vo_Player = new Vo_Player();
		// let player = [leftPlayer, rightPlayer];
		let player = []
		for (let i = 0, l = d.readShort(); i < l; i++) {
			let id = d.readLong();
			let vo: Vo_Player = GGlobal.modelPlayer.playerDetailDic[id];
			// let vo: Vo_Player = player[i];
			// vo.parseOtherRole(d);
			//解析无用协议
			d.readUTF();
			let l1 = d.readShort();
			for(let j = 0; j < l1; j++){
				d.readLong();
				d.readInt();
				d.readInt();
				let l2 = d.readShort();
				for(let k = 0; k < l2; k++){
					d.readInt();
					d.readLong();
				}
				l2 = d.readShort();
				for(let k = 0; k < l2; k++){
					d.readByte();
					d.readInt();
					d.readShort();
				}
				d.readInt();
			}
			d.readLong();
			player.push(vo);
		}
		if(player[0].str == player[1].str){
			player[0].str +=1;
		}

		var scenectrl: PVPFightSceneProgresser = SceneCtrl.getCtrl(SceneCtrl.SGWS) as PVPFightSceneProgresser;
		scenectrl.fightType = 1;
		scenectrl.leftPlayer = player[0];
		scenectrl.rightPlayer = player[1];
		scenectrl.randomseed = 152;
		GGlobal.mapscene.scenetype = SceneCtrl.SGWS;
		GGlobal.mapscene.enterSceneCtrl(scenectrl);
		GGlobal.layerMgr.close2(UIConst.ARENA);
	}
}