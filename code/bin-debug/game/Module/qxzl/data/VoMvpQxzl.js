var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * mvp信息
 * @author: lujiahao
 * @date: 2019-10-08 18:25:08
 */
var VoMvpQxzl = (function () {
    function VoMvpQxzl() {
        this.name = "";
        this.score = 0;
        this.head = 0;
        this.headGrid = 0;
    }
    //=========================================== API ==========================================
    VoMvpQxzl.prototype.update = function (pName, pScore, pHead, pHeadGrid) {
        var t = this;
        var t_change = false;
        if (t.name != pName) {
            t.name = pName;
            t_change = true;
        }
        if (t.score != pScore) {
            t.score = pScore;
            t_change = true;
        }
        if (t.head != pHead) {
            t.head = pHead;
            t_change = true;
        }
        if (t.headGrid != pHeadGrid) {
            t.headGrid = pHeadGrid;
            t_change = true;
        }
        return t_change;
    };
    return VoMvpQxzl;
}());
__reflect(VoMvpQxzl.prototype, "VoMvpQxzl");
