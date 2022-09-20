package com.teamtop.gameCommon;

import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.Properties.SafeProperties;

/**
 * 服务器的公共变量，不包括游戏变量，主要读取config文件夹下的配置文件
 * @author Administrator
 *
 */
public class ServerProperties {
	public static boolean showUI = false;//显示UI
	public static boolean localmode = false;//本地模式 GM 错误警告 战斗调试等
	static{
		
		String showUIPro = getPro("showUI");
		if(showUIPro!=null && "1".equals(showUIPro.toString())){
			showUI = true;
		}
		
		String localmodePro = getPro("localmode");
		if(localmodePro!=null && "1".equals(localmodePro.toString())){
			localmode = true;
		}
		
	}
	private static String getPro(String key){
		SafeProperties properties = PropertiesTools.getProperties();
		return (String) properties.get(key);
	}
}
