package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * T_719_特权卡.xlsx
 */
public class Struct_tqk_719 {
    /**序号*/
    private int ID;
    /**每日奖励*/
    private int[][] jl;
    /**挂机经验
	 * 值为百分比
	 * 0不开启*/
    private int GUAJI;
    /**挂机铜钱
	 * jingyu:
	 * 值为百分比
	 * 0不开启*/
    private int TONGQIAN;
    /**双倍登录奖励
	 * jingyu:
	 * 0不开启
	 * 1开启*/
    private int DENGLU;
    /**双倍签到奖励
	 * jingyu:
	 * 0不开启
	 * 1开启*/
    private int QIANDAO;
    /**RMB*/
    private int COIN;
    /**商品ID*/
    private int shop;
    /**期限
	 * jingyu:
	 * 0：永久
	 * x（具体值）：限时
	 * 单位：秒
	 * */
    private int QIXIAN;
    /**监控ID*/
    private int jiankong;
    /**
     * 序号
     */
    public int getID() {
        return ID;
    }
    /**
     * 每日奖励
     */
    public int[][] getJl() {
        return jl;
    }
    /**
     * 挂机经验
	 * 值为百分比
	 * 0不开启
     */
    public int getGUAJI() {
        return GUAJI;
    }
    /**
     * 挂机铜钱
	 * jingyu:
	 * 值为百分比
	 * 0不开启
     */
    public int getTONGQIAN() {
        return TONGQIAN;
    }
    /**
     * 双倍登录奖励
	 * jingyu:
	 * 0不开启
	 * 1开启
     */
    public int getDENGLU() {
        return DENGLU;
    }
    /**
     * 双倍签到奖励
	 * jingyu:
	 * 0不开启
	 * 1开启
     */
    public int getQIANDAO() {
        return QIANDAO;
    }
    /**
     * RMB
     */
    public int getCOIN() {
        return COIN;
    }
    /**
     * 商品ID
     */
    public int getShop() {
        return shop;
    }
    /**
     * 期限
	 * jingyu:
	 * 0：永久
	 * x（具体值）：限时
	 * 单位：秒
	 * 
     */
    public int getQIXIAN() {
        return QIXIAN;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_tqk_719(int ID,String jl,int GUAJI,int TONGQIAN,int DENGLU,int QIANDAO,int COIN,int shop,int QIXIAN,int jiankong) {
        this.ID = ID;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
        this.GUAJI = GUAJI;
        this.TONGQIAN = TONGQIAN;
        this.DENGLU = DENGLU;
        this.QIANDAO = QIANDAO;
        this.COIN = COIN;
        this.shop = shop;
        this.QIXIAN = QIXIAN;
        this.jiankong = jiankong;
    }
}