package com.teamtop.util.communication.io.protocol;

import java.io.DataInputStream;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.communication.io.Request;
import com.teamtop.util.communication.io.annotation.ProtocolFieldType;
import com.teamtop.util.log.LogTool;


/**
 * 请求协议工具类
 * @author syp
 *
 */
public class ProtocolBuilder {
	
	private static Logger log = LoggerFactory.getLogger(ProtocolBuilder.class);
	/**
	 * 构建请求协议
	 * @param <T>
	 * @param bytes 字节类型
	 * @param protocolClass 要返回的协议类型，该类必须要继承ProtocolAssist接口。需要构造命令器(cmd)时，该类要继承Protocol父类
	 * @param fieldNames 按输入流顺序的字段名
	 * @return
	 */
	public static <T> T build(byte[] bytes , Class<T> protocolClass){
		if(bytes == null){
			return null;
		}
		T dest = null;
		try {
			dest = protocolClass.newInstance();
		} catch (Exception e) {
			log.error("CANNOT NEW INSTANCE [{" + protocolClass + "}]",  e);
		}
		String[] fieldNames = ((ProtocolAssist)dest).sortFieldsName();
		Map<String,Object> properties = new HashMap<String,Object>();
		
		Request request = new Request(bytes);
		DataInputStream input = request.getInputStream();
		try{
			if(Protocol.class.isAssignableFrom(protocolClass)){
				properties.put("cmd", input.readInt());
			}
			if(fieldNames != null && fieldNames.length > 0){
				Field[] fields = protocolClass.getDeclaredFields();
				if(fields != null && fields.length > 0){
					Map<String,Field> fieldsMap = new HashMap<String,Field>();
					for(Field field : fields){
						fieldsMap.put(field.getName(), field);
					}
					
					for(String fieldName : fieldNames){
						Field field = fieldsMap.get(fieldName);
						String fieldTypeName = field.getType().getName();
						if(fieldTypeName.equalsIgnoreCase("byte") || fieldTypeName.equalsIgnoreCase("java.lang.Byte")){
							properties.put(fieldName, input.readByte());
						}else if(fieldTypeName.equalsIgnoreCase("short") || fieldTypeName.equalsIgnoreCase("java.lang.Short")){
							properties.put(fieldName, input.readShort());
						}else if(fieldTypeName.equalsIgnoreCase("int") || fieldTypeName.equalsIgnoreCase("java.lang.Integer")){
							properties.put(fieldName, input.readInt());
						}else if(fieldTypeName.equalsIgnoreCase("long") || fieldTypeName.equalsIgnoreCase("java.lang.Long")){
							properties.put(fieldName, input.readLong());
						}else if(fieldTypeName.equalsIgnoreCase("float") || fieldTypeName.equalsIgnoreCase("java.lang.Float")){
							properties.put(fieldName, input.readFloat());
						}else if(fieldTypeName.equalsIgnoreCase("double") || fieldTypeName.equalsIgnoreCase("java.lang.Double")){
							properties.put(fieldName, input.readDouble());
						}else if(fieldTypeName.equalsIgnoreCase("java.lang.String")){
							properties.put(fieldName, input.readUTF());
						}else if(fieldTypeName.startsWith("[") && fieldTypeName.contains("java.lang.Object")){
							String annotationValue = field.getAnnotation(ProtocolFieldType.class).value();
							Object[] objects = typeInObjectArray(annotationValue , input);
							properties.put(fieldName, objects);
						}
					}
					
				}
			}
			
		} catch (Exception e) {
			log.error(LogTool.exception(e, "READ INPUT ERROR"));
		}
		
		
		try {
			BeanUtils.populate(dest, properties);
		} catch (Exception e) {
			log.error(LogTool.exception(e, "POPULATE OBJECT ERROR [{" + protocolClass + "}]"));
		}
		
		request.releaseResources();
		return dest;
	}
	
	/**
	 * 处理object[]类型的转换
	 * @param type
	 * @param objects
	 */
	private static Object[] typeInObjectArray(String types , DataInputStream input) {
		try{
			String tempTypes = types.substring(1,types.length()-1);
			int size = input.readShort(); //数组长度
			Object[] objects = new Object[size];
			int startIndex = tempTypes.indexOf("[");
			String arrayStr = "";
			//判断数组里面是否还有其它数组
			if(startIndex != -1){
				int endStart = tempTypes.lastIndexOf("]");
				arrayStr = tempTypes.substring(startIndex) + tempTypes.substring(startIndex,endStart+1);
				tempTypes = tempTypes.substring(0,startIndex) + "array" + tempTypes.substring(endStart+1);
			}
			
			String[] typeArrays = tempTypes.split("-");
			for(int i=0 ; i<size ; i++){
				Object[] temp = new Object[typeArrays.length];
				for(int j=0 ; j<temp.length ; j++){
					String type = typeArrays[j];
					if("B".equals(type)){
						temp[j] = input.readByte();
					}else if("I".equals(type)){
						temp[j] = input.readInt();
					}else if("S".equals(type)){
						temp[j] = input.readShort();
					}else if("L".equals(type)){
						temp[j] = input.readLong();
					}else if("U".equals(type)){
						temp[j] = input.readUTF();
					}else if("array".equals(type)){
						temp[j] = typeInObjectArray(arrayStr,input);
					}
				}
				
				if(typeArrays.length == 1){
					objects[i] = temp[0]; //单个对象
				}else{
					objects[i] = temp; //数组对象
				}
			}
			return objects;
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}
}
