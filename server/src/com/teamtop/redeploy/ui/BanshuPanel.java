package com.teamtop.redeploy.ui;

import io.netty.channel.Channel;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Container;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.File;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextPane;
import javax.swing.border.Border;
import javax.swing.text.BadLocationException;
import javax.swing.text.SimpleAttributeSet;
import javax.swing.text.StyleConstants;
import javax.swing.text.StyledDocument;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.groovy.GroovyCache;
import com.teamtop.houtaiHttp.events.log.LogCache;
import com.teamtop.redeploy.RedeployClientCache;
import com.teamtop.redeploy.RedeployClientFunction;
import com.teamtop.redeploy.RedeployEnum;
import com.teamtop.redeploy.cross.RedeployClientToServer;
import com.teamtop.util.file.FileUtils;

/**
 * 版署panel
 * 
 * @author Administrator
 *
 */
public class BanshuPanel {
	private static int zone;
	/**	 * 手型鼠标	 */
	public Cursor HAND_CURSOR = new Cursor(Cursor.HAND_CURSOR);
	/**	 * 执行按钮	 */
	public JButton btn;
	/**	 * 发送按钮  临时按钮1	 */
	public JButton btSend;
	/**	 * 临时按钮2	 */
	public JButton btTemp2;
	/**	 * 结果 临时按钮3	 */
	public JButton btTemp3;
	/**	 * 消息文本域	 */
	public JTextPane jTextPane = new JTextPane();
	/**	 * 属性值	 */
	public SimpleAttributeSet keyword;
	/**	 * 样式文档	 */
	public StyledDocument doc;
	/**	 * 运行时显示info	 */
	private JLabel infoLabel;
	/**	 * 功能列表	 */
	private JComboBox<NameWithURLS> nameUrlMap = new JComboBox<NameWithURLS>();
	/**	 * 临时列表1	 */
	private JComboBox<NameWithURLS> temp1ComboBoxs = new JComboBox<NameWithURLS>();
	private boolean hotuiopen =false;
	
	
	public static int getZone() {
		return zone;
	}
	public static void setZone(int zone) {
		BanshuPanel.zone = zone;
	}
	public BanshuPanel() {
		btn = new JButton("执行");
		btSend = new JButton("发送、执行");
		btTemp2 = new JButton("时间");
		btTemp3 = new JButton("结果");
	}
	/**
	 * Excel 数据检测面板
	 * @return 面板对象
	 */
	public JPanel mainExcelPanel() {
		JPanel panel = new JPanel(new BorderLayout());
		panel.add(selectArea(), BorderLayout.NORTH);
		panel.add(infoArea(), BorderLayout.SOUTH);
		return panel;
	}

	/**
	 * 
	 * @return
	 */
	private JPanel infoArea() {
		JPanel panel = new JPanel();
		Border border = BorderFactory.createLineBorder(Color.GRAY);
		jTextPane.setBorder(border);
		jTextPane.setEditable(false);
		doc = jTextPane.getStyledDocument();
		keyword = new SimpleAttributeSet();

		StyleConstants.setBackground(keyword, Color.WHITE);

		JScrollPane scroll = new JScrollPane();
		scroll.getViewport().add(jTextPane);
		scroll.setOpaque(false);
		scroll.getViewport().setOpaque(false);
		scroll.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		scroll.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
		// 设置滚动条控制的面板的大小
		scroll.setPreferredSize(new Dimension(1000, 480));//里面信息框大小
		panel.add(scroll);
		return panel;
	}

	private JPanel selectArea() {
		JPanel panel = getInfoLabel();
//		panel.add(getInfoLabel());
		setActionListener();
		
		
//		panel.add(btn);

		return panel;
	}

	private JPanel getInfoLabel() {
		JPanel panel = new JPanel();
		JPanel pSelect = new JPanel();
		nameUrlMap.addItem(new NameWithURLS("版本号", RedeployEnum.version.name()));
		nameUrlMap.addItem(new NameWithURLS("重启", RedeployEnum.reboot.name()));
		nameUrlMap.addItem(new NameWithURLS("热更", RedeployEnum.hotswap.name()));
		nameUrlMap.addItem(new NameWithURLS("热更子服", RedeployEnum.hotswapByZID.name()));
		nameUrlMap.addItem(new NameWithURLS("热更结果", RedeployEnum.hotswapByZIDCheck.name()));
		nameUrlMap.addItem(new NameWithURLS("脚本", RedeployEnum.groovy.name()));
		nameUrlMap.addItem(new NameWithURLS("脚本子服", RedeployEnum.groovyByZID.name()));
		nameUrlMap.addItem(new NameWithURLS("脚本结果", RedeployEnum.groovyByZIDCheck.name()));
		nameUrlMap.addItem(new NameWithURLS("便捷式脚本", RedeployEnum.GROOVY_CONVENIENT.name()));
		nameUrlMap.addItem(new NameWithURLS("统计报错", RedeployEnum.LOG_EXCEPTION.name()));
		nameUrlMap.addItem(new NameWithURLS("服务端(未开启)", RedeployEnum.server.name()));
//		nameUrlMap.addItem(new NameWithURLS("客户端", RedeployEnum.client.name()));
		nameUrlMap.setPreferredSize(new Dimension(120, 30));//1:选框宽度  2:选框高度
		nameUrlMap.setMaximumRowCount(16);//显示数量
		pSelect.add(nameUrlMap);
		panel.add( pSelect, BorderLayout.CENTER);
		
		panel.add(btn, BorderLayout.EAST);
		panel.add(btSend, BorderLayout.EAST);
		panel.add(btTemp2, BorderLayout.EAST);
		btSend.setVisible(false);
		btTemp2.setVisible(false);

		panel.add(temp1ComboBoxs, BorderLayout.EAST);
		temp1ComboBoxs.setVisible(false);
		
		infoLabel = new JLabel("", JLabel.LEFT);
		infoLabel.setForeground(Color.GRAY);//Color.GRAY
		infoLabel.setPreferredSize(new Dimension(350, 30));//文字显示的宽、高
		infoLabel.setText(" ");
		panel.add( infoLabel);
		
		panel.add(btTemp3, BorderLayout.NORTH);
		btTemp3.setVisible(false);
		
		return panel;
	}

	/**
	 * 添加监听
	 */
	private void setActionListener() {
		nameUrlMap.addItemListener(new ItemListener() {
			@Override
			public void itemStateChanged(ItemEvent e) {
				if (e.getStateChange() == ItemEvent.SELECTED) {
					NameWithURLS url = (NameWithURLS) nameUrlMap.getSelectedItem();
					MainFrame.updateInfoLabel("", zone);
//					updateInfo("已选择");
					updateInfo(" ");
					updateInfo("###################    选中：" + url.getName() + "   ##################");
					String type = url.getUrl();
					btn.setText("执行");
					btSend.setVisible(false);
					temp1ComboBoxs.setVisible(false);
					btTemp2.setVisible(false);
					btTemp3.setVisible(false);
					if (type.equals(RedeployEnum.hotswap.name())) {
//						new HotswapDialog();
					}else if(type.equals(RedeployEnum.GROOVY_CONVENIENT.name())){
						btn.setText("选区");
						btSend.setVisible(true);
						MainFrame.updateInfoLabel("  连接区："+GroovyCache.getZidSelect(), zone);
					}else if(type.equals(RedeployEnum.LOG_EXCEPTION.name())){
						btn.setText("选区");
						btSend.setVisible(true);
						btTemp3.setVisible(true);

						temp1ComboBoxs.removeAllItems();
						temp1ComboBoxs.addItem(new NameWithURLS("console.log", RedeployEnum.LOG_CONSOLE.name()));
						temp1ComboBoxs.addItem(new NameWithURLS("info+warn+err", RedeployEnum.LOG_INFO_WARN_ERR.name()));
						temp1ComboBoxs.setVisible(true);
						MainFrame.updateInfoLabel("  连接区："+GroovyCache.getZidSelect(), zone);
					}
				}

			}
		});
		btn.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				new Thread(new Runnable() {
					@Override
					public void run() {
						btn.setEnabled(false);
						Channel crossChannel = RedeployClientCache.getClients().get(zone).getCrossChannel();
						if (crossChannel == null || !crossChannel.isActive()) {
							updateErrInfo("服务器没连接");
							btn.setEnabled(true);
							return;
						}
						updateInfo("-------------------------------------------------------------------------------------------");
						updateInfo("开始执行");
						NameWithURLS url = (NameWithURLS) nameUrlMap.getSelectedItem();
						temp1ComboBoxs.setVisible(false);
						String type = url.getUrl();
						if (type.equals(RedeployEnum.server.name())) {
							RedeployClientFunction.deployServer(zone);
						} else if (type.equals(RedeployEnum.client.name())) {
							RedeployClientFunction.deployClient(zone);
						} else if (type.equals(RedeployEnum.reboot.name())) {
							RedeployClientFunction.reboot(zone);
						} else if (type.equals(RedeployEnum.hotswap.name())) {
							RedeployClientFunction.hotswap(zone);
						} else if (type.equals(RedeployEnum.hotswapByZID.name())) {
							RedeployClientFunction.hotswapByZID(zone);
						} else if (type.equals(RedeployEnum.hotswapByZIDCheck.name())) {
							RedeployClientFunction.hotswapByZIDCheck(zone);
						} else if (type.equals(RedeployEnum.groovy.name())) {
							RedeployClientFunction.groovy(zone);//脚本 groovy
						} else if (type.equals(RedeployEnum.groovyByZID.name())) {
							RedeployClientFunction.groovyByZID(zone);
						} else if (type.equals(RedeployEnum.groovyByZIDCheck.name())) {
							RedeployClientFunction.groovyByZIDCheck(zone);
						} else if (type.equals(RedeployEnum.GROOVY_CONVENIENT.name())) {
							RedeployClientFunction.groovyConvenient(zone);
						} else if (type.equals(RedeployEnum.version.name())) {
							RedeployClientFunction.getVersion(zone);
						} else if (type.equals(RedeployEnum.LOG_EXCEPTION.name())) {
							temp1ComboBoxs.setVisible(true);
							RedeployClientFunction.logException(zone);
						}
						btn.setEnabled(true);
					}
				}).start();
			}
		});

		btSend.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				new Thread(new Runnable() {
					@Override
					public void run() {
						btSend.setEnabled(false);
						Channel crossChannel = RedeployClientCache.getClients().get(zone).getCrossChannel();
						if (crossChannel == null || !crossChannel.isActive()) {
							updateErrInfo("服务器没连接");
							btSend.setEnabled(true);
							return;
						}
						updateInfo("-------------------------------------------------------------------------------------------");
						updateInfo("开始发送");
						NameWithURLS urlFunction = (NameWithURLS) nameUrlMap.getSelectedItem();
						NameWithURLS temp1 = (NameWithURLS) temp1ComboBoxs.getSelectedItem();
						String typeFunction = urlFunction.getUrl();
						if (typeFunction.equals(RedeployEnum.GROOVY_CONVENIENT.name())) {
							RedeployClientFunction.groovyConvenientSend(zone);
						} else if (typeFunction.equals(RedeployEnum.LOG_EXCEPTION.name())) {
							RedeployClientToServer.initExceptionNumCS(zone, temp1.getName(), LogCache.getTimeStr(), GroovyCache.getZidSelect());
						}
						btSend.setEnabled(true);
					}
				}).start();
			}
		});
		
		temp1ComboBoxs.addItemListener(new ItemListener() {
			@Override
			public void itemStateChanged(ItemEvent e) {
				if (e.getStateChange() == ItemEvent.SELECTED) {
					NameWithURLS urlTemp1 = (NameWithURLS) temp1ComboBoxs.getSelectedItem();
					MainFrame.updateInfoLabel("", zone);
					updateInfo("-------------------------------------------------------------------------------------------");
					updateInfo("选中：" + urlTemp1.getName());
					String typeTemp1 = urlTemp1.getUrl();
					btTemp2.setVisible(false);
					if (typeTemp1.equals(RedeployEnum.LOG_CONSOLE.name())) {
						MainFrame.updateInfoLabel("  连接区："+GroovyCache.getZidSelect(), zone);
					}else if(typeTemp1.equals(RedeployEnum.LOG_INFO_WARN_ERR.name())){
						btTemp2.setVisible(true);
						MainFrame.updateInfoLabel("  连接区："+GroovyCache.getZidSelect()+" 日期："+LogCache.getTimeStr(), zone);
					}
				}

			}
		});
		
		btTemp2.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				new Thread(new Runnable() {
					@Override
					public void run() {
						btTemp2.setEnabled(false);
						Channel crossChannel = RedeployClientCache.getClients().get(zone).getCrossChannel();
						if (crossChannel == null || !crossChannel.isActive()) {
							updateErrInfo("服务器没连接");
							btTemp2.setEnabled(true);
							return;
						}
						updateInfo("-------------------------------------------------------------------------------------------");
						NameWithURLS urlFunction = (NameWithURLS) nameUrlMap.getSelectedItem();
						String typeFunction = urlFunction.getUrl();
						if (typeFunction.equals(RedeployEnum.LOG_EXCEPTION.name())) {
							RedeployClientFunction.logExceptionSelTime(zone);
//						} else if (type.equals(RedeployEnum.client.name())) {
//							RedeployClientFunction.deployClient(zone);
						}
						btTemp2.setEnabled(true);
					}
				}).start();
			}
		});
		btTemp3.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				new Thread(new Runnable() {
					@Override
					public void run() {
						btTemp3.setEnabled(false);
						Channel crossChannel = RedeployClientCache.getClients().get(zone).getCrossChannel();
						if (crossChannel == null || !crossChannel.isActive()) {
							updateErrInfo("服务器没连接");
							btTemp3.setEnabled(true);
							return;
						}
						updateInfo("-------------------------------------------------------------------------------------------");
						NameWithURLS urlFunction = (NameWithURLS) nameUrlMap.getSelectedItem();
						String typeFunction = urlFunction.getUrl();
						if (typeFunction.equals(RedeployEnum.LOG_EXCEPTION.name())) {
							RedeployClientToServer.getExceptionNumResultCS(zone);
//						} else if (type.equals(RedeployEnum.client.name())) {
//							RedeployClientFunction.deployClient(zone);
						}
						btTemp3.setEnabled(true);
					}
				}).start();
			}
		});
	}

	/**
	 * 显示消息
	 * 
	 * @param msg
	 *            消息
	 * @param color
	 *            颜色
	 */
	private void showMessage(String msg, Color color) {
		StyleConstants.setForeground(keyword, color);
		try {
			doc.insertString(doc.getLength(), msg, keyword);
			jTextPane.setCaretPosition(doc.getLength());
			jTextPane.setPreferredSize(new Dimension(490, 200));
		} catch (BadLocationException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 更新错误消息
	 * 
	 * @param message
	 */
	public void updateErrInfo(String message) {
		showMessage("警报：" + message + "\n", Color.RED);
	}

	/**
	 * 更新普通消息
	 * 
	 * @param message
	 */
	public void updateInfo(String message) {
		showMessage(message + "\n", Color.BLACK);
	}
	/*class HotswapDialog extends JFrame implements ActionListener {
		private static final long serialVersionUID = 1L;
		JPanel p1 = new JPanel(), p2 = new JPanel();
		JTextArea ta = new JTextArea("请输入热更注释：10字以上");
		JButton ok = new JButton("ok");
		HotswapDialog() {
			setTitle("热更");
			Container c = getContentPane();
			this.setSize(500, 400);
			this.setLocationRelativeTo(null);
			p1.setPreferredSize(new Dimension(100, 50));
			c.add("Center", p1);
			c.add("South", p2);
			p1.add(ta);
			p2.add(ok);
			ok.addActionListener(this);
			setVisible(true);
		}

		public void actionPerformed(ActionEvent e) {
			System.err.println(e.getActionCommand());
			if (e.getSource() == ok) {
				updateInfo("热更注释："+ta.getText());
				if(ta.getText().length()<10){
					updateErrInfo("热更注释请大于10字");
					return;
				}
				String tmpPath = "F:\\newfile\\desc.txt";
				File file = new File(tmpPath);
				if (file != null && file.exists()) {
					FileUtils.deleteFile(tmpPath);
				}
				FileUtils.writeData(tmpPath, ta.getText());
				try {
					Thread.sleep(200);
				} catch (InterruptedException e1) {
					e1.printStackTrace();
				}
				RedeployClientFunction.hotswap(zone);
			}
			dispose();
		}

	}*/
	
	class HotswapDesc implements ActionListener {

		JFrame jf;
		JPanel jpanel;
		JButton ok;
		JTextArea jta = null;
		JScrollPane jscrollPane;
		boolean texted = false;

		public HotswapDesc() {
			jf = new JFrame("热更");
			Container contentPane = jf.getContentPane();
			contentPane.setLayout(new BorderLayout());
			jta = new JTextArea(10, 15);
			jta.setText("少年，10字以上");
			jta.setTabSize(4);
			jta.setFont(new Font("标楷体", Font.BOLD, 16));
			jta.setLineWrap(true);// 激活自动换行功能
			jta.setWrapStyleWord(true);// 激活断行不断字功能

			jscrollPane = new JScrollPane(jta);
			jpanel = new JPanel();
			jpanel.setLayout(new GridLayout(1, 3));

			ok = new JButton("确认");
			ok.addActionListener(this);

			jpanel.add(ok);

			contentPane.add(jscrollPane, BorderLayout.CENTER);
			contentPane.add(jpanel, BorderLayout.SOUTH);

			jf.setSize(400, 300);
//			jf.setLocation(400, 200);
			jf.setLocationRelativeTo(null);
			jf.setVisible(true);
			jf.addWindowListener(new WindowAdapter() {
				public void windowClosing(WindowEvent e) {
					hotuiopen = false;
				}
			});
			jta.addMouseListener(new MouseListener() {
				@Override
				public void mouseReleased(MouseEvent e) {
				}
				@Override
				public void mousePressed(MouseEvent e) {
					if(!texted){
						texted = true;
						jta.setText("");
					}
				}
				@Override
				public void mouseExited(MouseEvent e) {
				}
				@Override
				public void mouseEntered(MouseEvent e) {
				}
				@Override
				public void mouseClicked(MouseEvent e) {
				}
			});
		}

		// 覆盖接口ActionListener的方法actionPerformed
		public void actionPerformed(ActionEvent e) {
			if (e.getSource() == ok) {
				updateInfo("热更注释："+jta.getText());
				if(jta.getText().length()<10){
					updateErrInfo("热更注释请大于10字");
					return;
				}
				jf.dispose();
				hotuiopen = false;
				String tmpPath = GameProperties.hotswapDir + File.separator + "newfile" + File.separator + "desc.txt";
//				String tmpPath = "F:\\newfile\\desc.txt";
				File file = new File(tmpPath);
				if (file != null && file.exists()) {
					FileUtils.deleteFile(tmpPath);
					System.out.println("移除desc.txt，path:"+tmpPath);
				}
				FileUtils.writeData(tmpPath, jta.getText());
				System.out.println("生成desc.txt");
				try {
					Thread.sleep(200);
				} catch (InterruptedException e1) {
					e1.printStackTrace();
				}
				RedeployClientFunction.hotswap(zone);
			}
		}
	}
	
	/**
	 * 设置更新消息
	 * @param msg
	 */
	public void updateInfoLabel(String msg) {
		infoLabel.setText("  " + msg);
	}
}
