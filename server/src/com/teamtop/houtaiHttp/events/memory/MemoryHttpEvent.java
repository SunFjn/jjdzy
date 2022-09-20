package com.teamtop.houtaiHttp.events.memory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.management.GarbageCollectorMXBean;
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.TimeZone;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.json.JsonUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mybatis.MybatisUtil;

import io.netty.channel.ChannelHandlerContext;
/**
 * 系统的内存分析数据
 * @author kyle
 *
 */
public class MemoryHttpEvent extends AbsHouTaiHttpEvent {
	private static MemoryHttpEvent ins = null;
	
	public static MemoryHttpEvent getIns(){
		if(ins == null){
			ins = new MemoryHttpEvent();
		}
		return ins;
	}
	Logger logger = LoggerFactory.getLogger(MemoryHttpEvent.class);
	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			int type = Integer.parseInt(paramMap.get("sysInfoType"));
			if (type==0) {
				Runtime runtime = Runtime.getRuntime();
				long totalMemory = runtime.totalMemory();
				long freeMemory = runtime.freeMemory();
				int availableProcessors = runtime.availableProcessors();
				long maxMemory = runtime.maxMemory();
				String cpu = getCpu();
				MemoryInfo memoryInfo = new MemoryInfo(totalMemory, freeMemory, availableProcessors, maxMemory,
						(totalMemory - freeMemory), cpu);
				String jsonEncode = JsonUtils.toStr(memoryInfo);
				HttpUtil.response(jsonEncode, ctx);
			} else {

			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
			HttpUtil.responseFail(ctx);
		}
	}

	public static String getSystemInfo() {
		ThreadGroup group = Thread.currentThread().getThreadGroup();
		ThreadGroup topGroup = group;
		// 遍历线程组树，获取根线程组
		while (group != null) {
			topGroup = group;
			group = group.getParent();
		}

		// int estimatedSize = topGroup.activeCount() * 2;
		// Thread[] slackList = new Thread[estimatedSize];
		// // 获取根线程组的所有线程
		// int actualSize = topGroup.enumerate(slackList);
		// // copy into a list that is the exact size
		// Thread[] list = new Thread[actualSize];
		// System.arraycopy(slackList, 0, list, 0, actualSize);

		Runtime runtime = Runtime.getRuntime();

		long usedMemory = runtime.totalMemory() - runtime.freeMemory();
		Mbeans.obtain();

		String info = CommonUtil.safeFormat(
				"\r\n" + "================================================================== \r\n"//
						+ "当前时区:%s\r\n" + "当前时间:%s\r\n" //
						+ "------------------------------------------------------------------ \r\n" //
						+ "虚拟机可用处理器:%s\r\n" + "当前的活动线程总数:%s 线程组总数:%s \r\n"//
						+ "虚拟机可用最大内存:%s K = %s M \r\n" + "虚拟机占用总内存:%s K = %s M \r\n" //
						+ "虚拟机空闲内存:%s K = %s M \r\n" + "当前使用内存:%s K = %s M \r\n"//
						+ "GC总次数:%s次  总耗时:%s毫秒   上次记录间隔%s毫秒 GC:%s次 耗时:%s毫秒 \r\n" //
						+ "ObjectPendingFinalizationCount:%s \r\n" + "heapMemoryUsage:%s \r\n" //
						+ "nonHeapMemoryUsage:%s \r\n"//
						+ "------------------------------------------------------------------ \r\n" //
						+ "游戏服ID:%s \r\n" + "数据库:%s \r\n" //
						+ "游戏服版本:\r\n%s \r\n", //
				TimeZone.getDefault().getDisplayName() + " " + TimeZone.getDefault().getID(),
				(new SimpleDateFormat("yyyy年MM月dd日 hh:mm:ss")).format(new Date()), runtime.availableProcessors(),
				topGroup.activeCount(), topGroup.activeGroupCount(), runtime.maxMemory() / 1024,
				runtime.maxMemory() / 1024 / 1024, runtime.totalMemory() / 1024, runtime.totalMemory() / 1024 / 1024,
				runtime.freeMemory() / 1024, runtime.freeMemory() / 1024 / 1024, usedMemory / 1024,
				usedMemory / 1024 / 1024, Mbeans.currObtain.gcCounts, Mbeans.currObtain.gcTimes,
				Mbeans.currObtain.obtainTime - Mbeans.lastObtain.obtainTime,
				Mbeans.currObtain.gcCounts - Mbeans.lastObtain.gcCounts,
				Mbeans.currObtain.gcTimes - Mbeans.lastObtain.gcTimes, Mbeans.currObtain.getFinallzationCount,
				Mbeans.currObtain.heapMemoryUsage, Mbeans.currObtain.nonHeapMemoryUsage,
				// ----------
				GameProperties.getFirstZoneId(), MybatisUtil.getInfo(), 0);

		return info;
	}
	
	public static String getip(){
		InetAddress addr;
		String ip = null;
		try {
			addr = InetAddress.getLocalHost();
			ip = addr.getHostAddress().toString();
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
		System.err.println("ip："+ip);
		return ip;
	}
	public static String getCpu(){
		String result = null;
		InputStream is = null;
		InputStreamReader reader = null;
		BufferedReader br = null;
		try {
			System.err.println("start get cpu");
			Process pro = Runtime.getRuntime().exec("jps");
			is = pro.getInputStream();
			System.err.println("is len:"+is.available());
			reader = new InputStreamReader(is);
			br = new BufferedReader(reader);
			
			String line = null;
			boolean isFirst = true;
			StringBuilder sb = new StringBuilder();
			while((line=br.readLine())!=null){
				if(line.indexOf("RunLocalServer")>=0){
					String pid = line.split("\\s")[0];
					System.err.println("find java:"+pid);
					if(isFirst){
						isFirst = false;
					}else{
						sb.append(",");
					}
					sb.append(pid);
				}
			}
			if(br!=null){
				br.close();
			}
			if(reader!=null){
				reader.close();
			}
			if(is!=null){
				is.close();
			}
			System.err.println("sb:"+sb.toString());
			if(sb.length()>0){
				String cmd = "top -b -n 1 -p "+sb.toString();
				System.err.println("cmd:"+cmd);
				Process exec = Runtime.getRuntime().exec(cmd);
				BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(exec.getInputStream()));
				String topLine = null;
				boolean topFirst = true;
				StringBuilder topSb = new StringBuilder();
				while((topLine=bufferedReader.readLine())!=null){
					if(topLine.length()<5){
						continue;
					}
					if(topFirst){
						topFirst = false;
					}else{
						topSb.append("##");
					}
					topSb.append(topLine);
				}
				result = topSb.toString();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}

	private static class Mbeans {
		public static Mbeans lastObtain = null;
		public static Mbeans currObtain = null;

		public long obtainTime = 0;
		public long gcCounts = 0;
		public long gcTimes = 0;
		public long getFinallzationCount;
		public String heapMemoryUsage;
		public String nonHeapMemoryUsage;

		public static Mbeans obtain() {
			lastObtain = currObtain;
			currObtain = new Mbeans();
			if (lastObtain == null)
				lastObtain = currObtain;

			currObtain.obtainTime = System.currentTimeMillis();

			for (final GarbageCollectorMXBean garbageCollector : ManagementFactory.getGarbageCollectorMXBeans()) {
				currObtain.gcCounts += garbageCollector.getCollectionCount();
			}

			for (final GarbageCollectorMXBean garbageCollector : ManagementFactory.getGarbageCollectorMXBeans()) {
				currObtain.gcTimes += garbageCollector.getCollectionTime();
			}

			MemoryMXBean memoryMXBean = ManagementFactory.getMemoryMXBean();
			currObtain.getFinallzationCount = memoryMXBean.getObjectPendingFinalizationCount();
			currObtain.heapMemoryUsage = memoryMXBean.getHeapMemoryUsage().toString();
			currObtain.nonHeapMemoryUsage = memoryMXBean.getNonHeapMemoryUsage().toString();

			return currObtain;
		}
	}

}

class MemoryInfo{
	//提交的内存
	private long totalMemory;
	//剩余内存
	private long freeMemory;
	//cpu个数
	private int availableProcessors;
	//最大堆大小
	private long maxMemory;
	//当前堆大小
	private long useMemory;
	private String cpu;
	public long getTotalMemory() {
		return totalMemory;
	}
	public void setTotalMemory(long totalMemory) {
		this.totalMemory = totalMemory;
	}
	public long getFreeMemory() {
		return freeMemory;
	}
	public void setFreeMemory(long freeMemory) {
		this.freeMemory = freeMemory;
	}
	public int getAvailableProcessors() {
		return availableProcessors;
	}
	public void setAvailableProcessors(int availableProcessors) {
		this.availableProcessors = availableProcessors;
	}
	public long getMaxMemory() {
		return maxMemory;
	}
	public void setMaxMemory(long maxMemory) {
		this.maxMemory = maxMemory;
	}
	
	public String getCpu() {
		return cpu;
	}
	public void setCpu(String cpu) {
		this.cpu = cpu;
	}
	public MemoryInfo(long totalMemory, long freeMemory, int availableProcessors, long maxMemory, long useMemory,String cpu) {
		super();
		this.totalMemory = totalMemory;
		this.freeMemory = freeMemory;
		this.availableProcessors = availableProcessors;
		this.maxMemory = maxMemory;
		this.useMemory = useMemory;
		this.cpu = cpu;
	}
	public MemoryInfo() {
		super();
	}
	public long getUseMemory() {
		return useMemory;
	}
	public void setUseMemory(long useMemory) {
		this.useMemory = useMemory;
	}
	
}
