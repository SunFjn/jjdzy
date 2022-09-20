package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zq_773;
public class Config_zq_773 extends ConfigBase<Struct_zq_773> {
    private static Config_zq_773 ins = null;
    public static Config_zq_773 getIns(){
        if(ins==null){
            ins = new Config_zq_773();
        }
        return ins;
    }
    private Config_zq_773(){
        put(400001,new Struct_zq_773(400001,"[[1,447001,1]]",400001,100,4,10,0,0));
        put(400002,new Struct_zq_773(400002,"[[1,447002,1]]",400002,100,4,10,0,0));
        put(400003,new Struct_zq_773(400003,"[[1,447003,1]]",400003,100,5,7,0,0));
        put(400004,new Struct_zq_773(400004,"[[1,447004,1]]",400004,100,5,7,0,0));
        put(400005,new Struct_zq_773(400005,"[[1,447005,1]]",400005,100,6,5,0,0));
        put(400006,new Struct_zq_773(400006,"[[1,447006,1]]",400006,100,6,5,0,0));
        put(400007,new Struct_zq_773(400007,"[[1,447007,1]]",400007,100,6,3,0,0));
        put(400008,new Struct_zq_773(400008,"[[1,447008,1]]",400008,100,6,5,0,0));
        put(400009,new Struct_zq_773(400009,"[[1,447009,1]]",400009,100,6,5,0,0));
        put(400010,new Struct_zq_773(400010,"[[1,447010,1]]",400014,100,8,5,0,0));
        put(400011,new Struct_zq_773(400011,"[[1,447011,1]]",400013,100,8,5,0,0));
        put(1,new Struct_zq_773(1,"[[400006,8],[400003,8]]",400011,0,8,1050,1,180));
        put(2,new Struct_zq_773(2,"[[400008,8],[400004,8]]",400012,0,8,2050,1,180));
        put(3,new Struct_zq_773(3,"[[400005,5],[400009,5]]",400010,0,8,3050,1,180));
        put(4,new Struct_zq_773(4,"[[400010,5],[400007,8]]",400016,0,8,4050,1,180));
        put(5,new Struct_zq_773(5,"[[400011,5],[400007,8]]",400015,0,8,5050,1,180));
    }
    public void reset(){
        ins = null;
    }
}