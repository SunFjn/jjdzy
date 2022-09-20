package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cclx_754;
public class Config_cclx_754 extends ConfigBase<Struct_cclx_754> {
    private static Config_cclx_754 ins = null;
    public static Config_cclx_754 getIns(){
        if(ins==null){
            ins = new Config_cclx_754();
        }
        return ins;
    }
    private Config_cclx_754(){
        put(1,new Struct_cclx_754(1,"[[1,243001]]",2,0,"[[1,401036,1],[1,401035,1],[1,411010,28],[1,411006,28]]","[[1,401036,1],[1,410051,28]]",3000,385001));
    }
    public void reset(){
        ins = null;
    }
}