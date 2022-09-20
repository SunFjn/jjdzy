package com.teamtop.netty.util;

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.lang.reflect.Method;
import java.nio.charset.Charset;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.callback.Callback;
import com.teamtop.cross.callback.ListenerLogic;
import com.teamtop.forbid.ForbidCache;
import com.teamtop.netty.util.nettyCache.NettyCache;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.db.trans.LMessageFormat;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.zlib.ZipUtils;

import io.netty.channel.Channel;

public class NettyWrite {
	private static final Logger logger = LoggerFactory.getLogger(NettyWrite.class);
	public static void main(String[] args) {
		int anUnsignedShort = 65535;
		byte[] buf = new byte[2];
		buf[0] = (byte) ((anUnsignedShort & 0xFF00) >> 8);
		buf[1] = (byte) (anUnsignedShort & 0x00FF);
		
		int index = 0;
		int firstByte = (0x000000FF & buf[index]);
		int secondByte = (0x000000FF & buf[index+1]);
        index = index+2;
        int us =  firstByte << 8 | secondByte;
        System.err.println(us);
	}
	/**
	 * 发送无符号
	 * @param data
	 * @param output
	 * @throws IOException
	 */
	public static final void writeUnsignedShort(int data,DataOutputStream output) throws IOException{
		byte[] buf = new byte[2];
		buf[0] = (byte) ((data & 0xFF00) >> 8);
		buf[1] = (byte) (data & 0x00FF);
		output.write(buf);
		
	}
	/**
	 * 发送GC数据到客户端,统一在这里处理(connection)
	 * @param connection 连接
	 * @param data 要发送的数据
	 * @param cmdId 要发送的协议号
	 */
	public static final void writeData(final Channel channel,final Object[] data,final int cmdId){
		if(ForbidCache.validateCmd(cmdId)){
			logger.info("writeData but cmd is forbid,cmd:"+cmdId);
			return;
		}
		if(channel==null) return;
		ByteArrayOutputStream bos= null;
		DataOutputStream output= null;
		try {
			bos = new ByteArrayOutputStream();
			output = new DataOutputStream(bos);
			write(NettyCache.cmd2ProtocalMap.get(cmdId),data,cmdId,output);
			channel.write(bos.toByteArray());
		} catch (Exception e) {
			logger.error(LogTool.errmsg(e)+ "writeData cmd="+cmdId);
		} finally {
			try {
				if (output != null)
					output.close();
				if (bos != null)
					bos.close();
			} catch (IOException e) {
				logger.error("writeData cmd="+cmdId+" exception:",e);
			}
		}
	}
	public static final byte[] getByteArrDataWithCMD(final Object[] data,final int cmdId){
		ByteArrayOutputStream bos= null;
		DataOutputStream output= null;
		try {
			bos = new ByteArrayOutputStream();
			output = new DataOutputStream(bos);
			write(NettyCache.cmd2ProtocalMap.get(cmdId),data,cmdId,output);
			return bos.toByteArray();
		} catch (Exception e) {
			logger.error(LogTool.errmsg(e)+ "writeData cmd="+cmdId);
			return null;
		} finally {
			try {
				if (output != null)
					output.close();
				if (bos != null)
					bos.close();
			} catch (IOException e) {
				logger.error("writeData cmd="+cmdId+" exception:",e);
			}
		}
	}
	/**
	 * 发送X数据
	 * @param hid hid
	 * @param cmd cmd
	 * @param data 数据
	 */
	public static final void writeXData(final long hid,int cmd,final Object data){
		if(ForbidCache.validateCmd(cmd)){
			logger.info("writeData but cmd is forbid,cmd:"+cmd);
			return;
		}
		Hero hero = HeroCache.getHero(hid);
		if(hero==null || hero.getChannel()==null){
//			logger.warn("hero is null! channerl is null! hid is :"+hid);
			return;
		}
		writeXData(hero.getChannel(), cmd, LMessageFormat.write(data));
	}
	/**
	 * 发送X数据
	 * @param id hid
	 * @param cmd cmd
	 * @param data 数据
	 */
	public static final void writeXData(final Channel channel,int cmd,final Object data){
		if(ForbidCache.validateCmd(cmd)){
			logger.info("writeData but cmd is forbid,cmd:"+cmd);
			return;
		}
		writeXData(channel, cmd, LMessageFormat.write(data));
	}
	/**
	 * 发送X数据
	 * @param channel channel
	 * @param cmd cmd
	 * @param data 数据
	 */
	public static final void writeXData(final Channel channel,int cmd,final byte[] data){
		if(ForbidCache.validateCmd(cmd)){
			logger.info("writeData but cmd is forbid,cmd:"+cmd);
			return;
		}
		if(channel==null) return;
		ByteArrayOutputStream bos= null;
		DataOutputStream output= null;
		try {
			bos = new ByteArrayOutputStream();
			output = new DataOutputStream(bos);
//			output.writeShort(cmd);
			writeUnsignedShort(cmd, output);
			output.write(data);
			channel.write(bos.toByteArray());
		} catch (Exception e) {
			logger.error(LogTool.errmsg(e)+ "writeData cmd="+cmd+",channel:"+channel);
		} finally {
			try {
				if (output != null)
					output.close();
				if (bos != null)
					bos.close();
			} catch (IOException e) {
				logger.error("boradCast cmd="+cmd+" exception:",e);
			}
		}
	}
	public static final void writeData(final Channel channel,final byte[] data){
		channel.write(data);
	}
	/**
	 * 发送GC数据到客户端,统一在这里处理(Character Id)
	 * @param rid 角色ID
	 * @param data 要发送的数据
	 * @param cmdId 要发送的协议号
	 */
	public static final void writeData(final long hid,final Object[] data,final int cmdId){
		if(ForbidCache.validateCmd(cmdId)){
			logger.info("writeData but cmd is forbid,cmd:"+cmdId);
			return;
		}
		try {
//			long a = System.currentTimeMillis();
			writeData(HeroCache.getHero(hid).getChannel(),data,cmdId);
//			long b = System.currentTimeMillis();
//			logger.info("writeData:"+(b-a)+" ms");
		} catch (Exception e) {
			logger.error(LogTool.errmsg(e)+"hid:"+hid);
		}
	}
	
	/**
	 * 发送GC数据到客户端,统一在这里处理(Character Id)
	 * @param rid 角色ID
	 * @param data 要发送的数据
	 */
	public static final void writeData(final long hid,final Object[] data){
		try {
			HeroCache.getHero(hid).getChannel().write(data);
		} catch (Exception e) {
			logger.error(LogTool.errmsg(e)+"hid:"+hid);
		}
	}
	
	/**
	 * 发送num型数据
	 * @param data 某个数据
	 * @param buffer ChannelBuffer对象
	 * @throws IOException 
	 */
	public static final void writeNum(final Object data,final DataOutputStream output) throws IOException{
		long dataInt = Long.valueOf(data.toString());
		if(dataInt>Integer.MAX_VALUE ||dataInt<Integer.MAX_VALUE*-1){
			output.writeByte(4);
			output.writeLong(dataInt);
		}else if(dataInt>32767 ||dataInt<-32768){
			output.writeByte(3);
			output.writeInt((int)dataInt);
		}else if(dataInt>127||dataInt<-128){
			output.writeByte(2);
			output.writeShort((short)dataInt);
		}else{
			output.writeByte(1);
			output.writeByte((byte)dataInt);
		}
	}
	
	
	/**
	 * 发送(私有)
	 * @param proArr 协议数组
	 * @param dataArr 发送内容数组
	 * @throws Exception 
	 */
	private static final void write(final Object[] proArr, final Object[] dataArr,
			final int cmdId,final DataOutputStream output) throws Exception {
		int proLen = proArr.length;
//		output.writeShort(cmdId);
		writeUnsignedShort(cmdId, output);
		for (int i = 0; i < proLen /*&& dataArr != null && dataArr.length > 0*/; i++) {
			Object proTemp = proArr[i];
			Object dataTemp = dataArr[i];
			if (proTemp instanceof Object[]) {
				// 是数组
				writeInSubArr((Object[]) proTemp, (Object[]) dataTemp,output);
			}else if((Integer)proTemp==6){
				// 是数字类型
				writeNum(dataTemp, output);
			}else{
				// 是基本类型
				Method method = NettyCache.writeInvokeMethodMap.get(proTemp);
				if(dataTemp ==null && (Integer)proTemp==5){
					dataTemp = "";
				}
				method.invoke(output, dataTemp);
			}
		}
	}
	
	/**
	 * 发送数据(在数组)
	 * @param proTempArr 协议数组
	 * @param dataTempArr 内容数组
	 * @param output DataOutputStream实例
	 * @throws IOException 
	 */
	private static final void writeInSubArr(final Object[] proTempArr, 
			final Object[] dataTempArr,final DataOutputStream output) throws Exception {
		if(dataTempArr==null){
			output.writeShort(0);
			return;
		}
		Method method = null;
		int proTempArrLen = proTempArr.length; 
		int dataTempArrLen = dataTempArr.length;
		output.writeShort(dataTempArrLen);
		for (int j = 0; j < dataTempArrLen; j++) {
			Object[] dataArrCurrTemp = (Object[]) dataTempArr[j];
			for (int m = 0; m < proTempArrLen; m++) {
				Object proArrCurrTemp = proTempArr[m];
				Object dataEleInArr = dataArrCurrTemp[m];
				if (proArrCurrTemp instanceof Object[]) {
					writeInSubArr((Object[]) proArrCurrTemp, (Object[]) dataEleInArr,output);
				}else if((Integer)proArrCurrTemp==6){
					// 是数字类型
					writeNum(dataEleInArr, output);
				}else{
					// 是字符串
					method = NettyCache.writeInvokeMethodMap.get(proArrCurrTemp);
					method.invoke(output, dataEleInArr);
				}
			}
		}
	}
	/**
	 * 转换战斗数据
	 * @param data
	 * @param cmdId
	 * @return
	 */
	public static final byte[] transBattleVideoData(final Object[] data,final int cmdId){
		ByteArrayOutputStream bos= null;
		DataOutputStream output= null;
		try {
			bos = new ByteArrayOutputStream();
			output = new DataOutputStream(bos);
			write(NettyCache.cmd2ProtocalMap.get(cmdId),data,cmdId,output);
			return bos.toByteArray();
		} catch (Exception e) {
			logger.error(LogTool.errmsg(e)+ "writeData cmd="+cmdId);
			return null;
		} finally {
			try {
				if (output != null)
					output.close();
				if (bos != null)
					bos.close();
			} catch (IOException e) {
				logger.error("boradCast cmd="+cmdId+" exception:",e);
				return null;
			}
		}
	}
	/**
	 * 发送跨服普通数据
	 * @param channel 本服为A服，channel为B服，即A->B
	 * @param cmd 响应方法的cmd
	 * @param crossData 传输数据
	 */
	public static final void writeXData(final Channel channel,int cmd,final CrossData crossData){
		// writeXData(channel, cmd, CrossTrans.write(crossData, CrossData.class));
		String dataStr = JSON.toJSONString(crossData);
		byte[] datas = ZipUtils.compress(dataStr.getBytes(Charset.forName("utf-8")));
		writeXData(channel, cmd, datas);
	}
	/**
	 * 发送跨服数据(带有回调)
	 * @param channel 本服为A服，channel为B服，即A->B
	 * @param cmd 响应方法的cmd
	 * @param crossData 传输数据
	 * @param callback 回调接口实现类,内部自动维护，超过60分钟没有被回调会被移除,回调类的逻辑不阻塞
	 */
	public static void writeXData(Channel channel,int cmd,CrossData crossData,Callback callback){
		if (channel == null) {
			return;
		}
		ListenerLogic.addListener(callback);
		crossData.setCallbackCmd(callback.getCmd());
		NettyWrite.writeXData(channel, cmd, crossData);
	}
	/**
	 * 发送等待数据
	 * @param channel
	 * @param cmd
	 * @param hid
	 * @param crossData
	 * @return
	 */
	public static CrossData writeBlockData(Channel channel,int cmd,long hid,CrossData crossData){
		crossData.putObject(CrossEnum.hid, hid);
		return ListenerLogic.sendAndWait(channel, cmd, crossData);
	}
	/**
	 * 响应回调
	 * @param channel 本服为B服，channel为A服，即B->A
	 * @param crossData 传输数据
	 * @param callbackCmd 回调的cmd，由原始数据提供
	 */
	public static void writeCallbackData(Channel channel,CrossData crossData,int callbackCmd){
		crossData.setCallbackCmd(callbackCmd);
		NettyWrite.writeXData(channel, CrossConst.CMD_CALLBACK, crossData);
	}
	
	public static void writeBlockCallback(Channel channel,CrossData crossData,int callbackCmd){
		crossData.setCallbackCmd(callbackCmd);
		NettyWrite.writeXData(channel, CrossConst.CMD_BLOCK_CALLBACK, crossData);
	}
	/**
	 * 返回失败到请求的channel
	 * @param channel
	 * @param hid
	 * @param callbackCmd
	 */
	public static void rtnFailBlockCallback(Channel channel,long hid,int callbackCmd){
		CrossData crossData = new CrossData(CrossEnum.hid, hid);
		crossData.setCallbackCmd(callbackCmd);
		NettyWrite.writeXData(channel, CrossConst.CMD_BLOCK_CALLBACK, crossData);
	}
}
