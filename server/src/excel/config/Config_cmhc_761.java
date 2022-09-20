package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cmhc_761;
public class Config_cmhc_761 extends ConfigBase<Struct_cmhc_761> {
    private static Config_cmhc_761 ins = null;
    public static Config_cmhc_761 getIns(){
        if(ins==null){
            ins = new Config_cmhc_761();
        }
        return ins;
    }
    private Config_cmhc_761(){
        put(1,new Struct_cmhc_761(1,"[1,411012,18,35000,0;1,411012,28,30000,0;1,411012,58,20000,0;1,410409,1,10000,0;1,410409,2,5000,0]","[1,411012,188,52513,0;1,410409,3,26666,0;1,410408,1,16667,1;1,445001,1,1833,1;1,445002,1,60,1;1,445003,1,60,1;1,445004,1,667,1;1,445005,1,667,1;1,445006,1,667,1;1,445007,1,100,1;1,445008,1,100,1]","[[4,0,5000]]","[[4,0,49000]]"));
    }
    public void reset(){
        ins = null;
    }
}