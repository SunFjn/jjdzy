class Model_GuanXian extends BaseModel {
	public constructor() {
		super();
	}

	public static getJiangXianStrNoJie(idx): string {
		let r;
		if (idx == 0) r = "平民";
		else {
			let lib = Config.guanxian_701[idx];
			let color = Color.getColorStr(lib.pinzhi);
			r = "<font color='"+color+"'>" + lib.name+"</font>";
		}
		return r;
	}

	public static getJiangXianStr(idx): string {
		let r;
		if (idx == 0) r = "【零阶】平民";
		else {
			let lib = Config.guanxian_701[idx];
			let color = Color.getColorStr(lib.pinzhi);
			r = "<font color='"+color+"'>【" + ConfigHelp.NumberToChinese(idx - 1) + "阶】" + "" + lib.name+"</font>";
		}
		return r;
	}

	public static getJiangXianStr1(idx): string {
		let r;
		if (idx == 0) r = "【零阶·平民】";
		else{
			let lib = Config.guanxian_701[idx];
			let color = Color.getColorStr(lib.pinzhi);
			r = "<font color='"+color+"'>【" + ConfigHelp.NumberToChinese(idx - 1) + "阶】" + "" + lib.name+"</font>";
		}
		return r;
	}

	/**官职索引*/public guanzhi: number = 0;
	/**功勋*/public gongxun: number = 0;

	private _maxL: number = 0;
	get maxL() {
		if (this._maxL == 0) {
			var lib = Config.guanxian_701;
			for (var key in lib) {
				this._maxL++;
			}
		}
		return this._maxL;
	}

	public listenServ(mgr: WebSocketMgr) {
		this.socket = mgr;
		mgr.regHand(154, this.scGuanxian, this);
		mgr.regHand(156, this.scLvlUpGX, this);
	}

	/**153 CG 获取官衔  */
	public csGuanxian() {
		var ba: BaseBytes = this.getBytes();
		this.sendSocket(153, ba);
	}

	/**154GC 获取官衔返回 B:官衔索引I:功勋*/
	public scGuanxian(self: Model_GuanXian, bytes: BaseBytes) {
		self.guanzhi = bytes.readByte();
		Model_player.voMine.setJiangXian(self.guanzhi);
		self.gongxun = bytes.readInt();
		GGlobal.control.notify(Enum_MsgType.MSG_GXINIT);
		GGlobal.control.notify(Enum_MsgType.MSG_GXUPDATE);
	}

	/**155 CG 升级官衔   */
	public csLvlUpGX() {
		var ba: BaseBytes = this.getBytes();
		this.sendSocket(155, ba);
	}

	/**156GC 升官衔返回 B:0成功 1失败B:当前官衔I:功勋*/
	public scLvlUpGX(self: Model_GuanXian, bytes: BaseBytes) {
		var ret = bytes.readByte();
		self.guanzhi = bytes.readByte();
		Model_player.voMine.setJiangXian(self.guanzhi);
		self.gongxun = bytes.readInt();
		if (ret == 0) {
			ViewCommonWarn.text("升级成功");
			GGlobal.control.notify(Enum_MsgType.MSG_GXUPDATE);
		}
		else ViewCommonWarn.text("升级失败");
	}
}