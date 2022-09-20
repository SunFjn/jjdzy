package com.teamtop.redeploy;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.houtaiHttp.events.groovy.GroovyCache;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.redeploy.cross.RedeployServerToClient;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.file.FileUtils;
import com.teamtop.util.file.ZipCompress;
import com.teamtop.util.file.tail.LogFileTailer;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
/**
 * 部署server端（）
 * @author Administrator
 */
public class RedeployServerFunction {
	private static Logger logger = LoggerFactory.getLogger(RedeployServerFunction.class);
	/**
	 * server,上传bin
	 * @param channel
	 * @param type
	 * @param binData
	 */
	public static void uploadBin(Channel channel, String type,byte[] binData) {
		String tmpPath = null;
		logger.info("uploadBin,type:"+type);
		if(RedeployEnum.server.name().equals(type)){
			//服务端
			String serverBinDir = PropertiesTools.getProperties("serverBinDir");
			tmpPath = serverBinDir +File.separator+ "bin.tar.gz";
		}else if(RedeployEnum.client.name().equals(type)){
			//客户端
			try {
				excuteCommand(channel, "rm -rf "+PropertiesTools.getProperties("clientBinDir")+File.separator+"*");
			} catch (Exception e) {
				RedeployServerToClient.sendError(channel, e.getMessage());
				return;
			}
			tmpPath = PropertiesTools.getProperties("clientBinDir") +File.separator+ "clientupload.zip";
		}else if(RedeployEnum.hotswap.name().equals(type)){
			//热更新文件
			String programDir = PropertiesTools.getProperties("programDir");
			tmpPath = programDir +File.separator +"hotswap"+ File.separator+"newfile.zip";
			FileUtils.deleteDirectory(tmpPath.substring(0, tmpPath.indexOf(".zip")));
//			tmpPath = GamePath.USER_DIR + File.separator + "hotswap"+ File.separator+"newfile.zip";
		}else if(RedeployEnum.groovy.name().equals(type)){
			//脚本
			String programDir = PropertiesTools.getProperties("programDir");
//			tmpPath = programDir + File.separator +"server" +File.separator +"hotswap"+ File.separator+"groovy.zip";
			tmpPath = programDir +File.separator+"bin"+ File.separator+"groovyScript"+File.separator+"Debug.groovy";
		}else if(RedeployEnum.GROOVY_CONVENIENT.name().equals(type)){
			//脚本便捷式
			String programDir = PropertiesTools.getProperties("programDir");
			tmpPath = programDir +File.separator+"bin"+ File.separator+"groovyScript"+File.separator+GroovyCache.DEBUG_CONVENIENT_FILE_NAME;
		}
		try {
			File file = new File(tmpPath);
			if (file != null && file.exists()) {
				FileUtils.deleteFile(tmpPath);
			}
			FileUtils.writeData(tmpPath, binData);
			Thread.sleep(1000);
		} catch (Exception e) {
			logger.error(LogTool.errmsg(e));
		}
		if(RedeployEnum.server.name().equals(type)){
			//server端
			RedeployServerFunction.deploy(channel,RedeployCache.serverPro);
		}else if(RedeployEnum.client.name().equals(type)){
			//client端
			RedeployServerFunction.deploy(channel,RedeployCache.clientPro);
		}else if(RedeployEnum.hotswap.name().equals(type)){
			//热更 解压
			try {
				ZipCompress.readByApacheZipFile(tmpPath, tmpPath.substring(0, tmpPath.indexOf("newfile.zip")));
				//服务端热更
				String port = PropertiesTools.getProperties("httpPort");
				//调用内测服热更
				String connect = HttpUtil.connectGet("http://127.0.0.1:"+port+"/?sign=e9048df90618272480e01f240024d8af&cmd=1003&randnum=1&type=1");
				RedeployServerToClient.sendInfo(channel, connect);
			} catch (IOException e) {
				RedeployServerToClient.sendError(channel, "9999热更执行失败:"+e.getMessage());
			}
		}else if(RedeployEnum.groovy.name().equals(type)){
			//脚本
			try {
				String port = PropertiesTools.getProperties("httpPort");
				//调用内测服热更
				String connect = HttpUtil.connectGet("http://127.0.0.1:"+port+"/?sign=c122b8b3c37d09c09c95bb6411091b6c&cmd=1004&randnum=1&type=1");
				RedeployServerToClient.sendInfo(channel, connect);
			} catch (Exception e) {
				RedeployServerToClient.sendError(channel, "9999脚本执行失败:"+e.getMessage());
			}
		}
	}
	/**
	 * 部署客户端
	 * @param channel
	 */
	/*public static void deployClient(Channel channel) {
		try {
			CommandPro clientPro = RedeployCache.clientPro;
			List<Command> commandList = clientPro.getCommandList();
			for (Command command : commandList) {
				String type = command.getType();
				String content = command.getContent();
//				System.err.println("exec:type:" + command.getType()+",content:"+command.getContent());
				sendInfo(channel, command.getType() + "," + command.getContent());
				if ("compare".equals(type)) {
//					String result = DeployManager.getInstance().checkClientFile(channel,content);
//					if (!command.getResult().equals(result)) {
//						break;
//					}
				}else if("version".equals(type)){
//					NettyWrite.writeData(channel, new Object[]{"versionNum:"+CheckClientFile.versionNum+",binVersion:"+CheckClientFile.binVersion}, CrossCmd.TELL_INFO);
				}else if ("cmd".equals(type)) {
					XShellResult rs = excuteCommand(channel, content);
					if(rs.getExitValue()!=0){
						
					}
				}
			}
		} catch (Exception e) {
			logger.error(LogFormat.exception(e));
		}
	}*/
	/**
	 * 部署服务端
	 * @param channel
	 */
	public static void deploy(Channel channel,CommandPro clientPro) {
		try {
			List<String> addFileList = new ArrayList<String>();
//			CommandPro clientPro = RedeployCache.serverPro;
			List<Command> commandList = clientPro.getCommandList();
			for (Command command : commandList) {
				String type = command.getType();
				String content = command.getContent();
//				System.err.println("exec:type:" + command.getType()+",content:"+command.getContent());
				RedeployServerToClient.sendInfo(channel, command.getType() + "," + command.getContent());
				if("check".equals(type)){
//					checkServerState(channel, command);
					while(true){
						System.err.println("check server state");
						XShellResult rs = excuteCommand(channel, command.getContent());
						if(rs.getExitValue()!=0){
							throw new Exception(rs.getPrintInfo());
						}
						if(rs.getPrintInfo().indexOf("no java")>-1){
							break;
						}
						Thread.sleep(1500);
					}
				}else if ("cmd".equals(type)) {
					XShellResult rs = excuteCommand(channel, content);
					if(rs.getExitValue()!=0){
						throw new Exception(rs.getPrintInfo());
					}
				}else if("tail".equals(type)){
					Tail tail = new Tail(channel);
					LogFileTailer tailer = new LogFileTailer(new File(content), 1000, true);
					RedeployCache.addTailer(tailer);
					tailer.setTailing(true);
					tailer.addLogFileTailerListener(tail);
					tailer.start();
				}else if ("compare".equals(type)) {
					String result = checkClientFile(addFileList,channel,content);
					if (!command.getResult().equals(result)) {
						RedeployServerToClient.sendInfo(channel, result);
						break;
					}
				}else if("version".equals(type)){
					RedeployServerToClient.sendInfo(channel, "versionNum:"+CheckClientFile.versionNum+",binVersion:"+CheckClientFile.binVersion);
				}else if("svnadd".equals(type)){
					for(String path:addFileList){
						XShellResult rs = excuteCommand(channel, "svn add "+path);
						if(rs.getExitValue()!=0){
							throw new Exception(rs.getPrintInfo());
						}
					}
				}
			}
		} catch (Exception e) {
			RedeployServerToClient.sendError(channel, e.getMessage());
			logger.error(LogTool.errmsg(e));
		}
	}
	/**
	 * 检查服务器状态
	 * @param channel
	 * @param command
	 * @throws Exception
	 */
	/*private static void checkServerState(Channel channel,Command command) throws Exception{
		while(true){
			String excuteCommand = excuteCommand(channel, command.getContent());
			if("1".equals(command.getResult())){
				if(excuteCommand.indexOf("java is working")>-1){
					break;
				}
			}else if("0".equals(command.getResult())){
				if(excuteCommand.indexOf("no java")>-1){
					break;
				}
			}
			if(excuteCommand.indexOf("no java")>-1){
				break;
			}
			Thread.sleep(1500);
		}
	}*/
	/**
	 * 执行命令并返回结果
	 * 
	 * @param command
	 * @return
	 */
	public static XShellResult excuteCommand(Channel channel, String command) throws Exception{
		System.err.println("exec command:" + command);
		Runtime r = Runtime.getRuntime();
		Process p;
		p = r.exec(new String[] { "/bin/sh", "-c", command });
		BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
		String inline;
		StringBuilder sb = new StringBuilder();
		while ((inline = br.readLine()) != null) {
//			System.out.println("is:" + new String(inline.getBytes("utf-8")));
			// DeployCache.outputQueue.add(inline);
			RedeployServerToClient.sendInfo(channel, inline);
			sb.append(inline).append("\n");
		}
		BufferedReader brerr = new BufferedReader(new InputStreamReader(p.getErrorStream()));
		while ((inline = brerr.readLine()) != null) {
//			System.out.println("es:" + inline);
			// DeployCache.errQueue.add(inline);
			RedeployServerToClient.sendInfo(channel, inline);
			sb.append(inline).append("\n");
		}
		p.waitFor();
		int exitValue = p.exitValue();
//		System.err.println("exitValue:" + exitValue);
		RedeployServerToClient.sendInfo(channel, exitValue+"");
		br.close();
		brerr.close();
		RedeployServerToClient.sendInfo(channel, "rtn:"+sb.toString());
		return new XShellResult(exitValue, sb.toString());
			// System.err.println("cmd result:"+sb.toString());
	}
	
	/**
	 * 检查客服端文件是否相同
	 * @param channel
	 */
	public static String checkClientFile(List<String> addFileList,Channel channel,String svnPath){
		String result = "-1";
		try {
			result = CheckClientFile.getInstance().checkFileSame(addFileList,PropertiesTools.getProperties("clientBinDir"), svnPath, PropertiesTools.getProperties("clientBase"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		RedeployServerToClient.sendInfo(channel, result);
		return result;
	}
}
