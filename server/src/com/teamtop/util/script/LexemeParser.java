package com.teamtop.util.script;
import java.util.ArrayList;
import java.util.HashMap;

public class LexemeParser {
	public HashMap<String, Integer> singleDict;
	public HashMap<String, Integer> keyWordDict;
	
	public LexemeParser() {
		singleDict = new HashMap<String, Integer>();
		singleDict.put("(", Token.K_LPAREN);
		singleDict.put("（", Token.K_LPAREN);
		singleDict.put(")", Token.K_RPAREN);
		singleDict.put("）", Token.K_RPAREN);
		
		singleDict.put("{", Token.K_LCBRACKET);
		singleDict.put("}", Token.K_RCBRACKET);
		
		singleDict.put("[", Token.K_LQBRACKET);
		singleDict.put("【", Token.K_LQBRACKET);
		singleDict.put("]", Token.K_RQBRACKET);
		singleDict.put("】", Token.K_RQBRACKET);
		
		singleDict.put(",", Token.K_COMMA);
		singleDict.put("，", Token.K_COMMA);
		singleDict.put(";", Token.K_SEMICOLON);
		singleDict.put("；", Token.K_SEMICOLON);
		
		singleDict.put(".", Token.K_DOT);
		singleDict.put("。", Token.K_DOT);
		singleDict.put(":", Token.K_DDOT);
		singleDict.put("：", Token.K_DDOT);
		
		singleDict.put("=", Token.K_ASSIGN);
		
		keyWordDict = new HashMap<String, Integer>();
		keyWordDict.put("var", Token.LOCAL);
	}
	
	private String _code;
	private int _ptr;
	private int _len;
	public ArrayList<Token> parse(String code) {
		ArrayList<Token> ret = new ArrayList<Token>();
		_code = code;
		_len = code.length();
		
		while(_ptr < _len) {
			Token tk = parseRout();
			if(tk != null) ret.add(tk);
		}
		return ret;
	}
	
	private Token parseRout() {
		Token ret = null;
		skipWhite();
		String ch = currentChar();
		String nc = nextChar();
		if(ch.equals(";")) {
			next();
		}else if(ch.equals("/")){//跳过注释
			if(nc.equals("/")) {
				next();
				while(!ch.equals("\n") && _ptr < _len) {
					next();
				}
				next();
			}else if(nc.equals("*")) {
				next();
				next();
				while(currentChar().equals("*") && !nc.equals("/") && _ptr < _len) {
					next();
				}
				next();
				next();
			}
		}else{
			int singleType = getSingleType(ch);
			String tempStr;
			if(singleType != 0) {//关键符
				ret = Token.create(singleType, ch, 0, 0);
				next();
			}else{
				if(isNumber(ch)) {//数字
					nc = ch;
					tempStr = "";
					while(isNumber(nc) || nc.equals(".")) {
						tempStr += nc;
						next();
						nc = currentChar();
					}
					ret = Token.create(Token.NUMBER, tempStr, 0, 0);
				}else if(ch.equals("\"")) {//双引号开头的字符串
					tempStr = "";
					nc = nextChar();
					next();
					while(!nc.equals("\"")) {
						tempStr += nc;
						next();
						nc = currentChar();
					}
					next();
					ret = Token.create(Token.STRING, tempStr, 1, 1);
				}else{//变量 或关键词
					tempStr = ch;
					nc = nextChar();
					next();
					while(isLetter(nc)) {
						tempStr += nc;
						next();
						nc = currentChar();
					}
					int keyValue = getKeyWord(tempStr);
					if(keyValue != 0) {
						ret = Token.create(keyValue, tempStr, 1, 1);
					}else{
						ret = Token.create(Token.IDENT, tempStr, 1, 1);
					}
				}
			}
		}
		return ret;
	}
	
	private int getKeyWord(String str) {
		int ret = 0;
		if(keyWordDict.containsKey(str)) {
			ret = keyWordDict.get(str);
		}
		return ret;
	}
	
	private int getSingleType(String ch) {
		int ret = 0;
		if(singleDict.containsKey(ch)) {
			ret = singleDict.get(ch);
		}
		return ret;
	}
	
	private String currentChar() {
		char ch = _code.charAt(_ptr);
		String ret = String.valueOf(ch);
		return ret;
	}
	
	private void skipWhite() {
		String ch = currentChar();
		while(ch.equals(" ") || ch.equals("\t") || ch.equals("\n") || ch.equals("\r")) {
			next();
			ch = currentChar();
		}
	}
	
	private boolean next() {
		_ptr++;
		return _ptr < _len;
	}
	
	private boolean isLetter(String ch) {
		boolean ret = singleDict.containsKey(ch) == false && !ch.equals("") && !ch.equals(" ") && !ch.equals("\t") && !ch.equals("\n") && !ch.equals("\r");
		return ret;
	}
	
	private boolean isNumber(String ch) {
		int code = ch.codePointAt(0);
		return code >= 48 && code <= 57;
	}
	
	private String nextChar() {
		String ret;
		if(_ptr + 1 < _len) {
			ret = String.valueOf(_code.charAt(_ptr + 1));
		}else{
			ret = "";
		}
		return ret;
	}
}
