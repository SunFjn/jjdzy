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
var WebSocketMgr = (function (_super) {
    __extends(WebSocketMgr, _super);
    function WebSocketMgr() {
        var _this = _super.call(this) || this;
        _this.reqestMap = {};
        _this.handleMap = {};
        _this.requestID = 1;
        _this.socketCache = new egret.ByteArray();
        _this._isReconnect = false;
        _this.reconectHand = new Dictionary(); //断线重连事件合集
        _this.isDebug = 1;
        _this.ba = new egret.ByteArray();
        return _this;
    }
    WebSocketMgr.prototype.init = function () {
        if (!this.webSocket) {
            this.webSocket = new egret.WebSocket();
            this.webSocket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
            this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this);
            this.webSocket.addEventListener(egret.Event.CLOSE, this.onClose, this);
            this.webSocket.type = egret.WebSocket.TYPE_BINARY;
            this.bodyBytes = new BaseBytes();
        }
    };
    WebSocketMgr.prototype.delSocket = function () {
        // this.webSocket = new egret.WebSocket();
        if (this.webSocket) {
            this.webSocket.removeEventListener(egret.Event.CONNECT, this.onConnect, this);
            this.webSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            this.webSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this);
            this.webSocket.removeEventListener(egret.Event.CLOSE, this.onClose, this);
            this.webSocket = null;
        }
    };
    WebSocketMgr.prototype.connect = function (ip, port) {
        if (GGlobal.sdk) {
            var url = "wss://" + ip + ":" + port + "/";
            console.log("connectWSS:" + url);
            this.webSocket.connectByUrl(url);
        }
        else {
            var httphead = -1;
            if (GameConfig.codeType != 3) {
                httphead = document.location.protocol.indexOf("https");
            }
            if (ip.indexOf("wss:") >= 0) {
                this.webSocket.connectByUrl(ip);
            }
            else if (httphead != -1) {
                var url = "wss://" + ip + ":" + port + "/";
                console.log("connectWSS:" + url);
                this.webSocket.connectByUrl(url);
            }
            else {
                this.webSocket.connect(ip, port);
            }
        }
    };
    WebSocketMgr.prototype.onConnect = function (e) {
        if (this.connectCallBack) {
            this.connectCallBack(this, e);
        }
        if (this._isReconnect) {
            this.reconectHand.values.forEach(function (handler, index, array) {
                handler.run();
            });
        }
    };
    WebSocketMgr.prototype.onError = function (e) {
        if (true) {
            console.log("onError:" + e);
        }
        if (this.errorCallBack) {
            this.errorCallBack(this, e);
        }
    };
    WebSocketMgr.prototype.registerReconnectHD = function (key, hd) {
        if (this.reconectHand.indexOf(key) == -1) {
            this.reconectHand.set(key, hd);
        }
    };
    WebSocketMgr.prototype.removeReconnectHD = function (key) {
        this.reconectHand.remove(key);
    };
    WebSocketMgr.prototype.onClose = function (e) {
        if (true) {
            console.log("onClose:" + e);
        }
        this.notify(e.type);
        this._isReconnect = true;
        GGlobal.modelGlobalMsg.onSocketClose();
    };
    WebSocketMgr.prototype.onData = function (e) {
        e.target.readBytes(this.socketCache);
        this.doMsg();
    };
    WebSocketMgr.prototype.doMsg = function () {
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
                console.log("server cmd:" + cmd);
                var handler = this.handleMap[cmd];
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
                        console.error("socketError:CMD=" + cmd);
                        console.error(e.message);
                        console.error(e.stack);
                    }
                }
                var requestID;
                var request = this.request[requestID];
                if (request) {
                    // try {
                    handler.hand(request.t, bodyBytes);
                    // } catch (e) {
                    // 	console.error("socketError:REQUEST=" + requestID);
                    // }
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
    WebSocketMgr.prototype.testData = function (cmd, list) {
        var ba = new BaseBytes();
        for (var i = 0; i < list.length; i += 2) {
            var t = list[i];
            var content = list[i + 1];
            if (t == "B") {
                ba.writeByte(content);
            }
            else if (t == "S") {
                ba.writeShort(content);
            }
            else if (t == "I") {
                ba.writeInt(content);
            }
            else if (t == "L") {
                ba.writeDouble(content);
            }
            else if (t == "U") {
                ba.writeUTF(content);
            }
        }
        ba.position = 0;
        this.testRecive(cmd, ba);
    };
    WebSocketMgr.prototype.testRecive = function (cmd, bytes) {
        var handler = this.handleMap[cmd];
        if (handler) {
            handler.hand(handler.t, bytes);
        }
    };
    /** 注册服务器调用 */
    WebSocketMgr.prototype.regHand = function (handid, hand, thisObj) {
        if (this.handleMap[handid]) {
            console.debug("重复注册WEBSOCKET" + handid);
        }
        this.handleMap[handid] = { id: handid, hand: hand, t: thisObj };
    };
    /**
     * 推送数据到服务器
     * @cmd 协议号
     * @data 具体内容 bytes
     * */
    WebSocketMgr.prototype.sendCMDBytes = function (cmd, content, isCross) {
        if (!this.webSocket.connected) {
            return;
        }
        if (isCross) {
            if (WorldSocketMgr.instance.isNet) {
                var bo = Model_WorldNet.sendCmd(cmd, content);
                if (cmd >= 3400 && cmd <= 3424) {
                    return;
                }
                if (cmd >= 11103 && cmd <= 11199) {
                    return;
                }
                if (Model_WorldNet.crossCMDList.indexOf(cmd) > -1) {
                    return;
                }
            }
            else {
                console.log("cross server not connect");
            }
        }
        console.log("send cmd:" + cmd);
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
    /** 发送数据 并且监听 返回 */
    WebSocketMgr.prototype.request = function (cmd, content, callback, thisObj) {
        if (thisObj === void 0) { thisObj = null; }
        var ba = this.ba;
        ba.clear();
        //write head
        ba.writeUnsignedShort(content.length + 4);
        //
        //content
        ba.writeUnsignedShort(cmd);
        ba.writeBytes(content);
        var request = { rid: this.requestID, cmd: cmd, t: thisObj, hand: callback };
        this.reqestMap[this.requestID] = request;
        //
        this.webSocket.writeBytes(ba);
        this.webSocket.flush();
        if (this.requestID > 65535) {
            this.requestID = 1;
        }
        this.requestID++;
    };
    WebSocketMgr.prototype.clear = function () {
        this.webSocket.readBytes(this.socketCache);
        this.socketCache.clear();
        this.bodyBytes.clear();
    };
    WebSocketMgr.prototype.close = function () {
        this.webSocket.close();
    };
    return WebSocketMgr;
}(MsgCenter));
__reflect(WebSocketMgr.prototype, "WebSocketMgr");
