package com.teamtop.redeploy;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import com.teamtop.util.file.FileUtils;

import jcifs.smb.SmbException;
import jcifs.smb.SmbFile;
import jcifs.smb.SmbFileInputStream;
import jcifs.smb.SmbFileOutputStream;

public class UploadDownloadUtil {

	/**
	 * Description: 从共享目录拷贝文件到本地
	 * 
	 * @Version1.0 Sep 25, 2009 3:48:38 PM
	 * @param remoteUrl
	 *            共享目录上的文件路径
	 * @param localDir
	 *            本地目录
	 */
	public String smbGet(String remoteUrl, String localDir) {
		try {
			FileUtils.deleteDirectory(localDir);
			Thread.sleep(500);
			FileUtils.createDir(localDir);
			Thread.sleep(500);
			SmbFile remoteFile = new SmbFile(remoteUrl);
			SmbFile[] listFiles = remoteFile.listFiles();
			SmbFile dateFile = null;
			long dateMax = 0l;
			for (SmbFile file : listFiles) {
				if (file.isDirectory()) {
					if (dateMax < file.getDate()) {
						dateMax = file.getDate();
						dateFile = file;
					}
				}
			}
			String base = dateFile.getName();
			base = base.substring(0, base.length() - 1);
			
			listFileInDir(dateFile, localDir, base);
			return dateFile.getPath();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public void listFileInDir(SmbFile file, String localDir, String base) {
		try {
			SmbFile[] files = file.listFiles();
			for (SmbFile f : files) {
//				String path = f.getPath();
//				System.err.println(path);
				if (f.isDirectory()) {
					String comparePath = getComparePath(f, base);
					String newPath = localDir + comparePath;
//					System.err.println("newPath:" + newPath);
					File newFileDir = new File(newPath);
					if (!newFileDir.exists()) {
						newFileDir.mkdir();
					}
					listFileInDir(f, localDir, base);
				} else {
					String comparePath = getComparePath(f, base);
					String newPath = localDir + comparePath;
//					System.err.println("newPath:" + newPath);
					File tempFile = new File(newPath);
					copy(f, tempFile);
				}
			}
		} catch (SmbException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 封装好的文件拷贝方法
	 */
	public void copy(SmbFile remoteFile, File localFile) {
		InputStream in = null;
		OutputStream out = null;
		try {
			in = new BufferedInputStream(new SmbFileInputStream(remoteFile));
			out = new BufferedOutputStream(new FileOutputStream(localFile));
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
		}
	}

	/**
	 * Description: 从本地上传文件到共享目录
	 * 
	 * @Version1.0 Sep 25, 2009 3:49:00 PM
	 * @param remoteUrl
	 *            共享文件目录
	 * @param localFilePath
	 *            本地文件绝对路径
	 */
	public void smbPut(String remoteUrl, String localFilePath) {
		InputStream in = null;
		OutputStream out = null;
		try {
			File localFile = new File(localFilePath);

			String fileName = localFile.getName();
			SmbFile remoteFile = new SmbFile(remoteUrl + "/" + fileName);
			in = new BufferedInputStream(new FileInputStream(localFile));
			out = new BufferedOutputStream(new SmbFileOutputStream(remoteFile));
			byte[] buffer = new byte[1024];
			while (in.read(buffer) != -1) {
				out.write(buffer);
				buffer = new byte[1024];
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				out.close();
				in.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 获取比较的相对路径
	 * 
	 * @param file
	 * @param base
	 * @return
	 */
	public String getComparePath(SmbFile file, String base) {
		String path = file.getPath();
		int firstIndex = path.indexOf(base);
		String comparePath = path.substring(firstIndex + base.length() + 1, path.length());
		// System.err.println(comparePath);
		return comparePath;
	}

	public static void main(String[] args) {
		UploadDownloadUtil test = new UploadDownloadUtil();
		// smb:域名;用户名:密码@目的IP/文件夹/文件名.xxx
//		test.smbGet("smb://192.168.7.123/shuihu/shuihu_前端/", "f:" + File.separator + "clientupload" + File.separator);
		test.smbGet("smb://192.168.7.123/shuihu/shuihu_后端/", "f:" + File.separator + "serverupload" + File.separator);
		// test.smbPut("smb://szpcg;jiang.t:xxx@192.168.193.13/Jake",
		// "c://test.txt") ;

	}
}
