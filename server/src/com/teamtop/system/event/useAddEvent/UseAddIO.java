package com.teamtop.system.event.useAddEvent;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.db.trans.crossTrans.CrossTrans;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

/**
 * 中央服想增加使用东西，在子服操作
 * @author Administrator
 *
 */
public class UseAddIO {

	private static UseAddIO ins = null;

	public static UseAddIO getIns() {
		if (ins == null) {
			ins = new UseAddIO();
		}
		return ins;
	}

	private Logger logger = LoggerFactory.getLogger(UseAddIO.class);
	
	/**
	 * 询问子服能否使用
	 * @param channel
	 * @param data
	 */
	public void askLocalCanUse(Channel channel,CrossData data){
		logger.info("ask local canUse,data:"+data.getMap());
		try {
			long hid = (long) data.getObject(CrossEnum.hid, Long.class);
			Hero hero = HeroCache.getHero(hid);
			int[][] d = (int[][]) data.getObject(UseAddCrossEnum.data, int[][].class);
			boolean canUse = UseAddUtil.canUse(hero, d);
			data.finishGet();
			data.putObject(UseAddCrossEnum.rtn, canUse);
			NettyWrite.writeBlockCallback(channel, data, data.getCallbackCmd());
		} catch (Exception e) {
			NettyWrite.writeBlockCallback(channel, new CrossData(UseAddCrossEnum.rtn, false), data.getCallbackCmd());
			logger.error(LogTool.exception(e));
		}
	}
	/**
	 * 让子服使用
	 * @param channel
	 * @param data
	 */
	public void askLocalUse(Channel channel,CrossData data){
		logger.info("ask local use,data:"+data.getMap());
		try {
			long hid = (long) data.getObject(CrossEnum.hid, Long.class);
			Hero hero = HeroCache.getHero(hid);
			int[][] d = (int[][]) data.getObject(UseAddCrossEnum.data, int[][].class);
//			logger.info("ask local use,d:"+Arrays.deepToString(d));
			int reason = (int) data.getObject(UseAddCrossEnum.reason, Integer.class);
			UseAddUtil.use(hero, d, reason, false);
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}
	}
	/**
	 * 询问子服能否添加
	 * @param channel
	 * @param data
	 */
	public void askLocalCanAdd(Channel channel,CrossData data){
		logger.info("ask local canAdd,data:"+data.getMap());
		try {
			long hid = (long) data.getObject(CrossEnum.hid, Long.class);
			boolean sendmail = (boolean) data.getObject(UseAddCrossEnum.sendmail, Boolean.class);
			Hero hero = HeroCache.getHero(hid);
			int[][] d = (int[][]) data.getObject(UseAddCrossEnum.data, int[][].class);
			boolean canAdd = UseAddUtil.canAdd(hero, d, sendmail);
			data.finishGet();
			data.putObject(UseAddCrossEnum.rtn, canAdd);
			NettyWrite.writeBlockCallback(channel, data, data.getCallbackCmd());
		} catch (Exception e) {
			NettyWrite.writeBlockCallback(channel, new CrossData(UseAddCrossEnum.rtn, false), data.getCallbackCmd());
			logger.error(LogTool.exception(e));
		}
	}
	/**
	 * 让子服添加
	 * @param channel
	 * @param data
	 */
	public void askLocalAdd(Channel channel,CrossData data){
		int cmd = CrossConst.ASK_LOCAL_ADD;
		logger.info("ask local add,data:"+data.getMap());
		try {
			long hid = (long) data.getObject(CrossEnum.hid, Long.class);
			int reason = (int) data.getObject(UseAddCrossEnum.reason, Integer.class);
			boolean sendmail = (boolean) data.getObject(UseAddCrossEnum.sendmail, Boolean.class);
			boolean notice = (boolean) data.getObject(UseAddCrossEnum.notice, Boolean.class);
			Hero hero = HeroCache.getHero(hid);
			int[][] d = (int[][]) data.getObject(UseAddCrossEnum.data, int[][].class);
//			logger.info("ask local add,d:"+Arrays.deepToString(d));
			UseAddUtil.add(hero, d, reason, sendmail?UseAddUtil.getDefaultMail():null, notice);
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}
	}
	public void npcDrop(Channel channel,CrossData data){/*
		logger.info("npcDrop,data:"+data.getMap());
		try {
			long hid = (long) data.get(CrossEnum.hid);
			int reason = (int) data.get(UseAddCrossEnum.reason);
			int npcSysId = (int) data.get(UseAddCrossEnum.npcSysId);
			int bindControl = (int) data.get(UseAddCrossEnum.bindControl);
			boolean sendmail = (boolean) data.get(UseAddCrossEnum.sendmail);
			boolean addInMethod = (boolean) data.get(UseAddCrossEnum.addInMethod);
			Hero hero = HeroCache.getHero(hid);
			Object rtn = NPCFunction.getIns().handleNPCDrop(hero, npcSysId, sendmail?UseAddUtil.getDefaultMail():null, reason, addInMethod, false,bindControl);
			if(rtn!=null && rtn.getClass().isArray()){
				Object[] arr = (Object[]) rtn;
				int[][] intarr = new int[arr.length][];
				for(int i=0;i<arr.length;i++){
					intarr[i] = (int[]) arr[i];
				}
				rtn = intarr;
			}
			data.put(UseAddCrossEnum.rtn, rtn);
			NettyWrite.writeBlockCallback(channel, data, data.getCallbackCmd());
		} catch (Exception e) {
			NettyWrite.writeBlockCallback(channel, new CrossData(UseAddCrossEnum.rtn, false), data.getCallbackCmd());
			logger.error(LogTool.exception(e));
		}
	*/}
	public static void main(String[] args) {
		List<int[]> list = new ArrayList<int[]>();
		for(int i=0;i<5;i++){
			list.add(new int[]{i,i+10,i+20});
		}
		int[][] arr = new int[list.size()][];
		for(int i=0;i<list.size();i++){
			arr[i] = list.get(i);
		}
		
		/*Object[] array = list.toArray();
		byte[] write = LMessageFormat.write(array);
		Object read = LMessageFormat.read(write);
		System.err.println(read);
		
		List<int[]> ll = new ArrayList<int[]>();
		List<Object> arr = (List<Object>) read;
		for(Object a:arr){
			List<Integer> lll = (List<Integer>) a;
		}*/
		CrossData crossData = new CrossData();
		crossData.putObject(UseAddCrossEnum.rtn, arr);
		byte[] write = CrossTrans.write(crossData, crossData.getClass());
		CrossData read = CrossTrans.read(write, CrossData.class);
		int[][] rtn = read.getObject(UseAddCrossEnum.rtn, int[][].class);
		System.err.println(rtn);
		
		list.clear();
		
		int[][] reward = (int[][]) rtn;
		for(int[] ii:reward){
			list.add(ii);
		}
		Object[] array = list.toArray();
	}
}
