package com.teamtop.util.excel;

public class ExcelReaderUtil {
	/**
	 * 忽略的行数
	 */
	public static final int IGNORE_ROW = 0x0;
	public static final int INFO_ROW = 0x4;
	
	/**
	 * 將字符串轉換為float然後再轉換為String，如果非数字，则原封不动地将字符串返回
	 * @param str
	 * @return
	 */
	public static String isNum(String str) {
		try{
			return String.valueOf(Float.parseFloat(str));
		}catch(Exception e) {
			return str;
		}
	}
}
