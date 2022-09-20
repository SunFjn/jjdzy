package com.teamtop.redeploy;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.teamtop.util.Properties.PropertiesTools;

public class CheckClientFile {
	private static CheckClientFile ins = null;
	public static CheckClientFile getInstance(){
		if(ins==null) ins = new CheckClientFile();
		return ins;
	}
	public static String versionNum = null;
	public static String binVersion = null;
	public static void main(String[] args) throws IOException {
		String svnDir = "F:\\newfile\\";
		String localDir = "F:\\30060002\\";
		String base = "";
		List<String> list = new ArrayList<String>();
		String checkFileSame = getInstance().checkFileSame(list,localDir,svnDir,base);
//		System.err.println(checkFileSame);
	}
	/**
	 * 检查相同文件
	 * @throws IOException
	 */
	public String checkFileSame(List<String> addFileList,String localDir,String svnDir,String base) throws IOException{
		versionNum = null;
		binVersion = null;
		System.err.println("localDir:"+localDir);
		System.err.println("svnDir:"+svnDir);
		System.err.println("base:"+base);
		File localFile = new File(localDir);
		List<String> sameFileList = new ArrayList<String>();
		doCheck(addFileList,sameFileList,localFile,base,svnDir);
		if(sameFileList.size()>0){
			return Arrays.deepToString(sameFileList.toArray());
		}else{
			fixClientVersion(versionNum, binVersion);
			return "1";
		}
	}
	/**
	 * 修改前端版本文件
	 * @param versionNum
	 * @param binVersion
	 */
	public void fixClientVersion(String versionNum,String binVersion) {
		try {
			if(versionNum==null && binVersion==null) return;
			String clientVersionPath = PropertiesTools.getProperties("clientVersion");
//			String clientVersionPath = "C:/Users/Administrator/Desktop/发布/自动发布/客服端/VersionControl.php";
			BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(clientVersionPath)));
			String content = null;
			StringBuilder sb = new StringBuilder();
			Pattern pattern = Pattern.compile("(?<=\")\\S+(?=\")");
			while ((content = br.readLine()) != null) {
				if (content.contains("versionNum")) {
					if (versionNum != null && !"".equals(versionNum)) {
						Matcher matcher = pattern.matcher(content);
						if(matcher.find()){
							content = matcher.replaceAll(versionNum);
						}
					}
				} else if (content.contains("binVersion")) {
					if (binVersion != null && !"".equals(binVersion)) {
						Matcher matcher = pattern.matcher(content);
						if(matcher.find()){
							content = matcher.replaceAll(binVersion);
						}
					}
				}
				sb.append(content).append("\n");
			}
			br.close();
			FileWriter fw = new FileWriter(clientVersionPath);
			BufferedWriter bw = new BufferedWriter(fw);
			bw.write(sb.toString());
			bw.flush();
			bw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	
	/**
	 * 递归检查相同文件
	 * @param localFile
	 * @param base
	 * @param svnDir
	 * @return
	 * @throws IOException
	 */
	private void doCheck(List<String> addFileList,List<String> sameFileList,File localFile,String base,String svnDir) throws IOException{
		File[] listFiles = localFile.listFiles();
		for(File file:listFiles){
			if(file.isDirectory()){
				String comparePath = getComparePath(file, base);
				String newPath = svnDir+comparePath;
				System.err.println("newPath:"+newPath);
				addFileList.add(newPath);
				doCheck(addFileList,sameFileList,file, base,svnDir);
			}else{
				String name = file.getName();
				if((name.indexOf("binv")==0 || name.indexOf("binV")==0) && binVersion == null){
					Pattern pattern = Pattern.compile("\\d+_\\d+");
					Matcher matcher = pattern.matcher(name);
					if(matcher.find()){
						binVersion = "v"+matcher.group();
					}
				}else if(name.indexOf("XiaKeXingLoader_v")==0 && versionNum==null){
					Pattern pattern = Pattern.compile("\\d+");
					Matcher matcher = pattern.matcher(name);
					if(matcher.find()){
						versionNum = "v"+matcher.group();
					}
				}
				String comparePath = getComparePath(file, base);
				String newPath = svnDir+comparePath;
				System.err.println("newPath:"+newPath);
				addFileList.add(newPath);
				File svnFile = new File(newPath);
				if(svnFile!=null && svnFile.exists()){
					sameFileList.add(comparePath);
					System.err.println("find same file:"+file.getPath()+",svn:"+svnFile.getPath());
				}
			}
		}
	}
	/**
	 * 获取比较的相对路径
	 * @param file
	 * @param base
	 * @return
	 */
	public String getComparePath(File file,String base){
		String path = file.getPath();
		int firstIndex = path.indexOf(base);
		String comparePath = path.substring(firstIndex+base.length(), path.length());
//		System.err.println(comparePath);
		return comparePath;
	}
}
