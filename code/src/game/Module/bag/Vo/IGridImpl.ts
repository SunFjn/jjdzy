interface IGridImpl {
    /**sid */
    sid: number;
    /**id */
    id: number;
    /**icon */
    icon: string;
    /**质量颜色 */
    qColor: number;
    /**质量 */
    quality: number;
    /** 数量 */
    count: number;
    /**名字*/
    name: string;
    /**cfg配置*/
    cfg: any;
    /*格子类型**/
    gType: number;
    /**是否显示tips*/
    // tipEnable:boolean;
    /**是否显示特效 */
    showEffect: boolean;
    /*排序**/
    paixu: number;
    /**额外标识 1显示0默认2首通3协助4双倍5大奖6满员*/
    extra: number;
}