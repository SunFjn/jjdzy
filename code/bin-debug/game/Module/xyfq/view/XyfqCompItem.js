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
 * @author: lujiahao
 * @date: 2020-04-10 10:24:50
 */
var XyfqCompItem = (function (_super) {
    __extends(XyfqCompItem, _super);
    function XyfqCompItem() {
        return _super.call(this) || this;
    }
    XyfqCompItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("xyfq", "XyfqCompItem"));
    };
    XyfqCompItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.numCom.btnMin.visible = false;
        t.numCom.btnMax.visible = false;
        t.numCom.minValue = 1;
    };
    //=========================================== API ==========================================
    XyfqCompItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        var t_model = GGlobal.modelXyfq;
        if (pData) {
            t.registerEvent(true);
            t.itemCur.setData(pData);
            var t_qianItem = pData.needQainItem;
            var t_consumeItem = pData.compConsume;
            var t_qianVo = t_model.getQianVoById(t_qianItem.id);
            t.itemNeed.setData(t_qianVo);
            var t_bagCount = t_qianVo.count;
            var t_maxComp = ~~(t_bagCount / t_qianItem.count);
            if (t_maxComp > 0) {
                t.numCom.maxValue = t_maxComp;
            }
            else {
                t.numCom.maxValue = 1;
            }
            t.numCom.value = 1;
            t.refreshConsume();
            var t_nameNeed = FastAPI.getItemName(t_qianItem.id, true);
            var t_nameCur = FastAPI.getItemName(pData.id, true);
            t.tfDes.text = t_qianItem.count + "\u4E2A" + t_nameNeed + "\u53EF\u5408\u62101\u4E2A" + t_nameCur;
        }
        else {
            t.registerEvent(false);
            t.itemCur.clean();
        }
    };
    XyfqCompItem.prototype.clean = function () {
        this.setData(null);
        _super.prototype.clean.call(this);
    };
    XyfqCompItem.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //===================================== private method =====================================
    XyfqCompItem.prototype.refreshConsume = function () {
        var t = this;
        if (!t._curData)
            return;
        var t_model = GGlobal.modelXyfq;
        var pData = t._curData;
        var t_qianItem = pData.needQainItem;
        var t_consumeItem = pData.compConsume;
        var t_qianVo = t_model.getQianVoById(t_qianItem.id);
        var t_bagCount = t_qianVo.count;
        var t_needQainCount = t.numCom.value * t_qianItem.count;
        t.pgNeed.max = t_needQainCount;
        t.pgNeed.value = t_bagCount;
        var t_color = Color.GREENSTR;
        if (t_needQainCount > t_bagCount)
            t_color = Color.REDSTR;
        t.pgNeed.text = HtmlUtil.font(t_bagCount + "/" + t_needQainCount, t_color);
        t.resCom.setItemId(pData.compConsume.id);
        t_bagCount = FastAPI.getItemCount(pData.compConsume.id);
        t_color = Color.GREENSTR;
        var t_need = pData.compConsume.count * t.numCom.value;
        if (t_need > t_bagCount)
            t_color = Color.REDSTR;
        var t_strCon = HtmlUtil.font(t_bagCount + "/" + t_need, t_color);
        t.resCom.setCount(t_strCon);
        t.btnOpen.noticeImg.visible = pData.checkCanComp(false, t.numCom.value);
    };
    XyfqCompItem.prototype.registerEvent = function (pFlag) {
        var t = this;
        EventUtil.register(pFlag, t.btnOpen, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.numCom, egret.Event.CHANGE, t.onValueChange, t);
    };
    //======================================== handler =========================================
    XyfqCompItem.prototype.onValueChange = function (e) {
        var t = this;
        if (!t._curData)
            return;
        t.refreshConsume();
    };
    XyfqCompItem.prototype.onBtnClick = function (e) {
        var t = this;
        var t_model = GGlobal.modelXyfq;
        switch (e.currentTarget) {
            case t.btnOpen:
                t_model.CG_LuckSign_getAward_12157(t._curData.id, t.numCom.value);
                break;
        }
    };
    //>>>>end
    XyfqCompItem.URL = "ui://7hwmix0gszt5x";
    return XyfqCompItem;
}(fairygui.GComponent));
__reflect(XyfqCompItem.prototype, "XyfqCompItem");
