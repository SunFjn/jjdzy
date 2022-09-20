package com.teamtop.redeploy;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.file.tail.LogFileTailer;
/**
 * 部署缓存 
 * @author Administrator
 *
 */
public class RedeployCache extends AbsServerEvent{
	
	/**
	 * 客户端部署指令
	 */
	public static CommandPro clientPro = null;
	/**
	 * 服务端部署指令
	 */
	public static CommandPro serverPro = null;
	/**
	 * 重启指令
	 */
	public static CommandPro rebootServer = null;
	private static List<LogFileTailer> tailerList = new ArrayList<LogFileTailer>();
	
	public static void addTailer(LogFileTailer tailer){
		tailerList.add(tailer);
	}
	public static void removeTailer(LogFileTailer tailer){
		tailerList.remove(tailer);
	}
	public static void clearTailerList(){
		tailerList.clear();
	}
	
	public void loadConfig(){
		try {
			/*String configZone = PropertiesTools.getProperties("configZone");
			String[] arr = configZone.split(",");
			for(String str:arr){
				int zone = Integer.parseInt(str);
				CommandPro client = readProgressTxt(URLDecoder.decode(GamePath.CONFIG_REDEPLOY_DIR+"clientProgress.txt","UTF-8"),zone);
				CommandPro server = readProgressTxt(URLDecoder.decode(GamePath.CONFIG_REDEPLOY_DIR+"serverProgress.txt","UTF-8"),zone);
				CommandPro reboot = readProgressTxt(URLDecoder.decode(GamePath.CONFIG_REDEPLOY_DIR+"rebootServerProgress.txt","UTF-8"),zone);
				serverPro.put(zone, server);
				clientPro.put(zone, client);
				rebootServer.put(zone, reboot);
			}*/
			clientPro = readProgressTxt(URLDecoder.decode(GamePath.CONFIG_REDEPLOY_DIR+"clientProgress.txt","UTF-8"));
			serverPro = readProgressTxt(URLDecoder.decode(GamePath.CONFIG_REDEPLOY_DIR+"serverProgress.txt","UTF-8"));
			rebootServer = readProgressTxt(URLDecoder.decode(GamePath.CONFIG_REDEPLOY_DIR+"rebootServerProgress.txt","UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	public CommandPro readProgressTxt(String path){
		List<Command> commandList = new ArrayList<Command>();
		try {
			FileInputStream fis = new FileInputStream(path);
			BufferedReader br = new BufferedReader(new InputStreamReader(fis));
			String content = null;
			Pattern pattern = Pattern.compile("(?<=\\$)\\S+(?=\\$)");
			while((content=br.readLine())!=null){
				if(content.contains("#")) continue;
				Matcher matcher = pattern.matcher(content);
				boolean go = true;
				while(matcher.find()){
					String group = matcher.group();
					String properties = PropertiesTools.getProperties(group);
					if("0".equals(properties) && "backSvn".equals(group)){
						go = false;
						break;
					}
					if (properties.endsWith("/")) {
						properties = properties.substring(0, properties.length()-1);
					}
					content = content.replace("$"+group+"$", properties);
				}
				if(!go) continue;
				Command command = new Command();
				if(content.startsWith("check")){
					command.setType("check");
					command.setContent(content.substring(6, content.length()));
				}else if(content.startsWith("cmd")){
					command.setType("cmd");
					command.setContent(content.substring(4, content.length()));
				}else if(content.startsWith("compare")){
					command.setType("compare");
					command.setResult(content.substring(8, 9));
					command.setContent(content.substring(10, content.length()));
				}else if(content.startsWith("version")){
					command.setType("version");
					command.setResult(content.split(" ")[1]);
				}else if(content.startsWith("tail")){
					command.setType("tail");
					command.setContent(content.substring(5, content.length()));
//					command.setContent(PropertiesTools.getProperties("consolePath"));
				}else if(content.startsWith("svnadd")){
					command.setType("svnadd");
				}
				commandList.add(command);
			}
			CommandPro commandPro = new CommandPro();
			commandPro.setCommandList(commandList);
			br.close();
			return commandPro;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	@Override
	public void startServer() throws RunServerException {
		loadConfig();
	}
	
}
