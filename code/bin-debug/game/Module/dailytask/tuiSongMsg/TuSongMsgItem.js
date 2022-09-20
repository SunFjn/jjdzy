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
var TuSongMsgItem = (function (_super) {
    __extends(TuSongMsgItem, _super);
    function TuSongMsgItem() {
        return _super.call(this) || this;
    }
    TuSongMsgItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("dailytask", "TuSongMsgItem"));
    };
    TuSongMsgItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.c1 = this.getController("c1");
        this.lb = (this.getChild("lb"));
        this.list = (this.getChild("list"));
        this.check0 = (this.getChild("check0"));
        this.check1 = (this.getChild("check1"));
        var s = this;
        s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.selectP, s);
        s.list.addEventListener(fairygui.ItemEvent.CLICK, s.onList, s);
        s.list.callbackThisObj = s;
        s.list.itemRenderer = s.renderHander;
    };
    Object.defineProperty(TuSongMsgItem.prototype, "vo", {
        set: function (v) {
            var s = this;
            s._vo = v;
            this.lb.text = v.cfg.name;
            s.c1.selectedIndex = v.status == 0 ? 1 : 0;
            if (this._vo.arr.length > 1 && this._vo.cfg.hb == 0) {
                s.list.numItems = this._vo.arr.length;
                s.list.height = Math.ceil(this._vo.arr.length / 2) * 44;
                s.height = this.list.y + this.list.height - 10;
                s.list.visible = true;
                this.check0.visible = false;
                this.check1.visible = false;
            }
            else {
                s.list.numItems = 0;
                s.list.visible = false;
                s.height = 48;
                this.check0.visible = true;
                this.check1.visible = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    TuSongMsgItem.prototype.selectP = function () {
        var st = this.c1.selectedIndex == 0 ? 1 : 0;
        this._vo.status = st;
        if (this._vo.cfg.hb == 1) {
            for (var i = 0; i < this._vo.arr.length; i++) {
                this._vo.arr[i].status = st;
            }
        }
        GGlobal.modelactPreView.notify(ModelActPreView.msg_tsmsg_cge);
    };
    TuSongMsgItem.prototype.onList = function (evt) {
        var item = evt.itemObject;
        var v = item.data;
        v.status = item.selected ? 1 : 0;
        GGlobal.modelactPreView.notify(ModelActPreView.msg_tsmsg_cge);
    };
    TuSongMsgItem.prototype.renderHander = function (index, render) {
        render.text = "  " + this._vo.arr[index].cfg.time1;
        render.data = this._vo.arr[index];
        render.selected = this._vo.arr[index].status ? true : false;
    };
    TuSongMsgItem.URL = "ui://b3p8szvvq2i92o";
    return TuSongMsgItem;
}(fairygui.GComponent));
__reflect(TuSongMsgItem.prototype, "TuSongMsgItem");
