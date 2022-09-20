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
    var GTextInput = (function (_super) {
        __extends(GTextInput, _super);
        function GTextInput() {
            var _this = _super.call(this) || this;
            _this._widthAutoSize = false;
            _this._heightAutoSize = false;
            _this.displayObject.touchChildren = true;
            _this._textField.type = egret.TextFieldType.INPUT;
            _this._textField.addEventListener(egret.Event.CHANGE, _this.__textChanged, _this);
            _this._textField.addEventListener(egret.FocusEvent.FOCUS_IN, _this.__focusIn, _this);
            _this._textField.addEventListener(egret.FocusEvent.FOCUS_OUT, _this.__focusOut, _this);
            _this._textField.addEventListener("blur", function () {
                window.scroll(0, 0);
                console.log("blurblurblurblurblurblurblurblurblur");
            }, _this);
            return _this;
        }
        GTextInput.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        Object.defineProperty(GTextInput.prototype, "editable", {
            get: function () {
                return this._textField.type == egret.TextFieldType.INPUT;
            },
            set: function (val) {
                if (val)
                    this._textField.type = egret.TextFieldType.INPUT;
                else
                    this._textField.type = egret.TextFieldType.DYNAMIC;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextInput.prototype, "maxLength", {
            get: function () {
                return this._textField.maxChars;
            },
            set: function (val) {
                this._textField.maxChars = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextInput.prototype, "promptText", {
            get: function () {
                return this._promptText;
            },
            set: function (val) {
                this._promptText = val;
                this.updateTextFieldText();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextInput.prototype, "restrict", {
            get: function () {
                return this._textField.restrict;
            },
            set: function (value) {
                this._textField.restrict = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextInput.prototype, "password", {
            get: function () {
                return this._password;
            },
            set: function (val) {
                if (this._password != val) {
                    this._password = val;
                    this._textField.displayAsPassword = this._password;
                    if (val)
                        this._textField.inputType = egret.TextFieldInputType.PASSWORD;
                    else
                        this._textField.inputType = egret.TextFieldInputType.TEXT;
                    this.render();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextInput.prototype, "verticalAlign", {
            get: function () {
                return this._verticalAlign;
            },
            set: function (value) {
                if (this._verticalAlign != value) {
                    this._verticalAlign = value;
                    this.updateVertAlign();
                }
            },
            enumerable: true,
            configurable: true
        });
        GTextInput.prototype.updateVertAlign = function () {
            switch (this._verticalAlign) {
                case fairygui.VertAlignType.Top:
                    this._textField.verticalAlign = egret.VerticalAlign.TOP;
                    break;
                case fairygui.VertAlignType.Middle:
                    this._textField.verticalAlign = egret.VerticalAlign.MIDDLE;
                    break;
                case fairygui.VertAlignType.Bottom:
                    this._textField.verticalAlign = egret.VerticalAlign.BOTTOM;
                    break;
            }
        };
        GTextInput.prototype.updateTextFieldText = function () {
            if (!this._text && this._promptText) {
                this._textField.displayAsPassword = false;
                this._textField.textFlow = (new egret.HtmlTextParser).parser(fairygui.ToolSet.parseUBB(this._promptText));
            }
            else {
                this._textField.displayAsPassword = this._password;
                if (this._ubbEnabled)
                    this._textField.textFlow = (new egret.HtmlTextParser).parser(fairygui.ToolSet.parseUBB(fairygui.ToolSet.encodeHTML(this._text)));
                else
                    this._textField.text = this._text;
            }
        };
        GTextInput.prototype.handleSizeChanged = function () {
            if (!this._updatingSize) {
                this._textField.width = Math.ceil(this.width);
                this._textField.height = Math.ceil(this.height);
            }
        };
        GTextInput.prototype.setup_beforeAdd = function (buffer, beginPos) {
            _super.prototype.setup_beforeAdd.call(this, buffer, beginPos);
            buffer.seek(beginPos, 4);
            var str = buffer.readS();
            if (str != null)
                this._promptText = str;
            str = buffer.readS();
            if (str != null)
                this._textField.restrict = str;
            var iv = buffer.readInt();
            if (iv != 0)
                this._textField.maxChars = iv;
            iv = buffer.readInt();
            if (iv != 0) {
            }
            if (buffer.readBool())
                this.password = true;
            this.updateVertAlign();
        };
        GTextInput.prototype.setup_afterAdd = function (buffer, beginPos) {
            _super.prototype.setup_afterAdd.call(this, buffer, beginPos);
            if (!this._text && this._promptText) {
                this._textField.displayAsPassword = false;
                this._textField.textFlow = (new egret.HtmlTextParser).parser(fairygui.ToolSet.parseUBB(fairygui.ToolSet.encodeHTML(this._promptText)));
            }
        };
        GTextInput.prototype.__textChanged = function (evt) {
            this._text = this._textField.text;
        };
        GTextInput.prototype.__focusIn = function (evt) {
            if (!this._text && this._promptText) {
                this._textField.displayAsPassword = this._password;
                this._textField.text = "";
            }
        };
        GTextInput.prototype.__focusOut = function (evt) {
            this._text = this._textField.text;
            if (!this._text && this._promptText) {
                this._textField.displayAsPassword = false;
                this._textField.textFlow = (new egret.HtmlTextParser).parser(fairygui.ToolSet.parseUBB(fairygui.ToolSet.encodeHTML(this._promptText)));
            }
        };
        return GTextInput;
    }(fairygui.GTextField));
    fairygui.GTextInput = GTextInput;
    __reflect(GTextInput.prototype, "fairygui.GTextInput");
})(fairygui || (fairygui = {}));
