var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EVT_SC = (function () {
    function EVT_SC() {
    }
    /** 受到伤害*/
    EVT_SC.EVT_HURT = 0;
    /** 受击僵直*/
    EVT_SC.EVT_STACT = 1;
    /** 被打飞*/
    EVT_SC.EVT_THROW = 2;
    /** 释放技能*/
    EVT_SC.EVT_DISSKILL = 5;
    return EVT_SC;
}());
__reflect(EVT_SC.prototype, "EVT_SC");
