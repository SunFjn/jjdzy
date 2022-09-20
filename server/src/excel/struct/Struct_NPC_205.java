package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * N_205_NPC表.xlsx
 */
public class Struct_NPC_205 {
    /**NPC ID*/
    private int ID;
    /**NPC名字*/
    private String mingzi;
    /**模型ID*/
    private int moxingID;
    /**半身像ID*/
    private int touxiangID;
    /**头像id*/
    private int head;
    /**NPC类型
	 * Administrator:
	 * 1.功能NPC
	 * 2.任务NPC
	 * 3.普通怪物
	 * 4.精英怪物
	 * 5.boss
	 * 6.通天藤守卫
	 * 7.地毯类家具
	 * 8.地面家具
	 * 9.墙上家具*/
    private int leixing;
    /**地图上功能
	 * Administrator:
	 * 0表示在地图上无功能*/
    private String mapsgn;
    /**头顶标记
	 * Administrator:
	 * 
	 * 0表示不显示，
	 * 1表示显示*/
    private int biaoji;
    /**对话*/
    private String duihua;
    /**攻击
	 * Administrator:
	 * 2.不可攻击
	 * 3.可攻击*/
    private int gongji;
    /**冒泡文字
	 * Administrator:
	 * 0.表示没有冒泡
	 * 有冒泡文字则填写具体的文字*/
    private String maopao;
    /**掉落道具
	 * Administrator:
	 * [[物品类型,物品ID,物品数量,掉落概率1][物品类型,物品ID,物品数量,掉落概率2]]
	 * 填写多个掉落道具，掉落概率1，掉落概率2的掉落概率相互独立，
	 * 1.有多个物品掉落几率同样处理
	 * 
	 * 
	 * */
    private int[][] daoju;
    /**怪物列表
	 * Administrator:
	 * 怪物ID、位置
	 * [[怪物ID,位置,波数]]*/
    private int[][] liebiao;
    /**名字高度*/
    private int gaodu;
    /**
     * NPC ID
     */
    public int getID() {
        return ID;
    }
    /**
     * NPC名字
     */
    public String getMingzi() {
        return mingzi;
    }
    /**
     * 模型ID
     */
    public int getMoxingID() {
        return moxingID;
    }
    /**
     * 半身像ID
     */
    public int getTouxiangID() {
        return touxiangID;
    }
    /**
     * 头像id
     */
    public int getHead() {
        return head;
    }
    /**
     * NPC类型
	 * Administrator:
	 * 1.功能NPC
	 * 2.任务NPC
	 * 3.普通怪物
	 * 4.精英怪物
	 * 5.boss
	 * 6.通天藤守卫
	 * 7.地毯类家具
	 * 8.地面家具
	 * 9.墙上家具
     */
    public int getLeixing() {
        return leixing;
    }
    /**
     * 地图上功能
	 * Administrator:
	 * 0表示在地图上无功能
     */
    public String getMapsgn() {
        return mapsgn;
    }
    /**
     * 头顶标记
	 * Administrator:
	 * 
	 * 0表示不显示，
	 * 1表示显示
     */
    public int getBiaoji() {
        return biaoji;
    }
    /**
     * 对话
     */
    public String getDuihua() {
        return duihua;
    }
    /**
     * 攻击
	 * Administrator:
	 * 2.不可攻击
	 * 3.可攻击
     */
    public int getGongji() {
        return gongji;
    }
    /**
     * 冒泡文字
	 * Administrator:
	 * 0.表示没有冒泡
	 * 有冒泡文字则填写具体的文字
     */
    public String getMaopao() {
        return maopao;
    }
    /**
     * 掉落道具
	 * Administrator:
	 * [[物品类型,物品ID,物品数量,掉落概率1][物品类型,物品ID,物品数量,掉落概率2]]
	 * 填写多个掉落道具，掉落概率1，掉落概率2的掉落概率相互独立，
	 * 1.有多个物品掉落几率同样处理
	 * 
	 * 
	 * 
     */
    public int[][] getDaoju() {
        return daoju;
    }
    /**
     * 怪物列表
	 * Administrator:
	 * 怪物ID、位置
	 * [[怪物ID,位置,波数]]
     */
    public int[][] getLiebiao() {
        return liebiao;
    }
    /**
     * 名字高度
     */
    public int getGaodu() {
        return gaodu;
    }
    public Struct_NPC_205(int ID,String mingzi,int moxingID,int touxiangID,int head,int leixing,String mapsgn,int biaoji,String duihua,int gongji,String maopao,String daoju,String liebiao,int gaodu) {
        this.ID = ID;
        this.mingzi = mingzi;
        this.moxingID = moxingID;
        this.touxiangID = touxiangID;
        this.head = head;
        this.leixing = leixing;
        this.mapsgn = mapsgn;
        this.biaoji = biaoji;
        this.duihua = duihua;
        this.gongji = gongji;
        this.maopao = maopao;
        this.daoju = ExcelJsonUtils.toObj(daoju,int[][].class);
        this.liebiao = ExcelJsonUtils.toObj(liebiao,int[][].class);
        this.gaodu = gaodu;
    }
}