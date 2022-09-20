class WorldSocketMgr extends MsgCenter {
	public constructor() {
		super();
	}

	protected static _ins: WorldSocketMgr;
	public static get instance(): WorldSocketMgr {
		if (!WorldSocketMgr._ins) {
			WorldSocketMgr._ins = new WorldSocketMgr();
		}
		return WorldSocketMgr._ins;
	}

	/**是否已链接 true已链接 */
	public webSocket: egret.WebSocket;
	public socketCache: egret.ByteArray = new egret.ByteArray();

	public bodyBytes: BaseBytes;

	protected _ip: string;
	protected _port: number;
	public connect(ip: string, port: number): void {
		if (ip == this._ip && this._port == port && this.isNet) {
			GGlobal.modelWorldNet.CG_Cross_loginCross_1663(Model_player.voMine.id);
			return;
		}
		if (!this.webSocket) {
			this.webSocket = new egret.WebSocket();
			this.webSocket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
			this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
			this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this);
			this.webSocket.addEventListener(egret.Event.CLOSE, this.onClose, this);
			this.webSocket.type = egret.WebSocket.TYPE_BINARY;

			this.bodyBytes = new BaseBytes();
		}

		this.close(true);

		console.log("开始链接中央服webSocket");

		this._ip = ip;
		this._port = port;
		let isWSS = false;
		if (GGlobal.sdk) {
			isWSS = true;
		} else {
			var httphead = document.location.protocol.indexOf("https");
			isWSS = ip.indexOf("wss:") >= 0 || httphead != -1
		}
		if (isWSS) {
			var url = "wss://" + ip + ":" + port + "/";
			console.log("connectWSS:" + url);
			this.webSocket.connectByUrl(url);
		} else {
			this.webSocket.connect(ip, port);
		}
	}

	public close(force: boolean = false): void {
		try {
			if (this.isNet) {
				this.webSocket.close();
			} else if (force && this.webSocket) {
				this.webSocket.close();
			}
		} catch (e) {
		}
	}

	public get isNet(): boolean {
		if (this.webSocket && this.webSocket.connected) {
			return true;
		}
		return false;
	}

	protected onConnect(e: egret.Event): void {
		console.log("中央服webSocket链接成功");
		GGlobal.layerMgr.close2(UIConst.CONNECT_WORLD);
		//链接成功请求登录
		GGlobal.modelWorldNet.CG_Cross_loginCross_1663(Model_player.voMine.id);
	}

	protected onError(e: egret.IOErrorEvent): void {
		console.log("中央服webSocket失败");
		GGlobal.layerMgr.close2(UIConst.CONNECT_WORLD);
		GGlobal.modelWorldNet.notify(Model_WorldNet.WORLD_SOCKET_CLOSE);
	}

	protected onClose(e: egret.Event): void {
		console.log("中央服webSocket关闭");
		this.webSocket.close();
		GGlobal.layerMgr.close2(UIConst.CONNECT_WORLD);
		this.notify(egret.Event.CLOSE);
		GGlobal.modelWorldNet.notify(Model_WorldNet.WORLD_SOCKET_CLOSE);
	}

	protected onData(e: egret.ProgressEvent): void {
		(e.target as egret.WebSocket).readBytes(this.socketCache);
		this.doMsg();
	}

	public doMsg() {
		var bodyBytes = this.bodyBytes;
		while (this.socketCache.bytesAvailable >= 2) {
			var len = this.socketCache.readUnsignedShort();
			if (this.socketCache.bytesAvailable >= len - 2) {
				bodyBytes.clear();

				if (len - 2 > 0) {
					this.socketCache.readBytes(bodyBytes, 0, len - 2);
					bodyBytes.position = 0;
				}
				var cmd = bodyBytes.readUnsignedShort();

				console.log("worldServer cmd:" + cmd);

				var handler = GGlobal.socketMgr.handleMap[cmd];
				if (!handler) {
					console.error("unregister:CMD=" + cmd);
					if (!this.socketCache.bytesAvailable) {
						this.socketCache.clear();
					}
					continue;
				}
				if (DEBUG) {
					handler.hand(handler.t, bodyBytes);//请注意第一个参数用self,为了提高性能才这样写
				}
				if (RELEASE) {
					try {
						handler.hand(handler.t, bodyBytes);//请注意第一个参数用self,为了提高性能才这样写
					} catch (e) {
						console.error("world-socketError:CMD=" + cmd);
					}
				}
				var requestID;
				var request = GGlobal.socketMgr.request[requestID];
				if (request) {
					try {
						handler.hand(request.t, bodyBytes);
					} catch (e) {
						console.error("world-socketError:REQUEST=" + requestID);
					}
				}

				if (!this.socketCache.bytesAvailable) {
					this.socketCache.clear();
				}
			} else {
				this.socketCache.position -= 4;
				break;
			}
		}
	}

	public ba: egret.ByteArray = new egret.ByteArray();
	/** 
	 * 推送数据到服务器
	 * @cmd 协议号 
	 * @data 具体内容 bytes
	 * */
	public sendCMDBytes(cmd: number, content: BaseBytes) {
		if (!this.isNet || !this.webSocket.connected) {//服务器断开
			return;
		}
		console.log("sendWorld cmd:" + cmd);
		var ba = this.ba;
		ba.clear();

		//write head
		ba.writeUnsignedShort(content.length + 4);
		//

		//content
		ba.writeUnsignedShort(cmd);
		ba.writeBytes(content);
		//

		this.webSocket.writeBytes(ba);
		this.webSocket.flush();
	}

}