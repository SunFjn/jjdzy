package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_747_神将狂欢.xlsx
 */
public class Struct_sjkh_747 {
    /**序号
	 * Windows 用户:
	 * 任务类型
	 * 1xx：指定品质武将激活一定数量
	 * 2xx：指定品质武将总星级达到一定星级*/
    private int id;
    /**品质
	 * Windows 用户:
	 * 武将品质*/
    private int pinzhi;
    /**参数*/
    private int canshu;
    /**达标奖励*/
    private int[][] dabiao;
    /**限量奖励*/
    private int[][] xianliang;
    /**限量奖励数量*/
    private int shuliang;
    /**监控ID*/
    private int jiankong;
    /**
     * 序号
	 * Windows 用户:
	 * 任务类型
	 * 1xx：指定品质武将激活一定数量
	 * 2xx：指定品质武将总星级达到一定星级
     */
    public int getId() {
        return id;
    }
    /**
     * 品质
	 * Windows 用户:
	 * 武将品质
     */
    public int getPinzhi() {
        return pinzhi;
    }
    /**
     * 参数
     */
    public int getCanshu() {
        return canshu;
    }
    /**
     * 达标奖励
     */
    public int[][] getDabiao() {
        return dabiao;
    }
    /**
     * 限量奖励
     */
    public int[][] getXianliang() {
        return xianliang;
    }
    /**
     * 限量奖励数量
     */
    public int getShuliang() {
        return shuliang;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_sjkh_747(int id,int pinzhi,int canshu,String dabiao,String xianliang,int shuliang,int jiankong) {
        this.id = id;
        this.pinzhi = pinzhi;
        this.canshu = canshu;
        this.dabiao = ExcelJsonUtils.toObj(dabiao,int[][].class);
        this.xianliang = ExcelJsonUtils.toObj(xianliang,int[][].class);
        this.shuliang = shuliang;
        this.jiankong = jiankong;
    }
}