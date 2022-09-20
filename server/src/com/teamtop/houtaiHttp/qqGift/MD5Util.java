package com.teamtop.houtaiHttp.qqGift;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Util {
	
	// 字节数组转化为16进制md5字符串
	public static String byteArrayToHex(byte[] inputByteArray) {
		messagedigest.update(inputByteArray);

		// 转换并返回结果，也是字节数组，包含16个元素
		byte[] resultByteArray = messagedigest.digest();

		// 首先初始化一个字符数组，用来存放每个16进制字符
		char[] hexDigits = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };

		// new一个字符数组，这个就是用来组成结果字符串的（解释一下：一个byte是八位二进制，也就是2位十六进制字符（2的8次方等于16的2次方））
		char[] resultCharArray = new char[resultByteArray.length * 2];

		// 遍历字节数组，通过位运算（位运算效率高），转换成字符放到字符数组中去
		int index = 0;
		for (byte b : resultByteArray) {
			resultCharArray[index++] = hexDigits[b >>> 4 & 0xf];
			resultCharArray[index++] = hexDigits[b & 0xf];
		}
		// 字符数组组合成字符串返回
		return new String(resultCharArray);
	}

	protected static char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
	protected static MessageDigest messagedigest = null;

	/**
	 * MessageDigest初始化
	 * 
	 * @author 高焕杰
	 */
	static {
		try {
			messagedigest = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			System.err.println("MD5FileUtil messagedigest初始化失败");
			e.printStackTrace();
		}
	}

	/**
	 * 对文件进行MD5加密
	 * 
	 * @author 高焕杰
	 */
//	public static String getFileMD5String(File file) throws IOException {
//		FileInputStream in = new FileInputStream(file);
//		FileChannel ch = in.getChannel();
//		MappedByteBuffer byteBuffer = ch.map(FileChannel.MapMode.READ_ONLY, 0, file.length());
//		messagedigest.update(byteBuffer);
//		return bufferToHex(messagedigest.digest());
//	}

	/**
	 * 对字符串进行MD5加密
	 * 
	 * @author 高焕杰
	 */
	public static String getMD5String(String s) {
		return getMD5String(s.getBytes());
	}

	/**
	 * 对byte类型的数组进行MD5加密
	 * 
	 * @author 高焕杰
	 */
	public static String getMD5String(byte[] bytes) {
		messagedigest.update(bytes);
		return bufferToHex(messagedigest.digest());
	}
	
	private static String bufferToHex(byte bytes[]) {
		return bufferToHex(bytes, 0, bytes.length);
	}

	private static String bufferToHex(byte bytes[], int m, int n) {
		StringBuffer stringbuffer = new StringBuffer(2 * n);
		int k = m + n;
		for (int l = m; l < k; l++) {
			char c0 = hexDigits[(bytes[l] & 0xf0) >> 4];
			char c1 = hexDigits[bytes[l] & 0xf];
			stringbuffer.append(c0);
			stringbuffer.append(c1);
		}
		return stringbuffer.toString();
	}

}
