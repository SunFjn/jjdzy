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
var VGroupBuyI814 = (function (_super) {
    __extends(VGroupBuyI814, _super);
    function VGroupBuyI814() {
        return _super.call(this) || this;
    }
    VGroupBuyI814.createInstance = function () {
        return (fairygui.UIPackage.createObject("chaozhifanli", "VGroupBuyItem"));
    };
    VGroupBuyI814.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lab = (this.getChild("lab"));
        this.list = (this.getChild("list"));
        this.btnGet = (this.getChild("btnGet"));
        this.imgGet = (this.getChild("imgGet"));
        this.btnRec = (this.getChild("btnRec"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.btnGet.addClickListener(this.onClickGet, this);
        this.btnRec.addClickListener(this.onClickRec, this);
    };
    VGroupBuyI814.prototype.setVo = function (v) {
        this._vo = v;
        var cfg = Config.sctg3_730[v.id];
        var colorStr;
        var m = GGlobal.modelGroupB814;
        if (v.status == 0) {
            colorStr = Color.REDSTR;
        }
        else {
            colorStr = Color.GREENSTR;
        }
        if (cfg.jine == 0) {
            this.lab.text = "今日首充达到" + cfg.renshu + "人<font color='" + colorStr + "'>(" + m.buyNum + "/" + cfg.renshu + ")</font>";
        }
        else if (cfg.jine == 1) {
            this.lab.text = "今日首充达到" + cfg.renshu + "人且个人充值任意金额<font color='" + colorStr + "'>(" + m.buyNum + "/" + cfg.renshu + ")</font>";
        }
        else {
            this.lab.text = "今日首充达到" + cfg.renshu + "人且个人充值金额满" + cfg.jine + "元<font color='" + colorStr + "'>(" + m.buyNum + "/" + cfg.renshu + ")</font>";
        }
        if (v.status == 0) {
            this.btnGet.touchable = this.btnGet.visible = false;
            this.btnRec.touchable = this.btnRec.visible = true;
            this.imgGet.visible = false;
        }
        else if (v.status == 1) {
            this.btnGet.touchable = this.btnGet.visible = true;
            this.btnGet.checkNotice = true;
            this.btnRec.touchable = this.btnRec.visible = false;
            this.imgGet.visible = false;
        }
        else if (v.status == 2) {
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
        this._listData = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.jiangli));
        this.list.numItems = this._listData.length;
    };
    VGroupBuyI814.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.tipEnabled = true;
        item.isShowEff = true;
        item.vo = this._listData[index];
    };
    VGroupBuyI814.prototype.onClickGet = function () {
        if (this._vo.status == 0) {
            ViewCommonWarn.text("领取条件不足");
            return;
        }
        GGlobal.modelGroupB814.CG_GET_REWARD(this._vo.id);
    };
    VGroupBuyI814.prototype.onClickRec = function () {
        // GGlobal.layerMgr.open(UIConst.CHONGZHI);
        ViewChongZhi.tryToOpenCZ();
    };
    VGroupBuyI814.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    VGroupBuyI814.URL = "ui://qzsojhcrr2r0i";
    return VGroupBuyI814;
}(fairygui.GComponent));
__reflect(VGroupBuyI814.prototype, "VGroupBuyI814");
