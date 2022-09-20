var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var WorldSocketMgr = (function (_super) {
    __extends(WorldSocketMgr, _super);
    function WorldSocketMgr() {
        var _this = _super.call(this) || this;
        _this.socketCache = new egret.ByteArray();
        _this.ba = new egret.ByteArray();
        return _this;
    }
    Object.defineProperty(WorldSocketMgr, "instance", {
        get: function () {
            if (!WorldSocketMgr._ins) {
                WorldSocketMgr._ins = new WorldSocketMgr();
            }
            return WorldSocketMgr._ins;
        },
        enumerable: true,
        configurable: true
    });
    WorldSocketMgr.prototype.connect = function (ip, port) {
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
        var isWSS = false;
        if (GGlobal.sdk) {
            isWSS = true;
        }
        else {
            var httphead = document.location.protocol.indexOf("https");
            isWSS = ip.indexOf("wss:") >= 0 || httphead != -1;
        }
        if (isWSS) {
            var url = "wss://" + ip + ":" + port + "/";
            console.log("connectWSS:" + url);
            this.webSocket.connectByUrl(url);
        }
        else {
            this.webSocket.connect(ip, port);
        }
    };
    WorldSocketMgr.prototype.close = function (force) {
        if (force === void 0) { force = false; }
        try {
            if (this.isNet) {
                this.webSocket.close();
            }
            else if (force && this.webSocket) {
                this.webSocket.close();
            }
        }
        catch (e) {
        }
    };
    Object.defineProperty(WorldSocketMgr.prototype, "isNet", {
        get: function () {
            if (this.webSocket && this.webSocket.connected) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    WorldSocketMgr.prototype.onConnect = function (e) {
        console.log("中央服webSocket链接成功");
        GGlobal.layerMgr.close2(UIConst.CONNECT_WORLD);
        //链接成功请求登录
        GGlobal.modelWorldNet.CG_Cross_loginCross_1663(Model_player.voMine.id);
    };
    WorldSocketMgr.prototype.onError = function (e) {
        console.log("中央服webSocket失败");
        GGlobal.layerMgr.close2(UIConst.CONNECT_WORLD);
        GGlobal.modelWorldNet.notify(Model_WorldNet.WORLD_SOCKET_CLOSE);
    };
    WorldSocketMgr.prototype.onClose = function (e) {
        console.log("中央服webSocket关闭");
        this.webSocket.close();
        GGlobal.layerMgr.close2(UIConst.CONNECT_WORLD);
        this.notify(egret.Event.CLOSE);
        GGlobal.modelWorldNet.notify(Model_WorldNet.WORLD_SOCKET_CLOSE);
    };
    WorldSocketMgr.prototype.onData = function (e) {
        e.target.readBytes(this.socketCache);
        this.doMsg();
    };
    WorldSocketMgr.prototype.doMsg = function () {
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
                if (true) {
                    handler.hand(handler.t, bodyBytes); //请注意第一个参数用self,为了提高性能才这样写
                }
                if (false) {
                    try {
                        handler.hand(handler.t, bodyBytes); //请注意第一个参数用self,为了提高性能才这样写
                    }
                    catch (e) {
                        console.error("world-socketError:CMD=" + cmd);
                    }
                }
                var requestID;
                var request = GGlobal.socketMgr.request[requestID];
                if (request) {
                    try {
                        handler.hand(request.t, bodyBytes);
                    }
                    catch (e) {
                        console.error("world-socketError:REQUEST=" + requestID);
                    }
                }
                if (!this.socketCache.bytesAvailable) {
                    this.socketCache.clear();
                }
            }
            else {
                this.socketCache.position -= 4;
                break;
            }
        }
    };
    /**
     * 推送数据到服务器
     * @cmd 协议号
     * @data 具体内容 bytes
     * */
    WorldSocketMgr.prototype.sendCMDBytes = function (cmd, content) {
        if (!this.isNet || !this.webSocket.connected) {
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
    };
    return WorldSocketMgr;
}(MsgCenter));
__reflect(WorldSocketMgr.prototype, "WorldSocketMgr");
