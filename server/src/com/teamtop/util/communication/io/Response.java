package com.teamtop.util.communication.io;

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.communication.io.protocol.ProtocolAssist;


/**
 * 协议响应对象
 * @author syp
 *
 */
public class Response {

	private static Logger log = LoggerFactory.getLogger(Response.class);
	
	public final static int NULL_FLAG = Integer.MIN_VALUE;
	
	/**
	 * 协议成功或失败标识
	 */
	private int flag = Integer.MIN_VALUE;
	
	/**
	 * 协议流水号
	 */
	private int cmd;
	
	private Object result;

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}
	
	public int getCmd() {
		return cmd;
	}

	public void setCmd(int cmd) {
		this.cmd = cmd;
	}

	public Object getResult() {
		return result;
	}

	public void setResult(Object result) {
		this.result = result;
	}
	
	/**
	 * 根据数据类型写入输出流
	 * @param data
	 * @param output
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	private void writeInType(Object data, DataOutputStream output)
			throws Exception {
		if(data == null){
			return ;
		}
		if (data instanceof Byte) {
			output.writeByte((Byte) data);
		} else if (data instanceof byte[]) {
			output.write((byte[]) data);
		} else if (data instanceof Short) {
			output.writeShort((Short) data);
		} else if (data instanceof Integer) {
			output.writeInt((Integer) data);
		} else if (data instanceof Long) {
			output.writeLong((Long) data);
		} else if (data instanceof Float) {
			output.writeFloat((Float) data);
		} else if (data instanceof Double) {
			output.writeDouble((Double) data);
		} else if (data instanceof String) {
			output.writeUTF((String) data);
		} else if (data instanceof Boolean) {
			output.writeBoolean((Boolean) data);
		} else if (data instanceof Object[]) {
			Object[] arr = (Object[])data;
			if(arr[0] instanceof Object[]){
				//一维数组不需要写入长度
				output.writeShort(arr.length);
			}
			for(Object obj : arr){
				writeInType(obj,output);
			}
		} else{
			if(List.class.isAssignableFrom(data.getClass())){
				List list = (List)data;
				output.writeShort(list.size());
				for(Object obj : list){
					writeInType(obj,output);
				}
			}else if(ProtocolAssist.class.isAssignableFrom(data.getClass())){
				Field[] fields = data.getClass().getDeclaredFields();
				if(fields != null && fields.length > 0){
					Map<String,Field> fieldsMap = new HashMap<String,Field>();
					for(Field field : fields){
						fieldsMap.put(field.getName(), field);
					}
					String[] fieldNames = ((ProtocolAssist)data).sortFieldsName();
					for(String fieldName : fieldNames){
						Field field = fieldsMap.get(fieldName);
						writeInType(field.get(data),output);
					}
				}
			} else {
				throw new Exception("toByteArray no exist type");
			}
			
		}
	}

	/**
	 * 以字节返回response对象内容
	 * @return
	 */
	public byte[] toByteArray(){
		
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		DataOutputStream output = new DataOutputStream(bos); 
		byte[] bytes = null;
		try{
			output.writeShort(getCmd()); //协议流水号
			if(getFlag() != Integer.MIN_VALUE){
				output.writeByte(getFlag()); //协议成功或失败标识
			}
			writeInType(getResult(), output);
			bytes = bos.toByteArray();
			bos.close();
			output.close();
		}catch(Exception e){
			log.error("[cmd:" + getCmd() + "]Response.toByteArray() Error",e);
		}
		return bytes;
	}
	
	
}
