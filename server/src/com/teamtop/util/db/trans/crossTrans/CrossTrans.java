package com.teamtop.util.db.trans.crossTrans;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossData;
import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldExt;
import com.teamtop.util.db.trans.FieldOrder;
import com.teamtop.util.db.trans.TransInnerUtil;
import com.teamtop.util.log.LogTool;

public class CrossTrans {
	private static final byte TYPE_NULL = 0;
	private static final byte TYPE_BYTE_ARR = 50;
	private static final byte TYPE_BYTE = 1;
	private static final byte TYPE_SHORT = 2;
	private static final byte TYPE_INT = 3;
	private static final byte TYPE_LONG = 4;
	private static final byte TYPE_FLOAT = 5;
	private static final byte TYPE_BOOLEAN = 6;
	private static final byte TYPE_STRING = 7;
	private static final byte TYPE_ARR = 8;
	private static final byte TYPE_LIST = 9;
	private static final byte TYPE_MAP = 17;
	private static final byte TYPE_MAP_KEY_BYTE = 10;
	private static final byte TYPE_MAP_KEY_SHORT = 11;
	private static final byte TYPE_MAP_KEY_INT = 12;
	private static final byte TYPE_MAP_KEY_LONG = 13;
	private static final byte TYPE_MAP_KEY_STR = 14;
	private static final byte TYPE_OBJ = 15;
	private static final byte TYPE_MAP_VALUE_TYPE_IS_OBJECT = 16;
	private static final byte TYPE_LIST_VALUE_TYPE_IS_OBJECT = 17;
	
	public static Map<Class<?>, Map<Integer,FieldExt>> fieldExtMap = new HashMap<Class<?>, Map<Integer,FieldExt>>();
	private static Logger logger = LoggerFactory.getLogger(CrossTrans.class);

	public static byte[] write(Object obj, Class<?> clazz) {
		if(obj==null) return null;
		ByteArrayOutputStream bos = null;
		DataOutputStream out = null;
		try {
			bos = new ByteArrayOutputStream();
			out = new DataOutputStream(bos);
			doWrite(obj, clazz,null, out);
			return bos.toByteArray();
		} catch (Exception e) {
			e.printStackTrace();
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
				logger.error(LogTool.exception(e,"clazz:"+clazz));
			}
		}
	}

	private static void doWrite(Object obj, Class<?> clazz, ParameterizedType pt,DataOutputStream out) throws Exception {
		if (obj == null) {
			out.writeByte(TYPE_NULL);
		} else {
			/*if (obj instanceof Integer || obj instanceof Long || obj instanceof Short || obj instanceof Byte) {
				writeNum(obj, out);
			}*/
			if(obj instanceof Byte){
				out.writeByte(TYPE_BYTE);
				out.writeByte((byte) obj);
			}else if(obj instanceof Integer){
				out.writeByte(TYPE_INT);
				out.writeInt((int) obj);
			}else if(obj instanceof Short){
				out.writeByte(TYPE_SHORT);
				out.writeShort((short) obj);
			}else if(obj instanceof Long){
				out.writeByte(TYPE_LONG);
				out.writeLong((long) obj);
			}else if (obj instanceof Float) {
				out.writeByte(TYPE_FLOAT);
				out.writeFloat((Float)(obj));
			} else if (obj instanceof Boolean) {
				out.writeByte(TYPE_BOOLEAN);
				out.writeBoolean((Boolean) obj);
			} else if (obj instanceof String) {
				out.writeByte(TYPE_STRING);
				out.writeUTF(obj.toString());
			} else if (obj instanceof List) {
				writeList(obj,pt, out);
			} else if (obj instanceof Map) {
				writeMap(obj, pt,out);
			}else if(obj instanceof byte[]){
				out.writeByte(TYPE_BYTE_ARR);
				byte[] d = (byte[])obj;
				out.writeInt(d.length);
				out.write(d);
			} else if (obj.getClass().isArray()) {
				writeArray(obj, out);
			} else {
				// 对象
				out.writeByte(TYPE_OBJ);
				if (clazz == null) {
					clazz = obj.getClass();
				}
				Map<Integer, FieldExt> declareFieldMap = getFieldExtArr(clazz, false);
//				out.writeUTF(clazz.getName());
				out.writeShort(declareFieldMap.size());
				Iterator<Entry<Integer, FieldExt>> it = declareFieldMap.entrySet().iterator();
				while(it.hasNext()){
					Entry<Integer, FieldExt> next = it.next();
					Integer order = next.getKey();
					FieldExt fieldExt = next.getValue();
					out.writeShort(order);
					Field field = fieldExt.getField();
					if (field == null) {
						out.writeByte(TYPE_NULL);
					} else {
						String fieldName = field.getName();
						Method method = null;
						Class<?> fieldClazz = field.getType();
						if (fieldClazz.isAssignableFrom(boolean.class)) {
							// boolean
							method = clazz.getMethod(TransInnerUtil.IS + TransInnerUtil.toUpperCaseFirstOne(fieldName));
						} else {
							method = clazz.getMethod(TransInnerUtil.GET + TransInnerUtil.toUpperCaseFirstOne(fieldName));
						}
						Type mapType = field.getGenericType();
						ParameterizedType ptObj = null;
						if (mapType instanceof ParameterizedType) {
							ptObj = (ParameterizedType)mapType;
						}
						Object invoke = method.invoke(obj);
						doWrite(invoke, fieldClazz, ptObj,out);
					}
				}
			}
		}
	}

	private static void writeArray(Object obj, DataOutputStream out) throws Exception {
		out.writeByte(TYPE_ARR);
		int length = Array.getLength(obj);
		out.writeShort(length);
		boolean arrayType = false;
		if(obj instanceof int[]){
			out.writeUTF(int.class.getName());
			arrayType = true;
		}else if(obj instanceof Integer[]){
			out.writeUTF(Integer.class.getName());
			arrayType = true;
		}else if(obj instanceof long[]){
			out.writeUTF(long.class.getName());
			arrayType = true;
		}else if(obj instanceof Long[]){
			out.writeUTF(Long.class.getName());
			arrayType = true;
		}else if(obj instanceof short[]){
			out.writeUTF(short.class.getName());
			arrayType = true;
		}else if(obj instanceof Short[]){
			out.writeUTF(Short.class.getName());
			arrayType = true;
		}else if(obj instanceof String[]){
			out.writeUTF(String.class.getName());
			arrayType = true;
		}
		for (int i = 0; i < length; i++) {
			Object object = Array.get(obj, i);
			if(!arrayType){
				arrayType = true;
				out.writeUTF(object.getClass().getName());
			}
			doWrite(object, null,null, out);
		}
	}

	private static void writeList(Object obj,ParameterizedType pt, DataOutputStream out) throws Exception {
		out.writeByte(TYPE_LIST);
		out.writeUTF(obj.getClass().getName());
		List<?> list = (List<?>) obj;
		int size = list.size();
		out.writeShort(size);
		if(size==0) return;
		boolean valueTypeIsObject = false;
		if(pt==null){
			out.writeByte(TYPE_LIST_VALUE_TYPE_IS_OBJECT);
			valueTypeIsObject = true;
		}else{
			out.writeByte(TYPE_OBJ);
		}
		for (int j = 0; j < size; j++) {
			Object value = list.get(j);
			//没有pt是object
			if(valueTypeIsObject){
				//value is Object type
				if(value instanceof Integer){
					out.writeByte(TYPE_INT);
				}else if(value instanceof Long){
					out.writeByte(TYPE_LONG);
				}else if(value instanceof Short){
					out.writeByte(TYPE_SHORT);
				}else if(value instanceof Byte){
					out.writeByte(TYPE_BYTE);
				}else if (value instanceof String) {
					out.writeByte(TYPE_STRING);
				}else if(value instanceof List){
					out.writeByte(TYPE_LIST);
				}else if (value instanceof Map) {
//						throw new Exception("map value type is Object,the value can not be map");
					out.writeByte(TYPE_MAP);
				}else{
					out.writeByte(TYPE_OBJ);
					out.writeUTF(value.getClass().getName());
				}
			}
			doWrite(value, null,null, out);
		}
	}

	private static void writeMap(Object obj,ParameterizedType pt, DataOutputStream out) throws Exception {
//		out.writeByte(TYPE_MAP);
		Map<?, ?> map = (Map<?, ?>) obj;
		int size = map.size();
		if(size==0){
			out.writeByte(TYPE_MAP_KEY_INT);
			out.writeUTF(map.getClass().getName());
			out.writeByte(TYPE_MAP_KEY_INT);
			out.writeShort(0);
		}
//		out.writeShort(size);
		Iterator<?> it = map.keySet().iterator();
		boolean getKeyType = false;
		boolean valueTypeIsObject = false;
		while (it.hasNext()) {
			Object key = it.next();
			Object value = map.get(key);
			if(!getKeyType){
				Class<?> keyClazz = null;
				Class<?> valueClazz = null;
				Type valueType = null;
				Type[] act = null;
				if(pt==null){
					keyClazz = key.getClass();
					valueClazz = value.getClass();
					if(valueClazz.isAssignableFrom(Object.class)){
						throw new Exception("map value type is Object,the value can not be map");
					}
				}else{
					act = pt.getActualTypeArguments();
					keyClazz = (Class<?>) act[0];
					valueType = act[1];
					if (valueType instanceof Class<?>) {
						valueClazz = (Class<?>) valueType;
					}else{
						valueClazz = value.getClass();
					}
				}
				if(keyClazz.isAssignableFrom(Object.class)){
					//key is Object type
					throw new Exception("map key can not be Object:"+map.toString());
				}else{
					if(key instanceof Integer){
						out.writeByte(TYPE_MAP_KEY_INT);
					}else if(key instanceof Long){
						out.writeByte(TYPE_MAP_KEY_LONG);
					}else if(key instanceof Short){
						out.writeByte(TYPE_MAP_KEY_SHORT);
					}else if(key instanceof Byte){
						out.writeByte(TYPE_MAP_KEY_BYTE);
					}else if (key instanceof String) {
						out.writeByte(TYPE_MAP_KEY_STR);
					}
				}
				out.writeUTF(map.getClass().getName());
				boolean goValue = true;
				/*if(pt!=null){
					if(valueClazz==null){
						if (valueType instanceof ParameterizedType) {
							out.writeByte(TYPE_OBJ);
							goValue = false;
						}
					}
				}*/
				if (goValue) {
					// value是基础类型、数组、Object
					if(valueClazz.isAssignableFrom(Object.class)){
						//value is Object type
						valueTypeIsObject = true;
						out.writeByte(TYPE_MAP_VALUE_TYPE_IS_OBJECT);
					}else{
						if(value instanceof Integer){
							out.writeByte(TYPE_MAP_KEY_INT);
						}else if(value instanceof Long){
							out.writeByte(TYPE_MAP_KEY_LONG);
						}else if(value instanceof Short){
							out.writeByte(TYPE_MAP_KEY_SHORT);
						}else if(value instanceof Byte){
							out.writeByte(TYPE_MAP_KEY_BYTE);
						}else if (value instanceof String) {
							out.writeByte(TYPE_MAP_KEY_STR);
						}else{
							if(pt!=null){
								out.writeByte(TYPE_OBJ);
							}else{
								valueTypeIsObject = true;
								out.writeByte(TYPE_MAP_VALUE_TYPE_IS_OBJECT);
							}
						}
					}
				}
				out.writeShort(size);
				getKeyType = true;
			}
			doWrite(key, null,null, out);
			if(valueTypeIsObject){
				//value is Object type
				if(value ==null){
					out.writeByte(TYPE_NULL);
				}else if(value instanceof Integer){
					out.writeByte(TYPE_INT);
				}else if(value instanceof Long){
					out.writeByte(TYPE_LONG);
				}else if(value instanceof Short){
					out.writeByte(TYPE_SHORT);
				}else if(value instanceof Byte){
					out.writeByte(TYPE_BYTE);
				}else if (value instanceof String) {
					out.writeByte(TYPE_STRING);
				}else if (value instanceof Boolean) {
					out.writeByte(TYPE_BOOLEAN);
				}else if(value instanceof List){
					out.writeByte(TYPE_LIST);
				}else if(value.getClass().isArray()){
					out.writeByte(TYPE_ARR);
				}else if(value instanceof byte[]){
					out.writeByte(TYPE_BYTE_ARR);
				}else if (value instanceof Map) {
//					throw new Exception("map value type is Object,the value can not be map");
					out.writeByte(TYPE_MAP);
				}else{
					out.writeByte(TYPE_OBJ);
					out.writeUTF(value.getClass().getName());
				}
			}
			doWrite(value, null,null, out);
		}
	}

	@SuppressWarnings("unused")
	private static void writeNum(Object obj, DataOutputStream out) throws Exception {
		/*long dataInt = Long.valueOf(obj.toString());
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
		}*/
	}

	private static Object readArray(Class<?> clazz, CrossTransNode node) throws Exception {
		Class<?> elementType = node.getClazz();
		List<CrossTransNode> children = node.getMapListArrValue();
		if(children==null){
			return null;
		}
		int size = children.size();
		Object value = Array.newInstance(elementType, size);
		for (int m = 0; m < size; m++) {
			Object arrayValue = doRead(children.get(m), elementType, null,null);
			Array.set(value, m, arrayValue);
		}
		return value;
	}

	private static Object readNum(Class<?> clazz, CrossTransNode node) throws Exception {
		Object value = node.getSimpleValue();
		clazz = value.getClass();
		if (clazz.isAssignableFrom(int.class) || clazz.isAssignableFrom(Integer.class)) {
			// int Integer
			value = Integer.parseInt(value.toString());
		} else if (clazz.isAssignableFrom(short.class) || clazz.isAssignableFrom(Short.class)) {
			// short Short
			value = Short.parseShort(value.toString());
		} else if (clazz.isAssignableFrom(long.class) || clazz.isAssignableFrom(Long.class)) {
			// long Long
			value = Long.parseLong(value.toString());
		} else if (clazz.isAssignableFrom(byte.class) || clazz.isAssignableFrom(Byte.class)) {
			// byte Byte
			value = Byte.parseByte(value.toString());
		}
		return value;
	}
	
	private static Object getMapKey(Class<?> clazz,Object ori){
		if (clazz.isAssignableFrom(int.class) || clazz.isAssignableFrom(Integer.class)) {
			// int Integer
			ori = Integer.parseInt(ori.toString());
		} else if (clazz.isAssignableFrom(short.class) || clazz.isAssignableFrom(Short.class)) {
			// short Short
			ori = Short.parseShort(ori.toString());
		} else if (clazz.isAssignableFrom(long.class) || clazz.isAssignableFrom(Long.class)) {
			// long Long
			ori = Long.parseLong(ori.toString());
		} else if (clazz.isAssignableFrom(byte.class) || clazz.isAssignableFrom(Byte.class)) {
			// byte Byte
			ori = Byte.parseByte(ori.toString());
		}
		return ori;
	}

	public static void main(String[] args) throws Exception {
		
		byte[] newfile = new byte[]{1,0,1,0,20,34,3};
		List<Integer> list = new ArrayList<Integer>();
		list.add(1);
		list.add(2);
		CrossData data = new CrossData();
		data.putObject("abc", newfile);
		data.putObject("list", list);
		byte[] write = write(data, CrossData.class);
		CrossData read = read(write, CrossData.class);
		System.err.println(read);
		
		
		byte[] dd = (byte[]) read.getObject("abc", byte[].class);
		System.err.println(dd);
	}
	/**
	 * 还原成对象
	 * @param data 二进制数据
	 * @param clazz 需要转换的Clazz
	 * @return 对象
	 * @throws Exception
	 */
	public static <T> T read(byte[] data,Class<T> clazz){
		return read(data, clazz, null);
	}
	/**
	 * 还原成对象
	 * @param data 二进制数据
	 * @param clazz 需要转换的Clazz
	 * @param obj 已有的对象
	 * @return 对象
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static <T> T read(byte[] data, Class<T> clazz, T obj){
		ByteArrayInputStream bis = null;
		DataInputStream in = null;
		try {
			bis = new ByteArrayInputStream(data);
			in = new DataInputStream(bis);
			CrossTransNode root = CrossTransNode.createNode(TYPE_OBJ);
			makeNode(in,1,root);
			T t = (T) doRead(root.getObjValue().get(1), clazz, null,obj);
//			System.err.println("read done:"+t);
			return t;
		} catch (Exception e) {
			logger.error(LogTool.exception(e,"clazz:"+clazz));
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
				logger.error(LogTool.exception(e,"clazz:"+clazz));
			}
		}
	}
	private static void makeNode(DataInputStream in,int order,CrossTransNode currNode) throws Exception{
		byte readType = in.readByte();
		if (readType == TYPE_LIST) {
			// List
			String className = in.readUTF();
			short size = in.readShort();
			CrossTransNode newNode = CrossTransNode.createNode(readType);
			newNode.setClazz(className);
			currNode.addChild(order,newNode);
			if(size>0){
				byte listType = in.readByte();
				boolean hasPt = true;
				if(listType==TYPE_LIST_VALUE_TYPE_IS_OBJECT){
					hasPt = false;
				}
				currNode = newNode;
				for(int i=0;i<size;i++){
					String valueClassName = null;
					if(!hasPt){
						byte valueObjType = in.readByte();
						if(valueObjType==TYPE_OBJ){
							valueClassName = in.readUTF();
						}
					}
					makeNode(in,0,currNode);
					if(valueClassName != null){
						currNode.getMapListLastNode().setClazz(valueClassName);
					}
				}
			}
			currNode = currNode.getParent();
		} else if (readType == TYPE_MAP_KEY_BYTE ||readType == TYPE_MAP_KEY_SHORT||readType == TYPE_MAP_KEY_INT||readType == TYPE_MAP_KEY_LONG
				||readType == TYPE_MAP_KEY_STR) {                 
			// Map
			String mapClassName = in.readUTF();
			CrossTransNode newNode = CrossTransNode.createNode(readType);
			newNode.setClazz(mapClassName);
			currNode.addChild(order,newNode);
			currNode = newNode;
			byte valuePtType = in.readByte();
			short size = in.readShort();
			for(int i=0;i<size;i++){
				Object key = null;
				int keyType = in.readByte();
				if (keyType == TYPE_BYTE){
					key = in.readByte();
				}else if(keyType == TYPE_SHORT){
					key = in.readShort();
				}else if (keyType == TYPE_INT) {
					key = in.readInt();
				} else if (keyType == TYPE_LONG) {
					key = in.readLong();
				} else if (keyType == TYPE_BOOLEAN) {
					key = in.readBoolean();
				} else if (keyType == TYPE_STRING) {
					short keySize = in.readShort();
					if(keySize>0){
						byte[] strarr = new byte[keySize];
						in.read(strarr);
						key = new String(strarr);
					}
				}
				if(valuePtType==TYPE_MAP_VALUE_TYPE_IS_OBJECT){
					byte valueType = in.readByte();
					if(valueType==TYPE_OBJ){
						String className = in.readUTF();
						in.readByte();
//						System.err.println("map obj "+className);
						CrossTransNode objNode = CrossTransNode.createNode(valueType);
						objNode.setClazz(className);
						currNode.addChild(0,objNode);
						currNode = objNode;
						short objSize = in.readShort();
						for(int j=0;j<objSize;j++){
							makeNode(in,in.readShort(),currNode);
						}
						currNode = currNode.getParent();
					}else{
						makeNode(in,0,currNode);
					}
				}else{
					makeNode(in,0,currNode);
				}
				currNode.getMapListLastNode().setMapKey(key);
			}
			currNode = currNode.getParent();
		}else if(readType == TYPE_BYTE_ARR){
			int len = in.readInt();
			byte[] b = new byte[len];
			in.read(b);
			CrossTransNode newNode = CrossTransNode.createNode(readType);
			newNode.setSimpleValue(b);
			currNode.addChild(order,newNode);
		} else if (readType == TYPE_ARR) {
			// array
			CrossTransNode newNode = CrossTransNode.createNode(readType);
			currNode.addChild(order,newNode);
			currNode = newNode;
			short size = in.readShort();
			if(size>0){
				String className = in.readUTF();
				newNode.setClazz(className);
			}
			for(int i=0;i<size;i++){
				makeNode(in,0,currNode);
			}
			currNode = currNode.getParent();
		} else if (readType == TYPE_OBJ) {
			//obj
//			String className = in.readUTF();
//			System.err.println("obj "+className);
			CrossTransNode newNode = CrossTransNode.createNode(readType);
			currNode.addChild(order,newNode);
			currNode = newNode;
			short size = in.readShort();
			for(int i=0;i<size;i++){
				makeNode(in,in.readShort(),currNode);
			}
			currNode = currNode.getParent();
		} else{
			Object value = null;
			if (readType == TYPE_NULL){
			}else if (readType == TYPE_FLOAT){
				value = in.readFloat();
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
				short size = in.readShort();
				if(size>0){
					byte[] strarr = new byte[size];
					in.read(strarr);
					value = new String(strarr);
				}
			}
			CrossTransNode newNode = CrossTransNode.createNode(readType);
			if(value!=null){
				newNode.setSimpleValue(value);
				newNode.setClazz(value.getClass().getName());
			}
			currNode.addChild(order,newNode);
		}
	}
	
	
	private static Object doRead(CrossTransNode node,Class<?> clazz,ParameterizedType pt,Object obj) throws Exception{
//		if(node==null){
//			System.err.println();
//			return null;
//		}
		byte readType = node.getType();
		Object value = null;
		if (readType == TYPE_NULL){
			return null;
		}else if (readType == TYPE_LIST) {
			// List
			value = readListMap(pt, node);
		} else if (readType == TYPE_MAP_KEY_BYTE ||readType == TYPE_MAP_KEY_SHORT||readType == TYPE_MAP_KEY_INT||readType == TYPE_MAP_KEY_LONG
				||readType == TYPE_MAP_KEY_STR) {
			// Map
			value = readListMap(pt, node);
		} else if (readType == TYPE_BYTE_ARR) {
			value = node.getSimpleValue();
		}else if (readType == TYPE_ARR) {
			// array
			value = readArray(clazz, node);
		} else if (readType == TYPE_OBJ) {
			if(obj==null){
				if(clazz==Object.class){
					clazz = node.getClazz();
				}
				value = clazz.newInstance();
			}else{
				value = obj;
			}
			Map<Integer, FieldExt> fieldExtMap = getFieldExtArr(clazz, obj==null?false:true);
			Map<Integer,CrossTransNode> childNode = node.getObjValue();
			Iterator<Entry<Integer, FieldExt>> it = fieldExtMap.entrySet().iterator();
			while(it.hasNext()){
				Entry<Integer, FieldExt> next = it.next();
				Integer order = next.getKey();
				FieldExt fieldExt = next.getValue();
				Field field = fieldExt.getField();
				if (field == null) {
					
				} else {
					Type mapType = field.getGenericType();
					if (mapType instanceof ParameterizedType) {
						pt = (ParameterizedType)mapType;
					}
					CrossTransNode crossTransNode = childNode.get(order);
					if(crossTransNode==null){
//						System.err.println("can't find order:"+order+",field:"+field+",clazz:"+clazz);
						continue;
					}
					Object objVal = doRead(crossTransNode, field.getType(), pt,null);
					Method method = clazz.getMethod(TransInnerUtil.SET + TransInnerUtil.toUpperCaseFirstOne(field.getName()), field.getType());
					try {
						method.invoke(value, objVal);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		} else{
			if (readType == TYPE_BYTE){
				value = readNum(clazz, node);
			}else if(readType == TYPE_SHORT){
				value = readNum(clazz, node);
			}else if (readType == TYPE_INT) {
				value = readNum(clazz, node);
			} else if (readType == TYPE_LONG) {
				value = readNum(clazz, node);
			} else if (readType == TYPE_BOOLEAN) {
				value = node.getSimpleValue();
			} else if (readType == TYPE_STRING) {
				value = node.getSimpleValue();
			} else if (readType ==  TYPE_FLOAT){
				value = node.getSimpleValue();
			}
		}
		return value;
	}
	
	private static Object readListMap(ParameterizedType pt, CrossTransNode node) throws Exception {
		Class<?> rawClazz = null;
		Object obj = null;
		Method method = null;
		if(pt==null){
			rawClazz = node.getClazz();
		}else{
			Type rawType = pt.getRawType();
			if (rawType instanceof Class<?>) {
				rawClazz = (Class<?>) rawType;
			}
		}
		if (rawClazz!=null) {
			// System.err.println("rawClazz:"+rawClazz);
			// 类型 Map List 或者 Class.class类型
			if (rawClazz.isAssignableFrom(Map.class)) {
				obj = Class.forName("java.util.HashMap").newInstance();
			} else if (rawClazz.isAssignableFrom(List.class)) {
				obj = Class.forName("java.util.ArrayList").newInstance();
			} else {
				obj = rawClazz.newInstance();
			}
		} else {
			return null;
		}
		if(pt==null){
			if(node.getType()==TYPE_LIST){
				method = obj.getClass().getMethod(TransInnerUtil.ADD, Object.class);
				List<CrossTransNode> children = node.getMapListArrValue();
				if(children!=null){
					int size = children.size();
					for (int i = 0; i < size; i++) {
						CrossTransNode childNode = children.get(i);
						Object value = doRead(childNode, childNode.getClazz(), null,null);
						method.invoke(obj, value);
					}
				}
			}else{
				method = obj.getClass().getMethod(TransInnerUtil.PUT, Object.class, Object.class);
				List<CrossTransNode> children = node.getMapListArrValue();
				if(children!=null){
					int size = children.size();
					for (int i = 0; i < size; i++) {
						CrossTransNode childNode = children.get(i);
						// 处理key
						Object keyObj = childNode.getMapKey();
						// 处理value
						Object valueObj = doRead(childNode, childNode.getClazz(), null,null);
						method.invoke(obj, keyObj, valueObj);
					}
				}
			}
		}else{
			if (rawClazz.isAssignableFrom(Class.class)) {
				// System.err.println("this is clazz");
			} else {
				Type[] acts = pt.getActualTypeArguments();
				if (acts != null) {
					int len = acts.length;
					if (len == 1) {
						// list
						method = obj.getClass().getMethod(TransInnerUtil.ADD, Object.class);
						List<CrossTransNode> children = node.getMapListArrValue();
						if(children!=null){
							int size = children.size();
							for (int i = 0; i < size; i++) {
								Type type = acts[0];
								if (type instanceof Class<?>) {
//							Object value = getValueForArrListMap((Class<?>) type, in);
									Object value = doRead(children.get(i), (Class<?>) type, null,null);
									// System.err.println("list general type:"+type);
									method.invoke(obj, value);
								}
							}
						}
					} else if (len == 2) {
						// map
						method = obj.getClass().getMethod(TransInnerUtil.PUT, Object.class, Object.class);
						List<CrossTransNode> children = node.getMapListArrValue();
						if(children!=null){
							int size = children.size();
							for (int i = 0; i < size; i++) {
								CrossTransNode childNode = children.get(i);
								// 处理key
								Object keyObj = null;
								Type keyType = acts[0];
								if (keyType instanceof Class<?>) {
									// System.err.println("map key general type:"+keyType);
//							keyObj = getValueForArrListMap((Class<?>) keyType, in);
									keyObj = getMapKey((Class<?>)keyType, childNode.getMapKey());
								} else if (keyType instanceof ParameterizedType) {
									// 可以为这种类型 Map<Class<?>, Object>
								}
								// 处理value
								Object valueObj = null;
								Type valueType = acts[1];
								if (valueType instanceof Class<?>) {
									// value是基础类型、数组、Object
									Class<?> clazz = (Class<?>) valueType;
//							valueObj = getValueForArrListMap(clazz, in);
									valueObj = doRead(childNode, clazz, null,null);
									// System.err.println("map value general type:"+clazz);
								} else if (valueType instanceof ParameterizedType) {
									// value是Map
									ParameterizedType vpt = (ParameterizedType) valueType;
//							valueObj = readListMap(vpt, in);
									valueObj = readListMap(vpt, childNode);
								}
								method.invoke(obj, keyObj, valueObj);
							}
						}
					}
				}
			}
		}
		return obj;
	}
	/**
	 * 获取FieldExt[]，如果没有，则尝试去分析此clazz
	 * 
	 * @param clazz
	 * @return FieldExt[]
	 */
	public static Map<Integer,FieldExt> getFieldExtArr(Class<?> clazz, boolean findSuper) {
		Map<Integer, FieldExt> map = fieldExtMap.get(clazz);
		if (map == null) {
			map = explainFieldTrans(clazz,0);
			fieldExtMap.put(clazz,map);
		}else{
			return map;
		}
		int index = 1;
		while(true){
			Class<?> superclazz = clazz.getSuperclass();
			if(superclazz!=null){
				if(superclazz.isAssignableFrom(Object.class)) break;
				if(superclazz.isAssignableFrom(CacheModel.class)) break;
				Map<Integer, FieldExt> superMap = fieldExtMap.get(superclazz);
				if (superMap == null) {
					superMap = explainFieldTrans(superclazz,/*map.size()+*/index*10000);
					map.putAll(superMap);
				}else{
					TreeMap<Integer, FieldExt> fieldMap = new TreeMap<Integer, FieldExt>();
					int key = 1;
					for(FieldExt fe:superMap.values()){
						fieldMap.put(index*10000+key, fe);
						key++;
					}
					map.putAll(fieldMap);
				}
				clazz = superclazz;
				index++;
			}else{
				break;
			}
		}
		return map;
	}
	
	
	/**
	 * 解析字段obj和byte相互转换需要用到的map，用于此转换工具使用时可以快速获取class的field数据
	 */
	public static TreeMap<Integer, FieldExt> explainFieldTrans(Class<?> clazz,int start) {
		Field[] declaredFields = clazz.getDeclaredFields();
		TreeMap<Integer, FieldExt> fieldMap = new TreeMap<Integer, FieldExt>();
		for (Field field : declaredFields) {
			FieldOrder fv = field.getAnnotation(FieldOrder.class);
			if (fv != null) {
				int key = fv.order()+start;
				fieldMap.put(key, new FieldExt(field, key));
			}
		}
		return fieldMap;
	}
}
