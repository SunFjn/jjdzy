package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X-402_新活动vip折扣礼包表.xlsx
 */
public class Struct_xhdvip_402 {
    /**vip*/
    private int ID;
    /**现价
	 * [[最高价格,最低价格]]价格从这两个数字之间随机生成，元宝*/
    private int[][] money;
    /**原价
	 * 元宝*/
    private int[][] oldmoney;
    /**道具
	 * 道具种类可配置*/
    private int[][] item;
    /**购买次数*/
    private int time;
    /**
     * vip
     */
    public int getID() {
        return ID;
    }
    /**
     * 现价
	 * [[最高价格,最低价格]]价格从这两个数字之间随机生成，元宝
     */
    public int[][] getMoney() {
        return money;
    }
    /**
     * 原价
	 * 元宝
     */
    public int[][] getOldmoney() {
        return oldmoney;
    }
    /**
     * 道具
	 * 道具种类可配置
     */
    public int[][] getItem() {
        return item;
    }
    /**
     * 购买次数
     */
    public int getTime() {
        return time;
    }
    public Struct_xhdvip_402(int ID,String money,String oldmoney,String item,int time) {
        this.ID = ID;
        this.money = ExcelJsonUtils.toObj(money,int[][].class);
        this.oldmoney = ExcelJsonUtils.toObj(oldmoney,int[][].class);
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.time = time;
    }
}