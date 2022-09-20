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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var BossZCItem = (function (_super) {
    __extends(BossZCItem, _super);
    function BossZCItem() {
        var _this = _super.call(this) || this;
        _this._killer = "";
        return _this;
    }
    BossZCItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "BossZCItem"));
    };
    BossZCItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.n29.callbackThisObj = self;
        self.n29.itemRenderer = self.itemRender;
        self.n29.setVirtual();
    };
    BossZCItem.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.vo = this.awards[idx];
        item.tipEnabled = true;
        item.showEff(true);
    };
    BossZCItem.prototype.enterHD = function () {
        var m = GGlobal.modelBossZc;
        m.entranceCloseTime = this._endTime;
        m.sceneState = this._state;
        m.CGenterWarScene(this._idx);
    };
    BossZCItem.prototype.clean = function () {
        this.n29.numItems = 0;
        this.enterBt.removeClickListener(this.enterHD, this);
        IconUtil.setImg(this.headIcon, null);
        IconUtil.setImg(this.n27, null);
    };
    BossZCItem.prototype.updateX = function () {
        var nextTime = '';
        var nextFresh = '';
        var self = this;
        var state = self._state;
        var now = Model_GlobalMsg.getServerTime();
        var min = new Date(now).getMinutes();
        if (now >= self._cdTime) {
            self.cdLb.text = "";
            self.groupCD.visible = false;
        }
        else {
            var t = self._cdTime - now;
            t = (t / 1000) >> 0;
            self.cdLb.text = "进入CD：" + t + "秒";
            self.cdLb.text = BroadCastManager.reTxt("进入CD：{0}秒", t);
        }
        if (state == 0) {
            if (self._endTime <= now) {
                self.timeLb.color = Color.REDINT;
                self.timeLb.text = "入口已开启";
                Model_BossZC.data_valid = 1;
            }
            else {
                var limt = self._endTime - now;
                self.groupKiller.visible = self._killer != "";
            }
        }
        else if (state == 1) {
            if (self._endTime <= now) {
                self.resLb.text = "Boss已刷新";
                Model_BossZC.data_valid = 1;
            }
            else {
                var limt = self._endTime - now;
                self.resLb.text = "进入时间：" + DateUtil.getHMSBySecond2((limt / 1000) >> 0);
            }
        }
        else if (state == 2) {
            self.timeLb.color = Color.REDINT;
            self.timeLb.text = "入口已关闭";
        }
        else if (state == 3) {
            if (min == 38) {
                Model_BossZC.data_valid = 1;
            }
        }
    };
    BossZCItem.prototype.setState = function (st) {
        var self = this;
        var now = Model_GlobalMsg.getServerTime();
        switch (st) {
            case 0://等待刷新
                self.enterBt.visible = false;
                self.groupEnter.visible = false;
                self.groupTime.visible = false;
                self.timeLb.color = Color.GREENINT;
                self.groupCD.visible = false;
                break;
            case 1://准备时间
                self.enterBt.visible = true;
                self.groupEnter.visible = true;
                self.groupTime.visible = false;
                self.groupCD.visible = now < self._cdTime;
                break;
            case 2://PK时间
                self.enterBt.visible = false;
                self.groupEnter.visible = false;
                self.groupTime.visible = true;
                self.groupCD.visible = false;
                self.timeLb.color = 0xfe0000;
                self.timeLb.text = "入口已关闭";
                break;
            case 3://抢夺BOSS
                self.enterBt.visible = false;
                self.groupEnter.visible = true;
                self.groupTime.visible = true;
                self.resLb.text = "BOSS已刷新";
                self.groupCD.visible = false;
                self.timeLb.color = 0xfe0000;
                self.timeLb.text = "入口已关闭";
                break;
            case 4://重新刷新BOSS
                self.groupTime.visible = false;
                self.enterBt.visible = true;
                self.groupEnter.visible = true;
                self.resLb.text = "BOSS已刷新";
                self.groupCD.visible = now < self._cdTime;
                break;
        }
    };
    BossZCItem.prototype.setdata = function (data, type) {
        var self = this;
        self._idx = data[0];
        var id = self._idx;
        var st = self._state = data[2];
        self._endTime = data[1];
        self._cdTime = data[3];
        self._nextDta = data[5];
        self._killer = data[6];
        var isFirstKill = data[7];
        var cfg = Config.bosszc_010[id];
        if (isFirstKill) {
            self.n17.url = "ui://jvxpx9ems62s3fu";
            self.awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.first));
            self.n29.numItems = self.awards.length;
        }
        else {
            self.n17.url = "ui://jvxpx9emppyw3ey";
            self.awards = ConfigHelp.makeItemListArr(JSON.parse(cfg.zhanshi));
            self.n29.numItems = self.awards.length;
        }
        self.cdLb.text = "";
        self.timeLb.text = "";
        self.resLb.text = "";
        self.lbKiller.text = "击杀:" + self._killer;
        var now = Model_GlobalMsg.getServerTime();
        self.groupKiller.visible = false;
        self.setState(st);
        self.crossImg.visible = type == 2;
        self.enterBt.addClickListener(self.enterHD, self);
        var bossCfg = Config.NPC_200[cfg.id];
        self.nameLb.text = cfg.mingzi;
        self.nameLb.color = Color.getColorInt(cfg.pinzhi);
        IconUtil.setImg(self.headIcon, RoleUtil.getHeadRole(bossCfg.head + ""));
        IconUtil.setImg(self.n27, Enum_Path.PIC_URL + "bosszc" + cfg.pinzhi + ".jpg");
        self.updateX();
    };
    BossZCItem.URL = "ui://47jfyc6eppyw2z";
    return BossZCItem;
}(fairygui.GComponent));
__reflect(BossZCItem.prototype, "BossZCItem");
