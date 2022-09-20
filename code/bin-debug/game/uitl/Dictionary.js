var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Dictionary = (function () {
    function Dictionary() {
        this._values = [];
        this._keys = [];
    }
    Object.defineProperty(Dictionary.prototype, "values", {
        /**
         * 获取所有的子元素列表。
         */
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "keys", {
        /**
         * 获取所有的子元素键名列表。
         */
        get: function () {
            return this._keys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "length", {
        get: function () {
            return this._keys.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 给指定的键名设置值。
     * @param	key 键名。
     * @param	value 值。
     */
    Dictionary.prototype.set = function (key, value) {
        var index = this.indexOf(key);
        if (index >= 0) {
            this._values[index] = value;
            return;
        }
        this._keys.push(key);
        this._values.push(value);
    };
    /**
     * 获取指定对象的键名索引。
     * @param	key 键名对象。
     * @return 键名索引。
     */
    Dictionary.prototype.indexOf = function (key) {
        var index = this._keys.indexOf(key);
        if (index >= 0)
            return index;
        var bool = key instanceof String;
        key = bool ? key : ((key instanceof Number) ? key.toString() : key);
        return this._keys.indexOf(key);
    };
    /**
     * 返回指定键名的值。
     * @param	key 键名对象。
     * @return 指定键名的值。
     */
    Dictionary.prototype.get = function (key) {
        var index = this.indexOf(key);
        return index < 0 ? null : this._values[index];
    };
    /**
     * 移除指定键名的值。
     * @param	key 键名对象。
     * @return 是否成功移除。
     */
    Dictionary.prototype.remove = function (key) {
        var index = this.indexOf(key);
        if (index >= 0) {
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            return true;
        }
        return false;
    };
    /**
     * 清除此对象的键名列表和键值列表。
     */
    Dictionary.prototype.clear = function () {
        this._values.length = 0;
        this._keys.length = 0;
    };
    Dictionary.prototype.contains = function (key) {
        var index = this.indexOf(key);
        return index < 0 ? false : true;
    };
    Dictionary.prototype.shift = function () {
        if (this._keys.length) {
            this._keys.shift();
            return this._values.shift();
        }
        return null;
    };
    //消耗偏大 不可频繁使用
    Dictionary.prototype.sort = function (compareFn) {
        var temp = {};
        var s = this;
        var len = s._values.length;
        for (var i = 0; i < len; i++) {
            temp[s._values[i]] = s._keys[i];
        }
        s._values = s._values.sort(compareFn);
        s._keys = [];
        for (var i = 0; i < len; i++) {
            s._keys.push(temp[s._values[i]]);
        }
        temp = null;
    };
    Dictionary.prototype.cleanNull = function () {
        var len = this.values.length;
        var emptylen = 0;
        var reallen = len;
        var tempindex = 0;
        var lastii = 0;
        for (var i = 0; i < len - emptylen; i++) {
            var term = this.values[i];
            if (!term) {
                if (i == 0 || i > lastii + emptylen) {
                    emptylen++;
                }
                lastii = i;
                for (var ii = i + emptylen; ii < len; ii++) {
                    if (this.values[ii]) {
                        this.values[i] = this.values[ii];
                        this.values[ii] = null;
                        this.keys[i] = this.keys[ii];
                        this.keys[ii] = null;
                        break;
                    }
                    else {
                        emptylen++;
                    }
                }
            }
        }
        this.values.length = len - emptylen;
    };
    return Dictionary;
}());
__reflect(Dictionary.prototype, "Dictionary");
