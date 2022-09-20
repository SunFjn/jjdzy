class BaseBytes extends egret.ByteArray {
	public constructor(buffer?: ArrayBuffer | Uint8Array, bufferExtSize?: number) {
		super(buffer, bufferExtSize);
	}

	/** js 最大只能表示 2^53 的整数 */
	public writeLong(v: number) {
		v = parseInt(v.toString(), 10);
		this.writeDouble(v);
	}

	public readDouble(): number {
		throw (new Error("use readLong"));
	}

	public readLong(): number {
		var double = super.readDouble();
		return double;
	}

	//return [] or [[],[]]
	public readFmt(format: any[], ret: any[] = null): any[] {
		if (!ret) {
			ret = [];
		}
		for (var i = 0; i < format.length; i++) {
			var t = format[i];
			if (t === "B") {
				ret[i] = this.readByte();
			} else if (t === "I") {
				ret[i] = this.readInt();
			} else if (t === "L") {
				ret[i] = this.readLong();
			} else if (t === "S") {
				ret[i] = this.readShort();
			} else if (t === "U") {
				ret[i] = this.readUTF();
			} else if (t === "J") {
				ret[i] = JSON.parse(this.readUTF());
			} else {
				var len = this.readShort();
				var arr = ret[i] = [];
				for (var ii = 0; ii < len; ii++) {
					arr[ii] = this.readFmt(t);
				}
			}
		}
		return ret;
	}

}