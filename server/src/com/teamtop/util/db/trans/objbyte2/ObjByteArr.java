package com.teamtop.util.db.trans.objbyte2;

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
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossData;
import com.teamtop.util.db.trans.FieldExt;
import com.teamtop.util.db.trans.TransInnerUtil;
import com.teamtop.util.log.LogTool;

public class ObjByteArr {
	private static final byte TYPE_NULL = 0;
	private static final byte TYPE_BYTE = 1;
	private static final byte TYPE_SHORT = 2;
	private static final byte TYPE_INT = 3;
	private static final byte TYPE_LONG = 4;
	private static final byte TYPE_BOOLEAN = 5;
	private static final byte TYPE_STRING = 6;
	private static final byte TYPE_ARR = 7;
	private static final byte TYPE_LIST = 8;
	private static final byte TYPE_MAP_KEY_BYTE = 9;
	private static final byte TYPE_MAP_KEY_SHORT = 10;
	private static final byte TYPE_MAP_KEY_INT = 11;
	private static final byte TYPE_MAP_KEY_LONG = 12;
	private static final byte TYPE_MAP_KEY_STR = 13;
	private static final byte TYPE_OBJ = 14;
	private static final byte TYPE_SET = 15;

	private static Logger logger = LoggerFactory.getLogger(ObjByteArr.class);

	public static byte[] write(Object obj, Class<?> clazz) {
		ByteArrayOutputStream bos = null;
		DataOutputStream out = null;
		try {
			bos = new ByteArrayOutputStream();
			out = new DataOutputStream(bos);
			toByteArr(obj, clazz, out);
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

	private static void toByteArr(Object obj, Class<?> clazz, DataOutputStream out) throws Exception {
		if (obj == null) {
			out.writeByte(TYPE_NULL);
		} else {
			if (obj instanceof Integer || obj instanceof Long || obj instanceof Short || obj instanceof Byte) {
				writeNum(obj, out);
			} else if (obj instanceof Boolean) {
				out.writeByte(TYPE_BOOLEAN);
				out.writeBoolean((Boolean) obj);
			} else if (obj instanceof String) {
				out.writeByte(TYPE_STRING);
				out.writeUTF(obj.toString());
			} else if (obj instanceof List) {
				writeList(obj, out);
			} else if (obj instanceof Set) {
				writeSet(obj, out);
			} else if (obj instanceof Map) {
				writeMap(obj, out);
			} else if (obj.getClass().isArray()) {
				writeArray(obj, out);
			} else {
				// 对象
				out.writeByte(TYPE_OBJ);
				if (clazz == null) {
					clazz = obj.getClass();
				}
				Map<Integer, FieldExt> declareFieldMap = TransInnerUtil.getFieldExtArrV2(clazz, false);
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
						Object invoke = method.invoke(obj);
						toByteArr(invoke, fieldClazz, out);
					}
				}
			}
		}
	}

	private static void writeArray(Object obj, DataOutputStream out) throws Exception {
		out.writeByte(TYPE_ARR);
		int length = Array.getLength(obj);
		out.writeShort(length);
		for (int i = 0; i < length; i++) {
			toByteArr(Array.get(obj, i), null, out);
		}
	}

	private static void writeList(Object obj, DataOutputStream out) throws Exception {
		out.writeByte(TYPE_LIST);
		List<?> list = (List<?>) obj;
		int size = list.size();
		out.writeShort(size);
		for (int j = 0; j < size; j++) {
			toByteArr(list.get(j), null, out);
		}
	}

	private static void writeSet(Object obj, DataOutputStream out) throws Exception {
		out.writeByte(TYPE_SET);
		Set<?> set = (Set<?>) obj;
		int size = set.size();
		out.writeShort(size);
		Iterator<?> iterator = set.iterator();
		for (; iterator.hasNext();) {
			toByteArr(iterator.next(), null, out);
		}
	}

	private static void writeMap(Object obj, DataOutputStream out) throws Exception {
//		out.writeByte(TYPE_MAP);
		Map<?, ?> map = (Map<?, ?>) obj;
		int size = map.size();
//		out.writeShort(size);
		Iterator<?> it = map.keySet().iterator();
		boolean getKeyType = false;
		while (it.hasNext()) {
			Object key = it.next();
			Object value = map.get(key);
			if(!getKeyType){
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
				out.writeShort(size);
				getKeyType = true;
			}
			toByteArr(key, null, out);
			toByteArr(value, null, out);
		}
	}

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

	private static Object readArray(Class<?> clazz, TransNodeV3 node) throws Exception {
		Class<?> elementType = clazz.getComponentType();
		List<TransNodeV3> children = node.getChildrenList();
		if(children==null){
			return null;
		}
		int size = children.size();
		Object value = Array.newInstance(elementType, size);
		for (int m = 0; m < size; m++) {
			Object arrayValue = read(children.get(m), elementType, null,null);
			Array.set(value, m, arrayValue);
		}
		return value;
	}

	private static Object readNum(Class<?> clazz, TransNodeV3 node) throws Exception {
		Object value = node.getValue();
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
		CrossData data = new CrossData();
		data.putObject("abc", newfile);
		byte[] write = write(data, CrossData.class);
		CrossData read = read(write, CrossData.class);
		System.err.println(read);
		
	}
	@SuppressWarnings("unchecked")
	public static <T> T read(byte[] data,Class<T> clazz) {
		ByteArrayInputStream bis = null;
		DataInputStream in = null;
		try {
			bis = new ByteArrayInputStream(data);
			in = new DataInputStream(bis);
			TransNodeV3 root = TransNodeV3.createNode(TYPE_OBJ,"root");
			makeNode(in,1,root);
//			System.err.println(sb.toString());
			T t = (T) read(root.getChildren().get(1), clazz, null,null);
			return t;
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
				logger.error(LogTool.exception(e,"clazz:"+clazz));
			}
		}
	}
	private static void makeNode(DataInputStream in,int order,TransNodeV3 currNode) throws IOException{
		byte readType = in.readByte();
		if (readType == TYPE_LIST) {
			// List
			TransNodeV3 newNode = TransNodeV3.createNode(readType,"list");
			if(order==0){
				currNode.addChild(newNode);
			}else{
				currNode.addChild(order,newNode);
			}
			currNode = newNode;
			short size = in.readShort();
			for(int i=0;i<size;i++){
				makeNode(in,0,currNode);
			}
			currNode = currNode.getParent();
		} else if (readType == TYPE_SET) {
			// Set
			TransNodeV3 newNode = TransNodeV3.createNode(readType, "set");
			if (order == 0) {
				currNode.addChild(newNode);
			} else {
				currNode.addChild(order, newNode);
			}
			currNode = newNode;
			short size = in.readShort();
			for (int i = 0; i < size; i++) {
				makeNode(in, 0, currNode);
			}
			currNode = currNode.getParent();
		} else if (readType == TYPE_MAP_KEY_BYTE ||readType == TYPE_MAP_KEY_SHORT||readType == TYPE_MAP_KEY_INT||readType == TYPE_MAP_KEY_LONG
				||readType == TYPE_MAP_KEY_STR) {
			// Map
			TransNodeV3 newNode = TransNodeV3.createNode(readType,"map");
			if(order==0){
				currNode.addChild(newNode);
			}else{
				currNode.addChild(order,newNode);
			}
			currNode = newNode;
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
				makeNode(in,0,currNode);
				currNode.getLastNode().setKey(key);
			}
			currNode = currNode.getParent();
		} else if (readType == TYPE_ARR) {
			// array
			TransNodeV3 newNode = TransNodeV3.createNode(readType,"arr");
			if(order==0){
				currNode.addChild(newNode);
			}else{
				currNode.addChild(order,newNode);
			}
			currNode = newNode;
			short size = in.readShort();
			for(int i=0;i<size;i++){
				makeNode(in,0,currNode);
			}
			currNode = currNode.getParent();
		} else if (readType == TYPE_OBJ) {
			//obj
			TransNodeV3 newNode = TransNodeV3.createNode(readType,"obj");
			if(order==0){
				currNode.addChild(newNode);
			}else{
				currNode.addChild(order,newNode);
			}
			currNode = newNode;
			short size = in.readShort();
			for(int i=0;i<size;i++){
				makeNode(in,in.readShort(),currNode);
			}
			currNode = currNode.getParent();
		} else{
			Object value = null;
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
				short size = in.readShort();
				if(size>0){
					byte[] strarr = new byte[size];
					in.read(strarr);
					value = new String(strarr);
				}
			}
			TransNodeV3 newNode = TransNodeV3.createNode(readType,value);
			if(order==0){
				currNode.addChild(newNode);
			}else{
				currNode.addChild(order,newNode);
			}
		}
	}
	
	
	private static Object read(TransNodeV3 node,Class<?> clazz,ParameterizedType pt,Object obj) throws Exception{
		byte readType = node.getType();
		Object value = null;
		if (readType == TYPE_NULL){
			return null;
		}else if (readType == TYPE_LIST) {
			// List
			value = readListMap(pt, node);
		} else if (readType == TYPE_SET) {
			// Set
			value = readListMap(pt, node);
		} else if (readType == TYPE_MAP_KEY_BYTE ||readType == TYPE_MAP_KEY_SHORT||readType == TYPE_MAP_KEY_INT||readType == TYPE_MAP_KEY_LONG
				||readType == TYPE_MAP_KEY_STR) {
			// Map
			value = readListMap(pt, node);
		} else if (readType == TYPE_ARR) {
			// array
			value = readArray(clazz, node);
		} else if (readType == TYPE_OBJ) {
			if(obj==null){
				value = clazz.newInstance();
			}else{
				value = obj;
			}
			Map<Integer, FieldExt> fieldExtMap = TransInnerUtil.getFieldExtArrV2(clazz, obj==null?false:true);
			Map<Integer,TransNodeV3> childNode = node.getChildren();
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
					Object objVal = read(childNode.get(order), field.getType(), pt,null);
					Method method = clazz.getMethod(TransInnerUtil.SET + TransInnerUtil.toUpperCaseFirstOne(field.getName()), field.getType());
					method.invoke(value, objVal);
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
				value = node.getValue();
			} else if (readType == TYPE_STRING) {
				value = node.getValue();
			}
		}
		return value;
	}
	
	private static Object readListMap(ParameterizedType pt, TransNodeV3 node) throws Exception {
		Type rawType = pt.getRawType();
		Class<?> rawClazz = null;
		Object obj = null;
		Method method = null;
		if (rawType instanceof Class<?>) {
			rawClazz = (Class<?>) rawType;
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
		if (rawClazz.isAssignableFrom(Class.class)) {
			// System.err.println("this is clazz");
		} else {
			Type[] acts = pt.getActualTypeArguments();
			if (acts != null) {
				int len = acts.length;
				if (len == 1) {
					// list or set
					method = obj.getClass().getMethod(TransInnerUtil.ADD, Object.class);
					List<TransNodeV3> children = node.getChildrenList();
					if(children!=null){
						int size = children.size();
						for (int i = 0; i < size; i++) {
							Type type = acts[0];
							if (type instanceof Class<?>) {
//							Object value = getValueForArrListMap((Class<?>) type, in);
								Object value = read(children.get(i), (Class<?>) type, null,null);
								// System.err.println("list general type:"+type);
								method.invoke(obj, value);
							}
						}
					}
				} else if (len == 2) {
					// map
					method = obj.getClass().getMethod(TransInnerUtil.PUT, Object.class, Object.class);
					List<TransNodeV3> children = node.getChildrenList();
					if(children!=null){
						int size = children.size();
						for (int i = 0; i < size; i++) {
							TransNodeV3 childNode = children.get(i);
							// 处理key
							Object keyObj = null;
							Type keyType = acts[0];
							if (keyType instanceof Class<?>) {
								// System.err.println("map key general type:"+keyType);
//							keyObj = getValueForArrListMap((Class<?>) keyType, in);
								keyObj = getMapKey((Class<?>)keyType, childNode.getKey());
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
								valueObj = read(childNode, clazz, null,null);
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
		return obj;
	}
	@SuppressWarnings("unchecked")
	public static <T> T toSuperClassObj(byte[] data, Class<T> clazz, T obj) throws Exception {
		ByteArrayInputStream bis = null;
		DataInputStream in = null;
		try {
			bis = new ByteArrayInputStream(data);
			in = new DataInputStream(bis);
			TransNodeV3 root = TransNodeV3.createNode(TYPE_OBJ,"root");
			makeNode(in,1,root);
			T t = (T) read(root.getChildren().get(1), clazz, null,obj);
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
}
