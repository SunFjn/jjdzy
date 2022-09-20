class GameLoginView extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.initUI();
    }
    private _lbAccount: egret.TextField;
    private _lbPort: egret.TextField;
    private _bg: egret.Bitmap;
    private _enter: egret.Bitmap
    private _serverList: ServerListPanel;

    public static loginArgData: any = [
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

    private loaderArr: any[] = [];
    public initUI(): void {
        egret.ImageLoader.crossOrigin = "anonymous";
        var imageLoader: egret.ImageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
        imageLoader.load(GGlobal.resHead + "resource/login/B_back1.jpg");
        this._bg = new egret.Bitmap();
        this.addChild(this._bg);
        this.loaderArr.push(imageLoader);

        let staticLb: egret.TextField;
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
        for (let key in GameLoginView.loginArgData) {
            if (GameLoginView.loginArgData[key].selected) {
                GGlobal.loginArg = GameLoginView.loginArgData[key];
                break;
            }
        }
        this._lbPort.text = GGlobal.loginArg.name;

        var sx: number = GGlobal.stage.$stageWidth / 720;
        var sy: number = GGlobal.stage.$stageHeight / 1280;
        var ret: number = Math.min(sx, sy);
        this.scaleX = this.scaleY = ret;
    }

    private onChangeServerHandler(evt: egret.Event) {
        GGlobal.loginArg = evt.data;
        this._lbPort.text = evt.data.name;
        if (this._serverList) {
            this._serverList.dispose();
        }
    }

    private onShowServerList(evt: egret.TouchEvent): void {
        if (!this._serverList) {
            this._serverList = new ServerListPanel();
            this._serverList.init(this.width, this.height);
        }
        this._serverList.show(this);
    }

    public callBack: Handler;
    private onEnter(evt: egret.TouchEvent): void {
        if (DEBUG) {
            console.log("进入游戏");
        }
        GGlobal.loginArg.account = this._lbAccount.text;
        let port = this._lbPort.text;

        this.callBack.run();
        this.dispose();
    }

    private loadCompleteHandler1(event): void {
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        let texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
        this._enter.texture = texture;
    }

    private loadCompleteHandler(event): void {
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        let texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
        this._bg.texture = texture;
    }

    private setProperty(disp: egret.DisplayObject, properties?: Object) {
        for (var key in properties) {
            disp[key] = properties[key];
        }
    }

    public dispose() {
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
    }
}
class ServerListPanel extends egret.DisplayObjectContainer {
    public constructor() {
        super();
    }
    private _bg: egret.Bitmap;

    private listItemArr: any = [];
    private bgUrl: string;
    private _spr: egret.Sprite
    public init(_w, _h) {
        var sg: egret.Stage = GGlobal.stage;
        this._spr = new egret.Sprite();
        this._spr.graphics.beginFill(0xFF00FF, .2);
        this._spr.graphics.drawRect(0, 0, _w, _h);
        this._spr.graphics.endFill();
        this.addChild(this._spr);
        this._spr.touchEnabled = true;
        this._spr.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClose, this);

        var imageLoader: egret.ImageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
        this.bgUrl = GGlobal.resHead + "resource/login/B_Select_server.png";
        imageLoader.load(this.bgUrl);
        this._bg = new egret.Bitmap();
        this._bg.pixelHitTest = false;
        this.addChild(this._bg);

        let dataProvaider = GameLoginView.loginArgData;
        let len: number = dataProvaider.length;
        let listItem: LoginListItem;
        for (var i: number = 0; i < len; i++) {
            listItem = new LoginListItem();
            this.addChild(listItem);
            listItem.setData(dataProvaider[i]);
            listItem.x = 200;
            listItem.y = 80 * i + 100;
            this.listItemArr.push(listItem);
        }
    }

    private onClose(event): void {
        this.dispose();
    }

    private loadCompleteHandler(event): void {
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        let texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
        this._bg.texture = texture;
    }

    public isShow: boolean = false;
    public show(_p: egret.DisplayObjectContainer) {
        if (!this.parent) {
            _p.addChild(this);
        }
        this.isShow = true;
        this.x = 720 - 574 >> 1;
        this.y = 1280 - 782 >> 1;
        this._spr.x = -this.x;
        this._spr.y = -this.y;
    }

    public dispose(mandatory?: boolean) {
        if (this.parent) {
            this.parent.removeChild(this);
            if (mandatory) {
                RES.destroyRes(this.bgUrl);
                let len = this.listItemArr.length;
                for (var i: number = 0; i < len; i++) {
                    this.listItemArr[i].dispose();
                }
            }
        }
        this.isShow = false;
    }
}
class LoginListItem extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.init();
    }
    private _bg: egret.Bitmap;
    private _lbName: egret.TextField;

    public _data: any;
    private bgUrl: string;
    public init() {
        var imageLoader: egret.ImageLoader = new egret.ImageLoader();
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
    }

    private onTouchHandler(evt: egret.TouchEvent) {
        GGlobal.stage.dispatchEvent(new egret.Event("serverChange", false, false, this._data));
    }

    private loadCompleteHandler(event): void {
        var imageLoader = <egret.ImageLoader>event.currentTarget;
        let texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
        this._bg.texture = texture;
    }

    public setData(data: any) {
        this._data = data;
        this._lbName.text = data["name"];
    }

    public dispose() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        RES.destroyRes(this.bgUrl);
    }
}