package com.teamtop.util.script;

public class LMValue {
	
	public Object src;
	
	public int getInt() {
		return Integer.parseInt(src.toString());
	}
	
	public String getString() {
		return src.toString();
	}
	
	public Object getValue() {
		return src;
	}
}
