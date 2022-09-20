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
/**在副本中显示的 活动入口*/ var ChildFuBenActEntrance = (function (_super) {
    __extends(ChildFuBenActEntrance, _super);
    function ChildFuBenActEntrance() {
        var _this = _super.call(this) || this;
        _this.visState = 0;
        _this.nowState = true;
        return _this;
    }
    ChildFuBenActEntrance.createInstance = function () {
        if (!this._inst) {
            this._inst = (fairygui.UIPackage.createObject("MainUI", "ChildFuBenActEntrance"));
        }
        return this._inst;
    };
    ChildFuBenActEntrance.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChild("n0"));
        this.n1 = (this.getChild("n1"));
        this.listener();
    };
    ChildFuBenActEntrance.prototype.listener = function () {
        var s = this;
        // s.checkActivityHall();
        // GGlobal.reddot.listen(UIConst.LONGZHONGDUI, s.checkActivityHall, s);
    };
    ChildFuBenActEntrance.prototype.checkActivityHall = function () {
        // let ret = GGlobal.reddot.checkCondition(UIConst.LONGZHONGDUI);
        // if (ret) {
        // 	this.show1(UIConst.LONGZHONGDUI);
        // } else {
        // 	this.hide1(UIConst.LONGZHONGDUI);
        // }
    };
    ChildFuBenActEntrance.prototype.enterActHD = function () {
        switch (this.idx) {
            case UIConst.LONGZHONGDUI:
                GGlobal.layerMgr.open(UIConst.LONGZHONGDUI);
                break;
        }
    };
    ChildFuBenActEntrance.prototype.setViewVisble = function (v) {
        this.nowState = v;
        this.setViewVis();
    };
    ChildFuBenActEntrance.prototype.setViewVis = function () {
        this.visible = Boolean(this.nowState && this.visState);
    };
    ChildFuBenActEntrance.prototype.showEff = function (value) {
        var s = this;
        if (value) {
            if (!s.iconEff) {
                s.iconEff = EffectMgr.addEff("uieff/10021", s.displayListContainer, s.n0.x + s.n0.width / 2, s.n0.y + s.n0.height / 2, 1000, -1, true);
            }
        }
        else {
            if (s.iconEff) {
                EffectMgr.instance.removeEff(s.iconEff);
                s.iconEff = null;
            }
        }
    };
    ChildFuBenActEntrance.prototype.show1 = function (id) {
        this.idx = id;
        var icon = Config.xitong_001[id].icon;
        IconUtil.setImg(this.n0, Enum_Path.MAINUI_URL + icon + ".png");
        this.n0.addClickListener(this.enterActHD, this);
        if (!this.parent) {
            GGlobal.layerMgr.UI_MainBottom.addChild(this);
        }
        this.setXY(fairygui.GRoot.inst.width + GGlobal.layerMgr.offx - 104, ViewMainTopUI1.instance.height + GGlobal.layerMgr.uiAlign + ViewMainTopUI2.instance.height - 10);
        this.visState = 1;
        this.showEff(true);
        this.setViewVis();
    };
    ChildFuBenActEntrance.prototype.hide1 = function (id) {
        if (id != this.idx) {
            return;
        }
        this.showEff(false);
        this.removeFromParent();
        if (this.n0) {
            IconUtil.setImg(this.n0, null);
            this.n0.removeClickListener(this.enterActHD, this);
        }
        this.visState = 0;
    };
    ChildFuBenActEntrance.URL = "ui://7gxkx46wfbywb6m";
    return ChildFuBenActEntrance;
}(fairygui.GComponent));
__reflect(ChildFuBenActEntrance.prototype, "ChildFuBenActEntrance");
