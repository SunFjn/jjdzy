package com.teamtop.util.agent;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import com.teamtop.util.file.FileUtils;

public class AgentGetNew {
	public static void main(String[] args) throws Exception {
		String binPath = "F:\\workspace\\Game72\\bin";
//		String binPath = "F:\\teamtop\\ShuiHu\\WorkSpace\\ShuiHuGlobalFengYun\\trunk\\bin";
		String newFilePath = "F:\\workspace\\Game72\\hotswap\\newfile";
		FileUtils.deleteDirectory(newFilePath+File.separator+"com");
		Thread.sleep(1000);
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(newFilePath+File.separator+"info.txt")));
		String content = null;
		while((content=br.readLine())!=null){
			String tp = content.replace(".", "/");
			File dir = new File(newFilePath +File.separator+ tp.substring(0, tp.lastIndexOf("/")));
			if(!dir.exists()){
				dir.mkdirs();
			}
			File oriFile = new File(binPath +File.separator+ tp+".class");
			File cpFile = new File(newFilePath +File.separator+ tp+".class");
			copy(oriFile,cpFile);
		}
		br.close();
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
				is.close();
				throw new IOException("Could not completely read file " + oriFile.getName());
			}
			is.close();
			FileOutputStream fileOutputStream = new FileOutputStream(newFile);
			fileOutputStream.write(bytes);
			fileOutputStream.flush();
			fileOutputStream.close();
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
