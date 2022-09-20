package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_254_烽火狼烟表.xlsx
 */
public class Struct_fhly_254 {
    /**id
	 * 1 中央皇城
	 * 2 左上都城
	 * 3 左下都城
	 * 4 右上都城
	 * 5 右下都城
	 * 6 左上角卫城（蓝方）
	 * 7 左边卫城（蓝方）
	 * 8 左下角卫城（蓝方）
	 * 9 右上角卫城（红方）
	 * 10 右边卫城（红方）
	 * 11 右下角卫城（红方）_x000D_*/
    private int id;
    /**城池类型
	 * 1 皇城
	 * 2 都城
	 * 3 卫城_x000D_*/
    private int type;
    /**归属
	 * 0 无归属，可占领
	 * 1 归属左侧服，不可占领
	 * 2 归属右侧服，不可占领_x000D_*/
    private int gs;
    /**征收奖励*/
    private int[][] reward;
    /**征收积分*/
    private int potion;
    /**占领征收奖励*/
    private int[][] reward1;
    /**占领征收积分*/
    private int potion1;
    /**征收时长，单位秒*/
    private int time;
    /**征收人数*/
    private int num;
    /**
     * id
	 * 1 中央皇城
	 * 2 左上都城
	 * 3 左下都城
	 * 4 右上都城
	 * 5 右下都城
	 * 6 左上角卫城（蓝方）
	 * 7 左边卫城（蓝方）
	 * 8 左下角卫城（蓝方）
	 * 9 右上角卫城（红方）
	 * 10 右边卫城（红方）
	 * 11 右下角卫城（红方）_x000D_
     */
    public int getId() {
        return id;
    }
    /**
     * 城池类型
	 * 1 皇城
	 * 2 都城
	 * 3 卫城_x000D_
     */
    public int getType() {
        return type;
    }
    /**
     * 归属
	 * 0 无归属，可占领
	 * 1 归属左侧服，不可占领
	 * 2 归属右侧服，不可占领_x000D_
     */
    public int getGs() {
        return gs;
    }
    /**
     * 征收奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 征收积分
     */
    public int getPotion() {
        return potion;
    }
    /**
     * 占领征收奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 占领征收积分
     */
    public int getPotion1() {
        return potion1;
    }
    /**
     * 征收时长，单位秒
     */
    public int getTime() {
        return time;
    }
    /**
     * 征收人数
     */
    public int getNum() {
        return num;
    }
    public Struct_fhly_254(int id,int type,int gs,String reward,int potion,String reward1,int potion1,int time,int num) {
        this.id = id;
        this.type = type;
        this.gs = gs;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.potion = potion;
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.potion1 = potion1;
        this.time = time;
        this.num = num;
    }
}