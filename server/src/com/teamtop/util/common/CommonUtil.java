package com.teamtop.util.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeSet;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.crossCommonRank.model.CommonRankModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.TempData;

/**
 * 
 * 类名称：CommonUtils
 * 类描述：常用工具类
 * 创建人：yxh
 * 创建时间：2012-7-16 上午07:43:40
 * 修改备注：
 * @version 1.0.0
 *
 */
public class CommonUtil {
	/**
	 * isInteger(判断传入的对象是否是Integer类型值)
	 * @param data 待判断参数值
	 * @return  boolean
	 * @exception 
	 * @since  1.0.0
	 */
	public static boolean isInteger(Object data){
		if(data==null||"".equals(data))return false;
		String reg = "[\\d]+";
		Pattern  p = Pattern.compile(reg); 
		Matcher  m = p.matcher(data.toString()); 
		return Integer.MAX_VALUE>=Double.parseDouble(data.toString())
		&&m.matches();
	}

	/**
	 * 判断传入的obj是否是float类型的值
	 * @name isFloat
	 * @param data 传入的参数
	 * @return boolean 
	 * @author yxh
	 * @date：2012-7-31 上午07:47:55
	 * @throws 
	 * @version 1.0.0
	 */
	public static boolean isFloat(Object data){
		if(data==null||"".equals(data))return false;
		try{
			Float.parseFloat(data.toString());
		}catch(Exception e){
			return false;
		}
		return true;
	}
	
	/**
	 * 
	 * 判断一个对象值是否在byte的取值范围内
	 * @name isByte
	 * @param data 待验证的对象值
	 * @return 
	 * boolean
	 * @author yxh
	 * @date：2012-7-26 上午01:04:55
	 * @version 1.0.0
	 */
	public static boolean isByte(Object data){
		if(data==null||"".equals(data))return false;
		try{
			Byte.parseByte(data.toString());
		}catch(Exception e){
			return false;
		}
		return true;
	}
	
	
	/**
	 * 
	 * 判断一个对象值是否在short类型的取值范围内
	 * @name isShort
	 * @param data 待验证的对象值
	 * @return 
	 * boolean
	 * @author yxh
	 * @date：2012-7-26 上午01:04:55
	 * @version 1.0.0
	 */
	public static boolean isShort(Object data){
		if(data==null||"".equals(data))return false;
		try{
			Short.parseShort(data.toString());
		}catch(Exception e){
			return false;
		}
		return true;
	}
	
	/**
	 * 判断一个对象值是否在Long类型的取值范围内
	 * @name isLong
	 * @condition 验证时候调用
	 * @param data
	 * @return  boolean
	 * @author yxh
	 * @date：2012-9-10 上午02:55:20
	 * @version 1.0.0
	 */
	public static boolean isLong(Object data){
		if(data==null||"".equals(data))return false;
		try{
			Long.parseLong(data.toString());
		}catch(Exception e){
			return false;
		}
		return true;
	}
	
	/**
	 * 判断传入的obj是否是double类型的值
	 * @name isDouble
	 * @param data 传入的参数
	 * @return boolean 
	 * @author yxh
	 * @date：2012-7-31 上午07:47:55
	 * @throws 
	 * @version 1.0.0
	 */
	public static boolean isDouble(Object data){
		if(data==null||"".equals(data))return false;
		try{
			Double.parseDouble(data.toString());
		}catch(Exception e){
			return false;
		}
		return true;
	}

	public static boolean isBoolean(Object obj) {
		if (obj == null || "".equals(obj))
			return false;
		if (obj instanceof Boolean) {
			return true;
		}
		return false;
	}

	/**
	 * 检测是否基础数值类型（byte,short,int,long;Byte,Short,Integer,Long;boolean,Boolean）
	 */
	public static boolean isBasicType(Object obj) {
		if (obj == null || "".equals(obj))
			return false;
		if (isLong(obj) || isBoolean(obj) || isDouble(obj)) {
			return true;
		}
		return false;
	}

	/**
	 * 判断一个excel获取的字符串是否为空<BR/>
	 * null，0,0.0，空串均为空
	 * @param data
	 * @return ture为不为空
	 */
	public static boolean isStrEmptyFromExcel(String data){
		if(data!=null && !"0.0".equals(data) && !"0".equals(data)&&!"".equals(data)){
			return true;
		}
		return false;
	}
	
	/**
	 * 判断传入字符对象是否为空
	 * 本方法能判断 null、""
	 */
	public static boolean isNull(Object obj){
		return obj==null||"".equals(obj.toString().trim());
	}

	/**
	 * 
	 * 根据传入的时间格式（如：yyyy-MM-dd HH:mm:ss）
	 * 获取当前时间。如果传入的为null获取""
	 * 则会把当前的时间以毫秒形式返回
	 * @name getCurrentTimeByFormat
	 * @param formt
	 * @return String hh:mm:ss
	 * @author yxh
	 * @date：2012-7-26 上午09:00:22
	 * @throws 
	 * @version 1.0.0
	 */
	public static String getCurrentTimeByFormat(String formt){
		SimpleDateFormat sdf=null;
		if(formt==null||"".equals(formt)){
			sdf= new SimpleDateFormat();
		}else{
			sdf= new SimpleDateFormat(formt);
		}
		return sdf.format(new Date());
	}
	
	/**
	 * 转换日期格式并返回字符型日期
	 * @name formatDate
	 * @param formt 格式如："yyyy-MM-dd"
	 * @param date 日期
	 * @return  String 日期字符型
	 * @author yxh
	 * @date：2012-9-18 上午02:48:59
	 * @version 1.0.0
	 */
	public static String formatDate(String formt,Date date){
		if(date==null||formt==null)return null;
		SimpleDateFormat sdf= new SimpleDateFormat(formt);
		return sdf.format(date);
	}
	/*********************************** 身份证验证开始 ****************************************/	
	/**
	 * 身份证号码验证 
	 * 1、号码的结构
	 * 公民身份号码是特征组合码，由十七位数字本体码和一位校验码组成。排列顺序从左至右依次为：六位数字地址码，
	 * 八位数字出生日期码，三位数字顺序码和一位数字校验码。
	 * 2、地址码(前六位数） 
	 * 表示编码对象常住户口所在县(市、旗、区)的行政区划代码，按GB/T2260的规定执行。 
	 * 3、出生日期码（第七位至十四位）
	 * 表示编码对象出生的年、月、日，按GB/T7408的规定执行，年、月、日代码之间不用分隔符。 
	 * 4、顺序码（第十五位至十七位）
	 * 表示在同一地址码所标识的区域范围内，对同年、同月、同日出生的人编定的顺序号，
	 * 顺序码的奇数分配给男性，偶数分配给女性。 
	 * 5、校验码（第十八位数）
	 * （1）十七位数字本体码加权求和公式 S = Sum(Ai * Wi), i = 0, ... , 16 ，先对前17位数字的权求和
	 * Ai:表示第i位置上的身份证号码数字值 Wi:表示第i位置上的加权因子 Wi: 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4
	 * 2 （2）计算模 Y = mod(S, 11) （3）通过模得到对应的校验码 Y: 0 1 2 3 4 5 6 7 8 9 10 校验码: 1 0
	 * X 9 8 7 6 5 4 3 2
	 */

	/**
	 * 功能：身份证的有效验证
	 * @param IDStr 身份证号
	 * @return 有效：返回"" 无效：返回String信息
	 * @throws ParseException
	 */
	public static boolean IDCardValidate(String IDStr) {
		String[] ValCodeArr = { "1", "0", "x", "9", "8", "7", "6", "5", "4",
				"3", "2" };
		String[] Wi = { "7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7",
				"9", "10", "5", "8", "4", "2" };
		String Ai = "";
		// ================ 号码的长度 15位或18位 ================
		if (IDStr.length() != 15 && IDStr.length() != 18) {
			return false;
		}
		// =======================(end)========================

		// ================ 数字 除最后以为都为数字 ================
		if (IDStr.length() == 18) {
			Ai = IDStr.substring(0, 17);
		} else if (IDStr.length() == 15) {
			Ai = IDStr.substring(0, 6) + "19" + IDStr.substring(6, 15);
		}
		if (isNumeric(Ai) == false) {
			return false;
		}
		// =======================(end)========================

		// ================ 出生年月是否有效 ================
		String strYear = Ai.substring(6, 10);// 年份
		String strMonth = Ai.substring(10, 12);// 月份
		String strDay = Ai.substring(12, 14);// 日份
		if (isDate(strYear + "-" + strMonth + "-" + strDay) == false) {
			return false;
		}
		int year = Integer.parseInt(strYear);  
		int month = Integer.parseInt(strMonth);  
		int day = Integer.parseInt(strDay);  
		int size = IDStr.length();
		//18岁
		if (size == 18) {
			return CheckBirthDay( year, month, day);  
		}else if (size == 15){  
			return CheckBirthDay( year, month, day);  
		}     
		
		GregorianCalendar gc = new GregorianCalendar();
		SimpleDateFormat s = new SimpleDateFormat("yyyy-MM-dd");
		try {
			if ((gc.get(Calendar.YEAR) - Integer.parseInt(strYear)) > 150
					|| (gc.getTime().getTime() - s.parse(
							strYear + "-" + strMonth + "-" + strDay).getTime()) < 0) {
				return false;
			}
		} catch (NumberFormatException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		if (Integer.parseInt(strMonth) > 12 || Integer.parseInt(strMonth) == 0) {
			return false;
		}
		if (Integer.parseInt(strDay) > 31 || Integer.parseInt(strDay) == 0) {
			return false;
		}
		// =====================(end)=====================

		// ================ 地区码时候有效 ================
		Hashtable<String,String>  h = GetAreaCode();
		if (h.get(Ai.substring(0, 2)) == null) {
			return false;
		}
		// ==============================================

		// ================ 判断最后一位的值 ================
		int TotalmulAiWi = 0;
		for (int i = 0; i < 17; i++) {
			TotalmulAiWi = TotalmulAiWi
					+ Integer.parseInt(String.valueOf(Ai.charAt(i)))
					* Integer.parseInt(Wi[i]);
		}
		int modValue = TotalmulAiWi % 11;
		String strVerifyCode = ValCodeArr[modValue];
		Ai = Ai + strVerifyCode;

		if (IDStr.length() == 18) {
			if (Ai.equals(IDStr) == false) {
				return false;
			}
		} else {
			return true;
		}
		// =====================(end)=====================
		return true;
	}

	/**
	 * 功能：设置地区编码
	 * @return Hashtable 对象
	 */
	private static Hashtable<String,String> GetAreaCode() {
		Hashtable<String,String>  hashtable = new Hashtable<String,String> ();
		hashtable.put("11", "北京");
		hashtable.put("12", "天津");
		hashtable.put("13", "河北");
		hashtable.put("14", "山西");
		hashtable.put("15", "内蒙古");
		hashtable.put("21", "辽宁");
		hashtable.put("22", "吉林");
		hashtable.put("23", "黑龙江");
		hashtable.put("31", "上海");
		hashtable.put("32", "江苏");
		hashtable.put("33", "浙江");
		hashtable.put("34", "安徽");
		hashtable.put("35", "福建");
		hashtable.put("36", "江西");
		hashtable.put("37", "山东");
		hashtable.put("41", "河南");
		hashtable.put("42", "湖北");
		hashtable.put("43", "湖南");
		hashtable.put("44", "广东");
		hashtable.put("45", "广西");
		hashtable.put("46", "海南");
		hashtable.put("50", "重庆");
		hashtable.put("51", "四川");
		hashtable.put("52", "贵州");
		hashtable.put("53", "云南");
		hashtable.put("54", "西藏");
		hashtable.put("61", "陕西");
		hashtable.put("62", "甘肃");
		hashtable.put("63", "青海");
		hashtable.put("64", "宁夏");
		hashtable.put("65", "新疆");
		hashtable.put("71", "台湾");
		hashtable.put("81", "香港");
		hashtable.put("82", "澳门");
		hashtable.put("91", "国外");
		return hashtable;
	}

	/**
	 * 功能：判断字符串是否为数字
	 * @param str
	 * @return
	 */
	private static boolean isNumeric(String str) {
		Pattern pattern = Pattern.compile("[0-9]*");
		Matcher isNum = pattern.matcher(str);
		if (isNum.matches()) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 功能：判断字符串是否为日期格式
	 * @param str
	 * @return
	 */
	public static boolean isDate(String strDate) {
		Pattern pattern = Pattern
				.compile("^((\\d{2}(([02468][048])|([13579][26]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\\s(((0?[0-9])|([1-2][0-3]))\\:([0-5]?[0-9])((\\s)|(\\:([0-5]?[0-9])))))?$");
		Matcher m = pattern.matcher(strDate);
		if (m.matches()) {
			return true;
		} else {
			return false;
		}
	}
	
	/** 
	 * 判断是否超过18岁  
	 * @param year
	 * @param month
	 * @param day
	 * @return
	 */
	public static boolean  CheckBirthDay(int year,int month,int day){
		GregorianCalendar gc = new GregorianCalendar();
	    int nowYear = gc.get(Calendar.YEAR);  
	    int nowMonth = gc.get(Calendar.MONTH)+1;  
	    int nowDay = gc.get(Calendar.DATE);  
	  
		if ((nowYear - year) < 18) {
			return false;
		} else if ((nowYear - year) == 18) {
			if (nowMonth < month) {
				return false;
			} else if (nowMonth == month) {
				if (nowDay < day) {
					return false;
				}
			}
		}
		return true;
	}
	

/*********************************** 身份证验证结束 ****************************************/

	
	/**
	 * 把int值的obj类型转换为int类型 
	 * 只能用于加载execl缓存的时候调用
	 * @name transforObjtoInto
	 * @param obj 待转化的obj对象
	 * @return int 返回转化后的值  0 表示异常值
	 * @author yxh
	 * @date：2012-8-8 上午08:19:23
	 * @version 1.0.0
	 */
	public static int transforObjtoInt(Object obj){
		try{
			if(obj==null)return 0;
//			return !CommonUtil.isFloat(obj)?0:(int)Float.parseFloat((obj.toString()));
			return Integer.parseInt(obj.toString());
		}catch(Exception e){
			e.printStackTrace();
		}
		return 0;
	}
	
	
	/**
	 * 把byte值的obj类型转换为byte类型
	 * 只能用于加载execl缓存的时候调用
	 * @name transforObjtoByte
	 * @param obj 待转化的obj对象
	 * @return byte 返回转化后的值  0 表示异常值
	 * @author yxh
	 * @date：2012-8-8 上午08:19:23
	 * @version 1.0.0
	 */
	public static byte transforObjtoByte(Object obj){
		if(obj==null) return 0;
		try{
//			return (byte)Float.parseFloat(obj.toString());
			return Byte.parseByte(obj.toString());
		}catch(Exception e){
			e.printStackTrace();
		}
		return 0;
	}
	
	/**
	 * 把long值的obj类型转换为long类型
	 * 只能用于加载execl缓存的时候调用
	 * @name transforObjtoLong
	 * @param obj 待转化的obj对象
	 * @return Long 返回转化后的值  0 表示异常值
	 * @author yxh
	 * @date：2012-8-8 上午08:19:23
	 * @version 1.0.0
	 */
	public static long transforObjtoLong(Object obj){
		if(obj==null) return 0;
		try{
//			return (long)Double.parseDouble(obj.toString());
			return Long.parseLong(obj.toString());
		}catch(Exception e){
			e.printStackTrace();
			return 0;
		}
	}
	
	/**
	 * 把Float值的obj类型转换为float类型
	 * @name transforObjtoFloat
	 * @param obj 待转化的obj对象
	 * @return Float 返回转化后的值  0 表示异常值
	 * @author yxh
	 * @date：2012-8-8 上午08:19:23
	 * @version 1.0.0
	 */
	public static float transforObjtoFloat(Object obj){
		try{
			return !CommonUtil.isFloat(obj)?0:Float.parseFloat((obj.toString()));
		}catch(Exception e){
			e.printStackTrace();
		}
		return 0;
	}
	
	/**
	 * 获得两个整数的整除值向上取整
	 * @param div 除数
	 * @param dived 被除数
	 * @return
	 */
	public static int getIntNumAndCeil(int div,int dived){
		if(dived==0)return 0;
		return (int)Math.ceil((double)div/(double)dived);
	}
	
	/**
	 * 获得两个整数的整除值向下取整
	 * @param div 除数
	 * @param dived 被除数
	 * @return
	 */
	public static int getIntNumAndFloor(int div,int dived){
		if(dived==0)return 0;
		return (int)Math.floor((double)div/(double)dived);
	}
	
	/**
	 * 计算传入的时间之间的秒数差
	 * 如果插入的end为空则与当前时间比
	 * @name caclBetweenTimes
	 * @param start 开始时间存储以秒单位的时间
	 * @param end 结束时间以秒为单位的时间
	 * @return int 返回相差的秒数
	 * @author yxh
	 * @date：2012-10-13 上午09:35:50
	 * @version 1.0.0
	 */
	public static int caclBetweenTimes(int start,int end){
		int result = 0;
		if(start<=0)return result;
		if(end==0){
			end = (int)Math.ceil(((double)System.currentTimeMillis()/(double)1000));
		}
		//开始时间不应该大于结束时间
		if(start>end)return result;
		result = end-start;
		return result;
	}
	
	/**
	 * 去除数组中null值并减少长度
	 * @param arrays
	 */
	public static <T extends Object> T[] removeNull(T[] arrays){
		if(ArrayUtils.isEmpty(arrays))return arrays;
		int size = arrays.length;
		for(int i=0;i<size;i++){
			if(arrays[i]==null){
				return removeNull(ArrayUtils.remove(arrays,i));
			}
		}
		return arrays;
	}
	/**
	 * 去除数组中null值并减少长度
	 * @param arrays
	 */
	public static  int[] removeNull(int[] arrays){
		if(ArrayUtils.isEmpty(arrays))return arrays;
		int size = arrays.length;
		for(int i=0;i<size;i++){
			if(arrays[i]==0){
				return removeNull(ArrayUtils.remove(arrays,i));
			}
		}
		return arrays;
	}
	
	/**
	 * 去除数组中null值并减少长度
	 * @param arrays
	 */
	public static  long[] removeNull(long[] arrays){
		if(ArrayUtils.isEmpty(arrays))return arrays;
		int size = arrays.length;
		for(int i=0;i<size;i++){
			if(arrays[i]==0){
				return removeNull(ArrayUtils.remove(arrays,i));
			}
		}
		return arrays;
	}
	
	/**
	 * 把Object[]{Object[]{obj....},...,..}格式的数组变为：
	 * Object[]{obj....}形式的数据
	 * @param result 
	 * @return
	 */
	public static Object[] transMtriArray2SingleArray(Object[] result){
		if(ArrayUtils.isEmpty(result))return new Object[0];
		int dataLen = 0;
		Object[] temps = new Object[100];
		Object[] arrays = null;
		int len = 0;
		int size = 0;
		int i=0;
		for(Object obj:result){
			if(obj==null||!obj.getClass().isArray())continue;
			dataLen = ((Object[])obj).length;
			len = temps.length;
			if(len<size+dataLen){
				arrays = new Object[2*(size+dataLen)];
				System.arraycopy(temps,0,arrays,0,len);
				temps = arrays;
			}
			System.arraycopy(obj,0,temps,i*dataLen,dataLen);
			size+=dataLen;
			i++;
		}
		return CommonUtil.removeNull(temps);
	}
	
	/**
	 * 转换数组为："312,31232,34234,23423"
	 * @param idList
	 * @return
	 */
	public static String transferArray2Str(long[] idList){
		StringBuilder sb = new StringBuilder();
		int i=0;
		for(long id:idList){
			if(i==0){
				sb.append(id);
			}else{
				sb.append(","+id);
			}
			i++;
		}
		return sb.toString();
	}
	
	/**
	 * 转换数组为："312,31232,34234,23423"
	 * @param idList 基本类型的数组  或者string数组
	 * @param split 分割符
	 * @return
	 */
	public static <T extends Object> String transferArray2Str(T[] idList,String split){
		StringBuilder sb = new StringBuilder();
		int i=0;
		for(T id:idList){
			if(!id.getClass().isPrimitive()&&
					!(id instanceof String))return null;
			if(i==0){
				sb.append(id);
			}else{
				sb.append(split+id);
			}
			i++;
		}
		return sb.toString();
	}
	
	/**
	 * 转换list为："312,31232,34234,23423"
	 * @param idList
	 * @return
	 */
	public static String transferArray2Str(Collection<Long> idList){
		StringBuilder sb = new StringBuilder();
		int i=0;
		for(long id:idList){
			if(i==0){
				sb.append(id);
			}else{
				sb.append(","+id);
			}
			i++;
		}
		return sb.toString();
	}
	
	
	/**
	 * 转换list为："312,31232,34234,23423"
	 * @param idList
	 * @return
	 */
	public static <E extends Object> String transferCollenction2Str(Collection<E> idList){
		StringBuilder sb = new StringBuilder();
		int i=0;
		for(E id:idList){
			if(i==0){
				sb.append(id);
			}else{
				sb.append(","+id);
			}
			i++;
		}
		return sb.toString();
	}
	
	/**
	 * 把string数组转换为int[] 
	 * @param strs
	 */
	public static int[] transforStr2IntArray(String[] strs){
		if(ArrayUtils.isEmpty(strs))return null;
		int size = strs.length;
		int[] intArray = new int[size];
		for(int i=0;i<size;i++){
			intArray[i]=transforObjtoInt(strs[i]);
		}
		return intArray;
	}
	
	/**
	 * @param str  125_49001_1_2
	 * @return int[]
	 */
	public static int[] transForIntArrayByStr(String str){
		if(StringUtils.isBlank(str))return null;
		String[] split = str.split("_");
		int size = split.length;
		if(size<=1)return null;
		int[] arr = new int[size];
		for(int i=0;i<size;i++){
			
			arr[i] = Integer.parseInt(split[i]);
		}
		return arr;
	}
	/**
	 * 6284_1992,7289_1959
	 * @param str
	 * @return List<int[]>
	 */
	public static List<int[]> tansForListByStr(String str){
		if(StringUtils.isBlank(str)){
			return null;
		} 
		int[] arr = null;
		List<int[]> list = new ArrayList<int[]>();
		String[] split = str.split(",");
		for (String basicStr : split) {
			if(StringUtils.isBlank(basicStr))continue;
			String[] entryStr = basicStr.split("_");
			arr = new int[entryStr.length];
			for (int i = 0; i < entryStr.length; i++) {
				arr[i] = Integer.parseInt(entryStr[i]);
			}
			if(arr.length >0);
				list.add(arr);
		}
		return list;
	}	
	
	/**
	 * 将二维数组转换成list集合（注该数组长度只能为1）
	 * @author lobbyer
	 * @param data
	 * @return
	 * @date 2016年9月14日
	 */
	public static List<Integer> transIntArrayToList(int[][] data) {
		List<Integer> list = new ArrayList<Integer>();
		if(data == null) return list;
		for(int[] arr:data) {
			for(int value:arr) {
				list.add(value);
			}
		}
		return list;
	}
	
	 /**
	  * 在某个范围内，取出不重复的随机数；范围值不能小于要取的随机数
	  * 随机的个数 不能大于 最大值
	 * @param min 最小值
	 * @param max 最大值
	 * @param n 随机个数
	 * @param set 不重复的 随机数
	 */
	public static void randomSet(int min, int max, int n, HashSet<Integer> set) { 
		if (n > (max - min + 1) || max < min) {
			return;  
		}
		if(max<=n){
			for (int i = 0; i < max; i++) {
				set.add(i);// 将不同的数存入HashSet中 
			}
			return;
		}
		for (int i = 0; i < n; i++) {  
			// 调用Math.random()方法  
			int num = (int) (Math.random() * (max - min)) + min;  
			if(set.size()>=n)return;
			set.add(num);// 将不同的数存入HashSet中  
		}  
		int setSize = set.size();  
		// 如果存入的数小于指定生成的个数，则调用递归再生成剩余个数的随机数，如此循环，直到达到指定大小  
		if (setSize <= n) {  
			randomSet(min, max, n , set);// 递归  
		}  
	}  
	
	/**
	 * 根据角色的id截取区id
	 * @param priKey 角色的rid或者accountId
	 * @return 区id
	 */
	public static int getZoneIdById(long priKey){
		int zoneId = 0;
		String string = String.valueOf(priKey);
		if(string.length() > GameConst.CANNUM_MAX){
			String substring = string.substring(1, GameConst.CANNUM_MAX+1);
			zoneId = Integer.parseInt(substring);
		}
		return zoneId;
	}
	
	/**
	 * 计算同一个操作两次操作间隔时间是否达到要求时间(秒)
	 * 如果是第一次则记录操作时间，如果达到了间隔时间也记录时间点
	 * @param rid
	 * @param attriName 设置到连接中时的名字
	 * @param time 要求的时间 单位：秒
	 * @return boolean true 达到间隔时间 false 没有达到间隔时间
	 * @author yxh
	 */
	public static boolean isOverGapTime(final Hero hero,final String attriName,final int time){
		if(hero == null) return false;
		final TempData tempData = hero.getTempData();
		if(tempData==null) return false;
		int gaptime =-1;
		final Object gapObj = tempData.getAttribute(attriName);
		if(gapObj!=null){
			long gapObjtime = Long.parseLong(gapObj.toString());
			gaptime = (int)Math.floor((double)(System.currentTimeMillis()-gapObjtime)/(double)1000);
		}
		
		if(gaptime > -1 && gaptime < time) return false;
		
		tempData.addAttribute(attriName,System.currentTimeMillis());
		return true;
	}
	
	/**
	 * 拷贝二维数组数据，不影响原数组
	 * @param source
	 * @return 新的二维数组
	 */
	public static int[][] copyDyadicArray(int[][] source){
		if(source == null){
			return null;
		}
		int[][] copyArray = new int[source.length][];
		for(int i=0; i<source.length; i++){
			copyArray[i] = new int[source[i].length];
			System.arraycopy(source[i], 0, copyArray[i], 0, source[i].length);
		}
		return copyArray;
	}
	
	/**
	 * 拷贝二维数组数据，不影响原数组
	 * @param source
	 * @return 新的二维数组
	 */
	public static long[][] copyDyadicArray(long[][] source){
		if(source == null){
			return null;
		}
		long[][] copyArray = new long[source.length][];
		for(int i=0; i<source.length; i++){
			copyArray[i] = new long[source[i].length];
			System.arraycopy(source[i], 0, copyArray[i], 0, source[i].length);
		}
		return copyArray;
	}
	
	/**
	 * 拷贝二维数组数据，不影响原数组 并且对数值里的数值翻n倍 (适用于 货币 道具的批量增加)
	 * @param source
	 * @return 新的二维数组 适用于 货币 道具的批量增加
	 */
	public static int[][] copyArrayAndNum(int[][] source,double num){
		if(source == null){
			return null;
		}
		int[][] copyArray = new int[source.length][];
		for(int i=0; i<source.length; i++){
			copyArray[i] = new int[source[i].length];
			System.arraycopy(source[i], 0, copyArray[i], 0, source[i].length);
		}
		for(int[] arr:copyArray){
			arr[2] = (int)(Math.ceil(arr[2] * num));
			if (arr[2]==0) {
				arr[2]=1;
			}
		}
		return copyArray;
	}

	/**
	 * 拷贝二维数组数据，不影响原数组 并且对数值里的数值翻n倍 (向上取整)
	 * @param source
	 * @param num 倍数
	 * @param index 翻倍的位置
	 */
	public static int[][] copyArrayAndNum(int[][] source, int num, int index) {
		if (source == null) {
			return null;
		}
		int[][] copyArray = new int[source.length][];
		for (int i = 0; i < source.length; i++) {
			copyArray[i] = new int[source[i].length];
			System.arraycopy(source[i], 0, copyArray[i], 0, source[i].length);
		}

		for (int[] arr : copyArray) {
			arr[index] = (int) (Math.ceil(arr[index] * num));
			if (arr[index] == 0) {
				arr[index] = 1;
			}
		}
		return copyArray;
	}

	/**
	 * 拷贝二维数组数据，不影响原数组 并且对数值里的数值翻n倍 (向上取整)
	 * @param source
	 * @return 新的二维数组 适用于 货币 道具的批量增加 道具数量为0时候 会变成1
	 */
	public static int[][] copyArrayAndNum(int[][] source,int num){
		if(source == null){
			return null;
		}
		int[][] copyArray = new int[source.length][];
		for(int i=0; i<source.length; i++){
			copyArray[i] = new int[source[i].length];
			System.arraycopy(source[i], 0, copyArray[i], 0, source[i].length);
		}
		
		for(int[] arr:copyArray){
			arr[2] = (int)(Math.ceil(arr[2] * num));
			if (arr[2]==0) {
				arr[2]=1;
			}
		}
		return copyArray;
	}
	
	/**
	 * 拷贝二维数组数据，不影响原数组 并且对数值里的数值翻n倍 (向上取整)
	 * @param source
	 * @return 新的二维数组 适用于 货币 道具的批量增加
	 */
	public static int[][] newCopyArrayAndNum(int[][] source,int num){
		if(source == null){
			return null;
		}
		int[][] copyArray = new int[source.length][];
		for(int i=0; i<source.length; i++){
			copyArray[i] = new int[source[i].length];
			System.arraycopy(source[i], 0, copyArray[i], 0, source[i].length);
		}
		
		for(int[] arr:copyArray){
			arr[2] = (int)(Math.ceil(arr[2] * num));
		}
		return copyArray;
	}
	
	/**
	 * 拷贝二维数组数据，不影响原数组 并且对数值里的数值翻n倍 (向上取整)
	 * 
	 * @param source
	 * @return 新的二维数组 适用于 货币 道具的批量增加
	 */
	public static int[][] copyArrayAndNumCeil(int[][] source, double num) {
		if (source == null) {
			return null;
		}
		int[][] copyArray = new int[source.length][];
		for (int i = 0; i < source.length; i++) {
			copyArray[i] = new int[source[i].length];
			System.arraycopy(source[i], 0, copyArray[i], 0, source[i].length);
		}

		for (int[] arr : copyArray) {
			arr[2] = (int) (Math.ceil(arr[2] * num));
			if (arr[2] == 0) {
				arr[2] = 1;
			}
		}
		return copyArray;
	}

	/**
	 * 拷贝二维数组数据，不影响原数组 并且对数值里的数值翻n倍 (向下取整)
	 * 
	 * @param source
	 * @return 新的二维数组 适用于 货币 道具的批量增加
	 */
	public static int[][] copyArrayAndNumFloor(int[][] source,double num){
		if(source == null){
			return null;
		}
		int[][] copyArray = new int[source.length][];
		for(int i=0; i<source.length; i++){
			copyArray[i] = new int[source[i].length];
			System.arraycopy(source[i], 0, copyArray[i], 0, source[i].length);
		}
		for(int[] arr:copyArray){
			arr[2] = (int)(Math.floor(arr[2] * num));
			if (arr[2]==0) {
				arr[2]=1;
			}
		}
		return copyArray;
	}
	
	/**
	 * 两个数组 接在一起
	 * @param arrayA
	 * @param arrarB
	 * @return
	 */
	public static int[][] arrayPlusArrays(int[][] arrayA,int[][] arrayB){
		int size=arrayA.length+arrayB.length;
		int[][] copyArray = new int[size][];
		List<int[]> copyList=new ArrayList<int[]>();
		for(int[] a:arrayA) {
			copyList.add(a);
		}
		for(int[] b:arrayB) {
			copyList.add(b);
		}
		copyList.toArray(copyArray);
		return copyArray;
		
	}
	/**
	 * 两个道具（装备 货币  道具）数组 +叠加在一起
	 * @param arrayA[[类型—id—数量]]
	 * @param arrayB[[类型—id—数量]]
	 * @return
	 */
	public static int[][] arrayPlusArraysItems(int[][] arrayA,int[][] arrayB){
		HashMap<Integer, Integer> huobiMap=new HashMap<>();
		HashMap<Integer, Integer> itemMap=new HashMap<>();
		HashMap<Integer, Integer> equipMap=new HashMap<>();
		for(int[] a:arrayA) {
			if (a[0]==GameConst.EQUIP) {
				//装备
				equipMap.put(a[1], a[2]);
			}else if (a[0]==GameConst.TOOL) {
				//道具
				if (itemMap.containsKey(a[1])) {
					int num=itemMap.get(a[1]);
					itemMap.put(a[1], num+a[2]);
				}else {
					itemMap.put(a[1], a[2]);
				}
			}else {
				//货币
				if (huobiMap.containsKey(a[0])) {
					int num=huobiMap.get(a[0]);
					huobiMap.put(a[0], a[2]+num);
				}else {
					huobiMap.put(a[0], a[2]);
				}
			}
			
		}
		for(int[] b:arrayB) {
			if (b[0]==GameConst.EQUIP) {
				//装备
				equipMap.put(b[1], b[2]);
			}else if (b[0]==GameConst.TOOL) {
				//道具
				if (itemMap.containsKey(b[1])) {
					int num=itemMap.get(b[1]);
					itemMap.put(b[1], num+b[2]);
				}else {
					itemMap.put(b[1], b[2]);
				}
			}else {
				//货币
				if (huobiMap.containsKey(b[0])) {
					int num=huobiMap.get(b[0]);
					huobiMap.put(b[0], b[2]+num);
				}else {
					huobiMap.put(b[0], b[2]);
				}
			}
		}
		List<int[]> dropArr = new ArrayList<int[]>();
		if (equipMap.size()>0) {
			for (int key:equipMap.keySet()) {
				dropArr.add(new int[] {GameConst.EQUIP, key, equipMap.get(key)});
			}
		}
		if (itemMap.size()>0) {
			for (int key:itemMap.keySet()) {
				dropArr.add(new int[] {GameConst.TOOL, key, itemMap.get(key)});
			}
		}
		if (huobiMap.size()>0) {
			for (int key:huobiMap.keySet()) {
				dropArr.add(new int[] {key, 0, huobiMap.get(key)});
			}
		}
		int size=equipMap.size()+itemMap.size()+huobiMap.size();
		int[][] copyArray = new int[size][];
		dropArr.toArray(copyArray);
		return copyArray;
		
	}
	
	
	/**将 1,2;1,3 这类字符串转化成整形二维数组*/
	public static int[][] splitIntArr(String str){
		Object[] ret=str.split(";");
		int[][] retInt=null;
		for (int i = 0; i < ret.length; i++) {
			Object[] termArr = ((String) ret[i]).split(",");
			int[] termArrInt=new int[termArr.length];
			if (retInt==null) {
				retInt=new int[ret.length][termArr.length];
			}
			for(int j=0;j<termArr.length;j++){
				termArrInt[j]=Integer.parseInt((String) termArr[j]);
				retInt[i][j] = termArrInt[j];
			}
			
		}
		return retInt;
	}
	
	/**
	 * 把玩家属性整理到map中
	 * 
	 * @param attr
	 * @param attrMap
	 * @param multiple
	 *            属性倍数
	 */
	public static void arrChargeMap(int[][] attr, Map<Integer, Long> attrMap, float multiple) {
		if (attr != null) {
			for (int[] info : attr) {
				Long value = attrMap.get(info[0]);
				if (value == null) {
					value = 0L;
				}
				attrMap.put(info[0], value + (int) (info[1] * multiple));
			}
		}
	}
	/**
	 * 合并attrMap到attrMap1中
	 * @param attrMap
	 * @param attrMap1
	 */
	public static void mapPuslMap(Map<Integer, Integer> attrMap,Map<Integer, Integer> attrMap1) {
		if (attrMap!=null) {
			for (int key:attrMap.keySet()) {
				int value=attrMap.get(key);
				if (value>0) {
					if (!attrMap1.containsKey(key)) {
						attrMap1.put(key, value);
					}else {
						int num = attrMap1.get(key);
						attrMap1.put(key, value+num);
					}
				}
			}
		}
	}
	
	/**
	 * 合并attrMap到attrMap1中
	 * @param attrMap
	 * @param attrMap1
	 */
	public static void mapPuslMapLong(Map<Integer, Integer> attrMap,Map<Integer, Long> attrMap1) {
		if (attrMap!=null) {
			for (int key:attrMap.keySet()) {
				long value=attrMap.get(key);
				if (value>0) {
					if (!attrMap1.containsKey(key)) {
						attrMap1.put(key, value);
					}else {
						long num = attrMap1.get(key);
						attrMap1.put(key, value+num);
					}
				}
			}
		}
	}

	/**
	 * 把玩家属性整理到map中
	 * 
	 * @param attr
	 * @param attrMap
	 */
	public static void arrChargeMap(int[][] attr, Map<Integer, Long> attrMap) {
		if(attr!=null) {				
			for(int[] info : attr) {
				Long value = attrMap.get(info[0]);
				if(value==null) {
					value = 0L;
				}
				attrMap.put(info[0], value + info[1]);
			}
		}
	}
	/**
	 * 把玩家属性整理到map中
	 * 
	 * @param attr
	 * @param attrMap
	 */
	public static void arrChargeMap(long[][] attr, Map<Integer, Long> attrMap) {
		if(attr!=null) {				
			for(long[] info : attr) {
				Long value = attrMap.get((int)info[0]);
				if(value==null) {
					value = 0L;
				}
				attrMap.put((int)info[0], value + info[1]);
			}
		}
	}
	/**
	 * 把map转为玩家属性
	 * @param attrMap
	 * @return
	 */
	public static long[][] mapToArr(Map<Integer, Long> attrMap) {
		if (attrMap.size()>0) {
			long[][] attrs = new long[attrMap.size()][];
			Iterator<Integer> iteratorAttr = attrMap.keySet().iterator();
			int i = 0;
			for (; iteratorAttr.hasNext();) {
				Integer key = iteratorAttr.next();
				attrs[i] = new long[] { key, attrMap.get(key) };
				i++;
			}
			return attrs;
		}
		return null;
	}
	
	/**
	 * 安全格式化字符串
	 * 
	 * @param context
	 * @param args
	 * @return
	 */
	public static String safeFormat(String context, Object... args) {
		if (isNull(context))
			return context;
		if (args == null || args.length <= 0)
			return context;
		try {
			return String.format(context, args);
		} catch (Exception e) {
			return context;
		}
	}
	
	
	
	/**将 1,2;1,3 这类字符串转化成整形二维数组*//*
	public static splitIntArr(str: string): Array<Array<number>> {
		var ret: Array<any> = str.split(";");
		for (var i = 0, len = ret.length; i < len; i++) {
			var termArr = ret[i].split(",");
			for (var j = 0; j < termArr.length; j++) {
				termArr[j] = parseInt(termArr[j]);
			}
			// termArr[0] = parseInt(termArr[0]);
			// termArr[1] = parseInt(termArr[1]);
			ret[i] = termArr;
		}
		return ret;
	}*/
	/**
	 * 
	 * @param src
	 * @param begin
	 * @param count
	 * @return
	 */
	public static Object[] copyArrByindex(Object[] src, int begin, int count) {
		Object[] bs = new Object[count];
        System.arraycopy(src, begin, bs, 0, count);
        return bs;
    }
	
	/**
	 * 数组中是否有obj
	 * 
	 * @param objArray   数组
	 * @param obj        比较内容
	 * @param splitStr   比较分隔符
	 * @param splitIndex 比较索引，从0开始
	 * @return
	 */
	public static boolean isArrayContainObj(Object objArray, Object obj, String splitStr, int splitIndex) {
		if (objArray == null) {
			return false;
		}
		if (objArray.getClass().isArray()) {
			for (Object t : (Object[]) objArray) {
				if (isArrayContainObj(t, obj, splitStr, splitIndex)) {
					return true;
				}
			}
		}
		if (objArray.getClass().isArray()) {
			return false;
		} else {
			if (objArray instanceof String) {
				if (splitStr == null) {
					return ((String) objArray).equals(obj);
				} else {
					String[] splitArray = ((String) objArray).split(splitStr);
					String str = splitArray[splitIndex];
					return str.equals(obj);
				}
			} else {
				return objArray.equals(obj);
			}
		}
	}

	/**
	 * 奖励map转换为Object[][]数组形式
	 * 
	 * @param awardMap
	 * @return
	 */
	public static Object[][] awardMap2ObjcetArray(Map<Integer, Map<Integer, Integer>> awardMap) {
		int len = 0;
		for (Map<Integer, Integer> idMap : awardMap.values()) {
			len += idMap.size();
		}
		Object[][] awardObjectArray = new Object[len][];
		int i = 0;
		for (Entry<Integer, Map<Integer, Integer>> entryType : awardMap.entrySet()) {
			Integer type = entryType.getKey();
			Map<Integer, Integer> value = entryType.getValue();
			for (Entry<Integer, Integer> entryid : value.entrySet()) {
				Integer id = entryid.getKey();
				Integer num = entryid.getValue();
				awardObjectArray[i++] = new Object[] { type, id, num };
			}
		}
		return awardObjectArray;
	}

	/**
	 * 奖励map转换为int[][]数组形式
	 * 
	 * @param awardMap
	 * @return
	 */
	public static int[][] awardMap2IntArray(Map<Integer, Map<Integer, Integer>> awardMap) {
		int len = 0;
		for (Map<Integer, Integer> idMap : awardMap.values()) {
			len += idMap.size();
		}
		int[][] awardIntArray = new int[len][];
		int i = 0;
		for (Entry<Integer, Map<Integer, Integer>> entryType : awardMap.entrySet()) {
			Integer type = entryType.getKey();
			Map<Integer, Integer> value = entryType.getValue();
			for (Entry<Integer, Integer> entryid : value.entrySet()) {
				Integer id = entryid.getKey();
				Integer num = entryid.getValue();
				awardIntArray[i++] = new int[] { type, id, num };
			}
		}
		return awardIntArray;
	}

	/**
	 * 根据奖励数组(来自配置表)，并根据系数计算填充awardMap(向下取整)
	 * 
	 * @param awardMap 奖励Map
	 * @param objArray 奖励int[][]
	 * @param cs       系数
	 */
	public static void arrayIntoMap(Map<Integer, Map<Integer, Integer>> awardMap, int[][] objArray, double cs) {
		// 找回奖励=配置奖励*系数
		if (cs == 0) {
			return;
		}
		if (cs != 1) {
			objArray = CommonUtil.copyArrayAndNumFloor(objArray, cs);
		}
		for (int[] array : objArray) {
			Map<Integer, Integer> map = awardMap.get(array[0]);
			if (map == null) {
				map = new HashMap<>();
				awardMap.put(array[0], map);
			}
			Integer num = map.get(array[1]);
			if (num == null) {
				num = 0;
			}
			map.put(array[1], array[2] + num);
		}
	}

	public static StringBuilder attrToString(int[][] attr) {
		StringBuilder stringBuilder = new StringBuilder();
		if (attr != null) {
			for (int[] attr1 : attr) {
				String attrStr = Arrays.toString(attr1);
				stringBuilder.append(attrStr);
			}
		}
		return stringBuilder;
	}

	public static StringBuilder attrToString(long[][] attr) {
		StringBuilder stringBuilder = new StringBuilder();
		if (attr != null) {
			for (long[] attr1 : attr) {
				String attrStr = Arrays.toString(attr1);
				stringBuilder.append(attrStr);
			}
		}
		return stringBuilder;
	}

	public static void main(String[] args){
//		String qudao = "[[\"jysgzj01-apk\"],[\"jysgzj02-ios\"],[\"jysgzj03-apk\"],[\"jysgzj04-yapk\"]]";
//		String[][] obj = ExcelJsonUtils.toObj(qudao, String[][].class);
//		String[][] str = new String[][] { new String[] { "a1" }, new String[] { "a2" } };
//		boolean arrayContainEqualsObj = isArrayContainEqualsObj(str, "a1", "-", 0);
//		System.out.println(arrayContainEqualsObj);

//		System.out.println(getCurrentTimeByFormat("hh:mm:ss"));
//		System.out.println(Float.MAX_VALUE);
		
//		System.out.println(getIntNumAndCeil(10, 3));
		
//		Object[] data = new Object[10];
//		System.out.println(ArrayUtils.isEmpty(removeNull(data)));
		
//		String str = "6284_1992_,7289_1959,";
//		List<int[]> list = tansForListByStr( str);
//		System.err.println(Arrays.deepToString(list.toArray(new Object[list.size()])));
//		HashSet<Integer> hashSet = new HashSet<Integer>();
//		randomSet(0, 10, 10, hashSet);
//		System.err.println(hashSet.size());
		
//		int transforObjtoInt = transforObjtoInt("51000003");
//		float parseFloat = Float.parseFloat("51000003");
//		System.err.println(parseFloat);
		
		/*int[][] array = new int[][]{{1,1}, {1,1}};
		int[][] array1 = new int[][]{};
		int[][] array2=arrayPlusArrays(array, array1);*/
		
		//int[][] array2 = copyDyadicArray(array);
		//array2[0][0] = 1;
		/*for(int i=0; i<array2.length; i++){
			for(int j=0; j<array2[i].length; j++){
				System.out.print(array2[i][j]+",");
			}
			System.out.println();
		}*/
		
		/*Object[] ar=new Object[] {1,2,3,4,5};
        ar = copyArrByindex(ar, 0, 3);*/
		
		
		//int zoneIdById = getZoneIdById(1999800000000032l);
		/*String str="1,2;1,3";
		Object[] ret=splitIntArr(str);
		System.err.println(ret[0]);*/
		
		List<int[]> aList= new ArrayList<>();
		aList.add(new int[] {1});
		List<int[]> aList1= new ArrayList<>();
		aList1.add(new int[] {2});
		aList.addAll(aList1);
		TreeSet<CommonRankModel> treeSet=new TreeSet<>();
		for (int i = 0; i < 110; i++) {
			CommonRankModel heroesListRank=new CommonRankModel();
			heroesListRank.setHid(i);
			heroesListRank.setParameter(i);
			treeSet.add(heroesListRank);
		}
		
		int size = treeSet.size();
		if (size>100) {
			int i=0;
			for(Iterator<CommonRankModel> iter = treeSet.descendingIterator(); iter.hasNext(); ) {
				iter.next();
				i++;
				if (i>100) {
					iter.remove();
				}
			}
		}
		
	
		//TreeSet<Integer> 
		
		System.err.println(treeSet.size());
	}
}
