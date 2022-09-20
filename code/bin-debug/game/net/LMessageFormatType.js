var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LMessageFormatType = (function () {
    function LMessageFormatType() {
    }
    LMessageFormatType.NULL = 0;
    //基础数据类型
    LMessageFormatType.INT8 = 1;
    LMessageFormatType.INT32 = 2;
    LMessageFormatType.INT64 = 3;
    LMessageFormatType.INT16 = 4;
    LMessageFormatType.FLOAT32 = 11;
    LMessageFormatType.BOOLEAN = 6;
    LMessageFormatType.UTF8 = 20;
    //组合类型
    LMessageFormatType.ARRAY = 30;
    LMessageFormatType.STR_OBJECT_MAP = 40;
    LMessageFormatType.BYTE_OBJECT_MAP = 41;
    LMessageFormatType.BYTE_ARRAY = 50;
    LMessageFormatType.AMF_BYTES = 60;
    LMessageFormatType.BITMAPDATA = 70;
    LMessageFormatType.COMPRESSBITMAPDATA = 71;
    return LMessageFormatType;
}());
__reflect(LMessageFormatType.prototype, "LMessageFormatType");
