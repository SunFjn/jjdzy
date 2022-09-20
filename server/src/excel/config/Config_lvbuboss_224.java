package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lvbuboss_224;
public class Config_lvbuboss_224 extends ConfigBase<Struct_lvbuboss_224> {
    private static Config_lvbuboss_224 ins = null;
    public static Config_lvbuboss_224 getIns(){
        if(ins==null){
            ins = new Config_lvbuboss_224();
        }
        return ins;
    }
    private Config_lvbuboss_224(){
        put(241001,new Struct_lvbuboss_224(241001,2,0,241001,"[[4,0,500],[1,410003,1],[9,0,30000]]","[[1,400045,1]]",3000));
        put(241002,new Struct_lvbuboss_224(241002,2,0,241002,"[[4,0,500],[1,410003,1],[9,0,60000]]","[[1,400046,1]]",3000));
        put(241003,new Struct_lvbuboss_224(241003,2,0,241003,"[[1,400057,10],[4,0,500],[1,410003,2],[9,0,90000]]","[[1,400047,1]]",3000));
    }
    public void reset(){
        ins = null;
    }
}