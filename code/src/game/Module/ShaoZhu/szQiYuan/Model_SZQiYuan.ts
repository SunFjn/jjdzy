class Model_SZQiYuan extends BaseModel {
	public constructor() {
		super();
	}

	/**2221 打开界面 */
	public CG_OPENUI(): void {
		var bates = this.getBytes();
		this.sendSocket(5391, bates);
	}

	/**祈祷 B:祈祷次数,1次或10次 */
	public CG_PRAY(type: number): void {
		var bates = this.getBytes();
		bates.writeByte(type)
		this.sendSocket(5393, bates);
	}

	/**领取积分宝箱 I:少主祈愿积分表id */
	public CG_GET_SCORE_AWARD(id): void {
		var bates = this.getBytes();
		bates.writeInt(id)
		this.sendSocket(5395, bates);
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(5392, this.GC_OPENUI5392, this);
		mgr.regHand(5394, this.GC_PRAY5394, this);
		mgr.regHand(5396, this.GC_GET_SCORE_AWARD, this);
	}
	//祈愿符数量
	qyCount: number = 0;
	//个人积分
	myPoint: number = 0;
	pointArr: { id: number, ct: number }[] = [];
	//祈愿符  道具id
	public static qiyuanId: number = 410069;
	//跳过动画
	public static skipTween = false;

	//打开界面返回 I:祈愿符数量[I:少主祈愿积分表idI:可领取个数]积分奖励可领取个数I:个人积分
	private GC_OPENUI5392(self: Model_SZQiYuan, data: BaseBytes): void {
		self.qyCount = data.readInt();
		var len = data.readShort();
		self.pointArr = [];
		for (let i = 0; i < len; i++) {
			let vp: { id: number, ct: number } = { id: data.readInt(), ct: data.readInt() };
			self.pointArr.push(vp);
		}
		self.myPoint = data.readInt();
		GGlobal.control.notify(Enum_MsgType.SZQIYUAN_OPEN_UI)
		GGlobal.control.notify(Enum_MsgType.SZQIYUAN_RED)
	}

	//祈祷返回 B:状态，1：成功，2：祈愿符不足，3：元宝不足I:祈愿符数量I:个人积分[B:奖品类型I:奖品idI:奖品数量B:是否额外]抽取的奖品列表
	private GC_PRAY5394(self: Model_SZQiYuan, data: BaseBytes): void {
		var rs = data.readByte();
		if (rs == 1) {
			self.qyCount = data.readInt();
			self.myPoint = data.readInt();
			let len = data.readShort();
			var dropArr = [];
			for (let i = 0; i < len; i++) {
				dropArr.push({ item: ConfigHelp.parseItemBa(data), isBig: data.readByte() });
			}
			let dTime = Model_SZQiYuan.skipTween ? 0 : 3000
			setTimeout(function () {
				GGlobal.layerMgr.open(UIConst.SHAOZHU_QIYUAN_SHOW, dropArr);
				let arrGet = [];
				for (let i = 0; i < dropArr.length; i++) {
					let it = dropArr[i].item
					if (it.gType == Enum_Attr.ITEM && it.quality > 5) {
						arrGet.push(it)
					}
				}
				if (arrGet) {
					ViewCommonPrompt.textItemList(arrGet);
				}
			}, dTime);
			GGlobal.control.notify(Enum_MsgType.SZQIYUAN_PRAY)
			GGlobal.control.notify(Enum_MsgType.SZQIYUAN_PRAY_MOVIE, dropArr)
			GGlobal.control.notify(Enum_MsgType.SZQIYUAN_RED)
		} else if (rs == 2) {
			View_CaiLiao_GetPanel.show(VoItem.create(Model_SZQiYuan.qiyuanId));
		} else if (rs == 3) {
			ModelChongZhi.guideToRecharge()
		} else {
			ViewCommonWarn.text("祈愿失败")
		}
	}

	//领取积分宝箱返回 B:状态,0:领取成功,1:失败,-1:更新状态I:少主祈愿积分表idI:剩余领取个数 -1领取完了
	private GC_GET_SCORE_AWARD(self: Model_SZQiYuan, data: BaseBytes): void {
		var result = data.readByte();
		var pointId = data.readInt();
		var status = data.readInt();
		if (result == 0 || result == -1) {
			for (let i = 0; i < self.pointArr.length; i++) {
				let vo = self.pointArr[i];
				if (vo.id == pointId) {
					vo.ct = status;
					GGlobal.control.notify(Enum_MsgType.SZQIYUAN_GET_POINT, vo)
					break;
				}
			}
			if (result == 0) {
				ViewCommonWarn.text("领取成功")
			}
			GGlobal.control.notify(Enum_MsgType.SZQIYUAN_RED)
		} else {
			ViewCommonWarn.text("领取失败")
		}
	}

	public checkNotice() {
		let ct = Model_Bag.getItemCount(Model_SZQiYuan.qiyuanId)
		if (ct > 0) {
			return true;
		}
		let s = this;
		for (let i = 0; i < s.pointArr.length; i++) {
			let vo = s.pointArr[i];
			if (vo.ct > 0) {
				return true;
			}
		}
		return false;
	}
}