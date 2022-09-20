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
var ItemLCQSMap = (function (_super) {
    __extends(ItemLCQSMap, _super);
    function ItemLCQSMap() {
        return _super.call(this) || this;
    }
    ItemLCQSMap.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "ItemLCQSMap"));
    };
    ItemLCQSMap.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.loader = (this.getChild("loader"));
        this.item = (this.getChild("item"));
    };
    ItemLCQSMap.prototype.setVo = function (guan, selId) {
        this._guan = guan;
        this.item.vo = guan;
        this.addLister();
        if (guan && guan.id == selId) {
            this.item.selected = true;
        }
        else {
            this.item.selected = false;
        }
        var index = ((guan.id % 1000) - 1) % 3;
        this._bgUrl = Enum_Path.GUAN_QIA_URL + "lcqsMap" + index + ".jpg";
        ImageLoader.instance.loader(this._bgUrl, this.loader);
        // IconUtil.setImg(this.loader, this._bgUrl);
        if (index == 0) {
            this.item.y = 38;
        }
        else if (index == 1) {
            this.item.y = 105;
        }
        else {
            this.item.y = 70;
        }
    };
    ItemLCQSMap.prototype.addLister = function () {
        GGlobal.model_LiuChuQS.listen(Model_LiuChuQS.guan_sel, this.upSel, this);
        this.item.addClickListener(this.selectPage, this);
    };
    ItemLCQSMap.prototype.removeLister = function () {
        // IconUtil.setImg(this.loader, this._bgUrl);
        this.loader.texture = null;
        this.item.clean();
        this.item.removeClickListener(this.selectPage, this);
        GGlobal.model_LiuChuQS.remove(Model_LiuChuQS.guan_sel, this.upSel, this);
    };
    ItemLCQSMap.prototype.selectPage = function (e) {
        var target = e.currentTarget;
        var v = target.vo;
        if (GGlobal.model_LiuChuQS.curGuan < v.id) {
            ViewCommonWarn.text("需要通关前一关卡");
            target.selected = false;
            return;
        }
        var arr = GGlobal.model_LiuChuQS.teamMyArr;
        if (arr.length > 0 && arr[0].guan != v.id) {
            ViewCommonWarn.text("退出组队才能更换关卡");
            target.selected = false;
            return;
        }
        GGlobal.model_LiuChuQS.notify(Model_LiuChuQS.guan_sel, v.id);
        GGlobal.model_LiuChuQS.notify(Model_LiuChuQS.guan_sel_msg, v.id);
    };
    ItemLCQSMap.prototype.upSel = function (id) {
        if (this._guan && this._guan.id == id) {
            this.item.selected = true;
        }
        else {
            this.item.selected = false;
        }
    };
    ItemLCQSMap.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.removeLister();
    };
    ItemLCQSMap.URL = "ui://7a366usasr401l";
    return ItemLCQSMap;
}(fairygui.GComponent));
__reflect(ItemLCQSMap.prototype, "ItemLCQSMap");
