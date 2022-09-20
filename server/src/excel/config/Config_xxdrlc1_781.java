package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xxdrlc1_781;
public class Config_xxdrlc1_781 extends ConfigBase<Struct_xxdrlc1_781> {
    private static Config_xxdrlc1_781 ins = null;
    public static Config_xxdrlc1_781 getIns(){
        if(ins==null){
            ins = new Config_xxdrlc1_781();
        }
        return ins;
    }
    private Config_xxdrlc1_781(){
        put(1,new Struct_xxdrlc1_781(1,100,"[[1,400175,188],[1,400176,10],[1,410007,10]]",12001));
        put(2,new Struct_xxdrlc1_781(2,300,"[[1,400175,288],[1,400176,20],[1,410007,20]]",12002));
        put(3,new Struct_xxdrlc1_781(3,500,"[[1,400175,388],[1,400176,30],[1,410007,30]]",12003));
        put(5,new Struct_xxdrlc1_781(5,1000,"[[1,402005,1],[1,400175,488],[1,400176,40],[1,410007,40]]",12004));
        put(7,new Struct_xxdrlc1_781(7,2000,"[[1,490033,1],[1,400175,688],[1,400176,50],[1,410007,50]]",12005));
        put(11,new Struct_xxdrlc1_781(11,5000,"[[1,402008,1],[1,400175,888],[1,400176,60],[1,410007,60]]",12006));
        put(12,new Struct_xxdrlc1_781(12,10000,"[[1,490057,1],[1,400175,1088],[1,400176,60],[1,410007,60]]",12007));
        put(13,new Struct_xxdrlc1_781(13,20000,"[[1,440015,1],[1,400175,1288],[1,400176,100],[1,410007,100]]",12008));
    }
    public void reset(){
        ins = null;
    }
}