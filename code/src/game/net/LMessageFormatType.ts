class LMessageFormatType {
	public static NULL: number = 0;
	//基础数据类型
	public static INT8: number = 1;
	public static INT32: number = 2;
	public static INT64: number = 3;
	public static INT16: number = 4;
	public static FLOAT32: number = 11;

	public static BOOLEAN: number = 6;

	public static UTF8: number = 20;
	//组合类型
	public static ARRAY: number = 30;
	public static STR_OBJECT_MAP: number = 40;
	public static BYTE_OBJECT_MAP: number = 41;

	public static BYTE_ARRAY: number = 50;

	public static AMF_BYTES: number = 60;
	public static BITMAPDATA: number = 70;
	public static COMPRESSBITMAPDATA: number = 71;
	public constructor() {

	}
}