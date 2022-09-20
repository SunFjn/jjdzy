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
var ItemYSSL = (function (_super) {
    __extends(ItemYSSL, _super);
    function ItemYSSL() {
        var _this = _super.call(this) || this;
        _this._actId = 0;
        return _this;
    }
    ItemYSSL.createInstance = function () {
        return (fairygui.UIPackage.createObject("yssl", "ItemYSSL"));
    };
    ItemYSSL.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.n2.callbackThisObj = this;
        this.n2.itemRenderer = this.itemRender;
    };
    ItemYSSL.prototype.itemRender = function (idx, obj) {
        var item = obj;
        item.isShowEff = true;
        item.tipEnabled = true;
        item.vo = this._listdata[idx];
    };
    ItemYSSL.prototype.openPnl = function () {
        GGlobal.layerMgr.open(this.sysid);
    };
    ItemYSSL.prototype.getAwardHD = function () {
        if (this._actId == UIConst.YSSL) {
            GGlobal.modelYSSL.CG_SpecialAnimalSendGift_getAward_9223(this.idx);
        }
        else if (this._actId == UIConst.YUNCHOUWEIWO_QCYL) {
            GGlobal.modelYSSL.CG_YCWW_QCYL_getAward(this.idx);
        }
    };
    ItemYSSL.prototype.clean = function () {
        var s = this;
        s.n2.numItems = 0;
        s.btnGo.removeClickListener(s.openPnl, s);
        s.btnGet.removeClickListener(s.getAwardHD, s);
    };
    ItemYSSL.prototype.setdata = function (cfg, actId) {
        var s = this;
        // let data = GGlobal.modelYSSL.task_data[cfg.id];
        s._actId = actId;
        var data;
        if (actId == UIConst.YSSL) {
            data = GGlobal.modelYSSL.task_data[cfg.id];
        }
        else if (actId == UIConst.YUNCHOUWEIWO_QCYL) {
            data = GGlobal.modelYSSL.qcyl_task_data[cfg.id];
        }
        s.idx = cfg.id;
        var st = data.st;
        var pro = data.count;
        var desc = cfg.shuoming;
        var color = (st == 1 || st == 2) ? Color.GREENSTR : Color.REDSTR;
        desc += BroadCastManager.reTxt("<font color='{0}'>({1}/{2})", color, pro, cfg.canshu);
        s.lbpro.text = desc;
        s.sysid = cfg.tiaozhuan;
        s.btnGo.visible = st == 0;
        s.btnGet.visible = st == 1;
        s.imgYlq.visible = st == 2;
        s.lbBuff.visible = st == 4;
        s._listdata = ConfigHelp.makeItemListArr(cfg.putong);
        s.n2.numItems = s._listdata.length;
        s.btnGo.addClickListener(s.openPnl, s);
        s.btnGet.addClickListener(s.getAwardHD, s);
        s.btnGet.checkNotice = true;
    };
    ItemYSSL.URL = "ui://sbm40ly4ln003";
    return ItemYSSL;
}(fairygui.GComponent));
__reflect(ItemYSSL.prototype, "ItemYSSL");
