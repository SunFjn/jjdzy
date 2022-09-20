package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_007_一骑当千.xlsx
 */
public class Struct_yiqi_007 {
    /**编号
	 * 难度*1000+波数
	 * */
    private int index;
    /**难度
	 * 1.普通
	 * 2.困难
	 * 3.噩梦
	 * 4.传说*/
    private int type;
    /**波数*/
    private int bo;
    /**是否BOSS
	 * 0.否
	 * 1.是*/
    private int boss;
    /**怪物配置
	 * [[x,y]]
	 * x=怪物ID
	 * y=数量*/
    private int[][] dispose;
    /**累积奖励
	 * 奖励为替换型（波数高的奖励替换低的）*/
    private int[][] pile;
    /**首通大奖
	 * 没有首通大奖的则填0*/
    private int[][] award;
    /**大奖战力*/
    private int power;
    /**
     * 编号
	 * 难度*1000+波数
	 * 
     */
    public int getIndex() {
        return index;
    }
    /**
     * 难度
	 * 1.普通
	 * 2.困难
	 * 3.噩梦
	 * 4.传说
     */
    public int getType() {
        return type;
    }
    /**
     * 波数
     */
    public int getBo() {
        return bo;
    }
    /**
     * 是否BOSS
	 * 0.否
	 * 1.是
     */
    public int getBoss() {
        return boss;
    }
    /**
     * 怪物配置
	 * [[x,y]]
	 * x=怪物ID
	 * y=数量
     */
    public int[][] getDispose() {
        return dispose;
    }
    /**
     * 累积奖励
	 * 奖励为替换型（波数高的奖励替换低的）
     */
    public int[][] getPile() {
        return pile;
    }
    /**
     * 首通大奖
	 * 没有首通大奖的则填0
     */
    public int[][] getAward() {
        return award;
    }
    /**
     * 大奖战力
     */
    public int getPower() {
        return power;
    }
    public Struct_yiqi_007(int index,int type,int bo,int boss,String dispose,String pile,String award,int power) {
        this.index = index;
        this.type = type;
        this.bo = bo;
        this.boss = boss;
        this.dispose = ExcelJsonUtils.toObj(dispose,int[][].class);
        this.pile = ExcelJsonUtils.toObj(pile,int[][].class);
        this.award = ExcelJsonUtils.toObj(award,int[][].class);
        this.power = power;
    }
}