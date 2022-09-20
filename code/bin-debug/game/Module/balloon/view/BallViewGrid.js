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
/**
 * @author: lujiahao
 * @date: 2019-11-01 15:17:34
 */
var BallViewGrid = (function (_super) {
    __extends(BallViewGrid, _super);
    function BallViewGrid() {
        return _super.call(this) || this;
    }
    BallViewGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("balloon", "BallViewGrid"));
    };
    BallViewGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    //=========================================== API ==========================================
    BallViewGrid.prototype.setData = function (pData) {
        var t = this;
        t.grid.isShowEff = true;
        t.grid.tipEnabled = true;
        t.grid.vo = pData;
        var t_hasGet = false;
        for (var i = 0; i < EnumBalloon.BALL_COUNT; i++) {
            var t_vo = GGlobal.modelBalloon.getVoById(i + 1);
            if (t_vo && t_vo.rewardItem && t_vo.rewardItem.id == pData.id && t_vo.rewardItem.count == pData.count) {
                t_hasGet = true;
                break;
            }
        }
        t.imgGet.visible = t_hasGet;
    };
    BallViewGrid.prototype.clean = function () {
        var t = this;
        t.grid.clean();
        _super.prototype.clean.call(this);
    };
    BallViewGrid.prototype.dispose = function () {
        var t = this;
        t.clean();
        _super.prototype.dispose.call(this);
    };
    //>>>>end
    BallViewGrid.URL = "ui://i1mp7ufx9tdd8";
    return BallViewGrid;
}(fairygui.GComponent));
__reflect(BallViewGrid.prototype, "BallViewGrid");
