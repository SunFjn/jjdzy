package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_001_系统开启表.xlsx
 */
public class Struct_xitong_001 {
    /**系统ID*/
    private int ID;
    /**系统名字*/
    private String name;
    /**系统图标*/
    private int icon;
    /**后端初始化*/
    private int[][] server;
    /**开服天数开启*/
    private int day;
    /**界面ID*/
    private int ui;
    /**层级*/
    private int ceng;
    /**关闭后打开UI*/
    private int close;
    /**IOS是否开启*/
    private int ios;
    /**
     * 系统ID
     */
    public int getID() {
        return ID;
    }
    /**
     * 系统名字
     */
    public String getName() {
        return name;
    }
    /**
     * 系统图标
     */
    public int getIcon() {
        return icon;
    }
    /**
     * 后端初始化
     */
    public int[][] getServer() {
        return server;
    }
    /**
     * 开服天数开启
     */
    public int getDay() {
        return day;
    }
    /**
     * 界面ID
     */
    public int getUi() {
        return ui;
    }
    /**
     * 层级
     */
    public int getCeng() {
        return ceng;
    }
    /**
     * 关闭后打开UI
     */
    public int getClose() {
        return close;
    }
    /**
     * IOS是否开启
     */
    public int getIos() {
        return ios;
    }
    public Struct_xitong_001(int ID,String name,int icon,String server,int day,int ui,int ceng,int close,int ios) {
        this.ID = ID;
        this.name = name;
        this.icon = icon;
        this.server = ExcelJsonUtils.toObj(server,int[][].class);
        this.day = day;
        this.ui = ui;
        this.ceng = ceng;
        this.close = close;
        this.ios = ios;
    }
}