class Model_HomeMaid extends BaseModel {
	public constructor() {
		super();
	}

	static openui = "openui"
	static useMaid = "useMaid"

	//打开界面
	public CG_OPENUI_11301(): void {
		var bates = this.getBytes();
		this.sendSocket(11301, bates);
	}

	//激活/升星侍女 I:配置表id
	public CG_UPSTAR_11303(id): void {
		var bates = this.getBytes();
		bates.writeInt(id);
		this.sendSocket(11303, bates);
	}

	//升级侍女 I:侍女idB: 类型 1升级 2一键升级
	public CG_UPLV_11305(id, type): void {
		var bates = this.getBytes();
		bates.writeInt(id);
		bates.writeByte(type);
		this.sendSocket(11305, bates);
	}

	//使用形象 I:侍女id
	public CG_USE_11307(id): void {
		var bates = this.getBytes();
		bates.writeInt(id);
		this.sendSocket(11307, bates);
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(11302, this.GC_OPENUI_11302, this);
		mgr.regHand(11304, this.GC_UPSTAR_11304, this);
		mgr.regHand(11306, this.GC_UPLV_11306, this);
		mgr.regHand(11308, this.GC_USE_11308, this);
	}

	public useId = 0
	private _datArr: Vo_HomeMaid[];
	private _datObj: { [id: number]: Vo_HomeMaid };

	public get datArr() {
		let m = this;
		if (m._datArr == null) {
			m._datArr = []
			m._datObj = {};
			for (let k in Config.shinv_020) {
				let vv = new Vo_HomeMaid();
				vv.init(Config.shinv_020[k])
				m._datArr.push(vv)
				m._datObj[vv.id] = vv;
			}
		}
		return m._datArr
	}

	//打开界面返回 [I:侍女idI:侍女星级 I:侍女等级I:侍女当前经验]侍女数据
	private hasData = false;
	private GC_OPENUI_11302(self: Model_HomeMaid, data: BaseBytes): void {
		let len = data.readShort();
		let arr = self.datArr;//初始化_datObj
		for (let i = 0; i < len; i++) {
			let id = data.readInt()
			let star = data.readInt()
			let lv = data.readInt()
			let exp = data.readInt()
			let v: Vo_HomeMaid = self._datObj[id];
			if (v) {
				v.isAct = true;
				v.setStar(star);
				v.setLv(lv);
				v.exp = exp;
			}
		}
		self.useId = data.readInt()
		self.hasData = true;
		self.checkNotice();
		self.notify(Model_HomeMaid.openui)
		self.notify(Model_HomeMaid.useMaid)
	}

	//激活/升星侍女返回 I:状态 0成功 1达到上限 2激活升星需要的道具不足I:侍女idI:侍女星级
	private GC_UPSTAR_11304(self: Model_HomeMaid, data: BaseBytes): void {
		let res = data.readByte();
		let id = data.readInt();
		let star = data.readInt();
		if (res == 0) {
			let v: Vo_HomeMaid = self._datObj[id];
			v.setStar(star);
			self.checkNotice();
			self.notify(Model_HomeMaid.openui)
		} else {
			ViewCommonWarn.text(["达到上限", "激活升星需要的道具不足"][res - 1]);
		}
	}

	//升级侍女返回 I:状态 0成功 1先激活该侍女 2级数已满级 3材料不足 4府邸等级不满足要求I: 侍女idI:侍女等级I: 侍女当前经验
	private GC_UPLV_11306(self: Model_HomeMaid, data: BaseBytes): void {
		let res = data.readByte();
		let id = data.readInt();
		let lv = data.readInt();
		let exp = data.readInt();
		if (res == 0) {
			let v: Vo_HomeMaid = self._datObj[id];
			v.setLv(lv);
			v.exp = exp;
			self.checkNotice();
			self.notify(Model_HomeMaid.openui)
		} else {
			ViewCommonWarn.text(["先激活该侍女", "级数已满级", "材料不足", "府邸等级不满足要求"][res - 1]);
		}
	}

	//使用形象返回 B:状态 0成功 1先激活该侍女 2该侍女10星解锁动态效果I: 侍女id
	private GC_USE_11308(self: Model_HomeMaid, data: BaseBytes): void {
		let res = data.readByte();
		if (res == 0) {
			self.useId = data.readInt();
			self.checkNotice();
			self.notify(Model_HomeMaid.openui)
			self.notify(Model_HomeMaid.useMaid)
		} else {
			ViewCommonWarn.text(["先激活该侍女", "星级不足"][res - 1]);
		}
	}

	public checkNotice() {
		let s = this;
		if (!s.hasData) {
			return;
		}
		let reddot = GGlobal.reddot;
		let red1 = false;
		let red2 = false;
		let arr = s.datArr
		for (let i = 0; i < arr.length; i++) {
			let v = arr[i]
			let redStar = s.checkVoStar(v);
			let redLv = s.checkVoLv(v);
			reddot.setCondition(UIConst.HOME_MAID, v.id * 10 + 0, redStar);
			reddot.setCondition(UIConst.HOME_MAID, v.id * 10 + 1, redLv);
			if (!red1) red1 = redStar;
			if (!red2) red2 = redLv;
		}
		reddot.setCondition(UIConst.HOME_MAID, 0, red1 || red2);
		reddot.setCondition(UIConst.HOME_MAID, 1, red1);
		reddot.setCondition(UIConst.HOME_MAID, 2, red2);
		reddot.notify(UIConst.HOME_MAID);
	}
	//可升星
	public checkVoStar(v: Vo_HomeMaid) {
		if (!v.cfgStar) {
			return false;
		}
		if (v.star < v.cfg.shangxian) {
			//可升星
			var consume = JSON.parse(v.cfg.xiaohao)
			var hasCount = Model_Bag.getItemCount(Number(consume[0][1]))
			var count = Number(consume[0][2])
			if (hasCount >= count) {
				return true;
			}
		}
		return false;
	}
	//可升级
	public checkVoLv(v: Vo_HomeMaid) {
		if (!v.isAct) {
			return false;
		}
		let lvHome = GGlobal.homemodel.home_level
		if (!lvHome) {
			return false;
		}
		let cfgHome = Config.fdsj_019[lvHome]
		if (v.lv >= cfgHome.shinv) {
			return false
		}
		if (v.cfgLv.xh != "0") {
			//可升级
			var consume = JSON.parse(v.cfgLv.xh)
			var hasCount = Model_Bag.getItemCount(Number(consume[0][1]))
			// var count = Number(consume[0][2])
			if (hasCount > 0) {
				return true;
			}
		}
		return false;
	}

	//对应品质的数量
	public getQualityCt(pin){
		let s =this;
		let ct = 0;
		for(let i = 0; i < s.datArr.length ; i++){
			let vo:Vo_HomeMaid = s.datArr[i]
			if(vo.isAct && vo.cfg.pinzhi == pin ){
				ct++;
			}
		}
		return ct;
	}

	//对应star的数量
	public getStarCt(star){
		let s =this;
		let ct = 0;
		for(let i = 0; i < s.datArr.length ; i++){
			let vo:Vo_HomeMaid = s.datArr[i]
			if(vo.isAct && vo.star >= star ){
				ct++;
			}
		}
		return ct;
	}
}