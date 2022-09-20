package com.teamtop.util.regexUtil;

import java.util.regex.Pattern;
/**
 * 正则表达式工具
 * @author yxh
 *
 */
public class RegexUtil {
	
	/**
	 * 判断一个字符串只能是字母或数字且已数字结尾
	 * @param str
	 * @return true 合法 false 不合法
	 */
	public static boolean validateNumChar(String str){
		return Pattern.matches("^[A-Za-z0-9]+[A-Za-z0-9]$", str);
	}
	
	
	public static void main(String[] args) {
		System.out.println(validateNumChar("101（*……*……*（（（00"));
	}

}
