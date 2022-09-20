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
/**
 * 合服活动-充值返利
 */
var Child_HeFu_CZFL = (function (_super) {
    __extends(Child_HeFu_CZFL, _super);
    function Child_HeFu_CZFL() {
        return _super.call(this) || this;
    }
    Child_HeFu_CZFL.createInstance = function () {
        return (fairygui.UIPackage.createObject("hefuAct", "Child_HeFu_CZFL"));
    };
    Child_HeFu_CZFL.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    Child_HeFu_CZFL.setExtends = function () {
        var f = fairygui.UIObjectFactory.setPackageItemExtension;
        f(HeFu_CZFL_Item.URL, HeFu_CZFL_Item);
    };
    Child_HeFu_CZFL.prototype.initView = function (pParent) {
        var self = this;
        self.list.itemRenderer = self.renderHandle;
        self.list.callbackThisObj = self;
        this._tabArr = [];
        for (var i = 0; i < 4; i++) {
            this._tabArr.push((this.getChild("tab" + i)));
        }
    };
    Child_HeFu_CZFL.prototype.openPanel = function (pData) {
        this.y = 264;
        this._act = pData;
        this.show();
        GGlobal.modelActivity.CG_OPENACT(UIConst.HFKH_CZFL);
        GGlobal.reddot.listen(UIConst.HFKH_CZFL, this.checkTab, this);
    };
    Child_HeFu_CZFL.prototype.closePanel = function (pData) {
        this.disposePanel();
    };
    Child_HeFu_CZFL.prototype.dispose = function () {
        this.disposePanel();
        _super.prototype.dispose.call(this);
    };
    /**注销事件 */
    Child_HeFu_CZFL.prototype.disposePanel = function () {
        var self = this;
        Timer.instance.remove(self.upTimer, self);
        self.c1.removeEventListener(fairygui.StateChangeEvent.CHANGE, self.upList, self);
        self.list.numItems = 0;
        IconUtil.setImg(self.bgImg, null);
        GGlobal.control.remove(UIConst.HFKH_CZFL, self.upList, self);
        GGlobal.reddot.remove(UIConst.HFKH_CZFL, self.checkTab, self);
    };
    Child_HeFu_CZFL.prototype.show = function () {
        var self = this;
        Timer.instance.listen(self.upTimer, self, 1000);
        IconUtil.setImg(self.bgImg, Enum_Path.PIC_URL + "chongzhifanli.jpg");
        self.c1.selectedIndex = 0;
        self.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, self.upList, self);
        GGlobal.control.listen(UIConst.HFKH_CZFL, self.upList, self);
    };
    /**
     * 活动时间
     */
    Child_HeFu_CZFL.prototype.upTimer = function () {
        if (this._act) {
            var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
            if (d < 0) {
                this.labTime.text = "剩余时间：已结束";
            }
            else {
                this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d);
            }
        }
        else {
            this.labTime.text = "剩余时间：";
        }
    };
    Child_HeFu_CZFL.prototype.upList = function () {
        var model = GGlobal.model_actCom;
        var index = this.c1.selectedIndex;
        var cfg = Config.hfkhczfl_286[index + 1];
        if (cfg && model.rechargeNum < cfg.cz) {
            this.tipsTxt.text = "活动期间充值（" + model.rechargeNum + "/" + cfg.cz + "）元可激活此返利";
        }
        else {
            this.tipsTxt.text = "已激活";
        }
        this.checkTab();
        this._listData = Model_ActCom.getListData(this.getList(index + 1));
        this.list.numItems = this._listData ? this._listData.length : 0;
        if (this.list.numItems > 0) {
            this.list.scrollToView(0);
        }
    };
    /**
     * 根据索引获取list数据
     */
    Child_HeFu_CZFL.prototype.getList = function (index) {
        var arr = [];
        var m = GGlobal.model_actCom;
        for (var key in m.taskObj) {
            if (Math.floor(Number(key) / 1000) == index) {
                var obj = m.taskObj[key];
                arr.push(obj);
            }
        }
        return arr;
    };
    Child_HeFu_CZFL.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.setVo(this._listData[index]);
    };
    /**
     * 检查每项的红点
     */
    Child_HeFu_CZFL.prototype.checkTab = function () {
        for (var i = 0; i < this._tabArr.length; i++) {
            var btn = this._tabArr[i];
            var arr = this.getList(i + 1);
            var red = false;
            for (var j = 0; j < arr.length; j++) {
                var obj = arr[j];
                if (obj.status == 1) {
                    red = true;
                    break;
                }
            }
            if (btn)
                btn.getChild("noticeImg").visible = red;
        }
    };
    Child_HeFu_CZFL.pkg = "hefuAct";
    Child_HeFu_CZFL.URL = "ui://07jsdu7hqftx2";
    return Child_HeFu_CZFL;
}(fairygui.GComponent));
__reflect(Child_HeFu_CZFL.prototype, "Child_HeFu_CZFL", ["IPanel"]);
