var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** 只是用来测试 */
var CFG_TestMapID = (function () {
    function CFG_TestMapID() {
    }
    CFG_TestMapID.getLibList = function () {
        if (!CFG_TestMapID.LIBLIST) {
            var map = {};
            CFG_TestMapID.LIBLIST = [];
            var maplib = Config.map_200;
            for (var k in maplib) {
                if (!map[maplib[k].s]) {
                    map[maplib[k].s] = 1;
                    CFG_TestMapID.LIBLIST.push(maplib[k]);
                }
            }
        }
        return CFG_TestMapID.LIBLIST;
    };
    return CFG_TestMapID;
}());
__reflect(CFG_TestMapID.prototype, "CFG_TestMapID");
