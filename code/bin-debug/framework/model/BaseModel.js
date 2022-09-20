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
/** 负责与服务端通信 和 存储模块数据*/
var BaseModel = (function (_super) {
    __extends(BaseModel, _super);
    function BaseModel() {
        var _this = _super.call(this) || this;
        _this.isAllow = false; //是否允许
        return _this;
    }
    /** 获取BYTEBUFF*/
    BaseModel.prototype.getBytes = function () {
        var SELF = BaseModel;
        if (SELF.bytes) {
            SELF.bytes.clear();
        }
        else {
            SELF.bytes = new BaseBytes();
        }
        return SELF.bytes;
    };
    /** 注册 WEBSOCKET HANLDER 函数*/
    BaseModel.prototype.listenServ = function (wsm) {
        this.socket = wsm;
    };
    /** 发送数据 是否是跨服协议 */
    BaseModel.prototype.sendSocket = function (cmd, ba, isCross) {
        if (!this.socket.webSocket.connect) {
            return;
        }
        this.socket.sendCMDBytes(cmd, ba, isCross);
    };
    BaseModel.prototype.notifyGlobal = function (key, params) {
        GGlobal.control.notify(key, params);
    };
    BaseModel.prototype.warn = function (str) {
        ViewCommonWarn.text(str);
    };
    return BaseModel;
}(MsgCenter));
__reflect(BaseModel.prototype, "BaseModel");
