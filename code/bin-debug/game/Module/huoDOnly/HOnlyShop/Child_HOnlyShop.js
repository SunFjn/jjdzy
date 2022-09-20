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
var Child_HOnlyShop = (function (_super) {
    __extends(Child_HOnlyShop, _super);
    function Child_HOnlyShop() {
        return _super.call(this) || this;
    }
    Child_HOnlyShop.createInstance = function () {
        return (fairygui.UIPackage.createObject("huoDOnly", "Child_HOnlyShop"));
    };
    Child_HOnlyShop.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
        this.list.setVirtual();
    };
    Object.defineProperty(Child_HOnlyShop, "instance", {
        get: function () {
            if (Child_HOnlyShop._instance == null) {
                Child_HOnlyShop._instance = (fairygui.UIPackage.createObject("huoDOnly", "Child_HOnlyShop"));
            }
            return Child_HOnlyShop._instance;
        },
        enumerable: true,
        configurable: true
    });
    Child_HOnlyShop.prototype.disposePanel = function () {
        var s = this;
        if (s.parent) {
            s.parent.removeChild(s);
        }
        GGlobal.control.remove(Enum_MsgType.HUOD_ONLY_Shop_UI, s.update, s);
        Timer.instance.remove(s.updateX, s);
        s.list.numItems = 0;
        IconUtil.setImg(this.imgHeadbg, null);
    };
    Child_HOnlyShop.prototype.show = function (p, act) {
        var s = this;
        this._act = act;
        p.addChild(s);
        s.setXY(0, 275);
        GGlobal.control.listen(Enum_MsgType.HUOD_ONLY_Shop_UI, s.update, s);
        Timer.instance.listen(s.updateX, s, 1000);
        // ImageLoader.instance.loader(Enum_Path.PIC_URL + "zs" + Config.zshd_315[s._act.index].icon + ".jpg", this.imgHeadbg);
        IconUtil.setImg(this.imgHeadbg, Enum_Path.PIC_URL + "zs" + Config.zshd_315[this._act.index].bg + ".jpg");
        s.update();
        GGlobal.modelHuoDOnly.CG_OPEN_UI(act.id);
        s.labTips.text = Config.zshdb_315[act.id].nr;
    };
    Child_HOnlyShop.prototype.update = function () {
        this._listData = Model_HuoDOnly.getshopArr(this._act.id);
        if (!this._listData) {
            this._listData = [];
        }
        this._listData.sort(function (a, b) { return a.pos - b.pos; });
        this.list.numItems = this._listData.length;
    };
    Child_HOnlyShop.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.setVo(this._listData[index], this._act);
    };
    Child_HOnlyShop.prototype.updateX = function () {
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
    Child_HOnlyShop.URL = "ui://mk3gp0vrujy07";
    return Child_HOnlyShop;
}(fairygui.GComponent));
__reflect(Child_HOnlyShop.prototype, "Child_HOnlyShop");
