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
var ChildDailyTask = (function (_super) {
    __extends(ChildDailyTask, _super);
    function ChildDailyTask() {
        return _super.call(this) || this;
    }
    ChildDailyTask.createInstance = function () {
        return (fairygui.UIPackage.createObject("dailytask", "ChildDailyTask"));
    };
    ChildDailyTask.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.lst = (s.getChild("lst"));
        s.box0 = (s.getChild("box0"));
        s.box1 = (s.getChild("box1"));
        s.box2 = (s.getChild("box2"));
        s.box3 = (s.getChild("box3"));
        s.progress = (s.getChild("progress"));
        s.lb0 = (s.getChild("lb0"));
        s.lb1 = (s.getChild("lb1"));
        s.lb2 = (s.getChild("lb2"));
        s.lb3 = (s.getChild("lb3"));
        s.boxs = [];
        s.progress.max = 250;
        s.lst.callbackThisObj = s;
        s.lst.itemRenderer = s.listRender;
        var lib = Config.baoxiang_708;
        for (var i = 0; i < 4; i++) {
            s.boxs.push(s["box" + i]);
            var hy = lib[i + 1].condition;
            s["lb" + i].text = "活跃度" + hy;
            s.boxs[i].idx = i + 1;
            s.progress.max = hy;
        }
    };
    ChildDailyTask.prototype.listRender = function (index, obj) {
        var m = GGlobal.modeltask;
        var d = m.data;
        var bx = obj;
        bx.setVO(d[index]);
    };
    ChildDailyTask.prototype.onUpdate = function (arg) {
        if (arg == 0) {
        }
        else if (arg == 1) {
        }
        else if (arg == 2) {
        }
        this.update();
    };
    ChildDailyTask.prototype.update = function () {
        var m = GGlobal.modeltask;
        this.lst.numItems = m.data.length;
        var d = m.boxData;
        this.progress.value = m.huoyuedu;
        for (var i = 1; i < 5; i++) {
            var b = this.boxs[i - 1];
            b.update(d[i]);
        }
    };
    ChildDailyTask.prototype.open = function () {
        var m = GGlobal.modeltask;
        m.CG_INFO_1051();
        var c = GGlobal.control;
        c.listen(Enum_MsgType.MSG_TASK_UP, this.onUpdate, this);
    };
    ChildDailyTask.prototype.hide = function () {
        var c = GGlobal.control;
        c.remove(Enum_MsgType.MSG_TASK_UP, this.onUpdate, this);
        this.lst.numItems = 0;
    };
    ChildDailyTask.URL = "ui://b3p8szvvtw1l5";
    return ChildDailyTask;
}(fairygui.GComponent));
__reflect(ChildDailyTask.prototype, "ChildDailyTask");
