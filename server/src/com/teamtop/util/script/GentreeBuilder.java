package com.teamtop.util.script;
import java.util.ArrayList;


public class GentreeBuilder {
	
	private int _ptr;
	private GentreeNode root;
	private ArrayList<Token> _tokens;
	private int _len;
	private Token _curToken;
	
	public GentreeNode build(ArrayList<Token> tokens) {
		_ptr = 0;
		_tokens = tokens;
		_len = _tokens.size();
		root = stmts();
		
		return root;
	}

	//语句序列
	private GentreeNode stmts() {
		GentreeNode t = GentreeNode.create(GentreeNode.STMTS, _curToken);
		if(_ptr < _len) {
			nextToken();
			while(_ptr < _len && _curToken.type != Token.K_RCBRACKET) {
				GentreeNode st = stmt();
				t.addChild(st);
			}
			if(_ptr < _len) match(Token.K_RCBRACKET);
		}
		return t;
	}
	
	//语句
	private GentreeNode stmt() {
		GentreeNode t = null;
		if(_curToken.type == Token.LOCAL) {//声明
			t = declare();
		}else if(_curToken.type == Token.IDENT) {
			t = exp();
		}else{
			throw new Error("undefined stmt-type ");
		}
		return t;
	}
	
	//声明变量
	private GentreeNode declare() {
		int type = GentreeNode.DECLARE;
		GentreeNode t = GentreeNode.create(type, _curToken);
		t.setValue(_curToken.src);
		match(_curToken.type);
		t.addChild(ident(102));
		if(_ptr < _len-1 && _curToken.type == Token.K_ASSIGN) {
			match(Token.K_ASSIGN);
			GentreeNode r = exp();
			t.addChild(r);
		}
		return t;
	}
	
	//引用 + 属性
	private GentreeNode ident(int type) {
		if(type == 0) type = 102;
		GentreeNode t = GentreeNode.create(type);
		GentreeNode c = null;
		t.token = _curToken;
		nextToken();
		if(_ptr < _len && _curToken.type == Token.K_DOT) {
			match(Token.K_DOT);
			c = GentreeNode.create(GentreeNode.PROP);
			t.addChild(c);
		}else if(_ptr < _len && _curToken.type == Token.K_LQBRACKET) {
			nextToken();
			c = GentreeNode.create(GentreeNode.INDEX);
			c.addChild(exp());
			match(Token.K_RQBRACKET);
			t.addChild(c);
		}
		return t;
	}
	
	//复合表达式
	private GentreeNode exp() {
		GentreeNode t = simple_exp();
		GentreeNode p = null;
		if(_ptr < _len) {
			if(_curToken.type == Token.K_ASSIGN) {
				p = GentreeNode.create(GentreeNode.STMT_ASSIGN);
				p.addChild(t);
				match(Token.K_ASSIGN);
				p.addChild(exp());
				t = p;
			}else if(_curToken.type == Token.K_LPAREN) {
				p = GentreeNode.create(GentreeNode.CALL);
				p.addChild(t);
				p.addChild(paramList());
				t = p;
			}
		}
		return t;
	}
	
	//简单表达式
	private GentreeNode simple_exp() {
		GentreeNode t = term();
		return t;
	}
	
	//项
	private GentreeNode term() {
		GentreeNode t = facter();
		return t;
	}
	
	//表达式因子
	private GentreeNode facter() {
		GentreeNode t = null;
		if(_curToken.type == Token.NUMBER) {
			t = GentreeNode.create(GentreeNode.CONST, _curToken);
			t.setValue(_curToken.src);
			match(Token.NUMBER);
		}else if(_curToken.type == Token.IDENT) {
			t = ident(102);
		}else if(_curToken.type == Token.K_LPAREN) {
			match(Token.K_LPAREN);
			t = exp();
			match(Token.K_RPAREN);
		}else if(_curToken.type == Token.STRING) {
			t = GentreeNode.create(GentreeNode.CONST, _curToken);
			t.setValue(_curToken.src);
			match(Token.STRING);
		}else if(_curToken.type == Token.K_LCBRACKET) {
			t = newTabel();
		}else if(_curToken.type == Token.K_LQBRACKET) {
			t = newArray();
		}else if(_curToken.type == Token.K_NULL) {
			t = nulll();
		}else if(_curToken.type == Token.K_TRUE) {
			t = truee();
		}else if(_curToken.type == Token.K_FALSE) {
			t = falsee();
		}else if(_curToken.type == Token.K_SUB) {
			t = GentreeNode.create(GentreeNode.INVERT);
			match(Token.K_SUB);
			t.addChild(exp());
		}else {
			throw new Error("错误的语句");
		}
		return t;
	}
	
	//函数参数
	private GentreeNode paramList() {
		GentreeNode t = GentreeNode.create(GentreeNode.PARAMS);
		match(Token.K_LPAREN);
		while(_curToken.type != Token.K_RPAREN && _ptr < _len) {
			t.addChild(exp());
			if(_curToken.type == Token.K_COMMA) match(Token.K_COMMA);
		}
		match(Token.K_RPAREN);
		return t;
	}
	
	//创建哈希表表
	private GentreeNode newTabel() {
		GentreeNode t = GentreeNode.create(GentreeNode.NEWTABEL);
		match(Token.K_LCBRACKET);
		while(_curToken.type != Token.K_RCBRACKET) {
			GentreeNode k = GentreeNode.create(GentreeNode.CONST, _curToken);
			k.setValue(_curToken.src);
			nextToken();
			match(Token.K_DDOT);
			GentreeNode v = exp();
			t.addChild(k);
			t.addChild(v);
			if(_curToken.type == Token.K_COMMA) {
				nextToken();
			}
		}
		match(Token.K_RCBRACKET);
		return t;
	}
	
	//null 表达式
	private GentreeNode nulll() {
		GentreeNode t = GentreeNode.create(GentreeNode.NULL);
		match(Token.K_NULL);
		return t;
	}
	
	//创建数组 表达式
	private GentreeNode newArray() {
		GentreeNode t = GentreeNode.create(GentreeNode.NEWARRAY);
		match(Token.K_LQBRACKET);
		while(_curToken.type != Token.K_RQBRACKET) {
			GentreeNode item = exp();
			t.addChild(item);
			if(_curToken.type == Token.K_COMMA) {
				nextToken();
			}
		}
		match(Token.K_RQBRACKET);
		return t;
	}
	
	private GentreeNode truee() {
		GentreeNode t = GentreeNode.create(GentreeNode.TRUE);
		match(Token.K_TRUE);
		return t;
	}
	
	private GentreeNode falsee() {
		GentreeNode t = GentreeNode.create(GentreeNode.FALSE);
		match(Token.K_FALSE);
		return t;
	}
	
	private void nextToken() {
		if(_ptr < _len) {
			_curToken = _tokens.get(_ptr++);
		}
	}
	
	private void match(int tokenType) {
		if(_curToken.type == tokenType) {
			nextToken();
		}else{
			throw new Error("没有找到匹配的tokenType:"+tokenType);
		}
	}
}
