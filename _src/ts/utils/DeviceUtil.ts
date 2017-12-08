export class DeviceUtil {

    public static isMobile() {
        return (window.innerWidth < this.breakpoint);
    }

    public static isDesktop() {
        return !DeviceUtil.isMobile();
    }

    private static breakpoint:number = 800;
}