package com.teamtop.houtaiHttp.events.bsh;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.util.ioUtil.IOUtil;
import com.teamtop.util.log.LogTool;

import bsh.Interpreter;
import io.netty.channel.ChannelHandlerContext;

public class BshHttpEvent extends AbsHouTaiHttpEvent {

	private static BshHttpEvent ins;

	private BshHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized BshHttpEvent getIns() {
		if (ins == null) {
			ins = new BshHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String code = paramMap.get("code");
			if (code == null) {
				HttpUtil.responseFail(ctx);
				return;
			}
			code = code.trim();
			//
			Interpreter inter = new Interpreter();
			String ret = "";
			try {
				inter.eval("import java.*;");
				Object o = inter.eval(code);
				if (o == null) {
					ret = "执行成功,返回 NULL";
				} else {
					ret += o.getClass().getSimpleName() + "\n";
					ret += o;
				}
			} catch (Exception e) {
				ret = exptToString(e);
				LogTool.error(e, "执行代码出错:" + code);
			}
			HttpUtil.response(ret, ctx);
		} catch (Exception e) {
			LogTool.error(e, "bsh出错");
		}
	}

	/**
	 * 返回该异常的堆栈字符串信息
	 * 
	 * @param e
	 * @return
	 */
	public static String exptToString(Exception e) {
		ByteArrayOutputStream baos = null;
		PrintStream ps = null;
		try {
			baos = new ByteArrayOutputStream();
			ps = new PrintStream(baos);

			e.printStackTrace(ps);
		} catch (Exception e1) {
			return e1.toString();
		} finally {
			IOUtil.close(baos);
			IOUtil.close(ps);
		}

		return new String(baos.toByteArray());
	}

}
