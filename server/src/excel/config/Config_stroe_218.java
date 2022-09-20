package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_stroe_218;
public class Config_stroe_218 extends ConfigBase<Struct_stroe_218> {
    private static Config_stroe_218 ins = null;
    public static Config_stroe_218 getIns(){
        if(ins==null){
            ins = new Config_stroe_218();
        }
        return ins;
    }
    private Config_stroe_218(){
        put(1,new Struct_stroe_218(1,1,1,1,"[[3,0,100000]]",1));
        put(2,new Struct_stroe_218(2,2,1,0,"0",2));
        put(3,new Struct_stroe_218(3,3,1,0,"0",3));
        put(4,new Struct_stroe_218(4,4,1,0,"0",4));
        put(5,new Struct_stroe_218(5,5,1,0,"0",5));
        put(6,new Struct_stroe_218(6,6,0,0,"0",6));
        put(7,new Struct_stroe_218(7,7,1,0,"0",7));
    }
    public void reset(){
        ins = null;
    }
}