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
var ViewMainUIRight = (function (_super) {
    __extends(ViewMainUIRight, _super);
    function ViewMainUIRight() {
        return _super.call(this) || this;
    }
    ViewMainUIRight.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.btnContainer.setXY(4, 8);
        this.LayoutType = fairygui.GroupLayoutType.Vertical;
        this.updateShareIc();
        this.regMsg();
    };
    Object.defineProperty(ViewMainUIRight, "instance", {
        get: function () {
            if (!ViewMainUIRight._instance)
                ViewMainUIRight._instance = new ViewMainUIRight();
            return ViewMainUIRight._instance;
        },
        enumerable: true,
        configurable: true
    });
    ViewMainUIRight.prototype.addMenuIcon = function (sid, isNotice) {
        switch (sid) {
            case UIConst.SHARE:
                if (GGlobal.modelGlobalMsg.share_st == 1) {
                    _super.prototype.addMenuIcon.call(this, sid, isNotice);
                }
                break;
        }
    };
    ViewMainUIRight.prototype.removeMenuIcon = function (sid) {
        switch (sid) {
            case UIConst.SHARE:
                _super.prototype.removeMenuIcon.call(this, sid);
                break;
        }
        _super.prototype.removeMenuIcon.call(this, sid);
    };
    ViewMainUIRight.prototype.regMsg = function () {
        GGlobal.modelShare.listen(ModelShare.msg_datas, this.updateShareIc, this);
        GGlobal.control.listen(Enum_MsgType.SCENE_TASK, this.updateShareIc, this);
    };
    ViewMainUIRight.prototype.removeMsg = function () {
        GGlobal.modelShare.remove(ModelShare.msg_datas, this.updateShareIc, this);
        GGlobal.control.remove(Enum_MsgType.SCENE_TASK, this.updateShareIc, this);
    };
    ViewMainUIRight.prototype.updateShareIc = function () {
        var state = GGlobal.modelShare.statesDic[1];
        if (state == 2 && (Model_player.taskId > 14)) {
            this.removeMenuIcon(UIConst.SHARE);
        }
        else {
            if (ModuleManager.isOpen(UIConst.SHARE)) {
                this.addMenuIcon(UIConst.SHARE);
            }
        }
    };
    ViewMainUIRight.prototype.resetPosition = function () {
        this.setXY(fairygui.GRoot.inst.width - 100 + GGlobal.layerMgr.offx, 250 + ViewMainTopUI1.instance.height + GGlobal.layerMgr.uiAlign + ViewMainTopUI2.instance.height * 2);
    };
    return ViewMainUIRight;
}(BaseSceneUI));
__reflect(ViewMainUIRight.prototype, "ViewMainUIRight");
