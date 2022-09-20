package com.teamtop.util.Properties;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.RandomAccessFile;
import java.net.URLDecoder;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;

/**
 * 
 * @name：PropertiesTools
 * @description：资源文件操作工具类
 * @author：yxh
 * @date：2012-7-23 上午09:03:23
 * @moidfy：
 * @version 1.0.0
 * 
 */
public class PropertiesTools {
	// 资源文件加载类
	private static SafeProperties properties = null;
	public static SafeProperties getProperties(){
		return properties;
	}
	/**
	 * 
	 * 从资源文件中获取一个String类型值
	 * 
	 * @name getProperties
	 * @param key
	 *            键值
	 * @return String "" 代表取不到
	 * @throws Exception
	 * @author yxh
	 * @throws RunServerException 
	 */
	public static String getProperties(String key){
		String rtn = properties.getProperty(key);
		if(rtn==null){
			try {
				throw new RunServerException(null, "can't find game propertity:"+key);
			} catch (Exception e) {
				
			}
		}
		return rtn;
	}

	/**
	 * 
	 * 从资源文件中获取一个int类型值
	 * 
	 * @name getPropertiesInt
	 * @param key
	 *            键值
	 * @return int Integer.MIN_VALUE 代表取不到
	 * @throws Exception
	 * @author yxh
	 */
	public static int getPropertiesInt(String key){
		String val = "";
		if (properties.containsKey(key)) {
			val = properties.getProperty(key);
			if (NumberUtils.isNumber(val)) {
				return NumberUtils.toInt(val);
			}
		} else {
			try {
				throw new RunServerException(null, " getPropertiesInt not find this key key=" + key);
			} catch (Exception e) {
				
			}
		}
		return Integer.MIN_VALUE;
	}
	public static boolean getBooleanOrInit(String key,String path){
		Object value = getOrInit(key, path);
		String v = value.toString();
		return "1".equals(v) || "true".equals(v);
	}
	/**
	 * 获取某个key对应的值，如果配置文件未加载会在这里初始化
	 * @param key 
	 * @param path 需要加载的配置文件路径
	 * @return
	 * @throws RunServerException
	 */
	public static Object getOrInit(String key,String path){
		if(properties==null){
			try {
				initPropretiesWithOutFolder(path);
			} catch (RunServerException e) {
				e.printStackTrace();
			}
		}
		return properties.get(key);
	}

	/**
	 * 初始化加载资源文件(可加载src外的包) 不加载init
	 * 
	 * @param profile
	 *            文件位置
	 * @throws RunServerException
	 */
	public static void initPropretiesWithOutFolderInit(String filePath) throws RunServerException {
		if (StringUtils.isBlank(filePath))
			throw new RunServerException(null,filePath+" fileName is empty init properites fial");
		try {
			properties = new SafeProperties();
			filePath = URLDecoder.decode(filePath, "utf-8");
			BufferedInputStream in = new BufferedInputStream(new FileInputStream(filePath));
			properties.load(in);
		} catch (Exception e) {
			throw new RunServerException(e,"initPropretiesWithOutFolder fail");
		}
	}
	/**
	 * 初始化加载资源文件(可加载src外的包)
	 * 
	 * @param profile
	 *            文件位置
	 * @throws RunServerException
	 */
	public static void initPropretiesWithOutFolder(String filePath) throws RunServerException {
		if (StringUtils.isBlank(filePath))
			throw new RunServerException(null,filePath+" fileName is empty init properites fial");
		try {
			properties = new SafeProperties();
			filePath = URLDecoder.decode(filePath, "utf-8");
			BufferedInputStream in = new BufferedInputStream(new FileInputStream(filePath));
			properties.load(in);
			GameProperties.init();
		} catch (Exception e) {
			throw new RunServerException(e,"initPropretiesWithOutFolder fail");
		}
	}

	/**
	 * 添加/修改属性值
	 * 
	 * @param key
	 * @param value
	 */
	public static void setPropreties(final String key, final String value) {
		properties.put(key, value);
	}

	/**
	 * 保存修改后的配置文件
	 * 
	 * @throws Exception
	 */
	public static void saveProperties(String fileName) throws Exception {
		String name = "game.properties";
		if (!StringUtils.isBlank(fileName)) {
			name = fileName;
		}
		properties.store(new FileOutputStream(GamePath.CONFIG_DIR + name), null);
	}

	public static void main(String[] args) {
		try {
			initPropretiesWithOutFolder("game.properties");
			System.out.println(properties.get("serverOpenTime"));
			properties.put("serverOpenTime", "2013-08-22 10:00:00");
			System.out.println(properties.get("serverOpenTime"));
			properties.store(new FileOutputStream("config" + GamePath.SEP + "game.properties"), null);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 初始化properties文件
	 * 
	 * @param profile
	 * @return
	 * @throws Exception
	 */
	public static SafeProperties initPropreties(String profile) throws Exception {
		if (StringUtils.isBlank(profile))
			throw new Exception("fileName is empty init properites fial");
		SafeProperties properties = new SafeProperties();
		try {
			String filePath = GamePath.CONFIG_DIR + profile;
			filePath = URLDecoder.decode(filePath, "utf-8");
			BufferedInputStream in = new BufferedInputStream(new FileInputStream(filePath));
			properties.load(in);
			return properties;
		} catch (Exception e) {
			throw new RunServerException(e,"initPropreties fail");
		}
	}
	
	public static String getVersion(){
		RandomAccessFile rf = null;
		String line = null;
	    try {
	    	String path = GamePath.USER_DIR + "/bin/version";
			path = URLDecoder.decode(path, "utf-8");
	    	rf = new RandomAccessFile(path, "r");
	    	long len = rf.length();
	    	long start = rf.getFilePointer();
	    	long nextend = start + len - 1;
	    	rf.seek(nextend);
	    	int c = -1;
	    	while (nextend > start) {
	    		c = rf.read();
	    		if (c == '\n' || c == '\r') {
	    			line = rf.readLine();
	    			System.out.println(line);
	    			nextend--;
	    			break;
	    		}
	    		nextend--;
	    		rf.seek(nextend);
		    	if (nextend == 0) {// 当文件指针退至文件开始处，输出第一行
		    		line = rf.readLine();
		    	}
	    	}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
		  try {
			  if (rf != null)
				  rf.close();
		  } catch (Exception e) {
			  e.printStackTrace();
		  }
		}
		return line;
	}
}