package com.teamtop.util.zlib;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

/**
 * Gzip 压缩字符串
 */
public class GZIP {
	public static byte[] compress(byte[] data) throws IOException {
		// 创建一个新的输出流
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		// 使用默认缓冲区大小创建新的输出流
		GZIPOutputStream gzip = new GZIPOutputStream(out);
		// 将字节写入此输出流
		gzip.write(data); // 因为后台默认字符集有可能是GBK字符集，所以此处需指定一个字符集
		gzip.close();
		// 使用指定的 charsetName，通过解码字节将缓冲区内容转换为字符串
		return out.toByteArray();
	}
	
	public static byte[] unCompress(byte[] data) throws IOException {
		// 创建一个新的输出流
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		// 创建一个 ByteArrayInputStream，使用 buf 作为其缓冲区数组
		ByteArrayInputStream in = new ByteArrayInputStream(data);
		// 使用默认缓冲区大小创建新的输入流
		GZIPInputStream gzip = new GZIPInputStream(in);
		byte[] buffer = new byte[256];
		int n = 0;

		// 将未压缩数据读入字节数组
		while ((n = gzip.read(buffer)) >= 0) {
			out.write(buffer, 0, n);
		}
		// 使用指定的 charsetName，通过解码字节将缓冲区内容转换为字符串
		return out.toByteArray();
	}
	/**
	 * 字符串的压缩
	 * 
	 * @param str
	 *            待压缩的字符串
	 * @return 返回压缩后的字符串
	 * @throws IOException
	 */
	public static String compress(String str) throws IOException {
		if (null == str || str.length() <= 0) {
			return str;
		}
		// 创建一个新的输出流
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		// 使用默认缓冲区大小创建新的输出流
		GZIPOutputStream gzip = new GZIPOutputStream(out);
		// 将字节写入此输出流
		gzip.write(str.getBytes("utf-8")); // 因为后台默认字符集有可能是GBK字符集，所以此处需指定一个字符集
		gzip.close();
		// 使用指定的 charsetName，通过解码字节将缓冲区内容转换为字符串
		return out.toString("ISO-8859-1");
	}

	/**
	 * 字符串的解压
	 * 
	 * @param str
	 *            对字符串解压
	 * @return 返回解压缩后的字符串
	 * @throws IOException
	 */
	public static String unCompress(String str) throws IOException {
		if (null == str || str.length() <= 0) {
			return str;
		}
		// 创建一个新的输出流
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		// 创建一个 ByteArrayInputStream，使用 buf 作为其缓冲区数组
		ByteArrayInputStream in = new ByteArrayInputStream(str.getBytes("ISO-8859-1"));
		// 使用默认缓冲区大小创建新的输入流
		GZIPInputStream gzip = new GZIPInputStream(in);
		byte[] buffer = new byte[256];
		int n = 0;

		// 将未压缩数据读入字节数组
		while ((n = gzip.read(buffer)) >= 0) {
			out.write(buffer, 0, n);
		}
		// 使用指定的 charsetName，通过解码字节将缓冲区内容转换为字符串
		return out.toString("utf-8");
	}
	
	public static void main(String[] args) {
//		int i = 100;
//		while(i<=5000){
//			compressTest(i);
//			i +=500;
//		}
		compressTest(10000);
	}
	private static void compressTest(int len){
		StringBuilder sb = new StringBuilder();
		len = len/10;
		for(int i=0;i<len;i++){
			sb.append("key"+i+":v,");
		}
		String str = sb.toString();
		try {
			long a = System.currentTimeMillis();
			int counts = 10000;
//			for(int i=0;i<counts;i++){
				String compress = compress(str);
				byte[] compress2 = compress(str.getBytes());
				FileOutputStream fout = new FileOutputStream(new File("c:\\test.gzip"));
				fout.write(compress2);
				fout.flush();
				String unCompress = unCompress(compress);
//			}
			long b = System.currentTimeMillis();
//			System.err.println("time:"+(b-a)+" ms,counts:"+counts);
			System.err.println("str size:"+str.length()+",time:"+(b-a)+" ms,compress size:"+compress.length()+",unCompress size:"+unCompress.length());
//			System.err.println("unCompress size:"+unCompress.length());
//			System.err.println(unCompress);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}