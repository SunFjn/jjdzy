class Model_GM extends BaseModel {
	public constructor() {
		super();
	}
	/**加载json文件 */
	public static jsonReady: string = "jsonReady";
	/**类型：1：物品链接库（自定义） */
	public static TYPE1_TOOP_EQUIP: number = 1;
	/**类型：2：无连接 有输入框 */
	public static TYPE2_INPUT: number = 2;
	/**类型：3：没有输入框  */
	public static TYPE3_NO_INPUT: number = 3;
	/**类型：4：服务器时间  */
	public static TYPE4_TIMER: number = 4;
	/**类型：5：问鼎天下选择框 */
	public static TYPE5_WDTX: number = 5;
	/**类型：6：货币 */
	public static TYPE6_HUO_BI: number = 6;

	/**问鼎天下配置 */
	public static WEN_DING_TIAN_XIA = [{ text: "1初始化", id: 1 }
		, { text: "2上传区战力", id: 2 }
		, { text: "3开始匹配", id: 3 }
		, { text: "4活动开启", id: 4 }
		, { text: "5活动结束", id: 5 }]
	/**货币配置 */
	public static HUO_BI_LIST = [{ text: "3铜币", id: 3 }
		, { text: "4元宝", id: 4 }
		, { text: "6经验", id: 6 }
		, { text: "7战功/功勋", id: 7 }
		, { text: "8熔炼值", id: 8 }
		, { text: "9星魂", id: 9 }
		, { text: "10魂火", id: 10 }
		, { text: "11声望", id: 11 }
		, { text: "12战场积分", id: 12 }
		, { text: "14符文经验", id: 14 }
		, { text: "20荣誉", id: 20 }
		, { text: "21繁荣度", id: 21 }
		, { text: "22府邸币", id: 22 }
		, { text: "23天宫积分", id: 23 }
		, { text: "27弹珠积分", id: 27 }
		, { text: "29印记碎片", id: 29 }
		, { text: "30武庙十哲积分", id: 30 }
		, { text: "35VIP经验", id: 35 }
		];

	public static parseProtocolObj(str: string, ctx: any) {
		if (!ctx) {
			ctx = { pointer: 0 };
		}
		var ret = [];
		while (ctx.pointer < str.length) {
			var char = str[ctx.pointer];
			if (char == ctx.breakChar) {
				ctx.pointer++;
				ctx.breakChar = null;
				break;
			}
			if (char == "[") {
				var list = Model_GM.parseProtocolArr(str, ctx);
				ret.push(list);
			} else {
				if (
					char == "B" ||
					char == "S" ||
					char == "I" ||
					char == "L" ||
					char == "U"
				) {
					ret.push(char);
				}
				ctx.pointer++;
			}
		}
		return ret;
	}

	public static parseProtocolArr(str: string, ctx: any) {
		var ret: any;
		var firstChar = str[ctx.pointer];
		if (firstChar == "[") {
			ctx.pointer++;
			ctx.breakChar = "]";
			ret = this.parseProtocolObj(str, ctx);
			ctx.pointer++;
		}
		return ret;
	}

	//协议处理
	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(96, this.GC_GM_SERVER_LOG, this);
		mgr.regHand(98, this.GC_GM_SERVER_RETURN, this);
	}


	/**99 S-S-U GM命令 S:系统类型S:方法类型U:内容*/
	public CG_GM_CMD(type: number, index: number, content: string): void {
		var bates = this.getBytes();
		bates.writeShort(type);
		bates.writeShort(index);
		bates.writeUTF(content);
		this.sendSocket(99, bates);
	}

	//96 U-B 后端输出错误 U:文本B:类型 1：警告，2：错误· 3弹框
	public static content: string = "";
	public GC_GM_SERVER_LOG(self: Model_Bag, data: BaseBytes): void {
		let arg1 = data.readUTF();
		let arg2 = data.readByte();

		if (arg2 == 1) {
			ViewCommonWarn.text("server warm:" + arg1);
		} else if (arg2 == 2) {
			ViewCommonWarn.text("server error:" + arg1);
		} else if (arg2 == 3) {
			Model_GM.content += arg1 + "\n";
			// ViewServerAlert.show(Model_GM.content, null, 3);
		} else {
			ViewCommonWarn.text("96 U-B 后端输出错误: " + arg2);
		}
	}

	//98 S-U-B Gm协议返回 S:GM类型IDU:如果有多数据用“_”分割B:操作类型 
	public GC_GM_SERVER_RETURN(self: Model_Bag, data: BaseBytes): void {
		let arg1 = data.readShort();
		let arg2 = data.readUTF();
		let arg3 = data.readByte();
		ViewGmPanel.updateSeverInfo(arg1, arg2, arg3);
	}

	public sendSocket(cmd, ba: BaseBytes, isCross?: boolean) {
		if (!this.socket.webSocket.connect) {
			return;
		}
		this.socket.sendCMDBytes(cmd, ba, true);
	}
}