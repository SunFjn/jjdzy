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
var ViewSYZLBTeamInfo = (function (_super) {
    __extends(ViewSYZLBTeamInfo, _super);
    function ViewSYZLBTeamInfo() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    ViewSYZLBTeamInfo.createInstance = function () {
        return (fairygui.UIPackage.createObject("syzlb", "ViewSYZLBTeamInfo"));
    };
    ViewSYZLBTeamInfo.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("syzlb", "ViewSYZLBTeamInfo").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        s.infoArr = [s.info1, s.info2];
        s.isShowOpenAnimation = false;
        s.isShowMask = false;
        _super.prototype.childrenCreated.call(this);
    };
    ViewSYZLBTeamInfo.prototype.onShown = function () {
        var s = this;
        GGlobal.model_Syzlb.listen(Model_Syzlb.teamui, s.update, s);
        s.btnCge.addClickListener(s.onCge, s);
        s.update();
    };
    ViewSYZLBTeamInfo.prototype.onHide = function () {
        var s = this;
        GGlobal.model_Syzlb.remove(Model_Syzlb.teamui, s.update, s);
        s.btnCge.removeClickListener(s.onCge, s);
    };
    ViewSYZLBTeamInfo.prototype.resetPosition = function () {
        _super.prototype.resetPosition.call(this);
        // this.setXY(fairygui.GRoot.inst.width - this.width + GGlobal.layerMgr.offx, (fairygui.GRoot.inst.height - this.height) / 2);
        this.setXY(-GGlobal.layerMgr.offx, (fairygui.GRoot.inst.height - this.height) / 2);
    };
    ViewSYZLBTeamInfo.prototype.update = function () {
        var s = this;
        var m = GGlobal.model_Syzlb;
        m.teamMyArr;
        var ct = 0;
        var isLeader = false;
        for (var i = 0; i < m.teamMyArr.length; i++) {
            var v = m.teamMyArr[i];
            if (v.pId == Model_player.voMine.id && v.type == 1) {
                isLeader = true;
                break;
            }
        }
        for (var i = 0; i < m.teamMyArr.length; i++) {
            var v = m.teamMyArr[i];
            if (v.pId == Model_player.voMine.id) {
                continue;
            }
            s.infoArr[ct].setVo(v, isLeader);
            ct++;
        }
        if (!isLeader) {
            s.visible = false;
            return;
        }
        s.visible = true;
        if (ct == 0) {
            s.imgBg.visible = false;
            s.infoArr[0].visible = false;
            s.infoArr[1].visible = false;
        }
        else {
            s.imgBg.visible = true;
            s.infoArr[0].visible = true;
            s.infoArr[1].visible = true;
            if (ct == 1) {
                s.c1.selectedIndex = 1;
            }
            else if (ct == 2) {
                s.c1.selectedIndex = 0;
            }
        }
    };
    ViewSYZLBTeamInfo.prototype.onCge = function () {
        GGlobal.model_Syzlb.CG_CHA_BOSS();
    };
    ViewSYZLBTeamInfo.URL = "ui://3o8q23uuqqnwe";
    return ViewSYZLBTeamInfo;
}(UIModalPanel));
__reflect(ViewSYZLBTeamInfo.prototype, "ViewSYZLBTeamInfo");
