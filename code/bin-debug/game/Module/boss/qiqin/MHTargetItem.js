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
var MHTargetItem = (function (_super) {
    __extends(MHTargetItem, _super);
    function MHTargetItem() {
        var _this = _super.call(this) || this;
        _this.st = -1;
        _this.grids = [];
        return _this;
    }
    MHTargetItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "MHTargetItem"));
    };
    MHTargetItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.btn = (s.getChild("btn"));
        s.lbProgress = (s.getChild("lbProgress"));
        s.lbCondition = (s.getChild("lbCondition"));
        s.ylq = (s.getChild("ylq"));
        s.btn.addClickListener(s.onClick, s);
    };
    MHTargetItem.prototype.onClick = function () {
        if (this.st) {
            GGlobal.modelBoss.CG_MHGETTARGET_1717(this.vo.id - 1);
        }
        else {
            ViewCommonWarn.text("目标未达成");
        }
    };
    MHTargetItem.prototype.clean = function () {
        ConfigHelp.cleanGridview(this.grids);
    };
    MHTargetItem.prototype.setdata = function (vo) {
        var f = this;
        f.vo = vo;
        f.st = vo.state;
        var s = ConfigHelp.numToStr(vo.condition);
        f.lbCondition.text = "造成" + s + "伤害可以领取";
        f.lbProgress.text = ConfigHelp.numToStr(GGlobal.modelBoss.myHurt) + "/" + s;
        var r = f.st == 1;
        f.ylq.visible = f.st == 2;
        f.btn.visible = f.st != 2;
        f.btn.checkNotice = r;
        f.btn.enabled = r;
        f.lbProgress.color = GGlobal.modelBoss.myHurt >= vo.condition ? Color.GREENINT : Color.REDINT;
        f.clean();
        f.grids = ConfigHelp.addGridview(ConfigHelp.makeItemListArr(vo.awards), f, 12, 35, true, false, 5, 106);
    };
    MHTargetItem.URL = "ui://47jfyc6eg50q1a";
    return MHTargetItem;
}(fairygui.GComponent));
__reflect(MHTargetItem.prototype, "MHTargetItem");
