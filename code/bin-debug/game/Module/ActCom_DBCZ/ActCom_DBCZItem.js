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
var ActCom_DBCZItem = (function (_super) {
    __extends(ActCom_DBCZItem, _super);
    function ActCom_DBCZItem() {
        return _super.call(this) || this;
    }
    ActCom_DBCZItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
    };
    ActCom_DBCZItem.prototype.setVo = function (v, hid) {
        var self = this;
        self._vo = v;
        self._hid = hid;
        var colorStr;
        self.labCount.text = "";
        self._listData = null;
        var cfgCls = Model_HuoD814.getCfg814(hid);
        var cfg = cfgCls[v.id];
        if (self._hid == UIConst.HUODONG_DAILY_GIFT814) {
            var type = v.id % 1000;
            if (type == 1) {
                self.lab.text = "今日可领取";
            }
            else if (type == 2) {
                self.lab.text = "VIP" + ConfigHelp.getSystemNum(2003) + "可额外领取";
            }
            else if (type == 3) {
                self.lab.text = "充值任意金额可额外领取";
            }
            else if (type == 4) {
                self.lab.text = "至尊卡可额外领取";
            }
            self._status = v.status;
            self._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward));
        }
        else if (self._hid == UIConst.HUODONG_DAILY_ONE814) {
            self._status = v ? v.getStaCt(cfg.cs) : 0;
            self.labCount.text = "可充值领奖次数:" + (cfg.cs - v.canCt);
            self._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.jl));
            if (self._status == 0) {
                colorStr = Color.REDSTR;
                self.lab.text = "单笔充值" + cfg.je + "元，可领取<font color='" + colorStr + "'>（0/" + cfg.je + "）</font>";
            }
            else {
                colorStr = Color.GREENSTR;
                self.lab.text = "单笔充值" + cfg.je + "元，可领取<font color='" + colorStr + "'>（" + cfg.je + "/" + cfg.je + "）</font>";
            }
        }
        else if (self._hid == UIConst.HUODONG_ADD_RECHARGE814) {
            colorStr = Model_HuoD814.addRecharge >= cfg.coin ? Color.GREENSTR : Color.REDSTR;
            self.lab.text = "累计充值达到" + cfg.coin + "元，可领取：<font color='" + colorStr + "'>（" + Model_HuoD814.addRecharge + "/" + cfg.coin + "）</font>";
            self._status = v ? v.status : 0;
            self._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward));
        }
        else if (self._hid == UIConst.HUODONG_DAILY_ADDUP814) {
            colorStr = Model_HuoD814.dailyAddUp >= cfg.coin ? Color.GREENSTR : Color.REDSTR;
            self.lab.text = "累计充值达到" + cfg.coin + "元，可领取：<font color='" + colorStr + "'>（" + Model_HuoD814.dailyAddUp + "/" + cfg.coin + "）</font>";
            self._status = v ? v.status : 0;
            self._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward));
        }
        if (self._status == 0) {
            self.btnGet.touchable = self.btnGet.visible = false;
            self.btnRec.touchable = self.btnRec.visible = true;
            self.imgGet.visible = false;
        }
        else if (self._status == 1) {
            self.btnGet.checkNotice = self.btnGet.touchable = self.btnGet.visible = true;
            self.btnRec.touchable = self.btnRec.visible = false;
            self.imgGet.visible = false;
        }
        else if (self._status == 2) {
            self.btnGet.touchable = self.btnGet.visible = false;
            self.btnRec.touchable = self.btnRec.visible = false;
            self.imgGet.visible = true;
        }
        else {
            self.btnGet.touchable = self.btnGet.visible = false;
            self.btnRec.touchable = self.btnRec.visible = false;
            self.imgGet.visible = false;
        }
        //奖励显示
        self.list.numItems = self._listData ? self._listData.length : 0;
        self.btnGet.addClickListener(self.onClickGet, self);
        self.btnRec.addClickListener(self.onClickRec, self);
    };
    ActCom_DBCZItem.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.tipEnabled = true;
        item.isShowEff = true;
        item.vo = this._listData[index];
    };
    ActCom_DBCZItem.prototype.onClickGet = function () {
        var self = this;
        if (self._status == 0) {
            ViewCommonWarn.text("领取条件不足");
            return;
        }
        if (self._hid == UIConst.HUODONG_DAILY_GIFT814) {
            GGlobal.modelHuoD814.CG_DAILYGIFT_GET(self._vo.id % 1000);
        }
        else if (self._hid == UIConst.HUODONG_DAILY_ONE814) {
            GGlobal.modelHuoD814.CG_DAILYONE_GET(self._vo.id);
        }
        else if (self._hid == UIConst.HUODONG_ADD_RECHARGE814) {
            GGlobal.modelHuoD814.CG_ADDRECHARGE_GET(self._vo.id);
        }
        else if (self._hid == UIConst.HUODONG_DAILY_ADDUP814) {
            GGlobal.modelHuoD814.CG_DAILYADDUP_GET(self._vo.id);
        }
    };
    ActCom_DBCZItem.prototype.onClickRec = function () {
        ViewChongZhi.tryToOpenCZ();
    };
    ActCom_DBCZItem.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var self = this;
        self.list.numItems = 0;
        self.btnGet.removeClickListener(self.onClickGet, self);
        self.btnRec.removeClickListener(self.onClickRec, self);
    };
    ActCom_DBCZItem.URL = "ui://ncy51skvglz71";
    return ActCom_DBCZItem;
}(fairygui.GComponent));
__reflect(ActCom_DBCZItem.prototype, "ActCom_DBCZItem");
