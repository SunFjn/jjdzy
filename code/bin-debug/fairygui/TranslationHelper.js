var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fairygui;
(function (fairygui) {
    var TranslationHelper = (function () {
        function TranslationHelper() {
        }
        TranslationHelper.loadFromXML = function (source) {
            TranslationHelper.strings = {};
            var xml = egret.XML.parse(source);
            var nodes = xml.children;
            var length1 = nodes.length;
            for (var i1 = 0; i1 < length1; i1++) {
                var cxml = nodes[i1];
                if (cxml.name == "string") {
                    var key = cxml.attributes.name;
                    var text = cxml.children.length > 0 ? cxml.children[0].text : "";
                    var i = key.indexOf("-");
                    if (i == -1)
                        continue;
                    var key2 = key.substr(0, i);
                    var key3 = key.substr(i + 1);
                    var col = TranslationHelper.strings[key2];
                    if (!col) {
                        col = {};
                        TranslationHelper.strings[key2] = col;
                    }
                    col[key3] = text;
                }
            }
        };
        TranslationHelper.translateComponent = function (item) {
            if (TranslationHelper.strings == null)
                return;
            var compStrings = TranslationHelper.strings[item.owner.id + item.id];
            if (compStrings == null)
                return;
            var elementId, value;
            var buffer = item.rawData;
            var nextPos;
            var itemCount;
            var i, j, k;
            var dataLen;
            var curPos;
            var valueCnt;
            var page;
            buffer.seek(0, 2);
            var childCount = buffer.readShort();
            for (i = 0; i < childCount; i++) {
                dataLen = buffer.readShort();
                curPos = buffer.position;
                buffer.seek(curPos, 0);
                var type = buffer.readByte();
                buffer.skip(4);
                elementId = buffer.readS();
                if (type == fairygui.ObjectType.Component) {
                    if (buffer.seek(curPos, 6))
                        type = buffer.readByte();
                }
                buffer.seek(curPos, 1);
                if ((value = compStrings[elementId + "-tips"]) != null)
                    buffer.writeS(value);
                buffer.seek(curPos, 2);
                var gearCnt = buffer.readShort();
                for (j = 0; j < gearCnt; j++) {
                    nextPos = buffer.readShort();
                    nextPos += buffer.position;
                    if (buffer.readByte() == 6) {
                        buffer.skip(2); //controller
                        valueCnt = buffer.readShort();
                        for (k = 0; k < valueCnt; k++) {
                            page = buffer.readS();
                            if (page != null) {
                                if ((value = compStrings[elementId + "-texts_" + k]) != null)
                                    buffer.writeS(value);
                                else
                                    buffer.skip(2);
                            }
                        }
                        if (buffer.readBool() && (value = compStrings[elementId + "-texts_def"]) != null)
                            buffer.writeS(value);
                    }
                    buffer.position = nextPos;
                }
                switch (type) {
                    case fairygui.ObjectType.Text:
                    case fairygui.ObjectType.RichText:
                    case fairygui.ObjectType.InputText:
                        {
                            if ((value = compStrings[elementId]) != null) {
                                buffer.seek(curPos, 6);
                                buffer.writeS(value);
                            }
                            if ((value = compStrings[elementId + "-prompt"]) != null) {
                                buffer.seek(curPos, 4);
                                buffer.writeS(value);
                            }
                            break;
                        }
                    case fairygui.ObjectType.List:
                        {
                            buffer.seek(curPos, 8);
                            buffer.skip(2);
                            itemCount = buffer.readShort();
                            for (j = 0; j < itemCount; j++) {
                                nextPos = buffer.readShort();
                                nextPos += buffer.position;
                                buffer.skip(2); //url
                                if ((value = compStrings[elementId + "-" + j]) != null)
                                    buffer.writeS(value);
                                else
                                    buffer.skip(2);
                                if ((value = compStrings[elementId + "-" + j + "-0"]) != null)
                                    buffer.writeS(value);
                                buffer.position = nextPos;
                            }
                            break;
                        }
                    case fairygui.ObjectType.Label:
                        {
                            if (buffer.seek(curPos, 6) && buffer.readByte() == type) {
                                if ((value = compStrings[elementId]) != null)
                                    buffer.writeS(value);
                                else
                                    buffer.skip(2);
                                buffer.skip(2);
                                if (buffer.readBool())
                                    buffer.skip(4);
                                buffer.skip(4);
                                if (buffer.readBool() && (value = compStrings[elementId + "-prompt"]) != null)
                                    buffer.writeS(value);
                            }
                            break;
                        }
                    case fairygui.ObjectType.Button:
                        {
                            if (buffer.seek(curPos, 6) && buffer.readByte() == type) {
                                if ((value = compStrings[elementId]) != null)
                                    buffer.writeS(value);
                                else
                                    buffer.skip(2);
                                if ((value = compStrings[elementId + "-0"]) != null)
                                    buffer.writeS(value);
                            }
                            break;
                        }
                    case fairygui.ObjectType.ComboBox:
                        {
                            if (buffer.seek(curPos, 6) && buffer.readByte() == type) {
                                itemCount = buffer.readShort();
                                for (j = 0; j < itemCount; j++) {
                                    nextPos = buffer.readShort();
                                    nextPos += buffer.position;
                                    if ((value = compStrings[elementId + "-" + j]) != null)
                                        buffer.writeS(value);
                                    buffer.position = nextPos;
                                }
                                if ((value = compStrings[elementId]) != null)
                                    buffer.writeS(value);
                            }
                            break;
                        }
                }
                buffer.position = curPos + dataLen;
            }
        };
        TranslationHelper.strings = null;
        return TranslationHelper;
    }());
    fairygui.TranslationHelper = TranslationHelper;
    __reflect(TranslationHelper.prototype, "fairygui.TranslationHelper");
})(fairygui || (fairygui = {}));
