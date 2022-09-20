package com.teamtop.redeploy;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.util.file.FileUtils;

public class GetNewClass {
	
	public static void main(String[] args) throws Exception {
		getNewClass();
	}
	
	public static String getNewClass(){
		StringBuilder sb = new StringBuilder();
		FileInputStream fileInputStream = null;
		InputStreamReader inputStreamReader = null;
		BufferedReader br = null;
		try {
			String binPath = GamePath.USER_DIR+GamePath.SEP+"bin";
//		String binPath = "F:\\teamtop\\ShuiHu\\WorkSpace\\ShuiHuGlobalFengYun\\trunk\\bin";
//			String binPath = "D:\\workspace\\XingSanGuo\\bin";
			String newFilePath = "C:\\newfile";
			FileUtils.deleteDirectory(newFilePath+File.separator+"com");
			Thread.sleep(1000);
			fileInputStream = new FileInputStream(newFilePath+File.separator+"info1.txt");
			inputStreamReader= new InputStreamReader(fileInputStream);
			br = new BufferedReader(inputStreamReader);
			String content = null;
			while((content=br.readLine())!=null){
				String tp = content.replace(".", "/");
				File dir = new File(newFilePath +File.separator+ tp.substring(0, tp.lastIndexOf("/")));
				if(!dir.exists()){
					dir.mkdirs();
				}
				File oriFile = new File(binPath +File.separator+ tp+".class");
				File cpFile = new File(newFilePath +File.separator+ tp+".class");
				sb.append("\n").append(oriFile);
//			org.apache.commons.io.FileUtils.copyFile(oriFile, cpFile);
				copy(oriFile,cpFile);
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}finally {
			if (br!=null) {				
				try {
					br.close();
					inputStreamReader.close();
					fileInputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				} 
			}
		}
		return sb.toString();
	}
	/**
	 * 封装好的文件拷贝方法
	 */
	public static void copy(File oriFile, File newFile) {
		try {
			InputStream is = new FileInputStream(oriFile);
			long length = oriFile.length();
			byte[] bytes = new byte[(int) length];

			// Read in the bytes
			int offset = 0;
			int numRead = 0;
			while (offset < bytes.length && (numRead = is.read(bytes, offset, bytes.length - offset)) >= 0) {
				offset += numRead;
			}

			if (offset < bytes.length) {
				throw new IOException("Could not completely read file " + oriFile.getName());
			}
			is.close();
			FileOutputStream fileOutputStream = new FileOutputStream(newFile);
			fileOutputStream.write(bytes);
			fileOutputStream.flush();
			fileOutputStream.close();
			System.err.println("success write class:"+oriFile.getAbsolutePath());
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		/*InputStream in = null;
		OutputStream out = null;
		try {
			in = new BufferedInputStream(new FileInputStream(oriFile));
			out = new BufferedOutputStream(new FileOutputStream(newFile));
			byte[] buffer = new byte[1024];
			while (in.read(buffer) != -1) {
				out.write(buffer);
				buffer = new byte[1024];
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (out != null) {
					out.close();
				}
				if (in != null) {
					in.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}*/
	}
}
