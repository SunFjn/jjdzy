package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_doublereward_230;
public class Config_doublereward_230 extends ConfigBase<Struct_doublereward_230> {
    private static Config_doublereward_230 ins = null;
    public static Config_doublereward_230 getIns(){
        if(ins==null){
            ins = new Config_doublereward_230();
        }
        return ins;
    }
    private Config_doublereward_230(){
        put(1,new Struct_doublereward_230(1,100,"[[250,1000]]"));
        put(2,new Struct_doublereward_230(2,50,"[[500,1500]]"));
        put(3,new Struct_doublereward_230(3,20,"[[1000,2500]]"));
        put(4,new Struct_doublereward_230(4,10,"[[2000,5000]]"));
    }
    public void reset(){
        ins = null;
    }
}