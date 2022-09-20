package com.teamtop.util.surveillance;


import java.awt.AWTException;
import java.awt.Image;
import java.awt.MenuItem;
import java.awt.PopupMenu;
import java.awt.SystemTray;
import java.awt.Toolkit;
import java.awt.TrayIcon;
import java.awt.TrayIcon.MessageType;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;

/**
 * 天空之城控制台
 * @author lobbyer
 * @date 2014-2-21
 * @version 1.0
 *
 */
@SuppressWarnings("serial")
public class Console extends JFrame implements ActionListener {
	private JButton save;
	private JButton exit;
	private TrayIcon trayicon;


	public Console() {
		//initCompoenent();
		if (!SystemTray.isSupported()) {
			return;
		} else {
			SystemTray systemTray = SystemTray.getSystemTray();
			String title = "港澳台——剑刃传说新版本";
			String company = "";
			Image image = Toolkit.getDefaultToolkit().getImage(getClass().getResource("img.png"));
			trayicon = new TrayIcon(image, title, createMenu());
			trayicon.addActionListener(this);
			try {
				systemTray.add(trayicon);
				trayicon.displayMessage(title, company, MessageType.INFO);
			} catch (AWTException e) {
				e.printStackTrace();
			}
		}
	}
	
	private PopupMenu createMenu() {
		PopupMenu menu = new PopupMenu();
		MenuItem save = new MenuItem("save");
		save.addActionListener(new ActionListener(){//事件
			public void actionPerformed(ActionEvent e) {
				trayicon.displayMessage("djksjfs", "很烦的快速减肥", MessageType.INFO);
			}
		});
		MenuItem exit = new MenuItem("exit");
		exit.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ex) {
				System.exit(0);
			}
		});
		MenuItem open = new MenuItem("open");
		open.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent ex) {
				if (!isVisible()) {
					setVisible(true);
					toFront();
				} else {
					toFront();
				}
			}
		});
		menu.add(open);
		menu.addSeparator();
		menu.add(save);
		menu.add(exit);
		return menu;
	}

	@Override
	public void actionPerformed(ActionEvent ex) {
		Object source  = ex.getSource();
		if (source.equals(save)) {
			//保存数据
		}else if (source.equals(exit)) {
			//关闭服务器
			System.exit(0);
		}else if(source.equals(trayicon)){
			//打开面板
			/*if (!isVisible()) {
				setVisible(true);
				toFront();
			} else {
				toFront();
			}*/
			if(java.awt.Desktop.isDesktopSupported()){
	            try{
	                //创建一个URI实例,注意不是URL
	                java.net.URI uri=java.net.URI.create("http://www.jb51.net");
	                //获取当前系统桌面扩展
	                java.awt.Desktop dp=java.awt.Desktop.getDesktop();
	                //判断系统桌面是否支持要执行的功能
	                if(dp.isSupported(java.awt.Desktop.Action.BROWSE)){
	                    //获取系统默认浏览器打开链接
	                    dp.browse(uri);
	                }
	            }catch(java.lang.NullPointerException e){
	                //此为uri为空时抛出异常
	            }catch(java.io.IOException e){
	                //此为无法获取系统默认浏览器
	            }
	        }
		}

	}
	
	public static void openCosole() {
		new Console();
	}
	
	public static void main(String[] args) {
		new Console();
	}
}
