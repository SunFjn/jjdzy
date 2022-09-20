package com.teamtop.netty.util.nettyCache;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.FileInputStream;
import java.lang.reflect.Method;
import java.net.URLDecoder;

import org.apache.commons.lang3.StringUtils;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

public class ProtocolInvoke extends AbsServerEvent {
	/**
	 * 加入协议号到对应的协议字段
	 * @param cmdId 协议号
	 * @param protocalStr 协议字段字符串
	 * @throws RunServerException 
	 */
	public static void addCmdToProtocal(Integer cmdId,String protocalStr) throws RunServerException{
		Object[] proListToArr = null;
		if(StringUtils.isBlank(protocalStr)){
			proListToArr = new Object[0];
		}else{
			Node strToNode = NodeUtil.strToNode(protocalStr);
			proListToArr = NodeUtil.nodeToArr(strToNode);
		}
		NettyCache.cmd2ProtocalMap.put(cmdId, proListToArr);
	}

	@Override
	public void startServer() throws RunServerException {
		String proPath = "protocol.pro";
		FileInputStream fis;
		try {
			fis = new FileInputStream(URLDecoder.decode((ProtocolInvoke.class.getResource("/"+proPath).getFile()),"UTF-8"));
			DataInputStream input = new DataInputStream(fis);
			int len = input.readShort();
			for(int i=0;i<len;i++){
				int cmdId = input.readShort();
				String field = input.readUTF();
				addCmdToProtocal(cmdId, field);
			}
			addOtherCmd();
			input.close();
			fis.close();
			//初始化GC通讯的字段传输中,传输类型对应到的写方法,如I为writeInt,S为writeShort,U为writeUTF,B为writeByte
			initWriteDataToMethod();
		} catch (Exception e) {
			throw new RunServerException(e,"initProtocal");
		}
		
	}
	
	private void addOtherCmd() throws RunServerException {
		addCmdToProtocal(20100, "I-B");//公共 系统关闭
		
		addCmdToProtocal(20011, "B");
		addCmdToProtocal(20012, "B-I-[S]");
		addCmdToProtocal(20013, "S");
		addCmdToProtocal(20014, "B");

		addCmdToProtocal(20001, "B");
		addCmdToProtocal(20002, "B-B-[I-I]");
		addCmdToProtocal(20004, "I");
	}
	
	/**
	 * 初始化GC通讯的字段传输中,传输类型对应到的写方法,如I为writeInt,S为writeShort,U为writeUTF,B为writeByte
	 * @throws Exception 异常,往外抛
	 */
	public void initWriteDataToMethod() throws Exception{
		Class<DataOutputStream> clazz = DataOutputStream.class;
		Method writeInt = clazz.getMethod("writeInt",int.class);
		Method writeShort = clazz.getMethod("writeShort",int.class);
		Method writeUTF = clazz.getMethod("writeUTF",String.class);
		Method writeByte = clazz.getMethod("writeByte",int.class);
		Method writeLong = clazz.getMethod("writeDouble",double.class);
		NettyCache.writeInvokeMethodMap.put(1, writeByte);
		NettyCache.writeInvokeMethodMap.put(2, writeShort);
		NettyCache.writeInvokeMethodMap.put(3, writeInt);
		NettyCache.writeInvokeMethodMap.put(4, writeLong);
		NettyCache.writeInvokeMethodMap.put(5, writeUTF);
		
	}
	public static void main(String[] args) {
		
		long id = 12345678901345l;
		double idd = id;
		System.err.println(id+","+idd);
	}
}
