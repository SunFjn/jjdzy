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
var View_CZZP_MyNote = (function (_super) {
    __extends(View_CZZP_MyNote, _super);
    function View_CZZP_MyNote() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_CZZP_MyNote.prototype.childrenCreated = function () {
        this.view = fairygui.UIPackage.createObject("chaozhifanli", "View_CZZP_MyNote").asCom;
        this.contentPane = this.view;
        this.noteLb = (this.view.getChild("noteLb"));
        _super.prototype.childrenCreated.call(this);
    };
    View_CZZP_MyNote.prototype.onShown = function () {
        var arr = Model_ChaoZhiFL.noteArr;
        var noteStr = "";
        arr.forEach(function (element) {
            noteStr += "获得了" + HtmlUtil.fontNoSize(element.name + "x" + element.count, Color.getColorStr(element.quality)) + "\n";
        });
        this.noteLb.text = noteStr;
    };
    View_CZZP_MyNote.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.CHAOZHI_ZHUANPAN_NOTE);
    };
    View_CZZP_MyNote.URL = "ui://qzsojhcrtznx7";
    return View_CZZP_MyNote;
}(UIModalPanel));
__reflect(View_CZZP_MyNote.prototype, "View_CZZP_MyNote");
