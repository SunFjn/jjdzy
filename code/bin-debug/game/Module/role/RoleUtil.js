var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleUtil = (function () {
    function RoleUtil() {
    }
    /**npc的头像 */
    RoleUtil.getHeadImg = function (id) {
        var ret = null;
        ret = "resource/assets/head/" + id + ".png";
        return ret;
    };
    /**人物的头像 */
    RoleUtil.getHeadRole = function (id) {
        var ret = null;
        ret = "resource/assets/head/" + id + ".png";
        return ret;
    };
    /**人物的头像 */
    RoleUtil.getHeadRoleByCfg = function (id) {
        var ret = null;
        var headPic = Config.shezhi_707[id];
        ret = "resource/assets/head/" + headPic.picture + ".png";
        return ret;
    };
    /**剧情-人物的头像 */
    RoleUtil.getHeadJuQ = function (id) {
        var ret = null;
        ret = "resource/assets/head/jq" + id + ".png";
        return ret;
    };
    RoleUtil.SIZE77_75 = "77_75";
    return RoleUtil;
}());
__reflect(RoleUtil.prototype, "RoleUtil");
