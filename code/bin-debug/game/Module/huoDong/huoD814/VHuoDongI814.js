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
var VHuoDongI814 = (function (_super) {
    __extends(VHuoDongI814, _super);
    function VHuoDongI814() {
        return _super.call(this) || this;
    }
    VHuoDongI814.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lab = (this.getChild("lab"));
        this.list = (this.getChild("list"));
        this.btnGet = (this.getChild("btnGet"));
        this.imgGet = (this.getChild("imgGet"));
        this.btnRec = (this.getChild("btnRec"));
        this.labCount = (this.getChild("labCount"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.btnGet.addClickListener(this.onClickGet, this);
        this.btnRec.addClickListener(this.onClickRec, this);
    };
    VHuoDongI814.prototype.setVo = function (v, hid) {
        this._vo = v;
        this._hid = hid;
        var colorStr;
        this.labCount.text = "";
        this._listData = null;
        var cfgCls = Model_HuoD814.getCfg814(hid);
        var cfg = cfgCls[v.id];
        if (this._hid == UIConst.HUODONG_DAILY_GIFT814) {
            var type = v.id % 1000;
            if (type == 1) {
                this.lab.text = "今日可领取";
            }
            else if (type == 2) {
                this.lab.text = "VIP" + ConfigHelp.getSystemNum(2003) + "可额外领取";
            }
            else if (type == 3) {
                this.lab.text = "充值任意金额可额外领取";
            }
            else if (type == 4) {
                this.lab.text = "至尊卡可额外领取";
            }
            this._status = v.status;
            this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward));
        }
        else if (this._hid == UIConst.HUODONG_DAILY_ONE814) {
            this._status = v ? v.getStaCt(cfg.cs) : 0;
            this.labCount.text = "可充值领奖次数:" + (cfg.cs - v.canCt);
            this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.jl));
            if (this._status == 0) {
                colorStr = Color.REDSTR;
                this.lab.text = "单笔充值" + cfg.je + "元，可领取<font color='" + colorStr + "'>（0/" + cfg.je + "）</font>";
            }
            else {
                colorStr = Color.GREENSTR;
                this.lab.text = "单笔充值" + cfg.je + "元，可领取<font color='" + colorStr + "'>（" + cfg.je + "/" + cfg.je + "）</font>";
            }
        }
        else if (this._hid == UIConst.HUODONG_ADD_RECHARGE814) {
            colorStr = Model_HuoD814.addRecharge >= cfg.coin ? Color.GREENSTR : Color.REDSTR;
            this.lab.text = "累计充值达到" + cfg.coin + "元，可领取：<font color='" + colorStr + "'>（" + Model_HuoD814.addRecharge + "/" + cfg.coin + "）</font>";
            this._status = v ? v.status : 0;
            this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward));
        }
        else if (this._hid == UIConst.HUODONG_DAILY_ADDUP814) {
            colorStr = Model_HuoD814.dailyAddUp >= cfg.coin ? Color.GREENSTR : Color.REDSTR;
            this.lab.text = "累计充值达到" + cfg.coin + "元，可领取：<font color='" + colorStr + "'>（" + Model_HuoD814.dailyAddUp + "/" + cfg.coin + "）</font>";
            this._status = v ? v.status : 0;
            this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward));
        }
        if (this._status == 0) {
            this.btnGet.touchable = this.btnGet.visible = false;
            this.btnRec.touchable = this.btnRec.visible = true;
            this.imgGet.visible = false;
        }
        else if (this._status == 1) {
            this.btnGet.checkNotice = this.btnGet.touchable = this.btnGet.visible = true;
            this.btnRec.touchable = this.btnRec.visible = false;
            this.imgGet.visible = false;
        }
        else if (this._status == 2) {
            this.btnGet.touchable = this.btnGet.visible = false;
            this.btnRec.touchable = this.btnRec.visible = false;
            this.imgGet.visible = true;
        }
        else {
            this.btnGet.touchable = this.btnGet.visible = false;
            this.btnRec.touchable = this.btnRec.visible = false;
            this.imgGet.visible = false;
        }
        //奖励显示
        this.list.numItems = this._listData ? this._listData.length : 0;
    };
    VHuoDongI814.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.tipEnabled = true;
        item.isShowEff = true;
        item.vo = this._listData[index];
    };
    VHuoDongI814.prototype.onClickGet = function () {
        if (this._status == 0) {
            ViewCommonWarn.text("领取条件不足");
            return;
        }
        if (this._hid == UIConst.HUODONG_DAILY_GIFT814) {
            GGlobal.modelHuoD814.CG_DAILYGIFT_GET(this._vo.id % 1000);
        }
        else if (this._hid == UIConst.HUODONG_DAILY_ONE814) {
            GGlobal.modelHuoD814.CG_DAILYONE_GET(this._vo.id);
        }
        else if (this._hid == UIConst.HUODONG_ADD_RECHARGE814) {
            GGlobal.modelHuoD814.CG_ADDRECHARGE_GET(this._vo.id);
        }
        else if (this._hid == UIConst.HUODONG_DAILY_ADDUP814) {
            GGlobal.modelHuoD814.CG_DAILYADDUP_GET(this._vo.id);
        }
    };
    VHuoDongI814.prototype.onClickRec = function () {
        ViewChongZhi.tryToOpenCZ();
    };
    VHuoDongI814.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    VHuoDongI814.URL = "ui://vrw7je9rt2amd";
    return VHuoDongI814;
}(fairygui.GComponent));
__reflect(VHuoDongI814.prototype, "VHuoDongI814");
