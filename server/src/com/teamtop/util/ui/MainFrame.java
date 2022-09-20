package com.teamtop.util.ui;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Image;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.util.Iterator;
import java.util.Map;

import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextPane;
import javax.swing.border.Border;
import javax.swing.text.BadLocationException;
import javax.swing.text.SimpleAttributeSet;
import javax.swing.text.StyleConstants;
import javax.swing.text.StyledDocument;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.global.GlobalFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;



public class MainFrame extends JFrame {
	private static final long serialVersionUID = 1L;
	//消息文本域
	private final static JTextPane jTextPane = new JTextPane();
	/*//所选文件夹位置
	private final static JTextField textField = new JTextField(10);*/
	//选择文件夹按钮点击事件
	private final static JButton checkOnlineButton = new JButton("检测在线");
	//执行按钮
	private final static JButton broadCloseButton = new JButton("广播关闭服务器");
	private static MainFrame mainFrame;
	//样式文档
	private StyledDocument doc;
	//属性值
	private SimpleAttributeSet keyword;
	//运行时显示info
	private JLabel infoLabel;

	private MainFrame(){
		initFrame();
	}
	
	/**
	 * 获取对象
	 * @return
	 */
	public static MainFrame getInstance(){
		if(mainFrame == null) {
			mainFrame = new MainFrame();
		}
		return mainFrame;
	}

	/**
	 * 初始化界面
	 */
	public void initFrame() {
		this.setName(GameProperties.uiTitle);
		this.setTitle(GameProperties.uiTitle);
		this.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
		Image image = new ImageIcon(this.getClass().getResource("/").getFile()+ "/icon.png").getImage();
		this.setIconImage(image);
		this.add(addPanel());
		this.setVisible(true);
		this.setSize(500, 300);
		this.setLocationRelativeTo(null);
		this.setResizable(false);
		//关闭窗口操作
		this.addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				closeWindow();
				
			}
			
			public void windowClosed(WindowEvent e) {
//				JOptionPane.showOptionDialog(null, "已经成功退出啦！", "", JOptionPane.CLOSED_OPTION, JOptionPane.CLOSED_OPTION, null, null, null);//.showConfirmDialog(null,"程序已经退出啦","已经退出", JOptionPane.YES_NO_OPTION);
				System.exit(0);
			}
		});
	}
	
	/**
	 * 运行时关闭窗口
	 */
	public void closeWindow() {
//		if(isRunning){
			int result = JOptionPane.showConfirmDialog(null,"正在运行中，确定要退出？","确认退出", JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE);
			if(result == JOptionPane.YES_OPTION) {
				this.dispose();
			}
//		}else{
//			this.dispose();
//			//System.exit(0);
//		}
	}

	/**
	 * 添加面板
	 * @return
	 */
	private JComponent addPanel() {
		JPanel panel = new JPanel(new BorderLayout());
		panel.add(selectArea(), BorderLayout.NORTH);
		panel.add(infoArea(), BorderLayout.SOUTH);
		return panel;
	}

	/**
	 * 北边区域，操作区域
	 * @return
	 */
	private JComponent selectArea() {
		JPanel panel = new JPanel();
		panel.setPreferredSize(new Dimension(500, 50));
		checkOnlineButton.setPreferredSize(new Dimension(90, 35));
		broadCloseButton.setPreferredSize(new Dimension(125, 35));
		panel.add(checkOnlineButton);
		panel.add(broadCloseButton);
		//检查在线
		checkOnlineButton.addMouseListener(new MouseAdapter(){
			@Override
			public void mouseClicked(MouseEvent e) {
				checkOnlineButton.setEnabled(false);
				Map<Long, Hero> heroMap = HeroCache.getHeroMap();
				int count = 0;
				HeroFunction heroFunction = HeroFunction.getIns();
				Iterator<Long> ite = heroMap.keySet().iterator();
				while(ite.hasNext()) {
					long hid = ite.next();
					if(heroFunction.isOnline(hid)) {
						count ++;
					}
				}
				checkOnlineButton.setEnabled(true);
				JOptionPane.showConfirmDialog(MainFrame.getInstance(), "当前在线人数为:" + count, "在线人数", JOptionPane.CLOSED_OPTION, JOptionPane.DEFAULT_OPTION);
			}
		});
		//关服
		broadCloseButton.addMouseListener(new MouseAdapter(){
			@Override
			public void mouseClicked(MouseEvent e) {
				GlobalFunction.getIns().noticeAll("服务器即将关闭,该干嘛干嘛!");
			}
		});
		//textField.setSize(125, 30);
//		Border border = BorderFactory.createLineBorder(new Color(170,199,189));
//		path = Setting.getProperty("export_path");
		
		//执行
//		execButton.addMouseListener(new MouseAdapter() {
//			@Override
//			public void mouseClicked(MouseEvent e) {
//				System.exit(0);
//			}
//		});
//		panel.add(execButton);
//		panel.setBackground(new Color(234, 234, 234));
		return panel;
	}

	@SuppressWarnings("unused")
	private JPanel getInfoLabel() {
		JPanel panel = new JPanel();
		panel.setLayout(new FlowLayout(FlowLayout.LEFT));
		panel.setPreferredSize(new Dimension(500, 20));
		infoLabel = new JLabel("",JLabel.LEFT);
		infoLabel.setForeground(Color.GRAY);
		infoLabel.setText("  ");
		panel.add(infoLabel);
		return panel;
	}

	/**
	 * 南边区域，信息输出区域
	 * @return
	 */
	private JComponent infoArea() {
		JPanel panel = new JPanel();
//		panel.setPreferredSize(new Dimension(500,200));
		Border border = BorderFactory.createLineBorder(Color.GRAY);
		jTextPane.setBorder(border);
		jTextPane.setEditable(false);
		//无需设置JTextPane大小，直接设置JScrollPane大小
		//jTextPane.setPreferredSize(new Dimension(490,190));
		doc = jTextPane.getStyledDocument();
		keyword = new SimpleAttributeSet();
		
		StyleConstants.setBackground(keyword, Color.WHITE);
		
		JScrollPane scroll = new JScrollPane(/*jTextPane*/);
		//将JTextPane添加到JScrollPane中，无需再添加到JPanle中
		scroll.getViewport().add(jTextPane);
		scroll.setOpaque(false);
		scroll.getViewport().setOpaque(false);
		scroll.setHorizontalScrollBarPolicy(
				JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		scroll.setVerticalScrollBarPolicy(
				JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
//		panel.add(jTextPane);
		//设置滚动条控制的面板的大小
		scroll.setPreferredSize(new Dimension(490,200));
		panel.add(scroll);
		return panel;
	}
	
	/**
	 * 更新普通消息
	 * @param message
	 */
	public void updateInfo(String message,Color color) {
		/*jTextPane.setCaretColor(Color.BLACK);
		jTextPane.append(message);
		jTextPane.paintImmediately(jTextPane.getBounds());*/
		showMessage(message, color);
	}
	
	/**
	 * 更新错误消息
	 * @param message
	 */
	public void updateErrInfo(String message) {
		/*jTextPane.setCaretColor(Color.RED);
		jTextPane.append(message);
		jTextPane.paintImmediately(jTextPane.getBounds());*/
		showMessage(message, Color.RED);
		//假定所有的err信息都会导致程序不再往下执行
		changeExcuteBtnStatus();
	}
	
	/**
	 * 显示消息
	 * @param msg 消息
	 * @param color 颜色
	 */
	private void showMessage(String msg, Color color) {
		StyleConstants.setForeground(keyword, color);
		try {
			doc.insertString(doc.getLength(), msg, keyword);
			//System.out.println(doc.getLength());
			jTextPane.setCaretPosition(doc.getLength());
			jTextPane.setPreferredSize(new Dimension(490, 200));
			//jTextPane.repaint();
			//jTextPane.paintImmediately(jTextPane.getBounds());
		} catch (BadLocationException e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * 运行完成后将按钮设置成可用
	 */
	public void changeExcuteBtnStatus() {
//		execButton.setEnabled(true);
	}
	
	/**
	 * 开始运行时设置按钮为不可用
	 */
	public void startExcute(){
		//将执行组件设置为不可用
//		execButton.setEnabled(false);
	}
	
	/**
	 * 设置更新消息
	 * @param msg
	 */
	public void updateInfoLabel(String msg) {
		infoLabel.setText("  " + msg);
	}
	
	public static void main(String[] args) throws InterruptedException {
		MainFrame mainFrame = MainFrame.getInstance();
		mainFrame.initFrame();
		for(int i = 0; i < 100; i ++) {
			mainFrame.updateInfo("sdfsdf" + i + "\n",Color.BLACK);
			Thread.sleep(1000);
		}
	}
}

