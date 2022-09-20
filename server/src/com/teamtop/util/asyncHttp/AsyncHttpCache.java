package com.teamtop.util.asyncHttp;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.asyncHttp.events.UserInfoAsyncHttpCallback;

/**
 * 异步请求缓存
 * @author Administrator
 *
 */
public class AsyncHttpCache extends AbsServerEvent{
	private static Map<Integer, AbsAsyncHttpCallback> callbacks = new HashMap<Integer, AbsAsyncHttpCallback>();
	
	public static AbsAsyncHttpCallback getCallback(int cmd){
		return callbacks.get(cmd);
	}

	@Override
	public void startServer() throws RunServerException {
		callbacks.put(PHPConst.PLAYERINFO, new UserInfoAsyncHttpCallback());
	}
}
