package com.teamtop.houtaiHttp.events.hotSwap;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.management.ManagementFactory;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sun.tools.attach.VirtualMachine;
import com.teamtop.gameCommon.GamePath;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.redeploy.HotswapDao;
import com.teamtop.redeploy.HotswapRec;
import com.teamtop.redeploy.RedeployEnum;
import com.teamtop.redeploy.cross.RedeployLocalToCross;
import com.teamtop.util.common.CollectionUtil;
import com.teamtop.util.common.ZoneIDUtil;
import com.teamtop.util.excelHotswap.ExcelHotswapCache;
import com.teamtop.util.file.FileUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.ChannelHandlerContext;

/**
 * http://127.0.0.1:8802/?sign=e9048df90618272480e01f240024d8af&cmd=1003&randnum=1&type=3&zonelist=1_3,5
 * 热更
 * type  1:更新本地   2:更新指定区  3:获取更新指定区成功的区
 * 运维热更文件存放地址：svn://svn.xmxy.jjjjyyyyouxi.net/sgzj_game
 */
public class HotSwapHttpEvent extends AbsHouTaiHttpEvent {
	private static Logger logger = LoggerFactory.getLogger(HotSwapHttpEvent.class);
	private static HotSwapHttpEvent ins = null;

	public static HotSwapHttpEvent getIns() {
		if (ins == null) {
			ins = new HotSwapHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		String typeStr = paramMap.get("type");
		if(typeStr == null){
			HttpUtil.responseFail(ctx);
			return;
		}
		int type = Integer.parseInt(typeStr);
		if(type == 1){
			String hotswap = handleGet();
			HttpUtil.response(hotswap, ctx);
		}else if(type == 2){
			String zonelistStr = paramMap.get(RedeployEnum.zonelist.name());
			String pf = paramMap.get(RedeployEnum.pf.name());
			List<Integer> zidList = ZoneIDUtil.getzidListByStr(zonelistStr);
			boolean success = RedeployLocalToCross.hotSwapByZIDListLC(zidList, pf);
			if(success){
				HttpUtil.response("Server9999：热更指令发送成功", ctx);
				HotSwapFunction.initZIDHotSwapMsg();
			}else{
				HttpUtil.response("Server9999：热更其他正式服报错", ctx);
			}
		}else if(type == 3){
			String zidSuccessResult = HotSwapFunction.getZIDSuccessResult();
			HttpUtil.response("Server9999： "+zidSuccessResult, ctx);
		}else{
			HttpUtil.response("Server9999：没有类型"+type, ctx);
		}
	}

	public static String handleGet() {
		String hotswap = null;
		BufferedReader br = null;
		try {
			String path = GameProperties.hotswapDir;
			String baseStr = path;
			File file = new File(baseStr + File.separator + "newfile" + File.separator + "info.txt");
			br = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
			StringBuilder sb = new StringBuilder();
			String content = null;
			sb.append(baseStr + File.separator + "newfile");
			while ((content = br.readLine()) != null) {
				sb.append("#");
				sb.append(content);
			}
			hotswap = hotswap(sb.toString());
			replaceClass(sb.toString());// 替换class
			resetConfig(sb.toString());// excel文件重置和修改缓存
			br.close();
			
			File descfile = new File(baseStr + File.separator + "newfile" + File.separator + "desc.txt");
			StringBuilder descsb = new StringBuilder();
			br = new BufferedReader(new InputStreamReader(new FileInputStream(descfile)));
			while ((content = br.readLine()) != null) {
				descsb.append(content);
			}
			HotswapRec rec = new HotswapRec(TimeDateUtil.getCurrentTime(), descsb.toString(), sb.toString());
			HotswapDao.getIns().insert(rec, GameProperties.getFirstZoneId());
		} catch (Exception e) {
			LogTool.error(e,HotSwapHttpEvent.class);
		} finally {
			if (br != null)
				try {
					br.close();
				} catch (IOException e) {
					hotswap = "br close err";
				}
		}
		return hotswap;
	}

	public static String hotswap(String content) {
		try {
			// 执行热更
			String name = ManagementFactory.getRuntimeMXBean().getName();
			// get pid
			String pid = name.split("@")[0];
			VirtualMachine vm = VirtualMachine.attach(pid);
			logger.info("attach finish,content:"+content);
			vm.loadAgent(GamePath.USER_DIR + File.separator + "lib" + File.separator + "agent.jar", content);
			vm.detach();
			System.err.println("attach finish");
		} catch (Exception e) {
			final StringWriter sw = new StringWriter();
			final PrintWriter pw = new PrintWriter(sw);
			e.printStackTrace(pw);
			String exception = sw.toString();
			logger.error(exception);
			return "attach err," + exception;
		}
		return "attach finish";
	}

	private static void resetConfig(String content) throws Exception {
		String[] split = content.split("#");
		HashMap<String, List<Method>> hotswapMap = ExcelHotswapCache.getHotswapMap();
		for (int i = 1; i < split.length; i++) {
			String className = split[i];
			if (className.indexOf("excel.config") == 0 || className.indexOf("excel.struct") == 0) {
				Class<?> clazz = Class.forName(className);
				Method method = clazz.getMethod("reset");
				Method insMethod = clazz.getMethod("getIns");
				Object ins = insMethod.invoke(null);
				method.invoke(ins);

				// 修改相关的缓存
				List<Method> list = hotswapMap.get(className);
				if (!CollectionUtil.isEmpty(list)) {
					for (Method m : list) {
						m.invoke(m.getDeclaringClass().newInstance());
					}
				}
			}
		}
	}

	private static void replaceClass(String content) {
		String[] split = content.split("#");
		String base = split[0];
		for (int i = 1; i < split.length; i++) {
			String className = split[i];
			className = className.replace(".", File.separator) + ".class";
			File file = new File(base + File.separator + className);
			FileUtils.copyFile(file.getAbsolutePath(), GamePath.USER_DIR + File.separator + "bin" + File.separator + className);
		}
	}

}
