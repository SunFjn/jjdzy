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
var ChildTuiSongMsg = (function (_super) {
    __extends(ChildTuiSongMsg, _super);
    function ChildTuiSongMsg() {
        return _super.call(this) || this;
    }
    ChildTuiSongMsg.createInstance = function () {
        return (fairygui.UIPackage.createObject("dailytask", "ChildTuiSongMsg"));
    };
    ChildTuiSongMsg.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.c1 = this.getController("c1");
        this.list = (this.getChild("list"));
        this.btnDef = (this.getChild("btnDef"));
        this.btnRew = (this.getChild("btnRew"));
        this.lb1 = (this.getChild("lb1"));
        this.lb2 = (this.getChild("lb2"));
        this.boxTit = (this.getChild("boxTit"));
        this.btnSave = (this.getChild("btnSave"));
        this.lb = (this.getChild("lb"));
        this.btnUp = (this.getChild("btnUp"));
        this.img = (this.getChild("img"));
        this.boxUp = (this.getChild("boxUp"));
        var s = this;
        s.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, s.onOpen, s);
        s.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, s.onHide, s);
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderHander;
        s.list.numItems = 0;
        s.btnUp.text = "复制链接";
    };
    ChildTuiSongMsg.prototype.loadCompleteHandler = function (event) {
        var imageLoader = event.currentTarget;
        var texture = new egret.Texture();
        texture._setBitmapData(imageLoader.data);
        this._bg.texture = texture;
    };
    ChildTuiSongMsg.prototype.onOpen = function () {
        var s = this;
        s.c1.selectedIndex = 1;
        if (HLSDK.whalePbSDK) {
            HLSDK.whalePbSDK.getnewversion(function (res) {
                if (res && res.status) {
                    s.newVers = res.data;
                    s.setNewVers();
                    console.log("newversion--status:" + res.status);
                    console.log("newversion--data:" + res.data);
                    if (res.data) {
                        console.log("newversion--data.url:" + res.data.url);
                        console.log("newversion--data.icon:" + res.data.icon);
                    }
                }
            });
        }
        GGlobal.modelactPreView.CG7501();
        s.btnDef.addClickListener(s.onDefault, s);
        s.btnRew.addClickListener(s.onReward, s);
        s.btnUp.addClickListener(s.onUp, s);
        s.btnSave.addClickListener(s.onSave, s);
        GGlobal.modelactPreView.listen(ModelActPreView.msg_tsMsg, s.update, s);
        GGlobal.modelactPreView.listen(ModelActPreView.msg_tsmsg_red, s.upRed, s);
        GGlobal.modelactPreView.listen(ModelActPreView.msg_tsmsg_cge, s.upCge, s);
        s.btnSave.enabled = true;
        // s.update();
        s.upRed();
    };
    ChildTuiSongMsg.prototype.setNewVers = function () {
        var s = this;
        if (s.newVers.url && s.newVers.url.length > 0) {
            s.c1.selectedIndex = 0;
            if (!this._bg) {
                var imageLoader = new egret.ImageLoader();
                imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
                imageLoader.load(s.newVers.icon);
                this._bg = new egret.Bitmap();
                this._bg.pixelHitTest = false;
                this.displayListContainer.addChild(this._bg);
                this._bg.width = this._bg.height = 80;
                this._bg.x = this.img.x;
                this._bg.y = this.img.y;
            }
        }
    };
    ChildTuiSongMsg.prototype.update = function () {
        var s = this;
        s.initData1();
        s.upList();
    };
    // private initData() {
    // 	let s = this
    // 	let arr = GGlobal.modelactPreView.tsMsgArr
    // 	let objKey = {}
    // 	s._datas = [];
    // 	for (let i = 0; i < arr.length; i++) {
    // 		let cfg = Config.appts_313[arr[i].tag]
    // 		let tag = Math.floor(cfg.id / 1000)
    // 		let v = VoTuiSongMsg.create(tag, arr[i].status, cfg)
    // 		if (objKey[tag]) {
    // 			objKey[tag].arr.push(v)
    // 		} else {
    // 			s._datas.push(v);
    // 			objKey[tag] = v
    // 			v.arr.push(v);
    // 		}
    // 	}
    // 	s._datas.sort(function (a: VoTuiSongMsg, b: VoTuiSongMsg) { return a.tag - b.tag });
    // }
    ChildTuiSongMsg.prototype.initData1 = function () {
        var s = this;
        var arr = GGlobal.modelactPreView.tsMsgArr;
        var objKey = {};
        s._datas = [];
        for (var keys in Config.appts_313) {
            var cfg = Config.appts_313[keys];
            var tag = Math.floor(cfg.id / 1000);
            var v = VoTuiSongMsg.create(tag, cfg.kg, cfg);
            for (var j = 0; j < arr.length; j++) {
                if (arr[j].tag == cfg.id) {
                    v.status = arr[j].status;
                    break;
                }
            }
            if (objKey[tag]) {
                objKey[tag].arr.push(v);
            }
            else {
                s._datas.push(v);
                objKey[tag] = v;
                v.arr.push(v);
            }
        }
        s._datas.sort(function (a, b) { return a.tag - b.tag; });
    };
    ChildTuiSongMsg.prototype.upList = function () {
        this.list.numItems = this._datas.length;
    };
    ChildTuiSongMsg.prototype.onHide = function () {
        var s = this;
        this.list.numItems = 0;
        s.btnDef.removeClickListener(s.onDefault, s);
        s.btnRew.removeClickListener(s.onReward, s);
        s.btnUp.removeClickListener(s.onUp, s);
        GGlobal.modelactPreView.remove(ModelActPreView.msg_tsMsg, s.update, s);
        GGlobal.modelactPreView.remove(ModelActPreView.msg_tsmsg_red, s.upRed, s);
        GGlobal.modelactPreView.remove(ModelActPreView.msg_tsmsg_cge, s.upCge, s);
    };
    ChildTuiSongMsg.prototype.upCge = function () {
        var s = this;
        s.btnSave.enabled = true;
    };
    ChildTuiSongMsg.prototype.renderHander = function (index, render) {
        render.vo = this._datas[index];
    };
    ChildTuiSongMsg.prototype.onDefault = function () {
        var s = this;
        if (!s._datas)
            return;
        for (var i = 0; i < s._datas.length; i++) {
            var v = s._datas[i];
            if (v.arr.length > 1) {
                for (var j = 0; j < v.arr.length; j++) {
                    var v0 = v.arr[j];
                    v0.status = v0.cfg.kg;
                }
            }
            else {
                v.status = v.cfg.kg;
            }
        }
        this.upList();
    };
    ChildTuiSongMsg.prototype.onReward = function () {
        GGlobal.layerMgr.open(UIConst.TUISONG_SET_BOX, this.newVers);
    };
    ChildTuiSongMsg.prototype.onUp = function () {
        var s = this;
        if (s.newVers && s.newVers.url) {
            // window.open(s.newVers.url);
            // window.location.href = s.newVers.url;
            // if (HLSDK.whalePbSDK) {
            // 	HLSDK.whalePbSDK.downloadpackage(s.newVers.url)
            // }
            Model_Setting.onCopy(s.newVers.url, "已复制更新链接,打开浏览器粘贴即可更新");
        }
    };
    ChildTuiSongMsg.prototype.upRed = function () {
        this.btnRew.checkNotice = GGlobal.modelactPreView.getTSMsgNotice();
    };
    ChildTuiSongMsg.createObj = function (cfg, status, kfTime, kfDay) {
        var obj = { tag: cfg.id, status: status };
        if (status) {
            if (cfg.yz == 0) {
                obj.range = [this.getYMD(kfTime), this.getYMD(kfTime + 20 * 31536000 + kfDay * 86400)];
            }
            else {
                var yz = cfg.yz - 1;
                if (cfg.day != "0") {
                    var dayArr = JSON.parse(cfg.day);
                    obj.days = [];
                    for (var i = 0; i < dayArr.length; i++) {
                        var d = Number(dayArr[i]) - 1;
                        obj.days.push(this.getYMD(kfTime + d * 86400));
                    }
                }
                else if (cfg.week != "0") {
                    obj.range = [this.getYMD(kfTime + yz * 86400), this.getYMD(kfTime + yz * 86400 + 20 * 31536000 + kfDay * 86400)];
                }
            }
        }
        return obj;
    };
    ChildTuiSongMsg.getYMD = function (time, c) {
        if (c === void 0) { c = "-"; }
        var date = new Date(time * 1000);
        var day = date.getDate();
        var mon = date.getMonth() + 1;
        var year = date.getFullYear();
        var str = year + ""; //年
        str += c + (mon < 10 ? "0" + mon : "" + mon); //月
        str += c + (day < 10 ? "0" + day : "" + day); //日
        return str;
    };
    ChildTuiSongMsg.prototype.onSave = function () {
        if (!ChildTuiSongMsg.isOpenPf()) {
            return;
        }
        var s = this;
        if (s._datas.length == 0)
            return;
        var arr = [];
        var kfTime = Model_GlobalMsg.kaiFuTime;
        var kfDay = Model_GlobalMsg.kaifuDay;
        for (var i = 0; i < s._datas.length; i++) {
            var v = s._datas[i];
            if (v.arr.length > 1) {
                for (var j = 0; j < v.arr.length; j++) {
                    var obj = ChildTuiSongMsg.createObj(v.arr[j].cfg, v.arr[j].status, kfTime, kfDay);
                    arr.push(obj);
                }
            }
            else {
                var obj = ChildTuiSongMsg.createObj(v.cfg, v.status, kfTime, kfDay);
                arr.push(obj);
            }
        }
        if (HLSDK.whalePbSDK) {
            var info = ChildTuiSongMsg.getUseInfo();
            HLSDK.whalePbSDK.settaginfo(info, arr, function (res) {
                if (res) {
                }
                else {
                    console.log("更新消息推送fail");
                }
            });
        }
        GGlobal.modelactPreView.CG7503(arr);
        ViewCommonWarn.text("保存设置成功");
        s.btnSave.enabled = false;
    };
    ChildTuiSongMsg.isOpenPf = function () {
        //开放微端1  3   4
        var pf = PlatformManager.getPfIndex();
        if (pf == 1 || pf == 3 || pf == 4) {
            return true;
        }
        return false;
    };
    //初始化
    ChildTuiSongMsg.initTSMsg = function (kaiFuDay, nowTime) {
        if (!ChildTuiSongMsg.isOpenPf()) {
            return;
        }
        var kfTime = nowTime - (kaiFuDay - 1) * 86400;
        var objKey = {};
        var arr = [];
        for (var keys in Config.appts_313) {
            var cfg = Config.appts_313[keys];
            var obj = ChildTuiSongMsg.createObj(cfg, cfg.kg, kfTime, kaiFuDay);
            arr.push(obj);
        }
        if (HLSDK.whalePbSDK) {
            var info = ChildTuiSongMsg.getUseInfo();
            HLSDK.whalePbSDK.settaginfo(info, arr, function (res) {
                if (res) {
                }
                else {
                    console.log("更新消息推送fail");
                }
            });
        }
        GGlobal.modelactPreView.CG7503(arr);
    };
    ChildTuiSongMsg.getUseInfo = function () {
        var loginArg = GGlobal.loginArg;
        var info = {
            role_id: Model_player.voMine.id,
            role_name: Model_player.voMine.name,
            serverName: loginArg.zoneid,
            serverId: loginArg.zoneid + '' //区服名称
        };
        return info;
    };
    ChildTuiSongMsg.URL = "ui://b3p8szvvq2i92n";
    return ChildTuiSongMsg;
}(fairygui.GComponent));
__reflect(ChildTuiSongMsg.prototype, "ChildTuiSongMsg");
