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
    var GTextField = (function (_super) {
        __extends(GTextField, _super);
        function GTextField() {
            var _this = _super.call(this) || this;
            _this._fontSize = 0;
            _this._leading = 0;
            _this._letterSpacing = 0;
            _this._underline = false;
            _this._textWidth = 0;
            _this._textHeight = 0;
            _this._wordWrap = false;
            _this._fontSize = 12;
            _this._align = fairygui.AlignType.Left;
            _this._verticalAlign = fairygui.VertAlignType.Top;
            _this._text = "";
            _this._leading = 3;
            _this._color = 0;
            _this._templateVars = null;
            _this._autoSize = fairygui.AutoSizeType.Both;
            _this._widthAutoSize = true;
            _this._heightAutoSize = true;
            _this._bitmapPool = new Array();
            return _this;
        }
        GTextField.prototype.createDisplayObject = function () {
            this._textField = new egret.TextField();
            this._textField["$owner"] = this;
            this._textField.touchEnabled = false;
            this.setDisplayObject(this._textField);
        };
        GTextField.prototype.switchBitmapMode = function (val) {
            if (val && this.displayObject == this._textField) {
                if (this._bitmapContainer == null) {
                    this._bitmapContainer = new egret.Sprite();
                    this._bitmapContainer["$owner"] = this;
                }
                this.switchDisplayObject(this._bitmapContainer);
            }
            else if (!val && this.displayObject == this._bitmapContainer)
                this.switchDisplayObject(this._textField);
        };
        GTextField.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._bitmapFont = null;
            this._requireRender = false;
        };
        Object.defineProperty(GTextField.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (value) {
                this._text = value;
                if (this._text == null)
                    this._text = "";
                this.updateGear(6);
                if (this.parent && this.parent._underConstruct)
                    this.renderNow();
                else
                    this.render();
            },
            enumerable: true,
            configurable: true
        });
        GTextField.prototype.updateTextFieldText = function () {
            var text2 = this._text;
            if (this._templateVars != null)
                text2 = this.parseTemplate(text2);
            if (this._ubbEnabled) {
                var arr = GTextField._htmlParser.parser(fairygui.ToolSet.parseUBB(fairygui.ToolSet.encodeHTML(text2)));
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
            }
            else if (this._underline) {
                var arr = new Array(1);
                arr[0] = { text: text2, style: { underline: true } };
                this._textField.textFlow = arr;
            }
            else
                this._textField.text = text2;
        };
        Object.defineProperty(GTextField.prototype, "font", {
            get: function () {
                return this._font;
            },
            set: function (value) {
                if (this._font != value) {
                    this._font = value;
                    this.updateTextFormat();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextField.prototype, "fontSize", {
            get: function () {
                return this._fontSize;
            },
            set: function (value) {
                if (value < 0)
                    return;
                if (this._fontSize != value) {
                    this._fontSize = value;
                    this.updateTextFormat();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextField.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (value) {
                if (this._color != value) {
                    this._color = value;
                    this.updateGear(4);
                    this.updateTextFormat();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextField.prototype, "align", {
            get: function () {
                return this._align;
            },
            set: function (value) {
                if (this._align != value) {
                    this._align = value;
                    this._textField.textAlign = this.getAlignTypeString(this._align);
                    if (this._bitmapFont && !this._underConstruct)
                        this.render();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextField.prototype, "verticalAlign", {
            get: function () {
                return this._verticalAlign;
            },
            set: function (value) {
                if (this._verticalAlign != value) {
                    this._verticalAlign = value;
                    this._textField.verticalAlign = this.getVertAlignTypeString(this._verticalAlign);
                    if (this._bitmapFont && !this._underConstruct)
                        this.render();
                }
            },
            enumerable: true,
            configurable: true
        });
        GTextField.prototype.getAlignTypeString = function (type) {
            return type == fairygui.AlignType.Left ? egret.HorizontalAlign.LEFT :
                (type == fairygui.AlignType.Center ? egret.HorizontalAlign.CENTER : egret.HorizontalAlign.RIGHT);
        };
        GTextField.prototype.getVertAlignTypeString = function (type) {
            return type == fairygui.VertAlignType.Top ? egret.VerticalAlign.TOP :
                (type == fairygui.VertAlignType.Middle ? egret.VerticalAlign.MIDDLE : egret.VerticalAlign.BOTTOM);
        };
        Object.defineProperty(GTextField.prototype, "leading", {
            get: function () {
                return this._leading;
            },
            set: function (value) {
                if (this._leading != value) {
                    this._leading = value;
                    this.updateTextFormat();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextField.prototype, "letterSpacing", {
            get: function () {
                return this._letterSpacing;
            },
            set: function (value) {
                if (this._letterSpacing != value) {
                    this._letterSpacing = value;
                    this.updateTextFormat();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextField.prototype, "underline", {
            get: function () {
                return this._underline;
            },
            set: function (value) {
                this._underline = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextField.prototype, "bold", {
            get: function () {
                return this._textField.bold;
            },
            set: function (value) {
                this._textField.bold = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextField.prototype, "italic", {
            get: function () {
                return this._textField.italic;
            },
            set: function (value) {
                this._textField.italic = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextField.prototype, "singleLine", {
            get: function () {
                return !this._textField.multiline;
            },
            set: function (value) {
                value = !value;
                if (this._textField.multiline != value) {
                    this._textField.multiline = value;
                    this.render();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextField.prototype, "stroke", {
            get: function () {
                return this._textField.stroke;
            },
            set: function (value) {
                this._textField.stroke = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextField.prototype, "strokeColor", {
            get: function () {
                return this._textField.strokeColor;
            },
            set: function (value) {
                this._textField.strokeColor = value;
                this.updateGear(4);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextField.prototype, "ubbEnabled", {
            get: function () {
                return this._ubbEnabled;
            },
            set: function (value) {
                if (this._ubbEnabled != value) {
                    this._ubbEnabled = value;
                    this.render();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextField.prototype, "autoSize", {
            get: function () {
                return this._autoSize;
            },
            set: function (value) {
                if (this._autoSize != value) {
                    this._autoSize = value;
                    this._widthAutoSize = value == fairygui.AutoSizeType.Both;
                    this._heightAutoSize = value == fairygui.AutoSizeType.Both || value == fairygui.AutoSizeType.Height;
                    this.render();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GTextField.prototype, "textWidth", {
            get: function () {
                if (this._requireRender)
                    this.renderNow();
                return this._textWidth;
            },
            enumerable: true,
            configurable: true
        });
        GTextField.prototype.ensureSizeCorrect = function () {
            if (this._sizeDirty && this._requireRender)
                this.renderNow();
        };
        GTextField.prototype.updateTextFormat = function () {
            this._textField.size = this._fontSize;
            this._bitmapFont = null;
            if (fairygui.ToolSet.startsWith(this._font, "ui://")) {
                var pi = fairygui.UIPackage.getItemByURL(this._font);
                if (pi)
                    this._bitmapFont = pi.owner.getItemAsset(pi);
            }
            if (this._bitmapFont == null) {
                if (this._font)
                    this._textField.fontFamily = this._font;
                else
                    this._textField.fontFamily = fairygui.UIConfig.defaultFont;
            }
            if (this.grayed)
                this._textField.textColor = 0xAAAAAA;
            else
                this._textField.textColor = this._color;
            this._textField.lineSpacing = this._leading;
            //this._textField.letterSpacing = this._letterSpacing;
            if (!this._underConstruct)
                this.render();
        };
        GTextField.prototype.render = function () {
            if (!this._requireRender) {
                this._requireRender = true;
                egret.callLater(this.__render, this);
            }
            if (!this._sizeDirty && (this._widthAutoSize || this._heightAutoSize)) {
                this._sizeDirty = true;
                this.dispatchEventWith(fairygui.GObject.SIZE_DELAY_CHANGE);
            }
        };
        GTextField.prototype.__render = function () {
            if (this._requireRender)
                this.renderNow();
        };
        GTextField.prototype.renderNow = function (updateBounds) {
            if (updateBounds === void 0) { updateBounds = true; }
            this._requireRender = false;
            this._sizeDirty = false;
            if (this._bitmapFont != null) {
                this.renderWithBitmapFont(updateBounds);
                return;
            }
            this.switchBitmapMode(false);
            this._textField.width = this._widthAutoSize ? (this.maxWidth <= 0 ? 10000 : this.maxWidth) : Math.ceil(this.width);
            this.updateTextFieldText();
            this._textWidth = Math.ceil(this._textField.textWidth);
            if (this._textWidth > 0)
                this._textWidth += 4;
            this._textHeight = Math.ceil(this._textField.textHeight);
            if (this._textHeight > 0)
                this._textHeight += 4;
            var w, h = 0;
            if (this._widthAutoSize) {
                w = this._textWidth;
                this._textField.width = w;
            }
            else
                w = this.width;
            if (this._heightAutoSize) {
                h = this._textHeight;
                if (this._textField.height != this._textHeight)
                    this._textField.height = this._textHeight;
            }
            else {
                h = this.height;
                if (this._textHeight > h)
                    this._textHeight = h;
            }
            if (updateBounds) {
                this._updatingSize = true;
                this.setSize(w, h);
                this._updatingSize = false;
            }
        };
        GTextField.prototype.renderWithBitmapFont = function (updateBounds) {
            this.switchBitmapMode(true);
            var cnt = this._bitmapContainer.numChildren;
            for (var i = 0; i < cnt; i++) {
                var obj = this._bitmapContainer.getChildAt(i);
                this._bitmapPool.push(obj);
            }
            this._bitmapContainer.removeChildren();
            if (!this._lines)
                this._lines = new Array();
            else
                LineInfo.returnList(this._lines);
            var letterSpacing = this._letterSpacing;
            var lineSpacing = this._leading - 1;
            var rectWidth = this.width - GTextField.GUTTER_X * 2;
            var lineWidth = 0, lineHeight = 0, lineTextHeight = 0;
            var glyphWidth = 0, glyphHeight = 0;
            var wordChars = 0, wordStart = 0, wordEnd = 0;
            var lastLineHeight = 0;
            var lineBuffer = "";
            var lineY = GTextField.GUTTER_Y;
            var line;
            var wordWrap = !this._widthAutoSize && this._textField.multiline;
            var fontScale = this._bitmapFont.resizable ? this._fontSize / this._bitmapFont.size : 1;
            this._textWidth = 0;
            this._textHeight = 0;
            var text2 = this._text;
            if (this._templateVars != null)
                text2 = this.parseTemplate(text2);
            var textLength = text2.length;
            for (var offset = 0; offset < textLength; ++offset) {
                var ch = text2.charAt(offset);
                var cc = ch.charCodeAt(0);
                if (cc == 10) {
                    lineBuffer += ch;
                    line = LineInfo.borrow();
                    line.width = lineWidth;
                    if (lineTextHeight == 0) {
                        if (lastLineHeight == 0)
                            lastLineHeight = this._fontSize;
                        if (lineHeight == 0)
                            lineHeight = lastLineHeight;
                        lineTextHeight = lineHeight;
                    }
                    line.height = lineHeight;
                    lastLineHeight = lineHeight;
                    line.textHeight = lineTextHeight;
                    line.text = lineBuffer;
                    line.y = lineY;
                    lineY += (line.height + lineSpacing);
                    if (line.width > this._textWidth)
                        this._textWidth = line.width;
                    this._lines.push(line);
                    lineBuffer = "";
                    lineWidth = 0;
                    lineHeight = 0;
                    lineTextHeight = 0;
                    wordChars = 0;
                    wordStart = 0;
                    wordEnd = 0;
                    continue;
                }
                if (cc >= 65 && cc <= 90 || cc >= 97 && cc <= 122) {
                    if (wordChars == 0)
                        wordStart = lineWidth;
                    wordChars++;
                }
                else {
                    if (wordChars > 0)
                        wordEnd = lineWidth;
                    wordChars = 0;
                }
                if (cc == 32) {
                    glyphWidth = Math.ceil(this._fontSize / 2);
                    glyphHeight = this._fontSize;
                }
                else {
                    var glyph = this._bitmapFont.glyphs[ch];
                    if (glyph) {
                        glyphWidth = Math.ceil(glyph.advance * fontScale);
                        glyphHeight = Math.ceil(glyph.lineHeight * fontScale);
                    }
                    else {
                        glyphWidth = 0;
                        glyphHeight = 0;
                    }
                }
                if (glyphHeight > lineTextHeight)
                    lineTextHeight = glyphHeight;
                if (glyphHeight > lineHeight)
                    lineHeight = glyphHeight;
                if (lineWidth != 0)
                    lineWidth += letterSpacing;
                lineWidth += glyphWidth;
                if (!wordWrap || lineWidth <= rectWidth) {
                    lineBuffer += ch;
                }
                else {
                    line = LineInfo.borrow();
                    line.height = lineHeight;
                    line.textHeight = lineTextHeight;
                    if (lineBuffer.length == 0) {
                        line.text = ch;
                    }
                    else if (wordChars > 0 && wordEnd > 0) {
                        lineBuffer += ch;
                        var len = lineBuffer.length - wordChars;
                        line.text = fairygui.ToolSet.trimRight(lineBuffer.substr(0, len));
                        line.width = wordEnd;
                        lineBuffer = lineBuffer.substr(len);
                        lineWidth -= wordStart;
                    }
                    else {
                        line.text = lineBuffer;
                        line.width = lineWidth - (glyphWidth + letterSpacing);
                        lineBuffer = ch;
                        lineWidth = glyphWidth;
                        lineHeight = glyphHeight;
                        lineTextHeight = glyphHeight;
                    }
                    line.y = lineY;
                    lineY += (line.height + lineSpacing);
                    if (line.width > this._textWidth)
                        this._textWidth = line.width;
                    wordChars = 0;
                    wordStart = 0;
                    wordEnd = 0;
                    this._lines.push(line);
                }
            }
            if (lineBuffer.length > 0) {
                line = LineInfo.borrow();
                line.width = lineWidth;
                if (lineHeight == 0)
                    lineHeight = lastLineHeight;
                if (lineTextHeight == 0)
                    lineTextHeight = lineHeight;
                line.height = lineHeight;
                line.textHeight = lineTextHeight;
                line.text = lineBuffer;
                line.y = lineY;
                if (line.width > this._textWidth)
                    this._textWidth = line.width;
                this._lines.push(line);
            }
            if (this._textWidth > 0)
                this._textWidth += GTextField.GUTTER_X * 2;
            var count = this._lines.length;
            if (count == 0) {
                this._textHeight = 0;
            }
            else {
                line = this._lines[this._lines.length - 1];
                this._textHeight = line.y + line.height + GTextField.GUTTER_Y;
            }
            var w, h = 0;
            if (this._widthAutoSize) {
                if (this._textWidth == 0)
                    w = 0;
                else
                    w = this._textWidth;
            }
            else
                w = this.width;
            if (this._heightAutoSize) {
                if (this._textHeight == 0)
                    h = 0;
                else
                    h = this._textHeight;
            }
            else
                h = this.height;
            if (updateBounds) {
                this._updatingSize = true;
                this.setSize(w, h);
                this._updatingSize = false;
            }
            if (w == 0 || h == 0)
                return;
            var charX = GTextField.GUTTER_X;
            var lineIndent = 0;
            var charIndent = 0;
            rectWidth = this.width - GTextField.GUTTER_X * 2;
            var lineCount = this._lines.length;
            for (var i = 0; i < lineCount; i++) {
                line = this._lines[i];
                charX = GTextField.GUTTER_X;
                if (this._align == fairygui.AlignType.Center)
                    lineIndent = (rectWidth - line.width) / 2;
                else if (this._align == fairygui.AlignType.Right)
                    lineIndent = rectWidth - line.width;
                else
                    lineIndent = 0;
                textLength = line.text.length;
                for (var j = 0; j < textLength; j++) {
                    ch = line.text.charAt(j);
                    cc = ch.charCodeAt(0);
                    if (cc == 10)
                        continue;
                    if (cc == 32) {
                        charX += letterSpacing + Math.ceil(this._fontSize / 2);
                        continue;
                    }
                    glyph = this._bitmapFont.glyphs[ch];
                    if (glyph != null) {
                        charIndent = (line.height + line.textHeight) / 2 - Math.ceil(glyph.lineHeight * fontScale);
                        var bm;
                        if (this._bitmapPool.length)
                            bm = this._bitmapPool.pop();
                        else {
                            bm = new egret.Bitmap();
                            bm.smoothing = true;
                        }
                        bm.x = charX + lineIndent + Math.ceil(glyph.offsetX * fontScale);
                        bm.y = line.y + charIndent + Math.ceil(glyph.offsetY * fontScale);
                        bm["$backupY"] = bm.y;
                        bm.texture = glyph.texture;
                        bm.scaleX = fontScale;
                        bm.scaleY = fontScale;
                        this._bitmapContainer.addChild(bm);
                        charX += letterSpacing + Math.ceil(glyph.advance * fontScale);
                    }
                    else {
                        charX += letterSpacing;
                    }
                } //text loop
            } //line loop
            this.doAlign();
        };
        GTextField.prototype.handleSizeChanged = function () {
            if (this._updatingSize)
                return;
            if (this._bitmapFont != null) {
                if (!this._widthAutoSize)
                    this.render();
                else
                    this.doAlign();
            }
            else {
                if (this._underConstruct) {
                    this._textField.width = this.width;
                    this._textField.height = this.height;
                }
                else {
                    if (!this._widthAutoSize) {
                        if (!this._heightAutoSize) {
                            this._textField.width = this.width;
                            this._textField.height = this.height;
                        }
                        else
                            this._textField.width = this.width;
                    }
                }
            }
        };
        GTextField.prototype.parseTemplate = function (template) {
            var pos1 = 0, pos2, pos3;
            var tag;
            var value;
            var result = "";
            while ((pos2 = template.indexOf("{", pos1)) != -1) {
                if (pos2 > 0 && template.charCodeAt(pos2 - 1) == 92) {
                    result += template.substring(pos1, pos2 - 1);
                    result += "{";
                    pos1 = pos2 + 1;
                    continue;
                }
                result += template.substring(pos1, pos2);
                pos1 = pos2;
                pos2 = template.indexOf("}", pos1);
                if (pos2 == -1)
                    break;
                if (pos2 == pos1 + 1) {
                    result += template.substr(pos1, 2);
                    pos1 = pos2 + 1;
                    continue;
                }
                tag = template.substring(pos1 + 1, pos2);
                pos3 = tag.indexOf("=");
                if (pos3 != -1) {
                    value = this._templateVars[tag.substring(0, pos3)];
                    if (value == null)
                        result += tag.substring(pos3 + 1);
                    else
                        result += value;
                }
                else {
                    value = this._templateVars[tag];
                    if (value != null)
                        result += value;
                }
                pos1 = pos2 + 1;
            }
            if (pos1 < template.length)
                result += template.substr(pos1);
            return result;
        };
        Object.defineProperty(GTextField.prototype, "templateVars", {
            get: function () {
                return this._templateVars;
            },
            set: function (value) {
                if (this._templateVars == null && value == null)
                    return;
                this._templateVars = value;
                this.flushVars();
            },
            enumerable: true,
            configurable: true
        });
        GTextField.prototype.setVar = function (name, value) {
            if (!this._templateVars)
                this._templateVars = {};
            this._templateVars[name] = value;
            return this;
        };
        GTextField.prototype.flushVars = function () {
            this.render();
        };
        GTextField.prototype.handleGrayedChanged = function () {
            _super.prototype.handleGrayedChanged.call(this);
            this.updateTextFormat();
        };
        GTextField.prototype.doAlign = function () {
            var yOffset;
            if (this._verticalAlign == fairygui.VertAlignType.Top || this._textHeight == 0)
                yOffset = GTextField.GUTTER_Y;
            else {
                var dh = this.height - this._textHeight;
                if (dh < 0)
                    dh = 0;
                if (this._verticalAlign == fairygui.VertAlignType.Middle)
                    yOffset = Math.floor(dh / 2);
                else
                    yOffset = Math.floor(dh);
            }
            var cnt = this._bitmapContainer.numChildren;
            for (var i = 0; i < cnt; i++) {
                var obj = this._bitmapContainer.getChildAt(i);
                obj.y = obj["$backupY"] + yOffset;
            }
        };
        GTextField.prototype.setup_beforeAdd = function (buffer, beginPos) {
            _super.prototype.setup_beforeAdd.call(this, buffer, beginPos);
            buffer.seek(beginPos, 5);
            this._font = buffer.readS();
            this._fontSize = buffer.readShort();
            this._color = buffer.readColor();
            this.align = buffer.readByte();
            this.verticalAlign = buffer.readByte();
            this._leading = buffer.readShort();
            this._letterSpacing = buffer.readShort();
            this._ubbEnabled = buffer.readBool();
            this._autoSize = buffer.readByte();
            this._widthAutoSize = this._autoSize == fairygui.AutoSizeType.Both;
            this._heightAutoSize = this._autoSize == fairygui.AutoSizeType.Both || this._autoSize == fairygui.AutoSizeType.Height;
            this._underline = buffer.readBool();
            this._textField.italic = buffer.readBool();
            this._textField.bold = buffer.readBool();
            this._textField.multiline = !buffer.readBool();
            if (buffer.readBool()) {
                this._textField.strokeColor = buffer.readColor();
                this.stroke = buffer.readFloat() + 1;
            }
            if (buffer.readBool())
                buffer.skip(12);
            if (buffer.readBool())
                this._templateVars = {};
        };
        GTextField.prototype.setup_afterAdd = function (buffer, beginPos) {
            _super.prototype.setup_afterAdd.call(this, buffer, beginPos);
            this.updateTextFormat();
            buffer.seek(beginPos, 6);
            var str = buffer.readS();
            if (str != null)
                this.text = str;
            this._sizeDirty = false;
        };
        Object.defineProperty(GTextField.prototype, "wordWrap", {
            get: function () {
                return this._wordWrap;
            },
            set: function (value) {
                this._wordWrap = value;
                this.displayObject.wordWrap = value;
            },
            enumerable: true,
            configurable: true
        });
        GTextField.GUTTER_X = 2;
        GTextField.GUTTER_Y = 2;
        GTextField._htmlParser = new egret.HtmlTextParser();
        return GTextField;
    }(fairygui.GObject));
    fairygui.GTextField = GTextField;
    __reflect(GTextField.prototype, "fairygui.GTextField");
    var LineInfo = (function () {
        function LineInfo() {
            this.width = 0;
            this.height = 0;
            this.textHeight = 0;
            this.y = 0;
        }
        LineInfo.borrow = function () {
            if (LineInfo.pool.length) {
                var ret = LineInfo.pool.pop();
                ret.width = 0;
                ret.height = 0;
                ret.textHeight = 0;
                ret.text = null;
                ret.y = 0;
                return ret;
            }
            else
                return new LineInfo();
        };
        LineInfo.returns = function (value) {
            LineInfo.pool.push(value);
        };
        LineInfo.returnList = function (value) {
            var length = value.length;
            for (var i = 0; i < length; i++) {
                var li = value[i];
                LineInfo.pool.push(li);
            }
            value.length = 0;
        };
        LineInfo.pool = [];
        return LineInfo;
    }());
    fairygui.LineInfo = LineInfo;
    __reflect(LineInfo.prototype, "fairygui.LineInfo");
})(fairygui || (fairygui = {}));
