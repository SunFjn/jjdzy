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
var ViewHomeTaskBox = (function (_super) {
    __extends(ViewHomeTaskBox, _super);
    function ViewHomeTaskBox() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewHomeTaskBox.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("homeTask", "ViewHomeTaskBox").asCom;
        this.contentPane = this.view;
        this.n6 = (this.view.getChild("n6"));
        this.n7 = (this.view.getChild("n7"));
        this.n8 = (this.view.getChild("n8"));
        this.frame = (this.view.getChild("frame"));
        _super.prototype.childrenCreated.call(this);
    };
    ViewHomeTaskBox.prototype.getAwards = function () {
        GGlobal.model_HomeTask.CG_GET_BOX_REWARD_11411(this._idx);
        this.doHideAnimation();
    };
    ViewHomeTaskBox.prototype.updateView = function () {
        this._st = GGlobal.model_HomeTask.boxData[this._idx];
        this.n6.visible = this._st == 1;
        this.n7.visible = this._st == 2;
        this.n8.visible = this._st == 0;
    };
    ViewHomeTaskBox.prototype.onShown = function () {
        var awards = this._args.awards;
        this._idx = this._args.idx;
        awards = JSON.parse(awards);
        if (this.arr)
            ConfigHelp.cleanGridview(this.arr);
        awards = ConfigHelp.makeItemListArr(awards);
        this.arr = ConfigHelp.addGridview(awards, this, 100, 100);
        ConfigHelp.centerGrid(this.arr, 70, 110, 3, 130);
        this.n6.addClickListener(this.getAwards, this);
        GGlobal.model_HomeTask.listen(Model_HomeTask.UP_TASK, this.updateView, this);
        this.updateView();
    };
    ViewHomeTaskBox.prototype.onHide = function () {
        if (this.arr)
            ConfigHelp.cleanGridview(this.arr);
        this.n6.removeClickListener(this.getAwards, this);
        GGlobal.model_HomeTask.remove(Model_HomeTask.UP_TASK, this.updateView, this);
    };
    return ViewHomeTaskBox;
}(UIModalPanel));
__reflect(ViewHomeTaskBox.prototype, "ViewHomeTaskBox");
