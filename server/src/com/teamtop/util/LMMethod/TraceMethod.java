package com.teamtop.util.LMMethod;

public class TraceMethod extends MethodBase {
	public Object execute(Object args) {
		System.out.println("调用 METHOD BASE");
		System.out.println(args);
		return null;
	}
}
