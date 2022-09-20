package com.teamtop.util.script;
import java.util.ArrayList;

public class GentreeNode {
	
	public static final int STMTS = 1;
	public static final int STMT = 2;
	public static final int STMT_ASSIGN = 3;
	
	public static final int NULL = 10;
	public static final int TRUE = 11;
	public static final int FALSE = 12;
	
	public static final int DECLARE = 110;
	
	public static final int CALL = 101;
	public static final int VARNAME = 102;//属性
	public static final int PARAMS = 103;
	public static final int PROP = 104;
	public static final int INDEX = 105;
	public static final int INVERT = 106;
	
	public static final int CONST = 140;
	
	public static final int NEWTABEL = 151;
	public static final int NEWARRAY = 152;
	
	public ArrayList<GentreeNode> childs;
	public Token token;
	public int type;
	public GentreeNode parent;
	public LMValue value;
	
	public GentreeNode() {
		childs = new ArrayList<GentreeNode>();
		value = new LMValue();
	}
	
	public static GentreeNode create(int type, Token tk) {
		GentreeNode gn = new GentreeNode();
		gn.type = type;
		gn.token = tk;
		
		return gn;
	}
	
	public static GentreeNode create(int type) {
		GentreeNode gn = new GentreeNode();
		gn.type = type;
		
		return gn;
	}

	public void addChild(GentreeNode child) {
		child.parent = this;
		childs.add(child);
	}
	
	public void setValue(Object val) {
		value.src = val;
	}
}
