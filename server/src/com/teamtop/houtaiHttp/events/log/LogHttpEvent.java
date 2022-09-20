package com.teamtop.houtaiHttp.events.log;

import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.FullHttpResponse;
import io.netty.handler.codec.http.HttpHeaders;
import io.netty.handler.codec.http.HttpResponseStatus;
import io.netty.handler.codec.http.HttpVersion;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.redeploy.RedeployEnum;
import com.teamtop.redeploy.cross.RedeployLocalToCross;
import com.teamtop.util.Properties.PropertiesTools;
import com.teamtop.util.common.ZoneIDUtil;
import com.teamtop.util.file.FileUtils;
import com.teamtop.util.json.JsonUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.md5.MD5Function;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 后台下载游戏日志
 * @author hepl
 * http://127.0.0.1:8802/?sign=611f5040a97b0e3bc9fea1195cc1e3d6&cmd=1006&randnum=1&type=1&name=3&logTime=3&zonelist=3
 */
public class LogHttpEvent extends AbsHouTaiHttpEvent{
	private static LogHttpEvent ins = null;
	
	public static LogHttpEvent getIns(){
		if(ins == null){
			ins = new LogHttpEvent();
		}
		return ins;
	}
	
	private static final Logger logger = LoggerFactory.getLogger(LogHttpEvent.class);
	private Map<String, Long> logQuestMap = new HashMap<String, Long>();
	//压缩状态 0:不在压缩 1:正在压缩 压缩超时时间为5分钟
	private static int compressState = 0;
	private Object lock = new Object();
	
	private String logPath = "logs";
	
	@Override
	public void handleGet(Map<String, String> paramMap,
			ChannelHandlerContext ctx) {
		int type = Integer.parseInt(paramMap.get("type"));
		if (type == 1) {
			// 1是请求列表
			getLogList(ctx, paramMap);
		} else if (type == 2) {
			// 2是下载文件
			try {
				downloadLog(ctx, paramMap);
			} catch (IOException e1) {
				logger.error(LogTool.exception(e1));
			}
		} else if(type==3){
			//3是压缩文件或文件夹
			//先删除
			delZipDirectory(ctx, paramMap);
			//重新压缩
			compressLog(ctx, paramMap);
		} else if(type==4){
			//4是删除zip文件
//			String path = GamePath.LOG_DOWNLOAD_DIR+ File.separator + logPath + File.separator;
//			String date = paramMap.get("date");	
//			if(date!=null){
//				path += date+File.separator;
//			}
//			delZipDirectory(ctx, path);
//			HttpUtil.responseSucc(ctx);
		} else if(type==5){
			//通知内测服，去拉指定区日志
			LogCache.getExceptionNumMap().clear();
			String name = paramMap.get("name");//console.log 或 log+时间
			String logTime = paramMap.get("logTime");//log日志文件夹名  yyyy-mm-dd
			String zonelistStr = paramMap.get(RedeployEnum.zonelist.name());
			if(name==null|| logTime==null|| zonelistStr==null){
				HttpUtil.response("Server9999：参数不对，name:"+name+" logTime:"+logTime+" zonelist:"+zonelistStr, ctx);
			}else{
				List<Integer> zidList = ZoneIDUtil.getzidListByStr(zonelistStr);
				RedeployLocalToCross.getLogExceptiomByZIDListLC(zidList, name, logTime);
				HttpUtil.response("Server9999：开始整理日志", ctx);
			}
		} else if(type==6){
			//通知内测服，拉日志结果
			Map<String, Integer> exceptionNumMap = LogCache.getExceptionNumMap();
			String jsonData = JsonUtils.toStr(exceptionNumMap);
			HttpUtil.response(jsonData, ctx);
		}
	}

	// 获取日志列表
	private void getLogList(ChannelHandlerContext ctx, Map<String, String> map) {
		String date = map.get("date");// date=xxxx，代表日期
		String path = GamePath.LOG_DOWNLOAD_DIR;
		path = path + File.separator + logPath + File.separator;
		Map<String, Map<String, List<String>>> logMap = new HashMap<String, Map<String, List<String>>>();
		if(date!=null){
			FileUtils.getLogStruct(path, logMap, null, null,date);
		}else{
			FileUtils.getLogStruct(path, logMap, null, null,null);
		}
		String jsonEncode = JsonUtils.toStr(logMap);
		HttpUtil.response(jsonEncode, ctx);
	}

	// 下载日志
	private void downloadLog(ChannelHandlerContext ctx, Map<String, String> map) throws IOException {
		String scope = map.get("scope");// scope=1,2,3 分别代表(info,warn,error)
		String date = map.get("date");// date=xxxx，代表日期
		String fileName = map.get("file");// file=xxxx,代表文件
		final String path = GamePath.LOG_DOWNLOAD_DIR + File.separator + logPath + File.separator + scope + File.separator + date + File.separator + fileName;
		File file = new File(path);
//		System.err.println("downloadLog path:"+path);
		if (!file.exists()) {
			HttpUtil.response("-3", ctx);//文件不存在
			return;
		}
		
		// 以流的形式下载文件。
		InputStream fis;
		try {
			fis = new BufferedInputStream(new FileInputStream(path));
			byte[] buffer = new byte[fis.available()];
			fis.read(buffer);
			fis.close();
			FullHttpResponse response = new DefaultFullHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.OK, Unpooled.buffer(buffer.length));
			response.headers().set("Content-Disposition", "attachment;filename=" + file.getName());
			response.headers().set(HttpHeaders.Names.CONTENT_TYPE, "application/octet-stream");
			response.headers().set(HttpHeaders.Names.CONTENT_LENGTH, response.content().capacity());
			response.content().writeBytes(buffer);
			ctx.writeAndFlush(response).addListener(ChannelFutureListener.CLOSE);
		} catch (Exception e1) {
			logger.error(LogTool.exception(e1));
		}
	}

	// 压缩日志
	private void compressLog(ChannelHandlerContext ctx, Map<String, String> map) {
		String scope = map.get("scope");// scope=1,2,3 分别代表(info,warn,error)
		String date = map.get("date");// date=xxxx，代表日期
		String fileName = map.get("file");// file=xxxx,代表文件
		String path = null;
		long now = System.currentTimeMillis();
		if (fileName == null) {
			// 压缩文件夹
			path = GamePath.LOG_DOWNLOAD_DIR + File.separator + logPath + File.separator + scope + File.separator + date;
		} else {
			// 压缩文件
			path = GamePath.LOG_DOWNLOAD_DIR + File.separator + logPath + File.separator + scope + File.separator + date + File.separator + fileName;
		}
		File file = new File(path);
//		System.err.println("compressLog path:"+path);
		if (!file.exists()) {
			HttpUtil.response("-3", ctx);//文件不存在
			return;
		}
		synchronized (lock) {
			if(compressState!=0 || file.length()>200000000){
				//有文件正在压缩
				HttpUtil.responseFail(ctx);
				return;
			}
			String name = file.getName();
			String cpName = name;
			int lastIndexOf = cpName.lastIndexOf(".");
			if(!file.isDirectory()){
				cpName = cpName.substring(0, lastIndexOf);
			}else {
				cpName = date + File.separator + cpName;
			}
			String zipFilePath = file.getParent() + File.separator + cpName + ".zip";
			File logFile = new File(zipFilePath);
			if(logFile.exists()){
				//cpName 2013-12-20_14
				String pattern = "yyyy-MM-dd_hh";
				if(file.isDirectory()){
					pattern = "yyyy-MM-dd";
				}
				SimpleDateFormat sdf = new SimpleDateFormat(pattern);
				try {
					Date logDate = sdf.parse(cpName);
//							System.err.println("now:"+TimeDateUtil.printTime(System.currentTimeMillis()));
//							System.err.println("logDate:"+TimeDateUtil.printTime(logDate.getTime()));
					Long lastQuestTime = logQuestMap.get(path);
					boolean sendDirt = false;
					if(now-logDate.getTime()>3600000){
						//超过一个小时
						if(lastQuestTime!=null && lastQuestTime>=logDate.getTime()){
							sendDirt = true;
						}
					}else{
						if(lastQuestTime!=null && now-lastQuestTime<60000){
							//间隔少于1分钟
							sendDirt = true;
						}
					}
					if(sendDirt){
						//不需要重新压缩
						MD5Function md5 = new MD5Function();
						String cmd = map.get("cmd");
						String randum = TimeDateUtil.getCurrentTime()+"";
						String key = null;
						try {
							key = PropertiesTools.getProperties("bkHttpKey");
						} catch (Exception e1) {
							logger.error(LogTool.exception(e1));
						}
						StringBuilder  codeStr = new StringBuilder(cmd+key+randum);
						String decode = md5.toDigest(codeStr.toString());//加密串
						
						String rtnName = new StringBuilder()/*.append("http://").append(GamePropertiesCache.serverAddress).append(":").append(GamePropertiesCache.bkPort)*/.append("/?key=").append(decode)
								.append("&cmd=").append(cmd).append("&randnum=").append(randum).append("&type=2&scope=").append(scope)
								.append("&date=").append(date).append("&file=").append(logFile.getName()).toString();
//						System.err.println("rtnName:"+rtnName);
						HttpUtil.response(rtnName, ctx);
						return;
					}
				} catch (ParseException e2) {
					e2.printStackTrace();
				}
			}
			compressState = 1;
			try {
				logQuestMap.put(path, now);
				compress(zipFilePath,file.getAbsolutePath());
			} catch (Exception e1) {
				logger.error(LogTool.exception(e1));
				compressState = 0;
			}
			compressState = 0;
		}
		HttpUtil.responseSucc(ctx);
	}
	
	public void delZipDirectory(ChannelHandlerContext ctx, String path){
		File file = new File(path);
		// 判断目录或文件是否存在
		if (!file.exists()) { // 不存在返回 false
			HttpUtil.responseFail(ctx);
			return;
		} else {
			File[] files = file.listFiles();
			for (int i = 0; i < files.length; i++) {
				File subFile = files[i];
				// 判断是否为文件
				if (subFile.isFile()) { // 为文件时调用删除文件方法
					deleteZipFile(subFile.getAbsolutePath());
				} else { // 为目录时调用删除目录方法
					delZipDirectory(ctx, subFile.getAbsolutePath());
				}
			}
			
		}
	}
	
	/**
	 * 删除已经压缩的文件
	 * @param ctx
	 * @param map
	 */
	private void delZipDirectory(ChannelHandlerContext ctx, Map<String, String> map){
		String scope = map.get("scope");// scope=1,2,3 分别代表(info,warn,error)
		String date = map.get("date");// date=xxxx，代表日期
		String fileName = map.get("file");// file=xxxx,代表文件
		String path = null;
		String filePath = null;
		if (fileName == null) {
			// 全天日志
			path = GamePath.LOG_DOWNLOAD_DIR + File.separator + logPath + File.separator + scope + File.separator + date + File.separator + date + ".zip";
			filePath = GamePath.LOG_DOWNLOAD_DIR + File.separator + logPath + File.separator + scope + File.separator + date;
		} else {
			// 每时段日志
			path = GamePath.LOG_DOWNLOAD_DIR + File.separator + logPath + File.separator + scope + File.separator + date + File.separator + fileName.substring(0, fileName.lastIndexOf(".")) + ".zip";
			filePath = path.replace(".zip", ".log");
		}
		//判断间隔时间
		long now = System.currentTimeMillis();
		Long lastQuestTime = logQuestMap.get(filePath);
		boolean sendDirt = false;
		if(lastQuestTime!=null && now-lastQuestTime<60000){
			//间隔少于1分钟
			sendDirt = true;
		}
		if(!sendDirt){
			File file = new File(path);
			// 判断文件是否存在
			if (!file.exists()) { // 不存在返回
				return;
			} else {
				deleteZipFile(file.getAbsolutePath());
			}
		}
	}
	
	public void deleteZipFile(String sPath) {
		if(sPath.indexOf(".zip")<0) return;
		File file = new File(sPath);
		// 路径为文件且不为空则进行删除
		if (file.isFile() && file.exists()) {
			file.delete();
		}
	}
	
	
	//压缩文件
	private void compress(String zipFilePath,String oriFilePath) {
		ZipCompressor zc = new ZipCompressor(zipFilePath);
		zc.compress(oriFilePath);
	}
}
