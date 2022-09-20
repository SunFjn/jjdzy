package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_218_商城表.xlsx
 */
public class Struct_stroe_218 {
    /**商店id*/
    private int id;
    /**商店类型
	 * 微软用户:
	 * 1 神秘商店
	 * 2 声望商店
	 * 3 VIP商店*/
    private int store;
    /**是否每日0点自动刷新
	 * Administrator:
	 * 1：是
	 * 0：否*/
    private int auto;
    /**是否可以手动刷新
	 * Administrator:
	 * 1：是
	 * 0：否
	 * */
    private int hand;
    /**刷新消耗*/
    private int[][] consume;
    /**背景图*/
    private int pic;
    /**
     * 商店id
     */
    public int getId() {
        return id;
    }
    /**
     * 商店类型
	 * 微软用户:
	 * 1 神秘商店
	 * 2 声望商店
	 * 3 VIP商店
     */
    public int getStore() {
        return store;
    }
    /**
     * 是否每日0点自动刷新
	 * Administrator:
	 * 1：是
	 * 0：否
     */
    public int getAuto() {
        return auto;
    }
    /**
     * 是否可以手动刷新
	 * Administrator:
	 * 1：是
	 * 0：否
	 * 
     */
    public int getHand() {
        return hand;
    }
    /**
     * 刷新消耗
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 背景图
     */
    public int getPic() {
        return pic;
    }
    public Struct_stroe_218(int id,int store,int auto,int hand,String consume,int pic) {
        this.id = id;
        this.store = store;
        this.auto = auto;
        this.hand = hand;
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.pic = pic;
    }
}