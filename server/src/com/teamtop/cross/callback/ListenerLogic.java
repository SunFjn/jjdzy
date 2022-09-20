package com.teamtop.cross.callback;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class ListenerLogic {
	/**
	 * 回调监听缓存
	 */
	private static Map<Integer, Callback> listenerMap = new ConcurrentHashMap<Integer, Callback>();
	private static Map<Integer, ResponseFuture> futureTaskMap = new ConcurrentHashMap<Integer, ResponseFuture>();
	/**
	 * callback的cmd产生源
	 */
	private static AtomicInteger ai = new AtomicInteger();
	private static  Logger logger = LoggerFactory.getLogger(ListenerLogic.class);
	/**
	 * 收到数据后回调
	 * @param callbackCmd 回调对象的cmd
	 * @param data 数据
	 */
	public static void dispatch(Channel channel,int callbackCmd,CrossData crossData){
		//System.err.println("dispatch now,listenerMap size:"+listenerMap.size());
		Callback callback = listenerMap.remove(callbackCmd);
		if(callback==null){
			System.err.println("reci data,but callback is null,cmd:"+callbackCmd +" size:"+listenerMap.size());
			return;
		}
		System.err.println("find callback[cmd:"+callback.getCmd()+",deadTime:"+TimeDateUtil.printTime(callback.getDeadTime())+"] size:"+listenerMap.size());
		callback.dataReci(channel,crossData);
	}
	/**
	 * 回调对象加入监听缓存
	 * @param callback
	 */
	public static synchronized void addListener(Callback callback){
		if(ai.get()==Short.MAX_VALUE){
			ai.set(0);
		}
		int cmd = ai.getAndIncrement();
		callback.setCmd(cmd);
		callback.setDeadTime(TimeDateUtil.getCurrentTime()+3600);//默认超时1小时
		listenerMap.put(cmd, callback);
		if(listenerMap.size()>=500){
			//监听缓存大于500时检测超时callback对象
			removeBadCallback();
		}
	}
	/**
	 * 移除超时的callback
	 */
	private static void removeBadCallback(){
		Iterator<Entry<Integer, Callback>> it = listenerMap.entrySet().iterator();
		int now = TimeDateUtil.getCurrentTime();
		while(it.hasNext()){
			Entry<Integer, Callback> next = it.next();
			Callback value = next.getValue();
			if(now>value.getDeadTime()){
				LogTool.info("detec bad callback and remove,cmd:"+value.getCmd()+",time:"+TimeDateUtil.printTime(value.getDeadTime()), ListenerLogic.class);
				it.remove();
			}
		}
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static void receiveBlockData(int cmd,CrossData crossData){
		ResponseFuture responseFuture = futureTaskMap.remove(cmd);
		if(responseFuture!=null){
			responseFuture.set(crossData);
		}
	}
	
	@SuppressWarnings("rawtypes")
	public static CrossData sendAndWait(Channel channel,int cmd,CrossData crossData){
		int callbackcmd = ai.getAndIncrement();
		ResponseFuture responseFuture = new ResponseFuture();
		futureTaskMap.put(callbackcmd, responseFuture);
		try {
			// 等待messageReceived
			crossData.setCallbackCmd(callbackcmd);
//			BlockCallbackFunction.addToPending(new BlockData(channel, cmd,crossData));
			NettyWrite.writeXData(channel, cmd, crossData);
			CrossData response = (CrossData) responseFuture.get(10000, TimeUnit.MILLISECONDS);
			return response;
		} catch (Exception e) {
			logger.error("", e);
			return null;
		} finally {
			if (responseFuture != null) {
				responseFuture.cancel(false);
			}
		}
	}
}
