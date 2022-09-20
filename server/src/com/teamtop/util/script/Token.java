package com.teamtop.util.script;
public class Token {
	public static int K_ASSIGN = 1;//等于号
	public static int K_SEMICOLON = 2;//分号
	public static int K_COMMA = 3;//逗号
	public static int K_DOT = 4;//点
	public static int K_DDOT = 5;//双点  :
	
	public static int K_LPAREN = 200;//左括号
	public static int K_RPAREN = 201;//右括号
	public static int K_LCBRACKET = 210;//左中括号
	public static int K_RCBRACKET = 211;//右中括号
	public static int K_LQBRACKET = 220;//左方括号
	public static int K_RQBRACKET = 221;//右方括号
	
	public static int IDENT = 1000;//变量
	public static int NUMBER = 1001;//数字
	public static int STRING = 1002;//字符串
	
	public static int LOCAL = 1100;//声明变量
	
	public static int K_NULL = 307;
	public static int K_TRUE = 308;
	public static int K_FALSE = 100;
	public static int K_SUB = 309;
	
	public String src;
	public int type;
	public int row;
	public int col;
	
	public static Token create(int type, String src, int row, int col) {
		Token tk = new Token();
		tk.type = type;
		tk.src = src;
		tk.row = row;
		tk.col = row;
		return tk;
	}
}
