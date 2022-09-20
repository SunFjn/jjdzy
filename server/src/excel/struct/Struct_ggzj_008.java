package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_008_过关斩将.xlsx
 */
public class Struct_ggzj_008 {
    /**编号
	 * 难度*1000+关卡数
	 * */
    private int index;
    /**难度
	 * 1.普通
	 * 2.困难
	 * 3.噩梦
	 * 4.传说*/
    private int type;
    /**关卡数*/
    private int guan;
    /**怪物配置*/
    private int boss;
    /**首通奖励*/
    private int[][] award;
    /**BOSS掉落*/
    private String bd;
    /**下一关卡*/
    private int next;
    /**
     * 编号
	 * 难度*1000+关卡数
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
     * 关卡数
     */
    public int getGuan() {
        return guan;
    }
    /**
     * 怪物配置
     */
    public int getBoss() {
        return boss;
    }
    /**
     * 首通奖励
     */
    public int[][] getAward() {
        return award;
    }
    /**
     * BOSS掉落
     */
    public String getBd() {
        return bd;
    }
    /**
     * 下一关卡
     */
    public int getNext() {
        return next;
    }
    public Struct_ggzj_008(int index,int type,int guan,int boss,String award,String bd,int next) {
        this.index = index;
        this.type = type;
        this.guan = guan;
        this.boss = boss;
        this.award = ExcelJsonUtils.toObj(award,int[][].class);
        this.bd = bd;
        this.next = next;
    }
}