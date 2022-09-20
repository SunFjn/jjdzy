package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_bmjsjdpm_262;
public class Config_bmjsjdpm_262 extends ConfigBase<Struct_bmjsjdpm_262> {
    private static Config_bmjsjdpm_262 ins = null;
    public static Config_bmjsjdpm_262 getIns(){
        if(ins==null){
            ins = new Config_bmjsjdpm_262();
        }
        return ins;
    }
    private Config_bmjsjdpm_262(){
        put(1,new Struct_bmjsjdpm_262(1,"[[1,1]]","[[1,400892,2],[1,410019,100]]","[[1,400896,3],[1,410046,20],[1,410019,5]]"));
        put(2,new Struct_bmjsjdpm_262(2,"[[2,2]]","[[1,400892,2],[1,410019,80]]","[[1,400896,3],[1,410046,15]]"));
        put(3,new Struct_bmjsjdpm_262(3,"[[3,3]]","[[1,400892,2],[1,410019,40]]","[[1,400896,2],[1,410046,10]]"));
        put(4,new Struct_bmjsjdpm_262(4,"[[4,10]]","[[1,400892,1]]","[[1,400896,2],[1,410046,10],[1,410019,3]]"));
        put(5,new Struct_bmjsjdpm_262(5,"[[11,20]]","[[1,410019,20]]","[[1,400896,1],[1,410046,5],[1,410019,2]]"));
    }
    public void reset(){
        ins = null;
    }
}