package com.teamtop.util.time;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.TimeZone;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.crossCommonRank.CommonRankSysCache;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xitong_001;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_xitong_001;

/**
 * 时间日期工具类
 * @author 哈皮
 *
 */
public class TimeDateUtil {
	private static Logger log = LoggerFactory
			.getLogger(TimeDateUtil.class);
	/**
	 * 一天的时间
	 */
	public static final long ONEDAY = 3600 * 24 * 1000;
	public static final long ONEHOUR = 3600 * 1000;
	public static final int ONE_HOUR_INT = 3600;
	public static final int ONE_DAY_INT = 3600 * 24;
	public static final int ONE_SECOND = 1;// 1秒
	public static final int ONE_MINUTE = 60;// 1分钟
	public static final int FIVE_MINUTE = 60 * 5;// 5分钟
	public static TimeZone realTimezone = GameProperties.timeZone;
	public static TimeZone serverTimezone = GameProperties.timeZone;
	public static final int MINUTE_IN_DAY = 60 * 24;
	public static final int SECONDS_IN_DAY = 60 * 60 * 24;
	public static final long MILLIS_IN_DAY = 1000L * SECONDS_IN_DAY;
	public static final String PATTERN_SECONDS = "yyyy-MM-dd HH:mm:ss";
	public static final String PATTERN_MILLIS = "yyyy-MM-dd HH:mm:ss:SS";
	public static final String PATTERN_DAY = "yyyy-MM-dd";
//	public static TimeZone serverTimezone = TimeZone.getTimeZone("GMT+08:00");
//	public static TimeZone realTimezone = TimeZone.getTimeZone("GMT+08:00");
	//增加的时间
	public static int addTime = 0;
	public static boolean isModifyTime = false;
	private static int modifyTime;
	static{
		if(realTimezone==null){
			realTimezone = TimeZone.getTimeZone("GMT+8");
			serverTimezone = TimeZone.getTimeZone("GMT+8");
		}
	}
	/**
	 * 获取所需时区的时间
	 * 
	 * @return
	 */
	public static long getRealTime() {
		if(isModifyTime) {
			return modifyTime * 1000l;
		}
		long time = System.currentTimeMillis();
		long realTime = time - (realTimezone.getOffset(time) - serverTimezone.getRawOffset());
		return realTime + addTime * 1000l;
	}
	
	public static void main(String[] args) {
	/*	long time = System.currentTimeMillis();
		int currentTime = TimeDateUtil.getCurrentTime();
		System.out.println(currentTime);*/
//		System.out.println(getWeek());
		/*System.err.println(serverTimezone.getRawOffset());
		System.err.println(realTimezone.getOffset(time));
		System.out.println(time);
		System.out.println(new Date(getRealTime()));*/
//		System.err.println(System.currentTimeMillis()/1000);
//		System.err.println(Integer.MAX_VALUE);
		System.err.println(printTime(1563035151));
		//svn 实时同步备份设置111
//		int nextFewDayTime = TimeDateUtil.getNextFewDayTime(-10);
		/*int nextFewDayTime = TimeDateUtil.getNextFewDayTime(-10);
		System.err.println(nextFewDayTime);
		printTime(nextFewDayTime);*/
//		int num=getWeek(TimeDateUtil.getCurrentTime());
//		System.err.println("CurrentTime:"+TimeDateUtil.getCurrentTime());
//		System.err.println(num);
//		int time1=TimeDateUtil.getCurrentTime()-3600*24;
//		int num1=getWeek(time1);
//		System.err.println("CurrentTime:"+time1);
//		realTimezone = TimeZone.getTimeZone("GMT+8");
		//System.err.println(TimeDateUtil.getTodayZeroTimeReturnInt() + 5*3600);
//		System.err.println(printTime(1551226616));
//		System.err.println(printTime(1540734634));
//		int today = Integer.parseInt( new SimpleDateFormat("yyyyMMdd").format( new Date()));
//		System.err.println(today);
		System.out.println(getTimeIntByStr("2019-08-11 00:00:00"));
		// System.out.println(getTimeIntByStr("2019-01-31 23:59:59"));
		// System.out.println(getTimeIntByStr("2019-02-01 00:00:00"));
		// System.out.println(getTimeIntByStr("2019-02-28 23:59:59"));
//	    System.err.println(TimeDateUtil.getCurrentTime());
//		System.err.println(printTime(0));
		try {
			System.err.println(getTimeIntByStrTime("2019-03-01 00:00:00","yyyy-MM-dd hh:mm:ss"));
			System.err.println(getTimeIntByStrTime("2019-03-31 23:59:55","yyyy-MM-dd hh:mm:ss"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			int intByStrTime = TimeDateUtil.getTimeIntByStrTime("2019-3-23 09:30:00", "yyyy-MM-dd hh:mm:ss");
			System.err.println(intByStrTime);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
//		System.err.println(TimeDateUtil.getTimeStrByLong(1553764540000L, "yyyy-MM-dd HH:mm:ss"));
	}

	/**
	 * 获取当前时间
	 * 
	 * @name getCurrentTime
	 * @return 当前以int类型返回的数值
	 */
	public static int getCurrentTime() {
		if(isModifyTime) {
			return modifyTime;
		}
		return (int) (getRealTime() / 1000);
	}
	
	/**
	 * 获取当前时间（毫秒）
	 * @return
	 */
	public static long getCurrentTimeInMillis(){
		return getCurrentTime() * 1000l;
	}

	/**
	 * 获取今天零时的时间
	 * 
	 * @return 零时以long类型返回的数值
	 */
	public static long getTodayZeroTime() {
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(getRealTime());
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return calendar.getTimeInMillis();
	}

	/**
	 * 获取当前周的周一零点时间，以int返回
	 * 
	 * @return
	 */
	public static int getMondayZeroTime() {
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(getRealTime());
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		return (int) (calendar.getTimeInMillis() / 1000);
	}

	/**
	 * 获取下周一零点时间
	 * 
	 * @return
	 */
	public static int getNextMonDayZeroTime() {
		return getMondayZeroTime() + ONE_DAY_INT * 7;
	}

	/**
	 * 获取明天零时的时间
	 * 
	 * @return 零时以long类型返回的数值
	 */
	public static long getTomorrowZeroTime() {
		long zeroTime = getTodayZeroTime();
		zeroTime += ONEDAY;
		return zeroTime;
	}

	/**
	 * 获取今天零时的时间
	 * 
	 * @return 零时以int类型返回的数值
	 */
	public static int getTodayZeroTimeReturnInt() {
		long todayZeroTime = getTodayZeroTime();
		return (int) (todayZeroTime / 1000);
	}

	/**
	 * 判断当日的零点是否大于传入的零点处理时间
	 * 
	 * @param zeroTime
	 * @return
	 */
	public static boolean isLessTodayZeroTime(final int zeroTime) {
		return getTodayZeroTimeReturnInt() > zeroTime;
	}

	/**
	 * 获取明天零时的时间
	 * 
	 * @return 零时以int类型返回的数值
	 */
	public static int getTomorrowZeroTimeReturnInt() {
		long tomorrowZeroTime = getTomorrowZeroTime();
		return (int) (tomorrowZeroTime / 1000);
	}

	public static int getHour() {
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(getRealTime());
		return calendar.get(Calendar.HOUR_OF_DAY);
	}

	public static int getMinute() {
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(getRealTime());
		return calendar.get(Calendar.MINUTE);
	}

	/**
	 * @return true 表示 周 2,4,6 否则反之
	 */
	public static boolean getOddDayOfWeek() {
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(getRealTime());
		return calendar.get(Calendar.DAY_OF_WEEK) % 2 != 0;
	}

	/**
	 * @return true 表示今天是周日
	 */
	public static boolean isSunday() {
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(getRealTime());
		return calendar.get(Calendar.DAY_OF_WEEK) == 1;
	}

	/**
	 * 获取某天的0点
	 * 
	 * @param time
	 *            某天的某个时间
	 * @return 那天的0点
	 */
	public static int getOneDayZeroTime(int time) {
		long recTime = time * 1000l;
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(recTime);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return (int) (calendar.getTimeInMillis() / 1000);
	}

	/**
	 * 获取某天的某小时
	 * 
	 * @param time
	 *            某天的某个时间
	 * @return 那天的x点00分00秒
	 */
	public static int getOneDayTimeHour(int time) {
		int oneDayZeroTime = getOneDayZeroTime(time);
		int nowHourTime = (time - oneDayZeroTime) / 3600;
		long recTime = time * 1000l;
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(recTime);
		calendar.set(Calendar.HOUR_OF_DAY, 0 + nowHourTime);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return (int) (calendar.getTimeInMillis() / 1000);
	}
	
	/**
	 * 获取某天的某小时或30分，超过30分按下个小时，未超过按30分
	 * @param time 某天的某个时间
	 * @return 那天的x点00分00秒或x点30分00秒
	 */
	public static int getOneDayTimeHourAndHalf(int time) {
		int oneDayZeroTime = getOneDayZeroTime(time);
		int nowHourTime = (time - oneDayZeroTime) / ONE_HOUR_INT;
		int nowMinTime = (time - (oneDayZeroTime + ONE_HOUR_INT*nowHourTime)) / ONE_MINUTE;
		long recTime = time * 1000l;
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(recTime);
		calendar.set(Calendar.HOUR_OF_DAY, 0 + nowHourTime);
		if(nowMinTime >= 30){
			calendar.set(Calendar.MINUTE, 60);
		}else {
			calendar.set(Calendar.MINUTE, 30);
		}
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return (int) (calendar.getTimeInMillis() / 1000);
	}

	/**
	 * 返回当前时间,处理秒数和分钟为0
	 * 
	 * @return 当前时间,处理秒数和分钟为0
	 */
	public static int getCurrTimeWithZeroSec() {
		Calendar c = Calendar.getInstance(serverTimezone);
		c.setTimeInMillis(getRealTime());
		c.set(Calendar.SECOND, 0);
		c.set(Calendar.MILLISECOND, 0);
		int timeInMillis = (int) (c.getTimeInMillis() / 1000);
		return timeInMillis;
	}
	
	public static String printTime(int time) {
		long arg = time * 1000l;
		Date date = new Date(arg);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
		format.setTimeZone(realTimezone);
		String printStr = format.format(date);
		String printData = printStr + "s";
		//System.out.println(printData);
		return printData;
	}
	
	public static String pringNow(){
		long arg = getRealTime();
		Date date = new Date(arg);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		format.setTimeZone(realTimezone);
		String printData = format.format(date);
		// System.out.println(printData);
		return printData;
	}

	public static String printTime(long time) {
		Date date = new Date(time);
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SS");
		format.setTimeZone(realTimezone);
		String printData = format.format(date);
		// System.out.println(printData);
		return printData;
	}
	
	/**
	 * @param pattern eg:"yyyy-MM-dd HH:mm:ss:SS"
	 */
	public static String getTimeStrByInt(int time,String pattern) {
		Date date = new Date(time*1000l);
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		format.setTimeZone(realTimezone);
		String printData = format.format(date);
		// System.out.println(printData);
		return printData;
	}
	/**
	 * @param pattern eg:"yyyy-MM-dd HH:mm:ss:SS"
	 */
	public static String getTimeStrByLong(long time,String pattern) {
		Date date = new Date(time);
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		format.setTimeZone(realTimezone);
		String printData = format.format(date);
		// System.out.println(printData);
		return printData;
	}
	/**
	 * 仅仅返回时间
	 * 
	 * @name printOnlyTime
	 * @condition 这里描述这个方法适用条件
	 * @param time
	 * @return 时分秒
	 * @author lobbyer
	 * @date：2012-8-30 下午07:52:08
	 */
	public static String printOnlyTime(int time) {
		long arg = time * 1000l;
		Date date = new Date(arg);
		SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");
		format.setTimeZone(realTimezone);
		String printData = format.format(date);
		// System.out.println(printData);
		return printData;
	}

	/**
	 * 根据int类型时间以及转换格式转换为字符型的time
	 * 
	 * @param time
	 * @param pattern
	 *            格式：为空则默认为 “yyyy-MM-dd HH:mm:ss” 格式
	 * @return
	 */
	public static String printFormatIntTime2StrTime(int time, String pattern) {
		if (StringUtils.isBlank(pattern))
			pattern = "yyyy-MM-dd HH:mm:ss";
		long arg = time * 1000l;
		Date date = new Date(arg);
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		format.setTimeZone(realTimezone);
		return format.format(date);
	}

	/**
	 * 返回当前时间（不包括日期）时分秒换算为秒表示
	 * 
	 * @name getTimeForDay
	 * @return 时分秒换算成秒的值
	 */
	public static int getTimeOfDay() {
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(getRealTime());
		int hour = calendar.get(Calendar.HOUR_OF_DAY);
		int minute = calendar.get(Calendar.MINUTE);
		int second = calendar.get(Calendar.SECOND);
		int times = hour * 3600 + minute * 60 + second;
		return times;
	}

	/**
	 * 返回当前日期
	 * 
	 * @name getTimeForDay
	 * @return 日期换算成秒的值
	 */
	public static int getDay() {
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(getRealTime());
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH);
		int date = calendar.get(Calendar.DAY_OF_MONTH);
		calendar.set(year, month, date, 0, 0, 0);
		// int times = getCurrentTime()-getTimeOfDay();
		int times = (int) (calendar.getTimeInMillis() / 1000);
		return times;
	}

	/**
	 * 获取当前日期的过去或未来的日期
	 * 
	 * @param apartDays
	 *            1 日期向后推一天（明天）, -1 日期向前推一天（昨天）
	 * @return 日期换算成秒的值
	 */
	public static int getDayPassOrFuture(int apartDays, long currTime) {
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(currTime);
		calendar.add(Calendar.DATE, apartDays);// 把日期往后增加一天.整数往后推,负数往前移动
		int times = (int) (calendar.getTimeInMillis() / 1000); // 这个时间就是日期往后推一天的结果
		return times;
	}

	/**
	 * 根据一个日期，返回是星期几<br/>
	 * 星期一为1，星期二为2，星期三为3，星期四为4，星期五为5，星期六为6，星期天为7
	 * 
	 * @param sdate
	 * @return
	 */
	public static int getWeek() {
		// 再转换为时间
		Calendar c = Calendar.getInstance(serverTimezone);
		c.setTimeInMillis(getRealTime());
		if(c.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY){
			return 7;
		}
		return c.get(Calendar.DAY_OF_WEEK)-1;
	}

	/**
	 * 根据一个日期，返回星期
	 * 
	 * @return 周日 1~周六 7
	 */
	public static int getLocalWeek() {
		// 再转换为时间
		Calendar c = Calendar.getInstance(serverTimezone);
		c.setTimeInMillis(getRealTime());
		return c.get(Calendar.DAY_OF_WEEK);
	}

	/**
	 * 根据传入的："hh:MM:ss"格式的字符时间格式换算成秒数
	 * 
	 * @param time
	 * @return 秒数返回
	 */
	public static long getTimeByStrTime(String time) {
		SimpleDateFormat sf = new SimpleDateFormat("hh:MM:ss");
		long result = 0;
		try {
			Date date = sf.parse(time);
			result = date.getTime();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 根据传入的："hh:MM:ss"格式的字符时间格式换算成秒数
	 * 
	 * @param time
	 * @return 秒数返回
	 */
	public static int getTimeIntByStrTime(String time) {
		SimpleDateFormat sf = new SimpleDateFormat("hh:MM:ss");
		int result = 0;
		try {
			Date date = sf.parse(time);
			result = (int) (date.getTime() / 1000);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 根据传入的：pattern 格式的字符时间格式换算成秒数
	 * 
	 * @param time
	 *            时间字符
	 * @param pattern
	 *            时间格式如："yyyy-MM-dd hh:mm:ss"
	 * @return 秒数返回 0 失败
	 * @throws Exception
	 */
	public static int getTimeIntByStrTime(String time, String pattern)
			throws Exception {
		if (StringUtils.isBlank(pattern) || StringUtils.isBlank(time))
			throw new Exception(" time or pattern paramter is validate");
		SimpleDateFormat sf = new SimpleDateFormat(pattern);
		Date date = sf.parse(time);
		return (int) (date.getTime() / 1000);
	}

	/**
	 * 根据传入的："HH:mm:ss"格式的字符时间判断当前时间是否大于传入的时间
	 * 
	 * @param time
	 *            格式："HH:mm:ss"
	 * @return boolean 大于 false 不大于
	 */
	public static boolean isLargeTime(String time) {
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			Date date1 = new Date();
			String dateTime = sf.format(date1);
			String times = dateTime + " " + time;
			sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = sf.parse(times);
			return date1.getTime() > date.getTime();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 根据传入的："HH:mm:ss"格式的字符时间判断当前时间是否小于传入的时间
	 * 
	 * @param time
	 *            格式："HH:mm:ss"
	 * @return boolean 大于 false 不大于
	 */
	public static boolean isLessTime(String time) {
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			Date date1 = new Date();
			String dateTime = sf.format(date1);
			String times = dateTime + " " + time;
			sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = sf.parse(times);
			return date1.getTime() < date.getTime();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 根据传入的："HH:mm:ss"格式的字符时间判断当前时间是否大于等于传入的时间
	 * 
	 * @param time
	 *            格式："HH:mm:ss"
	 * @return boolean 大于 false 不大于
	 */
	public static boolean isLargeOrEqualTime(String time) {
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			Date date1 = new Date();
			String dateTime = sf.format(date1);
			String times = dateTime + " " + time;
			sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = sf.parse(times);
			return date1.getTime() >= date.getTime();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 判断当前时间是否在给定的时间段内
	 * 
	 * @param start
	 *            开始时间 "HH:mm:ss"
	 * @param end
	 *            结束时间 "HH:mm:ss"
	 * @return
	 */
	public static boolean isBetweenTimes(String start, String end) {
		return !isLargeOrEqualTime(end) && isLargeOrEqualTime(start);
	}

	/**
	 * 根据传入的："HH:mm:ss"时间 返回与当前时间的时间间隔
	 * 
	 * @param time
	 *            "HH:mm:ss" 时间点
	 * @return time 小于当前时间 则为 负值反之则为 正值
	 */
	public static int getTimeAndNowBetweenTimes(String time) {
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			Date date1 = new Date();
			String dateTime = sf.format(date1);
			String times = dateTime + " " + time;
			sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = sf.parse(times);
			return (int) ((date.getTime() - date1.getTime()) / 1000);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return 0;
	}

	/**
	 * 比较两个时间是否是同一天
	 * 
	 * @param compTime1
	 * @param compTime2
	 * @return
	 */
	public static boolean compareTimeForSameDay(int compTime1, int compTime2) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis((long) compTime1 * 1000);
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH);
		int day = calendar.get(Calendar.DAY_OF_MONTH);
		calendar.setTimeInMillis((long) compTime2 * 1000);
		int year2 = calendar.get(Calendar.YEAR);
		int month2 = calendar.get(Calendar.MONTH);
		int day2 = calendar.get(Calendar.DAY_OF_MONTH);
		if (year == year2) {
			if (month == month2) {
				if (day == day2) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 获取传入时间中的（1年，2月，3日，4时，5分，6秒）其中一个数值
	 * 
	 * 外国的月份是从零开始的
	 * 
	 * @param type
	 *            1, 2, 3, 4, 5, 6
	 * @param time
	 */
	public static int getSingleValueOfTime(int time, int type) {
		int value = 0;
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date((long) time * 1000));
		switch (type) {
		case 1:
			value = calendar.get(Calendar.YEAR);
			break;

		case 2:
			value = calendar.get(Calendar.MONTH);
			break;

		case 3:
			value = calendar.get(Calendar.DATE);
			break;

		case 4:
			value = calendar.get(Calendar.HOUR_OF_DAY);
			break;

		case 5:
			value = calendar.get(Calendar.MINUTE);
			break;

		case 6:
			value = calendar.get(Calendar.SECOND);
			break;

		default:
			break;
		}
		return value;	
	}

	/**
	 * 根据传入的："MM-dd"月日int类型时间 返回
	 * 
	 * @param time
	 *            "MM-dd"格式 字符
	 * @return int 值时间
	 */
	public static int getTimeIntByDayStr(String time) {
		SimpleDateFormat sf = new SimpleDateFormat("yyyy");
		try {
			String dateTime = sf.format(new Date());
			String times = dateTime + "-" + time + " 00:00:00";
			sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = sf.parse(times);
			return (int) (date.getTime() / 1000);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return 0;
	}

	/**
	 * 获取两个时间差
	 * EG:small今天  big明天，return=1
	 * @param small
	 *            小一点的时间
	 * @param big
	 *            大一点的时间
	 * @return 如果small比big要打 返回0
	 */
	public static int getDaysBetween(Integer small, Integer big) {
		if (small > big) {
			return 0;
		}
		if (small == 0) {
			return 0;
		}
		long earlyTime = small.longValue() * 1000;
		long lateTime = big.longValue() * 1000;
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(earlyTime);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		Calendar toCalendar = Calendar.getInstance();
		toCalendar.setTimeInMillis(lateTime);
		toCalendar.set(Calendar.HOUR_OF_DAY, 0);
		toCalendar.set(Calendar.MINUTE, 0);
		toCalendar.set(Calendar.SECOND, 0);
		toCalendar.set(Calendar.MILLISECOND, 0);

		Long a = (toCalendar.getTimeInMillis() - calendar.getTimeInMillis())
				/ (1000 * 60 * 60 * 24);
		return a.intValue();
	}

	/**
	 * 根据传入的格式取得当前的时间字符串
	 * 
	 * @param formt
	 *            格式如："yyyy-MM-dd HH:mm:ss"/"yyyyMMddHHmm"
	 * @return 字符串格式日期时间值
	 */
	public static String getCurrentDateTimeStr(String formt) {
		SimpleDateFormat sf = new SimpleDateFormat(formt);
		return sf.format(new Date());
	}

	/**
	 * 根据传入的："yyyy-MM-dd HH:mm:ss"时间转换成时间戳
	 * 
	 * @param time
	 *            "yyyy-MM-dd HH:mm:ss"格式的时间
	 * @return time 对应的时间戳
	 */
	public static int getTimeIntByStr(String time) {
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			Date date = sf.parse(time);
			return (int) (date.getTime() / 1000);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return 0;
	}
	/**
	 * 根据传入的："yyyy-MM-dd"时间转换成时间戳
	 * 
	 * @param time
	 *            "yyyy-MM-dd HH:mm:ss"格式的时间
	 * @return time 对应的时间戳
	 */
	public static int getTimeInt(String time) {
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			time = time + " 23:59:59";
			Date date = sf.parse(time);
			return (int) (date.getTime() / 1000);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return 0;
	}

	/**
	 * @param time
	 * @return 返回传入字符零点的时间戳
	 */
	public static int getTimeIntByInput(String time) {
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			Date date = sf.parse(time);
			return (int) (date.getTime() / 1000);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return 0;
	}

	/**
	 * @return 返回出入的字符的时间戳
	 */
	public static int getTimeIntByInputStr(String time) {
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		try {
			Date date = sf.parse(time);
			return (int) (date.getTime() / 1000);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return 0;
	}

	/**
	 * 根据传入的时间(秒)，对比当前时间，是否进行重置；只对周一重置的情景有效
	 * 
	 * @param time
	 * @return
	 */
	public static boolean isSameWeekWithToday(int time) {
		int weekTime = 3600 * 24 * 7;
		if ((TimeDateUtil.getCurrentTime() - time) > weekTime) { // 如果时间间距大于一周；必定重置
			return true;
		}
		long dateTime = (long) time * 1000;
		// long currentTime = System.currentTimeMillis();

		Date date = new Date(dateTime);
		Calendar dataCal = Calendar.getInstance(serverTimezone);
		dataCal.setTimeInMillis(date.getTime());
		Calendar currentCal = Calendar.getInstance(serverTimezone);
		currentCal.setTimeInMillis(getRealTime());

		int nowDay = currentCal.get(Calendar.DAY_OF_WEEK) - 1;
		int passDay = dataCal.get(Calendar.DAY_OF_WEEK) - 1;
		if (nowDay == 0) {
			nowDay = 7;
		}
		if (passDay == 0) {
			passDay = 7;
		}
		if (nowDay < passDay) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 获取当前时间周一0点1分时间
	 * 
	 * @return
	 */
	public static int getMondayTime() {
		Calendar dataCal = Calendar.getInstance(realTimezone);
		dataCal.setFirstDayOfWeek(Calendar.MONDAY);
		dataCal.set(Calendar.DAY_OF_WEEK, 2);
		dataCal.set(Calendar.HOUR_OF_DAY, 0);
		dataCal.set(Calendar.MINUTE, 1);
		dataCal.set(Calendar.SECOND, 0);
		return (int) (dataCal.getTimeInMillis() / 1000);
	}

	/**
	 * 判断传入的时间是否小于本周周一零点1分
	 * 
	 * @param time
	 * @return 小于 true 大于等于 false
	 */
	public static boolean isLessMondayZeroOneMinutine(int time) {
		return getMondayTime() >= time;
	}

	/**
	 * 获取两个时间是否为同一个小时
	 * 
	 * @param time1
	 * @param time2
	 * @return true是一个小时
	 */
	public static boolean isSameHour(int time1, int time2) {
		Calendar c1 = Calendar.getInstance(serverTimezone);
		Calendar c2 = Calendar.getInstance(serverTimezone);
		c1.setTimeInMillis(time1 * 1000l);
		c2.setTimeInMillis(time2 * 1000l);
		return c1.get(Calendar.HOUR_OF_DAY) == c2.get(Calendar.HOUR_OF_DAY);

	}

	/**
	 * 现在是否处于重置时间
	 * 
	 * @return true为是
	 */
	public static boolean isNowZeroHandleTime() {
		int currTime = TimeDateUtil.getCurrTimeWithZeroSec();
		Calendar c1 = Calendar.getInstance();
		c1.setTimeInMillis(currTime * 1000l);
		int hour = c1.get(Calendar.HOUR_OF_DAY);
		int minute = c1.get(Calendar.MINUTE);
		try {
			if ((hour == 23 && minute > 50) || (hour == 0 && minute < 10)) {
				log.info("execute suspend,now:"
						+ TimeDateUtil.printOnlyTime(currTime));
				return true;
			}
		} catch (Exception e1) {
			log.error(LogTool.exception(e1));
			return false;
		}
		return false;
	}

	// 获取当月第一天
	public static String getFirstDayOfMonth() {
		String str = "";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		Calendar lastDate = Calendar.getInstance(realTimezone);
		lastDate.setTimeInMillis(getRealTime());
		lastDate.set(Calendar.DATE, 1);// 设为当前月的1号
		str = sdf.format(lastDate.getTime());
		return str;
	}
	
	/**
	 * 获得当月第一天
	 * @return
	 */
	public static int getFirstDayOfMonthInt() {
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(getRealTime());
		calendar.set(Calendar.DATE, 1);// 设为当前月的1号
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return (int) (calendar.getTimeInMillis() / 1000);
	}

	/**
	 * 获得这个月第一天
	 * 
	 * @return 如：2014-03-01 00:00:00
	 */
	public static String getFristDayofMonthTwo() {
		final StringBuilder builder = new StringBuilder();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar lastDate = Calendar.getInstance(realTimezone);
		lastDate.setTimeInMillis(getRealTime());
		lastDate.set(Calendar.DATE, 1);// 设为当前月的1号
		builder.append(sdf.format(lastDate.getTime())).append(" 00:00:00");
		return builder.toString();
	}

	/**
	 * 获得这个月有多少天
	 * 
	 * @return
	 */
	public static int getDayOfMonth() {
		Calendar lastDate = Calendar.getInstance();
		return lastDate.getActualMaximum(Calendar.DAY_OF_MONTH);
	}

	// 获得当前日期与本周日相差的天数
	private static int getMondayPlus() {
		Calendar cd = Calendar.getInstance();
		// 获得今天是一周的第几天，星期日是第一天，星期二是第二天......
		int dayOfWeek = cd.get(Calendar.DAY_OF_WEEK) - 1; // 因为按中国礼拜一作为第一天所以这里减1
		if (dayOfWeek == 0) {
			return -6;
		}
		if (dayOfWeek == 1) {
			return 0;
		} else {
			return 1 - dayOfWeek;
		}
	}

	// 根据当前时间获得下周星期一的日期
	public static String getNextMonday() {
		int mondayPlus = getMondayPlus();
		GregorianCalendar currentDate = new GregorianCalendar();
		currentDate.add(GregorianCalendar.DATE, mondayPlus + 7);
		Date monday = currentDate.getTime();
		DateFormat df = DateFormat.getDateInstance();
		String preMonday = df.format(monday);
		return preMonday;
	}

	public static int getEightClock() {
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(getRealTime());
		calendar.set(Calendar.HOUR_OF_DAY, 8);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return (int) (calendar.getTimeInMillis() / 1000);
	}

	/**
	 * 判断传入的时间是否小于本周周一零点1分
	 * 
	 * @param time
	 * @return 小于 true 大于等于 false
	 */
	public static boolean isLessMondayZeroMinutine(int time) {
		return getMondayZeroTime() > time;
	}

	/**
	 * 判断传入的时间是否大于周一的零点零分的时间
	 * 
	 * @param time
	 *            时间
	 * @return
	 */
	public static boolean isAfterMonDayZeroTime(int time) {
		boolean result = false;
		// 获取下周一零点的时间
		// 将时间转为Date,
		Calendar instance = Calendar.getInstance(realTimezone);
		instance.setFirstDayOfWeek(Calendar.MONDAY);
		instance.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		instance.set(Calendar.HOUR_OF_DAY, 0);
		instance.set(Calendar.MINUTE, 0);
		instance.set(Calendar.SECOND, 0);
		int timeInMillis = (int) (instance.getTimeInMillis() / 1000);
		// System.err.println(timeInMillis);
		if (timeInMillis > time) {
			result = true;
		}
		return result;
	}

	public static int getNextFewDayTime(int days) {
		return getCurrentTime() + ONE_DAY_INT * days;
	}

	/**
	 * 判断当前时间是否在传入的：startTime，endTime时间之间 是 true 否 false
	 */
	public static boolean isBetweenTimes(int startTime, int endTime) {
		int currentTime = getCurrentTime();
		return (startTime <= currentTime && endTime >= currentTime);
	}

	/**
	 * 获取当前时间周一0点5分时间
	 * 
	 * @return
	 */
	public static int getMondayZeroFiveTime() {
		Calendar dataCal = Calendar.getInstance(realTimezone);
		dataCal.setFirstDayOfWeek(Calendar.MONDAY);
		dataCal.set(Calendar.DAY_OF_WEEK, 2);
		dataCal.set(Calendar.HOUR_OF_DAY, 0);
		dataCal.set(Calendar.MINUTE, 5);
		dataCal.set(Calendar.SECOND, 0);
		return (int) (dataCal.getTimeInMillis() / 1000);
	}

	/**
	 * 获取下周一0点5分时间
	 * 
	 * @return
	 */
	public static int getNextMondayZeroFiveTime() {
		return getMondayZeroFiveTime() + ONE_DAY_INT * 7;
	}

	/**
	 * 获取今天0点15分的时间
	 * 
	 * @return
	 */
	public static int getTodayZeroFifteenTime() {
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(getRealTime());
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 15);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return (int) (calendar.getTimeInMillis() / 1000);
	}

	/**
	 * 获取昨天的0点15分的时间
	 * 
	 * @return
	 */
	public static int getYesterdayZeroFifteenTime() {
		return getTodayZeroFifteenTime() - ONE_DAY_INT;
	}

	/**
	 * 以00:00:00倒计时的形式返回
	 * 
	 * @param time
	 *            时间差
	 * @return
	 */
	public static String printTimeInCountdown(long time) {
		int leftTime = Long.valueOf(time / 1000).intValue();
		int hour = leftTime / TimeDateUtil.ONE_HOUR_INT;
		leftTime = leftTime - hour * TimeDateUtil.ONE_HOUR_INT;
		int minute = leftTime / TimeDateUtil.ONE_MINUTE;
		leftTime = leftTime - minute * TimeDateUtil.ONE_MINUTE;
		int second = leftTime / TimeDateUtil.ONE_SECOND;
		return hour + ":" + minute + ":" + second;
	}

	/**
	 * 获得两个时间相差多少天； （使用零点计算）
	 * 
	 * @param oldTime
	 *            开始时间
	 * @return
	 */
	public static int betweenCurrTimeOverDay(int beginTime) {
		int currentTime = TimeDateUtil.getOneDayZeroTime(getCurrentTime());
		beginTime = TimeDateUtil.getOneDayZeroTime(beginTime);
		return ((currentTime - beginTime) / TimeDateUtil.ONE_DAY_INT) + 1;
	}

	/**
	 * 获取当前时分
	 * @return
	 */
	public static int getNowBeginhourInt() {
		Calendar c = Calendar.getInstance(serverTimezone);
		c.setTimeInMillis(getRealTime());
		int h = c.get(Calendar.HOUR_OF_DAY);
		int m = c.get(Calendar.MINUTE);
		int s = c.get(Calendar.SECOND);
		String secondStr = s < 10 ? 0+ "" +s: s + "";
		if(m < 10) return Integer.parseInt(h + "0" + m + secondStr);
		return Integer.parseInt(h + "" + m + secondStr);
	}
	
	/**
	 * 获取指定时间时分
	 * @param time
	 * @return
	 */
	public static int getTimeBeginhourInt(int time) {
//		Calendar c = Calendar.getInstance(realTimezone);
		Calendar c = Calendar.getInstance(serverTimezone);
		c.setTimeInMillis(time * 1000l);
		int h = c.get(Calendar.HOUR_OF_DAY);
		int m = c.get(Calendar.MINUTE);
		int s = c.get(Calendar.SECOND);
		String secondStr = s < 10 ? 0+ "" +s: s + "";
		if(m < 10) return Integer.parseInt(h + "0" + m + secondStr);
		return Integer.parseInt(h + "" + m + secondStr);
	}
	
	/**
	 * 计算指定时间的周几
	 * @param time
	 * @return
	 */
	public static int getWeek(int time) {
		// 再转换为时间
		Calendar c = Calendar.getInstance(serverTimezone);
		c.setTimeInMillis(time * 1000l);
		if(c.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY){
			return 7;
		}
		return c.get(Calendar.DAY_OF_WEEK)-1;
	}
	
	/**
	 * 获取时间 从月份开始 如 10月1日0点 则返回 10010000
	 * @return
	 */
	public static int getTimeBeginMonth(int now) {
		Calendar c = Calendar.getInstance(serverTimezone);
		c.setTimeInMillis(now);
		int month = c.get(Calendar.MONTH) + 1;
		String d = c.get(Calendar.DAY_OF_MONTH) < 10 ? "0" + c.get(Calendar.DAY_OF_MONTH):"" + c.get(Calendar.DAY_OF_MONTH) ;
		String h = c.get(Calendar.HOUR_OF_DAY) < 10 ? "0" + c.get(Calendar.HOUR_OF_DAY) : "" + c.get(Calendar.HOUR_OF_DAY);
		String m = c.get(Calendar.MINUTE) < 10 ? "0" + c.get(Calendar.MINUTE) : "" + c.get(Calendar.MINUTE);
		return Integer.parseInt(month + "" + d + h + m);
	}
	
	/**
	 * 获取时间 从月份开始 如 10月1日0点 则返回 10010000
	 * @return
	 */
	public static int getNowBeginMonth() {
		Calendar c = Calendar.getInstance(serverTimezone);
		c.setTimeInMillis(getRealTime());
		int month = c.get(Calendar.MONTH) + 1;
		String d = c.get(Calendar.DAY_OF_MONTH) < 10 ? "0" + c.get(Calendar.DAY_OF_MONTH):"" + c.get(Calendar.DAY_OF_MONTH) ;
		String h = c.get(Calendar.HOUR_OF_DAY) < 10 ? "0" + c.get(Calendar.HOUR_OF_DAY) : "" + c.get(Calendar.HOUR_OF_DAY);
		String m = c.get(Calendar.MINUTE) < 10 ? "0" + c.get(Calendar.MINUTE) : "" + c.get(Calendar.MINUTE);
		return Integer.parseInt(month + "" + d + h + m);
	}
	
	/**
	 * 当天+-day天的某时某刻
	 * @param day
	 * @param hour
	 * @param min
	 * @param sce
	 * @return
	 */
	public static int getOneTime(int day,int hour,int min,int sce){
		Calendar calendar=Calendar.getInstance();
		calendar.setTimeInMillis(getRealTime());
		calendar.set(Calendar.DATE, calendar.get(Calendar.DATE)+day);  
		calendar.set(Calendar.HOUR_OF_DAY, hour); 
		calendar.set(Calendar.MINUTE, min);   
		calendar.set(Calendar.SECOND, sce);
		return (int) (calendar.getTime().getTime()/1000);
	}
	
	/**
	 * 获得周几的某时某分某秒的时间
	 * @param week 周，星期一为1，星期二为2，星期三为3，星期四为4，星期五为5，星期六为6，星期天为7
	 * @param hour 时
	 * @param min 分
	 * @param sce 秒
	 * @return 时间戳
	 */
	public static int getWeekOneTime(int week, int hour,int min,int sce){
		Calendar calendar=Calendar.getInstance();
		calendar.setTimeInMillis(getRealTime());
		if(week == 7){ //处理周日
			week = 0;
		}
		calendar.set(Calendar.DAY_OF_WEEK, week + 1);
		calendar.set(Calendar.HOUR_OF_DAY, hour);
		calendar.set(Calendar.MINUTE, min);
		calendar.set(Calendar.SECOND, sce);
		return (int) (calendar.getTime().getTime()/1000);
	}
	
	/**
	 * 获得相隔几年的某月某日某时某分某秒的时间
	 * @param year 相隔几年+-year
	 * @param month 月
	 * @param day 日
	 * @param hour 时
	 * @param min 分
	 * @param sce 秒
	 * @return 时间戳
	 */
	public static int getYearOneTime(int year, int month, int day, int hour, int min, int sce){
		Calendar calendar=Calendar.getInstance();
		calendar.setTimeInMillis(getRealTime());
		calendar.add(Calendar.YEAR, year);
		calendar.set(Calendar.MONTH, month-1);
		calendar.set(Calendar.DAY_OF_MONTH, day);
		calendar.set(Calendar.HOUR_OF_DAY, hour);
		calendar.set(Calendar.MINUTE, min);
		calendar.set(Calendar.SECOND, sce);
		return (int) (calendar.getTime().getTime()/1000);
	}
	
	public static void setModifyTime(int now) {
		modifyTime = now;
	}

	/**
	 * 获取某个时间的分钟
	 */
	public static int getOneDayMinutes(int now) {
		Calendar c = Calendar.getInstance(serverTimezone);
		c.setTimeInMillis(now * 1000l);
		//System.out.println();
		return c.get(Calendar.MINUTE);
	}
	
	/**
	 * 获取对应开服天数的时间
	 * @param days 开服多少天
	 * @param isEnd true(为当天23:59:59)
	 * @return
	 */
	public static int getOpenDaysTime(int days, boolean isEnd) {
		int zeroTime = getOneDayZeroTime(GameProperties.serverOpenTime);
		zeroTime = zeroTime + ONE_DAY_INT * (days - 1);
		if(isEnd) {
			zeroTime = zeroTime + ONE_DAY_INT - 1;
		}
		return zeroTime;
	}

	/**
	 * 服务器开启时间是否超过X天
	 * @param days X天
	 * @return true为超过X天
	 */
	public static boolean serverOpenOverDays(int days) {
		int daysBetween = getDaysBetween(GameProperties.serverOpenTime, getCurrentTime())+1;
		if(daysBetween>days){
			return true;
		}
		return false;
	}
	
	/**
	 * 服务器开启时间是否大于或等于X天
	 * @param days X天
	 * @return true为大于或等于X天
	 */
	public static boolean serverOpenAtOverDays(int days) {
		int daysBetween = getDaysBetween(GameProperties.serverOpenTime, getCurrentTime())+1;
		if(daysBetween>=days){
			return true;
		}
		return false;
	}
	
	/**
	 * 获取当前时间下周日14点0分时间
	 * @return
	 */
	public static int getNextSundayFourteenTime() {
		Calendar dataCal = Calendar.getInstance(serverTimezone);
		dataCal.setTimeInMillis(getRealTime());
		dataCal.setFirstDayOfWeek(Calendar.SUNDAY);
		dataCal.set(Calendar.DAY_OF_WEEK, 1);
		dataCal.set(Calendar.HOUR_OF_DAY, 14);
		dataCal.set(Calendar.MINUTE, 0);
		dataCal.set(Calendar.SECOND, 0);
		int time = (int) (dataCal.getTimeInMillis() / 1000);
		return time + ONE_DAY_INT * 7;
		
	}
	
	/**
	 * 获取几周后周几几点几分的时间
	 * @author lobbyer
	 * @param calWeek 0为本周 1为一周后
	 * @param week 1为周一
	 * @param hour 小时
	 * @param minute 分钟
	 * @return
	 * @date 2016年6月26日
	 */
	public static int getNextWeekTime(int calWeek, int week, int hour, int minute) {
		Calendar dataCal = Calendar.getInstance(serverTimezone);
		dataCal.setTimeInMillis(getRealTime());
		dataCal.setFirstDayOfWeek(Calendar.SUNDAY);
		dataCal.set(Calendar.DAY_OF_WEEK, week+1);
		dataCal.set(Calendar.HOUR_OF_DAY, hour);
		dataCal.set(Calendar.MINUTE, minute);
		dataCal.set(Calendar.SECOND, 0);
		int time = (int) (dataCal.getTimeInMillis() / 1000);
		return time + ONE_DAY_INT * calWeek * 7;
	}
	
	/**
	 * 获取当日整点时间
	 */
	public static int getTimeOfTheClock(int hour) {
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(getRealTime());
		calendar.setFirstDayOfWeek(Calendar.MONDAY);
		calendar.set(Calendar.HOUR_OF_DAY, hour);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return (int) (calendar.getTimeInMillis() / 1000);
	}
	
	/**
	 * 根据当前星期几获得下一个星期X的时间，用于2,4,6，如现在是星期2，返回星期4,如果不是当前2,4,6，返回0
	 * @param hour 指定的小时 0-23(0点填入0)
	 * @param min 指定分钟
	 * @return
	 */
	public static int getNextTitleDeadTime246(int hour,int min){
		if(hour>23) return 0;
		Calendar c = Calendar.getInstance(serverTimezone);
		c.setTimeInMillis(getRealTime());
		int week = c.get(Calendar.DAY_OF_WEEK);
		int next = 0;
		int addTime = 0;
		if(week ==Calendar.TUESDAY){
			next = Calendar.THURSDAY;
		}else if(week ==Calendar.THURSDAY){
			next = Calendar.SATURDAY;
		}else if(week ==Calendar.SATURDAY){
			next = Calendar.TUESDAY;
			addTime = ONE_DAY_INT * 7;
		}else{
			return 0;
		}
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(getRealTime());
		calendar.set(Calendar.HOUR_OF_DAY, hour);
		calendar.set(Calendar.DAY_OF_WEEK, next);
		calendar.set(Calendar.MINUTE, min);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return (int) (calendar.getTimeInMillis() / 1000)+ addTime;
	}
	/**
	 * 根据当前星期几获得下一个星期X的时间，用于1,3,5，如现在是星期1，返回星期3，如果不是当前1,3,5，返回0
	 * @param hour 指定的小时 0-23(0点填入0)
	 * @param min 指定分钟
	 * @return
	 */
	public static int getNextTitleDeadTime135(int hour,int min){
		if(hour>23) return 0;
		Calendar c = Calendar.getInstance(serverTimezone);
		c.setTimeInMillis(getRealTime());
		int week = c.get(Calendar.DAY_OF_WEEK);
		int addTime = 0;
		int next = 0;
		if(week ==Calendar.MONDAY){
			next = Calendar.WEDNESDAY;
		}else if(week ==Calendar.WEDNESDAY){
			next = Calendar.FRIDAY;
		}else if(week ==Calendar.FRIDAY){
			next = Calendar.MONDAY;
			addTime = ONE_DAY_INT * 7;
		}else{
			return 0;
		}
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(getRealTime());
		calendar.set(Calendar.HOUR_OF_DAY, hour);
		calendar.set(Calendar.DAY_OF_WEEK, next);
		calendar.set(Calendar.MINUTE, min);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return (int) (calendar.getTimeInMillis() / 1000) + addTime;
	}
	
	/**
	 * 两个时间是否同一天
	 * 
	 * @param ms1
	 * @param ms2
	 * @return
	 */
	public static boolean isSameDay(final long ms1, final long ms2) {
		// final long interval = ms1 - ms2;
		// return interval < MILLIS_IN_DAY && interval > -1L * MILLIS_IN_DAY&&
		// toDay(ms1) == toDay(ms2);
		int zero1 = getOneDayZeroTime((int) (ms1 / 1000));
		int zero2 = getOneDayZeroTime((int) (ms2 / 1000));
		if (zero1 == zero2) {
			return true;
		}
		return false;
	}
	
	private static long toDay(long millis) {
		return (millis + TimeZone.getDefault().getOffset(millis))/ MILLIS_IN_DAY;
	}
	
	
	/**
	 * 计算今天是开服第几天。返回值从1开始，例如今天开服，则返回1；
	 * @return
	 */
	public static int betweenOpen(){
		int openDayZero = getOneDayZeroTime(GameProperties.serverOpenTime);
		return ((getTodayZeroTimeReturnInt() - openDayZero)/(3600*24))+1;
		 
	}
	
	/**
	 * 计算传入是是开服第几天
	 * @param time
	 * @return
	 */
	public static int betweenOpen(int time) {
		if (time < GameProperties.serverOpenTime) {
			return 0;
		}
		int openDayZero = getOneDayZeroTime(GameProperties.serverOpenTime);
		return ((getOneDayZeroTime(time) - openDayZero) / (3600 * 24)) + 1;
	}

	/**
	 * 从上次离线到这次登陆已经过多少天了
	 * @param loginTime
	 * @param logoutTime
	 * @return
	 */
	public static int countOfflineDays(int loginTime, int logoutTime) {
		int  offlineDays = 0;
		if (logoutTime>loginTime) {
			return 0;
		}
		int loginTimeZeroTime=getOneDayZeroTime(loginTime);
		int logoutTimeZeroTime=getOneDayZeroTime(logoutTime);
		offlineDays = (loginTimeZeroTime-logoutTimeZeroTime) / (60 * 60 * 24);   
		return offlineDays;
	}
	
	/*
	 * 获取精准分钟
	 * 12:56:15
	 * return 12:56:00
	 */
	public static int getSecondZero(int time) {
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis((long) time * 1000);
		calendar.set(Calendar.SECOND, 0);
		return (int)(calendar.getTimeInMillis()/1000);
	}
	
	/**
	 * 传入确定的小时和分钟，获取时间
	 * @param hour
	 * @param minute
	 * @return
	 */
	public static int getTimeHourAndMinute(int hour, int minute) {
		Calendar calendar = Calendar.getInstance(serverTimezone);
		calendar.setTimeInMillis(getRealTime());
		calendar.set(Calendar.HOUR_OF_DAY, hour);
		calendar.set(Calendar.MINUTE, minute);
		calendar.set(Calendar.SECOND, 0);
		return (int) (calendar.getTimeInMillis() / 1000);
	}
	
	/**
	 * 在距离活动多少天结束
	 * 
	 * @param beforeDay
	 * @return
	 * @throws Exception 
	 */
	public static boolean isActEndBeforeDay(int indexId, int xtcsId) {
		int day = 0;
		int actEndTime = 0;
		int endTime = 0;
		try {
			day = Config_xtcs_004.getIns().get(xtcsId).getNum();
			Integer[] array = CommonRankSysCache.getIndexConfigMap().get(indexId);
			actEndTime = array[0];
			endTime = actEndTime - day * TimeDateUtil.ONE_DAY_INT;
			int currentTime = TimeDateUtil.getCurrentTime();
			if (endTime < actEndTime && currentTime >= endTime && currentTime < actEndTime) {
				return true;
			}
			return false;
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, TimeDateUtil.class, "indexId:" + indexId + " xtcsId:" + xtcsId + " day:" + day
					+ " actEndTime:" + actEndTime + " endTime:" + endTime);
			return false;
		}
	}
	
	/**
	 * 是否系统开启表开启天数延迟一天后最后那一天
	 * @param sysId
	 * @param isHasSysId 是否根据提供系统id进行开启天数条件判断
	 * @param day 自己提供的系统开启天数条件
	 * @return
	 */
	public static boolean isDelayLastDay(int sysId, boolean isHasSysId, int day) {
		int betweenOpen = TimeDateUtil.betweenOpen();
		if (isHasSysId) {
			Struct_xitong_001 xitongkaiqi_001 = Config_xitong_001.getIns().get(sysId);
			if (xitongkaiqi_001 == null) {
				return false;
			}
			day = xitongkaiqi_001.getDay();
		}
		if (day > 1000 && (day % 1000 + 1 == betweenOpen)) {
			return true;
		}
		return false;
	}

}