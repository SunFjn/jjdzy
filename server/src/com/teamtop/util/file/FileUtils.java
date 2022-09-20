package com.teamtop.util.file;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 文件操作工具类
 * 此类线程不安全如果需要线程安全则不能调用里面的方法
 * @author Administrator
 *
 */
public class FileUtils {
	
	private static File file = null;
	//防止实例化
	private FileUtils(){}
	/**
	 * 日志目录列表
	 */
	public static List<String> logDirList = new ArrayList<String>();
	
	static{
		logDirList.add("info");
		logDirList.add("warn");
		logDirList.add("error");
	}
	/**
	 * 写数据到文件末尾，不覆盖写入
	 * 文件不存在则创建文件
	 * @param path 文件的路径
	 * @param content 内容
	 */
	public static void  writeDataToEnd(String fileName,String content){
		file = new File(getFilePath(fileName));
		FileWriter  fw = null;
		try {
			if(!file.exists()) file.createNewFile();
			fw = new FileWriter(file, true);
			fw.write(content);
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			try {
				if(fw!=null){
					fw.flush();
					fw.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	/**
	 * 写数据到文件会覆盖写入
	 * 文件不存在则创建文件
	 * @param path 文件的路径
	 * @param content 内容
	 */
	public static void  writeData(String fileName,String content){
		file = new File(getFilePath(fileName));
		FileWriter  fw = null;
		try {
			if(!file.exists()) file.createNewFile();
			fw = new FileWriter(file);
			fw.write(content);
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			try {
				if(fw!=null){
					fw.flush();
					fw.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	/**
	 * 写数据到文件会覆盖写入
	 * 文件不存在则创建文件
	 * @param path 文件的路径
	 * @param content 内容
	 */
	public static void  writeData(String fileName,byte[] content){
		file = new File(fileName);
		FileOutputStream fos = null;
		try {
			if(!file.exists()) createFile(fileName);
			fos = new FileOutputStream(file);
			fos.write(content);
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			try {
				if(fos!=null){
					fos.flush();
					fos.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 创建一个文件
	 * @param fileName
	 */
	public static void createFile(String path,String fileName){
		String realPath = getFilePath(path+fileName);
		file = new File(realPath);
		if(file.exists())return;
		try {
			file.createNewFile();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 从文件中读取数据读出所有数据
	 * @param fileName 文件名字
	 * @return 文件中的内容
	 */
	public static String readData(String fileName){
		file = new File(getFilePath(fileName));
		String str = null;
		BufferedReader br = null;
		StringBuffer sb = new StringBuffer();
		try {
			if(!file.exists()){
				file.createNewFile();
				return null;
			}
			br = new BufferedReader(new FileReader(file));
			while((str=br.readLine())!=null){	
				sb.append(str);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			try {
				if(br!=null)br.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return sb.toString();
	}
	/**
	 * 复制文件
	 * @param src 绝对路径源文件
	 * @param dst 绝对路径目标文件
	 */
	public static void copyFile(String src,String dst){
		DataInputStream dis = null;
		DataOutputStream dos = null;
		try {
			File srcFile = new File(src);
			dis = new DataInputStream(new FileInputStream(srcFile));
			byte[] data = new byte[dis.available()];
			dis.read(data);
			
			File dstFile = new File(dst);
			if(dstFile.exists()){
				System.err.println("目标文件存在，删除");
				dstFile.delete();
			}
			dos = new DataOutputStream(new FileOutputStream(dstFile));
			dos.write(data);
			dos.flush();
			System.err.println("copy done,src:"+src+",dst:"+dst);
		} catch (Exception e) {
			e.printStackTrace();
		} finally{
			if(dis!=null){
				try {
					dis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			if(dos!=null){
				try {
					dos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	public static void main(String[] args) {
		copyFile("F:\\newfile.zip", "D:\\newfile.zip");
	}
	
	
	/**
	 * 
	 * 获取绝对路径(支持中文)
	 * @name getAbsFilePath
	 * @condition 解析文件时用
	 * @param filePath 相对路径
	 * @return 文件所在的绝对路径
	 * String
	 * @author Kyle
	 * @date：2012-8-3 上午07:03:23
	 * @throws 
	 * @version 1.0.0
	 */
	public static String getAbsFilePath(String filePath){
		String realFile = GamePath.class.getResource("/"+filePath).getPath();
		try {
			realFile = URLDecoder.decode(realFile, "utf-8");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		return realFile;
	}
	
	/**
	 * 
	 * 获取工作路径下的文件路径
	 * @name getAbsFilePath
	 * @condition 解析文件时用
	 * @param filePath 相对路径
	 * @return 文件所在的绝对路径
	 * @author Kyle
	 * @date：2012-8-3 上午07:03:23
	 * @version 1.0.0
	 */
	public static String getFilePath(String filePath){
//		String realFile = GamePath.USER_DIR+GamePath.SEP+filePath;
		try {
			filePath = URLDecoder.decode(filePath, "utf-8");
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
		return filePath;
	}
	
	/**
	 * 根据路径删除指定的目录或文件，无论存在与否
	 * 
	 * @param sPath
	 *            要删除的目录或文件
	 * @return 删除成功返回 true，否则返回 false。
	 */
	public static boolean deleteFolder(String sPath) {
		boolean flag = false;
		File file = new File(sPath);
		// 判断目录或文件是否存在
		if (!file.exists()) { // 不存在返回 false
			return flag;
		} else {
			// 判断是否为文件
			if (file.isFile()) { // 为文件时调用删除文件方法
				return deleteFile(sPath);
			} else { // 为目录时调用删除目录方法
				return deleteDirectory(sPath);
			}
		}
	}

	/**
	 * 删除单个文件
	 * 
	 * @param sPath
	 *            被删除文件的文件名
	 * @return 单个文件删除成功返回true，否则返回false
	 */
	public static boolean deleteFile(String sPath) {
		boolean flag = false;
		File file = new File(sPath);
		// 路径为文件且不为空则进行删除
		if (file.isFile() && file.exists()) {
			file.delete();
			flag = true;
		}
		return flag;
	}

	/**
	 * 删除目录（文件夹）以及目录下的文件
	 * 
	 * @param sPath
	 *            被删除目录的文件路径
	 * @return 目录删除成功返回true，否则返回false
	 */
	public static boolean deleteDirectory(String sPath) {
		// 如果sPath不以文件分隔符结尾，自动添加文件分隔符
		if (!sPath.endsWith(File.separator)) {
			sPath = sPath + File.separator;
		}
		File dirFile = new File(sPath);
		// 如果dir对应的文件不存在，或者不是一个目录，则退出
		if (!dirFile.exists() || !dirFile.isDirectory()) {
			return false;
		}
		boolean flag = true;
		// 删除文件夹下的所有文件(包括子目录)
		File[] files = dirFile.listFiles();
		for (int i = 0; i < files.length; i++) {
			// 删除子文件
			if (files[i].isFile()) {
				flag = deleteFile(files[i].getAbsolutePath());
				if (!flag)
					break;
			} // 删除子目录
			else {
				flag = deleteDirectory(files[i].getAbsolutePath());
				if (!flag)
					break;
			}
		}
		if (!flag)
			return false;
		// 删除当前目录
		if (dirFile.delete()) {
			System.out.println("dir "+dirFile.getAbsolutePath()+" del succ");
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 是否存在目录
	 * @param pathName 相对路径
	 * @return
	 */
	public static boolean isExistDir(String pathName){
	    File dir = new File(getFilePath(pathName));
	    return dir.exists();
	}
	
	/**
	 * 创建目录
	 * @param destDirName 目录名字
	 * @return 是否创建成功
	 */
	public static boolean createDir(String destDirName) {
	    File dir = new File(destDirName);
	    if(dir.exists()) {
	     System.out.println("创建目录" + destDirName + "失败，目标目录已存在！");
	     return false;
	    }
	    if(!destDirName.endsWith(File.separator))
	     destDirName = destDirName + File.separator;
	    // 创建单个目录
	    if(dir.mkdirs()) {
	     System.out.println("创建目录" + destDirName + "成功！");
	     return true;
	    } else {
	     System.out.println("创建目录" + destDirName + "成功！");
	     return false;
	    }
	}
	/**
	 * 创建目录
	 * @param destDirName 目录名字
	 * @return 是否创建成功
	 */
	public static boolean createFile(String fileName) {
		try {
			File dir = new File(fileName);
			if(dir.exists()) {
				System.out.println("创建文件" + fileName + "失败，目标文件已存在！");
				return false;
			}
			// 创建单个目录
			if(dir.createNewFile()){
				System.out.println("创建文件" + fileName + "成功！");
				return true;
			} else {
				System.out.println("创建文件" + fileName + "失败！");
				return false;
			}
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}
	
	public static String getLogStruct(String path,Map<String, Map<String, List<String>>> logMap,String nowScope,String nowDate,String speDate){
//		String nowScope = null;
//		String nowDate = null;
		if (!path.endsWith(File.separator)) {
			path = path + File.separator;
		}
 		File dir = new File(path);
		if (!dir.exists() ) {
			return null;
		}
		// 删除文件夹下的所有文件(包括子目录)
		File[] files = dir.listFiles();
		for (int i = 0; i < files.length; i++) {
			File subFile = files[i];
			String fileName = subFile.getName();
//			System.err.println(fileName);
			Map<String, List<String>> scopeMap = logMap.get(nowScope);
			List<String> dateList = null;
			if (subFile.isDirectory()) {
				//是目录
				if(logDirList.contains(fileName)){
					nowScope = fileName;
					scopeMap = logMap.get(fileName);
					if(scopeMap==null){
						scopeMap = new HashMap<String, List<String>>();
						logMap.put(fileName, scopeMap);
					}
				}else{
					if(speDate!=null && !speDate.equals(fileName)){
						continue;
					}
					if(nowDate!=fileName){
						nowDate = fileName;
						scopeMap = logMap.get(nowScope);
						dateList = scopeMap.get(nowDate);
						if(dateList==null){
							dateList = new ArrayList<String>();
							scopeMap.put(nowDate, dateList);
						}
					}
				}
				getLogStruct(subFile.getAbsolutePath(),logMap,nowScope,nowDate,speDate);
			}else{
				//是文件
				long length = subFile.length();
				dateList = scopeMap.get(nowDate);
				String name = subFile.getName();
				if(name.indexOf("zip")>=0){
					String cpName = name;
					int lastIndexOf = cpName.lastIndexOf(".");
					cpName = cpName.substring(0, lastIndexOf);
					File logFile = new File(subFile.getParent() + File.separator + cpName + ".log");
					if(logFile.exists()){
						dateList.add(name+"_s"+logFile.length());
					}else{
						dateList.add(name+"_s"+0);
					}
					continue;
				}
				int lastIndexOf = name.lastIndexOf(".");
				name = name.substring(0, lastIndexOf);
				String zipFileName = subFile.getParent() + File.separator + name + ".zip";
				File zipFile = new File(zipFileName);
				if(!zipFile.exists()){
					if(dateList==null){
						continue;
					}
					dateList.add(name+".log_s"+length);
				}
			}
		}
		return null;
	}
	
	/**
	 * 修改文件名字
	 * @param	filePathNew  新文件名不能带 ":"
	 */
	public static boolean renameFile(String filePathOld, String filePathNew) {
		try {
			File fileOld = new File(filePathOld);
			if(!fileOld.exists()) {
				LogTool.info("renameFile.file not exist:"+filePathOld, FileUtils.class);
				return false;
			}
			
			File fileNew = new File(filePathNew);
			if (fileOld.renameTo(fileNew)){
				LogTool.info("renameFile finish.old:"+filePathOld+" new:"+filePathNew, FileUtils.class);
				return true;
			}else{
				LogTool.info("renameFile fail.old:"+filePathOld+" new:"+filePathNew, FileUtils.class);
			}
		} catch (Exception e) {
			LogTool.error(e, FileUtils.class);
		}
		return false;
	}
	
	/**
	 * 清空指定时间的文件，文件夹不进行判断
	 * 文件最后一次修改时间在  timeBegin-timeEnd 之间的文件进行删除 
	 */
	public static void removeFileByTime(String dirPath, int timeBegin, int timeEnd) {
		try {
			File dir = new File(dirPath);
			if(!dir.exists()) {
				LogTool.info("removeFileByTime.file not exist:"+dirPath, FileUtils.class);
				return;
			}
			
			List<String> delFile = new ArrayList<>();
			File[] listFiles = dir.listFiles();
			for(File fileTemp:listFiles){
				if(fileTemp.isDirectory())
					continue;
				long lastModified = fileTemp.lastModified();
				int lastTime = (int)(lastModified/1000);
				if(timeBegin < lastTime && lastTime < timeEnd){
					delFile.add(fileTemp.getPath());
					LogTool.info("待删除："+fileTemp.getPath()+" 文件时间:"+TimeDateUtil.printTime(lastTime)+" 开始时间："+TimeDateUtil.printTime(timeBegin)+" 结束时间："+TimeDateUtil.printTime(timeEnd), FileUtils.class);
				}
			}
			
			for(String path:delFile){
				deleteFile(path);
			}
		} catch (Exception e) {
			LogTool.error(e, FileUtils.class);
		}
	}
	
}
