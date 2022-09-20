package com.teamtop.util.db.trans;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.log.LogTool;


public class LMessageFormat {
	private static Logger logger = LoggerFactory.getLogger(LMessageFormat.class);
	public static final byte NULL = 0;
	private static final byte TYPE_NULL = 0;
	private static final byte TYPE_BYTE = 1;
	private static final byte TYPE_SHORT = 4;
	private static final byte TYPE_INT = 2;
	private static final byte TYPE_LONG = 3;
	private static final byte TYPE_BOOLEAN = 6;
	private static final byte TYPE_STRING = 20;
	private static final byte TYPE_ARR = 30;
	private static final byte TYPE_LIST = 30;
	private static final byte TYPE_MAP_KEY_BYTE = 41;//map key类型：byte
	private static final byte TYPE_MAP_KEY_SHORT = 10;//map key类型：short
	private static final byte TYPE_MAP_KEY_INT = 11;//map key类型：int
	private static final byte TYPE_MAP_KEY_LONG = 12;//map key类型：long
	private static final byte TYPE_MAP_KEY_STR = 40;//map key类型：utf
	
	public static void main(String[] args) {
		/*SendDataMap sendDataMap = new SendDataMap();
		sendDataMap.put(1, 1);
		sendDataMap.put(2, 1);
		sendDataMap.put(3, 1);
		sendDataMap.put(4, 1);
		
		byte[] write = write(sendDataMap);
		Object read = read(write);
		System.err.println(read);*/
		
		read("E:\\teamtop\\YT2\\30010002.mcf");
	}
	public static byte[] write(Object obj) {
		ByteArrayOutputStream bos = null;
		DataOutputStream out = null;
		try {
			bos = new ByteArrayOutputStream();
			out = new DataOutputStream(bos);
			toByteArr(obj,  out);
			return bos.toByteArray();
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
			return null;
		} finally {
			try {
				if (out != null) {
					out.close();
				}
				if (bos != null) {
					bos.close();
				}
			} catch (IOException e) {
				logger.error(LogTool.exception(e));
			}
		}
	}

	private static void toByteArr(Object obj, DataOutputStream out) throws Exception {
		if (obj == null) {
			out.writeByte(TYPE_NULL);
		} else {
			if(obj instanceof Integer){ 
				out.writeByte(TYPE_INT);
				out.writeInt(Integer.parseInt(obj.toString()));
			}else if(obj instanceof Long){
				out.writeByte(TYPE_LONG);
				out.writeUTF(obj.toString());
//				out.writeLong(Long.parseLong(obj.toString()));//泽濡说前端不读Long，只读UTF
			}else if(obj instanceof Short){
				out.writeByte(TYPE_SHORT);
				out.writeShort(Short.parseShort(obj.toString()));
			}else if(obj instanceof Byte){
				out.writeByte(TYPE_BYTE);
				out.writeByte(Byte.parseByte(obj.toString()));
			}
			/*if (obj instanceof Integer || obj instanceof Long || obj instanceof Short || obj instanceof Byte) {
				writeNum(obj, out);
			}*/ else if (obj instanceof Boolean) {
				out.writeByte(TYPE_BOOLEAN);
				out.writeBoolean((Boolean) obj);
			} else if (obj instanceof String) {
				out.writeByte(TYPE_STRING);
				out.writeUTF(obj.toString());
			} else if (obj instanceof List) {
				writeList(obj, out);
			} else if (obj instanceof Map) {
				writeMap(obj, out);
			} else if (obj.getClass().isArray()) {
				writeArray(obj, out);
			} else if( obj instanceof SendDataMap){
				SendDataMap map = (SendDataMap) obj;
				toByteArr(map.getMap(), out);
			}
		}
	}

	private static void writeArray(Object obj, DataOutputStream out) throws Exception {
		out.writeByte(TYPE_ARR);
		int length = Array.getLength(obj);
		out.writeShort(length);
		for (int i = 0; i < length; i++) {
			toByteArr(Array.get(obj, i),  out);
		}
	}

	private static void writeList(Object obj, DataOutputStream out) throws Exception {
		out.writeByte(TYPE_LIST);
		List<?> list = (List<?>) obj;
		int size = list.size();
		out.writeShort(size);
		for (int j = 0; j < size; j++) {
			toByteArr(list.get(j),  out);
		}
	}

	private static void writeMap(Object obj, DataOutputStream out) throws Exception {
		Map<?, ?> map = (Map<?, ?>) obj;
		int size = map.size();
		if(size==0) {
			out.writeByte(TYPE_MAP_KEY_STR);
			out.writeShort(0);
			return;
		}
		boolean getKeyType = false;
		Iterator<?> it = map.keySet().iterator();
		while (it.hasNext()) {
			Object key = it.next();
			Object value = map.get(key);
			if(!getKeyType){
				/*if(key instanceof Integer){
					out.writeByte(TYPE_MAP_KEY_INT);
				}else if(key instanceof Long){
					out.writeByte(TYPE_MAP_KEY_LONG);
				}else if(key instanceof Short){
					out.writeByte(TYPE_MAP_KEY_SHORT);
				}else if(key instanceof Byte){
					out.writeByte(TYPE_MAP_KEY_BYTE);
				}else if (key instanceof String) {
					out.writeByte(TYPE_MAP_KEY_STR);
				}*/
				out.writeByte(TYPE_MAP_KEY_STR);
				out.writeShort(size);
				getKeyType = true;
			}
//			toByteArr(key, out);
			out.writeUTF(key.toString());
			toByteArr(value,  out);
		}
	}

	@SuppressWarnings("unused")
	private static void writeNum(Object obj, DataOutputStream out) throws Exception {
		long dataInt = Long.valueOf(obj.toString());
		if (dataInt > Integer.MAX_VALUE || dataInt < Integer.MAX_VALUE * -1) {
			out.writeByte(TYPE_LONG);
			out.writeLong(dataInt);
		} else if (dataInt > 32767 || dataInt < -32768) {
			out.writeByte(TYPE_INT);
			out.writeInt((int) dataInt);
		} else if (dataInt > 127 || dataInt < -128) {
			out.writeByte(TYPE_SHORT);
			out.writeShort((short) dataInt);
		} else {
			out.writeByte(TYPE_BYTE);
			out.writeByte((byte) dataInt);
		}
	}

	
	
	
	public static Object read(byte[] data) {
		ByteArrayInputStream bis = null;
		DataInputStream in = null;
		try {
			bis = new ByteArrayInputStream(data);
			in = new DataInputStream(bis);
			return read(in);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			try {
				if (in != null) {
					in.close();
				}
				if (bis != null) {
					bis.close();
				}
			} catch (IOException e) {
				logger.error(LogTool.exception(e));
			}
		}
	}
	public static Object read(String filePath) {
		FileInputStream fis = null;
		DataInputStream in = null;
		try {
			fis = new FileInputStream(filePath);
			in = new DataInputStream(fis);
			return read(in);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			try {
				if (in != null) {
					in.close();
				}
				if (fis != null) {
					fis.close();
				}
			} catch (IOException e) {
				logger.error(LogTool.exception(e));
			}
		}
	}
	public static Object read(DataInputStream in) throws IOException{
		Object value = null;
		byte readType = in.readByte();
		if (readType == TYPE_LIST) {
			// List
			List<Object> list = new ArrayList<Object>();
			short size = in.readShort();
			for(int i=0;i<size;i++){
				list.add(read(in));
			}
			value = list;
		} else if (readType == TYPE_MAP_KEY_BYTE || readType==TYPE_MAP_KEY_INT|| readType==TYPE_MAP_KEY_SHORT|| readType==TYPE_MAP_KEY_LONG|| readType==TYPE_MAP_KEY_STR) {
			// Map
			Map<Object,Object> map = new HashMap<>();
			short size = in.readShort();
			for(int i=0;i<size;i++){
				String key = in.readUTF();
//				map.put(read(in), read(in));
				map.put(key, read(in));
			}
			value = map;
		} else if (readType == TYPE_ARR) {
			// array
			short size = in.readShort();
			Object[] arr = new Object[size];
			for(int i=0;i<size;i++){
				arr[i]=read(in);
			}
			value = arr;
		} else{
			if (readType == TYPE_NULL){
			}else if (readType == TYPE_BYTE){
				value = in.readByte();
			}else if(readType == TYPE_SHORT){
				value = in.readShort();
			}else if (readType == TYPE_INT) {
				value = in.readInt();
			} else if (readType == TYPE_LONG) {
				value = in.readLong();
			} else if (readType == TYPE_BOOLEAN) {
				value = in.readBoolean();
			} else if (readType == TYPE_STRING) {
				/*short size = in.readShort();
				if(size>0){
					byte[] strarr = new byte[size];
					in.read(strarr);
					value = new String(strarr);
				}*/
				value = in.readUTF();
			}
		}
		return value;
	}
	@SuppressWarnings({ "unchecked", "unused" })
	private static void explainRead(Object read){
		if(read==null){
			System.err.print("null"+",");
			return;
		}
		if(read instanceof Map){
			System.err.println();
			Map<Object,Object> map = (Map<Object, Object>) read;
			Iterator<Entry<Object, Object>> it = map.entrySet().iterator();
			while(it.hasNext()){
				Entry<Object, Object> next = it.next();
				System.err.print(next.getKey()+":");
				explainRead(next.getValue());
			}
		}else if(read.getClass().isArray()){
			System.err.println();
			Object[] arr = (Object[]) read;
			for(int i=0;i<arr.length;i++){
				explainRead(arr[i]);
			}
		}else{
			System.err.print(read.toString()+",");
		}
	}
}
