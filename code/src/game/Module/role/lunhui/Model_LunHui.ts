class Model_LunHui extends BaseModel {

	public static UP_STAR = "up_star";
	public static UP_LEVEL = "up_level";
	public static CHECKED = "checked";
	public static UP_FENJIE = "up_fenjie";
	public static bagMap: any = {};//位置key
	public static type: number = 0;//六道套装类型

	public static checkLunHuiNotice(): boolean {
		let ret = false;
		let cfg = Config.lunhui_274[Model_player.voMine.reincarnationLevel];
		if (cfg.conmuse == "0") return ret;
		let costArr = JSON.parse(cfg.conmuse);
		let itemVo: VoItem = VoItem.create(costArr[0][1]);
		let count: number = Model_Bag.getItemCount(costArr[0][1]);
		if (cfg && cfg.lv > 0 && Model_player.voMine.level >= cfg.lv && count >= costArr[0][2]) {
			ret = true;
		}
		return ret;
	}

	/**六道红点 */
	public static checkSWNotice(): boolean {
		let ret = false;
		let rdt = GGlobal.reddot;
		for(let i:number = 0;i < 6;i ++)
		{
			let bol:boolean = rdt.checkCondition(UIConst.SIXWAY, i);
			if(bol)
			{
				return true;
			}
		}
		return ret;
	}

	/**六道红点全部索引 */
	public static checkSWNoticeAll() {
		for(let i:number = 0;i < 6;i ++)
		{
			Model_LunHui.checkSWNoticeByIndex(i + 1);
		}
		let rdt = GGlobal.reddot;
		rdt.notifyMsg(UIConst.ROLE);
		rdt.notifyMsg(UIConst.SIXWAY);
	}

	/**六道红点(某个索引) */
	public static checkSWNoticeByIndex(type:number) {
		let ret = Model_LunHui.checkEquip(type);
		let rdt = GGlobal.reddot;
		rdt.setCondition(UIConst.SIXWAY, type - 1, ret);
		// rdt.notifyMsg(UIConst.ROLE);
		// rdt.notifyMsg(UIConst.SIXWAY);
	}

	/**7101  进行轮回 */
	public CG_LUNHUI(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(7101, ba);
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
		wsm.regHand(7102, this.GC_LUNHUI, this);
		wsm.regHand(10592, this.GC_OPENTM_10592, this);
		wsm.regHand(10594, this.GC_UPTM_10594, this);
		wsm.regHand(11902, this.GC_SIXWAY_OPENUI, this);
		wsm.regHand(11904, this.GC_OPEN_ONEWAY, this);
		wsm.regHand(11906, this.GC_USE_YINGJI, this);
		wsm.regHand(11908, this.GC_UP_LEVEL, this);
		wsm.regHand(11910, this.GC_UP_STAR, this);
		wsm.regHand(11912, this.GC_RESOLVE, this);
		wsm.regHand(11914, this.GC_ADD_YINJI, this);
		wsm.regHand(11916, this.GC_FENJIEBYTYPE, this);
		wsm.regHand(11918, this.GC_ZUHECHANGE, this);
	}

	/**7102 进行轮回返回 B:返回状态:0-成功,1-失败I:当前轮回等级  */
	public GC_LUNHUI(self: Model_LunHui, data: BaseBytes): void {
		let result = data.readByte();
		if (result == 0) {
			Model_player.voMine.reincarnationLevel = data.readInt();
			GGlobal.control.notify(Enum_MsgType.LUNHUI_DATA_UPDATE);
		}
	}

	/** 轮回后的真实等级 */
	public static get realLv(): number {
		let lv: number = Model_player.voMine.level;
		if (Model_player.voMine.reincarnationLevel > 0) {
			for (let key in Config.lunhui_274) {
				let cfg = Config.lunhui_274[key];
				if (Model_player.voMine.reincarnationLevel <= cfg.id) {
					break;
				}
				lv += cfg.lv;
			}
		}
		return lv;
	}

	public tmArr: VoTianMing[] = []

	static OPENUI_TM = "openui_tm"
	static UP_TM = "up_tm"


	/**10591  打开天命 */
	public CG_OPENTM_10591(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(10591, ba);
	}


	/**打开界面返回 [I:天命idI:天命升级表idI:天命升品表id]天命列表  */
	public GC_OPENTM_10592(s: Model_LunHui, data: BaseBytes): void {
		let len = data.readShort();
		s.tmArr = [];
		for (let i = 0; i < len; i++) {
			let v: VoTianMing = new VoTianMing();
			v.readMsg(data);
			s.tmArr.push(v);
		}
		s.checkNotice();
		// s.notify(Model_LunHui.OPENUI_TM);
	}

	/**10593  升级，升品天命 */
	public CG_UPTM_10593(id): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(id);
		this.sendSocket(10593, ba);
	}

	/**升级，升品返回 B:状态：1：成功，2：已达最高级，3：道具不足I: 天命升级表idI:天命升品表id  */
	public GC_UPTM_10594(s: Model_LunHui, data: BaseBytes): void {
		let res = data.readByte();
		let lvId = data.readInt();
		let pinId = data.readInt();
		let id = data.readInt();
		if (res == 1) {
			for (let i = 0; i < s.tmArr.length; i++) {
				let v: VoTianMing = s.tmArr[i];
				if (v.id == id) {
					v.lvId = lvId;
					v.pinId = pinId;
					v.init()
					break;
				}
			}
			s.checkNotice();
			// s.notify(Model_LunHui.UP_TM);
		} else {
			ViewCommonWarn.text(["已达最高级", "道具不足"][res - 2])
		}
	}
	//可升级 升品
	public checkVo(v: VoTianMing) {
		let lh = Model_player.voMine.reincarnationLevel
		if (lh < v.cfg.lh || v.cfgLv == null) {//没开启
			return false;
		}
		if (v.cfgLv.next == 0) {//最大
			return false
		}
		let consume
		let pin = Config.tmlv_292[v.cfgLv.next].pin
		if ((v.pinId % 10) >= pin) {//升级
			consume = v.cfgLv.consume
		} else {//升品
			consume = v.cfgPin.consume
		}
		return ConfigHelp.checkEnough(consume, false);
	}

	public checkNotice() {
		let red = false
		let s = this;
		for (let i = 0; i < s.tmArr.length; i++) {
			let v: VoTianMing = s.tmArr[i];
			if (s.checkVo(v)) {
				red = true;
				break;
			}
		}
		let rdt = GGlobal.reddot
		rdt.setCondition(UIConst.TIANMING, 0, red);
		rdt.notifyMsg(UIConst.TIANMING);
		rdt.notifyMsg(ReddotEvent.CHECK_ROLE);
	}


	public suitArr = [];
	public power:number = 0;//总战力
	public static bagArr:VoSixWay[] = [];
	/**11901  打开ui返回 */
	public CG_SIXWAY_OPENUI(): void {
		let ba: BaseBytes = new BaseBytes();
		this.sendSocket(11901, ba);
	}

	/**11902 打开ui返回 L:总战力I:印记碎片数量[I:激活组合id][I:背包位置索引（1-300）I:印记idI:等级I:星级I:是否被锁住 0没有1有] */
	public GC_SIXWAY_OPENUI(s: Model_LunHui, data: BaseBytes): void {
		s.power = data.readLong();
		Model_player.voMine.yinji = data.readInt();
		let len = data.readShort();
		s.suitArr = [];
		for (let i = 0; i < len; i++) {
			let id: number = data.readInt();
			s.suitArr.push(id);
		}

		Model_LunHui.bagArr = [];
		len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: VoSixWay = new VoSixWay();
			v.readBagMsg(data);
			Model_LunHui.pushBagEqu(v);
		}

		len = s.suitArr.length;
		for(let i:number = 0;i < len;i ++)
		{
			s.CG_OPEN_ONEWAY(i + 1);
		}
		GGlobal.control.notify(UIConst.SIXWAY);
	}

	/**11903  打开某一道 B:索引 */
	public CG_OPEN_ONEWAY(index:number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(index);
		this.sendSocket(11903, ba);
	}

	public equipArr:any = {};//位置key
	public index:number = 0;
	/**11904 打开x道返回 B:索引[I:装备位置idI:装备印记idI:等级I:星级] */
	public GC_OPEN_ONEWAY(s: Model_LunHui, data: BaseBytes): void {
		s.index = data.readByte();
		// s.equipArr = [];
		let len = data.readShort();
		for (let i = 0; i < len; i++) {
			let v: VoSixWay = new VoSixWay();
			v.readEquipMsg(data);
			s.equipArr[v.pos] = v;
		}
		// GGlobal.control.notify(UIConst.SIXWAY_YINJI);
	}

	/**11905  使用印记 B:1.装备 2.卸下I:印记idI:该印记在背包的位置（1-300）I:要操作的装备位置 */
	public CG_USE_YINGJI(type: number, id: number, posB: number, posE: number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeByte(type);
		ba.writeInt(id);
		ba.writeInt(posB);
		ba.writeInt(posE);
		this.sendSocket(11905, ba);
	}

	/**11906 使用印记 B:装备/卸下结果0成功1不允许装备类型2失败B:类型I:背包索引I:身上索引 */
	public GC_USE_YINGJI(s: Model_LunHui, data: BaseBytes): void {
		let res = data.readByte();
		let type = data.readByte();
		let posB = data.readInt();
		let posE = data.readInt();
		if (res == 0) {
			if (type == 1) {//1.装备
				let vbag = Model_LunHui.bagMap[posB]
				vbag.pos = posE
				let vEqu:VoSixWay = s.equipArr[posE];
				if (vEqu && vEqu.id > 0) {
					vEqu.pos = posB;
				}
				s.equipArr[posE] = vbag;
				Model_LunHui.delBagEqu(posB)
				if (vEqu && vEqu.id > 0) {//替换
					Model_LunHui.pushBagEqu(vEqu);
				}
			} else {// 2.卸下
				let v:VoSixWay = s.equipArr[posE]
				let copy = v.copy()
				copy.pos = posB;
				Model_LunHui.pushBagEqu(copy);
				v.clear();
			}
			GGlobal.control.notify(Model_LunHui.UP_LEVEL);
			// Model_LunHui.checkSWNoticeByIndex(s.index);
			Model_LunHui.checkSWNoticeAll();
		} else {
			let t = type == 1 ? "装备" : "卸下";
			ViewCommonWarn.text(t + "失败")
			if (type != 1) {
				s.freshData();
			}
		}
	}

	/**11907  升级印记 I:装备位置*/
	public CG_UP_LEVEL(pos:number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(pos);
		this.sendSocket(11907, ba);
	}

	/**11908 升级装备位置上印记 B:0成功1失败I:位置索引I:印记idI:等级*/
	public GC_UP_LEVEL(s: Model_LunHui, data: BaseBytes): void {
		let res = data.readByte();
		if (res == 0) {
			let pos = data.readInt();
			let id = data.readInt();
			let lv = data.readInt();
			let v:VoSixWay = s.equipArr[pos];
			v.lv = lv;
			GGlobal.control.notify(Model_LunHui.UP_LEVEL);
			// Model_LunHui.checkSWNoticeByIndex(s.index);
			Model_LunHui.checkSWNoticeAll();
			ViewCommonWarn.text("升级成功")
		} else {
			ViewCommonWarn.text("升级失败")
		}
	}

	/**11909  升级装备印记星级 I:装备印记位置*/
	public CG_UP_STAR(pos:number): void {
		let ba: BaseBytes = new BaseBytes();
		ba.writeInt(pos);
		this.sendSocket(11909, ba);
	}

	/**11910 升星返回 B:升星结果0成功1失败I:印记位置I:印记idI:印记星级I:被消耗的的印记背包位置*/
	public GC_UP_STAR(s: Model_LunHui, data: BaseBytes): void {
		let res = data.readByte();
		if (res == 0) {
			let posE = data.readInt();
			let sid = data.readInt();
			let starLv = data.readInt();
			let v:VoSixWay = s.equipArr[posE];
			v.star = starLv
			//删除背包物品
			let posB = data.readInt();
			Model_LunHui.delBagEqu(posB)
			GGlobal.control.notify(Model_LunHui.UP_STAR);
			// Model_LunHui.checkSWNoticeByIndex(s.index);
			Model_LunHui.checkSWNoticeAll();
			ViewCommonWarn.text("升星成功")
		} else {
			ViewCommonWarn.text("升星失败")
		}
	}

	/**11911  分解背包印记 [I:位置]*/
	public CG_RESOLVE(arr: number[]): void {
		let len = arr.length;
		if (len == 0) return;
		let b = this.getBytes();
		b.writeShort(len);
		for (let i = 0; i < len; i++) {
			b.writeInt(arr[i]);
		}
		this.socket.sendCMDBytes(11911, b);
	}

	/**11912 分解返回 B:结果0成功1失败[I:被分解符文的背包索引]*/
	public GC_RESOLVE(s: Model_LunHui, data: BaseBytes): void {
		let res = data.readByte();
		if (res == 0) {
			let len = data.readShort();
			for (let i = 0; i < len; i++) {
				let posB = data.readInt();
				Model_LunHui.delBagEqu(posB);
			}
			GGlobal.control.notify(UIConst.SIXWAY_FENJIE);
			ViewCommonWarn.text("分解成功")
		} else {
			ViewCommonWarn.text("分解失败")
			s.freshData();
		}
	}

	/**11914 添加印记 [I:背包位置I:印记idI:印记等级I:印记星级]I:背包剩余位置*/
	public GC_ADD_YINJI(s: Model_LunHui, data: BaseBytes): void {
		let len = data.readShort();
		let dropArr: any = {};
		let arrGet = []
		for (let i = 0; i < len; i++) {
			let v: VoSixWay = new VoSixWay();
			v.readMsgBuy(data);
			Model_LunHui.pushBagEqu(v);
			if (dropArr[v.id]) {
				dropArr[v.id].ct++
			} else {
				dropArr[v.id] = { v: v, ct: 1 };
			}

		}
		let isFull = data.readInt();
		let sf = GGlobal.reddot;
		if (isFull < 50) {
			ViewCommonWarn.text("印记背包空间不足，请前往分解")
			// sf.setCondition(UIConst.SIXWAY_FENJIE, 6, true);
			// GGlobal.control.notify(UIConst.SIXWAY);
		}
		for (let key in dropArr) {
			let v: VoSixWay = dropArr[key].v;
			let ct = dropArr[key].ct;
			ViewBroadcastItemText.text("获得了" + v.name + "X" + ct, Color.getColorInt(v.pz), v.pz);
		}

		// if (arrGet) {
		// 	ViewCommonPrompt.textItemList(arrGet);
		// }
	}

	/**11915  分解按照类型 [B:[B:符文类型 2绿 3蓝 4紫 5橙 6红 8神]*/
	public CG_FENJIEBYTYPE(arr: number[]): void {
		let len = arr.length;
		if (len == 0) return;
		let b = this.getBytes();
		b.writeShort(len);
		for (let i = 0; i < len; i++) {
			b.writeByte(arr[i]);
		}
		this.socket.sendCMDBytes(11915, b);
	}

	/**11916 分解结果 B:0成功 1失败[B:类型]*/
	public GC_FENJIEBYTYPE(s: Model_LunHui, data: BaseBytes): void {
		let st = data.readByte();
		if (st == 0) {
			let len = data.readShort();
			let fenTy = {};
			for (let i = 0; i < len; i++) {
				let type = data.readByte();
				fenTy[type] = 1;
			}
			let size = Model_LunHui.bagArr.length;
			let newArr = [];
			for (let i = 0; i < size; i++) {
				let v = Model_LunHui.bagArr[i];
				if (!fenTy[v.pz]) {
					newArr.push(v);
				} else {
					delete Model_LunHui.bagMap[v.pos];
				}
			}
			Model_LunHui.bagArr = newArr;
			GGlobal.control.notify(UIConst.SIXWAY_FENJIE);
			ViewCommonWarn.text("分解成功")
		} else {
			ViewCommonWarn.text("分解失败")
			s.freshData();
		}
	}

	/**11918 印记组合战力发生变化 I:总战力[I:印记组合id]*/
	public GC_ZUHECHANGE(s: Model_LunHui, data: BaseBytes): void {
		s.power = data.readInt();
		let len = data.readShort();
		s.suitArr = [];
		for (let i = 0; i < len; i++) {
			let id: number = data.readInt();
			s.suitArr.push(id);
		}
		GGlobal.control.notify(Model_LunHui.UP_LEVEL);
		GGlobal.control.notify(UIConst.SIXWAY);
	}

	private static delBagEqu(posB: number) {
		let v = Model_LunHui.bagMap[posB];
		Model_LunHui.bagArr.splice(Model_LunHui.bagArr.indexOf(v), 1);
		delete Model_LunHui.bagMap[posB];
	}

	private static pushBagEqu(v: VoSixWay) {
		if (Model_LunHui.bagMap[v.pos] == null) {
			Model_LunHui.bagMap[v.pos] = v;
			Model_LunHui.bagArr.push(v);
		} else {
			Model_LunHui.bagMap[v.pos] = v;
			let has = false;
			for (let i = 0; i < Model_LunHui.bagArr.length; i++) {
				if (Model_LunHui.bagArr[i].pos == v.pos) {
					Model_LunHui.bagArr[i] = v;
					has = true;
					break;
				}
			}
			if (!has) {
				Model_LunHui.bagArr.push(v);
			}
		}
	}

	private freshData() {
		let self = this;
		if (!self._openUITime) {
			self._openUITime = true;
			// GGlobal.modellh.GC_OPEN_ONEWAY();
			Timer.instance.callLater(function () { this._openUITime = false }, 3000, self, 0, false, false, true);
		}
	}
	private _openUITime: boolean = false;

	public static getItemCt(id) {
		let ct = 0;
		for (let i = 0; i < Model_LunHui.bagArr.length; i++) {
			let v = Model_LunHui.bagArr[i];
			if (v.id == id) {
				ct++;
			}
		}
		return ct;
	}

	//有同类型
	public static checkTypeSame(type) {
		let modellh = GGlobal.modellh;
		let typeArr = {};
		for (let key in modellh.equipArr) {
			let eq = modellh.equipArr[key];
			if (!eq || eq.id == 0) continue;
			typeArr[eq.type] = true;
		}
		if (typeArr[type]) return true;
		return false;
	}

	/**六道升级红点 */
	public static canUpLevel(v: VoSixWay, warn = false):boolean {
		if (v == null) return false;
		if (v.id == 0) return false;
		let cfg:Isixdaolv_505 = Config.sixdaolv_505[v.lv];
		let cost:number = 0;
		if(v.pz == 2)
		{
			cost = cfg.exp2;
		}else if(v.pz == 3)
		{
			cost = cfg.exp3;
		}else if(v.pz == 4)
		{
			cost = cfg.exp4;
		}else if(v.pz == 5)
		{
			cost = cfg.exp5;
		}else if(v.pz == 6)
		{
			cost = cfg.exp6;
		}else{
			cost = cfg.exp8;
		}
		if (Model_player.voMine.yinji < cost) {
			if (warn) ViewCommonWarn.text("材料不足");
			return false;
		}
		if (v.lv >= v.maxLv) {
			if (warn) ViewCommonWarn.text("已达满级")
			return false;
		}
		return true;
	}

	/**六道升星红点 */
	public static canUpStar(v: VoSixWay, warn = false):boolean {
		if (v == null) return false;
		if (v.id == 0) return false;
		if (Model_LunHui.getItemCt(v.id) == 0) {
			if (warn) ViewCommonWarn.text("材料不足");
			return false;
		}
		if (v.star >= v.maxStar) {
			if (warn) ViewCommonWarn.text("已达满星");
			return false;
		}
		return true;
	}

	//有更高品质 0-7  可替换  xx
	public static canUpPower(pos:number) {
		let modellh = GGlobal.modellh;
		let eq = modellh.equipArr[pos];
		if (eq == null || eq.id == 0) return false;
		let typeArr = {};
		for (let key in modellh.equipArr) {
			let eq = modellh.equipArr[key];
			if (!eq || eq.id == 0) continue;
			typeArr[eq.type] = true;
		}
		//有已开启但未镶嵌的印记,且背包有未镶嵌的印记时要有红点
		for (let k = 0; k < Model_LunHui.bagArr.length; k++) {
			let ebag = Model_LunHui.bagArr[k];
			if (!ebag || ebag.type == 0) continue;
			if (eq.type == ebag.type && ebag.pz > eq.pz) return true;
			if (typeArr[ebag.type]) continue;
			if (ebag.type == pos && ebag.pz > eq.pz) return true;
		}
		return false;
	}

	///有可镶嵌时红点
	public static canWear(pos: number): boolean {
		let modellh = GGlobal.modellh;
		let eq = modellh.equipArr[pos];
		if (eq && eq.id > 0) {
			return false;
		}
		let typeArr = {};
		for (let key in modellh.equipArr) {
			let eq = modellh.equipArr[key];
			if (!eq || eq.id == 0) continue;
			typeArr[eq.type] = true;
		}
		//有已开启但未镶嵌的印记,且背包有未镶嵌的印记时要有红点
		for (let k = 0; k < Model_LunHui.bagArr.length; k++) {
			let ebag = Model_LunHui.bagArr[k];
			if (!ebag || ebag.type == 0) continue;
			if (ebag.type == pos && !typeArr[ebag.type]) return true;
		}
		return false;
	}

	//镶嵌
	public static checkEquip(type:number): boolean {
		//已镶嵌印记可升星升级时要有红点
		let modellh = GGlobal.modellh;
		// let len:number = modellh.equipArr.length;
		for (let key in modellh.equipArr) {
			let eq:VoSixWay = modellh.equipArr[key];
			if(Math.floor(eq.pos / 10) == type)
			{
				if (eq && eq.lv < eq.maxLv && Model_LunHui.canUpLevel(eq)) {
					return true;
				}
				if (eq && eq.star < eq.maxStar && Model_LunHui.canUpStar(eq)) {
					return true;
				}
				if (eq && Model_LunHui.canWear(eq.pos)) {
					return true;
				}
				if (eq && Model_LunHui.canUpPower(eq.pos)) {
					return true;
				}
			}
		}
		return false
	}
}