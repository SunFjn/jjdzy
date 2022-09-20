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
var View_NewWuJiang = (function (_super) {
    __extends(View_NewWuJiang, _super);
    function View_NewWuJiang() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        _this.childrenCreated();
        return _this;
    }
    View_NewWuJiang.createInstance = function () {
        return (fairygui.UIPackage.createObject("common", "View_NewWuJiang"));
    };
    View_NewWuJiang.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("common", "View_NewWuJiang").asCom;
        self.contentPane = self.view;
        self.nameLb = (self.view.getChild("nameLb"));
        self.txtInfo = (self.view.getChild("txtInfo"));
        self.btnHand = (self.view.getChild("btnHand"));
        self.wjBg = (self.view.getChild("wjBg"));
        self.btnHand.addClickListener(self.closeEventHandler, self);
        _super.prototype.childrenCreated.call(this);
    };
    View_NewWuJiang.prototype.onOpen = function (arg) {
        _super.prototype.onOpen.call(this, arg);
        var self = this;
        var vo = arg;
        IconUtil.setImg(self.wjBg, Enum_Path.BACK_URL + "wjGet.png");
        self.nameLb.text = vo.name;
        if (!this.awatar) {
            this.awatar = UIRole.create();
            this.awatar.setPos(this.wjBg.x, this.wjBg.y);
            this.awatar.setScaleXY(1.5, 1.5);
        }
        this.awatar.uiparent = this.displayListContainer;
        var skillArr = ConfigHelp.SplitStr(vo.skills);
        var skillId = Number(skillArr[0][0]);
        this.awatar.playSkillID(skillId);
        this.awatar.setBody(vo.type);
        this.awatar.setWeapon(vo.type);
        this.awatar.onAdd();
    };
    View_NewWuJiang.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.WU_JIANG_GETTIPS);
        IconUtil.setImg(this.wjBg, null);
        if (this.awatar) {
            this.awatar.onRemove();
            this.awatar = null;
        }
        egret.callLater(Model_WuJiang.showNewItem, null);
    };
    View_NewWuJiang.URL = "ui://jvxpx9emx9ki3ba";
    return View_NewWuJiang;
}(UIModalPanel));
__reflect(View_NewWuJiang.prototype, "View_NewWuJiang");
