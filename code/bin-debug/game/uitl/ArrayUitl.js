var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ArrayUitl = (function () {
    function ArrayUitl() {
    }
    /**删除数组里面的空内容
     * 请不要传递包含 (0,"")的数组进来，否则回错误删除
    */
    ArrayUitl.cleannull = function (arr) {
        var len = arr.length;
        var emptylen = 0;
        var reallen = len;
        var tempindex = 0;
        if (true) {
            var before = ArrayUitl.caculateLen(arr);
        }
        var lastii = 0;
        for (var i = 0; i < len - emptylen; i++) {
            var term = arr[i];
            if (!term) {
                if (i == 0 || i > lastii + emptylen) {
                    emptylen++;
                }
                lastii = i;
                for (var ii = i + emptylen; ii < len; ii++) {
                    if (arr[ii]) {
                        arr[i] = arr[ii];
                        arr[ii] = null;
                        break;
                    }
                    else {
                        emptylen++;
                    }
                }
            }
        }
        if (true) {
            if (before != len - emptylen) {
                throw new Error("cleannull error");
            }
        }
        arr.length = len - emptylen;
    };
    ArrayUitl.caculateLen = function (arr) {
        var ret = 0;
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i]) {
                ret++;
            }
        }
        return ret;
    };
    /**插入单个数据 */
    ArrayUitl.insert = function (arr, obj, index) {
        for (var i = arr.length; i > index; i--) {
            arr[i] = arr[i - 1];
        }
        arr[index] = obj;
    };
    /**
     * 对一个数组进行分页提取数据
     * @param pPageNum 指定的分页(从1开始)
     * @param pPerPageCount 单页数据容量
     * @param pSourceList 源数据
     * @return
     */
    ArrayUitl.getDataListByPageNum = function (pPageNum, pPerPageCount, pSourceList) {
        if (!pSourceList || pSourceList.length == 0 || pPageNum < 1)
            return [];
        var t_totalPageNum = Math.ceil(pSourceList.length / pPerPageCount);
        if (pPageNum > t_totalPageNum)
            return [];
        var t_startIndex = (pPageNum - 1) * pPerPageCount;
        var t_endIndex = (t_startIndex + pPerPageCount - 1 > pSourceList.length - 1) ? pSourceList.length - 1 : (t_startIndex + pPerPageCount - 1);
        var t_result = [];
        for (var i = t_startIndex; i <= t_endIndex; i++) {
            t_result.push(pSourceList[i]);
        }
        return t_result;
    };
    return ArrayUitl;
}());
__reflect(ArrayUitl.prototype, "ArrayUitl");
