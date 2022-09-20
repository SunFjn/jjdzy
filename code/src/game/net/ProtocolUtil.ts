class ProtocolUtil {
	public constructor() {
	}

	static protocolDic: Object;
	public static decodeBin(source: ArrayBuffer): void {
		var ba: egret.ByteArray = new egret.ByteArray(source);
		ProtocolUtil.protocolDic = new Object();
		let len = ba.readInt();
		let fields;
		let variables;
		try {
			for (let i = 0; i < len; i++) {
				let cmd = ba.readInt();
				fields = ba.readUTF();
				variables = ba.readUTF();
				fields = JSON.parse(fields);
				variables = JSON.parse(variables);
				ProtocolUtil.protocolDic[cmd] = { "fields": fields, "variables": variables };
			}
		} catch (e) {
			console.log(1);
		}
	}

	public static decodeCMD(cmd, ba: BaseBytes): any {
		let data = ProtocolUtil.protocolDic;
		if (!data) {
			throw new Error("协议尚未准备完成");
		}
		if (!data[cmd]) {
			if (DEBUG) {
				throw new Error("协议文件出现异常：CMD=" + cmd);
			} else {
				console.error("协议文件出现异常：CMD=" + cmd)
			}
		} else {
			try {
				var ret: any = {};
				var protocolArr: any[] = data[cmd].fields;
				var variables: any[] = data[cmd].variables;
				for (var i = 0; i < protocolArr.length; i++) {
					switch (protocolArr[i]) {
						case "I":
							ret[variables[i]] = ba.readInt();
							break;
						case "U":
							ret[variables[i]] = ba.readUTF();
							break;
						case "L":
							ret[variables[i]] = ba.readLong();
							break;
						case "S":
							ret[variables[i]] = ba.readShort();
							break;
						case "B":
							ret[variables[i]] = ba.readByte();
							break;
						default://意外的数据类型当作数组处理
							var len = ba.readShort();
							var arr = ret[i] = [];
							for (var ii = 0; ii < len; ii++) {
								arr[ii] = ba.readFmt(protocolArr[i]);
							}
							ret[variables[i]] = arr;
							break;
					}
				}
				return ret;
			} catch (e) {
				if (DEBUG) {
					throw new Error("协议文件出现异常：CMD=" + cmd);
				} else {
					console.error("协议文件出现异常：CMD=" + cmd)
					console.error("协议文件出现异常：CMD=" + cmd)
					console.error("协议文件出现异常：CMD=" + cmd)
				}
			}
		}
	}
}