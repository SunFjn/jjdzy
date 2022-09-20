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
var ChildActivityGm = (function (_super) {
    __extends(ChildActivityGm, _super);
    function ChildActivityGm() {
        return _super.call(this) || this;
    }
    ChildActivityGm.createInstance = function () {
        return (fairygui.UIPackage.createObject("GM", "ChildActivityGm"));
    };
    ChildActivityGm.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.btnSend = (this.getChild("btnSend"));
        this.list = (this.getChild("list"));
        this.list.callbackThisObj = this;
        this.list.itemRenderer = this.renderHandler;
        this.btnSend.addClickListener(this.OnSend, this);
    };
    ChildActivityGm.prototype.OnSend = function () {
        var content = "";
        var arr = this.list._children;
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (i == 0) {
                content += item.lbInput.text;
            }
            else {
                content += "_" + item.lbInput.text;
            }
        }
        GGlobal.modelGM.CG_GM_CMD(this.obj.type, this.obj.index, content);
    };
    ChildActivityGm.prototype.renderHandler = function (index, obj) {
        var item = obj;
        item.show(this.obj.title[index], this.obj.text[index]);
    };
    ChildActivityGm.prototype.show = function (obj) {
        this.obj = obj;
        this.list.numItems = obj.title.length;
        this.list.resizeToFit(obj.title.length);
    };
    ChildActivityGm.URL = "ui://vm9a8xq8q8rv9";
    return ChildActivityGm;
}(fairygui.GComponent));
__reflect(ChildActivityGm.prototype, "ChildActivityGm");
