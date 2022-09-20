package com.teamtop.gameCommon;

import java.io.File;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.teamtop.main.RunServerException;

/**
 * 游戏内的同游路径
 * @author Administrator
 *
 */
public class GamePath {
	/**
	 * 操作系统分隔符
	 */
	public static String SEP = System.getProperty("file.separator");
	/**
	 * 工程的绝对地址,直接定位到bin外的目录
	 */
	public static String USER_DIR;
	/**
	 * 下载日志的基础目录,通过读取logback.xml配置
	 */
	public static String LOG_DOWNLOAD_DIR;
	
	/**
	 * 配置文件夹路径，已包含/
	 */
	public static String CONFIG_DIR;
	/**
	 * 配置文件里的部署文件夹路径，已包含/
	 */
	public static String CONFIG_REDEPLOY_DIR;
	
	static{
		boolean hasBin = false;
		USER_DIR= System.getProperty("user.dir");
//		System.err.println("ori user dir:"+USER_DIR);
		Pattern pattern = Pattern.compile("bin");
		Matcher matcher = pattern.matcher(USER_DIR);
		if(matcher.find()){
			//正式发布有bin eclipse没有bin
			hasBin = true;
			USER_DIR = matcher.replaceAll("");
		}
		if(USER_DIR.lastIndexOf(SEP)==USER_DIR.length()-1){
			USER_DIR = USER_DIR.substring(0, USER_DIR.length()-1);
		}
		CONFIG_DIR = USER_DIR + SEP + "config" + SEP;
		CONFIG_REDEPLOY_DIR = CONFIG_DIR + "redeploy"+SEP;
		explainLogXml(hasBin);
//		System.err.println(USER_DIR);
	}
	
	/**
	 * 解析logback.xml
	 * @param hasBin
	 */
	private static void explainLogXml(boolean hasBin){
		File file = new File(USER_DIR+SEP+"config"+SEP+"logback.xml");
		SAXReader saxReader = new SAXReader();
		Document doc;
		try {
			doc = saxReader.read(file);
			Element root = doc.getRootElement();
			Element element = root.element("property");
			String logHome = element.attributeValue("value");
			Pattern pattern = Pattern.compile("\\.\\.");
			Matcher matcher = pattern.matcher(logHome);
			String exPath = "";
			if(hasBin){
				exPath = SEP + "bin";
			}
			File userDir = new File(USER_DIR+exPath);
//			System.err.println("userDir:"+userDir.getPath());
			while(matcher.find()){
				userDir = new File(userDir.getParent());
			}
			LOG_DOWNLOAD_DIR = userDir.getPath();
//			System.err.println("log dir:"+LOG_DOWNLOAD_DIR);
		} catch (DocumentException e) {
			new RunServerException(e,"explainLogXml");
		}
	}
}
