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
var ItemLCQSMapDetail = (function (_super) {
    __extends(ItemLCQSMapDetail, _super);
    function ItemLCQSMapDetail() {
        return _super.call(this) || this;
    }
    ItemLCQSMapDetail.createInstance = function () {
        return (fairygui.UIPackage.createObject("zjyw", "ItemLCQSMapDetail"));
    };
    ItemLCQSMapDetail.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.list.itemRenderer = this.rendHander;
        this.list.callbackThisObj = this;
    };
    Object.defineProperty(ItemLCQSMapDetail.prototype, "vo", {
        get: function () {
            return this._vo;
        },
        set: function (v) {
            this._vo = v;
            if (!v) {
                this.visible = false;
                return;
            }
            this.visible = true;
            var index = v.id % 1000;
            this.txtName.text = "第" + StrFilter.getChineseNum(index) + "关";
            //已通关
            var isPass = GGlobal.model_LiuChuQS.curGuan > v.id;
            this.imgPass.visible = isPass;
            // if (index > 4) index = 4;
            IconUtil.setImg(this.imgBg, Enum_Path.GUAN_QIA_URL + "guanqia_" + index + ".png");
            // this.maskBg.visible = GGlobal.model_LiuChuQS.curGuan < v.id
            this.imgBg.grayed = GGlobal.model_LiuChuQS.curGuan < v.id;
            this.lbRew.text = isPass ? "通关奖励" : "首通奖励";
            this.lbRew.color = isPass ? 0x00ff00 : 0xffc334;
            this._rewArr = isPass ? ConfigHelp.makeItemListArr(JSON.parse(v.show)) : ConfigHelp.makeItemListArr(JSON.parse(v.reward));
            this.list.numItems = this._rewArr.length;
        },
        enumerable: true,
        configurable: true
    });
    ItemLCQSMapDetail.prototype.clean = function () {
        _super.prototype.clean.call(this);
        this.list.numItems = 0;
        IconUtil.setImg(this.imgBg, null);
    };
    ItemLCQSMapDetail.prototype.rendHander = function (index, grid) {
        grid.isShowEff = true;
        grid.tipEnabled = true;
        grid.vo = this._rewArr[index];
    };
    ItemLCQSMapDetail.URL = "ui://7a366usasr401m";
    return ItemLCQSMapDetail;
}(fairygui.GButton));
__reflect(ItemLCQSMapDetail.prototype, "ItemLCQSMapDetail");
