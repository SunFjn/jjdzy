package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cclxpm_754;
public class Config_cclxpm_754 extends ConfigBase<Struct_cclxpm_754> {
    private static Config_cclxpm_754 ins = null;
    public static Config_cclxpm_754 getIns(){
        if(ins==null){
            ins = new Config_cclxpm_754();
        }
        return ins;
    }
    private Config_cclxpm_754(){
        put(1,new Struct_cclxpm_754(1,"[[1,1]]","[[1,401037,5],[1,401036,2],[1,411006,88]]"));
        put(2,new Struct_cclxpm_754(2,"[[2,3]]","[[1,401037,3],[1,401036,2],[1,411006,58]]"));
        put(3,new Struct_cclxpm_754(3,"[[4,5]]","[[1,401037,2],[1,401036,1],[1,411006,58]]"));
        put(4,new Struct_cclxpm_754(4,"[[6,10]]","[[1,401037,1],[1,411006,28]]"));
    }
    public void reset(){
        ins = null;
    }
}