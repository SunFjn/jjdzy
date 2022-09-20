package com.teamtop.util.script;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

import com.teamtop.util.LMMethod.TraceMethod;


public class ScriptMain {
	
	public static void main(String[] args) throws Exception {
		testBattleConfig();
	}
	private static void testBattleConfig() throws Exception{
		String config = getConfig();
		LexemeParser lex = new LexemeParser();
		GentreeBuilder gb = new GentreeBuilder();
		GentreeExecuter ge = new GentreeExecuter();
		
		ge.mappMethod("trace", new TraceMethod());

		ArrayList<Token> lexs = lex.parse(config);
		GentreeNode root = gb.build(lexs);
		
		ge.execute(root);
	}
	private static String getConfig()  throws Exception{
		BufferedReader r = new BufferedReader(new InputStreamReader(new FileInputStream("E:\\teamtop\\YT2\\battleconfig.txt"),"gbk"));
		String line = null;
		StringBuilder sb = new StringBuilder();
		while((line = r.readLine())!=null){
			sb.append(line);
		}
		System.err.println(sb.toString());
		return sb.toString();
	}
}
