var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var BMGlyph = (function () {
        function BMGlyph() {
            this.x = 0;
            this.y = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.width = 0;
            this.height = 0;
            this.advance = 0;
            this.lineHeight = 0;
            this.channel = 0;
        }
        return BMGlyph;
    }());
    fairygui.BMGlyph = BMGlyph;
    __reflect(BMGlyph.prototype, "fairygui.BMGlyph");
})(fairygui || (fairygui = {}));
