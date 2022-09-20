package com.teamtop.cross.battleVideo.upload.event;

import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.HttpHeaders;

import java.io.File;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.hotSwap.HotSwapHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.util.ant.AntService;
import com.teamtop.util.common.CollectionUtil;
import com.teamtop.util.excelHotswap.ExcelHotswapCache;
import com.teamtop.util.file.FileUtils;
import com.teamtop.util.file.ZipCompress;
import com.teamtop.util.log.LogTool;
/**
 * 热更上传事件
 */
public class HotswapUploadEvent extends AbsUploadEvent {
	private static HotswapUploadEvent ins = null;

	public static HotswapUploadEvent getIns() {
		if (ins == null) {
			ins = new HotswapUploadEvent();
		}
		return ins;
	}

	private Logger logger = LoggerFactory.getLogger(HotswapUploadEvent.class);
	@Override
	public File getFile(HttpHeaders headers) {
		try {
			FileUtils.deleteFile(GameProperties.hotswapDir+File.separator+"newfile.zip");
			FileUtils.deleteDirectory(GameProperties.hotswapDir+File.separator+"newfile");
			FileUtils.deleteDirectory(GameProperties.hotswapDir+File.separator+"complie");
			Thread.sleep(200);
		} catch (Exception e) {
			LogTool.error(e,this);
		}
		String tmpPath = GameProperties.hotswapDir +File.separator+ "newfile.zip";
		return new File(tmpPath);
	}
	@Override
	public void afterUpload(ChannelHandlerContext ctx) {
		try {
			FileUtils.createDir(GameProperties.hotswapDir +File.separator+"complie");
			unzip();
			AntService.getInstance().compile();
			Thread.sleep(500);
			String hotSwapInfo = getHotSwapInfo();
			resetConfig();
			excelRelate(hotSwapInfo);
			replaceClass();
			HttpUtil.response("ok", ctx);
		} catch (Exception e) {
			LogTool.error(e,this);
		}
	}
	/**
	 * 解压
	 * @throws Exception
	 */
	private void unzip() throws Exception {
		System.err.println("deploy hotswap");
		String archive = GameProperties.hotswapDir +File.separator+ "newfile.zip";
		String decompressDir = GameProperties.hotswapDir+File.separator+"newfile";
		System.err.println("archive:"+archive);
		System.err.println("decompressDir:"+decompressDir);
		ZipCompress.readByApacheZipFile(archive, decompressDir);
		Thread.sleep(200);
		System.err.println("uncompress done");
	}
	/**
	 * 获取热更内容
	 * @return
	 * @throws ClassNotFoundException 
	 */
	private String getHotSwapInfo() throws Exception{
		File config = new File(GameProperties.hotswapDir + File.separator + "complie"
				+ File.separator + "excel" + File.separator + "config");
		File struct = new File(GameProperties.hotswapDir + File.separator + "complie"
				+ File.separator + "excel" + File.separator + "struct");
		File[] listFiles = struct.listFiles();
		if(listFiles==null) return null;
		int len = listFiles.length;
		int splitLen = len/5;
		int left = len%5>0?1:0;
		splitLen+= left;
		StringBuilder sb = new StringBuilder();
		StringBuilder sbFirst = new StringBuilder();
		sbFirst.append(GameProperties.hotswapDir + File.separator + "complie");
		for(int i=0;i<splitLen;i++){
			StringBuilder sbContent = new StringBuilder();
//			doGetHotSwapInfo(sbContent, struct,"excel.struct",i*5,i*5+5);
			doGetHotSwapInfo(sbContent, config,"excel.config",i*5,i*5+5);
			HotSwapHttpEvent.hotswap(sbFirst.toString()+sbContent.toString());
			sb.append(sbContent);
		}
		return sbFirst.toString()+sb.toString();
	}
	
	private void doGetHotSwapInfo(StringBuilder sb,File struct,String packet,int start,int end) throws Exception{
		File[] structFiles = struct.listFiles();
		int len = structFiles.length;
		if(end>len) end = len;
		for(int i=start;i<end;i++){
			File file = structFiles[i];
			sb.append("#");
			String className = packet+"."+file.getName().substring(0, file.getName().indexOf(".class"));
			sb.append(className);
		}
	}
	
	private void resetConfig() throws Exception{
		File config = new File(GameProperties.hotswapDir + File.separator + "complie"
				+ File.separator + "excel" + File.separator + "config");
		File[] files = config.listFiles();
		if(files==null) return;
		for(File file:files){
			String className = "excel.config."+file.getName().substring(0, file.getName().indexOf(".class"));
			Class<?> clazz = Class.forName(className);
			Method method = clazz.getMethod("reset");
			Method insMethod = clazz.getMethod("getIns");
			Object ins = insMethod.invoke(null);
			method.invoke(ins);
		}
	}
	
	private void replaceClass(){
		File config = new File(GameProperties.hotswapDir + File.separator + "complie"
				+ File.separator + "excel" + File.separator + "config");
		File[] files = config.listFiles();
		if(files==null) return;
		for(File file:files){
			FileUtils.copyFile(file.getAbsolutePath(), GamePath.USER_DIR+File.separator+"bin"+File.separator+"excel"+File.separator+"config"+File.separator+file.getName());
		}
	}
	/**
	 * excel关联的方法再被执行一次
	 * @param hotSwapInfo
	 */
	private void excelRelate(String hotSwapInfo) throws Exception{
		if(hotSwapInfo==null) return;
		String[] split = hotSwapInfo.split("#");
		HashMap<String, List<Method>> hotswapMap = ExcelHotswapCache.getHotswapMap();
		for(int i=1;i<split.length;i++){
			String clazz = split[i];
			List<Method> list = hotswapMap.get(clazz);
			if(!CollectionUtil.isEmpty(list)){
				for(Method method:list){
					method.invoke(method.getDeclaringClass().newInstance());
				}
			}
		}
	}
}
