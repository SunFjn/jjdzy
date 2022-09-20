var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Tools = (function () {
    function Tools() {
    }
    Tools.addNoticeIcon = function (parent, _key, _X, _Y) {
        if (_X === void 0) { _X = 0; }
        if (_Y === void 0) { _Y = 0; }
        var map = this.noticeIconDic;
        if (!parent || map[_key])
            return;
        var numBgPic = new fairygui.GLoader();
        numBgPic.url = CommonManager.getCommonUrl("Bm_Liang");
        parent.addChild(numBgPic);
        numBgPic.x = _X;
        numBgPic.y = _Y;
        map[_key] = numBgPic;
    };
    Tools.removeNoticeIcon = function (_key) {
        var map = this.noticeIconDic;
        if (map[_key]) {
            var numBgPic = map[_key];
            if (numBgPic && numBgPic.parent) {
                numBgPic.parent.removeChild(numBgPic);
            }
            delete map[_key];
        }
    };
    Tools.noticeIconDic = {};
    return Tools;
}());
__reflect(Tools.prototype, "Tools");
