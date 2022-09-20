package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_019_府邸目标表.xlsx
 */
public class Struct_fdmb_019 {
    /**序号*/
    private int id;
    /**大分类
	 * 1.府邸
	 * 2.装饰
	 * 3.侍女
	 * 4.家丁
	 * 5.其他*/
    private int fenlei;
    /**任务类型*/
    private int type;
    /**参数1
	 * 任务类型：101
	 * 参数1：府邸档次ID   参数2：无
	 * 
	 * 任务类型：102
	 * 参数1：府邸等级     参数2：无
	 * 
	 * 任务类型：201
	 * 参数1：摇钱树等级   参数2：无
	 * 
	 * 任务类型：202
	 * 参数1：天工炉等级   参数2：无
	 * 
	 * 任务类型：203
	 * 参数1：金库等级   参数2：无
	 * 
	 * 任务类型：204
	 * 参数1：桌椅等级   参数2：无
	 * 
	 * 任务类型：205
	 * 参数1：床等级   参数2：无
	 * 
	 * 任务类型：206
	 * 参数1：屏风等级   参数2：无
	 * 
	 * 任务类型：301
	 * 参数1：侍女品质   参数2：数量
	 * 
	 * 任务类型：302
	 * 参数1：侍女数量   参数2：星级
	 * 
	 * 任务类型：401
	 * 参数1：家丁阶数   参数2：无
	 * 
	 * 任务类型：402
	 * 参数1：家丁晋升ID   参数2：无
	 * 
	 * 任务类型：501
	 * 参数1：宴会档次ID  参数2：次数
	 * 
	 * 任务类型：502
	 * 参数1：巧夺天工次数  参数2：无
	 * 
	 * 任务类型：503
	 * 参数1：摇钱次数  参数2：无
	 * 
	 * 任务类型：504
	 * 参数1：繁荣度数值  参数2：无*/
    private int canshu1;
    /**参数2*/
    private int canshu2;
    /**奖励*/
    private int[][] award;
    /**初始进度*/
    private int csjd;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 大分类
	 * 1.府邸
	 * 2.装饰
	 * 3.侍女
	 * 4.家丁
	 * 5.其他
     */
    public int getFenlei() {
        return fenlei;
    }
    /**
     * 任务类型
     */
    public int getType() {
        return type;
    }
    /**
     * 参数1
	 * 任务类型：101
	 * 参数1：府邸档次ID   参数2：无
	 * 
	 * 任务类型：102
	 * 参数1：府邸等级     参数2：无
	 * 
	 * 任务类型：201
	 * 参数1：摇钱树等级   参数2：无
	 * 
	 * 任务类型：202
	 * 参数1：天工炉等级   参数2：无
	 * 
	 * 任务类型：203
	 * 参数1：金库等级   参数2：无
	 * 
	 * 任务类型：204
	 * 参数1：桌椅等级   参数2：无
	 * 
	 * 任务类型：205
	 * 参数1：床等级   参数2：无
	 * 
	 * 任务类型：206
	 * 参数1：屏风等级   参数2：无
	 * 
	 * 任务类型：301
	 * 参数1：侍女品质   参数2：数量
	 * 
	 * 任务类型：302
	 * 参数1：侍女数量   参数2：星级
	 * 
	 * 任务类型：401
	 * 参数1：家丁阶数   参数2：无
	 * 
	 * 任务类型：402
	 * 参数1：家丁晋升ID   参数2：无
	 * 
	 * 任务类型：501
	 * 参数1：宴会档次ID  参数2：次数
	 * 
	 * 任务类型：502
	 * 参数1：巧夺天工次数  参数2：无
	 * 
	 * 任务类型：503
	 * 参数1：摇钱次数  参数2：无
	 * 
	 * 任务类型：504
	 * 参数1：繁荣度数值  参数2：无
     */
    public int getCanshu1() {
        return canshu1;
    }
    /**
     * 参数2
     */
    public int getCanshu2() {
        return canshu2;
    }
    /**
     * 奖励
     */
    public int[][] getAward() {
        return award;
    }
    /**
     * 初始进度
     */
    public int getCsjd() {
        return csjd;
    }
    public Struct_fdmb_019(int id,int fenlei,int type,int canshu1,int canshu2,String award,int csjd) {
        this.id = id;
        this.fenlei = fenlei;
        this.type = type;
        this.canshu1 = canshu1;
        this.canshu2 = canshu2;
        this.award = ExcelJsonUtils.toObj(award,int[][].class);
        this.csjd = csjd;
    }
}