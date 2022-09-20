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
var ViewGmTip = (function (_super) {
    __extends(ViewGmTip, _super);
    function ViewGmTip() {
        return _super.call(this) || this;
    }
    ViewGmTip.createInstance = function () {
        return (fairygui.UIPackage.createObject("GM", "ViewGmTip"));
    };
    ViewGmTip.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.list = (this.getChild("list"));
        this.list.itemRenderer = this.renderListItem;
        this.list.callbackThisObj = this;
        this.list.addEventListener(fairygui.ItemEvent.CLICK, this.OnGridTouchHandler, this);
    };
    Object.defineProperty(ViewGmTip, "instance", {
        get: function () {
            if (ViewGmTip._instance == null) {
                ViewGmTip._instance = ViewGmTip.createInstance();
            }
            return ViewGmTip._instance;
        },
        enumerable: true,
        configurable: true
    });
    ViewGmTip.prototype.OnGridTouchHandler = function (event) {
        var bt = event.itemObject;
        if (bt != null) {
            if (this.callBack != null) {
                this.callBack.call(this.ctxP, bt.vo);
            }
        }
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    ViewGmTip.prototype.renderListItem = function (index, obj) {
        var item = obj;
        item.vo = this.dataCollect[index];
    };
    ViewGmTip.prototype.show = function (ctx, itemTapCallBack, p, type) {
        if (type === void 0) { type = 0; }
        this.content = ctx;
        this.callBack = itemTapCallBack;
        this.type = type;
        this.update();
        this.ctxP = p;
        this.x = p.parent.x + 100;
        // var maxH = p.parent["contentHeight"];
        // var h = p.y + p.height + this.height;
        // if(h >= maxH) {
        // 	h = p.y - this.height;
        // }
        // if(h < 0) {
        // 	h = 0;
        // }
        this.y = p.parent.y + 50;
        p.parent.parent.addChild(this);
    };
    ViewGmTip.prototype.hide = function () {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    ViewGmTip.prototype.update = function () {
        this.dataCollect = this.getList();
        this.list.numItems = this.dataCollect.length;
    };
    ViewGmTip.prototype.getList = function () {
        var fliterList = [];
        if (this.type == Model_GM.TYPE1_TOOP_EQUIP) {
            var itemLib = Config.daoju_204;
            var equipLib = Config.zhuangbei_204;
            for (var key in itemLib) {
                var itemInfo = itemLib[key];
                var itemName = itemInfo.name;
                var idContent = "" + itemInfo.id;
                if (itemName.indexOf(this.content) != -1 || idContent.indexOf(this.content) != -1) {
                    fliterList.push({ text: itemName, id: idContent });
                    if (fliterList.length >= 5) {
                        break;
                    }
                }
            }
            for (var key in equipLib) {
                var equipInfo = equipLib[key];
                var equipName = equipInfo.n;
                var idContent = "" + equipInfo.id;
                if (equipName.indexOf(this.content) != -1 || idContent.indexOf(this.content) != -1) {
                    fliterList.push({ text: equipName, id: idContent });
                    if (fliterList.length >= 5) {
                        break;
                    }
                }
            }
        }
        else if (this.type == Model_GM.TYPE5_WDTX) {
            fliterList = Model_GM.WEN_DING_TIAN_XIA;
        }
        else if (this.type == Model_GM.TYPE6_HUO_BI) {
            fliterList = Model_GM.HUO_BI_LIST;
        }
        return fliterList;
    };
    ViewGmTip.URL = "ui://vm9a8xq8qm4n4";
    return ViewGmTip;
}(fairygui.GComponent));
__reflect(ViewGmTip.prototype, "ViewGmTip");
