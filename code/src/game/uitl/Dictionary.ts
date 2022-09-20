class Dictionary {
    constructor() {
    }

    private _values: any[] = [];
    private _keys: any[] = [];

    /**
     * 获取所有的子元素列表。
     */
    public get values(): any[] {
        return this._values;
    }

    /**
     * 获取所有的子元素键名列表。
     */
    public get keys(): any[] {
        return this._keys;
    }

    public get length(): number {
        return this._keys.length;
    }

    /**
     * 给指定的键名设置值。
     * @param	key 键名。
     * @param	value 值。
     */
    public set(key: any, value: any): void {
        var index: number = this.indexOf(key);
        if (index >= 0) {
            this._values[index] = value;
            return;
        }
        this._keys.push(key);
        this._values.push(value);
    }

    /**
     * 获取指定对象的键名索引。
     * @param	key 键名对象。
     * @return 键名索引。
     */
    public indexOf(key: Object): number {
        var index: number = this._keys.indexOf(key);
        if (index >= 0) return index;
        var bool: Boolean = key instanceof String;
        key = bool ? <number>key : ((key instanceof Number) ? key.toString() : key);
        return this._keys.indexOf(key);
    }

    /**
     * 返回指定键名的值。
     * @param	key 键名对象。
     * @return 指定键名的值。
     */
    public get(key: any): any {
        var index: number = this.indexOf(key);
        return index < 0 ? null : this._values[index];
    }

    /**
     * 移除指定键名的值。
     * @param	key 键名对象。
     * @return 是否成功移除。
     */
    public remove(key: any): Boolean {
        var index: number = this.indexOf(key);
        if (index >= 0) {
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * 清除此对象的键名列表和键值列表。
     */
    public clear(): void {
        this._values.length = 0;
        this._keys.length = 0;
    }

    public contains(key: Object): Boolean {
        var index: number = this.indexOf(key);
        return index < 0 ? false : true;
    }

    public shift(): any {
        if (this._keys.length) {
            this._keys.shift();
            return this._values.shift();
        }
        return null;
    }

    //消耗偏大 不可频繁使用
    public sort(compareFn) {
        let temp = {};
        let s = this;
        let len = s._values.length;
        for (let i = 0; i < len; i++) {
            temp[s._values[i]] = s._keys[i];
        }
        s._values = s._values.sort(compareFn);
        s._keys = [];
        for (let i = 0; i < len; i++) {
            s._keys.push(temp[s._values[i]]);
        }
        temp = null;
    }

    public cleanNull() {
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
                    } else {
                        emptylen++;
                    }
                }
            }
        }
        this.values.length = len - emptylen;
    }
}