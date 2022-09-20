package com.teamtop.util.ioUtil;

import java.io.Closeable;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.Reader;
import java.io.Writer;
import java.nio.CharBuffer;
import java.nio.charset.Charset;

import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

public class IOUtil {

	public static void saveObjectToDir(Object obj, String fileName) {
		if (CommonUtil.isNull(fileName))
			throw new RuntimeException("保存" + obj + "的文件名字为null！");
		if (obj == null)
			throw new RuntimeException("保存对象不能为null！");

		ObjectOutputStream oos = null;
		FileOutputStream fos = null;
		try {
			File file = new File(".", fileName);
			if (!file.exists()) {
				if (!file.createNewFile())
					throw new RuntimeException("创建对象数据文件:" + file.getName() + "失败");
			}

			fos = new FileOutputStream(file);
			oos = new ObjectOutputStream(fos);

			oos.writeObject(obj);
		} catch (Exception e) {
			LogTool.error(e, IOUtil.class, "保存对象" + obj + "到磁盘出错");
		} finally {
			IOUtil.close(fos);
			IOUtil.close(oos);
		}
	}

	public static Object loadObject(String fileName) {
		if (CommonUtil.isNull(fileName))
			return null;

		File file = new File(".", fileName);
		if (!file.exists())
			return null;

		ObjectInputStream ois = null;
		FileInputStream fis = null;

		try {
			fis = new FileInputStream(file);
			ois = new ObjectInputStream(fis);

			return ois.readObject();
		} catch (Exception e) {
			LogTool.error(e, IOUtil.class, "读取战报数据出错！");
			return null;
		} finally {
			IOUtil.close(fis);
			IOUtil.close(ois);
		}
	}

	public static void closeWriter(Writer writer) {
		if (writer != null) {
			try {
				writer.close();
			} catch (IOException e1) {
				LogTool.error(e1, IOUtil.class, "");
			}
		}
	}

	/**
	 * 关闭流
	 * 
	 * @param close
	 */
	public static void close(AutoCloseable close) {
		if (close != null) {
			try {
				close.close();
			} catch (Exception e1) {
				LogTool.error(e1, IOUtil.class, "");
			}
		}
	}

	/**
	 * 关闭流
	 * 
	 * @param close
	 */
	public static void close(Closeable close) {
		if (close != null) {
			try {
				close.close();
			} catch (Exception e1) {
				LogTool.error(e1, IOUtil.class, "");
			}
		}
	}

	public static void closeOs(OutputStream os) {
		if (os != null) {
			try {
				os.close();
			} catch (IOException e1) {
				LogTool.error(e1, IOUtil.class, "");
			}
		}
	}

	public static void closeRead(Reader read) {
		if (read != null) {
			try {
				read.close();
			} catch (IOException e1) {
				LogTool.error(e1, IOUtil.class, "");
			}
		}
	}

	public static void closeIs(InputStream is) {
		if (is != null) {
			try {
				is.close();
			} catch (IOException e1) {
				LogTool.error(e1, IOUtil.class, "");
			}
		}
	}

	public static String readFile(String file, Charset charset) throws IOException {
		InputStreamReader isr = null;
		try {
			charset = charset == null ? Charset.forName("utf-8") : charset;
			isr = new InputStreamReader(new FileInputStream(file), charset);
			StringBuffer s = new StringBuffer();
			CharBuffer bf = CharBuffer.allocate(1024);
			while (isr.read(bf) > 0) {
				bf.flip();
				s.append(bf.toString());
				bf = CharBuffer.allocate(1024);
			}
			return s.toString();
		} finally {
			if (isr != null)
				isr.close();
		}
	}

	public static byte[] readFile(File file) throws IOException {
		FileInputStream fis = null;
		byte[] data = null;
		try {
			fis = new FileInputStream(file);
			data = new byte[(int) file.length()];
			fis.read(data);
		} finally {
			if (fis != null)
				fis.close();
		}
		return data;
	}

	public static void writeFile(String fileName, byte[] data) throws IOException {
		writeFile(new File(fileName), data);
	}

	public static void writeFile(File file, byte[] data) throws IOException {
		writeFile(file, data, false);
	}

	public static void writeFile(String fileName, byte[] data, boolean append) throws IOException {
		writeFile(new File(fileName), data, append);
	}

	public static void writeFile(File file, byte[] data, boolean append) throws IOException {
		FileOutputStream fos = null;
		try {
			(fos = new FileOutputStream(file, append)).write(data);
		} finally {
			if (fos != null)
				fos.close();
		}
	}

}
