package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * A_313_APP推送表.xlsx
 */
public class Struct_appts_313 {
    /**索引id*/
    private int id;
    /**活动名字*/
    private String name;
    /**活动id*/
    private int hdid;
    /**初始开关
	 * 1：默认开启
	 * 0：默认关闭
	 * */
    private int kg;
    /**消息推送标题*/
    private String bt;
    /**消息推送内容1
	 * 推送内容轮流更换
	 * 0则不参与更换
	 * */
    private String nr1;
    /**消息推送内容2*/
    private String nr2;
    /**消息推送内容3*/
    private String nr3;
    /**消息推送内容4*/
    private String nr4;
    /**开服第几天开启
	 * 0：不开启
	 * 【A,B】：开服第A天和第B天开启*/
    private int[] day;
    /**开服天数阈值
	 * N：开服天数阈值
	 * 开服天数大于等于N，读【开启星期】；
	 * 开服天数小于N，则读【开服第几天开启】
	 * 
	 * */
    private int yz;
    /**开启星期*/
    private int[] week;
    /**推送时间1*/
    private String time1;
    /**是否合并*/
    private int hb;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 活动名字
     */
    public String getName() {
        return name;
    }
    /**
     * 活动id
     */
    public int getHdid() {
        return hdid;
    }
    /**
     * 初始开关
	 * 1：默认开启
	 * 0：默认关闭
	 * 
     */
    public int getKg() {
        return kg;
    }
    /**
     * 消息推送标题
     */
    public String getBt() {
        return bt;
    }
    /**
     * 消息推送内容1
	 * 推送内容轮流更换
	 * 0则不参与更换
	 * 
     */
    public String getNr1() {
        return nr1;
    }
    /**
     * 消息推送内容2
     */
    public String getNr2() {
        return nr2;
    }
    /**
     * 消息推送内容3
     */
    public String getNr3() {
        return nr3;
    }
    /**
     * 消息推送内容4
     */
    public String getNr4() {
        return nr4;
    }
    /**
     * 开服第几天开启
	 * 0：不开启
	 * 【A,B】：开服第A天和第B天开启
     */
    public int[] getDay() {
        return day;
    }
    /**
     * 开服天数阈值
	 * N：开服天数阈值
	 * 开服天数大于等于N，读【开启星期】；
	 * 开服天数小于N，则读【开服第几天开启】
	 * 
	 * 
     */
    public int getYz() {
        return yz;
    }
    /**
     * 开启星期
     */
    public int[] getWeek() {
        return week;
    }
    /**
     * 推送时间1
     */
    public String getTime1() {
        return time1;
    }
    /**
     * 是否合并
     */
    public int getHb() {
        return hb;
    }
    public Struct_appts_313(int id,String name,int hdid,int kg,String bt,String nr1,String nr2,String nr3,String nr4,String day,int yz,String week,String time1,int hb) {
        this.id = id;
        this.name = name;
        this.hdid = hdid;
        this.kg = kg;
        this.bt = bt;
        this.nr1 = nr1;
        this.nr2 = nr2;
        this.nr3 = nr3;
        this.nr4 = nr4;
        this.day = ExcelJsonUtils.toObj(day,int[].class);
        this.yz = yz;
        this.week = ExcelJsonUtils.toObj(week,int[].class);
        this.time1 = time1;
        this.hb = hb;
    }
}