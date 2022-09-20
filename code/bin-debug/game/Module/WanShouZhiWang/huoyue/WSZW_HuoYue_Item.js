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
var WSZW_HuoYue_Item = (function (_super) {
    __extends(WSZW_HuoYue_Item, _super);
    function WSZW_HuoYue_Item() {
        return _super.call(this) || this;
    }
    WSZW_HuoYue_Item.createInstance = function () {
        return (fairygui.UIPackage.createObject("WSZWActMRHY", "WSZW_HuoYue_Item"));
    };
    WSZW_HuoYue_Item.prototype.constructFromXML = function (xml) {
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
    WSZW_HuoYue_Item.prototype.setVo = function (v, hid) {
        this._vo = v;
        this._hid = hid;
        var colorStr;
        var model = GGlobal.modelWanShouZhiWang;
        this.btnRec.text = "前往";
        if (this._hid == UIConst.WSZW_HUOYUE) {
            this._cfg = Config.wszwhy_284[v.id];
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
        if (this._hid == UIConst.WSZW_HUOYUE) {
            this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(Config.wszwhy_284[v.id].reward));
        }
        this.list.numItems = this._listData ? this._listData.length : 0;
    };
    WSZW_HuoYue_Item.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.tipEnabled = true;
        item.isShowEff = true;
        item.vo = this._listData[index];
    };
    WSZW_HuoYue_Item.prototype.onClickGet = function () {
        if (this._status == 0) {
            ViewCommonWarn.text("领取条件不足");
            return;
        }
        if (this._hid == UIConst.WSZW_HUOYUE) {
            GGlobal.modelWanShouZhiWang.CG_HUOYUE_GETAWARD(this._vo.hasCt, this._vo.id);
        }
    };
    WSZW_HuoYue_Item.prototype.onClickRec = function (e) {
        if (this._hid == UIConst.WSZW_HUOYUE) {
            GGlobal.layerMgr.open(this._cfg.open);
        }
        e.stopImmediatePropagation();
        e.stopPropagation();
    };
    WSZW_HuoYue_Item.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    WSZW_HuoYue_Item.URL = "ui://6aqn8xprc4543";
    return WSZW_HuoYue_Item;
}(fairygui.GComponent));
__reflect(WSZW_HuoYue_Item.prototype, "WSZW_HuoYue_Item");
