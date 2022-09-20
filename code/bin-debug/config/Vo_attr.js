var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**角色属性 shuxing_300*/
var Vo_attr = (function () {
    function Vo_attr() {
    }
    //******计算战力属性*******//
    /**获取属性名称 */
    Vo_attr.getAttLeiXing = function (type) {
        // var leixing = 0;
        // var lib = Config.jssx_002;
        // if (lib[type]) {
        // 	leixing = lib.leixing
        // }
        // return leixing;
        return 0;
    };
    /**获取属性名称 */
    Vo_attr.getAttrName = function (type) {
        var name = "";
        if (Config.jssx_002[type]) {
            name = Config.jssx_002[type].name;
        }
        return name;
    };
    Vo_attr.getShowStr = function (id, value, str, ATTColor, valColor) {
        if (str === void 0) { str = "+"; }
        var val = "";
        var type = Config.jssx_002[id].type;
        var name = "";
        switch (type) {
            case 1:
                val = value + "";
                break;
            case 2:
                val = (value / 1000) + "%";
                break;
        }
        name = Vo_attr.getAttrName(id);
        if (ATTColor) {
            name = HtmlUtil.fontNoSize(name, ATTColor);
        }
        if (valColor) {
            val = HtmlUtil.fontNoSize(val, valColor);
        }
        var ret = name + str + val;
        return ret;
    };
    Vo_attr.getRealNum = function (id, value) {
        var type = Config.jssx_002[id].type;
        switch (type) {
            case 1:
                break;
            case 2:
                value = (value / 100000);
                break;
        }
        return value;
    };
    return Vo_attr;
}());
__reflect(Vo_attr.prototype, "Vo_attr");
