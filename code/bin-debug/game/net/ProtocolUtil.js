var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ProtocolUtil = (function () {
    function ProtocolUtil() {
    }
    ProtocolUtil.decodeBin = function (source) {
        var ba = new egret.ByteArray(source);
        ProtocolUtil.protocolDic = new Object();
        var len = ba.readInt();
        var fields;
        var variables;
        try {
            for (var i = 0; i < len; i++) {
                var cmd = ba.readInt();
                fields = ba.readUTF();
                variables = ba.readUTF();
                fields = JSON.parse(fields);
                variables = JSON.parse(variables);
                ProtocolUtil.protocolDic[cmd] = { "fields": fields, "variables": variables };
            }
        }
        catch (e) {
            console.log(1);
        }
    };
    ProtocolUtil.decodeCMD = function (cmd, ba) {
        var data = ProtocolUtil.protocolDic;
        if (!data) {
            throw new Error("协议尚未准备完成");
        }
        if (!data[cmd]) {
            if (true) {
                throw new Error("协议文件出现异常：CMD=" + cmd);
            }
            else {
                console.error("协议文件出现异常：CMD=" + cmd);
            }
        }
        else {
            try {
                var ret = {};
                var protocolArr = data[cmd].fields;
                var variables = data[cmd].variables;
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
            }
            catch (e) {
                if (true) {
                    throw new Error("协议文件出现异常：CMD=" + cmd);
                }
                else {
                    console.error("协议文件出现异常：CMD=" + cmd);
                    console.error("协议文件出现异常：CMD=" + cmd);
                    console.error("协议文件出现异常：CMD=" + cmd);
                }
            }
        }
    };
    return ProtocolUtil;
}());
__reflect(ProtocolUtil.prototype, "ProtocolUtil");
