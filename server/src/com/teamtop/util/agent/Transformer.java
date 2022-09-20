package com.teamtop.util.agent;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.instrument.ClassFileTransformer;
import java.lang.instrument.IllegalClassFormatException;
import java.security.ProtectionDomain;

public class Transformer implements ClassFileTransformer {
	private String basePath;

	public Transformer(String basePath) {
		this.basePath = basePath;
	}

	public static byte[] getBytesFromFile(String fileName) {
		try {
			File file = new File(fileName);
			if ((file == null) || (!file.exists())) {
				System.err.println("read file err,not found,"+fileName);
				return null;
			}
//			System.err.println("File：" + file.getPath());
			InputStream is = new FileInputStream(file);
			long length = file.length();
			byte[] bytes = new byte[(int) length];

			int offset = 0;
			int numRead = 0;
			while ((offset < bytes.length) && ((numRead = is.read(bytes, offset, bytes.length - offset)) >= 0)) {
				offset += numRead;
			}

			if (offset < bytes.length) {
				is.close();
				throw new IOException("Could not completely read file " + file.getName());
			}
			is.close();
			System.err.println("read file done:" + fileName);
			return bytes;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("error occurs in _ClassTransformer!" + e.getClass().getName());
		}
		return null;
	}

	public byte[] transform(ClassLoader l, String className, Class<?> c, ProtectionDomain pd, byte[] b) throws IllegalClassFormatException {
//		System.err.println("transfrom:" + className);

		return getBytesFromFile(this.basePath + File.separator + className + ".class");
	}
}