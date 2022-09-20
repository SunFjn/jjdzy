package com.teamtop.houtaiHttp.events.bsh;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.ioUtil.IOUtil;
import com.teamtop.util.log.LogTool;

import bsh.Interpreter;
import io.netty.channel.Channel;

public class BshIO {

	private static BshIO ins;

	private static int zSize;

	public static String taskId = "BshIO-executor";

	private static Map<Integer, String> resultMap = new HashMap<>();

	private BshIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized BshIO getIns() {
		if (ins == null) {
			ins = new BshIO();
		}
		return ins;
	}

	public static int getzSize() {
		return zSize;
	}

	public static Map<Integer, String> getResultMap() {
		return resultMap;
	}

	/**
	 * 同步bsh指令到后台中央服
	 */
	public void syncBsh(Hero hero, List<Integer> zoneids, String commond) {
		try {
			resultMap.clear();
			zSize = zoneids.size();
			Channel channel = Client_1.getIns().getCrossChannel();
			CrossData crossData = new CrossData();
			crossData.putObject(BshCrossEnum.zoneids, zoneids);
			crossData.putObject(BshCrossEnum.commond, commond);
			NettyWrite.writeXData(channel, CrossConst.SYNC_BSH, crossData, new Callback() {

				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					int zoneid = crossData.getObject(BshCrossEnum.zoneid, Integer.class);
					String result = crossData.getObject(BshCrossEnum.ret, String.class);
					resultMap.put(zoneid, result);
					// NettyWrite.writeData(hero.getId(), new Object[] { "Bsh Handle Finish" },
					// HeroCmd.CG_NoticeMsg_164);
				}
			});
			ScheduleUtil.addTask(taskId, new BshSchedule(2000, 1000, hero.getId()));
		} catch (Exception e) {
			LogTool.error(e, BshIO.class, "BshIO syncBsh");
		}
	}

	/**
	 * 后台服接收测试服bsh信息
	 */
	public void recieveBsh(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.SYNC_BSH;
			Type type = new TypeReference<List<Integer>>() {
			}.getType();
			List<Integer> zoneids = crossData.getObject(BshCrossEnum.zoneids, type);
			String commond = crossData.getObject(BshCrossEnum.commond, String.class);
			int callbackCmd = crossData.getCallbackCmd();
			CrossData data = new CrossData();
			Channel backChannel = channel;
			data.putObject(BshCrossEnum.commond, commond);
			for (int zoneid : zoneids) {
				Channel gameChannel = CrossCache.getChannel(zoneid);
				data.putObject(BshCrossEnum.zoneid, zoneid);
				NettyWrite.writeXData(gameChannel, CrossConst.HANDLE_BSH, data, new Callback() {

					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						NettyWrite.writeCallbackData(backChannel, crossData, callbackCmd);
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, BshIO.class, "BshIO recieveBsh");
		}
	}

	/**
	 * 后台服通知子服执行bsh
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void handleBsh(Channel channel, CrossData crossData) {
		try {
			String commond = crossData.getObject(BshCrossEnum.commond, String.class);
			String ret = handle(commond);
			crossData.putObject(BshCrossEnum.ret, ret);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, BshIO.class, "BshIO handleBsh");
		}
	}

	public String handle(String commond) {
		try {
			if (commond == null) {
				return "";
			}
			commond = commond.trim();
			//
			Interpreter inter = new Interpreter();
			String ret = "";
			try {
				inter.eval("import java.*;");
				Object o = inter.eval(commond);
				if (o == null) {
					ret = "执行成功,返回 NULL";
				} else {
					ret += o.getClass().getSimpleName() + "\n";
					ret += o;
				}
			} catch (Exception e) {
				ret = exptToString(e);
				LogTool.error(e, "执行代码出错:" + commond);
			}
			return ret;
		} catch (Exception e) {
			LogTool.error(e, "bsh出错");
		}
		return "";
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
