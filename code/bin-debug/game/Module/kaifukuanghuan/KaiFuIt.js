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
var KaiFuIt = (function (_super) {
    __extends(KaiFuIt, _super);
    function KaiFuIt() {
        var _this = _super.call(this) || this;
        _this.sysID = 0;
        _this.grids = [];
        return _this;
    }
    KaiFuIt.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbCondition = (this.getChild("lbCondition"));
        this.btn = (this.getChild("btn"));
        this.btnGo = (this.getChild("btnGo"));
        this.ylq = (this.getChild("ylq"));
        this.btn.addClickListener(this.clickHD, this);
        this.btnGo.addClickListener(this.openSys, this);
        this.itemCom = new fairygui.GComponent();
        this.addChild(this.itemCom);
        this.itemCom.setScale(0.8, 0.8);
    };
    KaiFuIt.prototype.openSys = function () {
        GGlobal.layerMgr.open(this.sysID);
    };
    KaiFuIt.prototype.clickHD = function () {
        if (this.state != 1) {
            ViewCommonWarn.text("领取条件不足");
        }
        else {
            GGlobal.model_KaiFKH.CG_LQ(this.idx);
        }
    };
    KaiFuIt.prototype.clean = function () {
        ConfigHelp.cleanGridview(this.grids);
    };
    KaiFuIt.prototype.setdata = function (vo) {
        var st = vo.st;
        var s = this;
        var id = s.idx = vo.id;
        var lib = Config.party_240[id];
        ConfigHelp.cleanGridview(s.grids);
        var award = JSON.parse(lib.reward);
        s.grids = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(award), this.itemCom, 33, 65, true, false, 5, 120);
        var tar = lib.yq;
        if (vo.pro >= tar)
            s.lbCondition.text = lib.tips + "<font color='#15f234'>（" + vo.pro + "/" + tar + "）</font>";
        else
            s.lbCondition.text = lib.tips + "<font color='#ed1414'>（" + vo.pro + "/" + tar + "）</font>";
        s.ylq.visible = st == 2;
        s.btn.checkNotice = st == 1;
        s.state = st;
        var sysid = lib.sys;
        if (sysid != 0) {
            s.sysID = sysid;
            s.btn.visible = st == 1;
            s.btnGo.visible = st == 0;
            s.btn.text = st == 0 ? "前往" : "领取";
        }
        else {
            s.btn.visible = st != 2;
            s.btnGo.visible = false;
            s.btn.text = "领取";
        }
    };
    KaiFuIt.URL = "ui://yk4rwc6rd7mw1";
    return KaiFuIt;
}(fairygui.GComponent));
__reflect(KaiFuIt.prototype, "KaiFuIt");
