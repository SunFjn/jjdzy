var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Color = (function () {
    function Color() {
    }
    Color.getColorInt = function (color) {
        var cl = 0xFFFFFF;
        if (Color.QUALITYCOLOR.length > color) {
            cl = Color.QUALITYCOLOR[color];
        }
        return cl;
    };
    Color.getColorStr = function (color) {
        var str = "#f1f1f1";
        if (Color.QUALITYCOLORH.length > color) {
            str = Color.QUALITYCOLORH[color];
        }
        return str;
    };
    Color.getColorName = function (color) {
        return Color._colorName[color] ? Color._colorName[color] : "";
    };
    Color.disabled = [new egret.ColorMatrixFilter([0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0])];
    Color.BLACKBORDER = [new egret.GlowFilter(0, 1, 1, 1)];
    Color.FILTER_GREEN = [new egret.ColorMatrixFilter([1, 0, 0, 0, 0, 0, 1, 0, 0, 100, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0])];
    Color.QUALITYCOLOR = [0xf1f1f1, 0xf1f1f1, 0x15f234, 0x3ba5ff, 0xda2bfa, 0xFFC344, 0xed1414, 0xed1414, 0xed1414];
    Color.QUALITYCOLORH = ["#f1f1f1", "#f1f1f1", "#15f234", "#3ba5ff", "#da2bfa", "#FFC344", "#ed1414", "#ed1414", "#ed1414"];
    Color.YELLOWINT = 0xffea00;
    Color.GREYINT = 0xa09dad;
    Color.GREENINT = 0x33dd33;
    Color.REDINT = 0xee3333;
    Color.BLURINT = 0x37c9ff;
    Color.TEXTINT = 0xdfd1b5;
    Color.WHITEINT = 0xf1f1f1;
    Color.WHITESTR = "#f1f1f1";
    Color.GREENSTR = "#15f234";
    Color.BLUESTR = "#3ba5ff";
    Color.PURPLESTR = "#FF00FF";
    Color.YELLOWSTR = "#FFC344";
    Color.REDSTR = "#ed1414";
    Color.TEXTSTR = "#DFD1B5"; //字体 米色
    Color.TEXT_WHITE = "#FFFFFF"; //字体 白色
    Color.TEXT_YELLOW = "#ffc334"; //字体 米黄色
    /**白色 */
    Color.WHITE = 1;
    /**绿色 */
    Color.GREEN = 2;
    /**蓝色 */
    Color.BLUE = 3;
    /**紫色 */
    Color.PURPLE = 4;
    /**橙色 */
    Color.ORANGE = 5;
    /**红色 */
    Color.RED = 6;
    Color._colorName = ["", "白", "绿", "蓝", "紫", "橙", "红", "", "彩"];
    Color.colorMatrix = [
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0, 0, 0, 1, 0
    ];
    return Color;
}());
__reflect(Color.prototype, "Color");
