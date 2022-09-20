var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//此处代码是配合ObjectUtils.getObjectUniqueId()接口使用的，计算对象的唯一id
(function () {
    if (typeof Object['uniqueId'] == "undefined") {
        var uuuid = 0;
        Object['uniqueId'] = function (o) {
            if (typeof o.__uniqueid == "undefined") {
                Object.defineProperty(o, "__uniqueid", {
                    value: ++uuuid,
                    enumerable: false,
                    // This could go either way, depending on your 
                    // interpretation of what an "id" is
                    writable: false
                });
            }
            return o.__uniqueid;
        };
    }
})();
/**
 * 对象工具类
 * @author:will
 */
var ObjectUtils = (function () {
    function ObjectUtils() {
    }
    /**
     * 深度克隆对象
     * @param obj 来源对象
     * @param targetObj 目标对象  如果不传则创建新对象 否则克隆数据
     */
    ObjectUtils.clone = function (obj, targetObj) {
        var newObj;
        if (targetObj) {
            newObj = targetObj;
        }
        else {
            newObj = {};
        }
        for (var key in obj) {
            var val = obj[key];
            newObj[key] = typeof val === 'object' ? ObjectUtils.clone(val) : val;
        }
        return newObj;
    };
    /**
     * 修改Object属性
     * @param  {Object} pTargetObj 目标对象
     * @param  {Object} pSourceObj 来源对象
     * @returns boolean
     */
    ObjectUtils.modifyObject = function (pTargetObj, pSourceObj) {
        if (!pTargetObj || !pSourceObj)
            return false;
        var t_change = false;
        for (var k in pSourceObj) {
            try {
                if (pTargetObj[k] != pSourceObj[k]) {
                    pTargetObj[k] = pSourceObj[k];
                    t_change = true;
                }
            }
            catch (error) {
            }
        }
        return t_change;
    };
    /**
     * 获取目标对象内置唯一id
     * @param pObj 目标对象（对象可以是任意对象，包括Function）
     */
    ObjectUtils.getObjectUniqueId = function (pObj) {
        return Object['uniqueId'](pObj);
    };
    return ObjectUtils;
}());
__reflect(ObjectUtils.prototype, "ObjectUtils");
