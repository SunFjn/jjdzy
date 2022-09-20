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
var TaskItemCom = (function (_super) {
    __extends(TaskItemCom, _super);
    function TaskItemCom() {
        return _super.call(this) || this;
    }
    TaskItemCom.createInstance = function () {
        return (fairygui.UIPackage.createObject("actHolyBeast", "TaskItemCom"));
    };
    TaskItemCom.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    //=========================================== API ==========================================
    TaskItemCom.prototype.setData = function (pVo) {
        this.vo = pVo;
        if (pVo) {
            this.tfName.text = HtmlUtil.font(pVo.name, pVo.qColor);
            this.tfValue.text = pVo.count + "";
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + pVo.icon + ".png", this.imageIcon);
            EventUtil.register(true, this.imageIcon, egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
        }
        else {
        }
    };
    TaskItemCom.prototype.dispose = function () {
        EventUtil.register(false, this.imageIcon, egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    TaskItemCom.prototype.onIconClick = function (e) {
        if (this.vo) {
            FastAPI.showItemTips(this.vo);
        }
    };
    //>>>>end
    TaskItemCom.URL = "ui://jvxpx9emo8ip29";
    return TaskItemCom;
}(fairygui.GComponent));
__reflect(TaskItemCom.prototype, "TaskItemCom");
