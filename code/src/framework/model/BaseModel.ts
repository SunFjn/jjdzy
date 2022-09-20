/** 负责与服务端通信 和 存储模块数据*/
class BaseModel extends MsgCenter {
	public socket: WebSocketMgr;
	public static bytes: BaseBytes;
	public isAllow: boolean = false;//是否允许
	public constructor() {
		super();
	}

	/** 获取BYTEBUFF*/
	public getBytes() {
		var SELF = BaseModel;
		if (SELF.bytes) {
			SELF.bytes.clear();
		} else {
			SELF.bytes = new BaseBytes();
		}
		return SELF.bytes;
	}

	/** 注册 WEBSOCKET HANLDER 函数*/
	public listenServ(wsm: WebSocketMgr) {
		this.socket = wsm;
	}

	/** 发送数据 是否是跨服协议 */
	public sendSocket(cmd, ba: BaseBytes, isCross?: boolean) {
		if (!this.socket.webSocket.connect) {
			return;
		}
		this.socket.sendCMDBytes(cmd, ba, isCross);
	}

	notifyGlobal(key, params?) {
		GGlobal.control.notify(key, params);
	}

	warn(str) {
		ViewCommonWarn.text(str);
	}
}