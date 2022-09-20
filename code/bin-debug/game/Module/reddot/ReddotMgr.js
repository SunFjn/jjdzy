var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 红点管理器
 * @author: lujiahao
 * @date: 2018-05-02 10:03:24
 */
var ReddotMgr = (function () {
    function ReddotMgr() {
        this._voMap = {};
        /** 显示id与红点key的映射 */
        this._disUidKeyMap = {};
        //初始化红点归属关系放在这里
        var t = this;
        t.initKey(UIConst.QXZL + "|" + 0, [
            UIConst.QXZL + "|" + 1,
            UIConst.QXZL + "|" + 2,
            UIConst.QXZL + "|" + 3,
            UIConst.QXZL + "|" + 4,
            UIConst.QXZL + "|" + 5,
        ]);
        t.initKey(ReddotEnum.GROUP_QICE, [
            UIConst.QICE_STAR + "",
            UIConst.QICE_LEVEL + "",
            UIConst.QICE_LOTTERY + "",
        ]);
        t.bindSystemId(ReddotEnum.GROUP_QICE, UIConst.QICE_STAR);
        t.initKey(UIConst.ACHIEVEMENT + "|" + 0, [
            UIConst.ACHIEVEMENT + "|" + 1,
            ReddotEnum.VALUE_ACHIEVEMENT_TASK,
            ReddotEnum.VALUE_ACHIEVEMENT_LEVEL,
            ReddotEnum.VALUE_ACHIEVEMENT_REWARD,
        ]);
        t.initKey(UIConst.ACTCOM_CJS + "|" + 0, [
            UIConst.ACTCOM_CJS + "|" + 1,
        ]);
        //幸运福签相关
        t.initKey(UIConst.XYFQ + "|" + 0, [
            UIConst.XYFQ + "|" + 1,
            ReddotEnum.VALUE_XYFQ_CAN_OPEN,
            ReddotEnum.VALUE_XYFQ_CAN_COMP,
            ReddotEnum.GROUP_XYFQ_TASK,
        ]);
        t.initKey(ReddotEnum.GROUP_XYFQ_TASK, [
            ReddotEnum.VALUE_XYFQ_TASK_DAILY,
            ReddotEnum.VALUE_XYFQ_TASK_TOTAL,
        ]);
        t.initKey(UIConst.KFWZ + "|" + 0, [
            UIConst.KFWZ + "|" + 1,
            ReddotEnum.VALUE_KFWZ_BOX_REWARD,
            ReddotEnum.VALUE_KFWZ_REMAIN,
        ]);
        t.initKey(UIConst.LHFB + "|" + 0, [
            UIConst.LHFB + "|" + 1,
        ]);
        t.initKey(UIConst.HORSE_HH + "|" + 0, [
            UIConst.HORSE_HH + "|" + 1,
        ]);
    }
    ReddotMgr.ins = function () {
        if (!this._instance)
            this._instance = new ReddotMgr();
        return this._instance;
    };
    //========================================= 协议相关 ========================================
    //=========================================== API ==========================================
    /**
     * 初始化键关系
     * @param {string} pKey 父节点键
     * @param {string[]} pChildKeys 所属子节点键数组
     * @memberof ReddotManager
     */
    ReddotMgr.prototype.initKey = function (pKey, pChildKeys) {
        var t_parentVo = this.getVoByKey(pKey, true);
        for (var _i = 0, pChildKeys_1 = pChildKeys; _i < pChildKeys_1.length; _i++) {
            var v = pChildKeys_1[_i];
            var t_childVo = this.getVoByKey(v, true);
            if (t_parentVo.childrenVoList.indexOf(t_childVo) < 0) {
                t_parentVo.childrenVoList.push(t_childVo);
            }
            if (t_childVo.parentVoList.indexOf(t_parentVo) < 0) {
                t_childVo.parentVoList.push(t_parentVo);
            }
        }
    };
    /**
     * 绑定系统id
     * @param pKey
     * @param pSysId
     */
    ReddotMgr.prototype.bindSystemId = function (pKey, pSysId) {
        var t_vo = this.getVoByKey(pKey);
        t_vo.systemId = pSysId;
    };
    ReddotMgr.registerEvent = function (flag, pKey, pDis) {
        ReddotMgr.ins().registerEvent(flag, pKey, pDis);
    };
    ReddotMgr.prototype.registerEvent = function (flag, pKey, pDis) {
        var t = this;
        if (flag) {
            t.register(pKey, pDis);
        }
        else {
            t.unregister(pDis);
        }
    };
    /**
     * 注册红点与显示对象的关联（显示对象是ui编辑器里面的红点）
     * @param {string} pKey
     * @param {fairygui.GComponent} pDis
     * @param {number} [pX=0]
     * @param {number} [pY=0]
     * @returns
     * @memberof ReddotManager
     */
    ReddotMgr.prototype.register = function (pKey, pDis) {
        if (!pDis || !pDis.displayObject)
            return;
        var t_uid = ObjectUtils.getObjectUniqueId(pDis);
        var t_oldKey = this._disUidKeyMap[t_uid];
        if (t_oldKey) {
            if (t_oldKey == pKey)
                return;
            else
                this.unregister(pDis); //不同key则先移除与原先的绑定
        }
        var t_vo = this.getVoByKey(pKey, true);
        t_vo.addDis(pDis);
        this._disUidKeyMap[t_uid] = pKey;
    };
    /**
     * 卸载红点与显示对象的关联（应当在界面销毁的时候调用，而不是在关闭界面的时候）
     * @param {string} pKey
     * @param {fairygui.GComponent} pDis
     * @returns
     * @memberof ReddotManager
     */
    ReddotMgr.prototype.unregister = function (pDis) {
        var t_uid = ObjectUtils.getObjectUniqueId(pDis);
        var t_key = this._disUidKeyMap[t_uid];
        var t_vo = this.getVoByKey(t_key);
        if (!t_vo)
            return;
        t_vo.removeDis(pDis);
        delete this._disUidKeyMap[t_uid];
    };
    /**
     * 设置一个红点值
     * @param {string} pKey ReddotEnum有对应枚举
     * @param {(0|1)} pValue 0不显示红点 1显示红点
     * @memberof ReddotManager
     */
    ReddotMgr.prototype.setValue = function (pKey, pValue) {
        var t_vo = this.getVoByKey(pKey, true);
        t_vo.setValue(pValue);
    };
    /**
     * 获取一个红点值
     * @param {string} pKey
     * @returns {number}
     * @memberof ReddotManager
     */
    ReddotMgr.prototype.getValue = function (pKey) {
        var t_vo = this.getVoByKey(pKey);
        if (t_vo) {
            if (t_vo.systemId > 0) {
                if (!ModuleManager.isOpen(t_vo.systemId))
                    return 0;
            }
            // if (!GGlobal.reddot.checkCondition(t_vo.type, t_vo.index))
            //     return 0;
            return t_vo.value;
        }
        return 0;
    };
    /** 是否已经注册过 */
    ReddotMgr.prototype.checkIsRegistered = function (pKey) {
        if (this.getVoByKey(pKey))
            return true;
        else
            return false;
    };
    //===================================== private method =====================================
    /**
     * 通过key获取vo
     * @private
     * @param {string} pKey
     * @param {boolean} [pCreateNew=false] 是否创建新实例 默认不创建
     * @returns {ReddotVo}
     * @memberof ReddotManager
     */
    ReddotMgr.prototype.getVoByKey = function (pKey, pCreateNew) {
        if (pCreateNew === void 0) { pCreateNew = false; }
        if (!pCreateNew)
            return this._voMap[pKey];
        else {
            var t_vo = this._voMap[pKey];
            if (!t_vo) {
                t_vo = new ReddotVo();
                t_vo.key = pKey;
                this._voMap[t_vo.key] = t_vo;
            }
            return t_vo;
        }
    };
    return ReddotMgr;
}());
__reflect(ReddotMgr.prototype, "ReddotMgr");
