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
var View_DDFH_BattleNote = (function (_super) {
    __extends(View_DDFH_BattleNote, _super);
    function View_DDFH_BattleNote() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_DDFH_BattleNote.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("Arena", "View_DDFH_BattleNote").asCom;
        a.contentPane = a.view;
        a.noteLb = (a.view.getChild("noteLb"));
        _super.prototype.childrenCreated.call(this);
    };
    //B:战斗结果：0：失败，1：胜利U:玩家名字I:获得积分
    View_DDFH_BattleNote.prototype.updateShow = function () {
        var str = "";
        var arr = Model_DDFH.battleGroupArr;
        for (var i = 0; i < arr.length; i++) {
            if (i == 0) {
                if (arr[i][0] == 1) {
                    str += HtmlUtil.fontNoSize("战胜了", Color.getColorStr(2)) + HtmlUtil.fontNoSize(arr[i][1], Color.getColorStr(3)) + ",获得了" + arr[i][2] + "积分";
                }
                else {
                    str += HtmlUtil.fontNoSize("不敌", Color.getColorStr(6)) + HtmlUtil.fontNoSize(arr[i][1], Color.getColorStr(3)) + ",获得了" + arr[i][2] + "积分";
                }
            }
            else {
                if (arr[i][0] == 1) {
                    str += "\n" + HtmlUtil.fontNoSize("战胜了", Color.getColorStr(2)) + HtmlUtil.fontNoSize(arr[i][1], Color.getColorStr(3)) + ",获得了" + arr[i][2] + "积分";
                }
                else {
                    str += "\n" + HtmlUtil.fontNoSize("不敌", Color.getColorStr(6)) + HtmlUtil.fontNoSize(arr[i][1], Color.getColorStr(3)) + ",获得了" + arr[i][2] + "积分";
                }
            }
        }
        this.noteLb.text = str;
    };
    View_DDFH_BattleNote.prototype.onShown = function () {
        GGlobal.modelddfh.CG_DANDAOFH_BATTLEGROUP();
        GGlobal.control.listen(Enum_MsgType.DANDAO_FUHUI_BATTLEGROUP, this.updateShow, this);
    };
    View_DDFH_BattleNote.prototype.onHide = function () {
        GGlobal.layerMgr.close(UIConst.DANDAO_FUHUI_BATTLENOTE);
        GGlobal.control.remove(Enum_MsgType.DANDAO_FUHUI_BATTLEGROUP, this.updateShow, this);
    };
    View_DDFH_BattleNote.URL = "ui://me1skowljs6lj";
    return View_DDFH_BattleNote;
}(UIModalPanel));
__reflect(View_DDFH_BattleNote.prototype, "View_DDFH_BattleNote");
