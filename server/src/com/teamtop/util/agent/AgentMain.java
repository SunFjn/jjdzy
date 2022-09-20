package com.teamtop.util.agent;

import java.lang.instrument.Instrumentation;
import java.lang.instrument.UnmodifiableClassException;

public class AgentMain {
	public static void agentmain(String agentArgs, Instrumentation inst) throws ClassNotFoundException, UnmodifiableClassException, InterruptedException {
		System.err.println("Agent Main Start");
		System.err.println("agentArgs:" + agentArgs);
		String[] split = agentArgs.split("#");
		Transformer transformer = new Transformer(split[0]);
		inst.addTransformer(transformer, true);
//		System.err.println("add trans ok");
		for (int i = 1; i < split.length; i++) {
			System.err.println("Class for name:" + split[i]);
			inst.retransformClasses(new Class[] { Class.forName(split[i]) });
		}
		inst.removeTransformer(transformer);
		System.err.println("Agent Main Done");
	}
}