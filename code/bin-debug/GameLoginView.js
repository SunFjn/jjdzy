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
var GameLoginView = (function (_super) {
    __extends(GameLoginView, _super);
    function GameLoginView() {
        var _this = _super.call(this) || this;
        _this.loaderArr = [];
        _this.initUI();
        return _this;
    }
    GameLoginView.prototype.initUI = function () {
        egret.ImageLoader.crossOrigin = "anonymous";
        var imageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
        imageLoader.load(GGlobal.resHead + "resource/login/B_back1.jpg");
        this._bg = new egret.Bitmap();
        this.addChild(this._bg);
        this.loaderArr.push(imageLoader);
        var staticLb;
        staticLb = new egret.TextField();
        this.addChild(staticLb);
        this.setProperty(staticLb, { "x": 140, "y": 350, "text": "帐号", "size": 40 });
        staticLb = new egret.TextField();
        this.addChild(staticLb);
        this.setProperty(staticLb, { "x": 100, "y": 450, "text": "服务器", "size": 40 });
        this._lbAccount = new egret.TextField();
        this.addChild(this._lbAccount);
        this.setProperty(this._lbAccount, { "x": 240, "y": 350, "text": "", "size": 40, "type": egret.TextFieldType.INPUT, "backgroundColor": 0x000000, "width": 300, "height": 50, "background": true });
        this._lbPort = new egret.TextField();
        this.addChild(this._lbPort);
        this._lbPort.touchEnabled = true;
        this.setProperty(this._lbPort, { "x": 240, "y": 450, "text": "", "size": 40, "backgroundColor": 0x000000, "width": 300, "height": 50, "background": true });
        this._lbPort.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowServerList, this);
        imageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler1, this);
        imageLoader.load(GGlobal.resHead + "resource/login/bt_enter.png");
        this._enter = new egret.Bitmap();
        this.addChild(this._enter);
        this._enter.x = 180;
        this._enter.y = 550;
        this._enter.touchEnabled = true;
        this._enter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnter, this);
        this.loaderArr.push(imageLoader);
        GGlobal.stage.addEventListener("serverChange", this.onChangeServerHandler, this);
        this._lbAccount.text = "g1";
        for (var key in GameLoginView.loginArgData) {
            if (GameLoginView.loginArgData[key].selected) {
                GGlobal.loginArg = GameLoginView.loginArgData[key];
                break;
            }
        }
        this._lbPort.text = GGlobal.loginArg.name;
        var sx = GGlobal.stage.$stageWidth / 720;
        var sy = GGlobal.stage.$stageHeight / 1280;
        var ret = Math.min(sx, sy);
        this.scaleX = this.scaleY = ret;
    };
    GameLoginView.prototype.onChangeServerHandler = function (evt) {
        GGlobal.loginArg = evt.data;
        this._lbPort.text = evt.data.name;
        if (this._serverList) {
            this._serverList.dispose();
        }
    };
    GameLoginView.prototype.onShowServerList = function (evt) {
        if (!this._serverList) {
            this._serverList = new ServerListPanel();
            this._serverList.init(this.width, this.height);
        }
        this._serverList.show(this);
    };
    GameLoginView.prototype.onEnter = function (evt) {
        if (true) {
            console.log("进入游戏");
        }
        GGlobal.loginArg.account = this._lbAccount.text;
        var port = this._lbPort.text;
        this.callBack.run();
        this.dispose();
    };
    GameLoginView.prototype.loadCompleteHandler1 = function (event) {
        var imageLoader = event.currentTarget;
        var texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
        this._enter.texture = texture;
    };
    GameLoginView.prototype.loadCompleteHandler = function (event) {
        var imageLoader = event.currentTarget;
        var texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
        this._bg.texture = texture;
    };
    GameLoginView.prototype.setProperty = function (disp, properties) {
        for (var key in properties) {
            disp[key] = properties[key];
        }
    };
    GameLoginView.prototype.dispose = function () {
        while (this.loaderArr.length) {
            var i = this.loaderArr.shift();
            i.data = null;
        }
        if (this._bg) {
            this._bg.texture = null;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
        if (this._serverList) {
            this._serverList.dispose(true);
        }
    };
    GameLoginView.loginArgData = [
        {
            "zoneid": 1,
            "alias": "欧景云",
            "state": 2,
            "port": 8001,
            "v": "V159",
            "ip": "192.168.2.9",
            "pf": "test01",
            "clientversion": "v3",
            "platform": "test01"
        }, {
            "clientversion": "v3",
            "port": 8001,
            "v": 0,
            "ip": "192.168.2.5",
            "zoneid": 1,
            "alias": "BT版本服",
            "state": 1,
            "pf": "test01",
            "platform": "test01"
        }, {
            "clientversion": "v3",
            "port": 8001,
            "v": 0,
            "ip": "106.54.90.227",
            "zoneid": 1,
            "alias": "BT正式服1区",
            "state": 1,
            "pf": "elbt01",
            "platform": "elbt01"
        }, {
            "zoneid": 101,
            "alias": "内测服一",
            "state": 2,
            "port": 8101,
            "v": "V159",
            "ip": "49.235.248.138",
            "pf": "test02",
            "clientversion": "v1",
            "platform": "fxzjsg01"
        }
    ];
    return GameLoginView;
}(egret.DisplayObjectContainer));
__reflect(GameLoginView.prototype, "GameLoginView");
var ServerListPanel = (function (_super) {
    __extends(ServerListPanel, _super);
    function ServerListPanel() {
        var _this = _super.call(this) || this;
        _this.listItemArr = [];
        _this.isShow = false;
        return _this;
    }
    ServerListPanel.prototype.init = function (_w, _h) {
        var sg = GGlobal.stage;
        this._spr = new egret.Sprite();
        this._spr.graphics.beginFill(0xFF00FF, .2);
        this._spr.graphics.drawRect(0, 0, _w, _h);
        this._spr.graphics.endFill();
        this.addChild(this._spr);
        this._spr.touchEnabled = true;
        this._spr.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClose, this);
        var imageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
        this.bgUrl = GGlobal.resHead + "resource/login/B_Select_server.png";
        imageLoader.load(this.bgUrl);
        this._bg = new egret.Bitmap();
        this._bg.pixelHitTest = false;
        this.addChild(this._bg);
        var dataProvaider = GameLoginView.loginArgData;
        var len = dataProvaider.length;
        var listItem;
        for (var i = 0; i < len; i++) {
            listItem = new LoginListItem();
            this.addChild(listItem);
            listItem.setData(dataProvaider[i]);
            listItem.x = 200;
            listItem.y = 80 * i + 100;
            this.listItemArr.push(listItem);
        }
    };
    ServerListPanel.prototype.onClose = function (event) {
        this.dispose();
    };
    ServerListPanel.prototype.loadCompleteHandler = function (event) {
        var imageLoader = event.currentTarget;
        var texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
        this._bg.texture = texture;
    };
    ServerListPanel.prototype.show = function (_p) {
        if (!this.parent) {
            _p.addChild(this);
        }
        this.isShow = true;
        this.x = 720 - 574 >> 1;
        this.y = 1280 - 782 >> 1;
        this._spr.x = -this.x;
        this._spr.y = -this.y;
    };
    ServerListPanel.prototype.dispose = function (mandatory) {
        if (this.parent) {
            this.parent.removeChild(this);
            if (mandatory) {
                RES.destroyRes(this.bgUrl);
                var len = this.listItemArr.length;
                for (var i = 0; i < len; i++) {
                    this.listItemArr[i].dispose();
                }
            }
        }
        this.isShow = false;
    };
    return ServerListPanel;
}(egret.DisplayObjectContainer));
__reflect(ServerListPanel.prototype, "ServerListPanel");
var LoginListItem = (function (_super) {
    __extends(LoginListItem, _super);
    function LoginListItem() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    LoginListItem.prototype.init = function () {
        var imageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
        this.bgUrl = GGlobal.resHead + "resource/login/Bt_Qufu.png";
        imageLoader.load(this.bgUrl);
        this._bg = new egret.Bitmap();
        this.addChild(this._bg);
        this._lbName = new egret.TextField();
        this.addChild(this._lbName);
        this._lbName.x = 10;
        this._lbName.y = 10;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
    };
    LoginListItem.prototype.onTouchHandler = function (evt) {
        GGlobal.stage.dispatchEvent(new egret.Event("serverChange", false, false, this._data));
    };
    LoginListItem.prototype.loadCompleteHandler = function (event) {
        var imageLoader = event.currentTarget;
        var texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
        this._bg.texture = texture;
    };
    LoginListItem.prototype.setData = function (data) {
        this._data = data;
        this._lbName.text = data["name"];
    };
    LoginListItem.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        RES.destroyRes(this.bgUrl);
    };
    return LoginListItem;
}(egret.DisplayObjectContainer));
__reflect(LoginListItem.prototype, "LoginListItem");
