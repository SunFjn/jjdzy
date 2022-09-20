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
/** sf is an automatically generated class by FairyGUI. Please do not modify it. **/
var FengHuoMap = (function (_super) {
    __extends(FengHuoMap, _super);
    function FengHuoMap() {
        return _super.call(this) || this;
    }
    FengHuoMap.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "FengHuoMap"));
    };
    FengHuoMap.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var sf = this;
        this.mapBg1 = (this.getChild("mapBg1"));
        this.mapBg2 = (this.getChild("mapBg2"));
        this.mapBg3 = (this.getChild("mapBg3"));
        this.id2 = (this.getChild("id2"));
        this.id1 = (this.getChild("id1"));
        this.id3 = (this.getChild("id3"));
        this.n20 = (this.getChild("n20"));
        this.imgSafe1 = (this.getChild("imgSafe1"));
        this.lbServer1 = (this.getChild("lbServer1"));
        this.safe1 = (this.getChild("safe1"));
        this.n23 = (this.getChild("n23"));
        this.imgSafe2 = (this.getChild("imgSafe2"));
        this.lbServer2 = (this.getChild("lbServer2"));
        this.safe2 = (this.getChild("safe2"));
        this.n40 = (this.getChild("n40"));
        this.imgSafe3 = (this.getChild("imgSafe3"));
        this.lbServer3 = (this.getChild("lbServer3"));
        this.safe3 = (this.getChild("safe3"));
        this.id6 = (this.getChild("id6"));
        this.id5 = (this.getChild("id5"));
        this.id7 = (this.getChild("id7"));
        this.id4 = (this.getChild("id4"));
        this.id8 = (this.getChild("id8"));
        this.id9 = (this.getChild("id9"));
        this.id10 = (this.getChild("id10"));
        sf.cityDic = {};
        for (var i = 1; i < 11; i++) {
            sf.cityDic[i] = sf["id" + i];
            sf.cityDic[i].initCFG(i);
        }
    };
    FengHuoMap.prototype.enter = function () {
        var sf = this;
        IconUtil.setImg(sf.mapBg1, Enum_Path.BACK_URL + "fenghuolangyan1.jpg");
        IconUtil.setImg(sf.mapBg2, Enum_Path.BACK_URL + "fenghuolangyan2.jpg");
        IconUtil.setImg(sf.mapBg3, Enum_Path.BACK_URL + "fenghuolangyan3.jpg");
        IconUtil.setImg(sf.n40, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/tazi.png");
        IconUtil.setImg(sf.n20, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/tazi.png");
        IconUtil.setImg(sf.n23, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/tazi.png");
    };
    FengHuoMap.prototype.exite = function () {
        var sf = this;
        IconUtil.setImg(sf.mapBg1, null);
        IconUtil.setImg(sf.mapBg2, null);
        IconUtil.setImg(sf.mapBg3, null);
        IconUtil.setImg(sf.n40, null);
        IconUtil.setImg(sf.n20, null);
        IconUtil.setImg(sf.n23, null);
        for (var i = 1; i < 11; i++) {
            sf.cityDic[i].resetView();
        }
    };
    FengHuoMap.URL = "ui://edvdots4heu9w1q";
    return FengHuoMap;
}(fairygui.GComponent));
__reflect(FengHuoMap.prototype, "FengHuoMap");
