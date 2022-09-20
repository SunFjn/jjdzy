class ModelChongZhi extends BaseModel {
	public constructor() {
		super();
	}

	static guideToRecharge(callFun: Handler = null) {
		GGlobal.layerMgr.close2(UIConst.ALERT_BUY);
		setTimeout(function () {
			ViewAlert.show("元宝不足，是否前往充值？", Handler.create(this, function () {
				if (callFun) {
					callFun.run();
				}
				ViewChongZhi.tryToOpenCZ();
			}), ViewAlert.OKANDCANCEL, "前往充值", "取消");
		}, 100);
	}

	data: any[];

	public static payParams: IChongzhiInfo = <any>{};
	public static orderInfo: any = <any>{};
	/**充值调用 
	 * money 单位分
	 * product_id 产品ID
	 * product_name 产品名字
	 * product_num 产品数量
	*/
	public static recharge(money, product_id, product_name, product_num: number = 1) {
		let loginArg = GGlobal.loginArg;
		let voMine = Model_player.voMine;
		// if (GGlobal.sdk) {
		// 	ModelChongZhi.payParams.money = money;
		// 	ModelChongZhi.payParams.product_id = product_id;
		// 	ModelChongZhi.payParams.product_name = product_name;
		// 	ModelChongZhi.payParams.product_num = product_num;
		// 	ModelChongZhi.payParams.app_server = loginArg.zoneid + "";  // 服务器
		// 	ModelChongZhi.payParams.role_level = voMine.level;
		// 	ModelChongZhi.payParams.role_name = voMine.name;
		// 	ModelChongZhi.payParams.passthrough_params = '';
		// } else {
		let cfg = Config.shop_011[product_id];
		let vomine = Model_player.voMine;
		let orderInfo: any = new Object();
		ModelChongZhi.orderInfo.productCode = GameConfig.productCode;
		ModelChongZhi.orderInfo.uid = GameConfig.uid;
		ModelChongZhi.orderInfo.username = GameConfig.username;
		ModelChongZhi.orderInfo.userRoleId = vomine.id;
		ModelChongZhi.orderInfo.userRoleName = vomine.name;
		ModelChongZhi.orderInfo.serverId = GGlobal.zone;
		ModelChongZhi.orderInfo.userServer = GGlobal.zoneName;
		ModelChongZhi.orderInfo.userLevel = vomine.level;
		ModelChongZhi.orderInfo.amount = Math.ceil(money / 100);
		ModelChongZhi.orderInfo.subject = cfg.name;
		ModelChongZhi.orderInfo.desc = cfg.explain;
		ModelChongZhi.orderInfo.callbackUrl = '';
		ModelChongZhi.orderInfo.extrasParams = "" + loginArg.zoneid + "_" + GameConfig.pf;
		ModelChongZhi.orderInfo.goodsId = product_id;
		ModelChongZhi.orderInfo.count = product_num;
		ModelChongZhi.orderInfo.quantifier = '个';
	}

	/**
	 * 订单号 whiteList:0不是白名单 1是白名单
	*/
	public static chongzhi(order: string, whiteList, cfgid) {
		// if (GGlobal.sdk) {
		// 	if (ModelChongZhi.payParams.product_id != cfgid) {
		// 		ViewCommonWarn.text("订单数据错误");
		// 		return;
		// 	}
		// 	ModelChongZhi.payParams.cp_order_num = order;
		// 	if (whiteList == 1) {
		// 		ModelChongZhi.payParams.money = 100;
		// 	}
		// 	egret.log("充值数据" + JSON.stringify(ModelChongZhi.payParams));
		// 	GGlobal.sdk.payOrder(ModelChongZhi.payParams);
		// } else 
		if (ModelChongZhi.orderInfo.goodsId != cfgid) {
			ViewCommonWarn.text("订单数据错误");
			return;
		}
		ModelChongZhi.orderInfo.cpOrderNo = order;
		if (GameConfig.realTest == 1) {
			ModelChongZhi.orderInfo.amount = 1;
		}
		if (Model_UserData.isWhitePlayer) {
			ModelChongZhi.orderInfo.amount = 1;
		}
		HLSDK.payOrder(ModelChongZhi.orderInfo);
	}

	public listenServ(s: WebSocketMgr) {
		let a = this;
		this.socket = s;
		s.regHand(138, a.GC_OPENCHONGZHI_138, a);
		s.regHand(136, a.GC_CHONGZHI_136, a);
	}

	/**
	* customTip:自定义提示文本
	* cfgId: 默认读取充值商品表的ID
	* customTip:自定义提示文本
	* isMsg:是否需要提示
	* customParam:与后端约定的参数内容(待定)
	*/
	public CG_CHONGZHI_135(cfgId, customTip = null, isMsg = true, customParam = '') {
		let cfg1 = Config.shop_011[cfgId];
		let itemName = cfg1.name;
		let rmb = cfg1.rmb;
		let type = cfg1.clienttype;
		ModelChongZhi.recharge(rmb, cfgId, cfg1.name);

		if (isMsg) {
			if (!customTip) {
				customTip = "是否花费<font color='#15f234'>{0}元</font>购买{1}\n" +
					"(金额计算至VIP经验)\n" +
					"<font color='#FFC344'>(注意：特权卡计算入充值活动)</font>\n";
				customTip = BroadCastManager.reTxt(customTip, rmb / 100, itemName);
			}
			ViewAlert.show(customTip, Handler.create(this, this.RequestRechargeOrder, [[type, cfgId, customParam]]));
		} else {
			this.RequestRechargeOrder([type, cfgId, customParam]);
		}
	}

	/**
	 * 135 I-I
	* 请求充值 I:充值类型 1元宝 2特权卡 6尊贵周卡  I:对应充值项id U 与后端约定的参数内容(待定)
	* 返回订单号
	*/
	public RequestRechargeOrder(arg) {
		var b = this.getBytes();
		b.writeInt(arg[0]);
		b.writeInt(arg[1]);
		b.writeUTF(arg[2]);
		this.sendSocket(135, b, true);
	}

	/**
	 * 136 	B-U
	 * 申请充值返回 B:返回 1：成功，2：充值未开放U:订单信息B:0不是白名单 1是白名单
	*/
	private GC_CHONGZHI_136(s: ModelChongZhi, b: BaseBytes) {
		var r = b.readByte();
		if (r == 1) {
			let code = b.readUTF();
			let whiteList = b.readByte();
			let cfgid = b.readInt();
			ModelChongZhi.chongzhi(code, whiteList, cfgid);
		} else {
			ViewCommonWarn.text("充值系统维护中");
		}
	}

	/**137 
	*打开充值界面
	*/
	public CG_OPENCHONGZHI_137() {
		var b = this.getBytes();
		this.sendSocket(137, b);
	}

	public normalMul: number = 0;
	/**
	 * 138 	B-I-[I-B]
	 * 返回充值界面数据 B:vip等级I:vip经验[I:充值额度IDB:剩余次数（满足送5倍）]5倍返利信息
	*/
	private GC_OPENCHONGZHI_138(s: ModelChongZhi, b: BaseBytes) {
		var v = GGlobal.modelvip;
		v.setVip(b.readByte());
		v.exp = b.readInt();
		s.data = b.readFmt([["I", "I"]])[0];
		var len = s.data.length;
		s.data[len - 1] = [0, 350];
		s.data[len - 2] = [0, 320];
		GGlobal.control.notify(Enum_MsgType.CHONGZHIOPEN);
	}
}
interface IChongzhiInfo {
	/** * money	number	充值金额	必填，单位：分；例：100 = 1RMB
	*product_id	string	商品ID	必填
	*product_name	string	商品名称	必填
	*product_num	number	购买商品数量	必填
	*cp_order_num	string	订单号码	必填
	*app_server	string	游戏服ID	必填
	*role_level	number	角色等级	必填
	*role_name	string	角色名称	必填
	*passthrough_params	string	透传参数	选填（格式：a=1&b=2&c=3） */
	money: number;
	product_id: number;
	product_name: string;
	product_num: number;
	app_server: any;
	role_level: number;
	role_name: string;
	passthrough_params: any;
	cp_order_num: any;
}

interface IJYChongzhiInfo {
	/**	用户id */
	uid: number;
	/**角色id */
	role_id: number;
	/**	角色名称*/
	role_name: string;
	/**	用户名称 账号*/
	username: string;
	/**必传	角色所在服 */
	server_name: string;
	/**可为空值(int)	服ID */
	server_id: number;
	/**	角色等级 */
	role_level: number;
	/**必传	游戏内的订单单号 */
	cp_order_code: string;
	/**	金额,单位元 */
	amount: number;
	/**购买项目 */
	subject: string;
	/**	描述 */
	desc: string;
	/**额外参数 */
	extras_params: string;
	/**必传	商品ID */
	goods_id: number;
	/**必传(int)	购买商品个数 */
	count: number;
	/**必传	购买商品单位，如，个 */
	quantifier: string;
}