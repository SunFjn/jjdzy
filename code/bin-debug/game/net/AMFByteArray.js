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
/**AMF readObject by wzr*/ var AMFByteArray = (function (_super) {
    __extends(AMFByteArray, _super);
    function AMFByteArray(buffer, bufferExtSize) {
        var _this = _super.call(this, buffer, bufferExtSize) || this;
        _this.UNDEFINED_TYPE = 0;
        _this.NULL_TYPE = 1;
        _this.FALSE_TYPE = 2;
        _this.TRUE_TYPE = 3;
        _this.INTEGER_TYPE = 4;
        _this.DOUBLE_TYPE = 5;
        _this.STRING_TYPE = 6;
        _this.XML_TYPE = 7;
        _this.DATE_TYPE = 8;
        _this.ARRAY_TYPE = 9;
        _this.OBJECT_TYPE = 10;
        _this.AVMPLUSXML_TYPE = 11;
        _this.BYTEARRAY_TYPE = 12;
        _this.EMPTY_STRING = "";
        return _this;
    }
    AMFByteArray.prototype.readObject = function () {
        this._strTable = [];
        this._objTable = [];
        this._traitsTable = [];
        return this.readObject2();
    };
    AMFByteArray.prototype.readObject2 = function () {
        var type = this.readByte();
        return this.readObjectValue(type);
    };
    AMFByteArray.prototype.readInterger = function () {
        var i = this.readUInt29();
        // Symmetric with writing an integer to fix sign bits for negative values...
        i = (i << 3) >> 3;
        return parseInt(i + "");
    };
    AMFByteArray.prototype.readObjectValue = function (type) {
        var value;
        switch (type) {
            case this.NULL_TYPE:
                break;
            case this.STRING_TYPE:
                value = this.__readString();
                break;
            case this.INTEGER_TYPE:
                value = this.readInterger();
                break;
            case this.FALSE_TYPE:
                value = false;
                break;
            case this.TRUE_TYPE:
                value = true;
                break;
            case this.OBJECT_TYPE:
                value = this.readScriptObject();
                break;
            case this.ARRAY_TYPE:
                value = this.readArray();
                break;
            case this.DOUBLE_TYPE:
                value = this.readDouble();
                break;
            case this.BYTEARRAY_TYPE:
                value = this.readByteArray();
                break;
            default:
                // Unknown object type tag {type}
                console.log("Unknown object type tag!!!" + type);
        }
        return value;
    };
    AMFByteArray.prototype.readByteArray = function () {
        var ref = this.readUInt29();
        if ((ref & 1) == 0) {
            return this.getObjRef(ref >> 1);
        }
        else {
            var len = (ref >> 1);
            var ba = new AMFByteArray();
            this._objTable.push(ba);
            this.readBytes(ba, 0, len);
            return ba;
        }
    };
    AMFByteArray.prototype.readArray = function () {
        var ref = this.readUInt29();
        if ((ref & 1) == 0) {
            return this.getObjRef(ref >> 1);
        }
        var obj = null;
        var count = (ref >> 1);
        var propName;
        for (;;) {
            propName = this.__readString();
            if (propName == null || propName.length == 0)
                break;
            if (obj == null) {
                obj = {};
                this._objTable.push(obj);
            }
            obj[propName] = this.readObject2();
        }
        if (obj == null) {
            obj = [];
            this._objTable.push(obj);
            var i = 0;
            for (i = 0; i < count; i++) {
                obj.push(this.readObject2());
            }
        }
        else {
            for (i = 0; i < count; i++) {
                obj[i.toString()] = this.readObject2();
            }
        }
        //_objTable.push(obj);
        return obj;
    };
    AMFByteArray.prototype.readScriptObject = function () {
        var ref = this.readUInt29();
        if ((ref & 1) == 0) {
            return this.getObjRef(ref >> 1);
        }
        else {
            var objref = this.readTraits(ref);
            var className = objref.className;
            var externalizable = objref.externalizable;
            var obj;
            var propName;
            var pros = objref.propoties;
            // if (className && className != "") {
            // 	var rst: any = ClassUtils.getRegClass(className);
            // 	if (rst) {
            // 		obj = new rst();
            // 	} else {
            // 		obj = {};
            // 	}
            // } else {
            console.log("className" + className);
            obj = {};
            // }
            this._objTable.push(obj);
            if (pros) {
                for (var d = 0; d < pros.length; d++) {
                    obj[pros[d]] = this.readObject2();
                }
            }
            if (objref.dynamic) {
                for (;;) {
                    propName = this.__readString();
                    if (propName == null || propName.length == 0)
                        break;
                    obj[propName] = this.readObject2();
                }
            }
            return obj;
        }
    };
    AMFByteArray.prototype.getStrRef = function (ref) {
        return this._strTable[ref];
    };
    AMFByteArray.prototype.getObjRef = function (ref) {
        return this._objTable[ref];
    };
    AMFByteArray.prototype.__readString = function () {
        var ref = this.readUInt29();
        if ((ref & 1) == 0) {
            return this.getStrRef(ref >> 1);
        }
        var len = (ref >> 1);
        // writeString() special cases the empty string
        // to avoid creating a reference.
        if (0 == len) {
            return this.EMPTY_STRING;
        }
        var str = this.readUTFBytes(len);
        this._strTable.push(str);
        return str;
    };
    AMFByteArray.prototype.readTraits = function (ref) {
        var ti;
        if ((ref & 3) == 1) {
            ti = this.getTraitReference(ref >> 2);
            return ti.propoties ? ti : { obj: {} };
        }
        else {
            var externalizable = ((ref & 4) == 4);
            var isDynamic = ((ref & 8) == 8);
            var count = (ref >> 4); /* uint29 */
            var className = this.__readString();
            ti = {};
            ti.className = className;
            ti.propoties = [];
            ti.dynamic = isDynamic;
            ti.externalizable = externalizable;
            //ti.obj={};
            if (count > 0) {
                for (var i = 0; i < count; i++) {
                    var propName = this.__readString();
                    ti.propoties.push(propName);
                }
            }
            this._traitsTable.push(ti);
            //todo LIST
            return ti;
        }
    };
    /**
         * AMF 3 represents smaller integers with fewer bytes using the most
         * significant bit of each byte. The worst case uses 32-bits
         * to represent a 29-bit number, which is what we would have
         * done with no compression.
         * <pre>
         * 0x00000000 - 0x0000007F : 0xxxxxxx
         * 0x00000080 - 0x00003FFF : 1xxxxxxx 0xxxxxxx
         * 0x00004000 - 0x001FFFFF : 1xxxxxxx 1xxxxxxx 0xxxxxxx
         * 0x00200000 - 0x3FFFFFFF : 1xxxxxxx 1xxxxxxx 1xxxxxxx xxxxxxxx
         * 0x40000000 - 0xFFFFFFFF : throw range exception
         * </pre>
         *
         * @return A int capable of holding an unsigned 29 bit integer.
         * @throws IOException
         * @exclude
         */
    AMFByteArray.prototype.readUInt29 = function () {
        var value;
        // Each byte must be treated as unsigned
        var b = this.readByte() & 0xFF;
        if (b < 128) {
            return b;
        }
        value = (b & 0x7F) << 7;
        b = this.readByte() & 0xFF;
        if (b < 128) {
            return (value | b);
        }
        value = (value | (b & 0x7F)) << 7;
        b = this.readByte() & 0xFF;
        if (b < 128) {
            return (value | b);
        }
        value = (value | (b & 0x7F)) << 8;
        b = this.readByte() & 0xFF;
        return (value | b);
    };
    /**
     * @exclude
    */
    AMFByteArray.prototype.getTraitReference = function (ref) {
        return this._traitsTable[ref];
    };
    AMFByteArray.prototype.writeObject = function () {
    };
    return AMFByteArray;
}(BaseBytes));
__reflect(AMFByteArray.prototype, "AMFByteArray");
