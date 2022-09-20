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
var VHuoDOnlyItem = (function (_super) {
    __extends(VHuoDOnlyItem, _super);
    function VHuoDOnlyItem() {
        return _super.call(this) || this;
    }
    VHuoDOnlyItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("huoDOnly", "VHuoDOnlyItem"));
    };
    VHuoDOnlyItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.btnGet.addClickListener(this.onClickGet, this);
        this.btnRec.addClickListener(this.onClickRec, this);
    };
    VHuoDOnlyItem.prototype.setVo = function (v, act) {
        this._vo = v;
        this._act = act;
        var colorStr;
        this.labCount.text = "";
        var cfg;
        if (this._act.index == UIConst.HUOD_ONLY_DAILY_ONE) {
            cfg = Config.zshddbcz_315[v.id];
            this._status = v ? v.getStaCt(cfg.cs) : 0;
            this.labCount.text = "可充值领奖次数:" + (cfg.cs - v.canCt);
            if (this._status == 0) {
                colorStr = Color.REDSTR;
                this.lab.text = "单笔充值" + cfg.je + "元，可领取<font color='" + colorStr + "'>（0/" + cfg.je + "）</font>";
            }
            else {
                colorStr = Color.GREENSTR;
                this.lab.text = "单笔充值" + cfg.je + "元，可领取<font color='" + colorStr + "'>（" + cfg.je + "/" + cfg.je + "）</font>";
            }
        }
        else if (this._act.index == UIConst.HUOD_ONLY_ADD_RECHARGE) {
            cfg = Config.zshdljcz_315[v.id];
            var addRecharge = Model_HuoDOnly.getAddRecharge(act.id);
            colorStr = addRecharge >= cfg.coin ? Color.GREENSTR : Color.REDSTR;
            this.lab.text = "累计充值" + cfg.coin + "元，可领取<font color='" + colorStr + "'>（" + addRecharge + "/" + cfg.coin + "）</font>";
            this._status = v ? v.status : 0;
        }
        else if (this._act.index == UIConst.HUOD_ONLY_YBFL) {
            cfg = Config.zshdybfl_315[v.id];
            var needCt = cfg.xh[0][2];
            var hasCt = GGlobal.modelHuoDOnly.getYbao(act.id);
            if (hasCt >= needCt) {
                this.lab.text = "消耗" + needCt + "元宝" + "<font color='" + Color.GREENSTR + "'>(" + hasCt + "/" + needCt + ")</font>";
            }
            else {
                this.lab.text = "消耗" + needCt + "元宝" + "<font color='" + Color.REDSTR + "'>(" + hasCt + "/" + needCt + ")</font>";
            }
            this._status = v ? v.status : 0;
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
        this._listData = null;
        //奖励显示
        if (this._act.index == UIConst.HUOD_ONLY_DAILY_ONE) {
            this._listData = ConfigHelp.makeItemListArr(cfg.jl);
        }
        else if (this._act.index == UIConst.HUOD_ONLY_ADD_RECHARGE) {
            this._listData = ConfigHelp.makeItemListArr(cfg.reward);
        }
        else if (this._act.index == UIConst.HUOD_ONLY_YBFL) {
            this._listData = ConfigHelp.makeItemListArr(cfg.reward);
        }
        this.list.numItems = this._listData ? this._listData.length : 0;
        //按钮文字
        if (this._act.index == UIConst.HUOD_ONLY_YBFL) {
            this.btnRec.text = "前往";
        }
        else {
            this.btnRec.text = "前往充值";
        }
    };
    VHuoDOnlyItem.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.tipEnabled = true;
        item.isShowEff = true;
        item.vo = this._listData[index];
    };
    VHuoDOnlyItem.prototype.onClickGet = function () {
        if (this._status == 0) {
            ViewCommonWarn.text("领取条件不足");
            return;
        }
        if (this._act.index == UIConst.HUOD_ONLY_DAILY_ONE) {
            GGlobal.modelHuoDOnly.CG_DAILYONE_GET(this._act.id, this._vo.id);
        }
        else if (this._act.index == UIConst.HUOD_ONLY_ADD_RECHARGE) {
            GGlobal.modelHuoDOnly.CG_ADDRECHARGE_GET(this._act.id, this._vo.id);
        }
        else if (this._act.index == UIConst.HUOD_ONLY_YBFL) {
            GGlobal.modelHuoDOnly.CG_YBFL_LQ_8331(this._act.id, this._vo.id);
        }
    };
    VHuoDOnlyItem.prototype.onClickRec = function () {
        if (this._act.index == UIConst.HUOD_ONLY_YBFL) {
            GGlobal.layerMgr.open(UIConst.CANGBAOGE);
        }
        else {
            ViewChongZhi.tryToOpenCZ();
        }
    };
    VHuoDOnlyItem.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    VHuoDOnlyItem.URL = "ui://mk3gp0vrlbbw3";
    return VHuoDOnlyItem;
}(fairygui.GComponent));
__reflect(VHuoDOnlyItem.prototype, "VHuoDOnlyItem");
