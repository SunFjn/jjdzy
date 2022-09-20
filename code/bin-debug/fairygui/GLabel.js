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
    var GLabel = (function (_super) {
        __extends(GLabel, _super);
        function GLabel() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GLabel.prototype, "icon", {
            get: function () {
                if (this._iconObject != null)
                    return this._iconObject.icon;
            },
            set: function (value) {
                if (this._iconObject != null)
                    this._iconObject.icon = value;
                this.updateGear(7);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLabel.prototype, "title", {
            get: function () {
                if (this._titleObject)
                    return this._titleObject.text;
                else
                    return null;
            },
            set: function (value) {
                if (this._titleObject)
                    this._titleObject.text = value;
                this.updateGear(6);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLabel.prototype, "text", {
            get: function () {
                return this.title;
            },
            set: function (value) {
                this.title = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLabel.prototype, "titleColor", {
            get: function () {
                var tf = this.getTextField();
                if (tf != null)
                    return tf.color;
                else
                    return 0;
            },
            set: function (value) {
                var tf = this.getTextField();
                if (tf != null)
                    tf.color = value;
                this.updateGear(4);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLabel.prototype, "color", {
            get: function () {
                return this.titleColor;
            },
            set: function (value) {
                this.titleColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLabel.prototype, "titleFontSize", {
            get: function () {
                var tf = this.getTextField();
                if (tf != null)
                    return tf.fontSize;
                else
                    return 0;
            },
            set: function (value) {
                var tf = this.getTextField();
                if (tf != null)
                    tf.fontSize = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GLabel.prototype, "editable", {
            get: function () {
                if (this._titleObject && (this._titleObject instanceof fairygui.GTextInput))
                    return this._titleObject.asTextInput.editable;
                else
                    return false;
            },
            set: function (val) {
                if (this._titleObject)
                    this._titleObject.asTextInput.editable = val;
            },
            enumerable: true,
            configurable: true
        });
        GLabel.prototype.getTextField = function () {
            if (this._titleObject instanceof fairygui.GTextField)
                return this._titleObject;
            else if (this._titleObject instanceof GLabel)
                return this._titleObject.getTextField();
            else if (this._titleObject instanceof fairygui.GButton)
                return this._titleObject.getTextField();
            else
                return null;
        };
        GLabel.prototype.constructExtension = function (buffer) {
            this._titleObject = this.getChild("title");
            this._iconObject = this.getChild("icon");
        };
        GLabel.prototype.setup_afterAdd = function (buffer, beginPos) {
            _super.prototype.setup_afterAdd.call(this, buffer, beginPos);
            if (!buffer.seek(beginPos, 6))
                return;
            if (buffer.readByte() != this.packageItem.objectType)
                return;
            var str;
            str = buffer.readS();
            if (str != null)
                this.title = str;
            str = buffer.readS();
            if (str != null)
                this.icon = str;
            if (buffer.readBool())
                this.titleColor = buffer.readColor();
            var iv = buffer.readInt();
            if (iv != 0)
                this.titleFontSize = iv;
            if (buffer.readBool()) {
                var input = this.getTextField();
                if (input != null) {
                    str = buffer.readS();
                    if (str != null)
                        input.promptText = str;
                    str = buffer.readS();
                    if (str != null)
                        input.restrict = str;
                    iv = buffer.readInt();
                    if (iv != 0)
                        input.maxLength = iv;
                    iv = buffer.readInt();
                    if (iv != 0) {
                        //keyboardType
                    }
                    if (buffer.readBool())
                        input.password = true;
                }
                else
                    buffer.skip(13);
            }
        };
        return GLabel;
    }(fairygui.GComponent));
    fairygui.GLabel = GLabel;
    __reflect(GLabel.prototype, "fairygui.GLabel");
})(fairygui || (fairygui = {}));
