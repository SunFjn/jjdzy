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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ChildFurnitureName = (function (_super) {
    __extends(ChildFurnitureName, _super);
    function ChildFurnitureName() {
        var _this = _super.call(this) || this;
        _this.setImage = function (v) {
            IconUtil.setImg(_this.image, Enum_Path.IMAGE_URL + "fudi/" + v + "_name.png");
        };
        _this.setPos = function (v) {
            var pos = JSON.parse(v)[0];
            _this.setXY(pos[0], pos[1]);
        };
        _this.autoRemove = true;
        return _this;
    }
    ChildFurnitureName.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "ChildFurnitureName"));
    };
    ChildFurnitureName.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.image = (this.getChild("image"));
    };
    ChildFurnitureName.prototype.update = function (opt) {
    };
    ChildFurnitureName.prototype.onAdd = function () {
        this.role.headGroup.addChild(this.displayObject);
    };
    ChildFurnitureName.prototype.onRemove = function () {
        var a = this;
        a.role.headGroup.removeChild(a.displayObject);
        IconUtil.setImg(this.image, null);
        Pool.recover("ChildFurnitureName", a);
    };
    ChildFurnitureName.create = function (role) {
        var temp = Pool.getItemByCreateFun("ChildFurnitureName", ChildFurnitureName.createInstance);
        temp.role = role;
        return temp;
    };
    ChildFurnitureName.URL = "ui://y0plc878tmlf1x";
    return ChildFurnitureName;
}(fairygui.GComponent));
__reflect(ChildFurnitureName.prototype, "ChildFurnitureName");
