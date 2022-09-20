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
var ChildPersonalBoss = (function (_super) {
    __extends(ChildPersonalBoss, _super);
    function ChildPersonalBoss() {
        var _this = _super.call(this) || this;
        _this.bossData = [];
        _this.time = 0;
        return _this;
    }
    ChildPersonalBoss.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "ChildPersonalBoss"));
    };
    ChildPersonalBoss.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildPersonalBoss.prototype.openPanel = function (pData) {
        this.open();
    };
    ChildPersonalBoss.prototype.closePanel = function (pData) {
        this.close();
    };
    ChildPersonalBoss.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.lst.callbackThisObj = this;
        this.lst.itemRenderer = this.itemRender;
        this.lst.setVirtual();
    };
    ChildPersonalBoss.prototype.sweep = function () {
        var ret = false;
        var m = GGlobal.modelBoss;
        this.bossData = m.personalData;
        this.len = m.personalData.length;
        for (var i = 0; i < this.len; i++) {
            if (this.bossData[i].getClearSt()) {
                ret = true;
                break;
            }
        }
        if (ret)
            GGlobal.modelBoss.CG_SWEEP_1257();
        else
            ViewCommonWarn.text("没有可扫荡的副本");
    };
    ChildPersonalBoss.prototype.itemRender = function (index, obj) {
        var item = obj;
        item.setData(this.bossData[index]);
    };
    ChildPersonalBoss.prototype.updateTime = function () {
        for (var i = 0; i < this.len; i++) {
            if (i < this.lst.numChildren) {
                this.lst.getChildAt(i).updateTime();
            }
        }
    };
    ChildPersonalBoss.prototype.update = function () {
        var m = GGlobal.modelBoss;
        this.bossData = m.personalData;
        this.len = m.personalData.length;
        this.lst.numItems = this.len;
        if (this.guideHandler) {
            this.guideHandler.run();
            this.guideHandler = null;
        }
    };
    ChildPersonalBoss.prototype.open = function () {
        if (!(Model_player.taskId <= Config.xtcs_004[2801].num || Model_player.taskId >= Config.xtcs_004[2806].num)) {
            this.lst.setVirtual();
        }
        GGlobal.modelBoss.CG_DATA_1251();
        this.updateTime();
        Timer.instance.listen(this.updateTime, this, 500, 0, false);
        this.btnSweep.addClickListener(this.sweep, this);
        GGlobal.control.listen(Enum_MsgType.MSG_PBOSS_UI_UPDATE, this.update, this);
    };
    ChildPersonalBoss.prototype.close = function () {
        this.lst.numItems = 0;
        Timer.instance.remove(this.updateTime, this);
        this.btnSweep.removeClickListener(this.sweep, this);
        GGlobal.control.remove(Enum_MsgType.MSG_PBOSS_UI_UPDATE, this.update, this);
    };
    ChildPersonalBoss.prototype.setGuide = function (hd) {
        this.guideHandler = hd;
        if (this.lst.numItems > 0) {
            if (this.guideHandler) {
                this.guideHandler.run();
                this.guideHandler = null;
            }
        }
    };
    ChildPersonalBoss.prototype.guide_DRBOSS_battle = function (step) {
        var self = this;
        if (self.lst._children.length > 0) {
            var item = self.lst._children[0];
            GuideStepManager.instance.showGuide(item.btnFight, item.btnFight.width / 2, item.btnFight.height / 2);
            GuideStepManager.instance.showGuide1(step.source.index, item.btnFight, 0, item.btnFight.height / 2, 180, -250, -35);
            if (item.btnFight.parent)
                item.btnFight.parent.setChildIndex(item.btnFight, item.btnFight.parent.numChildren - 1);
        }
    };
    //>>>>end
    ChildPersonalBoss.URL = "ui://47jfyc6etujy0";
    return ChildPersonalBoss;
}(fairygui.GComponent));
__reflect(ChildPersonalBoss.prototype, "ChildPersonalBoss");
