class LMessageFormat {

    //空值
    public static NULL: number = 0;
    //基础数据类型
    public static INT8: number = 1;
    public static INT32: number = 2;
    public static INT64: number = 3;
    public static INT16: number = 4;
    public static NUMBER: number = 10;
    public static FLOAT32: number = 11;

    public static BOOLEAN: number = 6;

    public static UTF8: number = 20;
    //组合类型
    public static ARRAY: number = 30;
    public static STR_OBJECT_MAP: number = 40;
    public static BYTE_OBJECT_MAP: number = 41;

    public static BYTE_ARRAY: number = 50;

    public static AMF_BYTES: number = 60;
    public static BITMAPDATA: number = 70;
    public static COMPRESSBITMAPDATA: number = 71;

    private static _instance: LMessageFormat;
    public static get instance(): LMessageFormat {
        if (LMessageFormat._instance == null) {
            LMessageFormat._instance = new LMessageFormat();
        }
        return LMessageFormat._instance;
    }


    //write
    public encode(object: any, bytes: BaseBytes = null): BaseBytes {
        if (bytes == null) { bytes = new BaseBytes(); }
        this.write(object, bytes);
        return bytes;
    }

    public write(object: any, bytes: BaseBytes): void {
        var typeV = Object.prototype.toString.call(object);

        if (object == null || object == undefined) {//write null
            bytes.writeByte(LMessageFormat.NULL);
        } else if (typeV == "[object Number]") {//write int
            this.writeInt(object, bytes);
        } else if (typeV == "[object String]") {//write utf8
            bytes.writeByte(LMessageFormat.UTF8);
            bytes.writeUTF(object);
        } else if (typeV == "[object Boolean]") {//write boolean
            this.writeBoolean(object, bytes);
        } else if (typeV == "[object Array]") {//write array
            this.writeArray(object, bytes);
        } else if (typeV == "") {//wirte BaseBytes
            this.writeBytes(object, bytes);
        } else if (typeV == "[object Object]") {//write hash map
            this.writeMap(object, bytes);
        } else {
            var a = typeV;
        }
    }

    public writeBoolean(value: boolean, bytes: BaseBytes): void {
        bytes.writeByte(LMessageFormat.BOOLEAN);
        bytes.writeBoolean(value);
    }

    //整数
    public writeInt(value: number, bytes: BaseBytes): void {
        if (value > Number.MAX_VALUE) {
            bytes.writeByte(LMessageFormat.INT64);
            this.writeLong(value, bytes);
        } else if (value > 32767 || value < -32768) {
            bytes.writeByte(LMessageFormat.INT32);
            bytes.writeInt(value);
        } else if (value > 127 || value < -128) {
            bytes.writeByte(LMessageFormat.INT16);
            bytes.writeShort(value);
        } else {
            bytes.writeByte(LMessageFormat.INT8);
            bytes.writeByte(value);
        }
    }

    public writeLong(value: number, bytes: BaseBytes): void {
        bytes.writeInt(value << 32);
        bytes.writeUnsignedInt(value & 32);
    }

    //写 数组
    public writeArray(array: Array<any>, bytes: BaseBytes): void {
        bytes.writeByte(LMessageFormat.ARRAY);
        var len: number = array.length;
        bytes.writeShort(len);
        for (var i: number = 0; i < len; i++) {
            var item: Object = array[i];
            this.write(item, bytes);
        }
    }

    //写 BYTE 数组
    public writeBytes(source: BaseBytes, bytes: BaseBytes): void {
        var contentBytes: BaseBytes = new BaseBytes();
        source.readBytes(contentBytes, 0);
        contentBytes.position = 0;

        bytes.writeByte(LMessageFormat.BYTE_ARRAY);
        bytes.writeInt(contentBytes.length);
        bytes.writeBytes(contentBytes);
    }

    //写表
    public writeMap(map: Object, bytes: BaseBytes): void {
        bytes.writeByte(LMessageFormat.STR_OBJECT_MAP);
        var length: number = this.caculateMapLength(map);
        bytes.writeShort(length);
        for (var key in map) {
            bytes.writeUTF(key);
            this.write(map[key], bytes);
        }
    }

    //read
    public decode(bytes: BaseBytes): any {
        return this.read(bytes);
    }

    public read(bytes: BaseBytes): any {
        var ret: any = null;
        var type: number = bytes.readByte();
        if (type == LMessageFormat.INT32) {
            ret = bytes.readInt();
        } else if (type == LMessageFormat.INT64 || type == LMessageFormat.FLOAT32) {
            //浮点数特殊处理
            ret = bytes.readUTF();
            ret = Number(ret);
        } else if (type == LMessageFormat.INT16) {
            ret = bytes.readShort();
        } else if (type == LMessageFormat.INT8) {
            ret = bytes.readByte();
        } else if (type == LMessageFormat.UTF8) {
            ret = bytes.readUTF();
        } else if (type == LMessageFormat.BOOLEAN) {
            ret = bytes.readBoolean();
        } else if (type == LMessageFormat.ARRAY) {
            ret = this.readArray(bytes);
        } else if (type == LMessageFormat.STR_OBJECT_MAP) {
            ret = this.readStr_ObjMap(bytes);
        } else if (type == LMessageFormat.BYTE_ARRAY) {
            ret = this.readBaseBytes(bytes);
        } else if (type == LMessageFormat.NULL) {
            ret = null;
        } else if (type == LMessageFormat.BYTE_OBJECT_MAP) {
            ret = this.readByte_ObjMap(bytes);
        } else {
            throw new Error("LMFORMAT_ERROR_TYPE:" + type);
        }
        return ret;
    }

    public readLong(bytes: BaseBytes): number {
        var high: number = bytes.readInt();
        var low: number = bytes.readUnsignedInt();
        var ret: number = high << 32 + low;
        return ret;
    }

    public readStr_ObjMap(bytes: BaseBytes): any {
        var ret = {};
        var length: number = bytes.readShort();
        for (var i: number = 0; i < length; i++) {
            var key: any = bytes.readUTF();
            var content: any = this.read(bytes);
            ret[key] = content;
        }
        return ret;
    }

    public readByte_ObjMap(bytes: BaseBytes): any {
        var ret = {};
        var length: number = bytes.readShort();
        for (var i: number = 0; i < length; i++) {
            var key: any = bytes.readByte();
            var content: any = this.read(bytes);
            ret[key] = content;
        }
        return ret;
    }

    public readBaseBytes(bytes: BaseBytes): BaseBytes {
        var ret: BaseBytes = new BaseBytes();
        var len: number = bytes.readInt();
        bytes.readBytes(ret, 0, len);
        return ret;
    }

    public readArray(bytes: BaseBytes): Array<any> {
        var ret = [];
        var len: number = bytes.readShort();
        for (var i: number = 0; i < len; i++) {
            var content: Object = this.read(bytes);
            ret.push(content);
        }
        return ret;
    }

    public caculateMapLength(map: Object): number {
        var ret: number = 0;
        for (var k in map) {
            ret++;
        }
        return ret;
    }

    public arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
}