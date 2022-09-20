package com.teamtop.cross.connEvent;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.hefu.HefuCrossFunction;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

/**
 * 子服连接上中央服事件处理类
 * @author lobbyer
 * @date 2016年6月21日
 */
public class CrossConnFunction {
	private static CrossConnFunction ins;
	public static CrossConnFunction getIns() {
		if(ins == null) {
			ins = new CrossConnFunction();
		}
		return ins;
	}
	/**
	 * 成功连接处理事件
	 * @author lobbyer
	 * @param channel
	 * @date 2016年6月21日
	 */
	public void connEvent(Channel channel) {
		//和服后的区 连接中央服的时候 检测那些系统需要处理和服数据
		HefuCrossFunction.getIns().hefuEffect(channel);
		//
		ConcurrentHashMap<Integer, CrossConnEvent[]> events = CrossConnCache.getEvents();
		for(Integer id:events.keySet()) {
			if(GameProperties.getFirstZoneId() != id) continue;
			CrossConnEvent[] event = events.get(id);
			try {
				if(event!=null){
					for(CrossConnEvent e:event){
						try {
							e.conn(channel);
						} catch (Exception e1) {
							LogTool.error(e1,this);
							
						}
					}
				}
			} catch (Exception e) {
				LogTool.error(e,this);
			}
		}
	}
}
