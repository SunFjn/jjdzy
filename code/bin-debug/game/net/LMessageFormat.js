var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LMessageFormat = (function () {
    function LMessageFormat() {
    }
    Object.defineProperty(LMessageFormat, "instance", {
        get: function () {
            if (LMessageFormat._instance == null) {
                LMessageFormat._instance = new LMessageFormat();
            }
            return LMessageFormat._instance;
        },
        enumerable: true,
        configurable: true
    });
    //write
    LMessageFormat.prototype.encode = function (object, bytes) {
        if (bytes === void 0) { bytes = null; }
        if (bytes == null) {
            bytes = new BaseBytes();
        }
        this.write(object, bytes);
        return bytes;
    };
    LMessageFormat.prototype.write = function (object, bytes) {
        var typeV = Object.prototype.toString.call(object);
        if (object == null || object == undefined) {
            bytes.writeByte(LMessageFormat.NULL);
        }
        else if (typeV == "[object Number]") {
            this.writeInt(object, bytes);
        }
        else if (typeV == "[object String]") {
            bytes.writeByte(LMessageFormat.UTF8);
            bytes.writeUTF(object);
        }
        else if (typeV == "[object Boolean]") {
            this.writeBoolean(object, bytes);
        }
        else if (typeV == "[object Array]") {
            this.writeArray(object, bytes);
        }
        else if (typeV == "") {
            this.writeBytes(object, bytes);
        }
        else if (typeV == "[object Object]") {
            this.writeMap(object, bytes);
        }
        else {
            var a = typeV;
        }
    };
    LMessageFormat.prototype.writeBoolean = function (value, bytes) {
        bytes.writeByte(LMessageFormat.BOOLEAN);
        bytes.writeBoolean(value);
    };
    //整数
    LMessageFormat.prototype.writeInt = function (value, bytes) {
        if (value > Number.MAX_VALUE) {
            bytes.writeByte(LMessageFormat.INT64);
            this.writeLong(value, bytes);
        }
        else if (value > 32767 || value < -32768) {
            bytes.writeByte(LMessageFormat.INT32);
            bytes.writeInt(value);
        }
        else if (value > 127 || value < -128) {
            bytes.writeByte(LMessageFormat.INT16);
            bytes.writeShort(value);
        }
        else {
            bytes.writeByte(LMessageFormat.INT8);
            bytes.writeByte(value);
        }
    };
    LMessageFormat.prototype.writeLong = function (value, bytes) {
        bytes.writeInt(value << 32);
        bytes.writeUnsignedInt(value & 32);
    };
    //写 数组
    LMessageFormat.prototype.writeArray = function (array, bytes) {
        bytes.writeByte(LMessageFormat.ARRAY);
        var len = array.length;
        bytes.writeShort(len);
        for (var i = 0; i < len; i++) {
            var item = array[i];
            this.write(item, bytes);
        }
    };
    //写 BYTE 数组
    LMessageFormat.prototype.writeBytes = function (source, bytes) {
        var contentBytes = new BaseBytes();
        source.readBytes(contentBytes, 0);
        contentBytes.position = 0;
        bytes.writeByte(LMessageFormat.BYTE_ARRAY);
        bytes.writeInt(contentBytes.length);
        bytes.writeBytes(contentBytes);
    };
    //写表
    LMessageFormat.prototype.writeMap = function (map, bytes) {
        bytes.writeByte(LMessageFormat.STR_OBJECT_MAP);
        var length = this.caculateMapLength(map);
        bytes.writeShort(length);
        for (var key in map) {
            bytes.writeUTF(key);
            this.write(map[key], bytes);
        }
    };
    //read
    LMessageFormat.prototype.decode = function (bytes) {
        return this.read(bytes);
    };
    LMessageFormat.prototype.read = function (bytes) {
        var ret = null;
        var type = bytes.readByte();
        if (type == LMessageFormat.INT32) {
            ret = bytes.readInt();
        }
        else if (type == LMessageFormat.INT64 || type == LMessageFormat.FLOAT32) {
            //浮点数特殊处理
            ret = bytes.readUTF();
            ret = Number(ret);
        }
        else if (type == LMessageFormat.INT16) {
            ret = bytes.readShort();
        }
        else if (type == LMessageFormat.INT8) {
            ret = bytes.readByte();
        }
        else if (type == LMessageFormat.UTF8) {
            ret = bytes.readUTF();
        }
        else if (type == LMessageFormat.BOOLEAN) {
            ret = bytes.readBoolean();
        }
        else if (type == LMessageFormat.ARRAY) {
            ret = this.readArray(bytes);
        }
        else if (type == LMessageFormat.STR_OBJECT_MAP) {
            ret = this.readStr_ObjMap(bytes);
        }
        else if (type == LMessageFormat.BYTE_ARRAY) {
            ret = this.readBaseBytes(bytes);
        }
        else if (type == LMessageFormat.NULL) {
            ret = null;
        }
        else if (type == LMessageFormat.BYTE_OBJECT_MAP) {
            ret = this.readByte_ObjMap(bytes);
        }
        else {
            throw new Error("LMFORMAT_ERROR_TYPE:" + type);
        }
        return ret;
    };
    LMessageFormat.prototype.readLong = function (bytes) {
        var high = bytes.readInt();
        var low = bytes.readUnsignedInt();
        var ret = high << 32 + low;
        return ret;
    };
    LMessageFormat.prototype.readStr_ObjMap = function (bytes) {
        var ret = {};
        var length = bytes.readShort();
        for (var i = 0; i < length; i++) {
            var key = bytes.readUTF();
            var content = this.read(bytes);
            ret[key] = content;
        }
        return ret;
    };
    LMessageFormat.prototype.readByte_ObjMap = function (bytes) {
        var ret = {};
        var length = bytes.readShort();
        for (var i = 0; i < length; i++) {
            var key = bytes.readByte();
            var content = this.read(bytes);
            ret[key] = content;
        }
        return ret;
    };
    LMessageFormat.prototype.readBaseBytes = function (bytes) {
        var ret = new BaseBytes();
        var len = bytes.readInt();
        bytes.readBytes(ret, 0, len);
        return ret;
    };
    LMessageFormat.prototype.readArray = function (bytes) {
        var ret = [];
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var content = this.read(bytes);
            ret.push(content);
        }
        return ret;
    };
    LMessageFormat.prototype.caculateMapLength = function (map) {
        var ret = 0;
        for (var k in map) {
            ret++;
        }
        return ret;
    };
    LMessageFormat.prototype.arrayBufferToBase64 = function (buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };
    //空值
    LMessageFormat.NULL = 0;
    //基础数据类型
    LMessageFormat.INT8 = 1;
    LMessageFormat.INT32 = 2;
    LMessageFormat.INT64 = 3;
    LMessageFormat.INT16 = 4;
    LMessageFormat.NUMBER = 10;
    LMessageFormat.FLOAT32 = 11;
    LMessageFormat.BOOLEAN = 6;
    LMessageFormat.UTF8 = 20;
    //组合类型
    LMessageFormat.ARRAY = 30;
    LMessageFormat.STR_OBJECT_MAP = 40;
    LMessageFormat.BYTE_OBJECT_MAP = 41;
    LMessageFormat.BYTE_ARRAY = 50;
    LMessageFormat.AMF_BYTES = 60;
    LMessageFormat.BITMAPDATA = 70;
    LMessageFormat.COMPRESSBITMAPDATA = 71;
    return LMessageFormat;
}());
__reflect(LMessageFormat.prototype, "LMessageFormat");
