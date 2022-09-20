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
var VCangBaoGeRank1 = (function (_super) {
    __extends(VCangBaoGeRank1, _super);
    function VCangBaoGeRank1() {
        return _super.call(this) || this;
    }
    VCangBaoGeRank1.createInstance = function () {
        return (fairygui.UIPackage.createObject("lingLong", "VLingLongRank1"));
    };
    VCangBaoGeRank1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.labPoint = (this.getChild("labPoint"));
        this.list = (this.getChild("list"));
        this.btnRec = (this.getChild("btnRec"));
        this.imgGet = (this.getChild("imgGet"));
        this.n12 = (this.getChild("n12"));
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
        this.btnRec.addClickListener(this.onRec, this);
    };
    VCangBaoGeRank1.prototype.setVo = function (v, index) {
        this._vo = v;
        var rankCfg = null;
        if (Model_ActivityHall.cbgIsKuaF()) {
            rankCfg = Config.cbgmb2_729[v.cfgId];
        }
        else {
            rankCfg = Config.cbgmb1_729[v.cfgId];
        }
        if (v) {
            this.labPoint.text = "抽奖次数：" + rankCfg.time;
            this._dataArr1 = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(rankCfg.reward));
        }
        else {
            this.labPoint.text = "";
            this._dataArr1 = [];
        }
        this.n12.visible = false;
        if (v.status == 0) {
            this.btnRec.visible = false;
            this.imgGet.visible = false;
            this.btnRec.checkNotice = false;
            this.n12.visible = true;
        }
        else if (v.status == 1) {
            this.btnRec.visible = true;
            this.imgGet.visible = false;
            this.btnRec.checkNotice = true;
        }
        else {
            this.btnRec.visible = false;
            this.imgGet.visible = true;
        }
        this.list.numItems = this._dataArr1.length;
    };
    VCangBaoGeRank1.prototype.renderHandle = function (index, obj) {
        var v = obj;
        v.tipEnabled = true;
        v.isShowEff = true;
        v.vo = this._dataArr1[index];
    };
    VCangBaoGeRank1.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
    };
    VCangBaoGeRank1.prototype.onRec = function () {
        if (this._vo.status == 0) {
            ViewCommonWarn.text("抽奖次数不足");
            return;
        }
        if (Model_ActivityHall.cbgIsKuaF()) {
            GGlobal.modelActivityHall.CG_CBG_GET_4875(Number(this._vo.cfgId));
        }
        else {
            GGlobal.modelActivityHall.CG_CBG_GET_4855(Number(this._vo.cfgId));
        }
    };
    VCangBaoGeRank1.URL = "ui://1tr9e6d8z8fv19";
    return VCangBaoGeRank1;
}(fairygui.GComponent));
__reflect(VCangBaoGeRank1.prototype, "VCangBaoGeRank1");
