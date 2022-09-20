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
var VActHolyBeastItem = (function (_super) {
    __extends(VActHolyBeastItem, _super);
    function VActHolyBeastItem() {
        return _super.call(this) || this;
    }
    VActHolyBeastItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("actHolyBeast", "VActHolyBeastItem"));
    };
    VActHolyBeastItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lab = (this.getChild("lab"));
        this.list = (this.getChild("list"));
        this.btnGet = (this.getChild("btnGet"));
        this.btnRec = (this.getChild("btnRec"));
        this.imgGet = (this.getChild("imgGet"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.btnGet.addClickListener(this.onClickGet, this);
        this.btnRec.addClickListener(this.onClickRec, this);
    };
    VActHolyBeastItem.prototype.setVo = function (v, hid) {
        this._vo = v;
        this._hid = hid;
        var colorStr;
        var model = GGlobal.modelActHolyB;
        this.btnRec.text = "前往";
        if (this._hid == UIConst.ACTHB_XILIAN) {
            this._cfg = Config.ssshxl_268[v.id];
            colorStr = model.xlCt >= this._cfg.time ? Color.GREENSTR : Color.REDSTR;
            this.lab.text = "洗练兽魂<font color='" + colorStr + "'>（" + model.xlCt + "/" + this._cfg.time + "）</font>";
            this._status = v ? v.status : 0;
        }
        else if (this._hid == UIConst.ACTHB_MUBIAO) {
            this._cfg = Config.ssshmb_268[v.id];
            colorStr = v.canCt >= this._cfg.c1 ? Color.GREENSTR : Color.REDSTR;
            this._status = v ? v.status : 0;
            if (v.hasCt == 1) {
                this.lab.text = "拥有" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + this._cfg.c1 + ")", colorStr) + "个" + this._cfg.c2 + "星印记";
            }
            else if (v.hasCt == 2) {
                this.lab.text = "觉醒" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + this._cfg.c1 + ")", colorStr) + "个兽灵";
            }
            else if (v.hasCt == 3) {
                this.lab.text = "拥有" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + this._cfg.c1 + ")", colorStr) + "个" + (this._cfg.c2 / 10) + "阶星宿";
            }
            else if (v.hasCt == 4) {
                this.lab.text = "圣兽战力达到" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + this._cfg.c1 + ")", colorStr);
            }
        }
        else if (this._hid == UIConst.ACTHB_HUOYUE) {
            this._cfg = Config.ssshhy_268[v.id];
            colorStr = v.canCt >= this._cfg.c ? Color.GREENSTR : Color.REDSTR;
            this._status = v ? v.status : 0;
            if (v.hasCt == 1) {
                this.lab.text = "挑战" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + this._cfg.c + ")", colorStr) + "次全民BOSS";
            }
            else if (v.hasCt == 2) {
                this.lab.text = "挑战" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + this._cfg.c + ")", colorStr) + "次单刀赴会";
            }
            else if (v.hasCt == 3) {
                this.lab.text = "挑战" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + this._cfg.c + ")", colorStr) + "次三国战神";
            }
            else if (v.hasCt == 4) {
                this.lab.text = "挑战" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + this._cfg.c + ")", colorStr) + "次南征北战";
            }
            else if (v.hasCt == 5) {
                this.lab.text = "BOSS战场获取" + HtmlUtil.fontNoSize("(" + v.canCt + "/" + this._cfg.c + ")", colorStr) + "战场积分";
            }
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
        if (this._hid == UIConst.ACTHB_XILIAN) {
            this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(Config.ssshxl_268[v.id].reward));
        }
        else if (this._hid == UIConst.ACTHB_MUBIAO) {
            this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(Config.ssshmb_268[v.id].reward));
        }
        else if (this._hid == UIConst.ACTHB_HUOYUE) {
            this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(Config.ssshhy_268[v.id].reward));
        }
        this.list.numItems = this._listData ? this._listData.length : 0;
    };
    VActHolyBeastItem.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.tipEnabled = true;
        item.isShowEff = true;
        item.vo = this._listData[index];
    };
    VActHolyBeastItem.prototype.onClickGet = function () {
        if (this._status == 0) {
            ViewCommonWarn.text("领取条件不足");
            return;
        }
        if (this._hid == UIConst.ACTHB_XILIAN) {
            GGlobal.modelActHolyB.CG_XILIAN_GET(this._vo.id);
        }
        else if (this._hid == UIConst.ACTHB_MUBIAO) {
            GGlobal.modelActHolyB.CG_MUBIAO_GET(this._vo.hasCt, this._vo.id);
        }
        else if (this._hid == UIConst.ACTHB_HUOYUE) {
            GGlobal.modelActHolyB.CG_HUOYUE_GET(this._vo.hasCt, this._vo.id);
        }
    };
    VActHolyBeastItem.prototype.onClickRec = function (e) {
        if (this._hid == UIConst.ACTHB_XILIAN) {
            GGlobal.layerMgr.open(UIConst.SHJX);
        }
        else if (this._hid == UIConst.ACTHB_MUBIAO) {
            GGlobal.layerMgr.open(this._cfg.open);
        }
        else if (this._hid == UIConst.ACTHB_HUOYUE) {
            GGlobal.layerMgr.open(this._cfg.open);
        }
        e.stopImmediatePropagation();
        e.stopPropagation();
    };
    VActHolyBeastItem.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    VActHolyBeastItem.URL = "ui://d5y9ngt6ccyk3";
    return VActHolyBeastItem;
}(fairygui.GComponent));
__reflect(VActHolyBeastItem.prototype, "VActHolyBeastItem");
