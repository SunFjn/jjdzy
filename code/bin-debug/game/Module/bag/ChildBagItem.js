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
var ChildBagItem = (function (_super) {
    __extends(ChildBagItem, _super);
    function ChildBagItem() {
        return _super.call(this) || this;
    }
    ChildBagItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("bag", "ChildBagItem"));
    };
    ChildBagItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.dataList = (this.getChild("dataList"));
        this.dataList.callbackThisObj = this;
        this.dataList.itemRenderer = this.renderHandle;
        this.dataList.setVirtual();
    };
    ChildBagItem.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildBagItem.prototype.openPanel = function (pData) {
        this.update(pData);
    };
    ChildBagItem.prototype.closePanel = function (pData) {
        this.removeListen();
    };
    ChildBagItem.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.grid.gridSource = 2;
        item.vo = this._sortList[index];
    };
    //type 0道具  1宝石
    ChildBagItem.prototype.update = function (type) {
        this._sortList = this.sort(type);
        this._sortList.length = Math.ceil(this._sortList.length / 5) * 5;
        this.dataList.numItems = Math.max(100, this._sortList.length);
        // this.dataList.scrollToView(0);
    };
    ChildBagItem.prototype.sort = function (type) {
        var ret = [];
        var list;
        if (type == 0) {
            list = Model_Bag.itemList;
        }
        else {
            list = Model_Bag.gemList;
        }
        list.sort(Model_Bag.sortFunc);
        for (var i = 0; i < list.length; i++) {
            var voI = list[i];
            this.addSplitItem(ret, voI);
        }
        return ret;
    };
    //数量超过9999的物品分开格子
    ChildBagItem.prototype.addSplitItem = function (list, vo) {
        if (vo.count > Model_Bag.CONST_MAX_MUL_USE_NUM) {
            var splitLen = Math.floor(vo.count / Model_Bag.CONST_MAX_MUL_USE_NUM);
            var resCount = vo.count % Model_Bag.CONST_MAX_MUL_USE_NUM;
            for (var i = 0; i < splitLen; i++) {
                var loc_vo = VoItem.create(vo.id);
                loc_vo.count = Model_Bag.CONST_MAX_MUL_USE_NUM;
                list.push(loc_vo);
            }
            if (resCount != 0) {
                var loc_vo = VoItem.create(vo.id);
                loc_vo.count = resCount;
                list.push(loc_vo);
            }
        }
        else {
            list.push(vo);
        }
    };
    ChildBagItem.prototype.removeListen = function () {
        this.dataList.numItems = 0;
    };
    //>>>>end
    ChildBagItem.URL = "ui://v4sxjak5etor5";
    return ChildBagItem;
}(fairygui.GComponent));
__reflect(ChildBagItem.prototype, "ChildBagItem", ["IPanel"]);
