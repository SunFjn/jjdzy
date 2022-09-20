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
var ChildHomeTask = (function (_super) {
    __extends(ChildHomeTask, _super);
    function ChildHomeTask() {
        return _super.call(this) || this;
    }
    ChildHomeTask.createInstance = function () {
        return (fairygui.UIPackage.createObject("homeTask", "ChildHomeTask"));
    };
    ChildHomeTask.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.lst.callbackThisObj = s;
        s.lst.itemRenderer = s.renderHandle;
        s.lst.setVirtual();
        s.boxs = [];
        var lib = Config.fdrcbx_019;
        for (var i = 0; i < 4; i++) {
            s.boxs.push(s["box" + i]);
            var hy = lib[i + 1].cs;
            s["lb" + i].text = "完成任务" + hy + "个";
            s.boxs[i].idx = i + 1;
            s.progress.max = hy;
        }
    };
    ChildHomeTask.prototype.show = function () {
        var s = this;
        var m = GGlobal.model_HomeTask;
        m.CG_OPEN_DAYTASK_11407();
        s.registerEvent(true);
    };
    ChildHomeTask.prototype.hide = function () {
        var s = this;
        s.lst.numItems = 0;
        s.registerEvent(false);
    };
    /**
     * 注册事件的统一入口，最好能集中在这里写
     * @param pFlag
     */
    ChildHomeTask.prototype.registerEvent = function (pFlag) {
        var self = this;
        GGlobal.model_HomeTask.register(pFlag, Model_HomeTask.OPEN_TASK, self.upView, self);
    };
    ChildHomeTask.prototype.upView = function () {
        var s = this;
        var m = GGlobal.model_HomeTask;
        s._lstDat = m.data;
        s.lst.numItems = s._lstDat.length;
        var huoyuedu = 0;
        for (var i_1 = 0; i_1 < s._lstDat.length; i_1++) {
            if (s._lstDat[i_1].state > 0) {
                huoyuedu++;
            }
        }
        var d = m.boxData;
        this.progress.value = huoyuedu;
        for (var i = 1; i < 5; i++) {
            var b = this.boxs[i - 1];
            b.update(d[i]);
        }
    };
    ChildHomeTask.prototype.renderHandle = function (index, obj) {
        var a = this;
        obj.vo = a._lstDat[index];
    };
    ChildHomeTask.URL = "ui://oy62ymetd8t62";
    return ChildHomeTask;
}(fairygui.GComponent));
__reflect(ChildHomeTask.prototype, "ChildHomeTask");
