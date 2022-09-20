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
var ViewDailyTask = (function (_super) {
    __extends(ViewDailyTask, _super);
    function ViewDailyTask() {
        var _this = _super.call(this) || this;
        _this.setSkin("dailytask", "dailytask_atlas0", "ViewDailyTask");
        return _this;
    }
    ViewDailyTask.createInstance = function () {
        return (fairygui.UIPackage.createObject("dailytask", "ViewDailyTask"));
    };
    ViewDailyTask.prototype.setExtends = function () {
        var func = fairygui.UIObjectFactory.setPackageItemExtension;
        func(ChildDailyTask.URL, ChildDailyTask);
        func(DailyItem.URL, DailyItem);
        func(DailyBaoXiang.URL, DailyBaoXiang);
        func(ChildActPreView.URL, ChildActPreView);
        func(ItemActPreView.URL, ItemActPreView);
        func(ChildTuiSongMsg.URL, ChildTuiSongMsg);
        func(TuSongMsgItem.URL, TuSongMsgItem);
    };
    ViewDailyTask.prototype.initView = function () {
        _super.prototype.initView.call(this);
        this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.onChange, this);
    };
    ViewDailyTask.prototype.onChange = function () {
        switch (this.c1.selectedIndex) {
            case 0:
                this.frame.icon = "ui://b3p8szvvkzof1o";
                this.n6.onHide();
                this.n0.open();
                break;
            case 1:
                this.n6.onOpen();
                this.n0.hide();
                this.frame.icon = "ui://b3p8szvvnxbw2m";
                break;
        }
    };
    // protected constructFromXML(xml: any): void {
    // 	super.constructFromXML(xml);
    // 	this.frame = <fairygui.GLabel><any>(this.getChild("frame"));
    // 	this.n0 = <ChildDailyTask><any>(this.getChild("n0"));
    // }
    ViewDailyTask.prototype.onShown = function () {
        var sf = this;
        var index = this._args;
        if (index) {
            this.c1.setSelectedIndex(index);
        }
        else {
            this.c1.setSelectedIndex(0);
        }
        GGlobal.modelactPreView.listen(ModelActPreView.msg_datas, sf.updateNot, sf);
        GGlobal.modelactPreView.listen(ModelActPreView.msg_tsmsg_red, sf.updateNot, sf);
        GGlobal.reddot.listen(UIConst.DAILYTASK, sf.checkDailyTaskNotice, sf);
        this.updateNot();
        this.onChange();
        if (ChildTuiSongMsg.isOpenPf()) {
            this.tab2.visible = true;
        }
        else {
            this.tab2.visible = false;
        }
    };
    ViewDailyTask.prototype.updateNot = function () {
        this.tab1.checkNotice = GGlobal.modelactPreView.getNotice();
        this.tab2.checkNotice = GGlobal.modelactPreView.getTSMsgNotice();
    };
    ViewDailyTask.prototype.checkDailyTaskNotice = function () {
        this.tab0.checkNotice = GGlobal.reddot.checkCondition(UIConst.DAILYTASK);
    };
    ViewDailyTask.prototype.onHide = function () {
        var sf = this;
        sf.n6.onHide();
        sf.n0.hide();
        GGlobal.layerMgr.close(UIConst.DAILYTASK);
        GGlobal.modelactPreView.remove(ModelActPreView.msg_datas, sf.updateNot, sf);
        GGlobal.modelactPreView.remove(ModelActPreView.msg_tsmsg_red, sf.updateNot, sf);
        GGlobal.reddot.remove(UIConst.DAILYTASK, sf.checkDailyTaskNotice, sf);
    };
    ViewDailyTask.URL = "ui://b3p8szvvg5te1n";
    return ViewDailyTask;
}(UIPanelBase));
__reflect(ViewDailyTask.prototype, "ViewDailyTask");
