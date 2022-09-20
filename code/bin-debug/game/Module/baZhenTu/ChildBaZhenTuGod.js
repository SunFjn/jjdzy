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
var ChildBaZhenTuGod = (function (_super) {
    __extends(ChildBaZhenTuGod, _super);
    function ChildBaZhenTuGod() {
        return _super.call(this) || this;
    }
    ChildBaZhenTuGod.createInstance = function () {
        return (fairygui.UIPackage.createObject("baZhenTu", "ChildBaZhenTuGod"));
    };
    ChildBaZhenTuGod.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderHander;
        s.list.setVirtual();
    };
    ChildBaZhenTuGod.prototype.open = function () {
        var s = this;
        var m = GGlobal.modelBaZhenTu;
        s._lisDat = m.getbztsf();
        IconUtil.setImg(s.imgBg, Enum_Path.BAZHENTU_URL + "bg3.jpg");
        m.listen(Model_BaZhenTu.BUY_GOD, s.upView, s);
        s.upView();
    };
    ChildBaZhenTuGod.prototype.upView = function () {
        var s = this;
        s.list.numItems = s._lisDat.length;
        if (!s._it) {
            s._it = VoItem.create(Model_BaZhenTu.GODid);
            s.labChip.setImgUrl(s._it.icon);
        }
        var ct = Model_Bag.getItemCount(Model_BaZhenTu.GODid);
        s.labChip.setCount(ct);
        s.labChip.color = Color.WHITEINT;
    };
    ChildBaZhenTuGod.prototype.close = function () {
        var s = this;
        var m = GGlobal.modelBaZhenTu;
        s.list.numItems = 0;
        IconUtil.setImg(s.imgBg, null);
        m.remove(Model_BaZhenTu.BUY_GOD, s.upView, s);
    };
    ChildBaZhenTuGod.prototype.renderHander = function (index, obj) {
        var gird = obj;
        gird.vo = this._lisDat[index];
    };
    ChildBaZhenTuGod.URL = "ui://xrzn9ppairzj2b";
    return ChildBaZhenTuGod;
}(fairygui.GComponent));
__reflect(ChildBaZhenTuGod.prototype, "ChildBaZhenTuGod");
