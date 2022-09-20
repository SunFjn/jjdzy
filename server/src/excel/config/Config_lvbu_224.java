package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_lvbu_224;
public class Config_lvbu_224 extends ConfigBase<Struct_lvbu_224> {
    private static Config_lvbu_224 ins = null;
    public static Config_lvbu_224 getIns(){
        if(ins==null){
            ins = new Config_lvbu_224();
        }
        return ins;
    }
    private Config_lvbu_224(){
        put(361001,new Struct_lvbu_224(361001,"[[4,0,6000],[1,410003,10],[9,0,400000]]","[[4,0,4000],[1,410003,5],[9,0,300000]]","[[4,0,2000],[1,410003,4],[9,0,300000]]","[[4,0,1000],[1,410003,2],[9,0,200000]]","[[1,400045,1],[1,400046,1],[1,400047,1]]"));
    }
    public void reset(){
        ins = null;
    }
}