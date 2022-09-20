package com.teamtop.redeploy;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class SvnTools {
	public static void main(String[] args) {
	    try {
	        XShellResult excuteCommand = excuteCommand("cmd /c java -version");
	        System.err.println(excuteCommand.getExitValue());
	        System.err.println(excuteCommand.getPrintInfo());
	    }catch(Exception e){
	        e.printStackTrace();
	    }
	}
	public static XShellResult excuteCommand(String command) throws Exception{
//		System.err.println("exec command:" + command);
		Runtime r = Runtime.getRuntime();
		Process p;
		p = r.exec(command);
		BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
		String inline;
		StringBuilder sb = new StringBuilder();
		while ((inline = br.readLine()) != null) {
//			System.out.println("is:" + new String(inline.getBytes("utf-8")));
			// DeployCache.outputQueue.add(inline);
			sb.append(inline).append("\n");
		}
		BufferedReader brerr = new BufferedReader(new InputStreamReader(p.getErrorStream()));
		while ((inline = brerr.readLine()) != null) {
//			System.out.println("es:" + inline);
			// DeployCache.errQueue.add(inline);
			sb.append(inline).append("\n");
		}
		p.waitFor();
		int exitValue = p.exitValue();
//		System.err.println("exitValue:" + exitValue);
		br.close();
		brerr.close();
		return new XShellResult(exitValue, sb.toString());
			// System.err.println("cmd result:"+sb.toString());
	}
}
