package com.teamtop.util.common;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;

public class RunSVN {
	public static void main(String[] args) throws IOException {
		checkOut();
	}

	static String path = "f:\\\\test\\\\g1\\\\";

	public static void checkOut() throws IOException {
		/*
		 * Runtime runtime = Runtime.getRuntime(); Process p = null; p =
		 * runtime.
		 * exec("svn co https://192.168.7.201/svn/ShuiHuCode/trunk/bin/ f:/test"
		 * ); InputStream in = p.getInputStream(); Integer i = in.read();
		 * System.out.println(i);
		 */

		long startTime = System.currentTimeMillis();
		File file = new File(path); String[] fileList = file.list();
		List<String> commandList = new ArrayList<String>();
		//commandList.add("cmd /k set CLASSPATH=%CLASSPATH%;F:\\test\\lib;");
		Runtime runtime = Runtime.getRuntime();
		Process p = runtime.exec("cmd");
		OutputStream os = p.getOutputStream();
		
		writeCommand("set CLASSPATH=%CLASSPATH%;F:\\test\\lib;", os);
		 readOrCompile(fileList,path,commandList);
		 compile(commandList,os);
		 print(p.getErrorStream());
		// print.close();
		 System.out.println("useTime = " + (System.currentTimeMillis() - startTime));
		 System.out.println("finish...");
		 os.close();
		/*Runtime runtime = Runtime.getRuntime();
		Process p = runtime.exec("javac -d f:\\test -sourcepath g1 -classpath  -Djava.ext.dirs=F:\\test\\lib\\ -J-Dfile.encoding=UTF-8 f:\\test\\g1\\com\\game\\test\\Test.java");
		int i = 0;
		try {
			i = p.waitFor();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(i);
		BufferedReader reader = new BufferedReader(new InputStreamReader(p.getErrorStream()));
		String str = null;
		while((str = reader.readLine())!= null) {
			System.out.println(str);
		}
		System.out.println(str);*/
		//testCommand();
		/*Runtime runtime = Runtime.getRuntime();
		Process p = runtime.exec("cmd /k set CLASSPATH=%CLASSPATH%;F:\\test\\lib");
		BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
		String str = null;
		while((str = reader.readLine())!= null) {
			System.out.println(str);
		}
		System.out.println(str);*/
	}
	
	private static void print(InputStream errorStream) {
		BufferedReader reader = null;
		//InputStream in = null;
		try {
			//p = runtime.exec(attr);
			//in = p.getErrorStream();
			// BufferedInputStream bIn = new BufferedInputStream(in);
			reader = new BufferedReader(new InputStreamReader(errorStream));
			String con = null;
			while ((con = reader.readLine()) != null) {
				System.err.println(con);
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally{
				try {
					if (reader != null)
						reader.close();
					if (errorStream != null)
						errorStream.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}
		
	}

	public static void writeCommand(String command, OutputStream os) {
		BufferedWriter print = null;
		try {
			print = new BufferedWriter(new OutputStreamWriter(os));
			print.write(command);
			print.newLine();
			print.flush();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private static void compile(List<String> commandList, OutputStream os) {
		System.err.println("start compile...");
		/*String[] attr = new String[commandList.size()];
		commandList.toArray(attr);
		
		BufferedReader reader = null;
		InputStream in = null;
		try {
			p = runtime.exec(attr);
			in = p.getErrorStream();
			// BufferedInputStream bIn = new BufferedInputStream(in);
			reader = new BufferedReader(new InputStreamReader(in));
			String con = null;
			while ((con = reader.readLine()) != null) {
				System.err.println(con);
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally{
				try {
					if (reader != null)
						reader.close();
					if (in != null)
						in.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		}*/
		for(String command: commandList) {
			System.out.println(command);
			writeCommand(command, os);
		}
		System.err.println("end compile....");
		
	}

	private static void testCommand() throws IOException {
		Runtime runtime = Runtime.getRuntime();
		Process p = runtime.exec("f:\\test");
		BufferedReader in = new BufferedReader(new InputStreamReader(
				p.getInputStream()));
		String str = null;
		while ((str = in.readLine()) != null) {
			
			System.out.println(str);
		}

		/*Runtime runtime = Runtime.getRuntime();
		Process p = null;
		p = runtime
				.exec("svn co https://192.168.7.201/svn/ShuiHuCode/trunk/src/ f:/test/g1");
		BufferedReader in = new BufferedReader(new InputStreamReader(
				p.getInputStream()));
		String str = null;
		while ((str = in.readLine()) != null) {
			System.out.println(str);
		}*/

	}

	private static void readOrCompile(String[] fileList, String path, List<String> commandList) {
		//System.out.println("cd : " + path);
		//commandList.add("set CLASSPATH=%CLASSPATH%;F:\\test\\lib");
		for (String filePath : fileList) {
			File file = new File(path + "\\" + filePath);
			String thisPath = path + "\\" + filePath;
			if (file.isDirectory()) {
				if(".svn".equals(file.getName())) continue;
				String[] subFileList = file.list();
				readOrCompile(subFileList, thisPath,commandList);
			} else {
				if (file.getName().endsWith(".java")) {
					try {
						commandList.add(compileJava(file.getAbsolutePath()));
					} catch (IOException e) {
						e.printStackTrace();
					}
				} else {
					moveFile(file.getAbsolutePath());
				}
			}
		}
		
	}
	

	private static void moveFile(String absolutePath) {
		//System.out.println("move file : " + absolutePath);
		String newFilePath = outPath + absolutePath.replaceAll(path, "");
		File oldFile = new File(absolutePath);
		try {
			FileInputStream in = new FileInputStream(oldFile);
			byte[] bytes = new byte[(int) oldFile.length()];
			File de = new File(newFilePath.substring(0,
					newFilePath.lastIndexOf("\\")));
			if (!de.exists()) {
				de.mkdirs();
			}
			File newFile = new File(newFilePath);
			FileOutputStream out = new FileOutputStream(newFile);
			in.read(bytes);
			out.write(bytes);
			out.flush();
			out.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		/*
		 * newFilePath = newFilePath.substring(0, newFilePath.lastIndexOf("/"));
		 * File file = new File(newFilePath); if(!file.exists()) { file.mkdir();
		 * }
		 */

	}

	static String outPath = "f:\\test\\bin\\";

	private static String compileJava(String filePath) throws IOException {
		//System.out.println("compile file : " + filePath);
		File file = new File(outPath);
		if (!file.exists()) {
			file.mkdirs();
		}
		return "javac -d " + outPath + " -sourcepath F:\\test\\g1 -classpath F:\\test\\bin -Djava.ext.dirs=F:\\test\\lib\\ -J-Dfile.encoding=UTF-8 " + filePath;
		/*Process p = runtime.exec("javac -d " + outPath + " -sourcepath g1 -classpath F:\\test\\bin -Djava.ext.dirs=F:\\test\\lib\\ -J-Dfile.encoding=UTF-8" + filePath);
		InputStream in = p.getErrorStream();
		// BufferedInputStream bIn = new BufferedInputStream(in);
		BufferedReader reader = null;
		reader = new BufferedReader(new InputStreamReader(in));
		String con = null;
		while ((con = reader.readLine()) != null) {
			System.err.println(con);
		}
		if (reader != null)
			reader.close();
		if (in != null)
			in.close();*/
	}
}
