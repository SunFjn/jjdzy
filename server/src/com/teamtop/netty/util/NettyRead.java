package com.teamtop.netty.util;

import io.netty.buffer.ByteBuf;

import java.lang.reflect.InvocationTargetException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.netty.util.nettyCache.NettyCache;


public class NettyRead {
	private static final Logger log = LoggerFactory.getLogger(NettyRead.class);
	private static final String UTF8 = "utf-8";
	
	/**
	 * 通用的读取CG数据的方法
	 * @param data 客户端传来的数据,二进制数组
	 * @param cmdId 协议号
	 * @return 读取后的数据,以Object[]返回,用的时候需要强转换
	 */
	public static Object[] readData(ByteBuf buffer,int cmdId){
		Object[] fields = NettyCache.cmd2ProtocalMap.get(cmdId);
		if(fields==null)return null;
		if(fields.length==0){
			return new Object[0];
		}
		try {
			return read(fields, buffer);
		} catch (Exception e) {
			if(e instanceof IndexOutOfBoundsException){
				
			}
			log.error("读取CG数据异常,cmd:"+cmdId, e);
			return null;
		}
	}
	
	/**
	 * 读取(私有)
	 * @param proArr 协议数组
	 * @param dataArr 读取内容数组
	 */
	private static Object[] read(Object[] proArr, ByteBuf buffer) throws Exception{
		int proLen = proArr.length;
		Object[] result = new Object[proLen];
		Object proTemp = null;
		for (int i = 0; i < proLen; i++) {
			proTemp = proArr[i];
			readBuffer(proTemp, buffer, result, i);
		}
		return result;
	}
	
	/**
	 * 读取(在数组)
	 * @param proTempArr 协议数组
	 * @param input DataInputStream实例
	 * @return 读取到的数据
	 * @throws InvocationTargetException 
	 * @throws IllegalArgumentException 
	 * @throws IllegalAccessException 
	 * @throws NumberFormatException 
	 */
	private static Object[] readInSubArr(Object[] proTempArr, ByteBuf buffer) throws Exception {
			int dataLen = buffer.readShort();
			int proLen = proTempArr.length;
			Object[] result = new Object[dataLen];
			Object[] inData = null;
			Object proTemp=null;
			for(int i=0;i<dataLen;i++){
				inData = new Object[proLen];
				for(int m=0;m<proLen;m++){
					proTemp = proTempArr[m];
					readBuffer(proTemp, buffer, inData, m);
				}
				if(proLen==1){
					result[i] = inData[0];
				}else{
					result[i] = inData;
				}
			}
			return result;
	}
	
	//读取buffer值
	private static void readBuffer(final Object proTemp,
			final ByteBuf buffer,final Object[] inData,final int m) throws Exception{
		try{
			if(proTemp instanceof Object[]){
				inData[m] = readInSubArr((Object[])proTemp, buffer);
			}else{
//				if("B".equals(proTemp)){
//					inData[m] = buffer.readByte();
//				}else if("I".equals(proTemp)){
//					inData[m] = buffer.readInt();
//				}else if("L".equals(proTemp)){
//					inData[m] = buffer.readLong();
//				}else if("S".equals(proTemp)){
//					inData[m] = buffer.readShort();
//				}else if("U".equals(proTemp)){
//					short len = buffer.readShort();
//					byte[] dataByte = new byte[len];
//					buffer.readBytes(dataByte);
//					inData[m] = new String(dataByte,"utf-8");
//				}else{
//					//Num型
//					inData[m] = readNum(buffer);
//				}
				final int b = (Integer) proTemp;
				switch (b){
				case 1:
					//B
					inData[m] = buffer.readByte();
					break;
				case 2:
					//S
					inData[m] = buffer.readShort();
					break;
				case 3:
					//I
					inData[m] = buffer.readInt();
					break;
				case 4:
					//L
//					inData[m] = buffer.readLong();
					inData[m] = (long)buffer.readDouble();
					break;
				case 5:
					//U
					byte[] dataByte = new byte[buffer.readShort()];
					buffer.readBytes(dataByte);
					inData[m] = new String(dataByte,UTF8);
					break;
				case 6:
					//N
					inData[m] = readNum(buffer);
					break;
				}
			}
		}catch(Exception e){
			throw e;
		}
	}
	
	/**
	 * 读取Num型
	 * @param buffer ChannelBuffer对象
	 * @return 读取到的数据
	 */
	public static Object readNum(ByteBuf buffer){
		int type = buffer.readByte();
		Object result;
		if(type==1){
			result = buffer.readByte();
		}else if(type==2){
			result = buffer.readShort();
		}else{
			result = buffer.readInt();
		}
		return result;
	}
}
