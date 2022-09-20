package com.teamtop.util.agent;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.lang.management.ManagementFactory;

import com.sun.tools.attach.VirtualMachine;

public class TestHotSwap {
	public static void main(String[] args) throws Exception {
		test();
	}
	private static void test() throws Exception{
		//执行热更
		String name = ManagementFactory.getRuntimeMXBean().getName();  
		// get pid  
		String pid = name.split("@")[0];  
//		String pid = "16220";
//		String path = GameProperties.hotswapDir;
		String path = "F:\\workspace\\Game72\\hotswap";
		String baseStr = path;
		File file = new File(baseStr+File.separator+"newfile"+File.separator+"info.txt");
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
		StringBuilder sb = new StringBuilder();
		String content = null;
		sb.append(baseStr+File.separator+"newfile");
		while((content=br.readLine())!=null){
			sb.append("#");
			sb.append(content);
		}
		VirtualMachine vm = VirtualMachine.attach(pid);
		try {
			vm.loadAgent("F:\\workspace\\Game72\\lib\\agent.jar",sb.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		vm.detach();
		System.err.println("attach finish");
		br.close();
		Thread.sleep(1000000);
	}
}
