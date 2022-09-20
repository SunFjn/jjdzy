class Model_KaiFKH extends BaseModel {
	public constructor() {
		super();
	}
	data;
	static SJKHDataVO : any[];
	mapObj;
	/**小类型去寻找归属于他属于某个tab页面*/
	mapObjType;
	public init() {
		let s = this;
		s.mapObj = {};
		s.mapObjType = {};
		s.data = [];
		let bigType;
		let lib = Config.party_240;
		for (let i in lib) {
			let cfg = lib[i];
			let vo: Vo_KaiFuKH = new Vo_KaiFuKH();
			vo.init(lib[i]);
			bigType = vo.tabIndex;
			s.mapObjType[vo.type] = bigType;
			s.mapObj[cfg.id] = vo;

			if (!s.data[bigType])
				s.data[bigType] = [];

			let pageDta = s.data[bigType]
			if (bigType == 3) {//主题活动的有多种活动
				let day = vo.day;
				if (!pageDta[day])
					pageDta[day] = [];
				pageDta[day].push(vo);
			} else {
				pageDta.push(vo);
			}
		}
		for (let j = 0; j < s.data.length; j++) {
			let arr = s.data[j];
			if (!arr) continue;
			if (j != 0) {
				if (j == 3) {
					for (let k = 0; k < arr.length; k++) {
						if (arr[k]) {
							arr[k].sort(function (a, b) { return a.id > b.id ? 1 : -1; });
						}
					}
				} else {
					arr.sort(function (a, b) { return a.id > b.id ? 1 : -1; });
				}
			}
		}
	}

	getThemeType() {
		let day = Model_GlobalMsg.kaifuDay;
		let nowDayTheme;
		if (day > 0) {
			if (this.data&&this.data[3] && this.data[3][day]) {
				nowDayTheme = this.data[3][day][0];
				return nowDayTheme.type;
			}else{
				return day+2;
			}
		}
		return 1;
	}

	/**检查指定类型的数据状态*/
	public checkNotice(id : number) {
		if (!this.mapObj) this.init();
		let type = this.mapObj[id].type;
		//大类型转一下
		let bigType = (id / 1000) >> 0;
		let source;
		let day = Model_GlobalMsg.kaifuDay;
		day = day == 0 ? 1 : day;
		let retType = false;
		if(bigType == 5){
			source = Model_KaiFKH.SJKHDataVO;
			for(let j = 0, k = source.length; j < k; j++){ 
				let vo = source[j]; 
				if(vo.reward == 1 || (vo.limitSt == 1 && vo.lastNum > 0)){
					retType = true; 
					break;
				}
			}
		} else {
			if (bigType == 3) {
				source = this.data[3][day];//今日主题活动数据
			} else {
				source = this.data[bigType];
			}

			for (let j = 0, k = source.length; j < k; j++) {
				let vo = source[j];
				if (vo.st == 1) {
					retType = true;
					break;
				}
			}
		}

		let redMgr = GGlobal.reddot; 
		//今日主题活动
		let nowDayTheme = this.data[3][day][0];
		redMgr.setCondition(UIConst.KAIFUKUANGHUAN, type-1, retType);
		let ret = redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 0) || redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 1)
			|| redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 9) || redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, this.getThemeType()-1) || redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 15);
		redMgr.notify(UIConst.KAIFUKUANGHUAN);
	}
 
	public listenServ(s: WebSocketMgr) {
		this.socket = s;
		let a = this; 
		s.regHand(2332, a.GC_OPENUI, a);
		s.regHand(2334, a.GC_LQ, a);
		s.regHand(2336, a.GC_OPENSJKH, a);
		s.regHand(2338, a.GC_RewardState, a);
	} 
	/**更新神将狂欢领取状态 */
	private GC_RewardState(s: Model_KaiFKH, d: BaseBytes){ 
		//let i = d.readInt();
		let state = d.readByte();
		let id = d.readInt();
		let type = d.readByte();
		let lastNum = d.readInt();
		if(lastNum == 0 && type == 1){ 
			ViewCommonWarn.text("你来晚了，奖励已抢完");
		}
		GGlobal.control.notify(Enum_MsgType.SJKHITEMREFRESH, {state : state, id : id, type : type, lastNum : lastNum});
	}
	/**接受 神将狂欢的数据 */
	private GC_OPENSJKH(s: Model_KaiFKH, d: BaseBytes){
		let l = d.readShort();
		let data = [];
		let vo : Vo_KaiFuKH;
		let SJKHData = []; 
		Model_KaiFKH.SJKHDataVO = [];
		for(let i = 0; i < l; i++){
			////console.log("d.readInt()", d.readInt());  
			let id = d.readInt();
			vo = s.mapObj[id];
			vo.reward = d.readByte();
			vo.limitSt = d.readByte(); 
			vo.lastNum = d.readInt();
			SJKHData[i] = vo;
		}
		//console.log("ddddddddddddddddddddddd", SJKHData);
		Model_KaiFKH.SJKHDataVO = SJKHData;
		if (vo) s.checkNotice(vo.id);
		GGlobal.control.notify(Enum_MsgType.SHENJIANGKUANGHUAN, {data : SJKHData});
	}


	public CG_OPEN(i) {
		let s = this; 
		let ba = s.getBytes();
		ba.writeByte(i);
		if(View_KaiFKH.isShenJiangKuanghuan){
			if(i == 15 || i == 16){
				s.sendSocket(2335, ba);
			} else {
				s.sendSocket(2331, ba);
			}
		} else {
			s.sendSocket(2331, ba);
		}
	}

	public CG_GETREWARD(id : number, type : number){
		let ba = this.getBytes();
		ba.writeInt(id);
		ba.writeByte(type);
		this.sendSocket(2337, ba);
	}

	/**2332 [I-B]
	 * GC 打开ui信息 [I:奖励索引B:奖励状态]
	*/
	private GC_OPENUI(s: Model_KaiFKH, d: BaseBytes) {
		let l = d.readShort();
		let vo;
		for (let i = 0; i < l; i++) {
			vo = s.mapObj[d.readInt()];
			vo.pro = d.readLong();
			vo.st = d.readByte();
		}
		if (vo) s.checkNotice(vo.id);
		GGlobal.control.notify(Enum_MsgType.KAIFUKUANGHUAN, 0);
	}

	public CG_LQ(i) {
		let ba = this.getBytes();
		ba.writeInt(i);
		this.sendSocket(2333, ba);
	}
	/**2334 	I-B
	 * GC 奖励发生变化 I:奖励序号B:奖励状态
	*/
	private GC_LQ(s: Model_KaiFKH, d: BaseBytes) {
		if (!s.mapObj) s.init();
		let vo = s.mapObj[d.readInt()];
		vo.st = d.readByte();
		s.checkNotice(vo.id);
		GGlobal.control.notify(Enum_MsgType.KAIFUKUANGHUAN, 1);
	}
}