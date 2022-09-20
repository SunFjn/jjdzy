package com.teamtop.util.flashSecurity;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.ServerSocket;
import java.net.Socket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

public class SecurityXMLServer extends AbsServerEvent implements Runnable {
	private static final Logger logger = LoggerFactory.getLogger(SecurityXMLServer.class);
	private ServerSocket server;
	private BufferedReader reader;
	private BufferedWriter writer;
	private String xml;
	private int stop = 0;
	public static void main(String[] args) throws IOException {
		new SecurityXMLServer();
	}
	
	// 启动服务器
	private void createServerSocket() throws IOException {
		xml = "<cross-domain-policy>"
				+ "<allow-access-from domain=\"*\" to-ports=\"*\"/>"
				+ "</cross-domain-policy>\0";
		xml="<?xml version=\"1.0\"? encoding=\"UTF-8\"?>"
			+"<cross-domain-policy>"
			+"<allow-access-from domain=\"*\" />"
			+"<allow-access-from domain=\"*\" to-ports=\"*\" />"
			+"</cross-domain-policy>";
		
		// 启动843端口
		server = new ServerSocket(843);
	}

	// 启动服务器线程
	public void run() {
		while (true) {
			if (stop == 1)
				break;
			Socket client = null;
			try {
				// 接收客户端的连接
				client = server.accept();
				logger.debug(client.getInetAddress()+" start SecurityXML.....");
				InputStreamReader input = new InputStreamReader(
						client.getInputStream(), "UTF-8");
				reader = new BufferedReader(input);
				OutputStreamWriter output = new OutputStreamWriter(
						client.getOutputStream(), "UTF-8");
				writer = new BufferedWriter(output);
				// 读取客户端发送的数据
				StringBuilder data = new StringBuilder();
				int c = 0;
				while ((c = reader.read()) != -1) {
					if (c != '\0')
						data.append((char) c);
					else
						break;
				}
				String info = data.toString();
				// 接收到客户端的请求之后，将策略文件发送出去
				if (info.indexOf("<policy-file-request/>") >= 0) {
					writer.write(xml);
					writer.flush();
					logger.debug("843 send SecurityXML data to: " +client.getInetAddress());
				} else {
					writer.write("Quest Error \0");
					writer.flush();
					// System.out.println("请求无法识别: "+client.getInetAddress());
				}
				client.close();
				logger.info(client.getInetAddress()+" send SecurityXML...");
			} catch (Exception e) {
				logger.error("SecurityXML handler exception:",e);
				try {
					// 发现异常关闭连接
					if (client != null) {
						client.close();
						client = null;
					}
				} catch (IOException ex) {
					ex.printStackTrace();
				} finally {
					// 调用垃圾收集方法
					System.gc();
				}
			}
		}
	}

	public ServerSocket getServer() {
		return server;
	}

	public void setStop(int stop) {
		this.stop = stop;
	}
	@Override
	public void startServer() throws RunServerException {
		try {
			boolean isOpen = false;
			try {
				int security = 1;
				if(security==1){
					isOpen = true;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			if(isOpen){
				SecurityXMLServer securityXMLServer = new SecurityXMLServer();
				securityXMLServer.createServerSocket();
				new Thread(securityXMLServer).start();
			}
		} catch (Exception e) {
//			throw new RunServerException(e, "security xml err");
		}
	}
}
