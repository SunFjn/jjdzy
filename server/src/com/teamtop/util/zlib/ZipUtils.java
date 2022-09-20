package com.teamtop.util.zlib;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.Deflater;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;
import java.util.zip.Inflater;

import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.ioUtil.IOUtil;
import com.teamtop.util.log.LogTool;

public class ZipUtils {

	/**
	 * 解压缩
	 * 
	 * @param data
	 *            待压缩的数据
	 * @return byte[] 解压缩后的数据
	 */
	public static byte[] decompress(byte[] data) {
		byte[] output = new byte[0];

		Inflater decompresser = new Inflater();
		decompresser.reset();
		decompresser.setInput(data);

		ByteArrayOutputStream o = new ByteArrayOutputStream(data.length);
		try {
			byte[] buf = new byte[2048];
			while (!decompresser.finished()) {
				int i = decompresser.inflate(buf);
				o.write(buf, 0, i);
			}
			output = o.toByteArray();
		} catch (Exception e) {
			output = data;
			e.printStackTrace();
		} finally {
			try {
				o.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		decompresser.end();
		return output;
	}

	/**
	 * 压缩
	 * 
	 * @param data
	 *            待压缩数据
	 * @return byte[] 压缩后的数据
	 */
	public static byte[] compress(byte[] data) {
		byte[] output = new byte[0];

		Deflater compresser = new Deflater();

		compresser.reset();
		compresser.setInput(data);
		compresser.finish();
		ByteArrayOutputStream bos = new ByteArrayOutputStream(data.length);
		try {
			byte[] buf = new byte[2048];
			while (!compresser.finished()) {
				int i = compresser.deflate(buf);
				bos.write(buf, 0, i);
			}
			output = bos.toByteArray();
		} catch (Exception e) {
			output = data;
			e.printStackTrace();
		} finally {
			try {
				bos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		compresser.end();
		return output;
	}

	/**
	 * 以gzip方式进行压缩，返回以base64编码的字符串
	 * 
	 * @param cstr
	 * @return
	 */
	public static String gzipCompress(String cstr) throws IOException {
		if (CommonUtil.isNull(cstr)) {
			return cstr;
		}

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		GZIPOutputStream gzip = null;
		try {
			gzip = new GZIPOutputStream(out);
			gzip.write(cstr.getBytes());
		} catch (IOException e) {
			LogTool.error(e, ZipUtils.class, "");
			throw e;
		} finally {
			IOUtil.close(gzip);
		}
		return new sun.misc.BASE64Encoder().encode(out.toByteArray());
	}

	/**
	 * 解压缩以 base64编码的字符串
	 * 
	 * @param cstr
	 * @return
	 */
	public static String gzipDecompress(String cstr) throws IOException {
		if (CommonUtil.isNull(cstr)) {
			return cstr;
		}

		ByteArrayOutputStream out = new ByteArrayOutputStream();
		ByteArrayInputStream in = null;
		GZIPInputStream ginzip = null;
		byte[] compressed = null;
		String decompressed = null;
		try {
			// 压缩的数据
			compressed = new sun.misc.BASE64Decoder().decodeBuffer(cstr);
			in = new ByteArrayInputStream(compressed);// 压缩流
			ginzip = new GZIPInputStream(in);// 解压缩流

			byte[] buffer = new byte[1024];
			int offset = -1;
			while ((offset = ginzip.read(buffer)) != -1) {
				out.write(buffer, 0, offset);
			}
			decompressed = out.toString();
		} catch (IOException e) {
			LogTool.error(e, ZipUtils.class, "");
			throw e;
		} finally {
			IOUtil.close(ginzip);
			IOUtil.close(in);
			IOUtil.close(out);
		}

		return decompressed;
	}

}
