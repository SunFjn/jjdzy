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
var GMProtInputItem = (function (_super) {
    __extends(GMProtInputItem, _super);
    function GMProtInputItem() {
        return _super.call(this) || this;
    }
    GMProtInputItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("GM", "GMProtInputItem"));
    };
    GMProtInputItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lb = (this.getChild("lb"));
        this.contentLb = (this.getChild("contentLb"));
    };
    GMProtInputItem.prototype.show = function (str) {
        if (str instanceof Array) {
            this.lb.data = "array";
            this.lb.text = JSON.stringify(str);
        }
        else {
            this.lb.text = str;
        }
        this.contentLb.text = "";
    };
    GMProtInputItem.prototype.getNumber = function () {
        var num = parseInt(this.contentLb.text);
        return num;
    };
    GMProtInputItem.prototype.flush = function (bytes) {
        var type;
        if (this.lb.data == "array") {
            var arr = JSON.parse(this.contentLb.text);
            var typeArr = JSON.parse(this.lb.text);
            bytes.writeShort(arr.length);
            for (var i = 0, n = arr.length; i < n; i++) {
                type = typeArr[i];
                if (type == "B") {
                    bytes.writeByte(this.getNumber());
                }
                else if (type == "S") {
                    bytes.writeShort(this.getNumber());
                }
                else if (type == "I") {
                    bytes.writeInt(this.getNumber());
                }
                else if (type == "L") {
                    bytes.writeLong(this.getNumber());
                }
                else if (type == "U") {
                    bytes.writeUTF(this.contentLb.text);
                }
            }
        }
        else {
            type = this.lb.text;
            if (type == "B") {
                bytes.writeByte(this.getNumber());
            }
            else if (type == "S") {
                bytes.writeShort(this.getNumber());
            }
            else if (type == "I") {
                bytes.writeInt(this.getNumber());
            }
            else if (type == "L") {
                bytes.writeLong(this.getNumber());
            }
            else if (type == "U") {
                bytes.writeUTF(this.contentLb.text);
            }
        }
    };
    GMProtInputItem.URL = "ui://vm9a8xq8pckgd";
    return GMProtInputItem;
}(fairygui.GComponent));
__reflect(GMProtInputItem.prototype, "GMProtInputItem");
