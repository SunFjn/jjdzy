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
var fairygui;
(function (fairygui) {
    var GRichTextField = (function (_super) {
        __extends(GRichTextField, _super);
        function GRichTextField() {
            var _this = _super.call(this) || this;
            _this._textField.touchEnabled = true;
            return _this;
        }
        GRichTextField.prototype.updateTextFieldText = function () {
            var text2 = this._text;
            if (this._templateVars != null)
                text2 = this.parseTemplate(text2);
            var arr;
            if (this._ubbEnabled)
                arr = fairygui.GTextField._htmlParser.parser(fairygui.ToolSet.parseUBB(text2));
            else
                arr = fairygui.GTextField._htmlParser.parser(text2);
            if (this._underline) {
                for (var i = 0; i < arr.length; i++) {
                    var element = arr[i];
                    if (element.style)
                        element.style.underline = true;
                    else
                        element.style = { underline: true };
                }
            }
            this._textField.textFlow = arr;
        };
        GRichTextField.prototype.setup_beforeAdd = function (buffer, beginPos) {
            _super.prototype.setup_beforeAdd.call(this, buffer, beginPos);
            this.setXY(this.x, this.y + 5);
        };
        return GRichTextField;
    }(fairygui.GTextField));
    fairygui.GRichTextField = GRichTextField;
    __reflect(GRichTextField.prototype, "fairygui.GRichTextField");
})(fairygui || (fairygui = {}));
