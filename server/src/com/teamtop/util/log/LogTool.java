package com.teamtop.util.log;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@SuppressWarnings("rawtypes")
public class LogTool {
	private static Map<Class, Logger> logmap = new HashMap<Class, Logger>();
	
	public static Logger getLogger(Class clazz){
		Logger logger = logmap.get(clazz);
		if(logger==null){
			logger = LoggerFactory.getLogger(clazz);
			logmap.put(clazz, logger);
		}
		return logger;
	}
	public static String getmsg(String desc){
		return desc;
	}
	public static String getmsg(long hid,String name,String desc){
		return new StringBuffer().append("(ID:").append(hid).append("),Name:").append(name).append(",rec:")
				.append(desc).toString();
	}
	public static void info(String desc,Class clazz){
		getLogger(clazz).info(desc);
	}
	public static void info(long hid,String name,String desc,Object obj){
		getLogger(obj.getClass()).info(new StringBuffer().append("(ID:").append(hid).append("),Name:").append(name).append(",rec:")
				.append(desc).toString());
	}
	public static void info(String desc,Object obj){
		getLogger(obj.getClass()).info(desc);
	}
	public static void warn(String desc,Class clazz){
		getLogger(clazz).warn(desc);
	}
	public static void warn(String desc,Object obj){
		getLogger(obj.getClass()).warn(desc);
	}

	public static void error(Throwable t, Class clazz, String... desc) {
		if (t != null) {
			final StringWriter sw = new StringWriter();
			final PrintWriter pw = new PrintWriter(sw);
			t.printStackTrace(pw);
			getLogger(clazz).error(sw.toString() + (desc.length > 0 ? desc[0] : ""));
		}
	}

	public static void error(Exception e,Class clazz,String... desc){
		if (e != null) {
			final StringWriter sw = new StringWriter();
			final PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			getLogger(clazz).error(sw.toString()+(desc.length>0?desc[0]:""));
		}
	}
	public static void error(Exception e,Object obj,String... desc){
		if (e != null) {
			final StringWriter sw = new StringWriter();
			final PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			getLogger(obj.getClass()).error(sw.toString()+(desc.length>0?desc[0]:""));
		}
	}
	public static void error(Exception e,Object obj,long hid,String name,String... desc){
		if (e != null) {
			final StringWriter sw = new StringWriter();
			final PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			getLogger(obj.getClass()).error(sw.toString()+",hid:"+hid+",name:"+name+(desc.length>0?desc[0]:""));
		}
	}
	public static String exception(Exception e,long hid,String name,String desc){
		return exception(e)+",hid:"+hid+",name:"+name+","+desc;
	}
	public static String exception(Exception e,String desc){
		return exception(e)+","+desc;
	}
	public static String exception(Exception e,long hid,String desc){
		return exception(e)+","+hid+","+desc;
	}
	public static String exception(Exception e){
		return errmsg(e);
	}
	public static String errmsg(Exception e){
		if (e != null) {
			final StringWriter sw = new StringWriter();
			final PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			return sw.toString();
		}
		return null;
	}
	/**
	 * ??????????????????,??????????????????
	 * @param desc ??????
	 * @return ?????????????????????
	 *//*
	public static String rec(String desc){
		return new StringBuffer().append("rec:").append(desc).toString();
	}
	*//**
	 * ??????????????????,????????????????????????id???????????????,??????
	 * @param rid ??????id
	 * @param name ????????????
	 * @param desc ??????
	 * @return ?????????????????????
	 *//*
	public static String rec(long rid,String name,String desc){
		return new StringBuffer().append("(ID:").append(rid).append("),Name:").append(name).append(",rec:")
				.append(desc).toString();
	}
	
	*//**
	 * ???????????????,?????????????????????
	 * @param e ??????
	 * @return ?????????????????????
	 *//*
	public static String exception(Exception e){
		if (e != null) {
			final StringWriter sw = new StringWriter();
			final PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			return sw.toString();
		}
		return "No Exception";
	}
	
	public static String exception(Throwable throwable){
		if (throwable != null) {
			final StringWriter sw = new StringWriter();
			final PrintWriter pw = new PrintWriter(sw);
			throwable.printStackTrace(pw);
			return sw.toString();
		}
		return "No Exception";
	}
	
	*//**
	 * ???????????????,?????????????????????
	 * @param e ??????
	 * @return ?????????????????????
	 *//*
	public static String exception(Exception e,final String desc){
		if (e != null) {
			final StringWriter sw = new StringWriter();
			final PrintWriter pw = new PrintWriter(sw);
			sw.append(desc).append("\n");
			e.printStackTrace(pw);
			return sw.toString();
		}
		return "No Exception";
	}
	
	*//**
	 * ???????????????,?????????????????????
	 * @param e ??????
	 * @return ?????????????????????
	 *//*
	public static String exception(Exception e,long rid,final String name,final String desc){
		if (e != null) {
			final StringWriter sw = new StringWriter();
			final PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			sw.append("(ID:").append(rid+"").append("),Name:").append(name).append(",??????:").append(desc);
			return sw.toString();
		}
		return "No Exception";
	}
	*//**
	 * ???????????????,?????????????????????
	 * @param e ??????
	 * @return ?????????????????????
	 *//*
	public static String exception(Exception e,long rid,final String desc){
		if (e != null) {
			final StringWriter sw = new StringWriter();
			final PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			sw.append("ID:").append(rid+"").append(",??????:").append(desc);
			return sw.toString();
		}
		return "No Exception";
	}*/
	/**
	 * ??????????????????????????????????????????
	 * ??????????????????????????????
	 * @param size ?????? size<=-1,???????????????; size ??????????????? 
	 * @return
	 */
	public static String getCaller(int size){
		Throwable t = new Throwable();
		StackTraceElement stack[] = t.getStackTrace();
		StringBuffer sb = new StringBuffer();
		size = size<=-1?stack.length:size;
		size = size<=4?4:size;
		for(int i=1;i<size;i++){
			sb.append(stack[i]).append("\n");
		}
		return sb.toString();
	}
	
	/**
	 * ??????????????????????????????????????????
	 * ??????????????????????????????
	 * @param size ?????? size<=-1,???????????????; size ??????????????? 
	 * @return
	 */
	public static String getCallerNotSelf(int size){
		Throwable t = new Throwable();
		StackTraceElement stack[] = t.getStackTrace();
		StringBuffer sb = new StringBuffer();
		size = size<=-1?stack.length:size;
		size = size<=3?3:size;
		for(int i=2;i<size;i++){
			sb.append(stack[i]).append("\n");
		}
		return sb.toString();
	}
	
	/**
	 * ??????????????????????????????????????????
	 * ??????????????????????????????
	 * @return
	 */
	public static String getCaller(){
		Throwable t = new Throwable();
		StackTraceElement stack[] = t.getStackTrace();
		StringBuffer sb = new StringBuffer();
		int size =stack.length;
		for(int i=1;i<size;i++){
			sb.append(stack[i]).append("\n");
		}
		return sb.toString();
	}
	/**
	 * ??????????????????
	 * @param desc
	 * @param port
	 * @return
	 */
	public static String showStartComplete(String desc,int port){
		String msg = "start complete,"+desc+",port:"+port;
//		System.err.println(msg);
		return msg;
	}
	
	public static String showInitComplete(String desc){
		String msg = "init complete:"+desc;
//		System.err.println(msg);
		return msg;
	}
	public static String showRunComplete(String desc){
		String msg = "run complete:"+desc;
//		System.err.println(msg);
		return msg;
	}
	
	public static String getRunCompleteFlagStr(){
		return "set run complete flag";
	}
}
