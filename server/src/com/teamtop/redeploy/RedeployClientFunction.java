package com.teamtop.redeploy;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Pattern;

import javax.swing.JOptionPane;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GamePath;
import com.teamtop.houtaiHttp.events.groovy.GroovyCache;
import com.teamtop.houtaiHttp.events.log.LogCache;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.redeploy.cross.RedeployClientToServer;
import com.teamtop.redeploy.model.RedeployClient;
import com.teamtop.redeploy.ui.MainFrame;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.common.ZoneIDUtil;
import com.teamtop.util.file.FileUtils;
import com.teamtop.util.file.TxtUtil;
import com.teamtop.util.file.ZipCompress;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class RedeployClientFunction {
	public static void deployClient(int type){
		try {
			String tmpFilePath = "c:" + File.separator + "clientupload";
			//1.获取最新目录
			MainFrame.info("*******1 获取最新目录*******", type);
			UploadDownloadUtil udu = new UploadDownloadUtil();
			String path = udu.smbGet(PropertiesTools.getProperties("smbclient_"+type), tmpFilePath+File.separator);
			MainFrame.info("路径："+path, type);
			//2.压缩
			MainFrame.info("*******2 压缩*******", type);
			String archive = tmpFilePath+".zip";//压缩包路径
			ZipCompress.writeByApacheZipOutputStream(tmpFilePath, archive, "upload client "+TimeDateUtil.printTime(TimeDateUtil.getCurrentTime()));
			//3.上传
			MainFrame.info("*******3 上传*******", type);
			doUpload(new File(archive), RedeployEnum.client,type);
			//4.部署(在回调里面做)
			MainFrame.info("*******4 等待上传完成后部署*******", type);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 * 上传服务端bin
	 * @param type
	 */
	public static void deployServer(int type){
		String tmpFilePath = "c:" + File.separator + "serverupload";
		//1.获取最新目录
		MainFrame.info("*******1 获取最新目录*******", type);
		UploadDownloadUtil udu = new UploadDownloadUtil();
		String path = udu.smbGet(PropertiesTools.getProperties("smbserver_"+type), tmpFilePath+File.separator);
		MainFrame.info("路径："+path, type);
		//2.上传
		MainFrame.info("*******2 上传*******", type);
		doUpload(new File(tmpFilePath+File.separator+"bin.tar.gz"), RedeployEnum.server,type);
		//3.等待上传完毕部署
		MainFrame.info("*******3  等待上传完成后部署*******", type);
	}
	/**
	 * 上传
	 * @param file
	 * @param type
	 */
	private static void doUpload(File file, RedeployEnum type,final int zone) {
		MainFrame.info("bin "+file.getPath(), zone);
		try {
			FileInputStream fis = new FileInputStream(file.getPath());
			int binLen = fis.available();
			byte[] data = new byte[binLen];
			fis.read(data);
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			DataOutputStream output = new DataOutputStream(bos);
			output.write(data);

			byte[] sendData = bos.toByteArray();
			MainFrame.info("bin len:"+sendData.length, zone);
			fis.close();
			bos.close();
			output.close();
			
			CrossData crossData = new CrossData();
			crossData.putObject(RedeployEnum.bin, sendData);
			crossData.putObject(RedeployEnum.type, type.name());
			crossData.putObject(RedeployEnum.zone, zone);
			RedeployClient redeployClient = RedeployClientCache.getClients().get(zone);
			NettyWrite.writeXData(redeployClient.getCrossChannel(), CrossConst.UPLOAD_BIN_CS, crossData,new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					MainFrame.info(crossData.getObject("info", String.class).toString(), zone);
					MainFrame.info("*******上传完成*******", zone);
//					System.err.println("*******4 上传完成*******");
				}
			});
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 * 重启
	 * @param file
	 * @param type
	 */
	public static void reboot(final int zone) {
		MainFrame.info("重启服务器： "+RedeployConst.getPfName(zone), zone);
		CrossData crossData = new CrossData();
		crossData.putObject(RedeployEnum.zone, zone);
		RedeployClient redeployClient = RedeployClientCache.getClients().get(zone);
		NettyWrite.writeXData(redeployClient.getCrossChannel(), CrossConst.REBOOTSERVER, crossData);
	}
	/**
	 * 热更内测服
	 * @param zone
	 * @throws IOException 
	 * @throws FileNotFoundException 
	 */
	public static void hotswap(int zone){
//		if(!hotuiopen){
//			hotuiopen = true;
//			new HotswapDesc();
//		}
		
		try {
			//生成desc.txt
			String tmpPath = "C:\\newfile\\desc.txt";
			String descTxt = TxtUtil.getText(tmpPath);
			String descInput = JOptionPane.showInputDialog(null, "输入操作者、热更内容，逗号隔开。", "热更日志", JOptionPane.PLAIN_MESSAGE);
			if(descInput == null|| descInput.trim().length()<5){
				JOptionPane.showMessageDialog(null, "小伙子，长度不够哦："+descInput, "热更日志", JOptionPane.ERROR_MESSAGE);
				MainFrame.info("小伙子，长度不够哦："+descInput, zone);
				return;
			}
			File fileDesc = new File(tmpPath);
			if (fileDesc != null && fileDesc.exists()) {
				FileUtils.deleteFile(tmpPath);
				System.out.println("移除desc.txt，path:"+tmpPath);
			}
			String descIP = InetAddress.getLocalHost().getHostAddress().toString();
			FileUtils.writeData(tmpPath, descInput+" \\n"+descIP+" \\n"+descTxt);
			System.out.println("生成desc.txt  "+descInput+"  "+descIP+"  "+descTxt);
			
			//修改info.txt
			String binPath = GamePath.USER_DIR + File.separator + "bin";
			String newFilePath = "C:\\newfile";
			BufferedReader brInfo = new BufferedReader(new InputStreamReader(new FileInputStream(newFilePath+File.separator+"info.txt")));
			Set<String> setClassNameInfo = new HashSet<>();//过滤txt中存在的类
			String content = null;
			while((content=brInfo.readLine())!=null){
				String[] split = content.split("\\.");
				String className = split[split.length-1];
				setClassNameInfo.add(className+".class");
			}
			brInfo = new BufferedReader(new InputStreamReader(new FileInputStream(newFilePath+File.separator+"info.txt")));
			StringBuilder newClassAll = new StringBuilder();
			int first = 0;
			//设置内部类、匿名内部类
			while((content=brInfo.readLine())!=null){
				if(first==0){
					first++;
				}else {
					newClassAll.append("\r\n");
				}
				newClassAll.append(content);
				String tp = content.replace(".", "/");
				String substring = tp.substring(0, tp.lastIndexOf("/"));
				File dirBin = new File(binPath +File.separator+ substring);
				if(!dirBin.exists() || tp.lastIndexOf("/") <= 2){
					continue;
				}
				String[] split = tp.split("/");
				String nameSource = split[split.length-1];
			    String pattern = ".*" + nameSource + "\\$.*";
				File[] listFiles = dirBin.listFiles();
				for(File fileTemp:listFiles){
					String fileName = fileTemp.getName();
					boolean isMatch = Pattern.matches(pattern, fileName);
					if(!isMatch)
						continue;
					boolean contains = setClassNameInfo.contains(fileName);
					if(contains)
						continue;
					StringBuilder newClass = new StringBuilder();
					for(int i = 0; i < split.length; i++){
						if(newClass.length() == 0){
							newClass.append(split[i]);
						}else if(i != split.length-1){
							newClass.append(".").append(split[i]);
						}else if(i == split.length-1){
							newClass.append(".").append(fileName.substring(0,fileName.lastIndexOf(".")));
						}
					}
					newClassAll.append("\r\n").append(newClass.toString());
				}
			}
			FileUtils.writeDataToEnd(newFilePath+File.separator+"info1.txt", newClassAll.toString());
			
			//打包
			MainFrame.info("热更内测服： "+RedeployConst.getPfName(zone), zone);
			String newClass = GetNewClass.getNewClass();
			FileUtils.deleteFile(newFilePath+File.separator+"info1.txt");
			MainFrame.info("热更类： "+newClass, zone);
			String archive = "C:\\newfile.zip";
			String src = "C:\\newfile\\";
			File file = new File(archive);
			if (file != null && file.exists()) {
				FileUtils.deleteFile(archive);
			}
			String tempPath = "C:\\newfile\\info1.txt";
			File fileTemp = new File(tempPath);
			if(fileTemp != null && fileTemp.exists()) {
				FileUtils.deleteFile(tempPath);
			}
			ZipCompress.writeByApacheZipOutputStream(src, archive, "");
			Thread.sleep(1000);
			doUpload(new File(archive), RedeployEnum.hotswap,zone);
			//清空文本
			FileUtils.writeData(tmpPath, "#可以不备注");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 热更子服
	 */
	public static void hotswapByZID(int zone) {
		try {
			String titleStr = "热更子服";
			String zidListStr = JOptionPane.showInputDialog(null, "输入区号。某区(1_5,10,12)", titleStr, JOptionPane.PLAIN_MESSAGE);
			boolean checkZIDStr = ZoneIDUtil.checkZIDStr(zidListStr);
			if( !checkZIDStr){
				JOptionPane.showMessageDialog(null, zidListStr+" 格式不正常，请重新输入。", titleStr, JOptionPane.ERROR_MESSAGE);
			}else{
				Object[] possibleValues = {titleStr, titleStr, titleStr, titleStr, titleStr, titleStr, titleStr }; 
				int index = RandomUtil.getRandomNumInAreas(0, possibleValues.length-1); 
				possibleValues[index] = zidListStr;
				String selectedValue = (String) JOptionPane.showInputDialog(null, "确定更新："+zidListStr+" 区?", titleStr,JOptionPane.INFORMATION_MESSAGE, null,possibleValues, possibleValues[0]);
				if(selectedValue == null|| !selectedValue.equals(zidListStr)){
					MainFrame.info("选错区，goodbye~", zone);
					return;
				}
				MainFrame.info("热更子服： "+RedeployConst.getPfName(zone), zone);
				MainFrame.info("你输入区号为： "+zidListStr, zone);
				RedeployClientToServer.hotSwapByZidCS(zone, zidListStr);
			}
		} catch (Exception e) {
			e.printStackTrace();
			MainFrame.err("报错啦，快快看代码查下。", zone);
		}
	}
	
	/**
	 * 开始收集版本号
	 */
	public static void getVersion(int zone) {
		try {
			RedeployClientToServer.getAllVersionCS(zone, 1);
			Thread.sleep(4000l);
			RedeployClientToServer.getAllVersionCS(zone, 2);
		} catch (Exception e) {
			e.printStackTrace();
			MainFrame.err("报错啦，快快看代码查下。", zone);
		}
	}
	
	/**
	 * 查看热更子服成功的区号
	 */
	public static void hotswapByZIDCheck(int zone) {
		MainFrame.info("检查热更结果： "+RedeployConst.getPfName(zone), zone);
		RedeployClientToServer.hotSwapByZidCheckCS(zone);
	}
	
	/**
	 * 脚本
	 * @param zone
	 */
	public static void groovy(int zone){
		String archive = "C:\\Debug.groovy";
		File file = new File(archive);
		if (file != null && !file.exists()) {
			MainFrame.err("没找到脚本文件："+archive, zone);
			return;
		}
		try {
			MainFrame.info("脚本上传内测服： "+RedeployConst.getPfName(zone), zone);
			doUpload(new File(archive), RedeployEnum.groovy,zone);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 脚本子服
	 */
	public static void groovyByZID(int zone) {
		try {
			String titleStr = "脚本子服";
			String zidListStr = JOptionPane.showInputDialog(null, "输入区号。某区(1_5,10,12)", titleStr, JOptionPane.PLAIN_MESSAGE);
			boolean checkZIDStr = ZoneIDUtil.checkZIDStr(zidListStr);
			if( !checkZIDStr){
				JOptionPane.showMessageDialog(null, zidListStr+" 格式不正常，请重新输入。", titleStr, JOptionPane.ERROR_MESSAGE);
			}else{
				Object[] possibleValues = {titleStr, titleStr, titleStr, titleStr, titleStr, titleStr, titleStr }; 
				int index = RandomUtil.getRandomNumInAreas(0, possibleValues.length-1); 
				possibleValues[index] = zidListStr;
				String selectedValue = (String) JOptionPane.showInputDialog(null, "确定更新："+zidListStr+" 区?", titleStr,JOptionPane.INFORMATION_MESSAGE, null,possibleValues, possibleValues[0]);
				if(selectedValue == null|| !selectedValue.equals(zidListStr)){
					MainFrame.info("选错区，goodbye~", zone);
					return;
				}
				MainFrame.info("脚本上传子服： "+RedeployConst.getPfName(zone), zone);
				MainFrame.info("你输入区号为： "+zidListStr, zone);
				RedeployClientToServer.groovyByZidCS(zone, zidListStr);
			}
		} catch (Exception e) {
			e.printStackTrace();
			MainFrame.err("报错啦，快快看代码查下。", zone);
		}
	}
	
	/**
	 * 查看脚本子服成功的区号
	 */
	public static void groovyByZIDCheck(int zone) {
		MainFrame.info("检查脚本结果： "+RedeployConst.getPfName(zone), zone);
		RedeployClientToServer.groovyByZidCheckCS(zone);
	}
	
	/**
	 * 脚本便捷式
	 */
	public static void groovyConvenient(int zone) {
		try {
			GroovyCache.setZidSelect("");
			MainFrame.updateInfoLabel("", zone);
			String titleStr = "脚本便捷式";
			String zidListStr = JOptionPane.showInputDialog(null, "输入连接的区号。某区(1_5,10,12)", titleStr, JOptionPane.PLAIN_MESSAGE);
			boolean checkZIDStr = ZoneIDUtil.checkZIDStr(zidListStr);
			if( !checkZIDStr){
				JOptionPane.showMessageDialog(null, zidListStr+" 格式不正常，请重新输入。", titleStr, JOptionPane.ERROR_MESSAGE);
			}else{
//				Object[] possibleValues = {titleStr, titleStr, titleStr, titleStr, titleStr, titleStr, titleStr }; 
//				int index = RandomUtil.getRandomNumInAreas(0, possibleValues.length-1); 
//				possibleValues[index] = zidListStr;
//				String selectedValue = (String) JOptionPane.showInputDialog(null, "确定更新："+zidListStr+" 区?", titleStr,JOptionPane.INFORMATION_MESSAGE, null,possibleValues, possibleValues[0]);
//				if(selectedValue == null|| !selectedValue.equals(zidListStr)){
//					MainFrame.info("选错区，goodbye~", zone);
//					return;
//				}
				MainFrame.info("脚本便捷式： "+RedeployConst.getPfName(zone), zone);
				MainFrame.info("选中区号： "+zidListStr, zone);
				MainFrame.updateInfoLabel("  连接区："+zidListStr, zone);
				GroovyCache.setZidSelect(zidListStr);
			}
		} catch (Exception e) {
			e.printStackTrace();
			MainFrame.err("报错啦，快快看代码查下。", zone);
		}
	}
	
	/**
	 * 脚本便捷式，发送
	 */
	public static void groovyConvenientSend(int zone) {
		try {
			String zidSelect = GroovyCache.getZidSelect();
			if(zidSelect.length() < 1){
				MainFrame.info("区号不正确："+zidSelect, zone);
				return;
			}
			//生成脚本 
			String groovySourcePath = GamePath.USER_DIR+GamePath.SEP+"src"+GamePath.SEP+"groovyScript"+GamePath.SEP+"DebugConvenient.java";
			String groovyBuildPath = GamePath.USER_DIR+GamePath.SEP+"bin"+GamePath.SEP+"groovyScript"+GamePath.SEP+GroovyCache.DEBUG_CONVENIENT_FILE_NAME;
			String groovyLogPath = GamePath.USER_DIR+GamePath.SEP+"src"+GamePath.SEP+"groovyScript"+GamePath.SEP+GroovyCache.DEBUG_CONVENIENT_FILE_NAME;

			FileUtils.writeData(groovyLogPath, "");
			FileUtils.deleteFile( groovyBuildPath);
			
			BufferedReader brInfo = new BufferedReader(new InputStreamReader(new FileInputStream(groovySourcePath)));
			String content = "";
			StringBuilder newClassAll = new StringBuilder();
			while((content=brInfo.readLine())!=null){
				newClassAll.append("\r\n").append(content);
			}
			FileUtils.writeDataToEnd(groovyBuildPath, newClassAll.toString());
			//方便本地查看
			FileUtils.writeDataToEnd(groovyLogPath, newClassAll.toString());
			LogTool.info(newClassAll.toString(), RedeployClientFunction.class);

			//发送脚本到内测
			doUpload(new File(groovyBuildPath), RedeployEnum.GROOVY_CONVENIENT,zone);
			//同步到指定的区，执行脚本
			Thread.sleep(2000l);
			RedeployClientToServer.groovyConvenientByZidCS(zone, zidSelect);
			Thread.sleep(2000l);
			groovyConvenientResult(zone);
		} catch (Exception e) {
			e.printStackTrace();
			MainFrame.err("报错啦，快快看代码查下。", zone);
		}
	}
	
	/**
	 * 查看脚本便捷式子服结果
	 */
	public static void groovyConvenientResult(int zone) {
		MainFrame.info("开始请求结果，连接区："+GroovyCache.getZidSelect(), zone);
		RedeployClientToServer.groovyConvenientCS(zone);
	}
	
	/**
	 * 统计报错       
	 */
	public static void logException(int zone) {
		try {
//			GroovyCache.setZidSelect("");
//			MainFrame.updateInfoLabel("", zone);
			String titleStr = "统计报错";
			String zidListStr = JOptionPane.showInputDialog(null, "输入连接的区号。某区(1_5,10,12)", titleStr, JOptionPane.PLAIN_MESSAGE);
			boolean checkZIDStr = ZoneIDUtil.checkZIDStr(zidListStr);
			if( !checkZIDStr){
				JOptionPane.showMessageDialog(null, zidListStr+" 格式不正常，请重新输入。", titleStr, JOptionPane.ERROR_MESSAGE);
			}else{
//				Object[] possibleValues = {titleStr, titleStr, titleStr, titleStr, titleStr, titleStr, titleStr }; 
//				int index = RandomUtil.getRandomNumInAreas(0, possibleValues.length-1); 
//				possibleValues[index] = zidListStr;
//				String selectedValue = (String) JOptionPane.showInputDialog(null, "确定更新："+zidListStr+" 区?", titleStr,JOptionPane.INFORMATION_MESSAGE, null,possibleValues, possibleValues[0]);
//				if(selectedValue == null|| !selectedValue.equals(zidListStr)){
//					MainFrame.info("选错区，goodbye~", zone);
//					return;
//				}
				MainFrame.info("统计报错： "+RedeployConst.getPfName(zone), zone);
				MainFrame.info("选中区号： "+zidListStr, zone);
				MainFrame.updateInfoLabel("  连接区："+zidListStr, zone);
				GroovyCache.setZidSelect(zidListStr);
			}
		} catch (Exception e) {
			e.printStackTrace();
			MainFrame.err("报错啦，快快看代码查下。", zone);
		}
	}
	

	/**
	 * 统计报错选时间
	 */
	public static void logExceptionSelTime(int zone) {
		try {
			String titleStr = "选择查询的时间";
			//下拉列表
			Object[] possibleValues = new Object[10];
			int j = 0;
			for( int i=0; i>-10; i--){
				int time = TimeDateUtil.getDayPassOrFuture(i, TimeDateUtil.getCurrentTimeInMillis());
				String timeStrByInt = TimeDateUtil.getTimeStrByInt(time, "yyyy-MM-dd");
				possibleValues[j] = timeStrByInt;
				j++;
			}
			String selectedValue = (String) JOptionPane.showInputDialog(null, "选一个你喜欢的日子", titleStr,JOptionPane.INFORMATION_MESSAGE, null,possibleValues, possibleValues[0]);
			if(selectedValue==null){
				MainFrame.info("没选日子就跑路了。", zone);
			}else{
				MainFrame.info("选中日期："+selectedValue+"，查询 info、wern、err日志。", zone);
				MainFrame.updateInfoLabel("  连接区："+GroovyCache.getZidSelect()+" 日期："+selectedValue, zone);
				LogCache.setTimeStr(selectedValue);
			}
		} catch (Exception e) {
			e.printStackTrace();
			MainFrame.err("报错啦，快快看代码查下。", zone);
		}
	}
	
	
	public static void main(String[] args) throws FileNotFoundException, IOException {
//		ZipCompress.writeByApacheZipOutputStream("f:\\newfile", "f:\\newfile.zip", "test zip");
//		ZipCompress.readByApacheZipFile("f:\\newfile.zip", "c:\\");
		String path = "c:\\newfile.zip";
		String substring = path.substring(0, path.indexOf(".zip"));
		FileUtils.deleteDirectory(substring);
		System.err.println(substring);
	}
}
