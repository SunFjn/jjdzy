package com.teamtop.util.communication.io;

/**
 * 响应对象工厂
 * @author syp
 *
 */
public class ResponseFactory {

	/**
	 * 创建响应对象
	 * @param cmd 命令器
	 * @param flag 命令成功或失败标识
	 * @return
	 */
	public static Response createResponse(int cmd , int flag){
		Response response = new Response();
		response.setCmd(cmd);
		response.setFlag(flag);
		return response;
	}
	
	/**
	 * 创建响应对象（不包含成功或失败标识）
	 * @param cmd
	 * @return
	 */
	public static Response createResponse(int cmd){
		return createResponse(cmd,Response.NULL_FLAG);
	}
	
	/**
	 * 创建响应对象
	 * @param cmd
	 * @param result
	 * @return
	 */
	public static Response createResponse(int cmd,Object result){
		Response response = new Response();
		response.setCmd(cmd);
		response.setResult(result);
		return response;
	}
}
